// backend/models/PageContent.js
import mongoose from 'mongoose';

const pageContentSchema = new mongoose.Schema(
  {
    page_slug: { type: String, required: true },
    field_key: { type: String, required: true },
    field_value: { type: String },
  },
  { timestamps: true }
);

// Unique compound index — same as MySQL UNIQUE KEY unique_field
pageContentSchema.index({ page_slug: 1, field_key: 1 }, { unique: true });

export default mongoose.model('PageContent', pageContentSchema);
