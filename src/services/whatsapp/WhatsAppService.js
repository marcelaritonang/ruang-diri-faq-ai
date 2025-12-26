import axios from 'axios';
import config from '../../config/environment.js';

class WhatsAppService {
  constructor() {
    this.phoneNumberId = config.whatsapp.phoneNumberId;
    this.accessToken = config.whatsapp.accessToken;
    this.token = config.whatsapp.token;
    this.apiUrl = `https://graph.facebook.com/v24.0/${this.phoneNumberId}/messages`;
    
    console.log('✅ WhatsAppService initialized');
  }

  // Send text message
  async sendMessage(to, message) {
    try {
      console.log(`📤 Sending message to ${to}:`, message);

      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: {
          body: message
        }
      };

      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Message sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error sending message:');
      console.error('Status:', error.response?.status);
      console.error('Error data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Full error:', error.message);
      throw error;
    }
  }
}

export default WhatsAppService;