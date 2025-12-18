// ============================================================
// TEST CONTROLLER - Al-Izhar FAQ AI Chatbot
// ============================================================

import dotenv from 'dotenv';
dotenv.config();

import AppController from './src/controller/AppController.js';
import FAQService from './src/services/faq/FAQService.js';
import GeminiService from './src/services/ai/GeminiService.js';
import WhatsAppService from './src/services/whatsapp/WhatsAppService.js';

// ============================================================
// 1. VERIFY ENVIRONMENT VARIABLES
// ============================================================
console.log('🔍 Environment Variables Check:');
console.log('━'.repeat(60));
console.log('PORT:', process.env.PORT || '❌ Missing');
console.log('WHATSAPP_TOKEN:', process.env.WHATSAPP_TOKEN ? '✅ Loaded' : '❌ Missing');
console.log('WHATSAPP_PHONE_NUMBER_ID:', process.env.WHATSAPP_PHONE_NUMBER_ID || '❌ Missing');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ Missing');
console.log('━'.repeat(60));
console.log('');

// ============================================================
// 2. INITIALIZE SERVICES
// ============================================================
console.log('⚙️  Initializing Services...');
const geminiService = new GeminiService();
const faqService = new FAQService(geminiService);
const whatsappService = new WhatsAppService();
console.log('');

// ============================================================
// 3. INITIALIZE CONTROLLER
// ============================================================
const controller = new AppController({
  faqService,
  whatsappService
});

// ============================================================
// 4. TEST QUESTIONS
// ============================================================
const testQuestions = [
  "apa itu burnout?",
  "bagaimana cara meditasi?",
  "berapa biaya KB?",
  "apa itu mindfulness?"
];

// ============================================================
// 5. MOCK REQUEST & RESPONSE
// ============================================================
// Nomor chatbot (WA API): +1 555 146 9792
// Nomor user (Anda): 6281398517263
const CHATBOT_WA_NUMBER = "+1 555 146 9792";
const USER_WA_NUMBER = "6281398517263";

function createMockRequest(question) {
  return {
    body: {
      object: "whatsapp_business_account",
      entry: [
        {
          id: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
          changes: [
            {
              value: {
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: CHATBOT_WA_NUMBER,
                  phone_number_id: process.env.WHATSAPP_PHONE_NUMBER_ID
                },
                contacts: [
                  {
                    profile: { name: "Test User" },
                    wa_id: USER_WA_NUMBER
                  }
                ],
                messages: [
                  {
                    from: USER_WA_NUMBER,
                    id: `wamid.test${Date.now()}`,
                    timestamp: Math.floor(Date.now() / 1000).toString(),
                    text: {
                      body: question
                    },
                    type: "text"
                  }
                ]
              },
              field: "messages"
            }
          ]
        }
      ]
    }
  };
}

const mockResponse = {
  status: (code) => {
    console.log(`📤 HTTP Status: ${code}`);
    return mockResponse;
  },
  send: (data) => {
    console.log(`📤 Response: ${data}`);
    return mockResponse;
  },
  json: (data) => {
    console.log(`📤 JSON Response:`, JSON.stringify(data, null, 2));
    return mockResponse;
  },
  sendStatus: (code) => {
    console.log(`📤 HTTP Status: ${code}`);
    return mockResponse;
  }
};

// ============================================================
// 6. RUN TESTS
// ============================================================
async function runTests() {
  console.log('🧪 STARTING CONTROLLER TESTS');
  console.log('═'.repeat(60));
  console.log('');

  for (let i = 0; i < testQuestions.length; i++) {
    const question = testQuestions[i];
    
    console.log(`📝 TEST ${i + 1}/${testQuestions.length}`);
    console.log('━'.repeat(60));
    console.log(`❓ Question: "${question}"`);
    console.log('━'.repeat(60));
    
    const mockReq = createMockRequest(question);
    
    try {
      await controller.receiveAndReply(mockReq, mockResponse);
      console.log('✅ Test passed');
    } catch (error) {
      console.error('❌ Test failed:', error.message);
    }
    
    console.log('');
    
    // Wait 3 seconds between tests
    if (i < testQuestions.length - 1) {
      console.log('⏳ Waiting 3 seconds before next test...');
      console.log('');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('═'.repeat(60));
  console.log('🎉 ALL TESTS COMPLETED');
  console.log('═'.repeat(60));
  
  // Wait for async operations to complete
  setTimeout(() => {
    console.log('');
    console.log('🏁 Exiting test runner...');
    process.exit(0);
  }, 5000);
}

// ============================================================
// 7. START TESTS
// ============================================================
runTests().catch(error => {
  console.error('');
  console.error('═'.repeat(60));
  console.error('💥 FATAL ERROR');
  console.error('═'.repeat(60));
  console.error(error);
  process.exit(1);
});