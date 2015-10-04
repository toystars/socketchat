
// server file
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); listen 
var io = require('socket.io')(server);

io.on('connection', function(client) {  
  console.log('Client connected...');
  client.on('join', function(data) {
    console.log(data);
    client.emit('messages', 'Hello from server');
  });
});

app.use(express.static(__dirname + '/bower_components'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000);  