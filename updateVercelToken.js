import https from 'https';

const NEW_TOKEN = 'EAAUY6x5JlkwBQcLwwrBKbeNXYbJAYuUwWPSTeVavgthjFtFcZCdvJFcj42bcTTDC7CWvGak8oBvcpvNZBmuVNUM4ITrDgTcNt88OFRK0oyAap7I1j7ZA8HcVSFO6WO1wFwxI3Bt1YeKZA9r6fzyyujrZCzaE6SoyuxoTz9btlLgDSCD4uvIUGA9GfK9O7L1VTM9uMs9PAecgA98q64SD2W5x9JX8Mrc52grFNtRKvpZCNllZCc9r5vQzmkoSxiwW9U6lMZCLZCuvceqe3YCG5kWS9JkVBHwZDZD';

console.log('🔧 WhatsApp Token Update Guide\n');
console.log('=' .repeat(60));
console.log('\nNew token ready to update:');
console.log(NEW_TOKEN.substring(0, 50) + '...\n');

console.log('📋 OPTION 1: Update via Vercel Dashboard (RECOMMENDED)');
console.log('=' .repeat(60));
console.log('1. Open: https://vercel.com/marcelaritonangs-projects/ruang-diri-faq-ai/settings/environment-variables');
console.log('2. Find: WHATSAPP_TOKEN');
console.log('3. Click "Edit"');
console.log('4. Replace with new token (copy from below)');
console.log('5. Click "Save"');
console.log('6. Redeploy the app\n');

console.log('📋 OPTION 2: Update via Vercel CLI');
console.log('=' .repeat(60));
console.log('Run these commands:\n');
console.log('vercel env rm WHATSAPP_TOKEN production');
console.log('vercel env add WHATSAPP_TOKEN production');
console.log('# Then paste the new token when prompted\n');

console.log('=' .repeat(60));
console.log('📋 NEW TOKEN (copy this):');
console.log('=' .repeat(60));
console.log(NEW_TOKEN);
console.log('=' .repeat(60));

console.log('\n✅ After updating, the app will automatically redeploy');
console.log('⏱️  Wait 1-2 minutes for deployment to complete');
console.log('🧪 Then test again with WhatsApp message\n');
