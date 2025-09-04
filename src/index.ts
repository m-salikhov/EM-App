import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './Modules/User/user.routes';
import session from 'express-session';
import authRoutes from './Modules/Auth/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

async function start() {
  try {
    await AppDataSource.initialize();
    console.log('База данных инициализирована');
  } catch (error) {
    console.error('Ошибка инициализации базы данных', error);
  }

  const app = express();

  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret_fallback',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  );

  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);
  app.use((req, res) => {
    res.status(404).json({ message: 'Маршрут не найден' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
  });
}

start();
