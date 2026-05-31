const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const Booking = require('../models/Booking');
const router = express.Router();

// GET /bookings - Get all bookings (admin only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// GET /bookings/:id - Get single booking by ID
router.get('/:id', verifyToken, async (req, res) => {
  // TODO: Implement get booking by ID
  res.json({ message: 'GET booking by ID - not yet implemented' });
});

// GET /user/:email - Get bookings for a specific user email
router.get('/user/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    if (req.decoded.email !== email) {
      return res.status(403).json({ message: 'Forbidden access' });
    }
    const bookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// POST / - Create a new booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { userEmail, userName, serviceId, serviceName, bookingDate, location, serviceMode } = req.body;
    const newBooking = new Booking({
      userEmail,
      userName,
      serviceId,
      serviceName,
      bookingDate,
      location,
      serviceMode
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// PATCH /status/:id - Update booking status (admin only)
router.patch('/status/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status, decoratorAssigned } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status, decoratorAssigned },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
});

// DELETE /bookings/:id - Cancel/delete a booking
router.delete('/:id', verifyToken, async (req, res) => {
  // TODO: Implement delete booking
  res.json({ message: 'DELETE booking - not yet implemented' });
});

module.exports = router;
