// backend/routes/statistics.js
import express from 'express';
import Statistic from '../models/Statistic.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// GET all statistics (public)
router.get('/', async (req, res) => {
  try {
    const stats = await Statistic.find().sort({ sort_order: 1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching statistics', error: err.message });
  }
});

// POST create statistic (admin)
router.post('/', [verifyToken, checkPermission('manage_statistics')], async (req, res) => {
  try {
    const count = await Statistic.countDocuments();
    const stat = await Statistic.create({ ...req.body, sort_order: count });
    res.status(201).json({ message: 'Statistic created', id: stat._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating statistic', error: err.message });
  }
});

// PUT update statistic (admin)
router.put('/:id', [verifyToken, checkPermission('manage_statistics')], async (req, res) => {
  try {
    await Statistic.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Statistic updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating statistic', error: err.message });
  }
});

// DELETE statistic (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_statistics')], async (req, res) => {
  try {
    await Statistic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Statistic deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting statistic', error: err.message });
  }
});

// PUT reorder
router.put('/utils/reorder', [verifyToken, checkPermission('manage_statistics')], async (req, res) => {
  try {
    const { orderedIds } = req.body;
    for (let i = 0; i < orderedIds.length; i++) {
      await Statistic.findByIdAndUpdate(orderedIds[i], { sort_order: i });
    }
    res.json({ message: 'Statistics reordered' });
  } catch (err) {
    res.status(500).json({ message: 'Error reordering statistics', error: err.message });
  }
});

export default router;
