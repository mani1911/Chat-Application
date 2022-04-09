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
    const count = io.engine.clientsCount;
    console.log(`Users : ${count}`)
    
});
io.on("connection", socket=>{
    socket.on('username', username=>{
        socket.data.username = username;
        console.log(`${socket.data.username} joined the Chat`);
    })
    
})

io.on("connection", socket=>{
    socket.on('message', msg=>{
        console.log(`${socket.data.username} : ${msg}`);
    })
    
})


httpServer.listen(9000);





