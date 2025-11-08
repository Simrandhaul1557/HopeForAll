import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import path from 'path';
import { fileURLToPath } from 'url';
import blogRoutes from './routes/blogRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Trust proxy for production
if (isProduction) {
  app.set('trust proxy', 1);
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ngo_website';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// MongoDB Connection Events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️  MongoDB Disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Sanitize data against NoSQL injection
app.use(hpp()); // Protect against HTTP Parameter Pollution attacks

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// CORS Configuration
const getCorsOptions = () => {
  // Get allowed origins from environment variable or use development defaults
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : [
        'http://localhost:3000',
        'http://localhost:5000',
        'http://localhost:8080',
        'http://localhost:4173',
        'http://localhost:5173'
      ];

  // Add Vercel preview URLs if not already present
  if (process.env.VERCEL_URL) {
    const vercelUrl = `https://${process.env.VERCEL_URL}`;
    if (!allowedOrigins.includes(vercelUrl)) {
      allowedOrigins.push(vercelUrl);
    }
  }

  // Production configuration
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed
        if (allowedOrigins.includes(origin) || 
            allowedOrigins.some(allowed => origin.endsWith(allowed.replace('https://', '')))) {
          return callback(null, true);
        }
        
        console.log('Blocked by CORS:', origin);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Range', 'X-Content-Range']
    };
  }

  // Development configuration
  return {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
};

app.use(cors(getCorsOptions()));

// Handle preflight requests
app.options('*', cors(getCorsOptions()));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes with error handling
const mountRoute = (path: string, router: any, name: string) => {
  console.log(` Mounting ${name} routes at /api${path}`);
  app.use(`/api${path}`, router);
  // Log all routes for debugging
  router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
      const methods = Object.keys(r.route.methods).map(m => m.toUpperCase()).join(',');
      console.log(`   - ${methods.padEnd(7)} http://localhost:${PORT}/api${path}${r.route.path}`);
    }
  });
};

// Mount all routes
mountRoute('/blogs', blogRoutes, 'Blog');
mountRoute('/events', eventRoutes, 'Event');
mountRoute('/volunteers', volunteerRoutes, 'Volunteer');
mountRoute('/payments', paymentRoutes, 'Payment');

console.log('✅ All routes mounted');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Catch-all for any remaining /register routes (legacy support)
app.all('*/register', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Registration endpoints are no longer available. Please use the new API endpoints.'
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('NGO Website API is running. Use /api for available endpoints.');
});

// API root endpoint
app.get('/api', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api`;
  
  const endpoints = {
    message: 'Welcome to NGO Website API',
    version: '1.0',
    endpoints: {
      events: {
        getAll: { method: 'GET', url: `${baseUrl}/events` },
        getOne: { method: 'GET', url: `${baseUrl}/events/:id` }
      },
      blogs: {
        getAll: { method: 'GET', url: `${baseUrl}/blogs` },
        getOne: { method: 'GET', url: `${baseUrl}/blogs/:slug` },
        create: { method: 'POST', url: `${baseUrl}/blogs` }
      },
      volunteers: {
        getAll: { method: 'GET', url: `${baseUrl}/volunteers` },
        getOne: { method: 'GET', url: `${baseUrl}/volunteers/:id` },
        getEvents: { method: 'GET', url: `${baseUrl}/volunteers/:id/events` }
      }
    }
  };
  
  res.json(endpoints);
});

// Start server
const port = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🌐 Available endpoints:`);
  console.log(`   - GET    http://localhost:${PORT}/api`);
  console.log(`   - GET    http://localhost:${PORT}/api/events`);
  console.log(`   - POST   http://localhost:${PORT}/api/events`);
  console.log(`   - GET    http://localhost:${PORT}/api/blogs`);
  console.log(`   - POST   http://localhost:${PORT}/api/volunteers/apply`);
  console.log(`   - GET    http://localhost:${PORT}/api/volunteers`);
  console.log(`   - POST   http://localhost:${PORT}/api/volunteers/:volunteerId/events/:eventId/register`);
  console.log(`   - GET    http://localhost:${PORT}/api/volunteers/:id/events`);
  console.log(`\n🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
