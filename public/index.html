<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-image: url('/images/ouletmakers.jpeg');
      background-size: cover;
      background-position: center;
      margin: 0;
      padding: 20px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
    }
    
    .menu-container {
      background: rgba(255, 255, 255, 0.9);
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }
    
    .menu-option {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 15px 30px;
      margin: 10px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      width: 80%;
      transition: background 0.3s;
    }
    
    .menu-option:hover {
      background: #45a049;
    }
    
    .chat-container {
      display: none;
      width: 100%;
      max-width: 600px;
    }
    
    #messages {
      background: rgba(255, 255, 255, 0.8);
      padding: 10px;
      border-radius: 10px;
      margin: 0 auto 20px auto;
      width: fit-content;
      height: auto;
      max-height: 70vh;
      overflow-y: auto;
    }
    
    input, button {
      padding: 10px;
      margin: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      align-self: center;
      width: 80%;
      max-width: 400px;
    }
  </style>
  <title>Mi Chat App</title>
</head>
<body>
  <!-- Menú Principal -->
  <div class="menu-container" id="menu">
    <h2>Bienvenido a Mi Chat App</h2>
    <button class="menu-option" onclick="openChat()">💬 Entrar al Chat</button>
    <button class="menu-option" onclick="suscribirse()">⭐ Suscribirse</button>
    <button class="menu-option" onclick="acercaDe()">ℹ️ Acerca de</button>
  </div>

  <!-- Chat (oculto inicialmente) -->
  <div class="chat-container" id="chat">
    <ul id="messages"></ul>
    <input id="messageInput" placeholder="Escribe tu mensaje..." />
    <button onclick="sendMessage()">Enviar</button>
    <button onclick="volverAlMenu()" style="background: #666; margin-top: 10px;">← Volver al Menú</button>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    let usuario = null;

    // Funciones del Menú
    function openChat() {
      usuario = prompt('¿Cuál es tu nombre?');
      if (usuario) {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
      }
    }

    function suscribirse() {
      alert('¡Función de suscripción próximamente!');
    }

    function acercaDe() {
      alert('Chat App v1.0\nDesarrollado con Node.js y Socket.io');
    }

    function volverAlMenu() {
      document.getElementById('chat').style.display = 'none';
      document.getElementById('menu').style.display = 'block';
    }

    // Funciones del Chat
    function sendMessage() {
      const input = document.getElementById('messageInput');
      const data = {
        user: usuario,
        message: input.value
      };
      socket.emit('chat message', data);
      input.value = '';
    }

    socket.on('chat message', (data) => {
      const li = document.createElement('li');
      li.textContent = data.user + ': ' + data.message;
      document.getElementById('messages').appendChild(li);
    });
  </script>
</body>
</html>