const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const verifyDecorator = require('../middleware/verifyDecorator');

// GET /decorators/assigned/:email
// Fetch bookings assigned to this decorator
router.get('/assigned/:email', verifyToken, verifyDecorator, async (req, res) => {
  try {
    const { email } = req.params;

    // Ensure they are only fetching their own data
    if (email !== req.decoded.email) {
      return res.status(403).json({ message: 'Forbidden access' });
    }

    // 1. Find the decorator's user record to get their Name
    const decoratorUser = await User.findOne({ email });
    if (!decoratorUser) {
      return res.status(404).json({ message: 'Decorator not found' });
    }

    // 2. Find bookings where decoratorAssigned matches their name
    const assignedBookings = await Booking.find({ 
      decoratorAssigned: decoratorUser.name 
    }).sort({ bookingDate: 1 });

    res.json(assignedBookings);
  } catch (error) {
    console.error('Error fetching assigned projects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH /decorators/project-status/:id
// Update the status of a specific booking (e.g. to 'in-progress' or 'completed')
router.patch('/project-status/:id', verifyToken, verifyDecorator, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body; // e.g. 'in-progress', 'completed'

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
