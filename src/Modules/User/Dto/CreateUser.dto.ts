// По умолчанию пользователь создаются как user и статусом isActive = true
// Админские права надо выдать пользователю вручную
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: string;
  email: string;
  password: string;
}
