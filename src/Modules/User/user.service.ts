import { AppDataSource } from '../../data-source';
import { CreateUserDto } from './Dto/CreateUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

export const userRepository = AppDataSource.getRepository(User);

export const saveUser = async (createUserDto: CreateUserDto) => {
  const { firstName, lastName, patronymic, birthDate, email, password } = createUserDto;

  const isExists = await userRepository.existsBy({ email });
  if (isExists) {
    throw new Error('Email уже зарегистрирован');
  }

  // По умолчанию пользователь создаётся c ролью user и статусом isActive = true
  // Админские права надо выдать пользователю вручную
  // Или создать пользователя с email = admin@admin.com - сделано просто для удобства, только для демо
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.patronymic = patronymic || null;
  user.birthDate = new Date(birthDate);
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  if (email === 'admin@admin.com') {
    user.role = 'admin';
  }

  return await userRepository.save(user);
};

export const findUserByEmail = async (email: string) => {
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  return user;
};

export const findUserById = async (id: number) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  return user;
};

export const findAllUsers = async () => {
  // Получаем всех пользователей без паролей
  return await userRepository.find({
    select: ['id', 'firstName', 'lastName', 'patronymic', 'birthDate', 'email', 'isActive', 'role'],
  });
};

export const updateIsActive = async (id: number, isActive: boolean) => {
  await userRepository.update(id, { isActive });
};
