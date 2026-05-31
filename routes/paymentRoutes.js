const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const router = express.Router();// POST /payments/create-payment-intent - Create Stripe payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { price } = req.body;
    if (!price) {
      return res.status(400).json({ message: 'Price is required' });
    }
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent', error: error.message });
  }
});

// POST /payments - Save payment record
router.post('/', verifyToken, async (req, res) => {
  try {
    const { bookingId, transactionId, amount, paidBy } = req.body;
    const payment = new Payment({
      bookingId,
      transactionId,
      amount,
      paidBy
    });
    const savedPayment = await payment.save();

    // Update the corresponding Booking
    await Booking.findByIdAndUpdate(bookingId, {
      status: 'confirmed',
      paymentStatus: 'paid'
    });

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error saving payment', error: error.message });
  }
});

// GET /payments/:email - Get payment history for a user
router.get('/:email', verifyToken, async (req, res) => {
  try {
    const { email } = req.params;
    
    if (email !== req.decoded.email) {
      return res.status(403).json({ message: 'Forbidden access' });
    }

    const payments = await Payment.find({ paidBy: email })
                                  .populate('bookingId')
                                  .sort({ paidAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
});

module.exports = router;
