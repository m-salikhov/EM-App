**Запуск:**  
git clone https://github.com/m-salikhov/EM-App.git  
cd .\EA-App\
npm i  
npm run dev

json для создания пользователя:
{
"firstName": "Вася",
"lastName": "Васин",
"patronymic": "Васильевич",
"birthDate": "1988-05-11",
"email": "example@mail.com",
"password": "password"
}

json для создания пользователя c ролью админа (просто для удобства в dev режиме):
{
"firstName": "Вася",
"lastName": "Васин",
"patronymic": "Юрьевич",
"birthDate": "1988-05-11",
"email": "admin@admin.com",
"password": "password"
}
