const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on("connection", socket => {

  socket.on("UPDATE_LIST", todoList => {
    console.log(`Update list - event received for list ` + todoList.id);
    io.sockets.emit('UPDATED_LIST', todoList);
  });

  socket.on("UPDATE_ITEM", todoItem => {
    console.log(`Update item - event received for item ` + todoItem.id);
    io.sockets.emit('UPDATED_ITEM', todoItem);
  });
  console.log(`Socket ${socket.id} has connected`);
});

http.listen(5555, () => {
  console.log('Listening on port 5555');
});
