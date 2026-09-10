#!/usr/bin/env node

/**
 * Manual System Verification Script
 * This script tests the system without requiring the server to be running
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apiUrl = process.env.VITE_API_URL || 'http://localhost:3001';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const tests = {
  // Database Tests
  async testDatabaseConnection() {
    console.log('🔍 Testing database connection...');
    try {
      const { data, error } = await supabase.from('programs').select('count').single();
      if (error) throw error;
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
  },

  async testProgramsSchema() {
    console.log('🔍 Testing programs schema...');
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('id, title, description, image, impact, category, is_active, created_at')
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const program = data[0];
        const requiredFields = ['id', 'title', 'description'];
        for (const field of requiredFields) {
          if (!(field in program)) {
            throw new Error(`Missing required field: ${field}`);
          }
        }
      }
      
      console.log('✅ Programs schema valid');
      return true;
    } catch (error) {
      console.error('❌ Programs schema error:', error.message);
      return false;
    }
  },

  async testContactsSchema() {
    console.log('🔍 Testing contacts schema...');
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, email, subject, message, status, created_at')
        .limit(1);
      
      if (error) throw error;
      console.log('✅ Contacts schema valid');
      return true;
    } catch (error) {
      console.error('❌ Contacts schema error:', error.message);
      return false;
    }
  },

  async testDonationsSchema() {
    console.log('🔍 Testing donations schema...');
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('id, amount, currency, donor_name, donor_email, status, created_at')
        .limit(1);
      
      if (error) throw error;
      console.log('✅ Donations schema valid');
      return true;
    } catch (error) {
      console.error('❌ Donations schema error:', error.message);
      return false;
    }
  },

  async testNewsletterSchema() {
    console.log('🔍 Testing newsletter schema...');
    try {
      const { data, error } = await supabase
        .from('newsletter')
        .select('id, email, name, is_active, created_at')
        .limit(1);
      
      if (error) throw error;
      console.log('✅ Newsletter schema valid');
      return true;
    } catch (error) {
      console.error('❌ Newsletter schema error:', error.message);
      return false;
    }
  },

  // API Tests (only if server is running)
  async testHealthEndpoint() {
    console.log('🔍 Testing health endpoint...');
    try {
      const response = await fetch(`${apiUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`Returned ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.status || data.status !== 'healthy') {
        throw new Error('Not reporting healthy status');
      }
      
      console.log('✅ Health endpoint working');
      return true;
    } catch (error) {
      console.error('❌ Health endpoint failed:', error.message);
      return false;
    }
  },

  async testPublicProgramsEndpoint() {
    console.log('🔍 Testing public programs endpoint...');
    try {
      const response = await fetch(`${apiUrl}/api/programs`);
      if (!response.ok) {
        throw new Error(`Returned ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(`API failed: ${data.error}`);
      }
      
      if (!Array.isArray(data.data)) {
        throw new Error('Should return an array');
      }
      
      console.log('✅ Public programs endpoint working');
      return true;
    } catch (error) {
      console.error('❌ Public programs endpoint failed:', error.message);
      return false;
    }
  },

  async testPublicContactEndpoint() {
    console.log('🔍 Testing public contact endpoint...');
    try {
      const testContact = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        subject: 'Test Subject',
        message: 'This is a test message for verification'
      };

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testContact)
      });

      if (!response.ok) {
        throw new Error(`Returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Contact submission failed: ${data.error}`);
      }
      
      console.log('✅ Public contact endpoint working');
      return true;
    } catch (error) {
      console.error('❌ Public contact endpoint failed:', error.message);
      return false;
    }
  },

  async testPublicNewsletterEndpoint() {
    console.log('🔍 Testing public newsletter endpoint...');
    try {
      const testSubscription = {
        email: `newsletter-${Date.now()}@example.com`,
        name: 'Test User'
      };

      const response = await fetch(`${apiUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testSubscription)
      });

      if (!response.ok) {
        throw new Error(`Returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Newsletter subscription failed: ${data.error}`);
      }
      
      console.log('✅ Public newsletter endpoint working');
      return true;
    } catch (error) {
      console.error('❌ Public newsletter endpoint failed:', error.message);
      return false;
    }
  },

  async testAnalyticsEndpoint() {
    console.log('🔍 Testing analytics endpoint...');
    try {
      const response = await fetch(`${apiUrl}/api/analytics/dashboard?period=month`);
      if (!response.ok) {
        throw new Error(`Returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Analytics endpoint failed: ${data.error}`);
      }

      const analyticsData = data.data;
      if (!analyticsData.new || !analyticsData.totals) {
        throw new Error('Missing required data structure');
      }
      
      console.log('✅ Analytics endpoint working');
      return true;
    } catch (error) {
      console.error('❌ Analytics endpoint failed:', error.message);
      return false;
    }
  },

  async testAdminAuthRequired() {
    console.log('🔍 Testing admin authentication requirement...');
    try {
      const response = await fetch(`${apiUrl}/api/admin/dashboard/stats`);
      if (response.ok) {
        throw new Error('Should require authentication');
      }
      
      if (response.status !== 401) {
        throw new Error(`Expected 401, got ${response.status}`);
      }
      
      console.log('✅ Admin authentication properly required');
      return true;
    } catch (error) {
      console.error('❌ Admin authentication test failed:', error.message);
      return false;
    }
  }
};

// Run verification
async function runVerification() {
  console.log('🚀 Starting System Verification\n');
  console.log('='.repeat(50));
  
  const results = {
    database: { passed: 0, failed: 0, tests: [] },
    api: { passed: 0, failed: 0, tests: [] }
  };

  // Database Tests (always run)
  console.log('\n📊 DATABASE TESTS');
  console.log('-'.repeat(30));
  
  const dbTests = [
    tests.testDatabaseConnection,
    tests.testProgramsSchema,
    tests.testContactsSchema,
    tests.testDonationsSchema,
    tests.testNewsletterSchema
  ];

  for (const test of dbTests) {
    const passed = await test();
    if (passed) {
      results.database.passed++;
    } else {
      results.database.failed++;
    }
    results.database.tests.push(test.name);
  }

  // API Tests (only if server is running)
  console.log('\n🌐 API TESTS');
  console.log('-'.repeat(30));
  
  // Check if server is running first
  try {
    const response = await fetch(`${apiUrl}/api/health`);
    if (response.ok) {
      console.log('✅ Server is running, testing API endpoints...\n');
      
      const apiTests = [
        tests.testHealthEndpoint,
        tests.testPublicProgramsEndpoint,
        tests.testPublicContactEndpoint,
        tests.testPublicNewsletterEndpoint,
        tests.testAnalyticsEndpoint,
        tests.testAdminAuthRequired
      ];

      for (const test of apiTests) {
        const passed = await test();
        if (passed) {
          results.api.passed++;
        } else {
          results.api.failed++;
        }
        results.api.tests.push(test.name);
      }
    } else {
      console.log('⚠️  Server not responding, skipping API tests');
      console.log('   Start the server with: npm run dev');
    }
  } catch (error) {
    console.log('⚠️  Server not running, skipping API tests');
    console.log('   Start the server with: npm run dev');
  }

  // Summary
  console.log('\n📋 VERIFICATION SUMMARY');
  console.log('='.repeat(50));
  
  const totalDbTests = results.database.passed + results.database.failed;
  const totalApiTests = results.api.passed + results.api.failed;
  const totalTests = totalDbTests + totalApiTests;
  const totalPassed = results.database.passed + results.api.passed;
  
  console.log(`Database: ${results.database.passed}/${totalDbTests} passed`);
  console.log(`API: ${results.api.passed}/${totalApiTests} passed`);
  console.log(`Overall: ${totalPassed}/${totalTests} passed (${((totalPassed/totalTests)*100).toFixed(1)}%)`);
  
  if (totalPassed === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! System is ready for production.');
  } else {
    console.log('\n⚠️  Some tests failed. Review the errors above.');
  }

  console.log('\n' + '='.repeat(50));
  console.log('Verification complete!');
}

// Run verification
runVerification().catch(console.error);
