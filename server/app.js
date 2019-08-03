const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();
app.use(cors());
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      // api url
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${
        process.env.OPEN_WEATHER_MAP_API_KEY
      }`,
    ); // Getting the data from DarkSky
    console.log('res', res);
    socket.emit('FromAPI', res.data); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
let interval;

io.on('connection', socket => {
  console.log('a user connected');

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
