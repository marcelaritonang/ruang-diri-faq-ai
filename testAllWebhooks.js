import 'dotenv/config';
import axios from 'axios';

const VERCEL_URL = 'https://ruang-diri-faq-ai.vercel.app';
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

console.log('━'.repeat(80));
console.log('🧪 TESTING ALL WEBHOOKS - RUANGDIRI FAQ AI');
console.log('━'.repeat(80));
console.log('\n📋 Configuration:');
console.log('   Vercel URL:', VERCEL_URL);
console.log('   Verify Token:', VERIFY_TOKEN);
console.log('   Access Token:', ACCESS_TOKEN ? 'SET ✅' : 'NOT SET ❌');
console.log('   Phone Number ID:', PHONE_NUMBER_ID);
console.log('\n');

// Test 1: Health Check
async function testHealthCheck() {
  console.log('━'.repeat(80));
  console.log('TEST 1: HEALTH CHECK ENDPOINT');
  console.log('━'.repeat(80));

  try {
    const response = await axios.get(`${VERCEL_URL}/health`, { timeout: 10000 });
    console.log('✅ Status:', response.status);
    console.log('✅ Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    console.log('   Error:', error.response?.data || error.message);
    return false;
  }
}

// Test 2: Webhook Verification (GET)
async function testWebhookVerification() {
  console.log('\n━'.repeat(80));
  console.log('TEST 2: WEBHOOK VERIFICATION (GET)');
  console.log('━'.repeat(80));

  try {
    const challenge = 'test-challenge-' + Date.now();
    const response = await axios.get(`${VERCEL_URL}/whatsapp/webhook`, {
      params: {
        'hub.mode': 'subscribe',
        'hub.verify_token': VERIFY_TOKEN,
        'hub.challenge': challenge
      },
      timeout: 10000
    });

    console.log('✅ Status:', response.status);
    console.log('✅ Challenge returned:', response.data);

    if (response.data === challenge) {
      console.log('✅ WEBHOOK VERIFICATION SUCCESS - Challenge matched!');
      return true;
    } else {
      console.log('❌ FAILED - Challenge did not match');
      return false;
    }
  } catch (error) {
    console.log('❌ FAILED');
    console.log('   Status:', error.response?.status);
    console.log('   Error:', error.response?.data || error.message);
    return false;
  }
}

// Test 3: Verify WhatsApp Token & Get Phone Number
async function testWhatsAppToken() {
  console.log('\n━'.repeat(80));
  console.log('TEST 3: VERIFY WHATSAPP TOKEN & GET PHONE NUMBER');
  console.log('━'.repeat(80));

  try {
    const response = await axios.get(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}`,
      {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: { fields: 'display_phone_number,verified_name,quality_rating,id' },
        timeout: 10000
      }
    );

    console.log('✅ Status: 200 OK');
    console.log('✅ WhatsApp Business Details:');
    console.log('   📱 Phone Number:', response.data.display_phone_number);
    console.log('   📝 Verified Name:', response.data.verified_name);
    console.log('   ⭐ Quality Rating:', response.data.quality_rating);
    console.log('   🆔 Phone Number ID:', response.data.id);

    console.log('\n💡 CARA TESTING YANG BENAR:');
    console.log(`   1. Buka WhatsApp di HP Anda`);
    console.log(`   2. Cari dan chat ke nomor: ${response.data.display_phone_number}`);
    console.log(`   3. Kirim pesan: "Halo" atau pertanyaan apa saja`);
    console.log(`   4. Bot akan membalas pesan Anda\n`);

    return response.data.display_phone_number;
  } catch (error) {
    console.log('❌ FAILED');
    console.log('   Error:', error.response?.data || error.message);

    if (error.response?.data?.error?.code === 190) {
      console.log('\n⚠️  TOKEN EXPIRED! Generate token baru:');
      console.log('   1. Buka Meta Developer Console');
      console.log('   2. Masuk ke "Pengujian API"');
      console.log('   3. Klik "Buat token akses"');
      console.log('   4. Update .env file dengan token baru');
      console.log('   5. Redeploy ke Vercel\n');
    }

    return null;
  }
}

// Test 4: Send Test Message
async function testSendMessage(phoneNumber) {
  console.log('\n━'.repeat(80));
  console.log('TEST 4: SEND TEST MESSAGE TO WHATSAPP');
  console.log('━'.repeat(80));

  if (!phoneNumber) {
    console.log('⏭️  SKIPPED - No phone number provided');
    console.log('   Please provide a test phone number (recipient)');
    return false;
  }

  try {
    const testMessage = `🧪 Test message from Ruangdiri FAQ AI\nTime: ${new Date().toLocaleString('id-ID')}\n\nIni adalah pesan test otomatis. Webhook Anda bekerja dengan baik! ✅`;

    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: testMessage }
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ Status:', response.status);
    console.log('✅ Message sent successfully!');
    console.log('   Message ID:', response.data.messages[0].id);
    console.log('   📱 Sent to:', phoneNumber);
    console.log('\n💬 Check your WhatsApp for the test message!\n');
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    console.log('   Error:', error.response?.data || error.message);

    if (error.response?.data?.error?.code === 131047) {
      console.log('\n⚠️  ERROR 131047 - Re-engagement required');
      console.log('   Pastikan:');
      console.log('   1. Nomor sudah ditambahkan sebagai "recipient" di Meta Console');
      console.log('   2. User sudah pernah kirim pesan ke nomor bisnis (24 jam terakhir)');
      console.log('   3. User sudah opt-in untuk menerima pesan\n');
    }

    return false;
  }
}

// Test 5: Simulate Webhook POST (Message Received)
async function testWebhookPost() {
  console.log('\n━'.repeat(80));
  console.log('TEST 5: SIMULATE WEBHOOK POST (INCOMING MESSAGE)');
  console.log('━'.repeat(80));

  try {
    const mockWebhookPayload = {
      object: 'whatsapp_business_account',
      entry: [{
        id: 'test-entry-id',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15551234567',
              phone_number_id: PHONE_NUMBER_ID
            },
            messages: [{
              from: '6281234567890',
              id: 'wamid.test123',
              timestamp: Math.floor(Date.now() / 1000).toString(),
              text: { body: 'Halo, ini pesan test' },
              type: 'text'
            }]
          },
          field: 'messages'
        }]
      }]
    };

    console.log('📤 Sending mock webhook payload...');
    const response = await axios.post(
      `${VERCEL_URL}/whatsapp/webhook`,
      mockWebhookPayload,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000 // 30 seconds for webhook processing
      }
    );

    console.log('✅ Status:', response.status);
    console.log('✅ Response:', response.data);
    console.log('✅ Webhook POST endpoint is working!\n');
    return true;
  } catch (error) {
    console.log('❌ FAILED');
    console.log('   Status:', error.response?.status);
    console.log('   Error:', error.response?.data || error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  const results = {
    healthCheck: false,
    webhookVerification: false,
    whatsappToken: null,
    sendMessage: false,
    webhookPost: false
  };

  // Test 1
  results.healthCheck = await testHealthCheck();

  // Test 2
  results.webhookVerification = await testWebhookVerification();

  // Test 3
  results.whatsappToken = await testWhatsAppToken();

  // Test 4 - Optional: Uncomment and add phone number to test sending
  // const testPhoneNumber = '6281234567890'; // Ganti dengan nomor test Anda
  // results.sendMessage = await testSendMessage(testPhoneNumber);

  // Test 5
  results.webhookPost = await testWebhookPost();

  // Summary
  console.log('\n━'.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('━'.repeat(80));
  console.log(`1. Health Check:          ${results.healthCheck ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`2. Webhook Verification:  ${results.webhookVerification ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`3. WhatsApp Token Valid:  ${results.whatsappToken ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`4. Send Message:          ${results.sendMessage ? '✅ PASS' : '⏭️  SKIPPED'}`);
  console.log(`5. Webhook POST:          ${results.webhookPost ? '✅ PASS' : '❌ FAIL'}`);

  const passCount = [
    results.healthCheck,
    results.webhookVerification,
    results.whatsappToken !== null,
    results.webhookPost
  ].filter(Boolean).length;

  console.log('\n' + '━'.repeat(80));
  console.log(`TOTAL: ${passCount}/4 tests passed`);
  console.log('━'.repeat(80));

  if (results.whatsappToken) {
    console.log('\n✅ WEBHOOK READY! Sekarang Anda bisa:');
    console.log(`   1. Buka WhatsApp di HP Anda`);
    console.log(`   2. Chat ke nomor: ${results.whatsappToken}`);
    console.log(`   3. Kirim pesan apa saja`);
    console.log(`   4. Bot akan membalas! 🎉\n`);
  } else {
    console.log('\n⚠️  Ada masalah dengan token WhatsApp.');
    console.log('   Silakan generate token baru dan redeploy.\n');
  }
}

runAllTests().catch(console.error);
