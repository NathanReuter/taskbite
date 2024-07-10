import express from 'express';
import { deleteUser, login, me, signup } from '../controller/authController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticateToken, me);
router.delete('/', authenticateToken, deleteUser);

export default router;
