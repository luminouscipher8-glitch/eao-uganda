import fetch from 'node-fetch';

async function testDashboard() {
  try {
    console.log('🧪 Testing dashboard API...');
    
    // Test without auth first
    const response = await fetch('http://localhost:3001/api/admin/dashboard/stats');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', data);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testDashboard();
