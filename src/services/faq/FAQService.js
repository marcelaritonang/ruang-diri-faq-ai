import { meditationFAQs } from './data/meditation.js';
import { burnoutFAQs } from './data/burnout.js'; 
class FAQService {
  constructor(geminiService) {
    this.geminiService = geminiService;
    
    // Combine FAQ data for Ruang Diri (Meditation & Burnout Prevention)
    this.faqs = [
      ...meditationFAQs.map(faq => ({ ...faq, category: 'Meditasi' })),
      ...burnoutFAQs.map(faq => ({ ...faq, category: 'Pencegahan Burnout' }))
    ];
    
    console.log('✅ FAQService initialized with', this.faqs.length, 'FAQs for Ruang Diri');
    console.log('📚 FAQ breakdown:');
    console.log('   - Meditasi:', meditationFAQs.length, 'FAQs');
    console.log('   - Pencegahan Burnout:', burnoutFAQs.length, 'FAQs');
  }

  async findAnswer(userMessage) {
    try {
      if (!this.geminiService.isAvailable()) {
        return '⚠️ Layanan AI sedang tidak tersedia. Silakan hubungi customer service kami untuk bantuan lebih lanjut.';
      }

      console.log('🤖 Using AI to find answer for:', userMessage);
      
      const aiResponse = await this.geminiService.generateFAQResponse(
        this.faqs,
        userMessage
      );
      
      return aiResponse;

    } catch (error) {
      console.error('❌ Error in AI answer generation:', error);
      return '❌ Maaf, terjadi kesalahan dalam memproses pertanyaan Anda. Silakan coba lagi atau hubungi customer service kami.';
    }
  }
}

export default FAQService;