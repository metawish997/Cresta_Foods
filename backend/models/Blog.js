// backend/models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    author: { type: String },
    authorAvatar: { type: String },
    date: { type: String },
    readTime: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    tags: { type: Array, default: [] },  // string[]
    status: { type: String, enum: ['PUBLISHED', 'DRAFT'], default: 'DRAFT' },
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keywords: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
