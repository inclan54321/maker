const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});