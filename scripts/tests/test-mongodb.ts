#!/usr/bin/env tsx
/**
 * MongoDB Direct Test Script
 * Tests direct MongoDB connection and model operations
 */

import 'dotenv/config';
import connectDB from '~/lib/db/mongodb';
import NewsPost from '~/lib/db/models/NewsPost';
import Program from '~/lib/db/models/Program';
import Booking from '~/lib/db/models/Booking';
import Product from '~/lib/db/models/Product';
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
    log(`   Host: ${mongoose.connection.host}`, 'blue');
    log(`   Port: ${mongoose.connection.port}`, 'blue');
    return true;
  } catch (error) {
    log(`❌ MongoDB connection failed: ${error}`, 'red');
    return false;
  }
}

async function testNewsPostModel() {
  logSection('Testing NewsPost Model (Blog)');
  try {
    const count = await NewsPost.countDocuments();
    log(`   Total NewsPosts: ${count}`, 'blue');
    
    const published = await NewsPost.countDocuments({ status: 'published' });
    log(`   Published: ${published}`, 'blue');
    
    const sample = await NewsPost.findOne({ status: 'published' }).lean();
    if (sample) {
      log(`   Sample post: ${sample.title}`, 'blue');
    }
    
    log('✅ NewsPost model test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ NewsPost model test failed: ${error}`, 'red');
    return false;
  }
}

async function testProgramModel() {
  logSection('Testing Program Model (Services)');
  try {
    const count = await Program.countDocuments();
    log(`   Total Programs: ${count}`, 'blue');
    
    const published = await Program.countDocuments({ status: 'published' });
    log(`   Published: ${published}`, 'blue');
    
    const sample = await Program.findOne({ status: 'published' }).lean();
    if (sample) {
      log(`   Sample program: ${sample.title}`, 'blue');
    }
    
    log('✅ Program model test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ Program model test failed: ${error}`, 'red');
    return false;
  }
}

async function testBookingModel() {
  logSection('Testing Booking Model');
  try {
    const count = await Booking.countDocuments();
    log(`   Total Bookings: ${count}`, 'blue');
    
    const pending = await Booking.countDocuments({ status: 'pending' });
    const confirmed = await Booking.countDocuments({ status: 'confirmed' });
    log(`   Pending: ${pending}, Confirmed: ${confirmed}`, 'blue');
    
    const sample = await Booking.findOne().lean();
    if (sample) {
      log(`   Sample booking: ${sample.name} - ${sample.serviceType}`, 'blue');
    }
    
    log('✅ Booking model test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ Booking model test failed: ${error}`, 'red');
    return false;
  }
}

async function testProductModel() {
  logSection('Testing Product Model');
  try {
    const count = await Product.countDocuments();
    log(`   Total Products: ${count}`, 'blue');
    
    const published = await Product.countDocuments({ status: 'published', isActive: true });
    log(`   Published & Active: ${published}`, 'blue');
    
    const sample = await Product.findOne({ status: 'published', isActive: true }).lean();
    if (sample) {
      log(`   Sample product: ${sample.name}`, 'blue');
    }
    
    log('✅ Product model test passed', 'green');
    return true;
  } catch (error) {
    log(`❌ Product model test failed: ${error}`, 'red');
    return false;
  }
}

async function testCreateOperations() {
  logSection('Testing Create Operations');
  const testResults: boolean[] = [];
  
  try {
    // Test creating a test blog post
    const testPost = await NewsPost.create({
      title: 'Test Blog Post',
      slug: `test-blog-${Date.now()}`,
      content: 'Test content',
      excerpt: 'Test excerpt',
      category: 'test',
      status: 'draft',
      author: new mongoose.Types.ObjectId(),
    });
    log(`   ✅ Created test blog post: ${testPost._id}`, 'green');
    
    // Clean up
    await NewsPost.findByIdAndDelete(testPost._id);
    log('   ✅ Cleaned up test blog post', 'green');
    testResults.push(true);
  } catch (error) {
    log(`   ❌ Blog post creation test failed: ${error}`, 'red');
    testResults.push(false);
  }
  
  try {
    // Test creating a test booking
    const testBooking = await Booking.create({
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      phone: '1234567890',
      preferredDate: new Date(Date.now() + 86400000), // Tomorrow
      preferredTime: '10:00 AM',
      serviceType: 'Consultation',
      healthConcern: 'Test concern',
      status: 'pending',
    });
    log(`   ✅ Created test booking: ${testBooking._id}`, 'green');
    
    // Clean up
    await Booking.findByIdAndDelete(testBooking._id);
    log('   ✅ Cleaned up test booking', 'green');
    testResults.push(true);
  } catch (error) {
    log(`   ❌ Booking creation test failed: ${error}`, 'red');
    testResults.push(false);
  }
  
  return testResults.every(r => r);
}

async function runAllTests() {
  logSection('MongoDB Direct Test Suite');
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
  results.push(await testNewsPostModel());
  results.push(await testProgramModel());
  results.push(await testBookingModel());
  results.push(await testProductModel());
  results.push(await testCreateOperations());
  
  // Summary
  logSection('Test Summary');
  const passed = results.filter(r => r).length;
  const total = results.length;
  log(`   Tests passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');
  
  if (passed === total) {
    log('\n✅ All MongoDB tests passed!', 'green');
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



