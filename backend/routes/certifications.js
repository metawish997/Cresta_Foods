import express from 'express';
import Certification from '../models/Certification.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all active certifications (public)
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find({ status: 'ACTIVE' }).sort({ sort_order: 1 });
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Get all certifications
router.get('/all', [verifyToken, checkPermission('manage_clients')], async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ sort_order: 1 });
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Create certification
router.post('/', [verifyToken, checkPermission('manage_clients')], async (req, res) => {
  try {
    const certification = new Certification(req.body);
    const newCertification = await certification.save();
    res.status(201).json(newCertification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Update certification
router.put('/:id', [verifyToken, checkPermission('manage_clients')], async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    res.json(certification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Delete certification
router.delete('/:id', [verifyToken, checkPermission('manage_clients')], async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    res.json({ message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
