import express from 'express';
import AppController from '../controller/AppController.js';
import services from '../services/index.js';

const router = express.Router();

const appController = new AppController(services);

// TEST ENDPOINT
router.get('/test', (req, res) => {
  console.log('🧪 TEST ENDPOINT HIT!');
  res.send('TEST WORKS!');
});

// WhatsApp webhook routes
router.get('/whatsapp/webhook', appController.verifyWebhook);
router.post('/whatsapp/webhook', appController.receiveAndReply);

// Chat endpoint
router.post('/chat', appController.chat);

export default router;