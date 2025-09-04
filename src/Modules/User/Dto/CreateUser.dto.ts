// types/user.types.ts или в том же файле
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: string;
  email: string;
  password: string;
}
