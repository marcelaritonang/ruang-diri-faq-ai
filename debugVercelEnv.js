import axios from 'axios';

// Test apakah Gemini API key di Vercel environment sudah benar
const VERCEL_API_URL = 'https://ruang-diri-faq-ai.vercel.app';

console.log('🔍 DEBUGGING VERCEL ENVIRONMENT');
console.log('===========================================================\n');

// Test 1: Health check
async function testHealthCheck() {
  try {
    console.log('1️⃣ Testing /health endpoint...');
    const response = await axios.get(`${VERCEL_API_URL}/health`);
    console.log('✅ Health check OK');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check FAILED');
    console.error('Error:', error.message);
    return false;
  }
}

// Test 2: Webhook GET (verification)
async function testWebhookVerification() {
  try {
    console.log('\n2️⃣ Testing webhook verification...');
    const response = await axios.get(
      `${VERCEL_API_URL}/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=alizhar123&hub.challenge=DEBUG_TEST`
    );
    console.log('✅ Webhook verification OK');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Webhook verification FAILED');
    console.error('Error:', error.message);
    return false;
  }
}

// Test 3: Send full webhook payload (trigger AI)
async function testFullWebhook() {
  try {
    console.log('\n3️⃣ Testing full webhook flow (trigger AI)...');

    const payload = {
      object: "whatsapp_business_account",
      entry: [{
        id: "1948040609429233",
        changes: [{
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15551706725",
              phone_number_id: "929102273621555"
            },
            contacts: [{
              profile: { name: "Debug Test" },
              wa_id: "6281398517263"
            }],
            messages: [{
              from: "6281398517263",
              id: "wamid.DEBUG_" + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              text: { body: "test debug - apa itu burnout?" },
              type: "text"
            }]
          },
          field: "messages"
        }]
      }]
    };

    console.log('📤 Sending webhook payload...');
    const response = await axios.post(
      `${VERCEL_API_URL}/whatsapp/webhook`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );

    console.log('✅ Webhook POST OK');
    console.log('Status:', response.status);
    console.log('Response:', response.data);
    console.log('\n⏰ Tunggu 10-30 detik, cek WhatsApp untuk pesan AI!');
    return true;
  } catch (error) {
    console.error('❌ Webhook POST FAILED');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);
    return false;
  }
}

// Run all tests
(async () => {
  const test1 = await testHealthCheck();
  const test2 = await testWebhookVerification();
  const test3 = await testFullWebhook();

  console.log('\n===========================================================');
  console.log('📊 HASIL DEBUG:');
  console.log('===========================================================');
  console.log('Health Check:', test1 ? '✅' : '❌');
  console.log('Webhook Verification:', test2 ? '✅' : '❌');
  console.log('Full Webhook Flow:', test3 ? '✅' : '❌');
  console.log('\n💡 LANGKAH SELANJUTNYA:');

  if (!test1 || !test2) {
    console.log('❌ Server error - cek Vercel deployment logs');
  } else if (!test3) {
    console.log('❌ Webhook processing error - cek Vercel logs untuk error detail');
  } else {
    console.log('✅ Semua test OK - cek WhatsApp untuk AI response');
    console.log('⚠️ Jika masih tidak ada AI response, kemungkinan:');
    console.log('   1. Gemini API key di Vercel belum ter-update');
    console.log('   2. Gemini API error/timeout di server');
    console.log('   3. WhatsApp send message error');
    console.log('\n📋 CEK VERCEL LOGS:');
    console.log('   https://vercel.com/marcelaritonangs-projects/ruang-diri-faq-ai/logs');
  }
})();
