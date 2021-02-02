let http = require('http');
let fs = require('fs');
http.createServer((request, response) => {
    let pathname = 'site/index.html';
    console.log("Request: " + request.url);
    fs.readFile(pathname, 'utf8', (err, data) => {
        if (err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${pathname} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        }
    });
}).listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
});
// Запустите браузер с адресом http://localhost:8080 и наблюдайте что будет выводится в консоли?
//     Почему так происходит?
// Потому что при первом обращении к серверу браузер получает в ответ найденный файл index.html
// Потом браузер находит на странице ссылки на другие файлы (скрипт, стили, картинки) и обращается
// к ним отельными запросами к тому же серверу. По этой причине мы наблюдаем в консоле несколько запросов к серверу.
