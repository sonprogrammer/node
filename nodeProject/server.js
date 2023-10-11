const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//express애플리케이션을 생성하고 이를 app에 할당함

//그 후에 app을 이용하여 경로설정, 라우팅, 미들웨어 추가등을 수행한다
//app을 이용해 다양한 설정 및 동작을 구현할 수 있다


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
app.get('/api/user/:id',(req, res) =>{
    console.log(req.params)
    //url이 localhost:3000/api/user/123이고 콘솔 req.params하면 {id: '123'}이 출력된다
    console.log(req.params.id)
    //url이 localhost:3000/api/user/123이고 콘솔 req.params.id하면 123만 출력된다

    const user = users.find((u)=>{
        return u.id === req.params.id
    })
    if(user){

        res.json(user)
    }else{
        res.status(404).json({message: "user not found"})
    }
})

app.post('/api/user', (req, res) =>{
    console.log(req.body) // user가 서버에 body부분을 보내서 데이터 베이스에 저장함
    // users.push(req.body) //*user추가 부분 -> 현재 들어오는 데이터 req.body를 추가한다 
    const users = req.body
    res.json(users)
})


app.put('/api/user/:id', async (req, res) => {
    const foundIndex = users.findIndex(user => user.id === req.params.id);
    if(foundIndex === -1) {
        res.status(404).json({ message: 'User not found' });

    }else{
        users[foundIndex] = { ...users[foundIndex], ...req.body };
        res.json(users[foundIndex]);
    }
})


app.delete('/api/user/:id', (req, res)=>{
    const foundIndex = users.findIndex(u => u.id === req.params.id)
    if(foundIndex === -1){
        res.status(404).json({message:"user not found"})
    }else{
        const foundUser = users.splice(foundIndex, 1)
        res.json(foundUser[0])
    }
})


app.listen(3000, ()=>{
    console.log('server is running')
})
