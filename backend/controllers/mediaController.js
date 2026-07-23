import Media from '../models/Media.js';
import fs from 'fs';
import path from 'path';
import { uploadsDir } from '../config/env.js';

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get media files', error: err.message });
  }
};

export const getPublicMedia = async (req, res) => {
  try {
    const media = await Media.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get public media', error: err.message });
  }
};

export const toggleMediaStatus = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    media.isActive = !media.isActive;
    await media.save();
    
    res.json({ message: `Media is now ${media.isActive ? 'Active' : 'Inactive'}`, media });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle media status', error: err.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete from DB
    await media.deleteOne();

    // Delete physical file
    const filePath = path.join(uploadsDir, media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Media deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete media', error: err.message });
  }
};
