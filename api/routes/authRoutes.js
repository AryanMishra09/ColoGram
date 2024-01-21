import express from 'express';
import { signup } from '../controllers/authController.js';

const router = express.Router();

// for signup a user : (/api/auth/signup):
router.post('/signup', signup);

export default router;