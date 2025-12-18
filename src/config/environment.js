// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

// Export configuration
export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  
  whatsapp: {
    token: process.env.WHATSAPP_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
  },
};