# 🔧 CARA FIX GEMINI API KEY YANG LEAKED

## MASALAH:
API Key Gemini Anda sudah dilaporkan **LEAKED** (bocor) dan Google menonaktifkannya.
Ini menyebabkan chatbot **TIDAK BISA** membalas dengan AI.

---

## SOLUSI: Generate API Key Baru

### STEP 1: Buka Google AI Studio
https://makersuite.google.com/app/apikey

atau

https://aistudio.google.com/app/apikey

### STEP 2: Delete API Key Lama (Opsional)
1. Cari API key yang ada: `AIzaSyBvONOieqfDOiadhCgActdMyeEOjSUSiqI`
2. Klik **"Delete"** atau **"Revoke"**

### STEP 3: Create New API Key
1. Klik tombol **"Create API Key"** atau **"Get API Key"**
2. Pilih project atau buat project baru
3. Klik **"Create API key in existing project"** atau **"Create API key in new project"**
4. **COPY** API key yang baru

**Contoh API key:**
```
AIzaSyABC123DEF456GHI789JKL012MNO345PQR
```

⚠️ **PENTING:** Jangan share API key ini di public GitHub atau chat!

---

## STEP 4: Update API Key di Lokal (.env)

1. Buka file `.env` di project Anda
2. Ganti value `GEMINI_API_KEY`:

```env
GEMINI_API_KEY=AIzaSyABC123DEF456GHI789JKL012MNO345PQR
```

3. Save file

---

## STEP 5: Update API Key di Vercel

1. Buka Vercel dashboard:
   https://vercel.com/marcelaritonangs-projects/ruang-diri-faq-ai/settings/environment-variables

2. Cari environment variable `GEMINI_API_KEY`

3. Klik **"Edit"** atau **tombol pensil**

4. Ganti value dengan API key baru

5. Klik **"Save"**

6. Vercel akan otomatis **redeploy**

7. Tunggu deployment selesai (1-2 menit)

---

## STEP 6: Update Model Name di Kode

### Buka file: `src/services/ai/GeminiService.js`

**Line 12 - SEBELUM:**
```javascript
this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
```

**Line 12 - SESUDAH:**
```javascript
this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
```

atau

```javascript
this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
```

**Model yang tersedia:**
- `gemini-pro` - Model standard Google Gemini
- `gemini-1.5-pro` - Model terbaru (jika tersedia)
- `gemini-1.0-pro` - Model stable

---

## STEP 7: Test API Key Baru

Setelah update API key, jalankan:

```bash
node testGeminiAPI.js
```

**Expected output:**
```
✅ Model gemini-pro BERHASIL!
Response: [Jawaban AI tentang burnout]
```

---

## STEP 8: Redeploy ke Vercel

### Opsi A: Auto Redeploy (setelah update env var di Vercel)
- Vercel otomatis redeploy
- Tunggu selesai

### Opsi B: Manual Redeploy
```bash
git add .
git commit -m "Fix Gemini API key"
git push origin main
```

---

## STEP 9: Test Chatbot Lagi

1. Buka WhatsApp di nomor Anda
2. Chat ke **+1 (555) 170-6725**
3. Kirim: `apa itu burnout?`
4. ✅ Seharusnya chatbot balas dengan **AI response lengkap**!

---

## TROUBLESHOOTING

### Error: "API key not valid"
- Generate API key baru
- Pastikan copy full API key (tidak terpotong)

### Error: "Quota exceeded"
- API key gratis ada limit
- Tunggu 24 jam atau upgrade ke paid plan

### Error: "Model not found"
- Gunakan model name yang benar: `gemini-pro`
- Jangan gunakan `gemini-2.5-flash` (tidak exist)

---

## KEAMANAN API KEY

❌ **JANGAN:**
- Commit API key ke Git
- Share API key di public
- Hardcode API key di kode

✅ **LAKUKAN:**
- Simpan di `.env` (sudah di .gitignore)
- Gunakan environment variables
- Rotate API key secara berkala

---

## SETELAH FIX

Chatbot akan:
1. ✅ Terima pesan dari Anda
2. ✅ Balas "Baik, mohon tunggu sebentar..."
3. ✅ Proses dengan Gemini AI
4. ✅ Kirim jawaban AI lengkap tentang burnout/meditasi!
