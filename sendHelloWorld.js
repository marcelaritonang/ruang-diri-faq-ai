import 'dotenv/config';
import axios from 'axios';

const url = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const token = process.env.WHATSAPP_TOKEN;

const payload = {
  messaging_product: 'whatsapp',
  to: '6281398517263',
  type: 'template',
  template: {
    name: 'hello_world',
    language: { code: 'en_US' }
  }
};

(async () => {
  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Message sent:', response.data);
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
  }
})();
