const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyDecorator = require('../middleware/verifyDecorator');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// GET /decorators - Get all decorators
router.get('/', verifyToken, async (req, res) => {
  // TODO: Implement get all decorators
  res.json({ message: 'GET all decorators - not yet implemented' });
});

// GET /decorators/assignments - Get assignments for a decorator
router.get('/assignments', verifyToken, verifyDecorator, async (req, res) => {
  // TODO: Implement get decorator assignments
  res.json({ message: 'GET decorator assignments - not yet implemented' });
});

// PATCH /decorators/assignments/:id - Update assignment status
router.patch('/assignments/:id', verifyToken, verifyDecorator, async (req, res) => {
  // TODO: Implement update assignment status
  res.json({ message: 'PATCH update assignment status - not yet implemented' });
});

// POST /decorators/assign - Assign decorator to booking (admin)
router.post('/assign', verifyToken, verifyAdmin, async (req, res) => {
  // TODO: Implement assign decorator
  res.json({ message: 'POST assign decorator - not yet implemented' });
});

module.exports = router;
