import https from 'https';

const TOKEN = 'EAAUY6x5JlkwBQcLwwrBKbeNXYbJAYuUwWPSTeVavgthjFtFcZCdvJFcj42bcTTDC7CWvGak8oBvcpvNZBmuVNUM4ITrDgTcNt88OFRK0oyAap7I1j7ZA8HcVSFO6WO1wFwxI3Bt1YeKZA9r6fzyyujrZCzaE6SoyuxoTz9btlLgDSCD4uvIUGA9GfK9O7L1VTM9uMs9PAecgA98q64SD2W5x9JX8Mrc52grFNtRKvpZCNllZCc9r5vQzmkoSxiwW9U6lMZCLZCuvceqe3YCG5kWS9JkVBHwZDZD';
const PHONE_NUMBER_ID = '929102273621555';
const TO_NUMBER = '6281398517263';

console.log('🧪 TESTING WHATSAPP TOKEN VALIDITY\n');
console.log('=' .repeat(60));
console.log('Token (first 50 chars):', TOKEN.substring(0, 50) + '...');
console.log('Phone Number ID:', PHONE_NUMBER_ID);
console.log('To:', TO_NUMBER);
console.log('=' .repeat(60) + '\n');

const payload = JSON.stringify({
  messaging_product: 'whatsapp',
  recipient_type: 'individual',
  to: TO_NUMBER,
  type: 'text',
  text: {
    preview_url: false,
    body: '🧪 Test message from token validation script. Token is VALID! ✅'
  }
});

const options = {
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v18.0/${PHONE_NUMBER_ID}/messages`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  },
  timeout: 10000 // 10 second timeout
};

console.log('📤 Sending test message via WhatsApp API...\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📥 Response Status:', res.statusCode);
    console.log('📥 Response Headers:', JSON.stringify(res.headers, null, 2));
    console.log('📥 Response Body:', data);
    console.log('\n' + '='.repeat(60));

    if (res.statusCode === 200) {
      console.log('✅ SUCCESS: Token is VALID!');
      console.log('✅ Message sent successfully to WhatsApp');
      console.log('\n📱 Check WhatsApp on', TO_NUMBER);
      console.log('   You should receive the test message');
    } else if (res.statusCode === 401) {
      console.log('❌ FAIL: Token is INVALID or EXPIRED');
      console.log('🔧 Action needed:');
      console.log('   1. Generate new token from Meta Developer Console');
      console.log('   2. Update .env file');
      console.log('   3. Update Vercel environment variable');
    } else if (res.statusCode === 403) {
      console.log('❌ FAIL: Permission denied');
      console.log('🔧 Action needed:');
      console.log('   1. Check if phone number is verified');
      console.log('   2. Check WhatsApp Business API permissions');
    } else {
      console.log('⚠️  UNEXPECTED STATUS:', res.statusCode);
      console.log('Response:', data);
    }

    console.log('='.repeat(60));
  });
});

req.on('error', (error) => {
  console.log('\n' + '='.repeat(60));
  console.log('❌ REQUEST FAILED:', error.message);
  console.log('\nPossible reasons:');
  console.log('- Network connection issue');
  console.log('- WhatsApp API is down');
  console.log('- Request timeout (took more than 10 seconds)');
  console.log('='.repeat(60));
});

req.on('timeout', () => {
  console.log('\n' + '='.repeat(60));
  console.log('❌ REQUEST TIMEOUT: Request took more than 10 seconds');
  console.log('\nThis usually means:');
  console.log('- WhatsApp API is slow or unresponsive');
  console.log('- Network connectivity issue');
  console.log('='.repeat(60));
  req.destroy();
});

req.write(payload);
req.end();
