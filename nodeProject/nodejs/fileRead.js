const fs = require('fs');
//*fs라는 변수를 통해 node.js의 모듈인 fileSystem을 다룰 수 있다

fs.readFile('sample.txt', 'utf8', (err, data) => {
    console.log(data);
})