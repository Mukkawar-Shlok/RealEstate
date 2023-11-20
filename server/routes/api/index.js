import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
export default router;
