const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const Service = require('../models/Service');
const router = express.Router();

// GET /services - Get all services with query params
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.service_name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.cost = {};
      if (minPrice) query.cost.$gte = Number(minPrice);
      if (maxPrice) query.cost.$lte = Number(maxPrice);
    }

    let sortOptions = {};
    if (sort === 'priceAsc') {
      sortOptions.cost = 1;
    } else if (sort === 'priceDesc') {
      sortOptions.cost = -1;
    } else if (sort === 'popularityDesc') {
      sortOptions.popularity = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const services = await Service.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const total = await Service.countDocuments(query);

    res.json({
      services,
      totalServices: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /services/:id - Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid service ID' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
