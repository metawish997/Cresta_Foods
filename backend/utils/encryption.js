// backend/utils/encryption.js
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

const getKey = () => {
  const key = process.env.SMTP_SETTINGS_ENCRYPTION_KEY;
  if (!key || key.length !== 32) {
    throw new Error('SMTP_SETTINGS_ENCRYPTION_KEY must be exactly 32 characters long');
  }
  return Buffer.from(key, 'utf8');
};

export const encrypt = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (text) => {
  if (!text) return text;
  const textParts = text.split(':');
  if (textParts.length !== 2) return text; // might not be encrypted
  
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
