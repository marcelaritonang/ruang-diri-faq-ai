import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import config from './config/environment.js';

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===== TEST ENDPOINT (LANGSUNG DI APP.JS) =====
app.get('/test-direct', (req, res) => {
  console.log('🧪 TEST DIRECT ENDPOINT HIT!');
  res.send('TEST DIRECT WORKS!');
});

// ===== WEBHOOK LANGSUNG (BYPASS ROUTES) =====
app.get('/whatsapp/webhook', (req, res) => {
  console.log('🔔 WEBHOOK GET ENDPOINT HIT!');
  console.log('Query:', req.query);

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('Verify Token from env:', verifyToken);
  console.log('Received:', { mode, token, challenge });

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ Webhook verified!');
    return res.status(200).send(challenge);
  } else {
    console.log('❌ Verification failed!');
    return res.sendStatus(403);
  }
});

// Debug: Log ALL incoming requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  if (req.method === 'POST' && req.path === '/whatsapp/webhook') {
    console.log('📥 POST webhook body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// ===== ROUTES =====
app.use('/', routes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 29537;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 WhatsApp webhook ready at /whatsapp/webhook`);
  console.log(`🌐 Environment: ${config.nodeEnv}`);
  console.log(`🔑 Verify Token: ${process.env.WHATSAPP_VERIFY_TOKEN}`);
});

export default app;