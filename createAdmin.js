require('dotenv/config');
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdminAccount = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ai-inventory.u02f5oq.mongodb.net/styledecorDB?retryWrites=true&w=majority`;
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Admin credentials
    const adminEmail = 'admin@styledecor.com';
    const adminName = 'Admin User';
    const adminPhotoURL = 'https://ui-avatars.com/api/?name=Admin+User&background=d4af37&color=0f0f1a';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin already exists:', adminEmail);
      console.log('Email: admin@styledecor.com');
      console.log('Password: You need to register through Firebase with this email');
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      photoURL: adminPhotoURL,
      role: 'admin',
      phone: '+1 (555) 000-0001',
      specialty: 'Platform Administrator',
    });

    await newAdmin.save();
    console.log('✅ Admin account created successfully!');
    console.log('');
    console.log('📧 Email: admin@styledecor.com');
    console.log('🔐 Password: You need to register through Firebase');
    console.log('');
    console.log('Steps to set up:');
    console.log('1. Go to your app and click "Register"');
    console.log('2. Enter these details:');
    console.log('   - Name: Admin User');
    console.log('   - Email: admin@styledecor.com');
    console.log('   - Password: (create any password you want)');
    console.log('3. Complete registration');
    console.log('4. The account is already configured as admin in the database');
    console.log('');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdminAccount();
