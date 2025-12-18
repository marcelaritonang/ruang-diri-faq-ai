import 'dotenv/config';
import TwilioWhatsAppService from './src/services/whatsapp/TwilioWhatsAppService.js';

const service = new TwilioWhatsAppService();

(async () => {
  try {
    const result = await service.sendMessage(
      process.env.TWILIO_WHATSAPP_TO,
      'Halo, ini pesan WhatsApp AI via Twilio!'
    );
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
