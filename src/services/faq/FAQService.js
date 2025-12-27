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

  /**
   * Simple keyword matching - no AI, guaranteed to work!
   * Searches FAQ topics for keywords from user message
   */
  async findAnswer(userMessage) {
    try {
      console.log('🔍 Keyword matching for:', userMessage);

      // Normalize user message (lowercase, trim)
      const normalizedMessage = userMessage.toLowerCase().trim();

      // Split into keywords
      const keywords = normalizedMessage.split(/\s+/);
      console.log('📝 Keywords:', keywords);

      // Search for matching FAQ
      let bestMatch = null;
      let highestScore = 0;

      for (const faq of this.faqs) {
        const normalizedTopic = faq.topic.toLowerCase();
        let score = 0;

        // Count how many keywords match
        for (const keyword of keywords) {
          if (normalizedTopic.includes(keyword)) {
            score++;
          }
        }

        // Also check if the whole message is contained in the topic
        if (normalizedTopic.includes(normalizedMessage)) {
          score += 10; // Bonus for full match
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = faq;
        }
      }

      // Return answer if we found a match
      if (bestMatch && highestScore > 0) {
        console.log('✅ Match found!');
        console.log('   Topic:', bestMatch.topic);
        console.log('   Category:', bestMatch.category);
        console.log('   Match score:', highestScore);

        return `📚 *${bestMatch.category}*\n\n${bestMatch.answer}\n\n💬 _Jika Anda memiliki pertanyaan lain, silakan tanyakan!_`;
      }

      // No match found
      console.log('⚠️ No matching FAQ found');
      return this.getDefaultResponse();

    } catch (error) {
      console.error('❌ Error in keyword matching:', error);
      return this.getDefaultResponse();
    }
  }

  /**
   * Default response when no FAQ matches
   */
  getDefaultResponse() {
    return `Maaf, saya belum memiliki informasi mengenai pertanyaan tersebut dalam database FAQ kami.

📚 *Topik yang tersedia:*
• Meditasi untuk orang tua
• Pencegahan burnout
• Mindfulness dan teknik relaksasi
• Bonding orang tua-anak

💬 Silakan coba pertanyaan lain atau hubungi customer service kami untuk bantuan lebih lanjut!`;
  }
}

export default FAQService;