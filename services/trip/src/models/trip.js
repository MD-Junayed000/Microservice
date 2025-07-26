const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  driverId: {
    type: String,
    required: true
  },
  rideId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'started', 'completed', 'cancelled'],
    default: 'pending'
  },
  pickupLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  dropoffLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  distance: {
    type: Number, // in kilometers
    default: 0
  },
  fare: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
tripSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate tripId before saving
tripSchema.pre('save', function(next) {
  if (!this.tripId) {
    this.tripId = `TRIP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Trip', tripSchema); 