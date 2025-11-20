#!/usr/bin/env tsx
/**
 * Seed script for creating nurse users
 * 
 * This script creates test nurse users with the nurse role.
 * Nurses have access only to Bookings and Appointments sections.
 * 
 * Run with: npm run seed:nurse-users
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { hashPassword } from '../lib/auth/password';
import User from '../lib/db/models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tamra_sdt';

// Nurse users to create
const NURSE_USERS = [
  {
    name: 'Nurse Sarah',
    email: 'nurse.sarah@deshetmed.com',
    password: 'Nurse@123456',
    role: 'nurse' as const,
  },
  {
    name: 'Nurse John',
    email: 'nurse.john@deshetmed.com',
    password: 'Nurse@123456',
    role: 'nurse' as const,
  },
  {
    name: 'Nurse Mary',
    email: 'nurse.mary@deshetmed.com',
    password: 'Nurse@123456',
    role: 'nurse' as const,
  },
];

async function seedNurseUsers() {
  console.log('🌱 Starting nurse users seed...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log('✅ MongoDB Connected\n');

    // Create nurse users
    console.log('Creating nurse users...\n');
    const createdUsers = [];

    for (const nurseData of NURSE_USERS) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: nurseData.email });

        if (existingUser) {
          console.log(`⚠️  User ${nurseData.email} already exists. Skipping...`);
          continue;
        }

        // Hash password
        const hashedPassword = await hashPassword(nurseData.password);

        // Create user
        const user = await User.create({
          name: nurseData.name,
          email: nurseData.email,
          password: hashedPassword,
          role: nurseData.role,
          isActive: true,
        });

        createdUsers.push(user);
        console.log(`✅ Created nurse user: ${user.name} (${user.email})`);
      } catch (error: any) {
        console.error(`❌ Error creating user ${nurseData.email}:`, error.message);
      }
    }

    console.log(`\n✅ Successfully created ${createdUsers.length} nurse user(s)\n`);

    // Display summary
    console.log('📋 Nurse Users Summary:');
    console.log('='.repeat(60));
    createdUsers.forEach((user) => {
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${NURSE_USERS.find((n) => n.email === user.email)?.password}`);
      console.log(`Role: ${user.role}`);
      console.log(`Active: ${user.isActive}`);
      console.log('-'.repeat(60));
    });

    console.log('\n✅ Nurse users seed completed!\n');
    console.log('💡 You can now login with any of these nurse accounts.');
    console.log('💡 Nurses will only see "Bookings" and "Appointments" in the sidebar.\n');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error seeding nurse users:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB Disconnected');
  }
}

// Run the seed function
seedNurseUsers();


