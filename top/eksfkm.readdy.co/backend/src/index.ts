// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Middleware & Routes
import {errorHandler} from './middleware/errorHandler.js';
import {userRoutes} from './routes/users.js';
import {contactRoutes} from './routes/contact.js';
import {donationRoutes} from './routes/donations.js';
import {analyticsRoutes} from './routes/analytics.js';
import {healthRoutes} from './routes/health.js';
import {adminRoutes} from './routes/admin.js';
import {uploadRoutes} from './routes/uploads.js';
import {paymentRoutes} from './routes/payments.js';
import {programsRoutes} from './routes/programs.js';
import {eventsRoutes} from './routes/events.js';
import {successStoriesRoutes} from './routes/successStories.js';
import {financialReportsRoutes} from './routes/financialReports.js';
import {volunteerRoutes} from './routes/volunteers.js';
import {newsletterRoutes} from './routes/newsletter.js';
import {verificationRoutes} from './routes/verification.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { error: 'Too many requests, try again later.' },
});

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Educate an Orphan Uganda API',
      version: '1.0.0',
      description: 'Backend API for Educate an Orphan Uganda NGO',
      contact: { name: 'API Support', email: 'support@educateanorphantuganda.org' },
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Development server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// Health check
app.use('/api/health', healthRoutes);

// Main API routes
const apiRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/contact', route: contactRoutes },
  { path: '/donations', route: donationRoutes },
  { path: '/analytics', route: analyticsRoutes },
  { path: '/admin', route: adminRoutes },
  { path: '/admin/upload', route: uploadRoutes },
  { path: '/payments', route: paymentRoutes },
  { path: '/verification', route: verificationRoutes },
  { path: '/programs', route: programsRoutes },
  { path: '/events', route: eventsRoutes },
  { path: '/success-stories', route: successStoriesRoutes },
  { path: '/financial-reports', route: financialReportsRoutes },
  { path: '/volunteers', route: volunteerRoutes },
  { path: '/newsletter', route: newsletterRoutes },
];

// Mount all API routes
apiRoutes.forEach(({ path, route }) => app.use(`/api${path}`, route));

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Educate an Orphan Uganda API is running!',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/api/health',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

export default app;