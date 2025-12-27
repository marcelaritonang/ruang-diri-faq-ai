import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('━'.repeat(60));
console.log('🔑 UPDATE WHATSAPP ACCESS TOKEN');
console.log('━'.repeat(60));
console.log('\n📋 LANGKAH-LANGKAH:\n');
console.log('1. Buka Meta Developer Console');
console.log('2. Masuk ke halaman "Pengujian API" / "API Testing"');
console.log('3. Klik "Buat token akses" / "Generate access token"');
console.log('4. Copy token yang muncul (dimulai dengan EAA...)');
console.log('5. Paste di sini\n');
console.log('━'.repeat(60));

rl.question('\n🔑 Paste token baru Anda di sini: ', (newToken) => {
  if (!newToken || !newToken.trim().startsWith('EAA')) {
    console.log('\n❌ Token tidak valid! Token harus dimulai dengan "EAA"');
    rl.close();
    return;
  }

  const envPath = path.join(__dirname, '.env');

  try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Replace WHATSAPP_TOKEN
    const tokenRegex = /WHATSAPP_TOKEN=.*/;
    if (tokenRegex.test(envContent)) {
      envContent = envContent.replace(tokenRegex, `WHATSAPP_TOKEN=${newToken.trim()}`);
    } else {
      envContent += `\nWHATSAPP_TOKEN=${newToken.trim()}`;
    }

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Token berhasil diupdate di file .env!');
    console.log('━'.repeat(60));
    console.log('\n📝 NEXT STEPS:\n');
    console.log('1. ✅ Token sudah diupdate');
    console.log('2. 🔄 Restart server Anda (jika sedang running)');
    console.log('3. 📱 Tambahkan nomor pribadi Anda di Meta Developer Console');
    console.log('   > Masuk ke "Pengujian API" > Step 3 > "Add a recipient"');
    console.log('4. 💬 Kirim pesan dari HP Anda ke nomor WhatsApp Business');
    console.log('5. ✅ Bot akan membalas pesan Anda!\n');
    console.log('━'.repeat(60));

  } catch (error) {
    console.error('\n❌ Error updating .env file:', error.message);
  }

  rl.close();
});
