import { Router } from 'express';
import { createClassification, getClassifications, getClassification, deleteClassification, getDashboardStats } from '../controllers/classificationController.js';
import { protect } from '../middleware/auth.js';
import { upload, uploadToCloudinary } from '../middleware/upload.js';

const router = Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.route('/').get(getClassifications).post(upload.single('image'), uploadToCloudinary, createClassification);
router.route('/:id').get(getClassification).delete(deleteClassification);

export default router;
