const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Datos temporales en memoria
let messages = [];
let products = [
  { id: 1, name: 'Producto Ejemplo 1', price: 100 },
  { id: 2, name: 'Producto Ejemplo 2', price: 200 }
];

let subscriptions = [];

// Routes básicos
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API de productos
app.get('/api/productos', (req, res) => {
  res.json(products);
});

app.post('/api/productos', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.json(newProduct);
});

// API de suscripciones
app.get('/api/suscripciones', (req, res) => {
  res.json(subscriptions);
});

app.post('/api/suscripciones', (req, res) => {
  const newSubscription = {
    id: subscriptions.length + 1,
    email: req.body.email,
    date: new Date().toISOString()
  };
  subscriptions.push(newSubscription);
  res.json(newSubscription);
});

// WebSocket Chat
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Enviar mensajes existentes al nuevo usuario
  socket.emit('chat history', messages);

  // Recibir nuevo mensaje
  socket.on('chat message', (data) => {
    const message = {
      id: messages.length + 1,
      user: data.user || 'Anónimo',
      text: data.text,
      timestamp: new Date().toLocaleTimeString()
    };
    
    messages.push(message);
    
    // Enviar a todos los usuarios
    io.emit('chat message', message);
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Ruta de salud para verificar que funciona
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
  console.log(📍 URL: http://localhost:${PORT});
});