// 2**. Задание на HTML, CSS, JS (Ajax) и NodeJS: Разработать сервер,
//     который умеет отдавать запрашиваемые html страницы и JSON файлы.
//     Дана страница index.html. В ней есть блок #container и кнопка вне
// этого блока. Дан также файл users.json, в ней хранится массив
// пользователей в формате JSON. Сделайте так, чтобы по нажатию на
// кнопку в #container появился список пользователей из users.json в
// виде списка <ul> - каждый пользователь в своем <li>.
let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer((request, response) => {
    let pathname, extname, mimeType;
    let mimeTypes = {
        '.html': 'text/html',
        '.json': 'application/json',
    };
    console.log("Request: " + request.url);
    if (request.url === '/')
        pathname = 'site/index.html';
    else
        pathname = 'site' + request.url;
    extname = path.extname(pathname);
    mimeType = mimeTypes[extname];
    fs.readFile(pathname, 'utf8', (err, data) => {
        if (err) {console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${pathname} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type': mimeType});
            response.end(data);
        }
    });
}).listen(8080, ()=>{
    console.log("HTTP server works in 8080 port!\n");
});
