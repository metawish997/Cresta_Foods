// backend/routes/heroSlides.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import HeroSlide from '../models/HeroSlide.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { processToAvif, deleteUploadedFile } from '../utils/imageOptimizer.js';
import { uploadsDir } from '../config/env.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `slide-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// GET all slides (public — ACTIVE only for public, all for admin)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'ACTIVE' };
    const slides = await HeroSlide.find(filter).sort({ sort_order: 1, createdAt: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching slides', error: err.message });
  }
});

// POST create slide (admin)
router.post(
  '/',
  [verifyToken, checkPermission('manage_hero_slides'), upload.single('image')],
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'Image file is required' });

      const newFilename = await processToAvif(req.file, uploadsDir);
      const count = await HeroSlide.countDocuments();

      const slide = await HeroSlide.create({
        image_path: newFilename,
        alt_text: req.body.alt_text || '',
        sort_order: count,
        status: req.body.status || 'ACTIVE',
      });

      res.status(201).json({ message: 'Slide created', slide });
    } catch (err) {
      res.status(500).json({ message: 'Error creating slide', error: err.message });
    }
  }
);

// PUT update slide (admin) — can update status, alt_text, sort_order, or image
router.put(
  '/:id',
  [verifyToken, checkPermission('manage_hero_slides'), upload.single('image')],
  async (req, res) => {
    try {
      const slide = await HeroSlide.findById(req.params.id);
      if (!slide) return res.status(404).json({ message: 'Slide not found' });

      const updates = {};
      if (req.body.alt_text !== undefined) updates.alt_text = req.body.alt_text;
      if (req.body.status) updates.status = req.body.status;
      if (req.body.sort_order !== undefined) updates.sort_order = Number(req.body.sort_order);

      if (req.file) {
        // Delete old file
        deleteUploadedFile(slide.image_path, uploadsDir);
        const newFilename = await processToAvif(req.file, uploadsDir);
        updates.image_path = newFilename;
      }

      await HeroSlide.findByIdAndUpdate(req.params.id, updates);
      res.json({ message: 'Slide updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating slide', error: err.message });
    }
  }
);

// PUT reorder slides
router.put(
  '/utils/reorder',
  [verifyToken, checkPermission('manage_hero_slides')],
  async (req, res) => {
    try {
      const { orderedIds } = req.body;
      if (!Array.isArray(orderedIds)) return res.status(400).json({ message: 'orderedIds must be an array' });

      for (let i = 0; i < orderedIds.length; i++) {
        await HeroSlide.findByIdAndUpdate(orderedIds[i], { sort_order: i });
      }
      res.json({ message: 'Slides reordered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error reordering slides', error: err.message });
    }
  }
);

// DELETE slide (admin)
router.delete(
  '/:id',
  [verifyToken, checkPermission('manage_hero_slides')],
  async (req, res) => {
    try {
      const slide = await HeroSlide.findById(req.params.id);
      if (!slide) return res.status(404).json({ message: 'Slide not found' });

      deleteUploadedFile(slide.image_path, uploadsDir);
      await HeroSlide.findByIdAndDelete(req.params.id);
      res.json({ message: 'Slide deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting slide', error: err.message });
    }
  }
);

export default router;
