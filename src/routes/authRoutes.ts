import express from 'express';
import { deleteUser, login, signup } from '../controller/authController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/', authenticateToken, deleteUser);

export default router;
