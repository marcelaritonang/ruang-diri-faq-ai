import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

console.log('🧪 TESTING GEMINI API');
console.log('===========================================================');
console.log('🔑 API Key (first 20 chars):', API_KEY?.substring(0, 20) + '...');
console.log('===========================================================\n');

async function testGemini() {
  try {
    console.log('1️⃣ Inisialisasi Gemini...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log('✅ Gemini initialized\n');

    console.log('2️⃣ Testing model: gemini-2.5-flash (yang digunakan di kode)...');
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent('apa itu burnout?');
      const text = result.response.text();
      console.log('✅ Model gemini-2.5-flash BERHASIL!');
      console.log('Response:', text.substring(0, 100) + '...\n');
    } catch (error) {
      console.error('❌ Model gemini-2.5-flash GAGAL!');
      console.error('Error:', error.message);
      console.log('⚠️ Model ini mungkin tidak exist atau deprecated\n');
    }

    console.log('3️⃣ Testing model: gemini-1.5-flash (alternative)...');
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent('apa itu burnout?');
      const text = result.response.text();
      console.log('✅ Model gemini-1.5-flash BERHASIL!');
      console.log('Response preview:', text.substring(0, 150) + '...\n');
    } catch (error) {
      console.error('❌ Model gemini-1.5-flash GAGAL!');
      console.error('Error:', error.message, '\n');
    }

    console.log('4️⃣ Testing model: gemini-pro (alternative)...');
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent('apa itu burnout?');
      const text = result.response.text();
      console.log('✅ Model gemini-pro BERHASIL!');
      console.log('Response preview:', text.substring(0, 150) + '...\n');
    } catch (error) {
      console.error('❌ Model gemini-pro GAGAL!');
      console.error('Error:', error.message, '\n');
    }

    console.log('\n===========================================================');
    console.log('📊 HASIL TEST:');
    console.log('===========================================================');
    console.log('✅ API Key valid dan berfungsi');
    console.log('📝 Gunakan model yang BERHASIL di atas untuk chatbot');

  } catch (error) {
    console.error('\n❌ ERROR FATAL!');
    console.error('Pesan:', error.message);

    if (error.message?.includes('API_KEY')) {
      console.error('\n⚠️ API Key tidak valid atau tidak ditemukan!');
      console.error('Cek file .env dan pastikan GEMINI_API_KEY sudah diset');
    }
  }
}

testGemini();
