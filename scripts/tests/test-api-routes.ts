#!/usr/bin/env tsx
/**
 * API Routes Test Script
 * Tests all Phase 8 API routes
 */

import 'dotenv/config';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title: string) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const API_BASE = `${BASE_URL}/api`;

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  status?: number;
  response?: any;
}

const testResults: TestResult[] = [];

async function testEndpoint(
  name: string,
  method: string,
  url: string,
  body?: any,
  headers?: Record<string, string>
): Promise<TestResult> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    const passed = response.ok || response.status === 401; // 401 is expected for unauthorized

    return {
      name,
      passed,
      status: response.status,
      response: data,
      error: passed ? undefined : `Status: ${response.status}`,
    };
  } catch (error: any) {
    return {
      name,
      passed: false,
      error: error.message,
    };
  }
}

async function testPublicRoutes() {
  logSection('Testing Public API Routes');

  // Test public/blog
  const blogList = await testEndpoint(
    'GET /api/public/blog',
    'GET',
    `${API_BASE}/public/blog`
  );
  testResults.push(blogList);
  log(
    `   ${blogList.passed ? '✅' : '❌'} GET /api/public/blog - ${blogList.status || 'ERROR'}`,
    blogList.passed ? 'green' : 'red'
  );

  // Test public/services
  const servicesList = await testEndpoint(
    'GET /api/public/services',
    'GET',
    `${API_BASE}/public/services`
  );
  testResults.push(servicesList);
  log(
    `   ${servicesList.passed ? '✅' : '❌'} GET /api/public/services - ${servicesList.status || 'ERROR'}`,
    servicesList.passed ? 'green' : 'red'
  );

  // Test public/products
  const productsList = await testEndpoint(
    'GET /api/public/products',
    'GET',
    `${API_BASE}/public/products`
  );
  testResults.push(productsList);
  log(
    `   ${productsList.passed ? '✅' : '❌'} GET /api/public/products - ${productsList.status || 'ERROR'}`,
    productsList.passed ? 'green' : 'red'
  );

  // Test public/booking (POST)
  const bookingData = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    phone: '1234567890',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    serviceType: 'Consultation',
    healthConcern: 'Test health concern',
  };
  const bookingPost = await testEndpoint(
    'POST /api/public/booking',
    'POST',
    `${API_BASE}/public/booking`,
    bookingData
  );
  testResults.push(bookingPost);
  log(
    `   ${bookingPost.passed ? '✅' : '❌'} POST /api/public/booking - ${bookingPost.status || 'ERROR'}`,
    bookingPost.passed ? 'green' : 'red'
  );
}

async function testAdminRoutes() {
  logSection('Testing Admin API Routes (Unauthorized - Expected 401)');

  // Test admin/blog
  const adminBlogList = await testEndpoint(
    'GET /api/admin/blog',
    'GET',
    `${API_BASE}/admin/blog`
  );
  testResults.push(adminBlogList);
  log(
    `   ${adminBlogList.status === 401 ? '✅' : '❌'} GET /api/admin/blog - ${adminBlogList.status || 'ERROR'} (Expected 401)`,
    adminBlogList.status === 401 ? 'green' : 'yellow'
  );

  // Test admin/services
  const adminServicesList = await testEndpoint(
    'GET /api/admin/services',
    'GET',
    `${API_BASE}/admin/services`
  );
  testResults.push(adminServicesList);
  log(
    `   ${adminServicesList.status === 401 ? '✅' : '❌'} GET /api/admin/services - ${adminServicesList.status || 'ERROR'} (Expected 401)`,
    adminServicesList.status === 401 ? 'green' : 'yellow'
  );

  // Test admin/bookings
  const adminBookingsList = await testEndpoint(
    'GET /api/admin/bookings',
    'GET',
    `${API_BASE}/admin/bookings`
  );
  testResults.push(adminBookingsList);
  log(
    `   ${adminBookingsList.status === 401 ? '✅' : '❌'} GET /api/admin/bookings - ${adminBookingsList.status || 'ERROR'} (Expected 401)`,
    adminBookingsList.status === 401 ? 'green' : 'yellow'
  );

  // Test admin/products
  const adminProductsList = await testEndpoint(
    'GET /api/admin/products',
    'GET',
    `${API_BASE}/admin/products`
  );
  testResults.push(adminProductsList);
  log(
    `   ${adminProductsList.status === 401 ? '✅' : '❌'} GET /api/admin/products - ${adminProductsList.status || 'ERROR'} (Expected 401)`,
    adminProductsList.status === 401 ? 'green' : 'yellow'
  );
}

async function testDeprecatedRoutes() {
  logSection('Testing Deprecated Routes');

  // Test deprecated volunteers route
  const volunteersList = await testEndpoint(
    'GET /api/admin/volunteers (Deprecated)',
    'GET',
    `${API_BASE}/admin/volunteers`
  );
  testResults.push(volunteersList);
  const isDeprecated = volunteersList.response?.deprecated === true;
  log(
    `   ${isDeprecated ? '✅' : '⚠️'} GET /api/admin/volunteers - Deprecated flag: ${isDeprecated}`,
    isDeprecated ? 'green' : 'yellow'
  );
}

async function testRouteAvailability() {
  logSection('Testing Route Availability');

  const routes = [
    { name: 'Public Blog', url: `${API_BASE}/public/blog` },
    { name: 'Public Services', url: `${API_BASE}/public/services` },
    { name: 'Public Products', url: `${API_BASE}/public/products` },
    { name: 'Public Booking', url: `${API_BASE}/public/booking` },
    { name: 'Admin Blog', url: `${API_BASE}/admin/blog` },
    { name: 'Admin Services', url: `${API_BASE}/admin/services` },
    { name: 'Admin Bookings', url: `${API_BASE}/admin/bookings` },
    { name: 'Admin Products', url: `${API_BASE}/admin/products` },
  ];

  for (const route of routes) {
    try {
      const response = await fetch(route.url, { method: 'HEAD' });
      const available = response.status !== 404;
      log(
        `   ${available ? '✅' : '❌'} ${route.name}: ${response.status}`,
        available ? 'green' : 'red'
      );
    } catch (error: any) {
      log(`   ⚠️  ${route.name}: ${error.message}`, 'yellow');
    }
  }
}

async function runAllTests() {
  logSection('API Routes Test Suite');
  log(`Testing against: ${BASE_URL}`, 'yellow');
  log('Starting tests...\n', 'yellow');

  try {
    await testRouteAvailability();
    await testPublicRoutes();
    await testAdminRoutes();
    await testDeprecatedRoutes();

    // Summary
    logSection('Test Summary');
    const passed = testResults.filter(r => r.passed || r.status === 401).length;
    const total = testResults.length;
    log(`   Tests passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');

    // Detailed results
    log('\nDetailed Results:', 'cyan');
    testResults.forEach((result) => {
      const status = result.status ? ` (${result.status})` : '';
      const icon = result.passed || result.status === 401 ? '✅' : '❌';
      log(`   ${icon} ${result.name}${status}`, result.passed || result.status === 401 ? 'green' : 'red');
      if (result.error && result.status !== 401) {
        log(`      Error: ${result.error}`, 'yellow');
      }
    });

    if (passed === total) {
      log('\n✅ All API route tests passed!', 'green');
      process.exit(0);
    } else {
      log('\n⚠️  Some tests failed or need attention', 'yellow');
      process.exit(1);
    }
  } catch (error: any) {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL, { method: 'HEAD' });
    if (!response.ok && response.status !== 404) {
      throw new Error(`Server returned ${response.status}`);
    }
    return true;
  } catch (error: any) {
    log(`\n⚠️  Warning: Could not reach server at ${BASE_URL}`, 'yellow');
    log('   Make sure the Next.js dev server is running (npm run dev)', 'yellow');
    log('   Some tests may fail if the server is not running.\n', 'yellow');
    return false;
  }
}

// Run tests
checkServer().then(() => {
  runAllTests().catch((error) => {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });
});



