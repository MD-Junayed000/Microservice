const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  rideId:        { type: mongoose.Types.ObjectId, required: true },
  driverName:    { type: String, required: true },
  startTime:     { type: Date },
  endTime:       { type: Date },
  status:        {
    type: String,
    enum: ['CREATED', 'STARTED', 'COMPLETED'],
    default: 'CREATED',
  },
  fare:          { type: Number, required: true },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
