import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler';
import { userRoutes } from './routes/users';
import { contactRoutes } from './routes/contact';
import { donationRoutes } from './routes/donations';
import { analyticsRoutes } from './routes/analytics';
import { healthRoutes } from './routes/health';
import { adminRoutes } from './routes/admin';
import { uploadRoutes } from './routes/uploads';
import { paymentRoutes } from './routes/payments';
import { programsRoutes } from './routes/programs';
import { eventsRoutes } from './routes/events';
import { successStoriesRoutes } from './routes/successStories';
import { financialReportsRoutes } from './routes/financialReports';
import { volunteerRoutes } from './routes/volunteers';
import { newsletterRoutes } from './routes/newsletter';
import { verificationRoutes } from './routes/verification';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://your-app.netlify.app';
// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
});
// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
// CORS configuration - allow localhost for development
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:3000'
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Educate an Orphan Uganda API',
            version: '1.0.0',
            description: 'Backend API for Educate an Orphan Uganda NGO',
            contact: {
                name: 'API Support',
                email: 'support@educateanorphantuganda.org',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Health check
app.use('/api/health', healthRoutes);
// API routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/verification', verificationRoutes);
// Public API routes
app.use('/api/programs', programsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/success-stories', successStoriesRoutes);
app.use('/api/financial-reports', financialReportsRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/newsletter', newsletterRoutes);
// Root endpoint
app.get('/', (req, res) => {
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
// Error handling middleware
app.use(errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
export default app;
//# sourceMappingURL=index.js.map