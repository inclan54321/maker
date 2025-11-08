const { archivos, leer } = require('../js/database');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
      io.emit('chat message', data);
      
      if (data.message.trim() === 'newuser') {
        const suscripciones = leer(archivos.suscripciones).filter(s => s.verificada);
        const mensaje = suscripciones.length > 0 
          ? suscripciones.map(s => ${s.nombre}, ${s.email}).join(' | ')
          : 'No hay suscripciones';
        
        socket.emit('chat message', { user: 'Sistema', message: 📊 ${mensaje} });
      }
    });
  });
};