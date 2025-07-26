const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const Joi = require('joi');

// Validation schemas
const createTripSchema = Joi.object({
  userId: Joi.string().required(),
  driverId: Joi.string().required(),
  rideId: Joi.string().required(),
  pickupLocation: Joi.object({
    address: Joi.string().required(),
    coordinates: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required()
  }).required(),
  dropoffLocation: Joi.object({
    address: Joi.string().required(),
    coordinates: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required()
  }).required()
});

const endTripSchema = Joi.object({
  endLocation: Joi.object({
    address: Joi.string().required(),
    coordinates: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required()
  }).optional()
});

const rateTripSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().max(500).optional()
});

// Validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message
      });
    }
    next();
  };
};

// Routes
router.post('/', validateRequest(createTripSchema), tripController.createTrip);
router.put('/:tripId/start', tripController.startTrip);
router.put('/:tripId/end', validateRequest(endTripSchema), tripController.endTrip);
router.get('/:tripId', tripController.getTrip);
router.get('/user/:userId', tripController.getUserTrips);
router.post('/:tripId/rate', validateRequest(rateTripSchema), tripController.rateTrip);
router.put('/:tripId/cancel', tripController.cancelTrip);

module.exports = router; 