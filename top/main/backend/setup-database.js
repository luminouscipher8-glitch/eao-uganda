import { config } from 'dotenv';

// Load environment variables
config();

console.log('🔍 DATABASE SETUP HELPER');
console.log('');
console.log('Current DATABASE_URL format:');
console.log(process.env.DATABASE_URL);
console.log('');
console.log('📋 WHAT YOU NEED TO DO:');
console.log('');
console.log('1. Go to: https://supabase.com/dashboard');
console.log('2. Select your project: rogxpucnkqwbeohpkolj');
console.log('3. Go to Settings > Database');
console.log('4. Scroll down to "Connection string"');
console.log('5. Copy the connection string');
console.log('6. Replace [YOUR-PASSWORD] in the .env file');
console.log('');
console.log('📝 EXAMPLE CONNECTION STRING:');
console.log('postgresql://postgres.rogxpucnkqwbeohpkolj:ACTUAL_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres');
console.log('');
console.log('🔧 AFTER UPDATING .env:');
console.log('1. Run: node test-db-connection.js');
console.log('2. If successful, run: npx prisma db push');
console.log('');
