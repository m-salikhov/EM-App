import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../../User/user.service';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Проверка, что пользователь авторизован и не заблокирован
  if (req.session && req.session.userId) {
    const userId = req.session.userId;

    const { isActive } = await findUserById(userId);

    if (!isActive) {
      return res.status(401).json({ error: 'Пользователь заблокирован' });
    }

    next();
  } else {
    res.status(401).json({ error: 'Необходима авторизация' });
  }
};
