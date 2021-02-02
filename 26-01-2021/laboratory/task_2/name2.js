const http = require('http');

http.createServer((request, response) => {
    console.log("HTTP works!");
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>My Page</h1>');
    response.end();
}).listen(8080);
