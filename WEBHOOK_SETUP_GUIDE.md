# 🔗 PANDUAN SETUP WEBHOOK META DEVELOPER

## Webhook URL Vercel Anda:
```
https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook
```

## Verify Token:
```
alizhar123
```

---

## LANGKAH-LANGKAH:

### 1. Buka Meta Developer Console
- Pergi ke: https://developers.facebook.com/apps/1434772988073548
- Klik **"WhatsApp"** di menu kiri
- Klik **"Configuration"** atau **"Konfigurasi"**

### 2. Edit Webhook URL
Di bagian **"Webhook"**, klik **"Edit"** atau **"Tentang webhooks"**

**Isi dengan:**
- **Callback URL**: `https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook`
- **Verify Token**: `alizhar123`

### 3. Klik "Verify and Save"
Meta akan melakukan GET request ke webhook Anda untuk verifikasi.

**Jika berhasil:**
- Status akan berubah menjadi **"Verified"** atau **"Terverifikasi"**
- Webhook siap menerima pesan

**Jika gagal:**
- Pastikan environment variables sudah diset di Vercel
- Pastikan deployment Vercel sudah selesai
- Periksa logs di Vercel untuk melihat error

### 4. Subscribe to Webhook Fields
Pastikan field berikut di-subscribe:
- ✅ **messages** (untuk menerima pesan masuk)
- ✅ **message_status** (untuk status pesan terkirim/dibaca)

Klik **"Subscribe"** atau **"Berlangganan"**

---

## TESTING WEBHOOK

### Test 1: Manual Verification
Buka URL ini di browser:
```
https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=alizhar123&hub.challenge=TEST123
```

**Expected Response:**
```
TEST123
```

Jika response bukan "TEST123", berarti ada masalah di webhook handler.

### Test 2: Lihat Logs Vercel
1. Buka: https://vercel.com/marcelaritonangs-projects/ruang-diri-faq-ai/logs
2. Filter route: `/src/app.js`
3. Lihat apakah ada request masuk ketika Anda test webhook

---

## TROUBLESHOOTING

### Error: "URL couldn't be validated"
- Environment variables belum diset di Vercel
- WHATSAPP_VERIFY_TOKEN tidak sama dengan yang diinput di Meta

### Error: "Connection timeout"
- Deployment Vercel belum selesai
- URL webhook salah

### Error: "403 Forbidden"
- Verify token tidak cocok
- Check environment variable `WHATSAPP_VERIFY_TOKEN` di Vercel

---

## SETELAH WEBHOOK AKTIF

Webhook sudah siap menerima pesan dari WhatsApp!

**Cara Test:**
1. Kirim pesan dari nomor yang terdaftar ke nomor chatbot
2. Webhook akan otomatis dipanggil
3. Chatbot akan merespon dengan AI
