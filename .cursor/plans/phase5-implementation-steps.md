# Phase 5: Content Updates - Step-by-Step Implementation

## Overview
Transform all content pages from NGO focus to Deshet Indigenous Medical Center focus.

---

## Step 1: Landing Page Updates ✅

### 1.1 Update Landing Page Component
**File**: `app/(user-side)/(landing)/page.tsx`
- Remove `VolunteerBanner` component
- Update `ProgramAreasSection` → Keep for now (will be renamed to ServicesSection later)
- Update `NewsEventsSection` → Keep for now (will be renamed to BlogSection later)
- Keep `KeyFundersSection` and `SupportersSection` (adapt for medical context later)

### 1.2 Update Hero Section
**File**: `components/sections/hero-section.tsx`
- Update default title: "SERVING" → "HEALING"
- Update default subtitle: "ETHIOPIAN YOUTH" → "WITH TRADITIONAL MEDICINE"
- Update CTA text: "Contact Us" → "Book Appointment" or "Learn More"
- Update CTA link: "/contact-us" → "/booking" or "/contact-us"

### 1.3 Update About Section
**File**: `components/sections/about-section.tsx`
- Update default title: "ABOUT US" → "ABOUT DESHET"
- Update default content to Deshet medical center description
- Update CTA link to "/who-we-are"

### 1.4 Transform ProgramAreasSection → ServicesSection
**File**: `components/sections/program-areas-section.tsx`
- Rename component to `ServicesSection`
- Update default programs to medical services:
  - Traditional Medical Consultation
  - Herbal Medicine Preparation
  - Detox & Cleansing Therapy
  - Traditional Diagnostic Techniques
- Update links to "/programs" (which will show services)

### 1.5 Update NewsEventsSection → BlogSection
**File**: `components/sections/news-events-section.tsx`
- Update title: "NEWS AND EVENTS" → "BLOG & UPDATES"
- Update link from "/news" → "/blog"
- Update API endpoint from "/api/public/news" → "/api/public/blog"

### 1.6 Adapt KeyFundersSection for Medical Context
**File**: `components/sections/key-funders-section.tsx`
- Update title: "Key Funders" → "Partners" or "Medical Partners"
- Keep same functionality, just update labels

### 1.7 Adapt SupportersSection for Medical Context
**File**: `components/sections/supporters-section.tsx`
- Update title: "Our Networks & Memberships" → "Our Medical Partners" or "Certifications"
- Keep same functionality

### 1.8 Remove VolunteerBanner
**File**: `app/(user-side)/(landing)/page.tsx`
- Remove import and component usage

---

## Step 2: About/Who We Are Page Updates

### 2.1 Update About Page Content
**File**: `app/(user-side)/who-we-are/page.tsx`
- Update page to fetch medical center data
- Update section components for medical context

### 2.2 Update About Hero Section
**File**: `components/sections/who-we-are/about-hero-section.tsx`
- Update default title and content for Deshet medical center
- Update description to medical center focus

### 2.3 Update Vision/Mission Section
**File**: `components/sections/who-we-are/VisionMissionSection.tsx`
- Update vision and mission text for medical center
- Update images if needed

### 2.4 Update Core Values Section
**File**: `components/sections/who-we-are/CoreValuesSection.tsx`
- Update core values to medical center values
- Update data source

### 2.5 Update Leadership Section
**File**: `components/sections/who-we-are/LeadershipSection.tsx`
- Update to show practitioners instead of board members
- Update labels and descriptions

### 2.6 Remove/Update NGO-Specific Sections
- BoardMemberSection → Update or remove
- TargetGroupSection → Update for medical context
- OperationRegionsSection → Update for medical center locations

---

## Step 3: Blog Page (formerly News)

### 3.1 Update Blog Page
**File**: `app/(user-side)/news/page.tsx` (will be renamed to blog later)
- Update page title: "NEWS AND EVENTS" → "BLOG & UPDATES"
- Update API endpoint: "/api/public/pages/news" → "/api/public/pages/blog"
- Update subtitle text for blog context

### 3.2 Update Blog Detail Page
**File**: `app/(user-side)/news/[id]/page.tsx`
- Update labels from "News" to "Blog"
- Update API endpoint: "/api/public/news/" → "/api/public/blog/"
- Update breadcrumbs

### 3.3 Update Blog Layout
**File**: `app/(user-side)/news/layout.tsx`
- Update metadata references

---

## Step 4: Booking Page (formerly Donate)

### 4.1 Transform Donate Page to Booking Page
**File**: `app/(user-side)/donate/page.tsx` (will be renamed to booking later)
- Change page title: "DONATE" → "BOOK APPOINTMENT"
- Remove bank account information
- Remove donation amount fields
- Add booking form fields:
  - Name (keep)
  - Phone (keep)
  - Email (keep)
  - Preferred Date (date picker)
  - Preferred Time (time picker)
  - Service Type (dropdown)
  - Health Concern Description (textarea)
  - Call-back option (checkbox)

### 4.2 Update Booking Form Submission
- Update API endpoint: "/api/public/pages/donate" → "/api/public/pages/booking"
- Create new booking submission endpoint: "/api/public/booking"
- Update form submission logic

### 4.3 Update Booking Layout
**File**: `app/(user-side)/donate/layout.tsx`
- Update metadata for booking page
- Update breadcrumbs

---

## Step 5: Services Page (formerly Programs)

### 5.1 Update Programs Page Content
**File**: `app/(user-side)/programs/page.tsx`
- Update to show medical services instead of NGO programs
- Update service categories:
  - Traditional Medical Consultation
  - Herbal Medicine Preparation
  - Detox & Cleansing Therapy
  - Traditional Diagnostic Techniques
  - Healing Treatments

### 5.2 Update Programs Layout
**File**: `app/(user-side)/programs/layout.tsx`
- Update metadata for services
- Update page title and descriptions

### 5.3 Update Programs List Component
**File**: `app/(user-side)/programs/@programsList/page.tsx`
- Update to fetch and display services
- Update API endpoint: "/api/public/pages/programs" → "/api/public/pages/services"

---

## Step 6: Products Page (New)

### 6.1 Create Products Page
**File**: `app/(user-side)/products/page.tsx` (NEW)
- Create new page for herbal products catalog
- Display product grid/list
- Product card component with:
  - Product image
  - Product name
  - Brief description
  - Price (optional)
  - View details link

### 6.2 Create Product Detail Page
**File**: `app/(user-side)/products/[id]/page.tsx` (NEW)
- Display full product details:
  - Name (Amharic/English)
  - Description
  - Ingredients
  - Usage Instructions
  - Benefits
  - Safety Notes
  - Images gallery
  - Price (optional)

### 6.3 Create Products Layout
**File**: `app/(user-side)/products/layout.tsx` (NEW)
- Add metadata for products page
- Add breadcrumbs

### 6.4 Create Product Components
**File**: `components/ui/ProductCard.tsx` (NEW)
- Create reusable product card component
- Display product information in card format

---

## Step 7: Contact Page Updates

### 7.1 Update Contact Information
**File**: `app/(user-side)/contact-us/page.tsx`
- Update phone number: "+251 911 121314" → Deshet phone (placeholder)
- Update email: "hello@tsd.com" → "info@deshetmed.com" (placeholder)
- Update address/location for medical center
- Update working hours section
- Keep contact form functionality

### 7.2 Update Contact Page Content
- Update page title and description
- Update map location if needed

---

## Implementation Order

1. ✅ Landing Page Updates (Step 1)
2. ⏳ About/Who We Are Page (Step 2)
3. ⏳ Blog Page (Step 3)
4. ⏳ Booking Page (Step 4)
5. ⏳ Services Page (Step 5)
6. ⏳ Products Page (Step 6)
7. ⏳ Contact Page (Step 7)

---

## Notes

- Use placeholder content where real data is not available
- Maintain existing component structure where possible
- Update API endpoints as needed (some may need to be created in Phase 8)
- Test each page after updates
- Ensure responsive design is maintained








