import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log("Testing SMTP using .env credentials (MAIL_)...");
  console.log("Host:", process.env.MAIL_HOST);
  console.log("Port:", process.env.MAIL_PORT);
  console.log("User:", process.env.MAIL_USERNAME);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT) || 465,
    secure: parseInt(process.env.MAIL_PORT) === 465 || process.env.MAIL_ENCRYPTION === 'ssl',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  try {
    await transporter.verify();
    console.log("AUTH SUCCESS — credentials from .env are working perfectly.");
  } catch (err) {
    console.error("AUTH FAILED:", err.message);
  }
}

main();
