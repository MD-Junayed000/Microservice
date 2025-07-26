const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  riderName:    { type: String, required: true },
  pickup:       { type: String, required: true },
  destination:  { type: String, required: true },
  fare:         { type: Number, required: true },
  status:       { type: String, enum: ['REQUESTED','ACCEPTED','COMPLETED'], default: 'REQUESTED' },
}, { timestamps: true });

module.exports = mongoose.model('RideRequest', rideSchema);
