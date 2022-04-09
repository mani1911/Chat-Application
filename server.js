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
    console.log('User Connected');
    console.log(`Users : ${count}`)
    console.log(socket.id)
});


httpServer.listen(9000);





