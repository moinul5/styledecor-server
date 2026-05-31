const User = require('../models/User');

const verifyDecorator = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const user = await User.findOne({ email });
    if (!user || user.role !== 'decorator') {
      return res.status(403).json({ message: 'Forbidden: Decorator access required' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = verifyDecorator;
