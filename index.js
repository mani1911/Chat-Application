const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const session = require('express-session');

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});
httpServer.listen(9000);

app.use(session({
    secret : 'mySecret',
    resave : false,
    saveUninitialized: false
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.send('Welcome')
})

app.get('/register', (req,res)=>{
    res.render('register');
})

app.post('/register', async (req,res)=>{
    const {username , password} = req.body;
    const check = await User.findOne({username});
    if(!check){
        const hash = await bcrypt.hash(password,10);
        const newUser = new User({username : username, password : hash});
        await newUser.save();
        res.redirect('/login');
    }
    else{
        res.send('Username already exists. Please Login');
    }   
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login', async (req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(!user){
        res.send('Incorrect Username or Password')
    }
    else{
        const validUser = await bcrypt.compare(password, user.password);
        if(validUser){
            req.session.username = username;
            res.redirect('/chat');
        }
        else{
            res.send('Incorrect Username or Password');
        }
        
    }
})

app.get('/chat',(req,res)=>{
    if(req.session.username){
        console.log(req.session.username)
        res.render('./index');

        io.on("connection", socket=>{
            socket.data.username = req.session.username;
            socket.broadcast.emit('newUser', socket.data.username);
            socket.emit('username', socket.data.username);
            console.log(`${socket.data.username} has joined the chat`)
            })      
    }
    else{
        res.send('please login')
    }
})


io.on("connection", (socket) => {
    socket.emit('userCount',io.engine.clientsCount);
    const count = io.engine.clientsCount;
    console.log(`Users : ${count}`)
    
});
io.on("connection", (socket) => {
    socket.broadcast.emit('userCount',io.engine.clientsCount);
    
});



io.on("connection", socket=>{
    socket.on('message', msg=>{
        socket.broadcast.emit('server-message', msg , socket.data.username);
    })
    
    
})







