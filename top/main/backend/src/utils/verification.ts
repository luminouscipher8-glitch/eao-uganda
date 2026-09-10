import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apiUrl = process.env.VITE_API_URL || 'http://localhost:3001';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface VerificationResult {
  testName: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  details: string;
  error?: string;
  duration: number;
}

export interface VerificationSuite {
  category: string;
  tests: VerificationResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
  };
}

class VerificationSystem {
  private results: VerificationResult[] = [];

  async runTest(testName: string, testFn: () => Promise<void>): Promise<VerificationResult> {
    const startTime = Date.now();
    
    try {
      await testFn();
      const duration = Date.now() - startTime;
      const result: VerificationResult = {
        testName,
        status: 'PASS',
        details: 'Test completed successfully',
        duration
      };
      this.results.push(result);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const result: VerificationResult = {
        testName,
        status: 'FAIL',
        details: 'Test failed',
        error: error instanceof Error ? error.message : String(error),
        duration
      };
      this.results.push(result);
      return result;
    }
  }

  skipTest(testName: string, reason: string): VerificationResult {
    const result: VerificationResult = {
      testName,
      status: 'SKIP',
      details: reason,
      duration: 0
    };
    this.results.push(result);
    return result;
  }

  clearResults(): void {
    this.results = [];
  }

  getResults(): VerificationResult[] {
    return [...this.results];
  }

  // Database connection tests
  async testDatabaseConnection(): Promise<VerificationResult> {
    return this.runTest('Database Connection', async () => {
      const { data, error } = await supabase.from('programs').select('count').single();
      if (error) throw new Error(`Database connection failed: ${error.message}`);
    });
  }

  // Schema validation tests
  async testProgramsSchema(): Promise<VerificationResult> {
    return this.runTest('Programs Schema Validation', async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('id, title, description, image, impact, category, is_active, created_at')
        .limit(1);
      
      if (error) throw new Error(`Programs schema error: ${error.message}`);
      
      // Validate structure if data exists
      if (data && data.length > 0) {
  const program = data[0]!;

  const requiredFields = ['id', 'title', 'description'];

  for (const field of requiredFields) {
    if (!(field in program)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}
    });
  }

  async testContactsSchema(): Promise<VerificationResult> {
    return this.runTest('Contacts Schema Validation', async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, email, subject, message, status, created_at')
        .limit(1);
      
      if (error) throw new Error(`Contacts schema error: ${error.message}`);
    });
  }

  async testDonationsSchema(): Promise<VerificationResult> {
    return this.runTest('Donations Schema Validation', async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('id, amount, currency, donor_name, donor_email, status, created_at')
        .limit(1);
      
      if (error) throw new Error(`Donations schema error: ${error.message}`);
    });
  }

  // API endpoint tests
  async testHealthEndpoint(): Promise<VerificationResult> {
    return this.runTest('Health Endpoint', async () => {
      const response = await fetch(`${apiUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`Health endpoint returned ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.status || data.status !== 'healthy') {
        throw new Error('Health endpoint not reporting healthy status');
      }
    });
  }

  async testPublicProgramsEndpoint(): Promise<VerificationResult> {
    return this.runTest('Public Programs Endpoint', async () => {
      const response = await fetch(`${apiUrl}/api/programs`);
      if (!response.ok) {
        throw new Error(`Programs endpoint returned ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(`Programs endpoint failed: ${data.error}`);
      }
      
      if (!Array.isArray(data.data)) {
        throw new Error('Programs endpoint should return an array');
      }
    });
  }

  async testPublicContactEndpoint(): Promise<VerificationResult> {
    return this.runTest('Public Contact Endpoint', async () => {
      const testContact = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message for verification'
      };

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testContact)
      });

      if (!response.ok) {
        throw new Error(`Contact endpoint returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Contact submission failed: ${data.error}`);
      }
    });
  }

  async testPublicNewsletterEndpoint(): Promise<VerificationResult> {
    return this.runTest('Public Newsletter Endpoint', async () => {
      const testSubscription = {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User'
      };

      const response = await fetch(`${apiUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testSubscription)
      });

      if (!response.ok) {
        throw new Error(`Newsletter endpoint returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Newsletter subscription failed: ${data.error}`);
      }
    });
  }

  async testPublicVolunteerEndpoint(): Promise<VerificationResult> {
    return this.runTest('Public Volunteer Endpoint', async () => {
      const testVolunteer = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        phone: '+256123456789',
        age: '25',
        occupation: 'Teacher',
        skills: ['Teaching', 'Mentoring'],
        availability: 'Weekends',
        motivation: 'I want to help educate children'
      };

      const response = await fetch(`${apiUrl}/api/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testVolunteer)
      });

      if (!response.ok) {
        throw new Error(`Volunteer endpoint returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Volunteer application failed: ${data.error}`);
      }
    });
  }

  async testAnalyticsEndpoint(): Promise<VerificationResult> {
    return this.runTest('Analytics Endpoint', async () => {
      const response = await fetch(`${apiUrl}/api/analytics/dashboard?period=month`);
      if (!response.ok) {
        throw new Error(`Analytics endpoint returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Analytics endpoint failed: ${data.error}`);
      }

      // Verify expected structure
      const analyticsData = data.data;
      if (!analyticsData.new || !analyticsData.totals) {
        throw new Error('Analytics endpoint missing required data structure');
      }
    });
  }

  // Admin endpoint tests (will fail without auth, which is expected)
  async testAdminAuthRequired(): Promise<VerificationResult> {
    return this.runTest('Admin Authentication Required', async () => {
      const response = await fetch(`${apiUrl}/api/admin/dashboard/stats`);
      if (response.ok) {
        throw new Error('Admin endpoint should require authentication');
      }
      
      if (response.status !== 401) {
        throw new Error(`Expected 401, got ${response.status}`);
      }
    });
  }

  // Payment flow tests
  async testDonationCreation(): Promise<VerificationResult> {
    return this.runTest('Donation Creation', async () => {
      const testDonation = {
        amount: '10000',
        currency: 'UGX',
        donorName: 'Test Donor',
        donorEmail: `donor-${Date.now()}@example.com`,
        donorPhone: '+256123456789',
        paymentMethod: 'mobile_money',
        isRecurring: false,
        campaign: 'general'
      };

      const response = await fetch(`${apiUrl}/api/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testDonation)
      });

      if (!response.ok) {
        throw new Error(`Donation creation returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`Donation creation failed: ${data.error}`);
      }

      // Should return redirect URL for Pesapal
      if (!data.data?.redirect_url) {
        throw new Error('Donation creation should return redirect URL');
      }
    });
  }

  async testDonationStatusCheck(): Promise<VerificationResult> {
    return this.runTest('Donation Status Check', async () => {
      const response = await fetch(`${apiUrl}/api/donations/status?tracking_id=test-tracking-id`);
      
      // Should handle invalid tracking ID gracefully
      if (!response.ok) {
        throw new Error(`Donation status check returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        // Expected for invalid tracking ID
        if (data.error?.includes('not found') || data.error?.includes('Invalid')) {
          return; // This is expected behavior
        }
        throw new Error(`Donation status check failed: ${data.error}`);
      }
    });
  }

  // File upload tests
  async testUploadEndpointAuth(): Promise<VerificationResult> {
    return this.runTest('Upload Endpoint Authentication', async () => {
      const response = await fetch(`${apiUrl}/api/admin/upload`);
      if (response.ok) {
        throw new Error('Upload endpoint should require authentication');
      }
      
      if (response.status !== 401) {
        throw new Error(`Expected 401, got ${response.status}`);
      }
    });
  }

  // Run all verification tests
  async runFullVerification(): Promise<VerificationSuite[]> {
    this.clearResults();
    
    const suites: VerificationSuite[] = [];

    // Database Tests
    console.log('Running Database Tests...');
    const dbResults = [
      await this.testDatabaseConnection(),
      await this.testProgramsSchema(),
      await this.testContactsSchema(),
      await this.testDonationsSchema()
    ];
    
    suites.push({
      category: 'Database',
      tests: dbResults,
      summary: this.calculateSummary(dbResults)
    });

    // Public API Tests
    console.log('Running Public API Tests...');
    const publicResults = [
      await this.testHealthEndpoint(),
      await this.testPublicProgramsEndpoint(),
      await this.testPublicContactEndpoint(),
      await this.testPublicNewsletterEndpoint(),
      await this.testPublicVolunteerEndpoint(),
      await this.testAnalyticsEndpoint()
    ];
    
    suites.push({
      category: 'Public API',
      tests: publicResults,
      summary: this.calculateSummary(publicResults)
    });

    // Authentication Tests
    console.log('Running Authentication Tests...');
    const authResults = [
      await this.testAdminAuthRequired(),
      await this.testUploadEndpointAuth()
    ];
    
    suites.push({
      category: 'Authentication',
      tests: authResults,
      summary: this.calculateSummary(authResults)
    });

    // Payment Flow Tests
    console.log('Running Payment Flow Tests...');
    const paymentResults = [
      await this.testDonationCreation(),
      await this.testDonationStatusCheck()
    ];
    
    suites.push({
      category: 'Payment Flow',
      tests: paymentResults,
      summary: this.calculateSummary(paymentResults)
    });

    return suites;
  }

  private calculateSummary(results: VerificationResult[]) {
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === 'PASS').length,
      failed: results.filter(r => r.status === 'FAIL').length,
      skipped: results.filter(r => r.status === 'SKIP').length,
      duration: results.reduce((sum, r) => sum + r.duration, 0)
    };
    return summary;
  }

  // Generate verification report
  generateReport(suites: VerificationSuite[]): string {
    let report = '# System Verification Report\n\n';
    
    const totalTests = suites.reduce((sum, suite) => sum + suite.summary.total, 0);
    const totalPassed = suites.reduce((sum, suite) => sum + suite.summary.passed, 0);
    const totalFailed = suites.reduce((sum, suite) => sum + suite.summary.failed, 0);
    const totalSkipped = suites.reduce((sum, suite) => sum + suite.summary.skipped, 0);
    const totalDuration = suites.reduce((sum, suite) => sum + suite.summary.duration, 0);

    report += '## Overall Summary\n\n';
    report += `- **Total Tests**: ${totalTests}\n`;
    report += `- **Passed**: ${totalPassed} (${((totalPassed/totalTests)*100).toFixed(1)}%)\n`;
    report += `- **Failed**: ${totalFailed} (${((totalFailed/totalTests)*100).toFixed(1)}%)\n`;
    report += `- **Skipped**: ${totalSkipped} (${((totalSkipped/totalTests)*100).toFixed(1)}%)\n`;
    report += `- **Total Duration**: ${totalDuration}ms\n\n`;

    for (const suite of suites) {
      report += `## ${suite.category}\n\n`;
      report += `**Summary**: ${suite.summary.passed}/${suite.summary.total} passed (${((suite.summary.passed/suite.summary.total)*100).toFixed(1)}%)\n\n`;
      
      for (const test of suite.tests) {
        const statusIcon = test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⏭️';
        report += `${statusIcon} **${test.testName}** (${test.duration}ms)\n`;
        
        if (test.status === 'PASS') {
          report += `   - ${test.details}\n`;
        } else if (test.status === 'FAIL') {
          report += `   - **Error**: ${test.error}\n`;
        } else {
          report += `   - **Skipped**: ${test.details}\n`;
        }
      }
      report += '\n';
    }

    return report;
  }
}

export const verificationSystem = new VerificationSystem();
