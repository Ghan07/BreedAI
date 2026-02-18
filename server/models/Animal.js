import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  tag: { type: String, unique: true, sparse: true, trim: true },
  name: { type: String, trim: true, default: '' },
  species: { type: String, enum: ['cattle', 'buffalo'], required: true },
  breed: { type: String, trim: true, default: '' },
  age: { type: Number, min: 0 },
  sex: { type: String, enum: ['male', 'female', 'unknown'], default: 'unknown' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Animal', animalSchema);
