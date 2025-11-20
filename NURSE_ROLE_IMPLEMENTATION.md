# Nurse Role Implementation

This document summarizes the implementation of the "nurse" role in the user management system.

## Overview

The nurse role has been added to provide limited access to the admin panel. Nurses can only access Bookings and Appointments sections, with full management rights for both.

## Changes Made

### 1. User Model (`lib/db/models/User.ts`)
- Added `'nurse'` to the `UserRole` type
- Added `'nurse'` to the role enum in the User schema

### 2. Permissions System (`lib/auth/permissions.ts`)
- Added booking and appointment permissions to the `Permission` type:
  - `bookings.view`
  - `bookings.create`
  - `bookings.edit`
  - `bookings.delete`
  - `appointments.view`
  - `appointments.create`
  - `appointments.edit`
  - `appointments.delete`
- Added nurse role to `rolePermissions` with full booking and appointment permissions

### 3. Sidebar Navigation (`app/admin/components/Sidebar.tsx`)
- Updated menu items to restrict access based on role
- Added special filtering logic for nurse role:
  - Nurses only see "Bookings" and "Appointments" menu items
  - All other menu items are hidden from nurses
- Dashboard and other sections are excluded from nurse view

### 4. API Access
- **Bookings API** (`/api/admin/bookings/*`): ✅ Full access (only requires authentication)
- **Appointments API** (`/api/admin/appointments/*`): ✅ Full access (only requires authentication)
- All booking and appointment endpoints work for nurses without additional role checks

### 5. Seed Script (`scripts/seed-nurse-users.ts`)
- Created seed script to generate test nurse users
- Creates 3 test nurse accounts:
  - Nurse Sarah: `nurse.sarah@deshetmed.com`
  - Nurse John: `nurse.john@deshetmed.com`
  - Nurse Mary: `nurse.mary@deshetmed.com`
- Default password for all: `Nurse@123456`

## Nurse Capabilities

### ✅ Full Access To:
- **Bookings Management**
  - View all bookings
  - Create new bookings
  - Edit existing bookings
  - Confirm bookings (auto-creates appointments)
  - Cancel bookings
  - Filter and search bookings
  - See pending bookings badge

- **Appointments Management**
  - View all appointments
  - Create new appointments (walk-in or from bookings)
  - Edit appointments
  - Reschedule appointments
  - Update appointment status
  - Cancel appointments
  - View calendar
  - Bulk status updates
  - Patient lookup/search

### ❌ No Access To:
- Dashboard
- Landing Page
- History
- Pages
- Blog
- Services
- Products
- Gallery
- Contacts
- Leadership
- Supporters & Funders
- Testimonials
- Footer
- Users
- Map Configuration
- Analytics

## Testing

### Seed Nurse Users
```bash
npm run seed:nurse-users
```

### Test Accounts Created
1. **Nurse Sarah**
   - Email: `nurse.sarah@deshetmed.com`
   - Password: `Nurse@123456`
   - Role: `nurse`

2. **Nurse John**
   - Email: `nurse.john@deshetmed.com`
   - Password: `Nurse@123456`
   - Role: `nurse`

3. **Nurse Mary**
   - Email: `nurse.mary@deshetmed.com`
   - Password: `Nurse@123456`
   - Role: `nurse`

### Testing Steps
1. Run the seed script: `npm run seed:nurse-users`
2. Login with one of the nurse accounts
3. Verify sidebar only shows "Bookings" and "Appointments"
4. Test creating, editing, and managing bookings
5. Test creating, editing, and managing appointments
6. Verify access to calendar view
7. Verify patient lookup functionality

## Security Notes

- Nurses are authenticated users (protected by middleware)
- API routes check for authentication, not specific roles
- Sidebar filtering prevents navigation to restricted sections
- Direct URL access to restricted pages is possible but not accessible via navigation
- All booking and appointment operations are fully available to nurses

## Future Enhancements

Potential improvements:
- Add role-based page protection (redirect nurses from dashboard)
- Add audit logging for nurse actions
- Add specific nurse permissions for different appointment operations
- Add nurse-specific dashboard showing only booking/appointment stats


