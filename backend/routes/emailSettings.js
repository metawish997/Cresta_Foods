// backend/routes/emailSettings.js
import express from 'express';
import nodemailer from 'nodemailer';
import EmailSettings from '../models/EmailSettings.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { encrypt, decrypt } from '../utils/encryption.js';

const router = express.Router();

// GET /api/email-settings - Fetch settings (fallback to .env if DB empty)
router.get('/', [verifyToken, checkPermission('manage_settings')], async (req, res) => {
  try {
    let settings = await EmailSettings.findOne();
    if (settings) {
      // Convert to object and mask password
      const settingsObj = settings.toObject();
      if (settingsObj.smtp_password_encrypted) {
        settingsObj.smtp_password = '****************';
        delete settingsObj.smtp_password_encrypted;
      }
      res.json(settingsObj);
    } else {
      // Return env defaults so UI is prefilled
      res.json({
        smtp_host: process.env.SMTP_HOST || process.env.MAIL_HOST || '',
        smtp_port: process.env.SMTP_PORT || process.env.MAIL_PORT || '',
        smtp_username: process.env.SMTP_USER || process.env.MAIL_USERNAME || '',
        smtp_password: (process.env.SMTP_PASS || process.env.MAIL_PASSWORD) ? '****************' : '', 
        smtp_encryption: process.env.MAIL_ENCRYPTION === 'ssl' ? 'SSL' : 'TLS',
        from_email: process.env.SMTP_USER || process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME || '',
        from_name: process.env.MAIL_FROM_NAME ? process.env.MAIL_FROM_NAME.replace(/"/g, '') : 'Cresta Foods',
        admin_email: process.env.ADMIN_EMAIL || process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME || '',
        is_active: false
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching email settings', error: err.message });
  }
});

// PUT /api/email-settings - Create or update configuration
router.put('/', [verifyToken, checkPermission('manage_settings')], async (req, res) => {
  try {
    const { 
      smtp_host, 
      smtp_port, 
      smtp_username, 
      smtp_password, 
      smtp_encryption, 
      from_email, 
      from_name, 
      admin_email,
      is_active
    } = req.body;

    let settings = await EmailSettings.findOne();
    const isNew = !settings;
    
    if (isNew) {
      settings = new EmailSettings();
    }

    if (smtp_host !== undefined) settings.smtp_host = smtp_host.trim();
    if (smtp_port !== undefined) settings.smtp_port = smtp_port;
    if (smtp_username !== undefined) settings.smtp_username = smtp_username.trim();
    
    // Only encrypt and save if a new real password is provided
    if (smtp_password && smtp_password !== '****************') {
      settings.smtp_password_encrypted = encrypt(smtp_password.trim());
    } else if (isNew && smtp_password === '****************') {
      const envPass = process.env.SMTP_PASS || process.env.MAIL_PASSWORD;
      if (envPass) {
        settings.smtp_password_encrypted = encrypt(envPass.trim());
      }
    }

    if (smtp_encryption !== undefined) settings.smtp_encryption = smtp_encryption;
    if (from_email !== undefined) settings.from_email = from_email.trim();
    if (from_name !== undefined) settings.from_name = from_name.trim();
    if (admin_email !== undefined) settings.admin_email = admin_email.trim();
    if (is_active !== undefined) settings.is_active = is_active;

    await settings.save();
    res.json({ message: 'Email settings updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating email settings', error: err.message });
  }
});

// POST /api/email-settings/test - Send a test email
router.post('/test', [verifyToken, checkPermission('manage_settings')], async (req, res) => {
  try {
    const settings = await EmailSettings.findOne();
    let transporter;
    let fromEmail, fromName, adminEmail;

    if (settings && settings.is_active) {
      const password = decrypt(settings.smtp_password_encrypted);
      transporter = nodemailer.createTransport({
        host: settings.smtp_host,
        port: settings.smtp_port,
        secure: settings.smtp_encryption === 'SSL' || settings.smtp_port === 465,
        auth: {
          user: settings.smtp_username,
          pass: password,
        },
      });
      fromEmail = settings.from_email;
      fromName = settings.from_name;
      adminEmail = settings.admin_email;
    } else {
      // Fallback to .env
      const host = process.env.SMTP_HOST || process.env.MAIL_HOST;
      const port = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT) || 587;
      const secure = port === 465 || process.env.MAIL_ENCRYPTION === 'ssl';
      const user = process.env.SMTP_USER || process.env.MAIL_USERNAME;
      const pass = process.env.SMTP_PASS || process.env.MAIL_PASSWORD;
      
      if (!host || !user || !pass) {
        return res.status(400).json({ message: 'No active DB settings and missing .env configuration.' });
      }

      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      fromEmail = user;
      fromName = process.env.MAIL_FROM_NAME || 'Cresta Foods';
      adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_FROM_ADDRESS || user;
    }

    // Verify connection
    await transporter.verify();

    // Send test email
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      subject: 'Test Email - SMTP Configuration Successful',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2E7D32; margin-top: 0;">Test Email Successful</h2>
          <p>Your SMTP configuration for the Cresta Foods Admin Panel is working correctly!</p>
          <p><strong>Configured By:</strong> ${req.userRole}</p>
          <p><strong>Source:</strong> ${settings && settings.is_active ? 'Database Settings' : '.env Settings'}</p>
        </div>
      `,
    });

    res.json({ message: `Test email sent successfully via ${settings && settings.is_active ? 'Database' : '.env'} settings.` });
  } catch (err) {
    res.status(500).json({ message: 'Test email failed. Please check your SMTP configuration.', error: err.message });
  }
});

export default router;
