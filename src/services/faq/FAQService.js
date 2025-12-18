import { kbFAQs } from './data/kb.js';
import { tkFAQs } from './data/tk.js';
import { sdFAQs } from './data/sd.js';
import { smpFAQs } from './data/smp.js';
import { smaFAQs } from './data/sma.js';
import { meditationFAQs } from './data/meditation.js';
import { burnoutFAQs } from './data/burnout.js'; 
class FAQService {
  constructor(geminiService) {
    this.geminiService = geminiService;
    
    // Combine all FAQ data from different education levels
    this.faqs = [
      ...kbFAQs.map(faq => ({ ...faq, category: 'KB (Kelompok Bermain)' })),
      ...tkFAQs.map(faq => ({ ...faq, category: 'TK (Taman Kanak-kanak)' })),
      ...sdFAQs.map(faq => ({ ...faq, category: 'SD (Sekolah Dasar)' })),
      ...smpFAQs.map(faq => ({ ...faq, category: 'SMP (Sekolah Menengah Pertama)' })),
      ...smaFAQs.map(faq => ({ ...faq, category: 'SMA (Sekolah Menengah Atas)' })),
      ...meditationFAQs.map(faq => ({ ...faq, category: 'Meditation for Parents' })),
      ...burnoutFAQs.map(faq => ({ ...faq, category: 'Burnout Prevention' })) // ← TAMBAH INI
    ];
    
    console.log('✅ FAQService initialized with', this.faqs.length, 'FAQs');
    console.log('📚 FAQ breakdown:');
    console.log('   - KB:', kbFAQs.length, 'FAQs');
    console.log('   - TK:', tkFAQs.length, 'FAQs');
    console.log('   - SD:', sdFAQs.length, 'FAQs');
    console.log('   - SMP:', smpFAQs.length, 'FAQs');
    console.log('   - SMA:', smaFAQs.length, 'FAQs');
    console.log('   - Meditation:', meditationFAQs.length, 'FAQs');
    console.log('   - Burnout:', burnoutFAQs.length, 'FAQs');
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