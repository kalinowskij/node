const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {

    let filename = process.argv[2] + '.html';

    fs.readFile(filename, 'utf8', (err, data) => {
        if(err){
            console.log('Could not find or open file for reading \n');
            response.statusCode = 404;
            response.end();
        }else{
            console.log(`The file ${filename} is read and sent to the client \n`);
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end(data);
        }
    })
    console.log('Request accepted')
}).listen(8080, () => {
    console.log('Http server works in 8080 port! \n');
});
