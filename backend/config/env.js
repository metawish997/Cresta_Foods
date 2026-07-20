// backend/config/env.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 5001;
export const uploadsDir = process.env.EXTERNAL_UPLOAD_PATH || path.resolve(__dirname, '../uploads');
