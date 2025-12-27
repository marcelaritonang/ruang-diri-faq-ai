import axios from 'axios';

const possibleUrls = [
  'https://ruang-diri-faq-ai.vercel.app',
  'https://ruangdiri-faq-ai.vercel.app',
  'https://whatsapp-ai.vercel.app',
  'https://ruang-diri.vercel.app'
];

console.log('🔍 Mencari URL Vercel deployment Anda...\n');

async function testUrl(url) {
  try {
    const response = await axios.get(`${url}/health`, { timeout: 5000 });
    console.log(`✅ FOUND! ${url}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, response.data);
    return url;
  } catch (error) {
    console.log(`❌ ${url} - Not accessible`);
    return null;
  }
}

async function findUrl() {
  console.log('Testing possible URLs...\n');

  for (const url of possibleUrls) {
    const result = await testUrl(url);
    if (result) {
      console.log('\n━'.repeat(60));
      console.log(`✅ DEPLOYMENT URL DITEMUKAN: ${result}`);
      console.log('━'.repeat(60));
      console.log('\nSekarang jalankan:');
      console.log(`   1. Edit testAllWebhooks.js`);
      console.log(`   2. Ubah VERCEL_URL menjadi: ${result}`);
      console.log(`   3. Jalankan: node testAllWebhooks.js\n`);
      return;
    }
  }

  console.log('\n━'.repeat(60));
  console.log('❌ Tidak menemukan URL yang valid');
  console.log('━'.repeat(60));
  console.log('\nSilakan:');
  console.log('1. Buka https://vercel.com/dashboard');
  console.log('2. Cari project Anda');
  console.log('3. Copy URL deployment');
  console.log('4. Edit testAllWebhooks.js dan update VERCEL_URL\n');
}

findUrl();
