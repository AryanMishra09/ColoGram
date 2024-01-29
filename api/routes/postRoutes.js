import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts } from "../controllers/postController.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);

export default router;