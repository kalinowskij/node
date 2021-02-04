// 3***. Задание на HTML, CSS, JS (Ajax) и NodeJS: Разработать сервер,
//     который умеет отдавать запрашиваемые html страницы и JSON данные.
//     Дана страница с товарами product.html. Дан файл products.json в
// котором есть 8 товаров. По загрузке страницы product.html страница
// запрашивает первые четыре товара с сервера из файла products.json,
//     и отстраивает краткие карточки четырёх товаров. Внизу страницы
// product.html расположена кнопка «Показать ещё товары» по нажатию
// на которые догружается оставшиеся 4 товара из файла products.json
// и отстраиваются их карточки.
let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');

http.createServer((request, response) => {
    let pathname, extname, mimeType;
    let mimeTypes = {
        '.html': 'text/html',
        '.json': 'application/json',
    };
    console.log("Request: " + request.url);
    let parsed = url.parse(request.url);
    if (request.url === '/')
        pathname = 'site/index.html';
    else
        pathname = 'site' + parsed.pathname;


    extname = path.extname(pathname);
    mimeType = mimeTypes[extname];
    fs.readFile(pathname, 'utf8', (err, data) => {
        if (err) {console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            if(pathname === 'site/products.json'){
                let url_parts = url.parse(request.url, true);
                let query = url_parts.query;
                let page = query.page;
                let limit = query.limit;
                let products = JSON.parse(data);
                let begin = limit * (page - 1);
                let end = limit * (page);
                data = JSON.stringify(products.slice(begin, end));


            }

            console.log(`The file ${pathname} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type': mimeType});
            response.end(data);
        }
    });
}).listen(8080, ()=>{
    console.log("HTTP server works in 8080 port!\n");
});
