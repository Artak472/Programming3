var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var matrix = require('./modules/matrix');
var grass = require('./modules/class.grass');
var grasEater = require('./modules/class.grassEater');
var gishatich = require('./modules/class.gishatich');
var people = require('./modules/class.people');
var esh = require('./modules/class.esh');
var parent = require('./modules/parent')

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