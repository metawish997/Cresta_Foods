import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
// dummy key
const key = Buffer.from('12345678901234567890123456789012', 'utf8');

const encrypt = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

const decrypt = (text) => {
  if (!text) return text;
  const textParts = text.split(':');
  if (textParts.length !== 2) return text; // might not be encrypted
  
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const password = "mySuperSecretPassword123!@#";
const encrypted = encrypt(password);
const decrypted = decrypt(encrypted);

console.log({ password, encrypted, decrypted, matches: password === decrypted });
