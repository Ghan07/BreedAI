import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema({
  bodyLength: { type: Number, required: true },
  heartGirth: { type: Number, required: true },
  heightAtWithers: { type: Number, required: true },
  hipWidth: { type: Number, required: true },
  bodyConditionScore: { type: Number, required: true, min: 1, max: 9 },
}, { _id: false });

const atcResultSchema = new mongoose.Schema({
  animalType: { type: String, enum: ['cattle', 'buffalo'], required: true },
  breedPrediction: { type: String, required: true },
  confidence: { type: Number, required: true, min: 0, max: 1 },
  secondaryBreed: { type: String, default: '' },
  secondaryConfidence: { type: Number, default: 0 },
  atcScore: { type: Number, required: true, min: 0, max: 100 },
  bodyConditionCategory: { type: String, enum: ['emaciated', 'thin', 'moderate', 'good', 'obese'], required: true },
  overlayDescription: { type: String, default: '' },
}, { _id: false });

const classificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  measurements: { type: measurementSchema, required: true },
  atcResult: { type: atcResultSchema, required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'completed' },
  processingTime: { type: Number, default: 0 },
  notes: { type: String, default: '' },
}, { timestamps: true });

classificationSchema.index({ user: 1, createdAt: -1 });
classificationSchema.index({ 'atcResult.animalType': 1 });
classificationSchema.index({ status: 1 });

export default mongoose.model('Classification', classificationSchema);
