import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;

const client = twilio(accountSid, authToken);

class TwilioWhatsAppService {
  constructor() {
    console.log('✅ TwilioWhatsAppService initialized');
  }

  async sendMessage(to, message) {
    try {
      const result = await client.messages.create({
        from,
        to,
        body: message,
      });
      console.log('✅ WhatsApp message sent:', result.sid);
      return result;
    } catch (error) {
      console.error('❌ Error sending WhatsApp message:', error.message);
      throw error;
    }
  }
}

export default TwilioWhatsAppService;
