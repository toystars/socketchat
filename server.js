
// server file

require('dotenv').load();
var express = require('express');
var secret = require('./config/secrets');  
var app = express();  
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;

mongoose.connect(secret.db);

var userAuthController = require("./controllers/user.auth.server.controller");

// handle user connection event
io.sockets.on('connection', userAuthController.ack);
io.sockets.on('disconnect', userAuthController.disconnect);


app.use(express.static(__dirname + '/bower_components'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(port);
