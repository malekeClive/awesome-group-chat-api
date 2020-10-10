const socketio    = require('socket.io');
let counter = 0
const socket = ( server ) => {
  const io = socketio(server);
  io.on('connection', socket => {
    console.log("ads", counter += 1);

    socket.on('roomId', res => {
      socket.join(res.roomId).broadcast.emit('message', 'A user has joined the chat');
    });

    socket.on('chat', res => {
      io.in(res.roomId).emit('chat-message', { name: res.name, msg: res.msg });
    })

    // broadcast when user connect to other users except itself
    // socket.broadcast.emit('message', 'A user has joined the chat');
    // socket.to('sebat').emit('message', 'A user has joined the chat');

    // runs when client disconnects
    socket.on('disconnect', () => {
      io.emit('message', 'A user has left the chat');
    });
  });
}

module.exports = socket;