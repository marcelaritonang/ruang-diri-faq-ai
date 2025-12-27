import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../../config/environment.js';

class GeminiService {
  constructor() {
    if (!config.gemini.apiKey) {
      console.warn('⚠️ GEMINI_API_KEY not set. AI features will be disabled.');
      this.genAI = null;
      this.model = null;
    } else {
      this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      console.log('✅ GeminiService initialized with gemini-2.5-flash');
    }
  }

  /**
   * Utility function to create a delay
   * @param {number} ms - milliseconds to wait
   */
  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Generate response based on FAQ context and user message
   * @param {Array} faqs - Array of FAQ objects with topic, answer, and category
   * @param {string} userMessage - The user's question/message
   * @returns {Promise<string>} AI-generated response
   */
  async generateFAQResponse(faqs, userMessage) {
    if (!this.model) {
      throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY in environment variables.');
    }

    // --- Configuration for Retry ---
    const MAX_RETRIES = 3;
    let delayMs = 1000; // Start with 1 second delay
    // --- End Configuration ---

    console.log('🤖 Generating AI response for:', userMessage);

    // Build the FAQ context (moved outside the loop)
    const faqContext = faqs.map(faq => 
      `[${faq.category}]\nTopic: ${faq.topic}\nAnswer: ${faq.answer}`
    ).join('\n\n');

    // Create the enhanced prompt (moved outside the loop)
    const prompt = `Kamu adalah asisten customer service Al Izhar School yang membantu menjawab pertanyaan tentang Penerimaan Siswa Baru (PSB) dalam Bahasa Indonesia.

    Berikut adalah database FAQ (Frequently Asked Questions) yang tersedia untuk semua jenjang pendidikan:

    ${faqContext}

    Pertanyaan pelanggan: "${userMessage}"

    Instruksi:
    1. Analisis pertanyaan pelanggan dengan cermat untuk menentukan jenjang pendidikan yang ditanyakan (KB, TK, SD, SMP, atau SMA)
    2. Cari jawaban yang paling relevan dari FAQ di atas sesuai dengan jenjang yang ditanyakan
    3. Jika pertanyaan tidak menyebutkan jenjang spesifik namun bersifat umum, berikan jawaban yang mencakup semua jenjang yang relevan
    4. Jika ada jawaban yang cocok, berikan jawaban tersebut dengan cara yang natural, ramah, dan profesional
    5. Jika pertanyaan tidak ada dalam FAQ, jawab dengan sopan: "Maaf, informasi tersebut belum tersedia dalam database kami. Untuk informasi lebih lanjut, silakan hubungi customer service Al Izhar School atau kunjungi website https://psb.alizhar.sch.id/"
    6. Gunakan bahasa yang sopan, profesional, dan mudah dipahami
    7. Jangan menambahkan atau mengarang informasi yang tidak ada dalam FAQ
    8. Berikan jawaban yang to-the-point namun lengkap
    9. Jika menyebutkan biaya, pastikan menyebutkan jenjang pendidikan yang dimaksud
    10. Selalu sebutkan kategori jenjang pendidikan saat memberikan jawaban spesifik (misal: "Untuk KB Al Izhar..." atau "Untuk jenjang SMP...")

    Format jawaban:
    - Gunakan paragraf yang rapi
    - Gunakan bullet points jika ada beberapa poin penting
    - Sertakan emoji yang relevan untuk membuat jawaban lebih friendly (📚, 📅, 💰, 📝, dll)
    - Akhiri dengan kalimat ramah yang mengajak untuk bertanya lebih lanjut jika perlu

    Jawab dalam Bahasa Indonesia:`;

    // --- Retry Loop Implementation ---
    let lastError = null; // Declare error variable outside the loop

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            if (attempt > 1) {
                console.log(`⏳ Retrying request (Attempt ${attempt}/${MAX_RETRIES}) after ${delayMs}ms delay...`);
                await this.sleep(delayMs);
            }

            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            console.log('✅ AI response generated successfully');
            return text.trim();

        } catch (error) {
            lastError = error; // Store the error for later reference

            // Check for transient errors (like 503) that should trigger a retry
            if (error.status === 503 || error.message?.includes('Service Unavailable') || error.message?.includes('quota') || error.message?.includes('rate limit')) {

                // If this is the last attempt, fall through to error handling
                if (attempt === MAX_RETRIES) {
                    console.error(`❌ Final attempt failed. Max retries reached.`);
                    break;
                } else {
                    // Log the transient failure and set the next delay
                    console.warn(`⚠️ Transient error detected (Status ${error.status || 'N/A'}). Will retry in ${delayMs}ms.`);
                    delayMs *= 2; // Exponential backoff
                    continue; // Continue to the next loop iteration (retry)
                }
            }

            // For permanent errors (like 400 Bad Request, invalid key, etc.), break the loop
            console.error('❌ Permanent error encountered. Aborting retries.', error);
            break;
        }
    }
    // --- End Retry Loop Implementation ---

    // --- Error Handling (executed if loop completes without success) ---
    if (lastError) {
        console.error('❌ AI generation failed:', lastError);

        if (lastError.message?.includes('API key')) {
            throw new Error('Gemini API key is invalid or not configured properly');
        }

        // Catch-all for API errors after max retries
        throw new Error('Failed to generate AI response. Please try again later.');
    }

    // Should never reach here, but just in case
    throw new Error('Unexpected error in AI generation');
  }

  /**
   * Check if the Gemini service is available
   * @returns {boolean}
   */
  isAvailable() {
    return this.model !== null;
  }
}

export default GeminiService;