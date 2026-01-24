# EAKSFM Readdy Backend API

Complete backend API for eksfkm.readdy.co with authentication, database, and payment processing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
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

3. **Set up database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # (Optional) Seed database with sample data
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

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

The API uses JWT tokens for authentication:

1. **Register** - Create new user account
2. **Login** - Get JWT access token
3. **Protected Routes** - Use `Authorization: Bearer <token>` header

## 📡 Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users` - List users (admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user (admin/self)
- `DELETE /api/users/:id` - Delete user (admin)

### Contacts
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List contacts (admin)
- `PUT /api/contact/:id` - Update contact status (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

### Donations
- `POST /api/donations` - Create donation (Stripe)
- `GET /api/donations` - List donations (admin/user)
- `GET /api/donations/:id` - Get donation details
- `POST /api/donations/webhook` - Stripe webhook handler

### Analytics
- `POST /api/analytics/events` - Track custom event
- `GET /api/analytics/events` - List analytics events (admin)

### Health
- `GET /api/health` - Health check

## 🔧 Environment Variables

Required environment variables:

```env
# Server
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eksfkm_readdy"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (for password resets)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@eksfkm.readdy.co

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

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

Integrated with Stripe for secure donation processing with webhook handling for payment confirmation.

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
