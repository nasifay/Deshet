# Supporters Integration Guide

This guide explains how to manage supporters for the ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል website.

## Overview

Supporters are now managed exclusively through the `/admin/supporters` page. The `PartnersCertificationsSection` on the landing page automatically fetches and displays active supporters from the database.

## Changes Made

1. ✅ Removed `MedicalPartnersSection` from landing page admin
2. ✅ Supporters are now managed via `/admin/supporters`
3. ✅ `PartnersCertificationsSection` automatically fetches from `/api/public/supporters`

## Scripts

### 1. Cleanup MedicalPartnersSection
Removes any existing `MedicalPartnersSection` entries from the landing page database.

```bash
npx tsx scripts/cleanup-medical-partners-section.ts
```

### 2. Seed Supporters
Seeds the database with default Deshet supporters data.

```bash
npx tsx scripts/seed-supporters.ts
```

### 3. Test Integration
Tests the complete supporters integration and verifies data structure.

```bash
npx tsx scripts/test-supporters-integration.ts
```

### 4. Run All Tests
Runs all scripts in sequence: cleanup → seed → test.

```bash
npx tsx scripts/test-all-supporters.ts
```

## Quick Start

1. **Clean up existing data** (if needed):
   ```bash
   npx tsx scripts/cleanup-medical-partners-section.ts
   ```

2. **Seed supporters data**:
   ```bash
   npx tsx scripts/seed-supporters.ts
   ```

3. **Verify everything works**:
   ```bash
   npx tsx scripts/test-supporters-integration.ts
   ```

Or run everything at once:
```bash
npx tsx scripts/test-all-supporters.ts
```

## Managing Supporters

### Via Admin Panel

1. Navigate to `/admin/supporters` (or `https://dashet-website.vercel.app/admin/supporters`)
2. Add, edit, or delete supporters
3. Set order and active status
4. Add logo images and optional links

### Via API

- **Public API** (for frontend): `GET /api/public/supporters`
  - Returns only active supporters, sorted by order
  - No authentication required

- **Admin API** (for management): `GET /api/admin/supporters`
  - Returns all supporters
  - Requires authentication

## Data Structure

Each supporter has:
- `name`: Supporter name (required)
- `logo`: Logo image URL (required)
- `order`: Display order (number, required)
- `isActive`: Whether to display on frontend (boolean, default: true)
- `link`: Optional website link
- `description`: Optional description

## Frontend Display

The `PartnersCertificationsSection` component:
- Automatically fetches from `/api/public/supporters`
- Displays only active supporters
- Sorts by `order` field
- Shows in a marquee animation with two rows
- Supports clickable links if provided

## Troubleshooting

### Supporters not showing on landing page

1. Check that supporters are marked as `isActive: true`
2. Verify the API endpoint: `/api/public/supporters`
3. Check browser console for errors
4. Ensure `PartnersCertificationsSection` is in the landing page sections

### MedicalPartnersSection still appears

1. Run the cleanup script: `npx tsx scripts/cleanup-medical-partners-section.ts`
2. Check `/admin/landing` and manually remove if needed
3. Verify no `MedicalPartnersSection` in the sections list

### API not returning data

1. Check MongoDB connection
2. Verify supporters exist in database
3. Check API route: `app/api/public/supporters/route.ts`
4. Ensure supporters have `isActive: true`

## Notes

- The `PartnersCertificationsSection` component still checks for `MedicalPartnersSection` in the CMS for backward compatibility
- Supporters are displayed in the order specified by the `order` field
- Only active supporters (`isActive: true`) are shown on the frontend
- Logo images should be hosted URLs or paths to public assets




