import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// По умолчанию пользователь создаются как user и статусом isActive = true
// Админские права надо выдать пользователю вручную
// Или создать пользователя с email = admin@admin.com - сделано просто для удобства, только для демо
export type UserRole = 'user' | 'admin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: 'varchar', nullable: true })
  patronymic!: string | null;

  @Column({ type: 'date' })
  birthDate!: Date;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    default: 'user',
  })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;
}
