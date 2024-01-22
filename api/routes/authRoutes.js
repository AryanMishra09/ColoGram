import express from 'express';
import { signin, signup } from '../controllers/authController.js';

const router = express.Router();

// for signup a user : (/api/auth/signup):
router.post('/signup', signup);

// for signin a user : (/api/auth/signin):
router.post('/signin', signin);

export default router;