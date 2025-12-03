import express from 'express';
import { getAllUsers } from '../controller/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getAllUsers);

export default router;