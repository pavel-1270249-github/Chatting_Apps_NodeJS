const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname));
var users = [];
io.sockets.on('connection', (socket)=>{
    socket.emit('success', 'Join with a name');
    socket.on('join', n=>{
        socket.username = n;
        users.push(n);
        io.sockets.emit('userlist', users);
    });
    socket.on('send', m=>{
        socket.broadcast.emit('message',{from:socket.username, msg:m});
    })
});

server.listen(9595, ()=>{
    console.log('Server running at URL: http://localhost:9595');
    console.log('Press Ctrl+C to disconnect Server');
});