const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// GET /users/admin/:email - Check if user is admin
router.get('/admin/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    if (req.decoded.email !== email) {
      return res.status(403).json({ message: 'Forbidden: Email mismatch' });
    }
    const user = await User.findOne({ email });
    const admin = user?.role === 'admin';
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /users/decorator/:email - Check if user is decorator
router.get('/decorator/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    if (req.decoded.email !== email) {
      return res.status(403).json({ message: 'Forbidden: Email mismatch' });
    }
    const user = await User.findOne({ email });
    const decorator = user?.role === 'decorator';
    res.json({ decorator });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /users/:email - Get user by email
router.get('/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    if (req.decoded.email !== email) {
      return res.status(403).json({ message: 'Forbidden: Email mismatch' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /users - Upsert user (create if not exists)
router.post('/', async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists', insertedId: null });
    }
    const newUser = new User({
      name,
      email,
      photoURL: photoURL || '',
      role: 'user',
    });
    const result = await newUser.save();
    res.status(201).json({ message: 'User created', insertedId: result._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
