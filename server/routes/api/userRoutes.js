import express from 'express';
const router = express.Router();

import {home,updateUser} from '../../controller/user.controller.js';
import { verifyToken } from '../../utils/verifyUser.js';

router.get('/',home);
router.post('/update/:id',verifyToken,updateUser)

export default router;