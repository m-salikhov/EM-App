import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { findUserByEmail } from '../User/user.service';

export const login = async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Не указаны логин или пароль' });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Пользователь не найден' });
    }

    if (!user.isActive) {
      return res.status(400).json({ error: 'Пользователь заблокирован' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный пароль' });
    }

    // Устанавливаем данные в сессию
    req.session.userId = user.id;
    req.session.userRole = user.role;
    res.json({ message: 'Пользователь успешно авторизован', userId: user.id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Ошибка при выходе' });
    }
    res.json({ message: 'Выход из аккаунта' });
  });
};
