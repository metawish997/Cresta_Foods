import mongoose from 'mongoose';
import EmailSettings from './models/EmailSettings.js';
import { decrypt } from './utils/encryption.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const settings = await EmailSettings.findOne();
  if (settings) {
    console.log("DB SETTINGS FOUND:");
    console.log("Host:", `'${settings.smtp_host}'`);
    console.log("Port:", settings.smtp_port);
    console.log("Username:", `'${settings.smtp_username}'`);
    console.log("Encrypted Pass:", settings.smtp_password_encrypted);
    console.log("Decrypted Pass:", `'${decrypt(settings.smtp_password_encrypted)}'`);
  } else {
    console.log("No settings found in DB.");
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
