#!/usr/bin/env tsx
/**
 * Appointment System MongoDB Direct Test Script
 * Tests Appointment and Booking models with appointment conversion
 */

import 'dotenv/config';
import connectDB from '~/lib/db/mongodb';
import Appointment from '~/lib/db/models/Appointment';
import Booking from '~/lib/db/models/Booking';
import User from '~/lib/db/models/User';
import mongoose from 'mongoose';

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

async function testConnection() {
  logSection('Testing MongoDB Connection');
  try {
    await connectDB();
    log('✅ MongoDB connection successful', 'green');
    log(`   Database: ${mongoose.connection.db?.databaseName}`, 'blue');
    return true;
  } catch (error) {
    log(`❌ MongoDB connection failed: ${error}`, 'red');
    return false;
  }
}

async function testAppointmentModel() {
  logSection('Testing Appointment Model');
  try {
    const count = await Appointment.countDocuments();
    log(`   Total Appointments: ${count}`, 'blue');
    
    const scheduled = await Appointment.countDocuments({ status: 'scheduled' });
    const inProgress = await Appointment.countDocuments({ status: 'in-progress' });
    const completed = await Appointment.countDocuments({ status: 'completed' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });
    const noShow = await Appointment.countDocuments({ status: 'no-show' });
    
    log(`   Scheduled: ${scheduled}`, 'blue');
    log(`   In-Progress: ${inProgress}`, 'blue');
    log(`   Completed: ${completed}`, 'blue');
    log(`   Cancelled: ${cancelled}`, 'blue');
    log(`   No-Show: ${noShow}`, 'blue');
    
    const sample = await Appointment.findOne().populate('assignedTo', 'name email').lean();
    if (sample) {
      log(`   Sample appointment: ${sample.patientName} - ${sample.appointmentDate}`, 'blue');
    }
    
    log('✅ Appointment model test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ Appointment model test failed: ${error}`, 'red');
    return false;
  }
}

async function testBookingModel() {
  logSection('Testing Booking Model (with appointmentId)');
  try {
    const count = await Booking.countDocuments();
    log(`   Total Bookings: ${count}`, 'blue');
    
    const withAppointment = await Booking.countDocuments({ appointmentId: { $ne: null } });
    const withoutAppointment = await Booking.countDocuments({ appointmentId: null });
    log(`   With Appointment: ${withAppointment}`, 'blue');
    log(`   Without Appointment: ${withoutAppointment}`, 'blue');
    
    const sample = await Booking.findOne().populate('appointmentId', 'patientName appointmentDate').lean();
    if (sample) {
      log(`   Sample booking: ${sample.name} - ${sample.serviceType}`, 'blue');
      if (sample.appointmentId) {
        log(`   Linked appointment exists`, 'green');
      }
    }
    
    log('✅ Booking model test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ Booking model test failed: ${error}`, 'red');
    return false;
  }
}

async function testCreateAppointment() {
  logSection('Testing Appointment Creation');
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const appointment = await Appointment.create({
      patientName: 'Test Patient',
      phone: `123456789${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      appointmentDate: tomorrow,
      appointmentTime: '10:00 AM',
      serviceType: 'Consultation',
      healthConcern: 'Test health concern',
      status: 'scheduled',
    });

    log(`   ✅ Created test appointment: ${appointment._id}`, 'green');
    log(`   Patient: ${appointment.patientName}`, 'blue');
    log(`   Date: ${appointment.appointmentDate}`, 'blue');
    log(`   Time: ${appointment.appointmentTime}`, 'blue');

    // Clean up
    await Appointment.findByIdAndDelete(appointment._id);
    log('   ✅ Cleaned up test appointment', 'green');
    return true;
  } catch (error) {
    log(`   ❌ Appointment creation test failed: ${error}`, 'red');
    return false;
  }
}

async function testBookingToAppointmentConversion() {
  logSection('Testing Booking to Appointment Conversion');
  try {
    // Create a test booking
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const booking = await Booking.create({
      name: 'Test Conversion Patient',
      phone: `987654321${Date.now()}`,
      email: `conversion${Date.now()}@example.com`,
      preferredDate: tomorrow,
      preferredTime: '2:00 PM',
      serviceType: 'Herbal Medicine',
      healthConcern: 'Test conversion concern',
      status: 'pending',
    });

    log(`   ✅ Created test booking: ${booking._id}`, 'green');

    // Create appointment from booking
    const appointment = await Appointment.create({
      patientName: booking.name,
      phone: booking.phone,
      email: booking.email,
      appointmentDate: booking.preferredDate,
      appointmentTime: booking.preferredTime,
      serviceType: booking.serviceType,
      healthConcern: booking.healthConcern,
      status: 'scheduled',
      bookingId: booking._id,
    });

    log(`   ✅ Created appointment from booking: ${appointment._id}`, 'green');

    // Link appointment back to booking
    booking.appointmentId = appointment._id;
    await booking.save();

    log('   ✅ Linked appointment to booking', 'green');

    // Verify relationship
    const updatedBooking = await Booking.findById(booking._id).populate('appointmentId').lean();
    if (updatedBooking?.appointmentId) {
      log('   ✅ Verified bidirectional relationship', 'green');
    }

    // Clean up
    await Appointment.findByIdAndDelete(appointment._id);
    await Booking.findByIdAndDelete(booking._id);
    log('   ✅ Cleaned up test data', 'green');
    return true;
  } catch (error) {
    log(`   ❌ Booking to appointment conversion test failed: ${error}`, 'red');
    return false;
  }
}

async function testAppointmentQueries() {
  logSection('Testing Appointment Queries');
  try {
    // Test date range query
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingCount = await Appointment.countDocuments({
      appointmentDate: { $gte: today, $lte: nextWeek },
      status: { $ne: 'cancelled' },
    });
    log(`   ✅ Upcoming appointments (next 7 days): ${upcomingCount}`, 'green');

    // Test phone search
    const phoneSearch = await Appointment.countDocuments({
      phone: { $regex: '123', $options: 'i' },
    });
    log(`   ✅ Appointments with phone containing '123': ${phoneSearch}`, 'green');

    // Test status filter
    const scheduledCount = await Appointment.countDocuments({ status: 'scheduled' });
    log(`   ✅ Scheduled appointments: ${scheduledCount}`, 'green');

    log('✅ Appointment queries test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ Appointment queries test failed: ${error}`, 'red');
    return false;
  }
}

async function runAllTests() {
  logSection('Appointment System MongoDB Test Suite');
  log('Starting tests...', 'yellow');
  
  const results: boolean[] = [];
  
  // Test connection
  const connected = await testConnection();
  results.push(connected);
  
  if (!connected) {
    log('\n❌ Cannot proceed without database connection', 'red');
    process.exit(1);
  }
  
  // Test models
  results.push(await testAppointmentModel());
  results.push(await testBookingModel());
  results.push(await testCreateAppointment());
  results.push(await testBookingToAppointmentConversion());
  results.push(await testAppointmentQueries());
  
  // Summary
  logSection('Test Summary');
  const passed = results.filter(r => r).length;
  const total = results.length;
  log(`   Tests passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');
  
  if (passed === total) {
    log('\n✅ All appointment system MongoDB tests passed!', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Some tests failed', 'yellow');
    process.exit(1);
  }
}

// Run tests
runAllTests().catch((error) => {
  log(`\n❌ Fatal error: ${error}`, 'red');
  process.exit(1);
});


