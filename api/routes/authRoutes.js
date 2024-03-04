import express from 'express';
import { google, signin, signup, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

// for signup a user : (/api/auth/signup):
router.post('/signup', signup);

//for verifying user email: (/api/auth/verify)
router.get('/verify', verifyEmail);

// for signin a user : (/api/auth/signin):
router.post('/signin', signin);

// for signin//signup a user through google popup : (/api/auth/google):
router.post('/google', google);

export default router;