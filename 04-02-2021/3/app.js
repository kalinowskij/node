let express = require('express'); //подключаем модуль express
let route = require('./routes/login.js'); //подключаем файл с роутом
let app = express();//создаем приложение express
app.use('/', route);
app.listen(8080); //Настраиваем express приложение слушать запросы на 80 порту

app.use(express.static('public')); /* настраиваем статический сервер, для отдачи контента из папки
public */
