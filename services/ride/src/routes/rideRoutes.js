const { Router } = require('express');
const { createRide, getRide } = require('../controllers/rideController');
const authMW = require('../middleware/auth');

const router = Router();

router.post('/', authMW, createRide);   // now requires Bearer token
router.get('/:id',     getRide);    // GET  /rides/:id

module.exports = router;
