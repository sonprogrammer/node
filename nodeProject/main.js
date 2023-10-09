var http = require('http');
var fs = require('fs');
const url = require('url');
//밑에 이거 뭐징?
const {
  da
} = require('date-fns/locale');


//밑에 기본 템플릿을 함수로 만들기
function templateHTML(title, list, body) {
  return `<!doctype html> 
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `
}

function templateList(filelist) {
  let list = '<ul>'

  let i = 0;

  while (i < filelist.length) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    i = i + 1;
  }
  list = list + `</ul>`
  return list
}


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
    if (queryData.id === undefined) { //*예를 들어 localhost3000뒤에 queryID가 없다면 이라는 뜻


      fs.readdir('./data', (err, filelist) => {
        console.log(filelist)
        let title = 'Welcome'
        var description = 'hello, node.js'

        // let list = '<ul>'

        // let i = 0;

        // while (i < filelist.length) {
        //   list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        //   i = i + 1;
        // }

        // list = list + '</ul>';

        var list = templateList(filelist);

        //밑에를 함수로 만들어줌
        // let template = `<!doctype html> 
        //   <html>
        //   <head>
        //     <title>WEB1 - ${title}</title>
        //     <meta charset="utf-8">
        //   </head>
        //   <body>
        //     <h1><a href="/">WEB</a></h1>
        //     ${list}
        //     <h2>${title}</h2>
        //     <p>${description}</p>
        //   </body>
        //   </html>
        //   `

        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`)

        // response.end(fs.readFileSync(__dirname + _url));
        // response.end(fs.readFileSync(queryData.id));
        response.writeHead(200);
        response.end(template);
      })

    } else {
      fs.readdir('./data', (err, filelist) => {
        console.log(filelist)
        let title = 'Welcome'
        var description = 'hello, node.js'

        // let list = '<ul>'

        // let i =0;

        // while(i < filelist.length){
        //   list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        //   i = i + 1;
        // }
        // list = list + '</ul>';

        var list = templateList(filelist);

        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          let title = queryData.id
          // let template = `<!doctype html> 
          // <html>
          // <head>
          //   <title>WEB1 - ${title}</title>
          //   <meta charset="utf-8">
          // </head>
          // <body>
          //   <h1><a href="/">WEB</a></h1>
          //   ${list}
          //   <h2>${title}</h2>
          //   <p>${description}</p>
          // </body>
          // </html>
          // `


          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`)

          // response.end(fs.readFileSync(__dirname + _url));
          // response.end(fs.readFileSync(queryData.id));
          response.writeHead(200);
          response.end(template);

        })
      })
    }

  } else {
    response.writeHead(404);
    response.end('404 Not Found');
  }
});
app.listen(3000);