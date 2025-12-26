# 📱 PANDUAN TESTING DENGAN NOMOR TEST META

## Apa itu Test Number +1 (555) 170-6725?

Ini adalah **nomor test resmi dari Meta Developer** yang bisa Anda gunakan untuk:
1. **Mengirim pesan KE chatbot** (dari nomor Anda ke nomor test)
2. **Menerima pesan DARI chatbot** (dari nomor test ke nomor Anda)

---

## CARA MENGGUNAKAN TEST NUMBER

### Dari Screenshot Meta Developer Anda:

Di section **"2. Pilih nomor telepon 'Dari'"**, ada dropdown:
```
Test number: +1 555 170 6725
```

**Ini artinya:**
- Nomor **+1 555 170 6725** adalah nomor **CHATBOT ANDA**
- Nomor **Anda (nomor eSIM atau nomor lain)** akan mengirim pesan **KE** nomor ini
- Chatbot akan **BALAS** dari nomor **+1 555 170 6725**

---

## KENAPA ANDA BISA CHAT KE NOMOR +1 DI SCREENSHOT?

Dari screenshot WhatsApp Anda:

1. **Nomor +1 (555) 170-6725** adalah **Business Account** chatbot
2. Pesan yang **berwarna hijau** (di kanan) = pesan dari **ANDA**
3. Pesan yang **berwarna abu-abu** (di kiri) = pesan dari **CHATBOT**

**Artinya:**
- Anda mengirim pesan: "apa itu burnout?", "Halo", dll
- Chatbot membalas dengan: "Test dari Claude", "Baik, mohon tunggu sebentar..."

Ini sudah **BEKERJA DENGAN SEMPURNA!** ✅

---

## LANGKAH-LANGKAH TESTING

### SKENARIO 1: Test dari Nomor yang Sudah Terdaftar (6281398517263)

Dari screenshot, nomor **6281398517263** sudah bisa chat dengan chatbot.

**Cara Test:**
1. Buka WhatsApp di nomor **6281398517263**
2. Cari chat dengan **+1 (555) 170-6725**
3. Kirim pertanyaan, contoh:
   ```
   apa itu burnout?
   ```
4. Tunggu chatbot merespon dengan AI

**Expected Response:**
```
Baik, mohon tunggu sebentar. Kami akan carikan informasi yang kamu inginkan 🔍

[Jawaban AI tentang burnout]
```

---

### SKENARIO 2: Test dari Nomor eSIM Baru (+62 878-8279-1303)

Nomor ini **BELUM BISA** chat ke chatbot karena belum ditambahkan ke allowed list.

**Yang Harus Dilakukan:**

#### A. Tambahkan Nomor ke Allowed List di Meta Developer

1. **Buka Meta Developer** (screenshot pertama Anda)
2. Di section **"3. Add a recipient phone number"**
3. Klik dropdown **"Pilih nomor penerima"**
4. Klik **"Manage phone number list"** atau **tombol + (tambah)**
5. Input nomor eSIM:
   ```
   +62 878-8279-1303
   ```
   atau
   ```
   6287882791303
   ```
6. Meta akan kirim **kode OTP** ke WhatsApp nomor eSIM
7. **Buka WhatsApp di nomor eSIM** dan cek pesan dari Meta
8. Input kode OTP untuk verifikasi
9. Tunggu status berubah jadi **"Verified"**

#### B. Setelah Verified, Test dari Nomor eSIM

1. Buka WhatsApp di nomor eSIM (**+62 878-8279-1303**)
2. Chat ke nomor **+1 (555) 170-6725**
3. Kirim pesan:
   ```
   Halo, test dari nomor eSIM
   ```
4. Chatbot akan balas otomatis!

---

## ALTERNATIF: Kirim Pesan Test dari API

Jika sudah menambahkan nomor eSIM ke allowed list, Anda bisa test dengan script:

```bash
node testESIM.js
```

Script ini akan:
1. Kirim pesan test ke nomor eSIM dari API
2. Nomor eSIM akan terima pesan dari chatbot
3. Anda bisa balas dari WhatsApp

---

## PERBEDAAN DEVELOPMENT vs PRODUCTION MODE

### Development Mode (Sekarang):
- Hanya bisa kirim pesan ke nomor yang **terdaftar** (max 5 nomor)
- Menggunakan **Test Number** (+1 555 170 6725)
- **GRATIS** - 1000 pesan per bulan

### Production Mode (Nanti):
- Bisa kirim pesan ke **SEMUA NOMOR** di dunia
- Menggunakan **nomor WhatsApp Bisnis ASLI**
- **BERBAYAR** - sesuai pricing Meta

---

## KESIMPULAN

**UNTUK TESTING SEKARANG:**
1. ✅ Chatbot sudah berfungsi dengan nomor **6281398517263**
2. ⏳ Nomor eSIM (**+62 878-8279-1303**) masih **"Sedang diproses"** (lihat screenshot kedua)
3. 📝 Tunggu nomor eSIM diverifikasi oleh Meta
4. ➕ Setelah itu, tambahkan ke **recipient list** di Meta Developer
5. ✅ Baru bisa test dari nomor eSIM

**UNTUK PRODUCTION NANTI:**
- Upgrade akun Meta Business ke **Production Mode**
- Verifikasi bisnis Anda
- Request WhatsApp Business Number yang asli
- Bisa kirim ke semua nomor tanpa perlu allowed list
