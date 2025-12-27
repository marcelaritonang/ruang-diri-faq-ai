// test-send-message.js
const https = require('https');

const PHONE_NUMBER_ID = '929102273621555';
const ACCESS_TOKEN = 'EAAUY6x5JlkwBQXTWqeJm5zEFWpJr0oYpEU0orATuFbBkPtTN8bzHQoWZAPEGG1RzDM2LwmvY3mhy0soWMmkaZBVkU1998kAdOi9eVc5zW84ASsHEY6SW6SFBUl0AeRy4ZBeEIq8Ps3ZA24zdLyMMygoFZAY7l5kd3gvQFUrGaZAU9T2MTbQTmVwH2rpw00T761DUn5au4AF9XbtDlLqKqv1jQ9ZAkjkpnRC1IgabIdv';
const TO_NUMBER = '6281398517263';

const postData = JSON.stringify({
  "messaging_product": "whatsapp",
  "to": TO_NUMBER,
  "type": "text",
  "text": {
    "body": "TEST SEND MESSAGE - Token verification from Claude Code"
  }
});

const options = {
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v24.0/${PHONE_NUMBER_ID}/messages`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🔍 Sending test message to Meta API...\n');

const req = https.request(options, (res) => {
  let data = '';

  console.log('📊 Status Code:', res.statusCode);
  console.log('📊 Headers:', JSON.stringify(res.headers, null, 2));

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📥 Response Body:', data);

    try {
      const parsed = JSON.parse(data);

      if (res.statusCode === 200) {
        console.log('\n✅ SUCCESS! Message sent!');
        console.log('Message ID:', parsed.messages[0].id);
      } else {
        console.log('\n❌ ERROR!');
        console.log('Error Code:', parsed.error?.code);
        console.log('Error Message:', parsed.error?.message);
        console.log('Error Type:', parsed.error?.type);

        if (parsed.error?.code === 130429) {
          console.log('\n⚠️  RATE LIMIT EXCEEDED!');
          console.log('Wait 5-10 minutes before sending again.');
        }
      }
    } catch (e) {
      console.log('\n⚠️  Could not parse response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('\n❌ Request Error:', error.message);
});

req.write(postData);
req.end();
