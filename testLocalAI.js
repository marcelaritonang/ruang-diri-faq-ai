import 'dotenv/config';
import GeminiService from './src/services/ai/GeminiService.js';
import FAQService from './src/services/faq/FAQService.js';

console.log('🧪 TESTING AI LOCALLY (Same as Server)');
console.log('===========================================================\n');

async function testAI() {
  try {
    console.log('1️⃣ Initializing services...');
    const geminiService = new GeminiService();
    const faqService = new FAQService(geminiService);
    console.log('✅ Services initialized\n');

    console.log('2️⃣ Testing with question: "apa itu burnout?"\n');
    console.log('⏰ This may take 5-30 seconds...\n');

    const startTime = Date.now();
    const response = await faqService.findAnswer('apa itu burnout?');
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n✅ AI RESPONSE RECEIVED!');
    console.log(`⏱️ Duration: ${duration} seconds`);
    console.log('\n📝 RESPONSE:');
    console.log('===========================================================');
    console.log(response);
    console.log('===========================================================\n');

    if (response && response.length > 50) {
      console.log('✅ AI working perfectly!');
      console.log('📊 Response length:', response.length, 'characters');
      console.log('\n💡 CONCLUSION:');
      console.log('   - Gemini API key is VALID');
      console.log('   - AI generation is WORKING');
      console.log('   - Problem is likely in Vercel environment');
      console.log('\n🔧 NEXT STEPS:');
      console.log('   1. Force redeploy Vercel (uncheck build cache)');
      console.log('   2. Verify GEMINI_API_KEY in Vercel env vars');
      console.log('   3. Check Vercel logs for errors');
    } else {
      console.error('⚠️ Response too short or empty!');
      console.error('This indicates an issue with AI generation');
    }

  } catch (error) {
    console.error('\n❌ ERROR!');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('\nFull error:', error);

    console.log('\n🔧 TROUBLESHOOTING:');
    if (error.message?.includes('API key')) {
      console.log('   - Gemini API key is invalid');
      console.log('   - Generate new key at: https://aistudio.google.com/app/apikey');
    } else if (error.message?.includes('quota')) {
      console.log('   - API quota exceeded');
      console.log('   - Wait 24 hours or upgrade plan');
    } else if (error.message?.includes('timeout')) {
      console.log('   - Request timed out');
      console.log('   - Try again or check internet connection');
    } else {
      console.log('   - Unknown error');
      console.log('   - Check error message above for details');
    }
  }
}

testAI();
