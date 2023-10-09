let testFoleder = '../data';
let fs = require('fs');

fs.readdir(testFoleder, (err, filelist)=>{
    console.log(filelist) //* node.js는 어떤 특정 디렉터리의 파일을 배열로 만들어 전달한다
})