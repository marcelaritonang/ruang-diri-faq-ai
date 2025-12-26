import 'dotenv/config';
import axios from 'axios';

// Nomor-nomor yang sudah terdaftar di Meta Developer (dari screenshot)
const REGISTERED_NUMBERS = [
  '6281398517263',   // Nomor yang sudah test sebelumnya ✅
  '6281398517263',   // +62 813-9851-7263 (dari dropdown screenshot)
  '6281932691303',   // +62 819-3269-1303 (dari dropdown screenshot)
];

const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const token = process.env.WHATSAPP_TOKEN;

console.log('🧪 TESTING CHATBOT - KIRIM PESAN KE SEMUA NOMOR TERDAFTAR');
console.log('===========================================================');
console.log('📱 Phone Number ID:', process.env.WHATSAPP_PHONE_NUMBER_ID);
console.log('🔐 Token (first 30 chars):', token?.substring(0, 30) + '...');
console.log('🌐 API URL:', url);
console.log('===========================================================\n');

// Fungsi untuk kirim pesan test
async function sendTestMessage(phoneNumber, message) {
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'text',
    text: {
      preview_url: false,
      body: message
    }
  };

  try {
    console.log(`\n📤 Mengirim pesan ke ${phoneNumber}...`);
    console.log(`   Pesan: "${message}"`);

    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ BERHASIL kirim ke ${phoneNumber}`);
    console.log(`   Message ID: ${response.data.messages[0].id}`);
    return { success: true, number: phoneNumber };
  } catch (error) {
    console.error(`❌ GAGAL kirim ke ${phoneNumber}`);
    console.error(`   Error: ${error.response?.data?.error?.message || error.message}`);
    console.error(`   Code: ${error.response?.data?.error?.code}`);

    if (error.response?.data?.error?.code === 131030) {
      console.error(`   ⚠️ Nomor tidak ada di allowed list!`);
    }

    return { success: false, number: phoneNumber, error: error.response?.data };
  }
}

// Test semua nomor
(async () => {
  console.log('🚀 Mulai testing...\n');

  const results = [];

  for (const number of REGISTERED_NUMBERS) {
    const result = await sendTestMessage(
      number.replace(/\s/g, ''), // Hapus spasi
      `🤖 Test Chatbot dari Vercel!\n\nNomor ini sudah bisa menerima pesan dari chatbot.\n\nCoba balas dengan pertanyaan tentang burnout atau meditasi! 😊`
    );
    results.push(result);

    // Tunggu 2 detik sebelum kirim ke nomor berikutnya
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Summary
  console.log('\n\n===========================================================');
  console.log('📊 HASIL TESTING:');
  console.log('===========================================================');

  const success = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Berhasil: ${success.length} nomor`);
  success.forEach(r => console.log(`   - ${r.number}`));

  console.log(`\n❌ Gagal: ${failed.length} nomor`);
  failed.forEach(r => console.log(`   - ${r.number}`));

  console.log('\n===========================================================');

  if (success.length > 0) {
    console.log('\n✅ CHATBOT BERFUNGSI!');
    console.log('📱 Cek WhatsApp di nomor yang berhasil untuk melihat pesan.');
    console.log('💬 Balas pesan tersebut dengan pertanyaan untuk test AI chatbot!');
    console.log('\n💡 Contoh pertanyaan:');
    console.log('   - "apa itu burnout?"');
    console.log('   - "bagaimana cara meditasi?"');
    console.log('   - "apa saja gejala burnout?"');
  } else {
    console.log('\n❌ SEMUA NOMOR GAGAL!');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Pastikan nomor sudah ditambahkan di Meta Developer');
    console.log('2. Periksa format nomor (harus 62XXX tanpa + atau -)');
    console.log('3. Cek token di file .env');
  }
})();
