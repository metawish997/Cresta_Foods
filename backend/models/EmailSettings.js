// backend/models/EmailSettings.js
import mongoose from 'mongoose';

const emailSettingsSchema = new mongoose.Schema(
  {
    smtp_host: { type: String, required: true },
    smtp_port: { type: Number, required: true },
    smtp_username: { type: String, required: true },
    smtp_password_encrypted: { type: String, required: true },
    smtp_encryption: { type: String, enum: ['TLS', 'SSL', 'None'], default: 'TLS' },
    from_email: { type: String, required: true },
    from_name: { type: String, required: true },
    admin_email: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('EmailSettings', emailSettingsSchema);
