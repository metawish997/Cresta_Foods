// backend/utils/mailer.js
import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: parseInt(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send inquiry notification to admin
 */
export const sendInquiryNotification = async (inquiry) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Cresta Foods Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry from ${inquiry.name} — Cresta Foods`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2E7D32; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Inquiry</h2>
          </div>
          <div style="padding: 24px; background: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #555;">Name:</td><td style="padding: 8px 0;">${inquiry.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
              ${inquiry.company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${inquiry.company}</td></tr>` : ''}
              ${inquiry.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${inquiry.phone}</td></tr>` : ''}
            </table>
            <div style="margin-top: 16px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
              <p style="background: white; padding: 16px; border-radius: 4px; border-left: 4px solid #2E7D32; margin: 0;">${inquiry.message}</p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send admin notification email:', err.message);
  }
};

/**
 * Send confirmation email to the user who submitted the inquiry
 */
export const sendConfirmationEmail = async (inquiry) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Cresta Foods" <${process.env.SMTP_USER}>`,
      to: inquiry.email,
      subject: `Thank you for your inquiry — Cresta Foods`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2E7D32; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Thank You, ${inquiry.name}!</h2>
          </div>
          <div style="padding: 24px; background: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <p>We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.</p>
            <p>Your message:</p>
            <p style="background: white; padding: 16px; border-radius: 4px; border-left: 4px solid #2E7D32;">${inquiry.message}</p>
            <p style="margin-top: 24px; color: #777; font-size: 14px;">
              Best regards,<br>
              <strong>Cresta Foods Team</strong><br>
              Exporting from Mundra Port, Gujarat, India
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send confirmation email:', err.message);
  }
};
