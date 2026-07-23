import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    originalName: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
    },
    size: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
