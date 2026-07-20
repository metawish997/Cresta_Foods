// backend/routes/clients.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import Client from '../models/Client.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { processToAvif, deleteUploadedFile } from '../utils/imageOptimizer.js';
import { uploadsDir } from '../config/env.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `client-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET all clients (public — ACTIVE only)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'ACTIVE' };
    const clients = await Client.find(filter).sort({ sort_order: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients', error: err.message });
  }
});

// POST create (admin)
router.post(
  '/',
  [verifyToken, checkPermission('manage_clients'), upload.single('logo')],
  async (req, res) => {
    try {
      if (!req.body.name) return res.status(400).json({ message: 'Client name is required' });

      let logoPath = '';
      if (req.file) logoPath = await processToAvif(req.file, uploadsDir);

      const count = await Client.countDocuments();
      const client = await Client.create({
        name: req.body.name,
        logo_path: logoPath,
        website_url: req.body.website_url || '',
        status: req.body.status || 'ACTIVE',
        sort_order: count,
      });
      res.status(201).json({ message: 'Client created', id: client._id });
    } catch (err) {
      res.status(500).json({ message: 'Error creating client', error: err.message });
    }
  }
);

// PUT update (admin)
router.put(
  '/:id',
  [verifyToken, checkPermission('manage_clients'), upload.single('logo')],
  async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) return res.status(404).json({ message: 'Client not found' });

      const updates = { ...req.body };
      if (req.file) {
        if (client.logo_path) deleteUploadedFile(client.logo_path, uploadsDir);
        updates.logo_path = await processToAvif(req.file, uploadsDir);
      }

      await Client.findByIdAndUpdate(req.params.id, updates);
      res.json({ message: 'Client updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating client', error: err.message });
    }
  }
);

// PUT reorder
router.put('/utils/reorder', [verifyToken, checkPermission('manage_clients')], async (req, res) => {
  try {
    const { orderedIds } = req.body;
    for (let i = 0; i < orderedIds.length; i++) {
      await Client.findByIdAndUpdate(orderedIds[i], { sort_order: i });
    }
    res.json({ message: 'Clients reordered' });
  } catch (err) {
    res.status(500).json({ message: 'Error reordering clients', error: err.message });
  }
});

// DELETE (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_clients')], async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    if (client.logo_path) deleteUploadedFile(client.logo_path, uploadsDir);
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client', error: err.message });
  }
});

export default router;
