const Joi  = require('joi');
const Trip = require('../models/trip');

const createSchema = Joi.object({
  rideId:     Joi.string().required(),
  driverName: Joi.string().required(),
  fare:       Joi.number().positive().required()
});

exports.createTrip = async (req,res) => {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.startTrip = async (req,res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status:'STARTED', startTime: new Date() },
      { new:true }
    );
    if (!trip) return res.sendStatus(404);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeTrip = async (req,res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status:'COMPLETED', endTime: new Date(), paymentStatus:'PAID' },
      { new:true }
    );
    if (!trip) return res.sendStatus(404);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrip = async (req,res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.sendStatus(404);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
