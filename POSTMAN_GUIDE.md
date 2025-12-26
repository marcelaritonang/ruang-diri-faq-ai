# 📮 PANDUAN TESTING CHATBOT DENGAN POSTMAN

## SETUP POSTMAN

### 1. Buka Postman
Download dari: https://www.postman.com/downloads/

### 2. Create New Request
- Klik **"New"** > **"HTTP Request"**
- Method: **POST**

---

## REQUEST 1: KIRIM PESAN KE NOMOR TERDAFTAR

### URL:
```
https://graph.facebook.com/v18.0/929102273621555/messages
```

### Method:
```
POST
```

### Headers:
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer EAAUY6x5JlkwBQZAAxO3sZAEjSecKZANdYfHdoBWq9wGE2pVJ4ZCjLQ9elw0Im2lGJQa6wEphpHHhkK5HP6kzh3FBkFwgCoTw2ZALoHlkjep2v4ZChFj7ocWRMCm0atZBGDL3wpikAroa1vKi3gIEbcvRT1ZCacTRIQBHYoOyo6R6JP8FHLr7lM6RiWjnCZBrAV0kMaaCCG4ZBTU1hZAHcXf63knzSBuNZB1CXaakqVmREnGadALq5a1l5ZBzQCZAnKBBCCtuqLBxVCePknLFyccjpPFuf01SZCnyQZDZD` |

⚠️ **PENTING:** Ganti token di atas dengan token terbaru dari Meta Developer Anda!

### Body (raw JSON):
```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "6281398517263",
  "type": "text",
  "text": {
    "preview_url": false,
    "body": "Test dari Postman! Chatbot berfungsi dengan baik."
  }
}
```

### Klik "Send"

### Expected Response (Success):
```json
{
  "messaging_product": "whatsapp",
  "contacts": [
    {
      "input": "6281398517263",
      "wa_id": "6281398517263"
    }
  ],
  "messages": [
    {
      "id": "wamid.HBgNNjI4MTM5ODUxNzI2MxUCABEYEjdGRjM2QzNBOEFDRTRCREQwNAA="
    }
  ]
}
```

### Possible Errors:

#### Error 131030: Nomor tidak di allowed list
```json
{
  "error": {
    "message": "(#131030) Recipient phone number not in allowed list",
    "type": "OAuthException",
    "code": 131030
  }
}
```
**Solusi:** Tambahkan nomor ke Meta Developer > WhatsApp > Add recipient phone number

#### Error 190: Token invalid
```json
{
  "error": {
    "message": "Invalid OAuth access token",
    "type": "OAuthException",
    "code": 190
  }
}
```
**Solusi:** Generate token baru di Meta Developer

---

## REQUEST 2: KIRIM TEMPLATE MESSAGE

### URL:
```
https://graph.facebook.com/v18.0/929102273621555/messages
```

### Method:
```
POST
```

### Headers:
(Same as above)

### Body (raw JSON):
```json
{
  "messaging_product": "whatsapp",
  "to": "6281398517263",
  "type": "template",
  "template": {
    "name": "hello_world",
    "language": {
      "code": "en_US"
    }
  }
}
```

---

## REQUEST 3: TEST WEBHOOK (GET)

Untuk verifikasi webhook:

### URL:
```
https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=alizhar123&hub.challenge=TEST123
```

### Method:
```
GET
```

### Expected Response:
```
TEST123
```

---

## REQUEST 4: SIMULASI WEBHOOK INCOMING MESSAGE (POST)

Untuk test webhook menerima pesan:

### URL:
```
https://ruang-diri-faq-ai.vercel.app/whatsapp/webhook
```

### Method:
```
POST
```

### Headers:
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

### Body (raw JSON):
```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "1948040609429233",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15551706725",
              "phone_number_id": "929102273621555"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Test User"
                },
                "wa_id": "6281398517263"
              }
            ],
            "messages": [
              {
                "from": "6281398517263",
                "id": "wamid.TEST123",
                "timestamp": "1640000000",
                "text": {
                  "body": "apa itu burnout?"
                },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

### Expected Response:
```
OK
```

**Cek Logs Vercel:** Anda akan lihat chatbot memproses pesan dan mengirim balasan!

---

## TIPS POSTMAN

1. **Save Request** - Klik "Save" untuk menyimpan request
2. **Create Collection** - Buat collection "WhatsApp Chatbot Testing"
3. **Environment Variables** - Set variables untuk token dan phone number ID
4. **Tests Tab** - Tambahkan assertions untuk auto-validation

---

## TROUBLESHOOTING

### 1. "Could not send request"
- Check internet connection
- Pastikan URL benar

### 2. Status 403
- Token salah atau expired
- Generate token baru

### 3. Status 400
- Body JSON format salah
- Periksa syntax JSON

### 4. No response
- Server Vercel down
- Check deployment status
