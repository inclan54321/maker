const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('chat message', async (data) => {
    io.emit('chat message', data);
    
    if (data.message.includes('@ai')) {
      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: data.message }],
            max_tokens: 150
          })
        });
        
        const result = await response.json();
        const aiResponse = {
          user: '🤖 DeepSeek',
          message: result.choices[0].message.content
        };
        
        io.emit('chat message', aiResponse);
      } catch (error) {
        console.error('Error con DeepSeek:', error);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});