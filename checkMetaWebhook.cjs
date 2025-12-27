// checkMetaWebhook.cjs
// Script to check current webhook configuration

const https = require('https');

const APP_ID = '1948040609429233'; // Your Business Account ID
const ACCESS_TOKEN = 'EAAUY6x5JlkwBQYbffNmU3BwcLOs7Dx4htk3gz3sE4zhZCG6IjJFdQvMyuGAiv7tqVFfZAQmKWQcS7pLOWo6uYEhjY9YUw9zNpfdDl2uBOieuJIWbIiDoepuJQClBEDymjhg1LLTvmnh5LihdZCpcT7jmTAZADPT9AQKaebFECg3FEDmARD8WGYaDjeHriX12PuCJoyoUolQfZAp4PH0ZA5VkQZCJZCFrlJKkbZAGrUH5AgOnSrzmm6OOsckZAitdifWj3kBXv45aEuuRB0ZBMOhRfFiEZCaR';

console.log('🔍 Checking WhatsApp webhook configuration...\n');

const options = {
  hostname: 'graph.facebook.com',
  port: 443,
  path: `/v24.0/${APP_ID}/subscribed_apps?access_token=${ACCESS_TOKEN}`,
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';

  console.log('📊 Status Code:', res.statusCode);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📥 Response:', data);

    try {
      const parsed = JSON.parse(data);

      if (parsed.data && parsed.data.length > 0) {
        console.log('\n✅ Webhook subscriptions found:');
        parsed.data.forEach((sub, i) => {
          console.log(`\n${i + 1}. ${sub.name || 'Unknown'}`);
          console.log('   ID:', sub.id);
          if (sub.subscribed_fields) {
            console.log('   Subscribed fields:', sub.subscribed_fields.join(', '));
          }
        });
      } else {
        console.log('\n⚠️  No webhook subscriptions found!');
        console.log('You need to configure the webhook in Meta Dashboard.');
      }
    } catch (e) {
      console.log('\n⚠️  Could not parse response');
    }

    console.log('\n📝 NEXT STEPS:');
    console.log('1. Go to: https://developers.facebook.com/apps');
    console.log('2. Select your app');
    console.log('3. Go to WhatsApp > Configuration');
    console.log('4. Check "Webhook" section');
    console.log('5. Verify Callback URL matches your Vercel URL');
    console.log('   Expected: https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook');
  });
});

req.on('error', (error) => {
  console.log('\n❌ Request Error:', error.message);
});

req.end();
