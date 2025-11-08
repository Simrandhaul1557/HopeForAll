// Load environment variables
require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ngo_website';
export const PORT = process.env.PORT || 5000;

// Token expiration times
export const TOKEN_EXPIRATION = {
  ACCESS: '7d',    // 7 days
  REFRESH: '30d'   // 30 days
};

// User roles
export const ROLES = {
  ADMIN: 'admin',
  VOLUNTEER: 'volunteer',
  GUEST: 'guest'
};

// API routes
export const API_PREFIX = '/api';

export default {
  JWT_SECRET,
  MONGODB_URI,
  PORT,
  TOKEN_EXPIRATION,
  ROLES,
  API_PREFIX
};
