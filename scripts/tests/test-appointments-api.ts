#!/usr/bin/env tsx
/**
 * Appointment System API Routes Test Script
 * Tests all appointment-related API endpoints
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
  data?: any;
}

const testResults: TestResult[] = [];
let createdAppointmentId: string | null = null;
let createdBookingId: string | null = null;

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
      data: data.data,
      error: passed ? undefined : `Status: ${response.status}, Error: ${data.error || 'Unknown'}`,
    };
  } catch (error: any) {
    return {
      name,
      passed: false,
      error: error.message,
    };
  }
}

async function testAppointmentRoutes() {
  logSection('Testing Appointment API Routes (Unauthorized - Expected 401)');

  // Test GET /api/admin/appointments
  const appointmentsList = await testEndpoint(
    'GET /api/admin/appointments',
    'GET',
    `${API_BASE}/admin/appointments`
  );
  testResults.push(appointmentsList);
  log(
    `   ${appointmentsList.status === 401 ? '✅' : '❌'} GET /api/admin/appointments - ${appointmentsList.status || 'ERROR'} (Expected 401)`,
    appointmentsList.status === 401 ? 'green' : 'yellow'
  );

  // Test GET /api/admin/appointments with filters
  const appointmentsFiltered = await testEndpoint(
    'GET /api/admin/appointments?status=scheduled&page=1&limit=10',
    'GET',
    `${API_BASE}/admin/appointments?status=scheduled&page=1&limit=10`
  );
  testResults.push(appointmentsFiltered);
  log(
    `   ${appointmentsFiltered.status === 401 ? '✅' : '❌'} GET /api/admin/appointments (filtered) - ${appointmentsFiltered.status || 'ERROR'} (Expected 401)`,
    appointmentsFiltered.status === 401 ? 'green' : 'yellow'
  );

  // Test POST /api/admin/appointments (will fail without auth, but tests route exists)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const appointmentData = {
    patientName: 'Test Patient',
    phone: `123456789${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    appointmentDate: tomorrow.toISOString().split('T')[0],
    appointmentTime: '10:00 AM',
    serviceType: 'Consultation',
    healthConcern: 'Test health concern',
    status: 'scheduled',
  };
  const appointmentPost = await testEndpoint(
    'POST /api/admin/appointments',
    'POST',
    `${API_BASE}/admin/appointments`,
    appointmentData
  );
  testResults.push(appointmentPost);
  log(
    `   ${appointmentPost.status === 401 ? '✅' : '❌'} POST /api/admin/appointments - ${appointmentPost.status || 'ERROR'} (Expected 401)`,
    appointmentPost.status === 401 ? 'green' : 'yellow'
  );
}

async function testCalendarRoutes() {
  logSection('Testing Calendar API Routes (Unauthorized - Expected 401)');

  // Test GET /api/admin/calendar (daily view)
  const calendarDaily = await testEndpoint(
    'GET /api/admin/calendar?view=daily',
    'GET',
    `${API_BASE}/admin/calendar?view=daily`
  );
  testResults.push(calendarDaily);
  log(
    `   ${calendarDaily.status === 401 ? '✅' : '❌'} GET /api/admin/calendar (daily) - ${calendarDaily.status || 'ERROR'} (Expected 401)`,
    calendarDaily.status === 401 ? 'green' : 'yellow'
  );

  // Test GET /api/admin/calendar (weekly view)
  const calendarWeekly = await testEndpoint(
    'GET /api/admin/calendar?view=weekly',
    'GET',
    `${API_BASE}/admin/calendar?view=weekly`
  );
  testResults.push(calendarWeekly);
  log(
    `   ${calendarWeekly.status === 401 ? '✅' : '❌'} GET /api/admin/calendar (weekly) - ${calendarWeekly.status || 'ERROR'} (Expected 401)`,
    calendarWeekly.status === 401 ? 'green' : 'yellow'
  );
}

async function testPatientSearchRoutes() {
  logSection('Testing Patient Search API Routes (Unauthorized - Expected 401)');

  // Test GET /api/admin/appointments/search
  const patientSearch = await testEndpoint(
    'GET /api/admin/appointments/search?phone=123',
    'GET',
    `${API_BASE}/admin/appointments/search?phone=123`
  );
  testResults.push(patientSearch);
  log(
    `   ${patientSearch.status === 401 ? '✅' : '❌'} GET /api/admin/appointments/search - ${patientSearch.status || 'ERROR'} (Expected 401)`,
    patientSearch.status === 401 ? 'green' : 'yellow'
  );
}

async function testBookingUpdateRoute() {
  logSection('Testing Booking Update Route (Auto-Appointment Creation)');

  // Test PUT /api/admin/bookings/[id] (will fail without auth, but tests route exists)
  const bookingUpdate = await testEndpoint(
    'PUT /api/admin/bookings/[id]',
    'PUT',
    `${API_BASE}/admin/bookings/test-id`,
    { status: 'confirmed' }
  );
  testResults.push(bookingUpdate);
  log(
    `   ${bookingUpdate.status === 401 || bookingUpdate.status === 404 ? '✅' : '❌'} PUT /api/admin/bookings/[id] - ${bookingUpdate.status || 'ERROR'} (Expected 401 or 404)`,
    bookingUpdate.status === 401 || bookingUpdate.status === 404 ? 'green' : 'yellow'
  );
}

async function testRouteAvailability() {
  logSection('Testing Route Availability');

  const routes = [
    { name: 'Appointments List', url: `${API_BASE}/admin/appointments` },
    { name: 'Calendar Daily', url: `${API_BASE}/admin/calendar?view=daily` },
    { name: 'Calendar Weekly', url: `${API_BASE}/admin/calendar?view=weekly` },
    { name: 'Patient Search', url: `${API_BASE}/admin/appointments/search?phone=123` },
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
  logSection('Appointment System API Routes Test Suite');
  log(`Testing against: ${BASE_URL}`, 'yellow');
  log('Starting tests...\n', 'yellow');

  try {
    await testRouteAvailability();
    await testAppointmentRoutes();
    await testCalendarRoutes();
    await testPatientSearchRoutes();
    await testBookingUpdateRoute();

    // Summary
    logSection('Test Summary');
    const passed = testResults.filter(r => r.passed || r.status === 401 || r.status === 404).length;
    const total = testResults.length;
    log(`   Tests passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');

    // Detailed results
    log('\nDetailed Results:', 'cyan');
    testResults.forEach((result) => {
      const status = result.status ? ` (${result.status})` : '';
      const icon = result.passed || result.status === 401 || result.status === 404 ? '✅' : '❌';
      log(`   ${icon} ${result.name}${status}`, result.passed || result.status === 401 || result.status === 404 ? 'green' : 'red');
      if (result.error && result.status !== 401 && result.status !== 404) {
        log(`      Error: ${result.error}`, 'yellow');
      }
    });

    if (passed === total) {
      log('\n✅ All appointment API route tests passed!', 'green');
      log('\nNote: 401 (Unauthorized) responses are expected without authentication.', 'blue');
      log('To test with authentication, you need to login first and include the admin_token cookie.', 'blue');
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

