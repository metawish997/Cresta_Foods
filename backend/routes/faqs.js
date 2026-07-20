// backend/routes/faqs.js
import express from 'express';
import Faq from '../models/Faq.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// GET all FAQs (public)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const faqs = await Faq.find(filter).sort({ sort_order: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FAQs', error: err.message });
  }
});

// POST create FAQ (admin)
router.post('/', [verifyToken, checkPermission('manage_faqs')], async (req, res) => {
  const { question, answer, category } = req.body;
  if (!question || !answer) return res.status(400).json({ message: 'Question and answer are required' });
  try {
    const count = await Faq.countDocuments();
    const faq = await Faq.create({ question, answer, category, sort_order: count });
    res.status(201).json({ message: 'FAQ created', id: faq._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating FAQ', error: err.message });
  }
});

// PUT update FAQ (admin)
router.put('/:id', [verifyToken, checkPermission('manage_faqs')], async (req, res) => {
  try {
    await Faq.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'FAQ updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating FAQ', error: err.message });
  }
});

// PUT reorder FAQs (admin)
router.put('/utils/reorder', [verifyToken, checkPermission('manage_faqs')], async (req, res) => {
  try {
    const { orderedIds } = req.body;
    for (let i = 0; i < orderedIds.length; i++) {
      await Faq.findByIdAndUpdate(orderedIds[i], { sort_order: i });
    }
    res.json({ message: 'FAQs reordered' });
  } catch (err) {
    res.status(500).json({ message: 'Error reordering FAQs', error: err.message });
  }
});

// DELETE FAQ (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_faqs')], async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting FAQ', error: err.message });
  }
});

export default router;
