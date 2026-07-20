// backend/routes/blogs.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import Blog from '../models/Blog.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { processToAvif, deleteUploadedFile } from '../utils/imageOptimizer.js';
import { uploadsDir } from '../config/env.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `blog-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

// GET all blogs (public — PUBLISHED only unless admin passes all=true)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'PUBLISHED' };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
});

// GET single blog by ID (admin/public)
router.get('/id/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
});

// GET single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
});

// POST create blog (admin)
router.post(
  '/',
  [verifyToken, checkPermission('manage_blogs'), upload.single('image')],
  async (req, res) => {
    try {
      if (!req.body.slug || !req.body.title) {
        return res.status(400).json({ message: 'Title and slug are required' });
      }

      const existing = await Blog.findOne({ slug: req.body.slug });
      if (existing) return res.status(409).json({ message: 'Blog with this slug already exists' });

      let imagePath = req.body.image || '';
      if (req.file) imagePath = await processToAvif(req.file, uploadsDir);

      const tags = req.body.tags ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : [];

      const blog = await Blog.create({
        ...req.body,
        image: imagePath,
        tags,
        featured: req.body.featured === 'true',
      });

      res.status(201).json({ message: 'Blog created', id: blog._id });
    } catch (err) {
      res.status(500).json({ message: 'Error creating blog', error: err.message });
    }
  }
);

// PUT update blog (admin)
router.put(
  '/:id',
  [verifyToken, checkPermission('manage_blogs'), upload.single('image')],
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });

      const updates = { ...req.body };

      if (req.file) {
        if (blog.image && !blog.image.startsWith('http')) {
          deleteUploadedFile(blog.image, uploadsDir);
        }
        updates.image = await processToAvif(req.file, uploadsDir);
      }

      if (req.body.tags) {
        updates.tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
      }
      if (req.body.featured !== undefined) updates.featured = req.body.featured === 'true';

      await Blog.findByIdAndUpdate(req.params.id, updates);
      res.json({ message: 'Blog updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating blog', error: err.message });
    }
  }
);

// DELETE blog (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_blogs')], async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.image && !blog.image.startsWith('http')) {
      deleteUploadedFile(blog.image, uploadsDir);
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
});

export default router;
