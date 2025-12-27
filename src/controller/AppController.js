class AppController {
  constructor(services) {
    this.faqService = services.faqService;
    this.whatsappService = services.whatsappService;
  }

  // WhatsApp Webhook Verification (GET)
  verifyWebhook = (req, res) => {
  console.log('🔔 VERIFY WEBHOOK CALLED!'); // ← TAMBAHKAN INI
  console.log('Query params:', req.query); // ← DAN INI
  
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    console.log('Received:', { mode, token, challenge, verifyToken }); // ← DAN INI

    if (mode && token && mode === 'subscribe' && token === verifyToken) {
      console.log('✅ Webhook verified successfully');
      return res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed');
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error('Error in webhook verification:', error);
    return res.sendStatus(500);
  }
};

  // WhatsApp Webhook Receiver (POST)
  receiveAndReply = async (req, res) => {
    try {
      // Respond immediately to prevent retries
      console.log('📥 Full webhook body:', JSON.stringify(req.body, null, 2));
      res.status(200).send('OK');

      const body = req.body;
      const change = body.entry?.[0]?.changes?.[0]?.value;
      console.log('📊 Parsed change:', JSON.stringify(change, null, 2));
      console.log("JSON.stringify(body)")
      console.log(JSON.stringify(body))

      console.log('🔍 Checking for messages...');
      console.log('   change exists?', !!change);
      console.log('   change.messages exists?', !!change?.messages);
      console.log('   change.statuses exists?', !!change?.statuses);

      // ✅ Handle incoming messages (you already have this)
      if (change?.messages) {
        console.log('✅ ENTERING MESSAGE PROCESSING BLOCK');
        const messages = change.messages;
        const msg = messages[0];

        const phoneNumber = msg.from;
        const message = msg.text?.body;
        const timestamp = msg.timestamp;
        const timeSent = new Date(Number(timestamp) * 1000);

        console.log('📝 Extracted data:');
        console.log('   Phone:', phoneNumber);
        console.log('   Message:', message);
        console.log('   Timestamp:', timestamp);

        if (!phoneNumber?.trim() || !message?.trim()) {
          console.log('❌ Invalid phone number or message - STOPPING');
          return;
        }

        console.log(`📩 Message from ${phoneNumber}: ${message}`);
        console.log(`🕐 Sent at: ${timeSent.toISOString()}`);

        // Your existing message handling logic...
        console.log('📤 Sending acknowledgment message...');
        try {
          await this.whatsappService.sendMessage(
            phoneNumber,
            'Baik, mohon tunggu sebentar. Kami akan carikan informasi yang kamu inginkan 🔍'
          );
          console.log('✅ Acknowledgment message sent successfully!');
        } catch (ackError) {
          console.error('❌ ERROR sending acknowledgment:', ackError);
          console.error('❌ Error message:', ackError.message);
          console.error('❌ Error stack:', ackError.stack);
          if (ackError.response) {
            console.error('❌ API Response:', ackError.response.data);
          }
          throw ackError; // Re-throw to be caught by outer try-catch
        }

        console.log('🤖 Getting AI response...');
        try {
          const faqResponse = await this.faqService.findAnswer(message);
          console.log('AI Response:', faqResponse ? 'Found' : 'Not found');

          if (faqResponse) {
            console.log('📤 Sending AI response...');
            await this.whatsappService.sendMessage(phoneNumber, faqResponse);
            console.log(`✅ Replied to ${phoneNumber} with AI-generated answer`);
          } else {
            console.log('📤 Sending fallback message...');
            await this.whatsappService.sendMessage(
              phoneNumber,
              'Maaf, saya belum memiliki informasi mengenai pertanyaan tersebut. Silakan hubungi customer service kami untuk bantuan lebih lanjut.'
            );
            console.log(`⚠️ No answer found for ${phoneNumber}`);
          }
        } catch (aiError) {
          console.error('❌ ERROR in AI response:', aiError);
          console.error('❌ Error message:', aiError.message);
          console.error('❌ Error stack:', aiError.stack);
          if (aiError.response) {
            console.error('❌ API Response:', aiError.response.data);
            console.error('❌ API Status:', aiError.response.status);
          }
          throw aiError;
        }
        console.log('✅ MESSAGE PROCESSING COMPLETED');
      }

      // 🆕 ADD THIS: Handle message status updates (delivery, read, failed, etc.)
      if (change?.statuses) {
        const statuses = change.statuses;
        const status = statuses[0];

        const messageId = status.id;
        const recipientId = status.recipient_id;
        const statusType = status.status; // 'sent', 'delivered', 'read', 'failed'
        const timestamp = status.timestamp;

        console.log(`📊 Status Update for message ${messageId}:`);
        console.log(`   Recipient: ${recipientId}`);
        console.log(`   Status: ${statusType}`);
        console.log(`   Time: ${new Date(Number(timestamp) * 1000).toISOString()}`);

        // Handle failed messages
        if (statusType === 'failed') {
          const errors = status.errors || [];
          console.error(`❌ Message ${messageId} FAILED to ${recipientId}`);
          
          errors.forEach(error => {
            console.error(`   Error Code: ${error.code}`);
            console.error(`   Error Title: ${error.title}`);
            console.error(`   Error Message: ${error.message}`);
            console.error(`   Error Details: ${JSON.stringify(error.error_data)}`);
          });

          // Log common error codes
          if (errors.some(e => e.code === 131047)) {
            console.error(`   ⚠️ ERROR 131047: Re-engagement required - User hasn't opted in or 24hr window expired`);
          }
          if (errors.some(e => e.code === 131026)) {
            console.error(`   ⚠️ ERROR 131026: Message undeliverable`);
          }
          if (errors.some(e => e.code === 130472)) {
            console.error(`   ⚠️ ERROR 130472: User's phone number is not on WhatsApp`);
          }
        }

        // Handle successful deliveries
        if (statusType === 'delivered') {
          console.log(`✅ Message ${messageId} delivered to ${recipientId}`);
        }

        if (statusType === 'read') {
          console.log(`👁️ Message ${messageId} read by ${recipientId}`);
        }
      }

      // Handle other webhook events
      if (!change?.messages && !change?.statuses) {
        console.log('ℹ️ Other webhook event received:', JSON.stringify(change, null, 2));
      }

    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      
      try {
        const phoneNumber = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;
        if (phoneNumber) {
          await this.whatsappService.sendMessage(
            phoneNumber,
            'Maaf, terjadi kesalahan. Silakan coba lagi nanti atau hubungi customer service kami.'
          );
        }
      } catch (sendError) {
        console.error('❌ Failed to send error message:', sendError);
      }
    }
  };

  // Chat
  chat = async (req, res) => {
    try {
      const body = req.body;
      const change = body.entry?.[0]?.changes?.[0]?.value;

      const messages = change.messages;
      const msg = messages[0];

      const phoneNumber = msg.from;
      const message = msg.text?.body;
      const timestamp = msg.timestamp;
      const timeSent = new Date(Number(timestamp) * 1000);

      console.log(`📩 Message from ${phoneNumber}: ${message}`);
      console.log(`🕐 Sent at: ${timeSent.toISOString()}`);

      const faqResponse = await this.faqService.findAnswer(message);

      if (faqResponse) {
        console.log(`faqResponse fetched`);
        return res.json({ success: true, answer: faqResponse });
      } else {
        console.log(`⚠️ No answer found for ${phoneNumber}`);
        return res.json({
          success: false,
          answer: 'Maaf, saya belum memiliki informasi mengenai pertanyaan tersebut. Silakan hubungi customer service kami untuk bantuan lebih lanjut.'
        });
      }
    } catch (error) {
      console.error('❌ Error processing webhook:', error);

      const phoneNumber = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;
      if (phoneNumber) {
        return res.json({
          success: false,
          answer: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti atau hubungi customer service kami.'
        });
      }

      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export default AppController;