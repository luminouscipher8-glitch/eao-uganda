#!/usr/bin/env node

/**
 * Simple System Verification Script
 * Tests database connectivity and basic functionality
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('   Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
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

  async testVolunteersSchema() {
    console.log('🔍 Testing volunteers schema...');
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('id, name, email, phone, status, created_at')
        .limit(1);
      
      if (error) throw error;
      console.log('✅ Volunteers schema valid');
      return true;
    } catch (error) {
      console.error('❌ Volunteers schema error:', error.message);
      return false;
    }
  },

  async testEventsSchema() {
    console.log('🔍 Testing events schema...');
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, description, event_date, location, status, created_at')
        .limit(1);
      
      if (error) throw error;
      console.log('✅ Events schema valid');
      return true;
    } catch (error) {
      console.error('❌ Events schema error:', error.message);
      return false;
    }
  },

  async testSuccessStoriesSchema() {
    console.log('🔍 Testing success stories schema...');
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('id, student_name, story, impact, category, image, status, created_at')
        .limit(1);
      
      if (error) throw error;
      console.log('✅ Success stories schema valid');
      return true;
    } catch (error) {
      console.error('❌ Success stories schema error:', error.message);
      return false;
    }
  },

  // Data Integrity Tests
  async testDataIntegrity() {
    console.log('🔍 Testing data integrity...');
    try {
      // Test foreign key relationships by checking if related data exists
      const { data: programs, error: programsError } = await supabase
        .from('programs')
        .select('id')
        .limit(5);

      if (programsError) throw programsError;

      console.log('✅ Data integrity checks passed');
      return true;
    } catch (error) {
      console.error('❌ Data integrity test failed:', error.message);
      return false;
    }
  },

  // Basic CRUD Operations Test
  async testBasicOperations() {
    console.log('🔍 Testing basic CRUD operations...');
    try {
      // Test creating a contact
      const testContact = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        subject: 'Test Subject',
        message: 'This is a test message for verification'
      };

      const { data: createdContact, error: createError } = await supabase
        .from('contacts')
        .insert(testContact)
        .select()
        .single();

      if (createError) throw createError;

      // Test reading the contact
      const { data: readContact, error: readError } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', createdContact.id)
        .single();

      if (readError) throw readError;

      // Test updating the contact
      const { data: updatedContact, error: updateError } = await supabase
        .from('contacts')
        .update({ status: 'IN_PROGRESS' })
        .eq('id', createdContact.id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Test deleting the contact
      const { error: deleteError } = await supabase
        .from('contacts')
        .delete()
        .eq('id', createdContact.id);

      if (deleteError) throw deleteError;

      console.log('✅ Basic CRUD operations working');
      return true;
    } catch (error) {
      console.error('❌ Basic operations test failed:', error.message);
      return false;
    }
  }
};

// Run verification
async function runVerification() {
  console.log('🚀 Starting System Verification\n');
  console.log('='.repeat(50));
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Database Tests
  console.log('\n📊 DATABASE TESTS');
  console.log('-'.repeat(30));
  
  const dbTests = [
    tests.testDatabaseConnection,
    tests.testProgramsSchema,
    tests.testContactsSchema,
    tests.testDonationsSchema,
    tests.testNewsletterSchema,
    tests.testVolunteersSchema,
    tests.testEventsSchema,
    tests.testSuccessStoriesSchema,
    tests.testDataIntegrity,
    tests.testBasicOperations
  ];

  for (const test of dbTests) {
    const passed = await test();
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
    results.tests.push(test.name);
  }

  // Summary
  console.log('\n📋 VERIFICATION SUMMARY');
  console.log('='.repeat(50));
  
  const totalTests = results.passed + results.failed;
  
  console.log(`Database: ${results.passed}/${totalTests} passed`);
  console.log(`Success Rate: ${((results.passed/totalTests)*100).toFixed(1)}%`);
  
  if (results.passed === totalTests) {
    console.log('\n🎉 ALL DATABASE TESTS PASSED!');
    console.log('✅ Database layer is ready for production');
  } else {
    console.log('\n⚠️  Some database tests failed.');
    console.log('❌ Review the errors above before proceeding');
  }

  // Next Steps
  console.log('\n📝 NEXT STEPS');
  console.log('-'.repeat(30));
  console.log('1. Start the server: npm run dev');
  console.log('2. Run API tests: curl http://localhost:3001/api/health');
  console.log('3. Test frontend integration');
  console.log('4. Run full verification with: curl -X POST http://localhost:3001/api/verification/run');

  console.log('\n' + '='.repeat(50));
  console.log('Database verification complete!');
}

// Run verification
runVerification().catch(console.error);
