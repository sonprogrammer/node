const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json())

const users = [
    {
        id: 'dfadsfads',
        name: 'sony',
        email: 'sony@gmail.com',

    },
    {
        id: 'dds',
        name: 'lee',
        email: 'lee@gmail.com',
    }
]

app.get('/api/user',(req, res) =>{
    res.json(users)
})

app.post('/api/user', (req, res) =>{
    console.log(req.body) // 여기서 req.body는 클라이언트에서 서버로 중요한 데이터를 전송할 때 사용된다.  
    users.push(req.body) //*user추가 부분 -> 현재 들어오는 데이터 req.body를 추가한다 
    res.json(users)
})

app.listen(3000, ()=>{
    console.log('server is running')
})
