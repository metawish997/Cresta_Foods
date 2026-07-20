// backend/models/SeoSetting.js
import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema(
  {
    page_slug: { type: String, required: true, unique: true },
    page_name: { type: String },
    title: { type: String },
    description: { type: String },
    keywords: { type: String },
    og_image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('SeoSetting', seoSchema);
