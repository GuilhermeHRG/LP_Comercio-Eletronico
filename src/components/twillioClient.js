// twilioClient.js
import twilio from 'twilio'; // Usando import em vez de require

const accountSid = 'AC586c53f5121397911ee01e73a357c1e9'; // Seu SID da conta
  const authToken = '95a6c64fbd900b7d15d61a18d941ac5c'; // Substitua pelo seu Auth Token
const client = twilio(accountSid, authToken);

export const sendMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: 'whatsapp:+14155238886', // Número do Twilio
      to: to // Número do destinatário
    });
    return message.sid; // Retorna o SID da mensagem
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error; // Lança o erro para ser tratado no frontend
  }
};
