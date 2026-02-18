import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Animal from './models/Animal.js';
import Classification from './models/Classification.js';
import Image from './models/Image.js';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animal-classification';

const rand = (min, max, dec = 1) => Number((Math.random() * (max - min) + min).toFixed(dec));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const cattleBreeds = ['Holstein Friesian', 'Jersey', 'Angus', 'Hereford', 'Brahman', 'Sahiwal', 'Gir'];
const buffaloBreeds = ['Murrah', 'Nili-Ravi', 'Surti', 'Mehsana', 'Jaffarabadi'];
const bcsCategories = ['emaciated', 'thin', 'moderate', 'good', 'obese'];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([User.deleteMany({}), Animal.deleteMany({}), Classification.deleteMany({}), Image.deleteMany({})]);
  console.log('Cleared existing data');

  const user = await User.create({
    name: 'Dr. Sarah Johnson',
    email: 'demo@example.com',
    password: 'password123',
    role: 'researcher',
    organization: 'National Livestock Research Institute',
  });
  console.log('Created demo user: demo@example.com / password123');

  const animals = [];
  for (let i = 0; i < 15; i++) {
    const species = i < 8 ? 'cattle' : 'buffalo';
    animals.push(await Animal.create({
      tag: `ANM-${String(i + 1).padStart(4, '0')}`,
      name: `Animal ${i + 1}`,
      species,
      breed: pick(species === 'cattle' ? cattleBreeds : buffaloBreeds),
      age: rand(1, 12, 0),
      sex: pick(['male', 'female']),
      owner: user._id,
    }));
  }
  console.log(`Created ${animals.length} animals`);

  for (let i = 0; i < 30; i++) {
    const image = await Image.create({
      filename: `sample-${i + 1}.jpg`,
      originalName: `field-capture-${i + 1}.jpg`,
      mimetype: 'image/jpeg',
      size: rand(500000, 3000000, 0),
      path: `uploads/sample-${i + 1}.jpg`,
      user: user._id,
    });

    const isCattle = i < 16;
    const animalType = isCattle ? 'cattle' : 'buffalo';
    const breeds = isCattle ? cattleBreeds : buffaloBreeds;
    const primary = pick(breeds);
    const bcs = rand(2.5, 8.5);
    const bcsIdx = bcs <= 2 ? 0 : bcs <= 4 ? 1 : bcs <= 6 ? 2 : bcs <= 7.5 ? 3 : 4;

    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    await Classification.create({
      user: user._id,
      animal: animals[i % animals.length]._id,
      image: image._id,
      measurements: {
        bodyLength: rand(isCattle ? 130 : 140, isCattle ? 180 : 195),
        heartGirth: rand(isCattle ? 155 : 170, isCattle ? 210 : 230),
        heightAtWithers: rand(isCattle ? 110 : 120, isCattle ? 150 : 160),
        hipWidth: rand(isCattle ? 38 : 42, isCattle ? 58 : 65),
        bodyConditionScore: bcs,
      },
      atcResult: {
        animalType,
        breedPrediction: primary,
        confidence: rand(0.72, 0.98, 3),
        secondaryBreed: pick(breeds.filter(b => b !== primary)),
        secondaryConfidence: rand(0.05, 0.25, 3),
        atcScore: rand(55, 97),
        bodyConditionCategory: bcsCategories[bcsIdx],
        overlayDescription: 'Morphometric analysis overlay with key anatomical landmarks identified.',
      },
      status: 'completed',
      processingTime: rand(1200, 3500, 0),
      createdAt,
    });
  }

  console.log('Created 30 sample classifications');
  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
