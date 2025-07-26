const express   = require('express');
const mongoose  = require('mongoose');
const cfg       = require('./config/env');
const rideRoutes = require('./routes/rideRoutes');

const app = express();
app.use(express.json());
app.get('/health', (_,res) => res.json({ status: 'ok' }));
app.use('/rides', rideRoutes);

mongoose.connect(cfg.mongoUrl)
  .then(() => {
    console.log('🟢 Mongo connected');
    app.listen(cfg.port, () =>
      console.log(`🚀 Ride service on http://localhost:${cfg.port}`));
  })
  .catch(err => console.error('🔴 Mongo error', err));
