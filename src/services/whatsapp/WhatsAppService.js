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
    const startTime = Date.now();
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

      console.log('🔄 Making API request to:', this.apiUrl);
      console.log('📦 Payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000, // 10 second timeout
        validateStatus: (status) => status < 500 // Don't throw on 4xx errors
      });

      const duration = Date.now() - startTime;
      console.log(`⏱️ API request completed in ${duration}ms`);

      if (response.status >= 200 && response.status < 300) {
        console.log('✅ Message sent successfully!');
        console.log('📊 Response:', JSON.stringify(response.data, null, 2));
        return response.data;
      } else {
        console.error(`❌ API returned error status: ${response.status}`);
        console.error('📊 Response data:', JSON.stringify(response.data, null, 2));
        throw new Error(`WhatsApp API error: ${response.status} - ${JSON.stringify(response.data)}`);
      }

    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ Error sending message (after ${duration}ms):`);

      if (error.code === 'ECONNABORTED') {
        console.error('⏱️ Request TIMEOUT after 10 seconds');
      } else if (error.response) {
        console.error('📊 Response error:');
        console.error('   Status:', error.response.status);
        console.error('   Status text:', error.response.statusText);
        console.error('   Data:', JSON.stringify(error.response.data, null, 2));
      } else if (error.request) {
        console.error('📡 No response received from API');
        console.error('   Request was made but no response');
      } else {
        console.error('🔧 Error setting up request:', error.message);
      }

      console.error('📝 Full error:', error.message);
      console.error('📚 Error stack:', error.stack);

      throw error;
    }
  }
}

export default WhatsAppService;