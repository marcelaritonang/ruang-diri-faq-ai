import https from 'https';

console.log('🔬 COMPREHENSIVE WEBHOOK TEST\n');
console.log('='.repeat(50));

// Simulate real WhatsApp message from Meta
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
          profile: {
            name: 'Test User'
          },
          wa_id: '6281398517263'
        }],
        messages: [{
          from: '6281398517263',
          id: 'wamid.' + Date.now(),
          timestamp: Math.floor(Date.now() / 1000).toString(),
          type: 'text',
          text: {
            body: 'test final - apa itu burnout?'
          }
        }]
      }
    }]
  }]
};

const postData = JSON.stringify(webhookPayload);

console.log('📤 Sending webhook POST to Vercel...');
console.log('Message:', webhookPayload.entry[0].changes[0].value.messages[0].text.body);
console.log('From:', webhookPayload.entry[0].changes[0].value.messages[0].from);
console.log('Timestamp:', new Date().toISOString());
console.log('='.repeat(50) + '\n');

const options = {
  hostname: 'ruang-diri-faq-ai.vercel.app',
  port: 443,
  path: '/whatsapp/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let responseData = '';

  console.log('📥 Response Status:', res.statusCode);
  console.log('📥 Response Headers:', JSON.stringify(res.headers, null, 2));
  console.log('='.repeat(50) + '\n');

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('📥 Response Body:', responseData);
    console.log('='.repeat(50) + '\n');

    if (res.statusCode === 200) {
      console.log('✅ SUCCESS: Webhook received message');
      console.log('✅ Server responded with 200 OK');
      console.log('\n🔍 WHAT SHOULD HAPPEN NEXT:');
      console.log('1. Server processes message: "test final - apa itu burnout?"');
      console.log('2. Server calls Gemini AI for response');
      console.log('3. Server sends AI response back to WhatsApp');
      console.log('4. User 6281398517263 receives message on WhatsApp');
      console.log('\n⏱️  Expected timing:');
      console.log('   - Webhook processed: DONE (just now)');
      console.log('   - AI response generated: 2-5 seconds');
      console.log('   - WhatsApp message delivered: 5-10 seconds');
      console.log('\n📱 CHECK YOUR WHATSAPP NOW!');
      console.log('   Number: 6281398517263');
      console.log('   Should have message from: +1 555 170 6725');

      // Try to get more details
      console.log('\n' + '='.repeat(50));
      console.log('🔍 CHECKING VERCEL DEPLOYMENT STATUS...\n');
      checkDeploymentStatus();
    } else {
      console.log('❌ FAIL: Server returned', res.statusCode);
      console.log('Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ REQUEST FAILED:', error.message);
  console.log('\nPossible reasons:');
  console.log('- Network connection issue');
  console.log('- Vercel deployment not accessible');
  console.log('- Webhook endpoint not found');
});

req.write(postData);
req.end();

function checkDeploymentStatus() {
  const statusOptions = {
    hostname: 'ruang-diri-faq-ai.vercel.app',
    port: 443,
    path: '/api/health',
    method: 'GET'
  };

  const statusReq = https.request(statusOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ Deployment is LIVE and healthy');
        console.log('Response:', data);
      } else if (res.statusCode === 404) {
        console.log('⚠️  Health endpoint not found (this is OK)');
        console.log('   Main webhook endpoint is still working');
      } else {
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
      }

      console.log('\n' + '='.repeat(50));
      console.log('🎯 FINAL CHECK:');
      console.log('1. ✅ Webhook endpoint is accessible');
      console.log('2. ✅ Webhook accepted the message (200 OK)');
      console.log('3. ⏳ Waiting for WhatsApp response...');
      console.log('\n📱 Check WhatsApp on 6281398517263 for AI response!');
    });
  });

  statusReq.on('error', (err) => {
    console.log('Health check failed (this is OK):', err.message);
  });

  statusReq.end();
}
