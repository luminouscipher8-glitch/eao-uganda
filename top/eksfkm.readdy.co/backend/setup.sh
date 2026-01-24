#!/bin/bash

echo "🚀 Setting up EAKSFM Readdy Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL for database functionality."
    echo "   You can install it with: brew install postgresql (macOS) or apt-get install postgresql (Ubuntu)"
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before running the server"
fi

# Check if DATABASE_URL is configured
if grep -q "postgresql://username:password" .env; then
    echo "⚠️  Please configure your DATABASE_URL in .env file"
    echo "   Example: DATABASE_URL=\"postgresql://myuser:mypassword@localhost:5432/eksfkm_readdy\""
fi

echo ""
echo "🎉 Backend setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file with database URL and other secrets"
echo "2. Create database: createdb eksfkm_readdy"
echo "3. Run migrations: npm run db:migrate"
echo "4. (Optional) Seed database: npm run db:seed"
echo "5. Start development server: npm run dev"
echo ""
echo "📚 API Documentation will be available at: http://localhost:3001/api-docs"
echo "🏥 Health Check: http://localhost:3001/api/health"
