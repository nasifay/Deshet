<!-- 7d0aae9a-0c6e-4bb9-86c7-c4c959cb0bca c548e47b-69f5-4196-96f3-f070310896f0 -->
# Deshet Indigenous Medical Center - Website Transformation Plan

## Overview

Transform the Tamra NGO website template into Deshet Indigenous Medical Center with bilingual support (Amharic/English), updated branding, navigation restructuring, and medical center-focused admin panel.

---

## Phase 1: Branding & Design System

### 1.1 Color Palette Updates

**Files**: `app/globals.css`

- Change primary color from `#ff7a00` (orange) to `#128341` (primary-green)
- Add new secondary colors:
- Leaf Green: `#4F7C57` (secondary buttons, highlights)
- Forest Shadow: `#1C2F26` (footer, deep sections)
- Soft Cream: `#FFF9E8` (cards, section backgrounds)
- Update CSS variables: `--primary`, `--primary-green`, add `--secondary-green`, `--forest-shadow`, `--soft-cream`
- Replace all instances of `#ff7a00` with `#128341` or appropriate green variant
- Update `primary-green` class usage throughout components

### 1.2 Typography Updates

**Files**: `app/layout.tsx`, `app/globals.css`

- Add Google Fonts: Cormorant Garamond or Playfair Display (headings)
- Add Inter or Poppins (body text)
- Add Noto Serif Ethiopic (for Amharic headings)
- Update font variables in CSS
- Configure font loading in root layout

### 1.3 Logo Replacement

**File**: `public/logo.png` (already exists)

- Update logo references in:
- `components/layout/Header.tsx`
- `lib/seo/metadata-config.ts`
- `app/layout.tsx` (if used in metadata)

---

## Phase 2: Organization Information & Metadata

### 2.1 Core Organization Data

**File**: `lib/seo/metadata-config.ts`

- Update `ORGANIZATION` object:
- name: "Deshet Indigenous Medical Center"
- shortName: "Deshet" or "DIMC"
- description: "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing"
- email: placeholder (e.g., "info@deshetmed.com")
- phone: placeholder (e.g., "+251 XXX XXX XXX")
- address: Addis Ababa, Ethiopia (placeholder)
- socialMedia: Update with Deshet social links (placeholders)
- Update `BASE_URL` to "https://deshetmed.com"
- Update all `PAGE_METADATA` entries with Deshet content
- Update `DEFAULT_KEYWORDS` for medical/herbal focus

### 2.2 Package.json

**File**: `package.json`

- Update project name from "ngo-site" to "deshet-medical-center"

---

## Phase 3: Navigation & Routes

### 3.1 Navigation Menu Updates

**Files**: `lib/constants.ts`, `components/layout/Header.tsx`

- Update `NAV_ITEMS` array:
- Keep: Home, Who we are, Gallery, Contact us
- Change: "News" → "Blog" (route: `/news` → `/blog`)
- Change: "Donate" → "Booking" (route: `/donate` → `/booking`)
- Remove: "Volunteer" completely
- Update Header component dropdown items
- Update mobile menu navigation
- Update active route highlighting

### 3.2 Route Structure Changes

**Files**: Multiple route files

- Rename `/app/(user-side)/news/` → `/app/(user-side)/blog/`
- Rename `/app/(user-side)/donate/` → `/app/(user-side)/booking/`
- Remove `/app/(user-side)/volunteer/` directory
- Update all internal links and references
- Update API routes: `/api/public/pages/news` → `/api/public/pages/blog`
- Update API routes: `/api/public/pages/donate` → `/api/public/pages/booking`

### 3.3 Footer Updates

**File**: `components/layout/Footer.tsx`

- Update navigation links
- Update organization name and tagline
- Add social media links (placeholders)
- Update copyright text

---

## Phase 4: Bilingual Support (Amharic/English)

### 4.1 Language System Setup

**Files**: Create `lib/i18n/` directory structure

- Create `lib/i18n/config.ts` - Language configuration
- Create `lib/i18n/translations/am.ts` - Amharic translations
- Create `lib/i18n/translations/en.ts` - English translations
- Create `lib/i18n/hooks.ts` - useTranslation hook
- Create `lib/i18n/utils.ts` - Translation utilities

### 4.2 Language Switcher Component

**File**: `components/ui/LanguageSwitcher.tsx`

- Create language toggle component
- Add to Header component
- Store language preference in localStorage/cookies

### 4.3 Update Components for Translations

**Files**: All page components and sections

- Wrap text content with translation functions
- Add translation keys for all user-facing text
- Update metadata to support both languages
- Create bilingual content structure

---

## Phase 5: Content Updates

### 5.1 Landing Page

**File**: `app/(user-side)/(landing)/page.tsx`

- Update section components:
- HeroSection: Medical center hero content
- AboutSection: Deshet introduction
- ProgramAreasSection → ServicesSection: Medical services
- Remove/Update: KeyFundersSection, SupportersSection (adapt for medical context)
- Remove: VolunteerBanner
- Update: NewsEventsSection → BlogSection
- Keep: TestimonialsSection

### 5.2 About/Who We Are Page

**File**: `app/(user-side)/who-we-are/page.tsx`

- Update content sections:
- Mission, Vision, Values (medical center focus)
- Leadership section (practitioners instead of board)
- History section (medical center history)
- Remove NGO-specific sections

### 5.3 Blog Page (formerly News)

**File**: `app/(user-side)/blog/page.tsx` (renamed from news)

- Update page title and metadata
- Update content structure for blog posts
- Keep same functionality, update labels

### 5.4 Booking Page (formerly Donate)

**File**: `app/(user-side)/booking/page.tsx` (renamed from donate)

- Transform donation form to appointment booking form
- Update form fields:
- Name, Phone, Email
- Preferred Date & Time
- Service Type (dropdown)
- Health Concern Description
- Call-back option
- Remove bank account/payment options
- Update API endpoint: `/api/public/pages/booking`
- Create booking API: `/api/public/booking` or `/api/booking`

### 5.5 Services Page (formerly Programs)

**File**: `app/(user-side)/programs/page.tsx` (keep route, update content)

- Update to medical services:
- Traditional Medical Consultation
- Herbal Medicine Preparation
- Detox & Cleansing Therapy
- Traditional Diagnostic Techniques
- Healing Treatments
- Update admin labels from "Programs" to "Services"

### 5.6 Products Page

**File**: Create `app/(user-side)/products/page.tsx`

- Create new products page for herbal products
- Display product catalog
- Product details: ingredients, usage, benefits, safety notes
- Connect to admin panel for product management

### 5.7 Contact Page

**File**: `app/(user-side)/contact-us/page.tsx`

- Update contact information (placeholders)
- Update working hours
- Keep contact form functionality

---

## Phase 6: Admin Panel Restructuring

### 6.1 Admin Navigation Updates

**File**: `app/admin/components/Sidebar.tsx`

- Update menu labels:
- "News" → "Blog"
- "Programs" → "Services"
- "Donate" → "Bookings" (new section)
- Remove: "Volunteers"
- Add: "Products" (new section)
- Update icons and routes

### 6.2 Admin Dashboard

**File**: `app/admin/page.tsx`

- Update welcome message: "Deshet Medical Center Admin Dashboard"
- Update stat cards:
- "News & Events" → "Blog Posts"
- "Programs" → "Services"
- Add: "Bookings" count
- Add: "Products" count
- Remove: "Volunteers"
- Update quick actions

### 6.3 Blog Management (formerly News)

**Files**: `app/admin/blog/` (rename from news)

- Rename directory: `app/admin/news/` → `app/admin/blog/`
- Update all file references
- Update labels: "News" → "Blog", "Post" → "Article"
- Keep same CRUD functionality

### 6.4 Services Management (formerly Programs)

**Files**: `app/admin/services/` (rename from programs)

- Rename directory: `app/admin/programs/` → `app/admin/services/`
- Update labels: "Programs" → "Services"
- Update form fields for medical services
- Keep same CRUD functionality

### 6.5 Bookings Management (new)

**Files**: Create `app/admin/bookings/`

- Create booking list page
- Create booking detail/view page
- Display: Name, Phone, Email, Date/Time, Service, Status
- Add status management (Pending, Confirmed, Completed, Cancelled)
- Create API: `app/api/admin/bookings/`

### 6.6 Products Management (new)

**Files**: Create `app/admin/products/`

- Create product list page
- Create product create/edit pages
- Form fields: Name, Description, Ingredients, Usage Instructions, Benefits, Safety Notes, Images, Price (optional)
- Create API: `app/api/admin/products/`
- Create database model: `lib/db/models/Product.ts`

### 6.7 Update Other Admin Sections

**Files**: Various admin files

- Update "Volunteers" references (remove or hide)
- Update "Key Funders" → "Partners" or "Sponsors" (if keeping)
- Update "Supporters" section labels
- Update footer admin section

---

## Phase 7: Database Models

### 7.1 New Models

**Files**: `lib/db/models/`

- Create `Product.ts` model:
- name (Amharic/English)
- description
- ingredients
- usageInstructions
- benefits
- safetyNotes
- images
- price (optional)
- category
- isActive

- Create `Booking.ts` model:
- name
- phone
- email
- preferredDate
- preferredTime
- serviceType
- healthConcern
- status (pending, confirmed, completed, cancelled)
- notes

### 7.2 Update Existing Models

**Files**: `lib/db/models/`

- Update `NewsPost.ts` → `BlogPost.ts` (rename or add alias)
- Update `Program.ts` → `Service.ts` (rename or add alias)
- Update field names and descriptions
- Remove `Volunteer.ts` model or mark as deprecated

### 7.3 Database Connection

**File**: `lib/db/mongodb.ts`

- Update model imports
- Ensure new models are registered

---

## Phase 8: API Routes

### 8.1 Public API Updates

**Files**: `app/api/public/`

- Rename: `pages/news` → `pages/blog`
- Rename: `pages/donate` → `pages/booking`
- Create: `bookings/route.ts` - POST for appointment submissions
- Create: `products/route.ts` - GET for product listings
- Update: `pages/programs` → `pages/services` (or keep alias)

### 8.2 Admin API Updates

**Files**: `app/api/admin/`

- Rename: `news/` → `blog/` (update all routes)
- Rename: `programs/` → `services/` (update all routes)
- Create: `bookings/` - CRUD for bookings
- Create: `products/` - CRUD for products
- Remove: `volunteers/` routes (or mark deprecated)

### 8.3 Update API References

**Files**: All components using API

- Update fetch URLs
- Update API response handling
- Update error messages

---

## Phase 9: Component Updates

### 9.1 Section Components

**Files**: `components/sections/`

- Update `hero-section.tsx` - Medical center hero
- Update `about-section.tsx` - Deshet introduction
- Update `program-areas-section.tsx` → `services-section.tsx`
- Update `news-events-section.tsx` → `blog-section.tsx`
- Remove `volunteerBanner.tsx` or repurpose
- Update `key-funders-section.tsx` - Adapt for medical context
- Update `supporters-section.tsx` - Adapt for medical context

### 9.2 UI Components

**Files**: `components/ui/`

- Create `LanguageSwitcher.tsx`
- Update `Button.tsx` - Ensure color variants work
- Update form components for booking form
- Create `ProductCard.tsx` for products display

### 9.3 Layout Components

**Files**: `components/layout/`

- Update `Header.tsx` - Navigation, logo, language switcher
- Update `Footer.tsx` - Links, content, social media

---

## Phase 10: Styling & Design Elements

### 10.1 Cultural Design Patterns

**Files**: `app/globals.css`, component files

- Add Ethiopian cultural border patterns (subtle)
- Add background textures (optional)
- Update section dividers with cultural elements
- Ensure modern, premium feel

### 10.2 Image Assets

**Directory**: `public/images/`

- Replace NGO images with medical/herbal images
- Add herbal medicine, plants, traditional tools images
- Update hero images
- Update section background images

### 10.3 Iconography

**Files**: Component files

- Update icons to medical/herbal theme
- Use leaf, mortar & pestle, hands, nature symbols
- Gold outline style for icons

---

## Phase 11: SEO & Metadata

### 11.1 Update All Page Metadata

**Files**: All page files

- Update titles, descriptions for medical center
- Update Open Graph images
- Update Twitter cards
- Add bilingual metadata support

### 11.2 JSON-LD Schema

**File**: `lib/seo/json-ld.ts`

- Update organization schema for medical center
- Add MedicalBusiness schema
- Update structured data

### 11.3 Sitemap & Robots

**Files**: `app/sitemap.ts`, `app/robots.ts`

- Update sitemap with new routes
- Remove volunteer routes
- Add blog, booking, products routes

---

## Phase 12: Testing & Cleanup

### 12.1 Remove Deprecated Code

- Remove volunteer-related files
- Remove donation/payment code
- Clean up unused imports
- Remove old NGO-specific content

### 12.2 Update Environment Variables

**File**: `.env.local` (create if needed)

- Update `NEXT_PUBLIC_BASE_URL` to `https://deshetmed.com`
- Add language configuration
- Update MongoDB connection if needed

### 12.3 Testing Checklist

- Test all navigation links
- Test language switching
- Test booking form submission
- Test admin panel functionality
- Test responsive design
- Test bilingual content display
- Verify all routes work correctly

---

## Implementation Order

1. **Phase 1**: Branding (colors, fonts, logo) - Foundation
2. **Phase 2**: Organization metadata - Core identity
3. **Phase 3**: Navigation & routes - Structure
4. **Phase 7**: Database models - Data layer
5. **Phase 8**: API routes - Backend
6. **Phase 6**: Admin panel - Management
7. **Phase 5**: Content pages - Frontend
8. **Phase 9**: Components - UI updates
9. **Phase 4**: Bilingual support - Internationalization
10. **Phase 10**: Styling & design - Polish
11. **Phase 11**: SEO - Optimization
12. **Phase 12**: Testing & cleanup - Finalization

---

## Notes

- Keep existing admin authentication system
- Maintain existing component structure where possible
- Use placeholder content where real data not available
- Ensure backward compatibility during transition
- Test each phase before moving to next
- Keep database migrations in mind for production 