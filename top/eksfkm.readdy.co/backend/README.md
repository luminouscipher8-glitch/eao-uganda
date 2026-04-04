# EAKSFM Readdy Backend API

Backend API for eksfkm.readdy.co with authentication, database, and payment processing.

**⚠️ Current Status: Development Phase**
- Database connectivity issues need resolution
- Some features require additional setup
- Not production ready without configuration fixes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase project with PostgreSQL database
- Pesapal payment integration (for donations)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to Supabase
   npm run db:push
   
   # (Optional) Seed database with sample data
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## ⚠️ Known Issues

### Database Connectivity
- Supabase connection may fail due to network/configuration issues
- Verify environment variables are loaded correctly
- Check Supabase project status and network access

### Missing Dependencies
- File upload requires multer configuration (dependency installed but middleware needs integration)
- Email service requires SMTP configuration

### TypeScript Compilation
- Some import path issues exist
- Missing type declarations in some components

## 📚 API Documentation

Visit `http://localhost:3001/api-docs` for interactive Swagger documentation.

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User authentication and profiles
- **Contacts** - Contact form submissions
- **Donations** - Payment processing records
- **Analytics Events** - Custom analytics tracking
- **Sessions** - User session management

## 🔐 Authentication

The API uses Supabase JWT authentication:

1. **Supabase Auth** - Users authenticate through Supabase
2. **JWT Verification** - Backend verifies Supabase JWT tokens
3. **Admin Authorization** - Database-backed role verification for admin access
4. **Protected Routes** - Use `Authorization: Bearer <supabase-jwt>` header

**Note:** Traditional email/password registration not implemented. Uses Supabase Auth.

## 📡 Available Endpoints

### Public API
- `POST /api/contact` - Submit contact form
- `POST /api/donations` - Create donation (Pesapal)
- `GET /api/donations/status` - Check donation status
- `POST /api/volunteers` - Submit volunteer application
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/programs` - List programs
- `GET /api/events` - List events
- `GET /api/success-stories` - List success stories
- `GET /api/financial-reports` - List financial reports
- `GET /api/analytics/dashboard` - Get analytics dashboard
- `POST /api/analytics/events` - Track analytics event
- `GET /api/health` - Health check

### Admin API (Requires Authentication + Admin Role)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/programs` - List programs
- `POST /api/admin/programs` - Create program
- `PUT /api/admin/programs/:id` - Update program
- `DELETE /api/admin/programs/:id` - Delete program
- `GET /api/admin/news` - List news articles
- `POST /api/admin/news` - Create news article
- `PUT /api/admin/news/:id` - Update news article
- `DELETE /api/admin/news/:id` - Delete news article
- `GET /api/admin/events` - List events
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events/:id` - Update event
- `DELETE /api/admin/events/:id` - Delete event
- `GET /api/admin/contacts` - List contacts
- `PATCH /api/admin/contacts/:id/status` - Update contact status
- `DELETE /api/admin/contacts/:id` - Delete contact
- `GET /api/admin/donations` - List donations
- `PATCH /api/admin/donations/:id/status` - Update donation status
- `GET /api/admin/volunteers` - List volunteers
- `PATCH /api/admin/volunteers/:id/status` - Update volunteer status
- `GET /api/admin/success-stories` - List success stories
- `POST /api/admin/success-stories` - Create success story
- `PUT /api/admin/success-stories/:id` - Update success story
- `DELETE /api/admin/success-stories/:id` - Delete success story
- `POST /api/admin/upload` - Upload file (requires multer setup)

### Verification API
- `GET /api/verification/health` - Verification system health check
- `POST /api/verification/run` - Run full verification suite
- `POST /api/verification/test/:category` - Run specific test category

## 🔧 Environment Variables

Required environment variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
APP_BASE_URL=http://localhost:3001

# Database - Supabase
DATABASE_URL="postgresql://postgres.merrqcqxvqvwfuohlxbs:P32uIiUDQxT9M2yF@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=disable"

# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_JWT_SECRET="your-jwt-secret"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Configuration (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@eksfkm.readdy.co

# Pesapal Payment Integration
PESAPAL_CONSUMER_KEY=your-pesapal-consumer-key
PESAPAL_CONSUMER_SECRET=your-pesapal-consumer-secret
PESAPAL_LIVE_MODE=false

# File Upload (Optional)
SUPABASE_STORAGE_BUCKET=eao-uploads
```

**Critical Variables:**
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` - Database connection
- `PESAPAL_CONSUMER_KEY`, `PESAPAL_CONSUMER_SECRET` - Payment processing

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 🔒 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection with Helmet

## 📊 Analytics Integration

The backend provides endpoints for tracking custom analytics events that complement the frontend Google Analytics implementation.

## 💳 Payment Processing

Integrated with **Pesapal** for secure donation processing:
- OAuth token management for API access
- Payment creation with mobile money and card options
- Status tracking with polling and webhook support
- IPN webhook for asynchronous payment updates

**Status:** Implementation complete but requires Pesapal sandbox/live credentials

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
```

## 📝 License

MIT License

## 🚦 Production Readiness Checklist

### ✅ Completed
- [x] Database schema and models
- [x] Authentication and authorization system
- [x] API endpoints for all features
- [x] Input validation and error handling
- [x] Payment integration (Pesapal)
- [x] File upload architecture
- [x] Analytics tracking
- [x] Verification system

### ⚠️ Requires Attention (Blocking)
- [ ] **Database Connectivity** - Resolve Supabase connection issues
- [ ] **Environment Variables** - Configure all required variables
- [ ] **TypeScript Compilation** - Fix import path and type issues

### ⚠️ Requires Attention (Non-blocking)
- [ ] **Multer Integration** - Complete file upload middleware setup
- [ ] **Email Service** - Configure SMTP for notifications
- [ ] **Testing Suite** - Add comprehensive automated tests
- [ ] **Performance Optimization** - Add caching and query optimization

### 🚀 Pre-deployment Steps
1. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

2. **Verification**
   ```bash
   node verify-system-simple.js
   npm run dev
   curl http://localhost:3001/api/health
   curl -X POST http://localhost:3001/api/verification/run
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   npm run start
   ```

### 📋 Operational Requirements
- **Node.js 18+**
- **Supabase Project** (PostgreSQL database)
- **Pesapal Account** (payment processing)
- **SMTP Server** (optional, for email notifications)
- **File Storage** (Supabase Storage for uploads)

### 🔒 Security Considerations
- All admin routes require authentication + admin role
- Input validation on all public endpoints
- Rate limiting implemented
- CORS protection configured
- SQL injection prevention via Prisma ORM

### 📊 Current Status
- **Code Quality**: Production ready
- **Database Connectivity**: **BLOCKING ISSUE**
- **Payment Integration**: Ready (needs credentials)
- **File Upload**: Architecture ready (needs multer setup)
- **Overall Status**: **Not production ready due to database connectivity**

**Next Priority**: Resolve database connectivity issues, then system will be production ready.
