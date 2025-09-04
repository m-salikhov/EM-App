import { Router } from 'express';
import { changeUserActiveStatus, createUser, getAllUsers, getUserById } from './user.controller';
import { authMiddleware } from '../Auth/Middlewares/auth.middleware';
import { requireAdmin, requireSelfOrAdmin } from '../Auth/Middlewares/role.middleware';

const router = Router();

router.post('/', createUser);
router.get('/all', authMiddleware, requireAdmin, getAllUsers);
router.get('/:id', authMiddleware, requireSelfOrAdmin, getUserById);
router.patch('/:id/active', authMiddleware, requireSelfOrAdmin, changeUserActiveStatus);

export default router;
