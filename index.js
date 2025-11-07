const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('public'));

// Ruta para manejar suscripciones
app.post('/suscripcion', (req, res) => {
  const { nombre, direccion, sexo, fechaNacimiento, email } = req.body;
  
  console.log('📧 Nueva suscripción recibida:');
  console.log('Nombre:', nombre);
  console.log('Dirección:', direccion);
  console.log('Sexo:', sexo);
  console.log('Fecha Nacimiento:', fechaNacimiento);
  console.log('Email:', email);
  
  // Simular envío de email (por ahora solo en consola)
  console.log('📤 Email de verificación enviado a:', email);
  console.log('🔗 Enlace de verificación: https://tudominio.railway.app/verificar/' + generateVerificationCode());
  
  res.json({ 
    success: true, 
    message: 'Suscripción recibida - Email de verificación pendiente' 
  });
});

// Función para generar código de verificación
function generateVerificationCode() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// WebSocket para el chat
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