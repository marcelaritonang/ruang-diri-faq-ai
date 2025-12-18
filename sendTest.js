import 'dotenv/config';
import WhatsAppService from './src/services/whatsapp/WhatsAppService.js';

const service = new WhatsAppService();

(async () => {
  try {
    const result = await service.sendMessage(
      '6281398517263', // nomor tujuan
      'Halo, ini pesan WhatsApp AI dari Cloud API!'
    );
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
