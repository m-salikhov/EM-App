import { Request, Response, NextFunction } from 'express';

// Проверка, что пользователь админ
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userRole !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора' });
  }
  next();
};

// Проверка, что пользователь запрашивает себя или является админом
export const requireSelfOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  const targetId = parseInt(req.params.id);
  const userId = req.session.userId;
  const userRole = req.session.userRole;

  if (userId !== targetId && userRole !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }
  next();
};
