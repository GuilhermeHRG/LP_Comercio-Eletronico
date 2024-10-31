import express from 'express';
import cors from 'cors'; // Certifique-se de importar o CORS
import { sendMessage } from '../src/components/twillioClient.js';

const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());

app.post('/send-message', async (req, res) => {
  const { to, body } = req.body;

  try {
    const messageSid = await sendMessage(to, body);
    res.status(200).json({ messageSid });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error); // Adicionei log para erros
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
