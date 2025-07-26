const express   = require('express');
const mongoose  = require('mongoose');
const cfg       = require('./config/env');
const tripRoutes = require('./routes/tripRoutes');
const cors      = require('cors');
const logger = require('../../shared/logger');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/health', (_,res) => res.json({ status:'ok' }));
app.use('/trips', tripRoutes);

mongoose.connect(cfg.mongoUrl)
  .then(() => {
    console.log('🟢 Mongo connected');
    app.listen(cfg.port, () =>
      console.log(`🚀 Trip service on http://localhost:${cfg.port}`));
  })
  .catch(err => console.error('🔴 Mongo error', err));
