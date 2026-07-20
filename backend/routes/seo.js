// backend/routes/seo.js
import express from 'express';
import SeoSetting from '../models/SeoSetting.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// GET all SEO settings (admin)
router.get('/', [verifyToken, checkPermission('manage_seo')], async (req, res) => {
  try {
    const settings = await SeoSetting.find().sort({ page_slug: 1 });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching SEO settings', error: err.message });
  }
});

// GET single page SEO by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const setting = await SeoSetting.findOne({ page_slug: req.params.slug });
    if (!setting) return res.status(404).json({ message: 'SEO setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching SEO setting', error: err.message });
  }
});

// POST create SEO setting (admin)
router.post('/', [verifyToken, checkPermission('manage_seo')], async (req, res) => {
  const { page_slug, page_name, title, description, keywords, og_image } = req.body;
  if (!page_slug) return res.status(400).json({ message: 'page_slug is required' });
  try {
    const result = await SeoSetting.findOneAndUpdate(
      { page_slug },
      { page_slug, page_name, title, description, keywords, og_image },
      { upsert: true, new: true }
    );
    res.status(201).json({ message: 'SEO setting saved', id: result._id });
  } catch (err) {
    res.status(500).json({ message: 'Error saving SEO setting', error: err.message });
  }
});

// PUT update SEO setting (admin)
router.put('/:id', [verifyToken, checkPermission('manage_seo')], async (req, res) => {
  try {
    await SeoSetting.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'SEO setting updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating SEO setting', error: err.message });
  }
});

// DELETE (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_seo')], async (req, res) => {
  try {
    await SeoSetting.findByIdAndDelete(req.params.id);
    res.json({ message: 'SEO setting deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting SEO setting', error: err.message });
  }
});

export default router;
