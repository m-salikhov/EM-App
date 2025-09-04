import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
