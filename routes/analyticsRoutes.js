const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// GET /analytics/admin-stats - Get admin dashboard statistics
router.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
  // TODO: Implement admin stats (total users, services, bookings, revenue)
  res.json({ message: 'GET admin stats - not yet implemented' });
});

// GET /analytics/user-stats/:email - Get user-specific statistics
router.get('/user-stats/:email', verifyToken, async (req, res) => {
  // TODO: Implement user stats
  res.json({ message: 'GET user stats - not yet implemented' });
});

module.exports = router;
