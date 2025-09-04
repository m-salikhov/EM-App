// По умолчанию пользователь создаются как user и статусом isActive = true
// Админские права надо выдать пользователю вручную
// Или создать пользователя с email = admin@admin.com - сделано просто для удобства, только для демо
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: string;
  email: string;
  password: string;
}
