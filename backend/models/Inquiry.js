// backend/models/Inquiry.js
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'ARCHIVED'],
      default: 'NEW',
    },
    followUpNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
