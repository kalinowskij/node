let express = require('express'); //подключаем модуль express
let route = require('./routes/login.js'); //подключаем файл с роутом
let app = express();//создаем приложение express
let mustacheExpress = require('mustache-express');
// Регистрируем '.mustache' расширение как шаблоны Mustache Express
app.set('views', __dirname + '/views'); //указываем расположение папки с шаблонами
app.engine('mustache', mustacheExpress()); //регистрируем шаблонизатор Mustache в Express
app.set('view engine', 'mustache'); //указываем использовать Mustache в качестве шаблонизатора
app.use('/', route);
app.listen(8080); //Настраиваем express приложение слушать запросы на 80 порту

app.use(express.static('public')); /* настраиваем статический сервер, для отдачи контента из папки
public */
