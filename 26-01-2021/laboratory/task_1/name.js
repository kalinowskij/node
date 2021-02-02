const http = require('http');

const server = http.createServer((request, response) => {
    console.log("HTTP works!");
});

server.listen(8080);
