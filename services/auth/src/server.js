const express   = require('express');
const mongoose  = require('mongoose');
const cfg       = require('./config/env');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:5174'],   // Allow both Vite dev server ports
  credentials: true
}));

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', authRoutes);

mongoose
  .connect(cfg.mongoUrl)
  .then(() => {
    console.log('🟢 Mongo connected');
    app.listen(cfg.port, () =>
      console.log(`🚀 Auth service running on http://localhost:${cfg.port}`)
    );
  })
  .catch((err) => console.error('🔴 Mongo error', err));
