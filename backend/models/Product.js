// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true }, // 'Guar' | 'Onions'
    subCategory: { type: String },
    shortDesc: { type: String },
    description: { type: String },
    image: { type: String },          // URL or /uploads/filename
    gallery: { type: Array, default: [] },  // array of URLs/paths
    badge: { type: String },          // e.g. 'Best Seller'
    featured: { type: Boolean, default: false },
    specifications: { type: Array, default: [] },   // [{label, value}]
    subProducts: { type: Array, default: [] },       // for onions
    keyProperties: { type: Array, default: [] },
    whyChoose: { type: Array, default: [] },         // [{title, desc}]
    whyPartner: { type: Array, default: [] },        // [{title, desc}]
    applications: { type: Array, default: [] },      // string[]
    packaging: { type: String },
    storageGuidelines: { type: String },
    technicalSpecText: { type: String },
    specificationTable: { 
      tableName: { type: String },
      headers: { type: Array, default: [] },
      rows: { type: Array, default: [] }
    },
    certifications: { type: Array, default: [] },    // string[]
    usageRecommendation: { type: String },
    specialNote: { type: String },
    highlight: { type: String },
    status: { type: String, enum: ['PUBLISHED', 'DRAFT'], default: 'DRAFT' },
    sort_order: { type: Number, default: 0 },
    meta_title: { type: String },
    meta_description: { type: String },
    meta_keywords: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
