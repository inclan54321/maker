const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.static('public'));

/// Cargar módulos
require('./modules/database').inicializar();
app.use('/api', require('./modules/productos'));
app.use('/api', require('./modules/suscripciones')); // Cambiado a /api

// Ruta de verificación directa (para evitar problemas)
app.use('/', require('./modules/suscripciones'));
// WebSocket
require('./modules/chat')(io);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor en puerto ${PORT}`);
});