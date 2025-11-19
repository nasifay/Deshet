# Phase 12: Testing & Cleanup - Step-by-Step Implementation

## Overview
This document provides a detailed step-by-step implementation guide for Phase 12: Testing & Cleanup of the Deshet Indigenous Medical Center website transformation. This phase focuses on removing deprecated code, updating environment variables, and comprehensive testing.

---

## Part 1: Remove Deprecated Code

### Step 1.1: Remove Volunteer-Related Files

#### 1.1.1 Remove Admin Volunteer Pages
**Files to Delete:**
- `app/admin/volunteers/page.tsx`
- `app/admin/volunteers/[id]/page.tsx`

**Action:**
```bash
# Delete volunteer admin pages
rm -rf app/admin/volunteers/
```

**Verification:**
- Check that Sidebar.tsx no longer references volunteers (should already be removed)
- Verify no broken links in admin navigation

---

#### 1.1.2 Remove Volunteer API Routes
**Files to Delete:**
- `app/api/admin/volunteers/route.ts`
- `app/api/admin/volunteers/[id]/route.ts`
- `app/api/volunteer/submit/route.ts`

**Action:**
```bash
# Delete volunteer API routes
rm -rf app/api/admin/volunteers/
rm -rf app/api/volunteer/
```

**Verification:**
- Check that no components import or reference these API routes
- Verify no broken API calls

---

#### 1.1.3 Remove Volunteer Database Model
**File to Delete:**
- `lib/db/models/Volunteer.ts`

**Action:**
1. Delete the model file
2. Update `lib/db/models/index.ts` to remove Volunteer export
3. Update `lib/db/mongodb.ts` to remove Volunteer model registration

**Verification:**
- Check that no other files import Volunteer model
- Verify database connection still works

---

#### 1.1.4 Remove Volunteer Components
**Files to Delete:**
- `components/sections/volunteerBanner.tsx`
- `components/sections/volunteer-page-skeleton.tsx`
- `components/sections/VolunteerCallToActionSection.tsx`

**Action:**
```bash
# Delete volunteer components
rm components/sections/volunteerBanner.tsx
rm components/sections/volunteer-page-skeleton.tsx
rm components/sections/VolunteerCallToActionSection.tsx
```

**Verification:**
- Search codebase for imports of these components
- Remove any references to volunteer components

---

#### 1.1.5 Remove Volunteer References from Other Files
**Files to Update:**
- `lib/db/models/index.ts` - Remove Volunteer export
- `lib/db/mongodb.ts` - Remove Volunteer model
- `lib/seo/route-metadata.ts` - Remove volunteer route metadata
- `lib/i18n/translations/en.ts` - Remove volunteer translations (if any)
- `lib/i18n/translations/am.ts` - Remove volunteer translations (if any)
- `components/sections/landing-page-skeleton.tsx` - Remove volunteer section references
- `components/sections/statistics-section.tsx` - Remove volunteer statistics
- `scripts/seed.ts` - Remove volunteer seeding code
- `scripts/seed-landing.ts` - Remove volunteer section from landing page
- `app/admin/components/SectionBuilder.tsx` - Remove volunteer section types
- `app/admin/components/LandingSectionEditor.tsx` - Remove volunteer section editors

**Action:**
1. Search for "volunteer" (case-insensitive) across codebase
2. Remove or comment out volunteer-related code
3. Update any conditional logic that references volunteers

**Verification:**
- Run `grep -r -i "volunteer" . --exclude-dir=node_modules` to find remaining references
- Ensure no broken imports or references

---

### Step 1.2: Remove Donation/Payment Code

#### 1.2.1 Remove Bank Options Admin Page
**File to Delete:**
- `app/admin/bank-options/page.tsx`

**Action:**
```bash
# Delete bank options admin page
rm -rf app/admin/bank-options/
```

**Verification:**
- Check Sidebar.tsx - bank-options should not be in menu
- Verify no broken links

---

#### 1.2.2 Remove Bank Options API Routes
**Files to Delete:**
- `app/api/admin/bank-options/route.ts`
- `app/api/admin/bank-options/[id]/route.ts`

**Action:**
```bash
# Delete bank options API routes
rm -rf app/api/admin/bank-options/
```

**Verification:**
- Check that no components reference these routes
- Verify no broken API calls

---

#### 1.2.3 Remove Donation Components
**Files to Delete:**
- `components/ui/DonationModal.tsx`

**Action:**
```bash
# Delete donation component
rm components/ui/DonationModal.tsx
```

**Verification:**
- Search for imports of DonationModal
- Remove any references

---

#### 1.2.4 Remove Bank Options Model
**File to Delete:**
- `lib/db/models/BankOption.ts` (if exists)

**Action:**
1. Delete the model file if it exists
2. Update `lib/db/models/index.ts` to remove BankOption export
3. Update `lib/db/mongodb.ts` to remove BankOption model

**Verification:**
- Check for any remaining references to BankOption

---

#### 1.2.5 Remove Donation Seed Scripts
**Files to Delete:**
- `scripts/seed-bank-options.ts`
- `scripts/seed-bank-options-fixed.ts`
- `scripts/seed-bank-options-v2.ts`

**Action:**
```bash
# Delete bank options seed scripts
rm scripts/seed-bank-options*.ts
```

**Verification:**
- Check package.json scripts - remove any references to these seed scripts

---

### Step 1.3: Remove Old NGO-Specific Content

#### 1.3.1 Update Seed Scripts
**Files to Update:**
- `scripts/seed.ts` - Remove TSD/Tamra references, update to Deshet
- `scripts/seed-news.ts` - Update news content to medical center context
- `scripts/seed-landing.ts` - Remove NGO-specific sections
- `scripts/seed-history.ts` - Update history to medical center
- `scripts/seed-programs.ts` - Already updated to services
- `scripts/seed-leadership-enhanced.ts` - Update to medical practitioners

**Action:**
1. Search for "Tamra", "TSD", "NGO" in seed scripts
2. Replace with Deshet Medical Center content
3. Update descriptions and content to medical context

**Verification:**
- Run seed scripts and verify content is correct
- Check database for correct content

---

#### 1.3.2 Update Component Content
**Files to Update:**
- `components/sections/AboutNew.tsx` - Remove TSD/Tamra references
- `components/sections/who-we-are/about-hero-section.tsx` - Update content
- `components/sections/MissionSection.tsx` - Update to medical center mission
- `lib/data/who-we-are-data.ts` - Update data to Deshet content

**Action:**
1. Search for "Tamra", "TSD", "NGO" in component files
2. Replace with Deshet Medical Center content
3. Update all hardcoded NGO references

**Verification:**
- View pages in browser to verify content
- Check that no NGO references remain

---

#### 1.3.3 Update Documentation Files
**Files to Update (Optional - can keep for reference):**
- `CODEBASE_OVERVIEW.md` - Update to reflect medical center
- `QUICK_START_GUIDE.md` - Update references
- Or mark as deprecated/archive

**Action:**
- Either update documentation or move to `/docs/archive/` folder
- Update README.md to reflect current state

---

### Step 1.4: Clean Up Unused Imports

#### 1.4.1 Run Linter to Find Unused Imports
**Action:**
```bash
# Run ESLint to find unused imports
npm run lint

# Or use TypeScript compiler
npx tsc --noEmit
```

**Fix:**
1. Remove unused imports from all files
2. Remove unused variables
3. Remove unused functions

**Verification:**
- No linting errors
- No TypeScript errors
- Code compiles successfully

---

#### 1.4.2 Remove Unused Dependencies
**File to Update:**
- `package.json`

**Action:**
1. Review dependencies in package.json
2. Identify unused packages (e.g., payment-related if removed)
3. Remove unused dependencies:
   ```bash
   npm uninstall <package-name>
   ```

**Verification:**
- Application still runs correctly
- No missing dependency errors

---

## Part 2: Update Environment Variables

### Step 2.1: Create/Update .env.local File

#### 2.1.1 Check for Existing .env Files
**Action:**
```bash
# Check for existing env files
ls -la | grep env
```

**Files to Check:**
- `.env`
- `.env.local`
- `.env.example`
- `.env.development`
- `.env.production`

---

#### 2.1.2 Create .env.local Template
**File to Create:** `.env.local`

**Required Variables:**
```env
# Base URL
NEXT_PUBLIC_BASE_URL=https://deshetmed.com

# Database
MONGODB_URI=mongodb://localhost:27017/deshet_medical_center
# OR for production:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/deshet_medical_center

# JWT Secret (generate a strong random string)
JWT_SECRET=your-strong-jwt-secret-key-here-min-32-characters

# Language Configuration
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,am

# Google Analytics (Optional)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Email Configuration (if using email features)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@deshetmed.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@deshetmed.com

# File Upload (if using cloud storage)
# NEXT_PUBLIC_UPLOAD_MAX_SIZE=5242880
# UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/webp

# Environment
NODE_ENV=development
```

**Action:**
1. Create `.env.local` file
2. Fill in all required variables
3. Generate secure JWT_SECRET (use: `openssl rand -base64 32`)
4. Update MongoDB URI with correct connection string
5. Add Google Analytics ID if available

**Verification:**
- Application reads environment variables correctly
- No undefined environment variable errors
- Database connection works

---

#### 2.1.3 Create .env.example File
**File to Create:** `.env.example`

**Purpose:** Template for other developers (without sensitive data)

**Content:**
```env
# Base URL
NEXT_PUBLIC_BASE_URL=https://deshetmed.com

# Database
MONGODB_URI=mongodb://localhost:27017/deshet_medical_center

# JWT Secret
JWT_SECRET=your-jwt-secret-key-here

# Language Configuration
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,am

# Google Analytics (Optional)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# Email Configuration
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# Environment
NODE_ENV=development
```

**Action:**
1. Create `.env.example` file
2. Add to version control (not .env.local)
3. Document in README.md

---

### Step 2.2: Update Code to Use Environment Variables

#### 2.2.1 Verify BASE_URL Usage
**Files to Check:**
- `lib/seo/metadata-config.ts` - Already uses `process.env.NEXT_PUBLIC_BASE_URL`
- All API routes that construct URLs
- All components that reference base URL

**Action:**
1. Search for hardcoded URLs
2. Replace with `process.env.NEXT_PUBLIC_BASE_URL`
3. Ensure all external links use environment variable

**Verification:**
- No hardcoded URLs in code
- All URLs use environment variables

---

#### 2.2.2 Verify MongoDB Connection
**File to Check:**
- `lib/db/mongodb.ts`

**Action:**
1. Verify it uses `process.env.MONGODB_URI`
2. Add error handling for missing URI
3. Test connection

**Verification:**
- Database connects successfully
- Error messages are clear if connection fails

---

#### 2.2.3 Verify JWT Secret Usage
**Files to Check:**
- `lib/auth/jwt.ts`
- `app/api/auth/login/route.ts`

**Action:**
1. Verify JWT_SECRET is used from environment
2. Add validation to ensure secret is set
3. Use strong secret in production

**Verification:**
- Authentication works correctly
- JWT tokens are generated and validated

---

## Part 3: Testing Checklist

### Step 3.1: Navigation Testing

#### 3.1.1 Test All Navigation Links
**Pages to Test:**
- [ ] Home (`/`)
- [ ] Who We Are (`/who-we-are`)
- [ ] Blog (`/blog`)
- [ ] Gallery (`/gallery`)
- [ ] Contact Us (`/contact-us`)
- [ ] Booking (`/booking`)
- [ ] Programs/Services (`/programs`)
- [ ] History (`/history`)

**Test Cases:**
1. Click each navigation link from header
2. Verify correct page loads
3. Verify active state highlights current page
4. Test mobile menu navigation
5. Test footer navigation links
6. Verify no 404 errors
7. Verify no broken internal links

**Expected Result:**
- All navigation links work correctly
- Active states display properly
- Mobile menu functions correctly
- No broken links

---

#### 3.1.2 Test Route Redirects
**Test Cases:**
1. Test old routes (if any redirects exist):
   - `/news` → `/blog` (if redirect exists)
   - `/donate` → `/booking` (if redirect exists)
   - `/volunteer` → 404 or redirect (should not exist)
2. Test invalid routes return 404
3. Test case-sensitive routes

**Expected Result:**
- Redirects work correctly
- 404 page displays for invalid routes
- No broken redirects

---

### Step 3.2: Language Switching Testing

#### 3.2.1 Test Language Switcher
**Test Cases:**
1. Click language switcher in header
2. Verify language changes immediately
3. Test switching between English and Amharic
4. Verify language preference persists (cookie)
5. Test language switcher in mobile menu
6. Refresh page and verify language persists
7. Test on different pages

**Expected Result:**
- Language switches correctly
- Preference persists across pages
- Cookie is set correctly
- Mobile menu switcher works

---

#### 3.2.2 Test Bilingual Content Display
**Pages to Test:**
- [ ] Home page
- [ ] Who We Are page
- [ ] Blog page
- [ ] Gallery page
- [ ] Contact Us page
- [ ] Booking page
- [ ] Programs page
- [ ] History page

**Test Cases:**
1. Switch to English - verify all text is in English
2. Switch to Amharic - verify all text is in Amharic
3. Check navigation labels
4. Check form labels
5. Check button text
6. Check error messages
7. Check success messages
8. Verify Amharic font renders correctly
9. Check page titles and metadata

**Expected Result:**
- All text translates correctly
- No hardcoded English text remains
- Amharic font displays properly
- All UI elements are translated

---

### Step 3.3: Booking Form Testing

#### 3.3.1 Test Booking Form Submission
**Test Cases:**
1. Fill out booking form with valid data
2. Submit form
3. Verify success message displays
4. Verify form data is saved to database
5. Check admin panel for new booking
6. Test form validation:
   - Empty required fields
   - Invalid email format
   - Invalid phone format
   - Invalid date (past dates)
   - Invalid time format
7. Test form reset after submission
8. Test with both languages

**Expected Result:**
- Form submits successfully
- Data is saved correctly
- Validation works properly
- Success/error messages display
- Admin can view bookings

---

#### 3.3.2 Test Booking Admin Panel
**Test Cases:**
1. Login to admin panel
2. Navigate to Bookings section
3. View booking list
4. View individual booking details
5. Update booking status (Pending, Confirmed, Completed, Cancelled)
6. Filter bookings by status
7. Search bookings
8. Delete booking (if implemented)

**Expected Result:**
- Bookings display correctly
- Status updates work
- Filters and search work
- All booking data is visible

---

### Step 3.4: Admin Panel Functionality Testing

#### 3.4.1 Test Admin Navigation
**Sections to Test:**
- [ ] Dashboard
- [ ] Landing Page
- [ ] History
- [ ] Pages
- [ ] Blog
- [ ] Services
- [ ] Bookings
- [ ] Products
- [ ] Gallery
- [ ] Contacts
- [ ] Leadership
- [ ] Testimonials
- [ ] Settings
- [ ] Users

**Test Cases:**
1. Click each sidebar menu item
2. Verify correct page loads
3. Verify no broken links
4. Test mobile admin menu
5. Verify role-based access (if applicable)

**Expected Result:**
- All admin sections accessible
- No broken links
- Navigation works smoothly

---

#### 3.4.2 Test Admin CRUD Operations
**Test Cases for Each Section:**

**Blog:**
- [ ] Create new blog post
- [ ] Edit existing blog post
- [ ] Delete blog post
- [ ] Publish/unpublish post
- [ ] Upload featured image
- [ ] Add categories and tags

**Services:**
- [ ] Create new service
- [ ] Edit existing service
- [ ] Delete service
- [ ] Upload service images
- [ ] Add service descriptions

**Products:**
- [ ] Create new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] Upload product images
- [ ] Add product details (ingredients, usage, etc.)

**Gallery:**
- [ ] Upload images
- [ ] Create categories
- [ ] Edit categories
- [ ] Delete images
- [ ] Bulk upload

**Bookings:**
- [ ] View bookings
- [ ] Update booking status
- [ ] View booking details
- [ ] Filter bookings

**Expected Result:**
- All CRUD operations work correctly
- Data persists in database
- Images upload successfully
- No errors during operations

---

#### 3.4.3 Test Admin Authentication
**Test Cases:**
1. Login with valid credentials
2. Login with invalid credentials
3. Verify JWT token is set
4. Test token expiration
5. Test logout
6. Test protected routes redirect to login
7. Test session persistence
8. Test role-based permissions

**Expected Result:**
- Authentication works correctly
- Protected routes are secured
- Sessions persist correctly
- Permissions work as expected

---

### Step 3.5: Responsive Design Testing

#### 3.5.1 Test on Different Screen Sizes
**Breakpoints to Test:**
- [ ] Mobile (320px - 640px)
- [ ] Tablet (641px - 1024px)
- [ ] Desktop (1025px+)
- [ ] Large Desktop (1440px+)

**Pages to Test:**
- [ ] Home page
- [ ] Who We Are page
- [ ] Blog page
- [ ] Gallery page
- [ ] Contact Us page
- [ ] Booking page
- [ ] Programs page
- [ ] Admin panel

**Test Cases:**
1. Verify layout adapts correctly
2. Test navigation menu (hamburger on mobile)
3. Test image responsiveness
4. Test form layouts
5. Test table responsiveness (admin)
6. Test modal dialogs
7. Test card layouts
8. Verify text readability
9. Test touch interactions (mobile)

**Expected Result:**
- Layout is responsive on all screen sizes
- No horizontal scrolling
- Text is readable
- Interactive elements are accessible
- Mobile menu works correctly

---

#### 3.5.2 Test on Different Browsers
**Browsers to Test:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Test Cases:**
1. Verify consistent appearance
2. Test functionality in each browser
3. Check for browser-specific issues
4. Test CSS compatibility
5. Test JavaScript functionality

**Expected Result:**
- Consistent appearance across browsers
- All functionality works
- No browser-specific bugs

---

### Step 3.6: Performance Testing

#### 3.6.1 Test Page Load Times
**Pages to Test:**
- [ ] Home page
- [ ] Blog listing page
- [ ] Blog detail page
- [ ] Gallery page
- [ ] Programs page
- [ ] Admin dashboard

**Test Cases:**
1. Measure initial page load time
2. Measure time to interactive
3. Test with slow network (throttle)
4. Test image loading
5. Test API response times
6. Check for unnecessary re-renders
7. Test lazy loading (if implemented)

**Expected Result:**
- Pages load within acceptable time (< 3s)
- Images load efficiently
- API responses are fast
- No performance bottlenecks

---

#### 3.6.2 Test Image Optimization
**Test Cases:**
1. Verify images use Next.js Image component
2. Check image formats (WebP, AVIF)
3. Test image lazy loading
4. Verify responsive images
5. Check image sizes (not too large)
6. Test image upload optimization

**Expected Result:**
- Images are optimized
- Fast loading times
- Proper formats used
- Responsive images work

---

### Step 3.7: SEO Testing

#### 3.7.1 Test Metadata
**Test Cases:**
1. Check page titles (unique for each page)
2. Check meta descriptions
3. Check Open Graph tags
4. Check Twitter Card tags
5. Verify canonical URLs
6. Check alternate language links
7. Test structured data (JSON-LD)

**Tools to Use:**
- Google Rich Results Test
- Facebook Sharing Debugger
- Twitter Card Validator

**Expected Result:**
- All metadata is correct
- Social sharing works correctly
- Structured data validates
- SEO best practices followed

---

#### 3.7.2 Test Sitemap and Robots.txt
**Test Cases:**
1. Verify sitemap.xml is accessible
2. Check all routes are in sitemap
3. Verify robots.txt is correct
4. Test sitemap submission to Google Search Console
5. Check for broken links in sitemap

**Expected Result:**
- Sitemap is valid and complete
- Robots.txt is configured correctly
- No broken links

---

### Step 3.8: Form Testing

#### 3.8.1 Test Contact Form
**Test Cases:**
1. Fill out contact form
2. Submit form
3. Verify validation:
   - Required fields
   - Email format
   - Phone format
4. Verify success message
5. Check email notification (if implemented)
6. Verify data saved to database
7. Test in admin panel (view contacts)
8. Test with both languages

**Expected Result:**
- Form submits successfully
- Validation works correctly
- Data is saved
- Admin can view submissions

---

#### 3.8.2 Test All Forms
**Forms to Test:**
- [ ] Contact form
- [ ] Booking form
- [ ] Admin login form
- [ ] Admin create/edit forms (Blog, Services, Products, etc.)

**Test Cases:**
1. Test all form fields
2. Test validation
3. Test error messages
4. Test success messages
5. Test form reset
6. Test file uploads
7. Test rich text editors

**Expected Result:**
- All forms work correctly
- Validation is comprehensive
- Error messages are clear
- File uploads work

---

### Step 3.9: API Testing

#### 3.9.1 Test Public API Routes
**Routes to Test:**
- [ ] `GET /api/public/landing`
- [ ] `GET /api/public/pages/blog`
- [ ] `GET /api/public/pages/services`
- [ ] `GET /api/public/products`
- [ ] `GET /api/public/blog`
- [ ] `GET /api/public/blog/[slug]`
- [ ] `GET /api/public/gallery`
- [ ] `POST /api/public/booking`
- [ ] `POST /api/public/contact`

**Test Cases:**
1. Test GET requests return correct data
2. Test POST requests save data correctly
3. Test error handling
4. Test response formats
5. Test pagination (if implemented)
6. Test filtering (if implemented)
7. Test authentication (public routes should not require auth)

**Expected Result:**
- All API routes work correctly
- Data is returned in correct format
- Error handling is proper
- No authentication required for public routes

---

#### 3.9.2 Test Admin API Routes
**Routes to Test:**
- [ ] All CRUD operations for each resource
- [ ] Authentication required
- [ ] Role-based permissions
- [ ] File upload endpoints
- [ ] Dashboard stats endpoint

**Test Cases:**
1. Test without authentication (should fail)
2. Test with valid authentication
3. Test CRUD operations
4. Test file uploads
5. Test role permissions
6. Test error responses

**Expected Result:**
- Authentication is required
- CRUD operations work
- Permissions are enforced
- File uploads work

---

### Step 3.10: Database Testing

#### 3.10.1 Test Database Operations
**Test Cases:**
1. Test database connection
2. Test create operations
3. Test read operations
4. Test update operations
5. Test delete operations
6. Test relationships between models
7. Test data validation
8. Test indexes

**Expected Result:**
- All database operations work
- Data integrity maintained
- Validation works
- Relationships are correct

---

#### 3.10.2 Test Data Migration
**Test Cases:**
1. Verify old data is migrated (if applicable)
2. Test data consistency
3. Verify no data loss
4. Test backward compatibility

**Expected Result:**
- Data migration successful
- No data loss
- Data is consistent

---

### Step 3.11: Error Handling Testing

#### 3.11.1 Test Error Pages
**Test Cases:**
1. Test 404 page (invalid route)
2. Test 500 page (server error)
3. Test error boundaries
4. Test API error responses
5. Test form validation errors
6. Test network error handling

**Expected Result:**
- Error pages display correctly
- Error messages are user-friendly
- Errors are logged (if implemented)
- No sensitive information exposed

---

#### 3.11.2 Test Edge Cases
**Test Cases:**
1. Test with empty database
2. Test with very long input
3. Test with special characters
4. Test with invalid file types
5. Test with missing required data
6. Test concurrent requests
7. Test rate limiting (if implemented)

**Expected Result:**
- Edge cases handled gracefully
- No crashes or errors
- User-friendly error messages

---

### Step 3.12: Accessibility Testing

#### 3.12.1 Test Accessibility Features
**Test Cases:**
1. Test keyboard navigation
2. Test screen reader compatibility
3. Test ARIA labels
4. Test color contrast
5. Test focus indicators
6. Test alt text for images
7. Test form labels
8. Test heading hierarchy

**Tools to Use:**
- WAVE (Web Accessibility Evaluation Tool)
- axe DevTools
- Lighthouse accessibility audit

**Expected Result:**
- Keyboard navigation works
- Screen reader compatible
- Good color contrast
- Proper ARIA labels
- WCAG 2.1 AA compliance (target)

---

### Step 3.13: Security Testing

#### 3.13.1 Test Security Features
**Test Cases:**
1. Test authentication security
2. Test authorization (role-based access)
3. Test SQL injection prevention (if using SQL)
4. Test XSS prevention
5. Test CSRF protection
6. Test file upload security
7. Test input sanitization
8. Test API rate limiting
9. Test sensitive data exposure

**Expected Result:**
- Authentication is secure
- Authorization works correctly
- No security vulnerabilities
- Input is sanitized
- File uploads are secure

---

## Part 4: Final Verification

### Step 4.1: Code Quality Check

#### 4.1.1 Run Linter
**Action:**
```bash
npm run lint
```

**Fix:**
- Fix all linting errors
- Fix all warnings
- Ensure code follows style guide

---

#### 4.1.2 Run TypeScript Check
**Action:**
```bash
npx tsc --noEmit
```

**Fix:**
- Fix all TypeScript errors
- Fix type issues
- Ensure type safety

---

#### 4.1.3 Run Build
**Action:**
```bash
npm run build
```

**Fix:**
- Fix all build errors
- Fix all build warnings
- Ensure production build succeeds

---

### Step 4.2: Documentation Update

#### 4.2.1 Update README.md
**Action:**
1. Update project description
2. Update installation instructions
3. Update environment variables documentation
4. Update deployment instructions
5. Update testing instructions

---

#### 4.2.2 Update API Documentation
**Action:**
1. Document all API endpoints
2. Document request/response formats
3. Document authentication requirements
4. Document error codes

---

### Step 4.3: Deployment Preparation

#### 4.3.1 Production Environment Variables
**Action:**
1. Set up production environment variables
2. Configure production database
3. Configure production domain
4. Set up SSL certificates
5. Configure CDN (if using)

---

#### 4.3.2 Production Build Test
**Action:**
1. Run production build locally
2. Test production build
3. Verify all features work
4. Check performance
5. Verify SEO

---

## Implementation Checklist

### Phase 12.1: Remove Deprecated Code
- [ ] Remove volunteer admin pages
- [ ] Remove volunteer API routes
- [ ] Remove volunteer database model
- [ ] Remove volunteer components
- [ ] Remove volunteer references
- [ ] Remove bank options admin page
- [ ] Remove bank options API routes
- [ ] Remove donation components
- [ ] Remove bank options model
- [ ] Remove donation seed scripts
- [ ] Update seed scripts (remove NGO references)
- [ ] Update component content (remove NGO references)
- [ ] Clean up unused imports
- [ ] Remove unused dependencies

### Phase 12.2: Update Environment Variables
- [ ] Create .env.local file
- [ ] Create .env.example file
- [ ] Update BASE_URL usage
- [ ] Verify MongoDB connection
- [ ] Verify JWT secret usage

### Phase 12.3: Testing
- [ ] Test all navigation links
- [ ] Test route redirects
- [ ] Test language switching
- [ ] Test bilingual content display
- [ ] Test booking form submission
- [ ] Test booking admin panel
- [ ] Test admin navigation
- [ ] Test admin CRUD operations
- [ ] Test admin authentication
- [ ] Test responsive design
- [ ] Test on different browsers
- [ ] Test page load times
- [ ] Test image optimization
- [ ] Test metadata
- [ ] Test sitemap and robots.txt
- [ ] Test contact form
- [ ] Test all forms
- [ ] Test public API routes
- [ ] Test admin API routes
- [ ] Test database operations
- [ ] Test data migration
- [ ] Test error pages
- [ ] Test edge cases
- [ ] Test accessibility
- [ ] Test security

### Phase 12.4: Final Verification
- [ ] Run linter
- [ ] Run TypeScript check
- [ ] Run build
- [ ] Update README.md
- [ ] Update API documentation
- [ ] Set up production environment
- [ ] Test production build

---

## Notes

1. **Backup Before Cleanup**: Always backup the codebase before removing files
2. **Gradual Removal**: Remove deprecated code gradually and test after each removal
3. **Version Control**: Commit changes frequently with clear messages
4. **Testing**: Test thoroughly after each major change
5. **Documentation**: Keep documentation updated as you make changes
6. **Environment Variables**: Never commit .env.local to version control
7. **Security**: Ensure all security best practices are followed
8. **Performance**: Monitor performance after cleanup

---

## Success Criteria

✅ All volunteer-related code removed
✅ All donation/payment code removed
✅ All NGO-specific content updated to Deshet Medical Center
✅ No unused imports or dependencies
✅ Environment variables properly configured
✅ All navigation links work correctly
✅ Language switching works on all pages
✅ Booking form works correctly
✅ Admin panel fully functional
✅ Responsive design works on all devices
✅ All forms work correctly
✅ All API routes work correctly
✅ No linting or TypeScript errors
✅ Production build succeeds
✅ Documentation is updated
✅ Ready for deployment

---

## Estimated Time

- **Part 1 (Remove Deprecated Code)**: 4-6 hours
- **Part 2 (Update Environment Variables)**: 1-2 hours
- **Part 3 (Testing)**: 8-12 hours
- **Part 4 (Final Verification)**: 2-3 hours

**Total Estimated Time**: 15-23 hours

---

## Next Steps After Phase 12

1. Deploy to staging environment
2. Perform user acceptance testing (UAT)
3. Fix any issues found during UAT
4. Deploy to production
5. Monitor production for issues
6. Gather user feedback
7. Plan future enhancements


