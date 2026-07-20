// backend/models/Statistic.js
import mongoose from 'mongoose';

const statisticSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '' },
    prefix: { type: String, default: '' },
    decimals: { type: Number, default: 0 },
    icon: { type: String, default: '' },
    description: { type: String },
    sort_order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Statistic', statisticSchema);
