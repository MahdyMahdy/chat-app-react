var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
var port = 8080;

io.on('connection', function (socket) {
    socket.on("connection",function(data){
        console.log(data+" is Connected");
    });
    socket.on("message",function(data){
        console.log("Message: "+JSON.stringify(data));
        io.sockets.emit('messageTo'+data.to, data);
    });
    socket.on("ACK",function(data){
        console.log("ACK: "+JSON.stringify(data));
        io.sockets.emit('ACKTo' + data.to, data);
    });
    socket.on("istyping",function(data){
        console.log(data.from+" is typing to "+data.to);
        io.sockets.emit("typingTo"+data.to,data.from);
    });
    socket.on("nottyping",(data)=>{
        console.log(data.from + " is stopped typing to " + data.to);
        io.sockets.emit("stoptyping" + data.to, data.from);
    });
});

http.listen(port, function () {
    console.log('listening on port:'+port);
});