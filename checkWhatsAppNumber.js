import 'dotenv/config';
import axios from 'axios';

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;

async function checkPhoneNumber() {
  try {
    console.log('📞 Mengecek nomor WhatsApp Business...\n');
    console.log('Phone Number ID:', PHONE_NUMBER_ID);
    console.log('Access Token:', ACCESS_TOKEN ? 'SET ✅' : 'NOT SET ❌');
    console.log('\n');

    const response = await axios.get(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}`,
      {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        params: { fields: 'display_phone_number,verified_name,quality_rating,id' }
      }
    );

    console.log('✅ Informasi Nomor WhatsApp Business Anda:');
    console.log('━'.repeat(50));
    console.log('📱 Nomor Telepon:', response.data.display_phone_number);
    console.log('📝 Nama Terverifikasi:', response.data.verified_name);
    console.log('⭐ Rating Kualitas:', response.data.quality_rating);
    console.log('🆔 Phone Number ID:', response.data.id);
    console.log('━'.repeat(50));
    console.log('\n💡 CARA TESTING YANG BENAR:');
    console.log(`1. Buka WhatsApp di HP pribadi Anda`);
    console.log(`2. Cari dan chat ke nomor: ${response.data.display_phone_number}`);
    console.log(`3. Kirim pesan apa saja (misalnya: "Halo")`);
    console.log(`4. Bot akan membalas pesan Anda\n`);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

checkPhoneNumber();
