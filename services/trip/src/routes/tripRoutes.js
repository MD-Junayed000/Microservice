const { Router } = require('express');
const {
  createTrip, startTrip, completeTrip, getTrip
} = require('../controllers/tripController');
const authMW = require('../middleware/auth');   // copy from Auth

const router = Router();

router.post('/',         authMW, createTrip);          // POST /trips
router.patch('/:id/start',  authMW, startTrip);        // PATCH /trips/:id/start
router.patch('/:id/complete', authMW, completeTrip);   // PATCH /trips/:id/complete
router.get('/:id',       authMW, getTrip);             // GET  /trips/:id

module.exports = router;
