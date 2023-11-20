import express from 'express';
const router = express.Router();

import home from '../../controller/user.controller.js';

router.get('/',home);

export default router;