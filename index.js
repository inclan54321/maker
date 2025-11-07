const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log('OpenAI configurado:', process.env.OPENAI_API_KEY ? 'SI' : 'NO');

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('chat message', async (data) => {
    io.emit('chat message', data);
    
    if (data.message.includes('@ai') || data.message.toLowerCase().includes('asistente')) {
      console.log('Detectado mensaje para IA:', data.message);
      
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "user", 
              content: "Responde como asistente útil: " + data.message
            }
          ],
          max_tokens: 150
        });
        
        const aiResponse = {
          user: '🤖 Asistente IA',
          message: response.choices[0].message.content
        };
        
        io.emit('chat message', aiResponse);
        
      } catch (error) {
        console.error('Error con IA:', error);
        const errorResponse = {
          user: 'Sistema',
          message: 'Lo siento, el asistente no está disponible.'
        };
        io.emit('chat message', errorResponse);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});