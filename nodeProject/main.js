var http = require('http');
var fs = require('fs');
const url = require('url');
const {
  da
} = require('date-fns/locale');

var app = http.createServer(function (request, response) {
  var _url = request.url; //*사용자가 주소창에 입력한 값이다
  console.log(_url);
  var queryData = url.parse(_url, true).query
  // console.log(queryData); //*localhost:3000/?id=HTML하면 {id: 'HTML}이 출력된다(터미널에)
  // console.log(queryData.id); //*localhost:3000/?id=HTML하면 HTML이 나온다(터미널에)
  pathname = url.parse(_url, true).pathname
  


  // console.log(url.parse(_url, true)); 

  // console.log(__dirname + url); //현재 main.js의 위치경로 + 어떤 html인지가 나옴
  if (pathname === '/') {
    if(queryData.id === undefined){ //*예를 들어 localhost3000뒤에 queryID가 없다면 이라는 뜻
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        let title = 'Welcome'
        var description = 'hello, node.js' 
        let template = `<!doctype html> 
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `
  
        // response.end(fs.readFileSync(__dirname + _url));
        // response.end(fs.readFileSync(queryData.id));
        response.writeHead(200);
        response.end(template);
  
      })
    }else{
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        let title = queryData.id
        let template = `<!doctype html> 
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `
  
        // response.end(fs.readFileSync(__dirname + _url));
        // response.end(fs.readFileSync(queryData.id));
        response.writeHead(200);
        response.end(template);
  
      })
    }
   
  }else{
    response.writeHead(404);
    response.end('404 Not Found');
  }
});
app.listen(3000);