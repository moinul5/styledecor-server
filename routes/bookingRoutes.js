const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const Booking = require('../models/Booking');
const router = express.Router();

// GET /bookings - Get bookings (filtered by user email or all for admin)
router.get('/', verifyToken, async (req, res) => {
  // TODO: Implement get bookings
  res.json({ message: 'GET bookings - not yet implemented' });
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

// PATCH /bookings/:id - Update booking status
router.patch('/:id', verifyToken, async (req, res) => {
  // TODO: Implement update booking
  res.json({ message: 'PATCH update booking - not yet implemented' });
});

// DELETE /bookings/:id - Cancel/delete a booking
router.delete('/:id', verifyToken, async (req, res) => {
  // TODO: Implement delete booking
  res.json({ message: 'DELETE booking - not yet implemented' });
});

module.exports = router;
