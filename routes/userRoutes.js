const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
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

// GET / - Get all users
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH /role/:id - Update user role
router.patch('/role/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /:id - Delete a user
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
