const http = require('http');
const fs = require('fs');
const headerFile = 'header.html';
const bodyFile = 'body.html';
const footerFile = 'footer.html';

http.createServer((request, response) => {
    fs.readFile(headerFile, 'utf8', (err, headerData) => {
        if(err){
            console.log(`Could not find or open file  ${headerFile} for reading \n`);
            response.statusCode = 404;
            response.end();
        }
        fs.readFile(bodyFile, 'utf8', (err, bodyData) => {
            if(err){
                console.log(`Could not find or open file  ${bodyFile} for reading \n`);
                response.statusCode = 404;
                response.end();
            }
            fs.readFile(footerFile, 'utf8', (err, footerData) => {
                if(err){
                    console.log(`Could not find or open file  ${footerFile} for reading \n`);
                    response.statusCode = 404;
                    response.end();
                }

                response.writeHead(200, {'Content-Type': 'text/html'})
                response.end(`
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Node-page</title>
                    </head>
                    <body>
                        ${headerData} ${bodyData} ${footerData}
                    </body>
                    </html>
                `);
            })
        })
    })
    console.log('Request accepted')
}).listen(8080, () => {
    console.log('Http server works in 8080 port! \n');
});
