# QUICK FIX GUIDE - WhatsApp Bot Issue

## PROBLEM
✅ Acknowledgment sent successfully
❌ AI response not being sent

## ROOT CAUSE
Most likely: **WhatsApp Access Token expired** or **Gemini API error**

## SOLUTION (8 minutes total)

### STEP 1: Update Token in Vercel (5 min)

1. Open: https://vercel.com/marcelaritonangs-projects/ruang-diri-faq-ai/settings/environment-variables
2. Find: **WHATSAPP_TOKEN**
3. Click **Edit**
4. Replace with new token:
```
EAAUY6x5JlkwBQcLwwrBKbeNXYbJAYuUwWPSTeVavgthjFtFcZCdvJFcj42bcTTDC7CWvGak8oBvcpvNZBmuVNUM4ITrDgTcNt88OFRK0oyAap7I1j7ZA8HcVSFO6WO1wFwxI3Bt1YeKZA9r6fzyyujrZCzaE6SoyuxoTz9btlLgDSCD4uvIUGA9GfK9O7L1VTM9uMs9PAecgA98q64SD2W5x9JX8Mrc52grFNtRKvpZCNllZCc9r5vQzmkoSxiwW9U6lMZCLZCuvceqe3YCG5kWS9JkVBHwZDZD
```
5. Click **Save**
6. **WAIT 2 MINUTES** for auto-redeploy

### STEP 2: Open Vercel Logs (2 min)

1. Open: https://vercel.com/marcelaritonangs-projects/ruang-diri-faq-ai/logs
2. Click **"Realtime"** button
3. Keep tab open

### STEP 3: Test from WhatsApp (1 min)

After 2 minutes from Step 1:

1. Open WhatsApp on **6281398517263**
2. Chat to: **+1 555 170 6725**
3. Send: `test burnout - apa itu burnout?`
4. Wait 10-15 seconds

**While waiting, check Vercel Logs:**
- New log entry should appear: `POST /whatsapp/webhook`
- Click to expand
- Screenshot all logs

## WHAT TO SCREENSHOT

1. ✅ Full Vercel Logs (expanded log entry)
2. ✅ WhatsApp conversation (your message + bot response)

## EXPECTED RESULT

**In Vercel Logs, you should see:**
```
✅ Acknowledgment message sent
🤖 Getting AI response...
AI Response: Found
📤 Sending AI response...
✅ Message sent successfully
```

**In WhatsApp, you should receive:**
1. Acknowledgment: "Baik, mohon tunggu sebentar..."
2. AI Response: [Detailed answer about burnout]

## IF STILL FAILS

Look for errors in Vercel Logs:

**Error Type A: Gemini API Error**
```
❌ Error in AI answer generation: [error]
```
→ Fix: Check GEMINI_API_KEY

**Error Type B: WhatsApp Send Error**
```
❌ Error sending message:
Status: 401 (Unauthorized)
```
→ Fix: Token still invalid, generate new one

**Error Type C: Rate Limit**
```
Status: 429 (Rate Limited)
```
→ Fix: Wait a few minutes, then test again

---

Generated: 2025-12-27
