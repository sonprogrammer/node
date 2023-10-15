const express = require('express')

//req.query

//*클라이언트
//클라 쪽에선 자바스크립트로 get요청을 보냄

//방식1
await axios.get('www.example.com/post/1/jun?title=Hello')

//방식2
await axios({
    method: "get",
    url: `www.example.com/post/1/jun`,
    params: {title: 'Hello'},
})

//*서버
//요청온 url: www.example.com/public/100/jun?title=Hello
app.use(express.urlencoded({extends: false})) //uri 방식 폼 요청 들어오면 파싱

Router.get('/:id/:name', (req, res) =>{
    //../100/jun부분이 담김
    console.log(req.params) // {id: '100', name: 'jun'}
    

    //title: Hello 부분이 담긴다
    console.log(req.query) // {titl: 'Hello'}
})
