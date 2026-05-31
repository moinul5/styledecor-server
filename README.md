# StyleDecor — Server

The robust backend API for the StyleDecor booking platform, built with Node.js, Express 5, and MongoDB.

## Features
- **Authentication**: JWT token generation and validation via HttpOnly cookies.
- **Role-Based Access Control**: Middleware to secure routes for `admin` and `decorator` roles.
- **Stripe Integration**: Generates PaymentIntents securely on the server-side to process bookings.
- **Comprehensive APIs**: 
  - User & Role Management
  - Service CRUD operations
  - Booking & Order Fulfillment workflows
  - Platform Analytics aggregation

## Tech Stack
- **Environment**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB (via Mongoose)
- **Security**: jsonwebtoken, cors, cookie-parser
- **Payments**: Stripe Node SDK

## Environment Variables
Create a `.env` file in the root of the server directory:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
JWT_SECRET=your_super_secret_jwt_key
STRIPE_SECRET=sk_test_your_stripe_secret_key
```

*Note: The MongoDB connection string expects to connect to `ai-inventory.u02f5oq.mongodb.net` with the DB name `styledecorDB`.*

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

## Deployment
This Node.js server can be deployed to platforms like Render, Railway, or Heroku. Ensure you configure your environment variables in the host dashboard.
