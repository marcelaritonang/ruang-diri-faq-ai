import 'dotenv/config';
import axios from 'axios';

// Nomor eSIM baru yang akan ditest
const ESIM_NUMBER = '6287882791303'; // Format: 62 + nomor tanpa +/0/-

const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const token = process.env.WHATSAPP_TOKEN;

console.log('🧪 TESTING WHATSAPP CHATBOT');
console.log('================================');
console.log('📱 Target Number:', ESIM_NUMBER);
console.log('🔑 Phone Number ID:', process.env.WHATSAPP_PHONE_NUMBER_ID);
console.log('🔐 Token (first 20 chars):', token?.substring(0, 20) + '...');
console.log('🌐 API URL:', url);
console.log('================================\n');

// Test 1: Kirim pesan teks biasa
async function testTextMessage() {
  console.log('📤 TEST 1: Mengirim pesan teks...');

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: ESIM_NUMBER,
    type: 'text',
    text: {
      preview_url: false,
      body: 'Test dari Claude Code! Chatbot sudah berjalan ✅'
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Pesan berhasil dikirim!');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error mengirim pesan:');
    console.error('Status:', error.response?.status);
    console.error('Error:', JSON.stringify(error.response?.data, null, 2));
    return false;
  }
}

// Test 2: Kirim template hello_world (jika sudah disetup)
async function testTemplateMessage() {
  console.log('\n📤 TEST 2: Mengirim template hello_world...');

  const payload = {
    messaging_product: 'whatsapp',
    to: ESIM_NUMBER,
    type: 'template',
    template: {
      name: 'hello_world',
      language: { code: 'en_US' }
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Template berhasil dikirim!');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('⚠️ Template gagal (mungkin belum disetup):');
    console.error('Status:', error.response?.status);
    console.error('Error:', JSON.stringify(error.response?.data, null, 2));
    return false;
  }
}

// Jalankan semua test
(async () => {
  console.log('🚀 Memulai testing...\n');

  const test1 = await testTextMessage();

  // Tunggu 2 detik sebelum test kedua
  await new Promise(resolve => setTimeout(resolve, 2000));

  const test2 = await testTemplateMessage();

  console.log('\n================================');
  console.log('📊 HASIL TESTING:');
  console.log('Test Pesan Teks:', test1 ? '✅ BERHASIL' : '❌ GAGAL');
  console.log('Test Template:', test2 ? '✅ BERHASIL' : '⚠️ SKIP (opsional)');
  console.log('================================');

  if (test1) {
    console.log('\n✅ CHATBOT SIAP DIGUNAKAN!');
    console.log('📱 Cek WhatsApp di nomor eSIM Anda untuk melihat pesan.');
    console.log('\n💡 Langkah selanjutnya:');
    console.log('1. Balas pesan yang masuk di WhatsApp');
    console.log('2. Chatbot akan otomatis merespon dengan AI');
  } else {
    console.log('\n❌ TESTING GAGAL!');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Pastikan nomor eSIM sudah ditambahkan di Meta Developer');
    console.log('2. Periksa apakah token sudah benar di file .env');
    console.log('3. Cek apakah Phone Number ID sudah benar');
    console.log('4. Pastikan nomor dalam format 62XXX (tanpa + atau -)');
  }
})();
