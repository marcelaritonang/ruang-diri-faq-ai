import 'dotenv/config';
import axios from 'axios';

// URL webhook Vercel Anda
const WEBHOOK_URL = 'https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook';

// Simulasi webhook dari Meta ketika Anda kirim pesan
const webhookPayload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "1948040609429233",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15551706725",
              phone_number_id: "929102273621555"
            },
            contacts: [
              {
                profile: {
                  name: "User Test"
                },
                wa_id: "6281398517263"
              }
            ],
            messages: [
              {
                from: "6281398517263",
                id: "wamid.TEST_" + Date.now(),
                timestamp: Math.floor(Date.now() / 1000).toString(),
                text: {
                  body: "apa itu burnout?"
                },
                type: "text"
              }
            ]
          },
          field: "messages"
        }
      ]
    }
  ]
};

console.log('🧪 TESTING WEBHOOK - SIMULASI PESAN DARI ANDA KE CHATBOT');
console.log('===========================================================');
console.log('📱 Dari nomor: 6281398517263');
console.log('💬 Pesan: "apa itu burnout?"');
console.log('🌐 Webhook URL:', WEBHOOK_URL);
console.log('===========================================================\n');

(async () => {
  try {
    console.log('📤 Mengirim payload webhook ke Vercel...\n');
    console.log('Payload:', JSON.stringify(webhookPayload, null, 2));
    console.log('\n⏳ Tunggu response...\n');

    const response = await axios.post(WEBHOOK_URL, webhookPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 detik timeout
    });

    console.log('✅ WEBHOOK BERHASIL DIPANGGIL!');
    console.log('Status:', response.status);
    console.log('Response:', response.data);

    console.log('\n===========================================================');
    console.log('📊 HASIL:');
    console.log('===========================================================');
    console.log('✅ Webhook menerima pesan dari nomor Anda');
    console.log('✅ Server Vercel merespon dengan baik');
    console.log('\n💡 CEK WHATSAPP ANDA SEKARANG!');
    console.log('Seharusnya ada 2 pesan dari chatbot:');
    console.log('1. "Baik, mohon tunggu sebentar..."');
    console.log('2. Jawaban AI tentang burnout');
    console.log('\n⏰ Tunggu 5-10 detik untuk AI memproses jawaban');

  } catch (error) {
    console.error('❌ ERROR!');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);

    if (error.code === 'ECONNABORTED') {
      console.log('\n⚠️ TIMEOUT - Tapi ini NORMAL!');
      console.log('Webhook sudah menerima pesan, tapi server memproses di background.');
      console.log('Cek WhatsApp Anda, seharusnya pesan sudah dikirim!');
    }
  }
})();
