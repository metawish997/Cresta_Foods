// backend/utils/mailer.js
import nodemailer from 'nodemailer';
import EmailSettings from '../models/EmailSettings.js';
import { decrypt } from './encryption.js';

const getActiveSettings = async () => {
  const settings = await EmailSettings.findOne();
  if (!settings || !settings.is_active) return null;
  return settings;
};

const createTransporter = async (settings) => {
  if (settings) {
    const password = decrypt(settings.smtp_password_encrypted);
    return nodemailer.createTransport({
      host: settings.smtp_host,
      port: settings.smtp_port,
      secure: settings.smtp_encryption === 'SSL' || settings.smtp_port === 465,
      auth: {
        user: settings.smtp_username,
        pass: password,
      },
    });
  } else {
    // Fallback to .env (support both SMTP_ and MAIL_ formats)
    const host = process.env.SMTP_HOST || process.env.MAIL_HOST;
    const port = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT) || 587;
    const secure = port === 465 || process.env.MAIL_ENCRYPTION === 'ssl';
    const user = process.env.SMTP_USER || process.env.MAIL_USERNAME;
    const pass = process.env.SMTP_PASS || process.env.MAIL_PASSWORD;

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
};

/**
 * Send inquiry notification to admin
 */
export const sendInquiryNotification = async (inquiry) => {
  try {
    const settings = await getActiveSettings();
    const transporter = await createTransporter(settings);
    
    const fromEmail = settings ? settings.from_email : (process.env.SMTP_USER || process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME);
    const fromName = settings ? settings.from_name : (process.env.MAIL_FROM_NAME || 'Cresta Foods Website');
    const toEmail = settings ? settings.admin_email : (process.env.ADMIN_EMAIL || process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME);
    const formattedDate = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: inquiry.email,
      subject: `New Inquiry Received - ${inquiry.subject || 'Product Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: #2E7D32; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Inquiry Received</h2>
          </div>
          <div style="padding: 24px; background: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #555;">Name:</td><td style="padding: 8px 0;">${inquiry.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
              ${inquiry.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${inquiry.phone}</td></tr>` : ''}
              ${inquiry.company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${inquiry.company}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px 0;">${inquiry.subject || 'Product Inquiry'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted At:</td><td style="padding: 8px 0;">${formattedDate}</td></tr>
            </table>
            <div style="margin-top: 16px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
              <p style="background: white; padding: 16px; border-radius: 4px; border-left: 4px solid #2E7D32; margin: 0; white-space: pre-wrap;">${inquiry.message}</p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send admin notification email:', err.message);
    throw err; // Rethrow to handle it in the API response
  }
};

/**
 * Send confirmation email to the user who submitted the inquiry
 */
export const sendConfirmationEmail = async (inquiry) => {
  try {
    const settings = await getActiveSettings();
    const transporter = await createTransporter(settings);
    
    const fromEmail = settings ? settings.from_email : (process.env.SMTP_USER || process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME);
    const fromName = settings ? settings.from_name : (process.env.MAIL_FROM_NAME || 'Cresta Foods');

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: inquiry.email,
      subject: `Thank you for your inquiry — ${fromName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: #2E7D32; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Thank You, ${inquiry.name}!</h2>
          </div>
          <div style="padding: 24px; background: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <p>We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.</p>
            <p>Your message:</p>
            <p style="background: white; padding: 16px; border-radius: 4px; border-left: 4px solid #2E7D32;">${inquiry.message}</p>
            <p style="margin-top: 24px; color: #777; font-size: 14px;">
              Best regards,<br>
              <strong>${fromName} Team</strong>
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send confirmation email:', err.message);
    throw err;
  }
};
