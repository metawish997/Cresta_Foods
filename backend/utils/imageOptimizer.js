// backend/utils/imageOptimizer.js
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Convert an uploaded image file to AVIF format using sharp.
 * Deletes the original and returns the new filename.
 * @param {object} file - Multer file object
 * @param {string} uploadsDir - Absolute path to uploads directory
 * @returns {string} New filename (AVIF)
 */
export const processToAvif = async (file, uploadsDir) => {
  const originalPath = file.path;
  const baseName = path.basename(file.filename, path.extname(file.filename));
  const newFilename = `${baseName}.avif`;
  const outputPath = path.join(uploadsDir, newFilename);

  try {
    await sharp(originalPath)
      .avif({ quality: 75 })
      .toFile(outputPath);

    // Remove original file
    fs.unlinkSync(originalPath);

    return newFilename;
  } catch (err) {
    console.error('AVIF conversion failed, keeping original:', err.message);
    return file.filename; // fallback to original
  }
};

/**
 * Delete a file from the uploads directory
 */
export const deleteUploadedFile = (filename, uploadsDir) => {
  try {
    if (!filename) return;
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error(`Failed to delete file ${filename}:`, err.message);
  }
};
