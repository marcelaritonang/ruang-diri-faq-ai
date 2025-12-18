import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Ganti dengan URL webhook endpoint Anda (misal: dari ngrok)
const webhookUrl = 'https://deprived-sara-illegitimately.ngrok-free.dev/webhook';

(async () => {
  try {
    // Cari nomor sandbox WhatsApp Twilio
    const numbers = await client.incomingPhoneNumbers
      .list({ phoneNumber: '+14155238886' });

    if (numbers.length > 0) {
      await client.incomingPhoneNumbers(numbers[0].sid)
        .update({
          smsUrl: webhookUrl,
          smsMethod: 'POST'
        });
      console.log('✅ Webhook configured:', webhookUrl);
    } else {
      console.error('❌ Sandbox number not found.');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
