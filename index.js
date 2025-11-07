const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let deepseek;
try {
  const { OpenAI } = require('openai');
  deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com/v1"
  });
  console.log('✅ DeepSeek configurado');
} catch (error) {
  console.log('❌ DeepSeek no disponible');
}

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('chat message', async (data) => {
    io.emit('chat message', data);
    
    if (deepseek && data.message.includes('@ai')) {
      try {
        const response = await deepseek.chat.completions.create({
          model: "deepseek-chat",
          messages: [
            { 
              role: "user", 
              content: data.message
            }
          ]
        });
        
        const aiResponse = {
          user: '🤖 DeepSeek',
          message: response.choices[0].message.content
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