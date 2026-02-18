import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Use memory storage — no disk writes
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.uploadMaxSize },
});

// Middleware to upload buffer to Cloudinary after multer processes it
export const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'animal-classification', resource_type: 'image' },
    (error, result) => {
      if (error) return next(error);
      // Attach cloudinary info to req.file so the controller can use it
      req.file.cloudinary = result;
      req.file.path = result.secure_url;
      req.file.filename = result.public_id;
      next();
    }
  );

  stream.end(req.file.buffer);
};
