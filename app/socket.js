const socketio    = require('socket.io');
const Chat = require('./models/chat.model');


const socket = ( server ) => {
  const io = socketio(server);
  io.on('connection', socket => {
    socket.on('roomId', res => {
      socket.join(res.roomId).broadcast.emit('message', 'A user has joined the chat');
    });

    socket.on('chat', res => {
        // insert data to chat table in database
        const chat = new Chat({
          roomId: res.roomId,
          userId: res.userId,
          name: res.name,
          description: res.description,
        });
        
        Chat.create(chat);
  
        io.in(res.roomId).emit('chat-message', chat);
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