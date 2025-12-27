import https from 'https';

console.log('🔍 DIAGNOSTIC START\n');

// Test 1: Webhook GET endpoint
console.log('TEST 1: Webhook verification endpoint...');
const testUrl = 'https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=alizhar123&hub.challenge=TEST123';

https.get(testUrl, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data === 'TEST123' ? '✅ PASS' : '❌ FAIL');
    console.log('Response:', data, '\n');

    // Test 2: Webhook POST endpoint
    console.log('TEST 2: Webhook POST endpoint...');
    const postData = JSON.stringify({
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
            messages: [{
              from: '6281398517263',
              id: 'test_msg_' + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: 'text',
              text: { body: 'diagnostic test from script' }
            }]
          }
        }]
      }]
    });

    const options = {
      hostname: 'ruang-diri-faq-ai.vercel.app',
      port: 443,
      path: '/whatsapp/webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', responseData);
        console.log(res.statusCode === 200 ? '✅ PASS' : '❌ FAIL');
        console.log('\n📋 NEXT: Send WhatsApp message to +1 555 170 6725');
        console.log('Then check Vercel logs for webhook POST');
      });
    });

    req.on('error', (error) => {
      console.log('❌ FAIL:', error.message);
    });

    req.write(postData);
    req.end();
  });
}).on('error', (err) => {
  console.log('❌ FAIL:', err.message);
});
