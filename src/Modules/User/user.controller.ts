import { Request, Response } from 'express';
import { CreateUserDto } from './Dto/CreateUser.dto';
import { findUserById, saveUser, updateIsActive, findAllUsers } from './user.service';

export const createUser = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  try {
    const { firstName, lastName, birthDate, email, password } = req.body;

    // Проверяем обязательные поля
    if (!firstName || !lastName || !birthDate || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Не все обязательные поля заполнены: firstName, lastName, birthDate, email, password' });
    }

    const { password: _, ...savedUser } = await saveUser(req.body);

    res.status(201).json({ savedUser });
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message) {
      res.status(400).json({ message: error.message });
    } else res.status(500).json({ message: 'Ошибка сервера при создании пользователя' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const targetId = parseInt(req.params.id);

  if (isNaN(targetId)) {
    return res.status(400).json({ message: 'Id пользователя должен быть числом' });
  }

  try {
    const { password, ...userWithoutPassword } = await findUserById(targetId);

    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message) {
      res.status(404).json({ message: error.message });
    } else res.status(500).json({ message: 'Ошибка сервера при создании пользователя' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Получаем всех пользователей без паролей
    const users = await findAllUsers();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const changeUserActiveStatus = async (req: Request, res: Response) => {
  const targetId = parseInt(req.params.id);
  const userRole = req.session.userRole;

  //user может только деактивировать свой аккаунт
  if (userRole === 'user') {
    try {
      await updateIsActive(targetId, false);

      res.json({ message: 'Пользователь деактивирован' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера при деактивации пользователя' });
    }
  }

  //admin может изменить статус любого аккаунта. То есть меняет isActive на противоположный
  if (userRole === 'admin') {
    try {
      const user = await findUserById(targetId);

      await updateIsActive(targetId, !user.isActive);

      res.json({ message: 'Статус пользователя изменен', updatedUserID: targetId, isActive: !user.isActive });
    } catch (error) {
      console.error(error);

      if (error instanceof Error && error.message) {
        res.status(404).json({ message: error.message });
      } else res.status(500).json({ message: 'Ошибка сервера при создании пользователя' });
    }
  }
};
