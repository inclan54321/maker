const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const https = require('https');

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('chat message', async (data) => {
    io.emit('chat message', data);
    
    if (data.message.includes('@ai') && process.env.DEEPSEEK_API_KEY) {
      console.log('Enviando a DeepSeek:', data.message);
      
      const postData = JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: data.message }],
        max_tokens: 150
      });

      const options = {
        hostname: 'api.deepseek.com',
        port: 443,
        path: '/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            const aiResponse = {
              user: '🤖 DeepSeek',
              message: result.choices[0].message.content
            };
            io.emit('chat message', aiResponse);
          } catch (error) {
            console.error('Error parsing response:', error);
          }
        });
      });

      req.on('error', (error) => {
        console.error('Error con DeepSeek:', error);
      });

      req.write(postData);
      req.end();
    }
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});