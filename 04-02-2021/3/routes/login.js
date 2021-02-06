let express = require('express'); //подключаем модуль express
let router = express.Router(); //создаем новый роутер
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.post('/login', (req, res, next) => {
    console.log('Обработка запроса: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(req.body)); //Отправляем присланные параметры обратно клиенту
});
module.exports = router; //Экспортируем роутер из модуля
