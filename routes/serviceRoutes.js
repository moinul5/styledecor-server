const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// GET /services - Get all services with query params
router.get('/', async (req, res) => {
  // TODO: Implement get all services with filtering, sorting, pagination
  res.json({ message: 'GET all services - not yet implemented' });
});

// GET /services/:id - Get service by ID
router.get('/:id', async (req, res) => {
  // TODO: Implement get single service by ID
  res.json({ message: 'GET service by ID - not yet implemented' });
});

// POST /services - Add a new service (admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  // TODO: Implement create service
  res.json({ message: 'POST create service - not yet implemented' });
});

// PATCH /services/:id - Update a service (admin only)
router.patch('/:id', verifyToken, verifyAdmin, async (req, res) => {
  // TODO: Implement update service
  res.json({ message: 'PATCH update service - not yet implemented' });
});

// DELETE /services/:id - Delete a service (admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  // TODO: Implement delete service
  res.json({ message: 'DELETE service - not yet implemented' });
});

module.exports = router;
