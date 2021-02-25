**Как вы думаете в чём отличаются термины аутентификация и авторизация?**
Аутентификация — процедура проверки подлинности, например проверка подлинности пользователя путем сравнения введенного им пароля с паролем, сохраненным в базе данных. Авторизация — предоставление определенному лицу или группе лиц прав на выполнение определенных действий

**Как вы думаете почему (для чего) пароль (в файле users.js) хранится в зашифрованном виде?**
Для затруднения использования паролей, в случаи их получения другими лицами

**Для чего при шифровании пароля добавляется соль ('salt')?**
Для затруднения расшифровки пароля

**Почему (за счёт чего) у не авторизовавшегося пользователя не получается получить секретную информацию по пути: http://localhost:8000/admin/secret.**
Потому что в файле роутера, перед обработкой маршрута admin/secret вступает в силу проверка наличия токена в печеньках. А он может быть только у авторизованных пользователей. 
**Как вы думаете для чего выводить фразу при неверной аутентификации: Invalid login/password pair?**
Чтобы злоумышленники не знали логин или пароль остается неверным. Это затрудняет взлом.
**Как вы думаете в чём особенность (достоинства и недостатки) данной реализации аутентификации и авторизации пользователя?**
Достойнства: простота реализации, невозможно управлять временем жизни данных авторизации на клиенте
Недостатки: 
1 Хранение токенов в ОП, 
2. Отсутствие ролей, позволяющих управлять доступами к ресурсам разным зарегистрированным пользователям