const { Router } = require('express');
const { register, login } = require('../controllers/authController');
const authMW = require('../middleware/auth');  // ← exactly this


const router = Router();

router.post('/register', register);
router.post('/login',    login);

/* ---- NEW protected endpoint ---- */
router.get('/profile', authMW, (req, res) => {
  res.json({ user: req.user });   // returns JWT payload (id, email)
});
/* -------------------------------- */

module.exports = router;
