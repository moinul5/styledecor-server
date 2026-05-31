const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ai-inventory.u02f5oq.mongodb.net/styledecorDB?retryWrites=true&w=majority&appName=AI-inventory`;
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully to styledecorDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
