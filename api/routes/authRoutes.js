import express from 'express';
import { google, signin, signup } from '../controllers/authController.js';

const router = express.Router();

// for signup a user : (/api/auth/signup):
router.post('/signup', signup);

// for signin a user : (/api/auth/signin):
router.post('/signin', signin);

// for signin//signup a user through google popup : (/api/auth/google):
router.post('/google', google);

export default router;