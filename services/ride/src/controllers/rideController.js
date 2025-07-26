const Joi = require('joi');
const Ride = require('../models/rideRequest');
const logger = require('../../../shared/logger');
const createSchema = Joi.object({
  riderName:   Joi.string().required(),
  pickup:      Joi.string().required(),
  destination: Joi.string().required(),
  fare:        Joi.number().positive().required(),
});

exports.createRide = async (req, res) => {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  logger.info('Ride created', { rideId: ride._id });
  try {
    const ride = await Ride.create(req.body);
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.sendStatus(404);
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
