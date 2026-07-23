import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Media from './models/Media.js';
import connectDB from './config/db.js';
import './loadEnv.js';
import { uploadsDir } from './config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedMedia = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    if (!fs.existsSync(uploadsDir)) {
      console.log('Uploads directory does not exist. Nothing to seed.');
      process.exit(0);
    }

    const files = fs.readdirSync(uploadsDir);
    let addedCount = 0;

    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const existingMedia = await Media.findOne({ filename: file });
        
        if (!existingMedia) {
          const newMedia = new Media({
            filename: file,
            originalName: file,
            url: `/uploads/${file}`,
            mimetype: 'image/avif', // Assume avif or we can infer from ext, but we just need a record
            size: stats.size,
            isActive: true, // Existing files should be active so we don't break existing content
          });
          
          await newMedia.save();
          addedCount++;
          console.log(`Added missing record for ${file}`);
        }
      }
    }

    console.log(`Media seeding completed. Added ${addedCount} new records.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding media:', error);
    process.exit(1);
  }
};

seedMedia();
