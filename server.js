const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on("connect", () => console.log("connect"));

server.listen(9000);