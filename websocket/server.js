const WebSocket = require('ws');

const PORT = 5555;

const wsServer = new WebSocket.Server({
    port: PORT
});

wsServer.on('connection', function (socket) {
    console.log("A client just connected");

    socket.on('message', function (msg) {
        console.log("Received message from client: "  + msg);

        wsServer.clients.forEach(function (client) {
            if (msg === 'restart') {
                client.send("Restarting");
                return;
            } 
            else if (msg === 'profanity') {
                return;
            }
            else {
                client.send("Someone said: " + msg);
            }
        });

    });

    socket.on('close', function () {
        console.log('Client disconnected');
    })

});

console.log( (new Date()) + " Server is listening on port " + PORT);