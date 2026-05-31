const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /auth/jwt - Generate JWT token and set as httpOnly cookie
router.post('/jwt', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.json({ success: true });
});

// POST /auth/logout - Clear the token cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.json({ success: true });
});

module.exports = router;
