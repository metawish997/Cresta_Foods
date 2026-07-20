// backend/models/HeroSlide.js
import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema(
  {
    image_path: { type: String, required: true },  // served as /uploads/filename
    alt_text: { type: String, default: '' },
    sort_order: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

export default mongoose.model('HeroSlide', heroSlideSchema);
