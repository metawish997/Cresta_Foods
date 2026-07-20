// backend/routes/products.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { processToAvif, deleteUploadedFile } from '../utils/imageOptimizer.js';
import { uploadsDir } from '../config/env.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `product-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

// Helper to parse JSON array fields from form data
const parseArrayField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch { return []; }
};

// Helper for object fields
const parseJSONField = (val, defaultVal = {}) => {
  if (!val) return defaultVal;
  if (typeof val === 'object') return val;
  try { return JSON.parse(val); } catch { return defaultVal; }
};

// GET all products (public)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : { status: 'PUBLISHED' };
    if (req.query.all === 'true') delete filter.status; // admin: show all
    const products = await Product.find(filter).sort({ sort_order: 1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// GET single product by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

// GET by ID (admin)
router.get('/id/:id', [verifyToken, checkPermission('manage_products')], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

// POST create product (admin)
router.post(
  '/',
  [verifyToken, checkPermission('manage_products'), upload.single('image')],
  async (req, res) => {
    try {
      const { slug } = req.body;
      if (!slug) return res.status(400).json({ message: 'Slug is required' });

      const existing = await Product.findOne({ slug });
      if (existing) return res.status(409).json({ message: 'Product with this slug already exists' });

      let imagePath = req.body.image || '';
      if (req.file) {
        imagePath = await processToAvif(req.file, uploadsDir);
      }

      const count = await Product.countDocuments();
      const product = await Product.create({
        ...req.body,
        image: imagePath,
        specifications: parseArrayField(req.body.specifications),
        subProducts: parseArrayField(req.body.subProducts),
        keyProperties: parseArrayField(req.body.keyProperties),
        whyChoose: parseArrayField(req.body.whyChoose),
        applications: parseArrayField(req.body.applications),
        certifications: parseArrayField(req.body.certifications),
        gallery: parseArrayField(req.body.gallery),
        specificationTable: parseJSONField(req.body.specificationTable, { headers: [], rows: [] }),
        featured: req.body.featured === 'true',
        sort_order: count,
      });

      res.status(201).json({ message: 'Product created', id: product._id });
    } catch (err) {
      res.status(500).json({ message: 'Error creating product', error: err.message });
    }
  }
);

// PUT update product (admin)
router.put(
  '/:id',
  [verifyToken, checkPermission('manage_products'), upload.single('image')],
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const updates = { ...req.body };

      if (req.file) {
        if (product.image && !product.image.startsWith('http')) {
          deleteUploadedFile(product.image, uploadsDir);
        }
        updates.image = await processToAvif(req.file, uploadsDir);
      }

      // Parse JSON array fields
      ['specifications', 'subProducts', 'keyProperties', 'whyChoose', 'applications', 'certifications', 'gallery'].forEach((key) => {
        if (req.body[key] !== undefined) updates[key] = parseArrayField(req.body[key]);
      });
      
      if (req.body.specificationTable !== undefined) {
        updates.specificationTable = parseJSONField(req.body.specificationTable, { headers: [], rows: [] });
      }

      if (req.body.featured !== undefined) updates.featured = req.body.featured === 'true';

      await Product.findByIdAndUpdate(req.params.id, updates);
      res.json({ message: 'Product updated successfully' });
    } catch (err) {
      const fs = await import('fs');
      try { fs.appendFileSync('D:/demo_uis/CrestaFoods/backend/error.log', new Date().toISOString() + '\\n' + err.stack + '\\nBODY: ' + JSON.stringify(req.body) + '\\n\\n'); } catch(e){}
      res.status(500).json({ message: 'Error updating product', error: err.message });
    }
  }
);

// PUT reorder products
router.put('/utils/reorder', [verifyToken, checkPermission('manage_products')], async (req, res) => {
  try {
    const { orderedIds } = req.body;
    for (let i = 0; i < orderedIds.length; i++) {
      await Product.findByIdAndUpdate(orderedIds[i], { sort_order: i });
    }
    res.json({ message: 'Products reordered' });
  } catch (err) {
    res.status(500).json({ message: 'Error reordering products', error: err.message });
  }
});

// DELETE product (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_products')], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.image && !product.image.startsWith('http')) {
      deleteUploadedFile(product.image, uploadsDir);
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

export default router;
