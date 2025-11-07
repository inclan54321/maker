const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('chat message', async (data) => {
    // Enviar mensaje a todos
    io.emit('chat message', data);
    
    // Si mencionan a la IA, responder
    if (data.message.includes('@ai') || data.message.toLowerCase().includes('asistente')) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: data.message }]
        });
        
        const aiResponse = {
          user: 'Asistente IA',
          message: response.choices[0].message.content
        };
        
        io.emit('chat message', aiResponse);
      } catch (error) {
        console.error('Error con IA:', error);
      }
    }
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log('Servidor funcionando');
});