require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Service = require('../models/Service');
const connectDB = require('../config/db');

const seedServices = async () => {
  await connectDB();

  console.log('Clearing existing services...');
  await Service.deleteMany({});

  const services = [
    {
      service_name: 'Elegant Wedding Reception Decor',
      cost: 1500,
      unit: 'per event',
      category: 'Wedding',
      description: 'A luxurious and elegant decor setup for wedding receptions, featuring premium floral arrangements, atmospheric lighting, and high-quality centerpieces to make your special day unforgettable.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.9,
      popularity: 120
    },
    {
      service_name: 'Corporate Gala Setup',
      cost: 2500,
      unit: 'per event',
      category: 'Corporate',
      description: 'Professional and sophisticated decor tailored for corporate galas and award ceremonies. Includes branded backdrops, sleek seating arrangements, and advanced audiovisual integration.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.7,
      popularity: 85
    },
    {
      service_name: 'Magical Birthday Party Themes',
      cost: 400,
      unit: 'per event',
      category: 'Birthday',
      description: 'Customizable magical themes for birthday parties of all ages. Includes balloon arches, themed backdrops, custom cake tables, and interactive photo booths.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8892795f64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.5,
      popularity: 150
    },
    {
      service_name: 'Premium Stage Decoration',
      cost: 1200,
      unit: 'per event',
      category: 'Wedding',
      description: 'Stunning premium stage setups for weddings and engagements. We provide customized floral backgrounds, elegant sofa seating, and crystal chandeliers to create a majestic focal point.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.8,
      popularity: 110
    },
    {
      service_name: 'Conference Hall Arrangements',
      cost: 800,
      unit: 'per event',
      category: 'Corporate',
      description: 'Clean, modern, and professional decoration for business conferences. We handle stage setup, podium decor, and attendee seating with a focus on a distraction-free environment.',
      image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.4,
      popularity: 60
    },
    {
      service_name: 'Anniversary Special Decor',
      cost: 500,
      unit: 'per event',
      category: 'Anniversary',
      description: 'Celebrate your milestones with our beautiful anniversary decor packages. Features romantic lighting, personalized banners, and intimate seating arrangements for family and friends.',
      image: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.9,
      popularity: 95
    },
    {
      service_name: 'Romantic Dinner Setup',
      cost: 250,
      unit: 'per event',
      category: 'Romantic',
      description: 'Surprise your partner with a breathtaking romantic dinner setup. Includes rose petal pathways, candlelit dinner tables, and subtle background music arrangements.',
      image: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.6,
      popularity: 200
    },
    {
      service_name: 'Engagement Ceremony Decor',
      cost: 900,
      unit: 'per event',
      category: 'Engagement',
      description: 'Beautiful and delicate decor designed for ring ceremonies. Incorporates pastel color palettes, fairy lights, and beautiful ring presentation platforms.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.7,
      popularity: 130
    },
    {
      service_name: 'Kid\'s Birthday Carnival',
      cost: 650,
      unit: 'per event',
      category: 'Birthday',
      description: 'Bring the carnival to your backyard with this vibrant kid-friendly setup. Features colorful tents, game stalls, and lively balloon sculptures.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.8,
      popularity: 140
    },
    {
      service_name: 'Luxury Bridal Shower',
      cost: 450,
      unit: 'per event',
      category: 'Bridal',
      description: 'Chic and luxurious decor for the perfect bridal shower. We provide elegant seating, customized photo backdrops, and beautiful dessert table styling.',
      image: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.9,
      popularity: 105
    },
    {
      service_name: 'Corporate Seminar Styling',
      cost: 700,
      unit: 'per event',
      category: 'Corporate',
      description: 'Streamlined and effective styling for corporate seminars. Emphasizes clear sightlines, comfortable audience seating, and professional stage elements.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.3,
      popularity: 50
    },
    {
      service_name: 'Traditional Mehendi Decor',
      cost: 600,
      unit: 'per event',
      category: 'Wedding',
      description: 'Vibrant and traditional decor for Mehendi ceremonies. Includes marigold garlands, colorful drapes, low seating arrangements, and traditional props.',
      image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      createdByEmail: 'admin@styledecor.com',
      rating: 4.7,
      popularity: 115
    }
  ];

  try {
    await Service.insertMany(services);
    console.log('Successfully seeded 12 services!');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedServices();
