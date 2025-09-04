import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './Modules/User/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
});
