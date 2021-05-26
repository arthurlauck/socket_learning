const net = require('net')

// Set of all currently connected sockets
const connectedSockets = new Set();

// broadcast to all connected sockets except one
connectedSockets.broadcast = function (data, except) {
    for (let socket of this) {
        // if (socket !== except) {
        socket.write(data);
        // }
    }
}

const server = net.createServer(socket => {
    console.log('A connection was created')
    connectedSockets.add(socket);

    socket.on('end', function () {
        connectedSockets.delete(socket);
        console.log('A connection has ended')
    });

    socket.on('data', data => {
        // Receiving data from client
        object = JSON.parse(data.toString())
        console.log(`[${object.name}]: ${object.message}`)
        connectedSockets.broadcast(data.toString(), socket);
    })
})


server.listen(4000, '127.0.0.1')