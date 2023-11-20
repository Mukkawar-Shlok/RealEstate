import express from 'express';
const router = express.Router();

import api from './api/index.js'

// user routes
router.use('/api',api);

//auth routes


export default router;