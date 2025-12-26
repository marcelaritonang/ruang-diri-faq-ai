import 'dotenv/config';
import axios from 'axios';

// Nomor yang sudah terdaftar di Meta Developer
const TEST_NUMBER = '6281398517263';

const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const token = process.env.WHATSAPP_TOKEN;

console.log('🧪 TESTING dengan nomor yang sudah terdaftar');
console.log('📱 Target:', TEST_NUMBER);

const payload = {
  messaging_product: 'whatsapp',
  to: TEST_NUMBER,
  type: 'text',
  text: {
    body: 'Test dari Claude Code - Chatbot berfungsi! ✅'
  }
};

(async () => {
  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ BERHASIL! Pesan terkirim');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Error:', JSON.stringify(error.response?.data, null, 2));
  }
})();
