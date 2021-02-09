var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');
const querystring = require('querystring');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.png': 'image/png'
};

http.createServer(function onRequest(request, response) {
    if (request.method === 'GET') {
        var postData = "";
        var pathname = url.parse(request.url).path;
        if(pathname === '/get'){
            fs.readdir('./images', function (err, files) {
                //handling error
                if (err) {
                    // error
                }
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                });
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(JSON.stringify(files));
            });

        }
        if (pathname == '/')
            pathname = '/site/index.html';
        var extname = path.extname(pathname);
        var mimeType = mimeTypes[extname];
        //чтобы убрать начальный слэш
        pathname = pathname.substring(1, pathname.length);

        if ((extname == ".gif") || (extname == ".jpg") || (extname == ".png")) {
            var img = fs.readFileSync('./' + pathname);
            response.writeHead(200, {'Content-Type': mimeType});
            response.end(img, 'binary');
        } else {
            fs.readFile(pathname, 'utf8', function (err, data) {
                if (err) {
                    // Error
                } else {
                    response.writeHead(200, {'Content-Type': mimeType});
                    response.end(data);
                }
            });
        }
    } else if (request.method === 'POST') {

        var pathname_post = url.parse(request.url).path;
        if(pathname_post === '/remove'){
            var strData = '';

            request
                .on('data', function(chunk){
                    strData += chunk;
                })
                .on('end', function(){

                    const name = JSON.parse(strData).name;
                    fs.unlink('./images/' + name, (err) => {
                        if (err) {
                            // Error
                            return
                        }
                        response.writeHead(200);
                        response.end(JSON.parse(strData).name);
                    })
                });
        }else{

            request.setEncoding('binary');

            //Grabbing all data from the image
            var body = ''
            var binaryEnd; //gets the string that indicates the location of the end of the binary file
            var first = true;
            request.on('data', function(data) {
                if(first)
                    binaryEnd = data.toString().substring(0, data.toString().indexOf('\n')-1);
                first = false;
                body += data
            });

            //Dealing with the image once we have everything
            request.on('end', function() {

                var note = querystring.parse(body, '\r\n', ':')

                //making sure than an image was submitted
                if (note['Content-Type'].indexOf("image") !== -1)
                {
                    //get the filename
                    var fileInfo = note['Content-Disposition'].split('; ');
                    for (value in fileInfo){
                        if (fileInfo[value].indexOf("filename=") !== -1){
                            fileName = fileInfo[value].substring(10, fileInfo[value].length-1);

                            if (fileName.indexOf('\\') !== -1)
                                fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
                        }
                    }

                    //Get the type of the image (eg. image/gif or image/png)
                    var entireData = body.toString();
                    var contentTypeRegex = /Content-Type: image\/.*/;

                    contentType = note['Content-Type'].substring(1);

                    //Get the location of the start of the binary file,
                    //which happens to be where contentType ends
                    var upperBoundary = entireData.indexOf(contentType) + contentType.length;
                    var shorterData = entireData.substring(upperBoundary);

                    //replace trailing and starting spaces
                    var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

                    //Cut the extra things at the end of the data (Webkit stuff)
                    var binaryData = binaryDataAlmost;
                    // var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf(firstLine));

                    //Write to a file
                    fs.writeFile('./images/' + fileName  , binaryData, 'binary', function(err)
                    {
                        response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        response.end();
                    });
                }
                else
                    respond(404, "Please input an image", response);
            });
        }



    }
}).listen(8080);
