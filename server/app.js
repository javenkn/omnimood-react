const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const client = require('./twitter');
const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();
app.use(cors());
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = socket => {
  const stream = client.stream('statuses/filter', {
    track: '😀,😂,😠,😡,😭,😢',
  });

  stream.on('data', function(event) {
    if (event.place) {
      socket.emit('FromAPI', event); // Emitting a new message. It will be consumed by the client
    }
  });

  stream.on('error', function(error) {
    throw error;
  });
};
let interval;

io.on('connection', socket => {
  console.log('An user connected');
  getApiAndEmit(socket);

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
