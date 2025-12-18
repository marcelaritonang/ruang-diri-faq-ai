import 'dotenv/config';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const webhookUrl = 'https://deprived-sara-illegitimately.ngrok-free.dev/whatsapp/webhook';

// Configure sandbox webhook
async function setupWebhook() {
  try {
    // Get sandbox number
    const numbers = await client.incomingPhoneNumbers.list({
      phoneNumber: '+14155238886'
    });

    if (numbers.length > 0) {
      const number = numbers[0];
      // Update webhook
      await client.incomingPhoneNumbers(number.sid).update({
        smsUrl: webhookUrl,
        smsMethod: 'POST'
      });
      console.log('✅ Webhook configured successfully!');
      console.log('URL:', webhookUrl);
    } else {
      console.log('ℹ️ Sandbox number not found in incoming numbers');
      console.log('For sandbox, configure manually at:');
      console.log('https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nManual setup required at:');
    console.log('https://www.twilio.com/console/sms/whatsapp/sandbox');
  }
}

setupWebhook();
