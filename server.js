const express = require("express");
const path = require('path');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});



io.on("connection", (socket) => {
    socket.emit('userCount',io.engine.clientsCount);
    const count = io.engine.clientsCount;
    console.log(`Users : ${count}`)
    
});
io.on("connection", socket=>{
    socket.on('username', username=>{
        socket.data.username = username;
        if(socket.data.username){
            console.log(`${socket.data.username} joined the Chat`);
        }
        else{
            console.log(`${socket.id} joined the chat`)
        }
    })
    
})

io.on("connection", socket=>{
    socket.on('message', msg=>{
        console.log(`${socket.data.username} : ${msg}`);
        socket.broadcast.emit('server-message', msg, socket.data.username);
    })
    
    
})

httpServer.listen(9000);





