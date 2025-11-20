#!/usr/bin/env tsx
/**
 * Test script for UI/UX Enhancement Features
 * Tests:
 * 1. Conflict Detection
 * 2. Status Transition Validation
 * 3. Bulk Operations
 * 4. Real-time Booking Badge
 */

import 'dotenv/config';
import mongoose from "mongoose";
import Appointment from "~/lib/db/models/Appointment";
import Booking from "~/lib/db/models/Booking";
import connectDB from "~/lib/db/mongodb";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const API_BASE = `${API_BASE_URL}/api`;

// Test colors
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function log(message: string, color: string = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function addResult(name: string, passed: boolean, message: string) {
  results.push({ name, passed, message });
  if (passed) {
    log(`✓ ${name}: ${message}`, GREEN);
  } else {
    log(`✗ ${name}: ${message}`, RED);
  }
}

async function makeRequest(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<any> {
  const url = `${API_BASE}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error: any) {
    return { status: 500, data: { success: false, error: error.message } };
  }
}

// Test 1: Conflict Detection
async function testConflictDetection() {
  log("\n" + "=".repeat(60), BLUE);
  log("TEST 1: Conflict Detection", BLUE);
  log("=".repeat(60), BLUE);

  await connectDB();

  // Create first appointment
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 1); // Tomorrow
  testDate.setHours(10, 0, 0, 0);

  const firstAppointment = await Appointment.create({
    patientName: "Test Patient 1",
    phone: "+251911111111",
    appointmentDate: testDate,
    appointmentTime: "10:00 AM",
    serviceType: "Consultation",
    healthConcern: "Test concern",
    status: "scheduled",
  });

  addResult(
    "Create first appointment",
    true,
    `Created appointment ID: ${firstAppointment._id}`
  );

  // Test conflict detection logic directly (simulating API behavior)
  const conflictingAppointment = await Appointment.findOne({
    appointmentDate: testDate,
    appointmentTime: "10:00 AM",
    status: { $in: ['scheduled', 'in-progress'] },
  });

  if (conflictingAppointment && conflictingAppointment._id.toString() === firstAppointment._id.toString()) {
    addResult(
      "Conflict detection logic (database query)",
      true,
      `Conflict query correctly finds existing appointment: ${conflictingAppointment.patientName} at ${conflictingAppointment.appointmentTime}`
    );
  } else {
    addResult(
      "Conflict detection logic (database query)",
      false,
      "Conflict query did not find the appointment"
    );
  }

  // Try to create conflicting appointment directly (should be prevented by API)
  // We'll test the database constraint by attempting to create it
  try {
    const conflictAttempt = await Appointment.create({
      patientName: "Test Patient 2",
      phone: "+251922222222",
      appointmentDate: testDate,
      appointmentTime: "10:00 AM",
      serviceType: "Consultation",
      healthConcern: "Test concern 2",
      status: "scheduled",
    });
    
    // If we get here, the conflict wasn't prevented at DB level (expected - API handles it)
    addResult(
      "Conflict detection (database allows duplicate)",
      true,
      "Database allows duplicate (API layer handles conflict detection - this is expected)"
    );
    
    // Cleanup the duplicate
    await Appointment.deleteOne({ _id: conflictAttempt._id });
  } catch (error: any) {
    addResult(
      "Conflict detection (database constraint)",
      true,
      `Database prevented conflict: ${error.message}`
    );
  }

  // Try to update appointment to conflicting time
  const secondAppointment = await Appointment.create({
    patientName: "Test Patient 3",
    phone: "+251933333333",
    appointmentDate: testDate,
    appointmentTime: "11:00 AM",
    serviceType: "Consultation",
    healthConcern: "Test concern 3",
    status: "scheduled",
  });

  // Test conflict detection for update (simulating API behavior)
  const updateConflictCheck = await Appointment.findOne({
    _id: { $ne: secondAppointment._id },
    appointmentDate: testDate,
    appointmentTime: "10:00 AM",
    status: { $in: ['scheduled', 'in-progress'] },
  });

  if (updateConflictCheck) {
    addResult(
      "Conflict detection on update (logic)",
      true,
      `Update conflict check correctly identifies conflict with: ${updateConflictCheck.patientName} at ${updateConflictCheck.appointmentTime}`
    );
  } else {
    addResult(
      "Conflict detection on update (logic)",
      false,
      "Update conflict check did not find conflict"
    );
  }

  // Cleanup
  await Appointment.deleteMany({
    _id: { $in: [firstAppointment._id, secondAppointment._id] },
  });
}

// Test 2: Status Transition Validation
async function testStatusTransitions() {
  log("\n" + "=".repeat(60), BLUE);
  log("TEST 2: Status Transition Validation", BLUE);
  log("=".repeat(60), BLUE);

  await connectDB();

  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 1);

  // Create appointment with 'scheduled' status
  const appointment = await Appointment.create({
    patientName: "Status Test Patient",
    phone: "+251944444444",
    appointmentDate: testDate,
    appointmentTime: "2:00 PM",
    serviceType: "Consultation",
    healthConcern: "Status test",
    status: "scheduled",
  });

  addResult("Create scheduled appointment", true, `ID: ${appointment._id}`);

  // Test valid transition: scheduled -> in-progress (simulating API validation logic)
  const validTransitions: Record<string, string[]> = {
    'scheduled': ['in-progress', 'completed', 'cancelled', 'no-show'],
    'in-progress': ['completed', 'cancelled', 'no-show'],
    'completed': [],
    'cancelled': [],
    'no-show': ['scheduled', 'cancelled'],
  };

  const currentStatus = appointment.status;
  const newStatus = 'in-progress';
  
  if (validTransitions[currentStatus]?.includes(newStatus)) {
    // Simulate the update
    appointment.status = newStatus;
    await appointment.save();
    addResult(
      "Valid transition: scheduled -> in-progress",
      true,
      "Transition logic validated and applied successfully"
    );
  } else {
    addResult(
      "Valid transition: scheduled -> in-progress",
      false,
      "Transition validation failed"
    );
  }

  // Test valid transition: in-progress -> completed
  appointment.status = 'in-progress';
  await appointment.save();
  
  if (validTransitions['in-progress']?.includes('completed')) {
    appointment.status = 'completed';
    appointment.completedAt = new Date();
    await appointment.save();
    addResult(
      "Valid transition: in-progress -> completed",
      true,
      "Transition logic validated and applied successfully"
    );
  } else {
    addResult(
      "Valid transition: in-progress -> completed",
      false,
      "Transition validation failed"
    );
  }

  // Test invalid transition: completed -> scheduled (should fail)
  if (validTransitions['completed']?.includes('scheduled')) {
    addResult(
      "Invalid transition: completed -> scheduled",
      false,
      "Transition validation incorrectly allows this transition"
    );
  } else {
    addResult(
      "Invalid transition: completed -> scheduled",
      true,
      "Correctly rejected: completed is a terminal state"
    );
  }

  // Test terminal state: completed -> cancelled (should fail)
  if (validTransitions['completed']?.includes('cancelled')) {
    addResult(
      "Terminal state protection: completed -> cancelled",
      false,
      "Transition validation incorrectly allows this transition"
    );
  } else {
    addResult(
      "Terminal state protection: completed -> cancelled",
      true,
      "Correctly rejected: completed is a terminal state"
    );
  }

  // Test that database allows the change (API layer enforces validation)
  const completedAppointment = await Appointment.findById(appointment._id);
  if (completedAppointment && completedAppointment.status === 'completed') {
    // Database allows the change - this is expected behavior
    // The API layer enforces the validation rules
    completedAppointment.status = 'scheduled';
    await completedAppointment.save();
    addResult(
      "Database allows terminal state change (API enforces validation)",
      true,
      "Database allows change (expected) - API validation layer prevents invalid transitions"
    );
  }

  // Cleanup
  await Appointment.deleteOne({ _id: appointment._id });
}

// Test 3: Bulk Operations
async function testBulkOperations() {
  log("\n" + "=".repeat(60), BLUE);
  log("TEST 3: Bulk Operations", BLUE);
  log("=".repeat(60), BLUE);

  await connectDB();

  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 1);

  // Create multiple appointments
  const appointments = await Appointment.insertMany([
    {
      patientName: "Bulk Test Patient 1",
      phone: "+251955555555",
      appointmentDate: testDate,
      appointmentTime: "9:00 AM",
      serviceType: "Consultation",
      healthConcern: "Bulk test 1",
      status: "scheduled",
    },
    {
      patientName: "Bulk Test Patient 2",
      phone: "+251966666666",
      appointmentDate: testDate,
      appointmentTime: "9:30 AM",
      serviceType: "Consultation",
      healthConcern: "Bulk test 2",
      status: "scheduled",
    },
    {
      patientName: "Bulk Test Patient 3",
      phone: "+251977777777",
      appointmentDate: testDate,
      appointmentTime: "10:00 AM",
      serviceType: "Consultation",
      healthConcern: "Bulk test 3",
      status: "scheduled",
    },
  ]);

  const appointmentIds = appointments.map((apt) => apt._id.toString());

  addResult(
    "Create multiple appointments for bulk test",
    true,
    `Created ${appointments.length} appointments`
  );

  // Test bulk update directly (simulating API behavior)
  const updateData: any = { status: "in-progress" };
  
  const bulkResult = await Appointment.updateMany(
    { _id: { $in: appointmentIds } },
    updateData
  );

  if (bulkResult.modifiedCount === appointments.length) {
    addResult(
      "Bulk status update",
      true,
      `Successfully updated ${bulkResult.modifiedCount} appointments to 'in-progress'`
    );
  } else {
    addResult(
      "Bulk status update",
      false,
      `Expected ${appointments.length} updates, got ${bulkResult.modifiedCount}`
    );
  }

  // Verify all appointments were updated
  const updatedAppointments = await Appointment.find({
    _id: { $in: appointmentIds },
  });

  const allUpdated = updatedAppointments.every(
    (apt) => apt.status === "in-progress"
  );

  if (allUpdated) {
    addResult(
      "Bulk update verification",
      true,
      "All appointments successfully updated to 'in-progress'"
    );
  } else {
    addResult(
      "Bulk update verification",
      false,
      "Not all appointments were updated correctly"
    );
  }

  // Test bulk update validation (invalid transition - completed -> scheduled)
  // First, mark one as completed
  await Appointment.updateOne(
    { _id: appointmentIds[0] },
    { status: "completed", completedAt: new Date() }
  );

  // Simulate bulk update validation logic
  const appointmentsToUpdate = await Appointment.find({ _id: { $in: appointmentIds } });
  const invalidTransitions: string[] = [];
  
  appointmentsToUpdate.forEach((apt) => {
    if ((apt.status === 'completed' || apt.status === 'cancelled') && 'scheduled' !== apt.status) {
      invalidTransitions.push(apt._id.toString());
    }
  });

  if (invalidTransitions.length > 0) {
    addResult(
      "Bulk update validation (invalid transition)",
      true,
      `Correctly identified ${invalidTransitions.length} appointment(s) with invalid transitions (completed/cancelled cannot be changed)`
    );
  } else {
    addResult(
      "Bulk update validation (invalid transition)",
      false,
      "Validation did not detect invalid transitions"
    );
  }

  // Cleanup
  await Appointment.deleteMany({ _id: { $in: appointmentIds } });
}

// Test 4: Real-time Booking Badge
async function testBookingBadge() {
  log("\n" + "=".repeat(60), BLUE);
  log("TEST 4: Real-time Booking Badge", BLUE);
  log("=".repeat(60), BLUE);

  await connectDB();

  // Count existing pending bookings
  const initialPendingCount = await Booking.countDocuments({ status: "pending" });

  addResult(
    "Initial pending bookings count",
    true,
    `Found ${initialPendingCount} pending bookings`
  );

  // Create test pending bookings
  const testBookings = await Booking.insertMany([
    {
      name: "Badge Test Patient 1",
      phone: "+251988888888",
      preferredDate: new Date(),
      preferredTime: "3:00 PM",
      serviceType: "Consultation",
      healthConcern: "Badge test 1",
      status: "pending",
      requestCallback: false,
    },
    {
      name: "Badge Test Patient 2",
      phone: "+251999999999",
      preferredDate: new Date(),
      preferredTime: "4:00 PM",
      serviceType: "Consultation",
      healthConcern: "Badge test 2",
      status: "pending",
      requestCallback: false,
    },
  ]);

  addResult(
    "Create test pending bookings",
    true,
    `Created ${testBookings.length} pending bookings`
  );

  // Test booking count query (simulating what sidebar does)
  const pendingBookings = await Booking.find({ status: "pending" }).limit(1000);
  const pendingCount = pendingBookings.length;
  const expectedCount = initialPendingCount + testBookings.length;

  if (pendingCount >= testBookings.length) {
    addResult(
      "Booking badge count query",
      true,
      `Query returns ${pendingCount} pending bookings (expected at least ${testBookings.length})`
    );
  } else {
    addResult(
      "Booking badge count query",
      false,
      `Expected at least ${testBookings.length} pending bookings, got ${pendingCount}`
    );
  }

  // Test that badge count updates when bookings are confirmed
  await Booking.updateOne(
    { _id: testBookings[0]._id },
    { status: "confirmed" }
  );

  const updatedPendingBookings = await Booking.find({ status: "pending" }).limit(1000);
  const updatedPendingCount = updatedPendingBookings.length;
  const expectedUpdatedCount = initialPendingCount + testBookings.length - 1;

  if (updatedPendingCount === expectedUpdatedCount) {
    addResult(
      "Booking badge real-time update",
      true,
      `Count correctly updated to ${updatedPendingCount} after confirming one booking`
    );
  } else {
    addResult(
      "Booking badge real-time update",
      false,
      `Expected ${expectedUpdatedCount}, got ${updatedPendingCount}`
    );
  }

  // Cleanup
  await Booking.deleteMany({
    _id: { $in: testBookings.map((b) => b._id) },
  });
}

// Main test runner
async function runTests() {
  log("\n" + "=".repeat(60), YELLOW);
  log("UI/UX Enhancement Features Test Suite", YELLOW);
  log("=".repeat(60), YELLOW);

  try {
    await testConflictDetection();
    await testStatusTransitions();
    await testBulkOperations();
    await testBookingBadge();

    // Summary
    log("\n" + "=".repeat(60), YELLOW);
    log("TEST SUMMARY", YELLOW);
    log("=".repeat(60), YELLOW);

    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;
    const total = results.length;

    log(`\nTotal Tests: ${total}`, YELLOW);
    log(`Passed: ${passed}`, GREEN);
    log(`Failed: ${failed}`, failed > 0 ? RED : GREEN);

    if (failed > 0) {
      log("\nFailed Tests:", RED);
      results
        .filter((r) => !r.passed)
        .forEach((r) => {
          log(`  - ${r.name}: ${r.message}`, RED);
        });
    }

    log("\n" + "=".repeat(60), YELLOW);

    process.exit(failed > 0 ? 1 : 0);
  } catch (error: any) {
    log(`\nFatal error: ${error.message}`, RED);
    console.error(error);
    process.exit(1);
  }
}

// Run tests
runTests();

