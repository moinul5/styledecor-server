const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

const router = express.Router();

// GET /stats - Return an object with total counts for users, services, bookings and total revenue
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const servicesCount = await Service.countDocuments();
    const bookingsCount = await Booking.countDocuments();

    const paymentResult = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' }
        }
      }
    ]);

    const totalRevenue = paymentResult.length > 0 ? paymentResult[0].totalRevenue : 0;

    res.json({ usersCount, servicesCount, bookingsCount, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// GET /service-demand - Aggregate Booking collection
router.get('/service-demand', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const demand = await Booking.aggregate([
      {
        $group: {
          _id: '$serviceName',
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: 1
        }
      }
    ]);
    res.json(demand);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service demand', error: error.message });
  }
});

// GET /revenue - Return mock data for a line chart
router.get('/revenue', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const revenueData = [
      { name: 'Jan', revenue: 4000 },
      { name: 'Feb', revenue: 3000 },
      { name: 'Mar', revenue: 5000 },
      { name: 'Apr', revenue: 4500 },
      { name: 'May', revenue: 6000 },
      { name: 'Jun', revenue: 5500 }
    ];
    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
  }
});

module.exports = router;
