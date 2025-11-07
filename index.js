const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let deepseek;
try {
  const { OpenAI } = require('openai');
  console.log('API Key presente:', process.env.DEEPSEEK_API_KEY ? 'SI' : 'NO');
  deepseek = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com/v1"
  });
  console.log('✅ DeepSeek configurado');
} catch (error) {
  console.log('❌ DeepSeek no disponible:', error.message);
}

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('chat message', async (data) => {
    io.emit('chat message', data);
    
    if (deepseek && data.message.includes('@ai')) {
      console.log('Detectado mensaje para IA:', data.message);
      
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