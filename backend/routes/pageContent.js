// backend/routes/pageContent.js
import express from 'express';
import PageContent from '../models/PageContent.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET all fields for all pages
router.get('/', async (req, res) => {
  try {
    const rows = await PageContent.find();
    const map = {};
    rows.forEach((r) => { map[r.field_key] = r.field_value; });
    res.json(map);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all page content', error: err.message });
  }
});

// GET all fields for a page slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const rows = await PageContent.find({ page_slug: req.params.slug });
    const map = {};
    rows.forEach((r) => { map[r.field_key] = r.field_value; });
    res.json(map);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching page content', error: err.message });
  }
});

// POST/Upsert fields for a page (admin)
router.post('/:slug', verifyToken, async (req, res) => {
  const slug = req.params.slug;
  const updates = req.body; // { field_key: value, ... }

  if (typeof updates !== 'object' || Array.isArray(updates)) {
    return res.status(400).json({ message: 'Body must be an object of field_key: value pairs' });
  }

  try {
    for (const [key, value] of Object.entries(updates)) {
      await PageContent.findOneAndUpdate(
        { page_slug: slug, field_key: key },
        { page_slug: slug, field_key: key, field_value: value },
        { upsert: true, new: true }
      );
    }
    res.json({ message: 'Page content updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating page content', error: err.message });
  }
});

// DELETE a specific field
router.delete('/:slug/:key', verifyToken, async (req, res) => {
  try {
    await PageContent.findOneAndDelete({ page_slug: req.params.slug, field_key: req.params.key });
    res.json({ message: 'Field deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting field', error: err.message });
  }
});

export default router;
