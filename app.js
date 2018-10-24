var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var matrix = require('./modules/matrix');

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('public/index.html');
});

server.listen(3000);

var frameCount = 5;
var drawTime = 1000 / frameCount;

io.on('connection', function (socket) {
    socket.emit('get matrix', matrix);

    var interval = setInterval(function(){
      socket.emit('redraw', matrix);
    },drawTime);

    socket.on('stop drawing', function(){
      clearInterval(interval);
    })
});