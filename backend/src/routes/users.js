const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const User = require('../models/User');

// GET /api/users/me
router.get('/me', auth, async (req, res, next) => {
  try {
    const u = await User.findById(req.user.id).select('-passwordHash -__v');
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (err) { next(err); }
});

module.exports = router;
