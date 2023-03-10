const WebSocket = require('ws');
const PORT = 5321;

const wsServer = new WebSocket.Server({
    port: PORT
});

wsServer.on('connection', function (socket) {
    console.log("A client just connected");
    socket.on('message', function (msg) {
        console.log("Received message from client: "  + msg);
        wsServer.clients.forEach(function (client) {
            if (msg == 'restart') {
                client.send("Restarting Server ...............");
                return;
            } 
            else if (msg === 'profanity') {
                return;
            }
            else {
                client.send(" " + msg);
            }
        });

    });
    socket.on('close', function () {
        console.log('Client disconnected');
    })

});
console.log( (new Date()) + " Server is listening on port " + PORT);