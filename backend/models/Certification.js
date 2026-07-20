// backend/models/Certification.js
import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_path: { type: String },
    description: { type: String },
    sort_order: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

export default mongoose.model('Certification', certificationSchema);
