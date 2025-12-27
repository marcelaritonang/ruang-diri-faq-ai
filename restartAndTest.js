import https from 'https';

console.log('🔄 RESTART & TEST GUIDE\n');
console.log('='.repeat(60));

console.log('\n📋 STEP 1: Kill any running Node processes');
console.log('=' .repeat(60));
console.log('Windows:');
console.log('  powershell -Command "Get-Process node | Stop-Process -Force"');
console.log('\nLinux/Mac:');
console.log('  pkill -f node');

console.log('\n📋 STEP 2: Verify .env has new token');
console.log('=' .repeat(60));
console.log('Check .env file contains:');
console.log('  WHATSAPP_TOKEN=EAAUY6x5JlkwBQcLwwrBKbeNXYbJAYuUw...');

console.log('\n📋 STEP 3: Start server fresh');
console.log('=' .repeat(60));
console.log('  node src/app.js');

console.log('\n📋 STEP 4: Test with this script');
console.log('=' .repeat(60));
console.log('  node fullTest.js');

console.log('\n' + '='.repeat(60));
console.log('🧪 Running auto-test in 3 seconds...');
console.log('='.repeat(60));

setTimeout(() => {
  console.log('\n📤 Sending test webhook to LOCAL server...\n');

  const webhookPayload = {
    object: 'whatsapp_business_account',
    entry: [{
      id: '194804060942923',
      changes: [{
        field: 'messages',
        value: {
          messaging_product: 'whatsapp',
          metadata: {
            display_phone_number: '15551706725',
            phone_number_id: '929102273621555'
          },
          contacts: [{
            profile: { name: 'Test User' },
            wa_id: '6281398517263'
          }],
          messages: [{
            from: '6281398517263',
            id: 'wamid.test_' + Date.now(),
            timestamp: Math.floor(Date.now() / 1000).toString(),
            type: 'text',
            text: { body: 'quick test - apa itu meditasi?' }
          }]
        }
      }]
    }]
  };

  const postData = JSON.stringify(webhookPayload);

  // Try localhost first
  const options = {
    hostname: 'localhost',
    port: 29537, // Your PORT from .env
    path: '/whatsapp/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 5000
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('✅ Local server responded:', res.statusCode);
      console.log('Response:', data);
      console.log('\n📱 Check WhatsApp for response!');
    });
  });

  req.on('error', (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Local server is NOT running');
      console.log('🔧 Start server with: node src/app.js');
    } else {
      console.log('❌ Error:', error.message);
    }
  });

  req.on('timeout', () => {
    console.log('⏱️  Request timeout - server might be processing');
    req.destroy();
  });

  req.write(postData);
  req.end();
}, 3000);
