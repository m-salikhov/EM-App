import { Router } from 'express';
import { login, logout } from './auth.controller';
import { authMiddleware } from './Middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/logout', authMiddleware, logout);

export default router;
