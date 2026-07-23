// backend/routes/upload.js — General purpose image upload (AVIF)
import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middleware/auth.js';
import { processToAvif } from '../utils/imageOptimizer.js';
import { uploadsDir } from '../config/env.js';
import Media from '../models/Media.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `upload-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

// POST /api/upload/image — Upload a single image, returns URL
router.post('/image', [verifyToken, upload.single('image')], async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    const newFilename = await processToAvif(req.file, uploadsDir);
    const fileUrl = `/uploads/${newFilename}`;

    const newMedia = new Media({
      filename: newFilename,
      originalName: req.file.originalname,
      url: fileUrl,
      mimetype: 'image/avif',
      size: req.file.size,
      isActive: false, // Default inactive
    });
    await newMedia.save();

    res.json({
      url: fileUrl,
      filename: newFilename,
      media: newMedia
    });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
});

export default router;
