# Phase 4: Bilingual Support (Amharic/English) - Step-by-Step Implementation

## Overview
This document outlines the detailed step-by-step implementation for Phase 4: Bilingual Support (Amharic/English) for the Deshet Indigenous Medical Center website.

## Current State Analysis

### ✅ Already Implemented
1. **i18n Infrastructure** (`lib/i18n/`)
   - `config.ts` - Language configuration (en, am)
   - `hooks.ts` - React hooks (`useTranslation`, `useLocale`)
   - `utils.ts` - Translation utilities
   - `server.ts` - Server-side locale detection
   - `translations/en.ts` - English translations (partial)
   - `translations/am.ts` - Amharic translations (partial)

2. **Components**
   - `LanguageSwitcher.tsx` - Language switcher component (exists but not integrated)
   - `TranslationProviderWrapper.tsx` - Provider wrapper (integrated in root layout)

3. **Middleware**
   - Locale detection from cookies/headers
   - Cookie-based language preference storage

### ❌ Not Yet Implemented
1. LanguageSwitcher not added to Header component
2. No components use `useTranslation` hook
3. All text is hardcoded in English
4. Translation files missing many keys
5. Metadata not bilingual-aware

---

## Implementation Steps

### Step 1: Add LanguageSwitcher to Header Component
**File**: `components/layout/Header.tsx`

**Tasks**:
- Import `LanguageSwitcher` component
- Add LanguageSwitcher to desktop navigation (next to Booking button)
- Add LanguageSwitcher to mobile menu
- Ensure proper styling and positioning

**Expected Result**: Users can switch languages from the header

---

### Step 2: Update Header Component with Translations
**File**: `components/layout/Header.tsx`

**Tasks**:
- Import `useTranslation` hook
- Replace hardcoded navigation labels with `t('nav.home')`, `t('nav.whoWeAre')`, etc.
- Update dropdown items to use translations
- Update mobile menu items to use translations
- Update Booking button text

**Translation Keys Needed**:
- `nav.home`
- `nav.whoWeAre`
- `nav.aboutUs`
- `nav.history`
- `nav.programs`
- `nav.blog`
- `nav.gallery`
- `nav.contactUs`
- `nav.booking`

---

### Step 3: Update Footer Component with Translations
**File**: `components/layout/Footer.tsx`

**Tasks**:
- Import `useTranslation` hook
- Replace hardcoded text with translation keys
- Update navigation links
- Update footer text (organization name, tagline, etc.)

**Translation Keys Needed**:
- `footer.organizationName`
- `footer.tagline`
- `footer.description`
- `footer.quickLinks`
- `footer.contact`
- `footer.followUs`
- `footer.copyright`
- `footer.address`
- `footer.phone`
- `footer.email`
- All navigation items (reuse from nav)

---

### Step 4: Expand Translation Files
**Files**: `lib/i18n/translations/en.ts`, `lib/i18n/translations/am.ts`

**Tasks**:
- Add missing translation keys for all pages
- Add keys for section components
- Add keys for form labels and buttons
- Add keys for error/success messages
- Add keys for common UI elements
- Ensure all keys exist in both languages

**New Translation Categories Needed**:
- `pages` - Page-specific translations
- `forms` - Form labels and messages
- `sections` - Section component translations
- `errors` - Error messages
- `gallery` - Gallery page translations
- `programs` - Programs/services page translations
- `history` - History page translations

---

### Step 5: Update Hero Section Component
**File**: `components/sections/hero-section.tsx`

**Tasks**:
- Import `useTranslation` hook
- Add fallback translations for default hero content
- Use translations for CTA button text
- Note: Hero title/subtitle come from API, but we can add fallbacks

**Translation Keys**:
- `home.hero.cta` (already exists)
- `home.hero.ctaSecondary` (already exists)

---

### Step 6: Update About Section Component
**File**: `components/sections/about-section.tsx`

**Tasks**:
- Import `useTranslation` hook
- Use translations for CTA button text
- Add translation support for section title (if not from API)

---

### Step 7: Update Contact Page
**File**: `app/(user-side)/contact-us/page.tsx`

**Tasks**:
- Import `useTranslation` hook
- Replace all form labels with translations
- Replace error/success messages with translations
- Update page title and subtitle
- Update contact info labels

**Translation Keys**:
- `contact.title`
- `contact.subtitle`
- `contact.form.name`
- `contact.form.email`
- `contact.form.phone`
- `contact.form.subject`
- `contact.form.message`
- `contact.form.send`
- `contact.form.sending`
- `contact.form.success`
- `contact.form.error`
- `contact.info.address`
- `contact.info.phone`
- `contact.info.email`
- `contact.info.hours`

---

### Step 8: Update Booking Page
**File**: `app/(user-side)/booking/page.tsx`

**Tasks**:
- Import `useTranslation` hook
- Replace all form labels with translations
- Replace error/success messages with translations
- Update page title and subtitle

**Translation Keys**:
- `booking.title`
- `booking.subtitle`
- `booking.form.name`
- `booking.form.phone`
- `booking.form.email`
- `booking.form.preferredDate`
- `booking.form.preferredTime`
- `booking.form.serviceType`
- `booking.form.healthConcern`
- `booking.form.callback`
- `booking.form.submit`
- `booking.form.submitting`
- `booking.form.success`
- `booking.form.error`

---

### Step 9: Update Other Section Components
**Files**: 
- `components/sections/program-areas-section.tsx`
- `components/sections/news-events-section.tsx`
- `components/sections/TestimonialSection.tsx`
- `components/sections/statistics-section.tsx`
- `components/sections/achievements-section.tsx`
- `components/sections/key-funders-section.tsx`
- `components/sections/supporters-section.tsx`

**Tasks**:
- Import `useTranslation` hook where needed
- Replace hardcoded text with translation keys
- Add translation keys for section titles and labels

---

### Step 10: Update Other Pages
**Files**:
- `app/(user-side)/who-we-are/page.tsx`
- `app/(user-side)/history/page.tsx`
- `app/(user-side)/programs/page.tsx`
- `app/(user-side)/blog/page.tsx`
- `app/(user-side)/gallery/page.tsx`

**Tasks**:
- Import `useTranslation` hook
- Replace hardcoded text with translations
- Add translation keys for page-specific content

---

### Step 11: Update Metadata for Bilingual Support
**Files**: 
- `lib/seo/metadata-config.ts`
- `app/layout.tsx`

**Tasks**:
- Update metadata generation to support locale
- Add alternate language links in metadata
- Update page metadata functions to accept locale parameter
- Ensure SEO works for both languages

---

### Step 12: Testing & Validation
**Tasks**:
- Test language switching on all pages
- Verify translations appear correctly
- Test that language preference persists (cookie)
- Verify mobile menu language switcher works
- Test form submissions with both languages
- Check that all text is translated (no hardcoded English)
- Verify Amharic font rendering correctly
- Test responsive design with both languages

---

## Translation Key Structure

```
{
  nav: { ... },
  common: { ... },
  footer: { ... },
  home: {
    hero: { ... },
    about: { ... },
    services: { ... },
    testimonials: { ... },
    blog: { ... }
  },
  contact: { ... },
  booking: { ... },
  pages: {
    whoWeAre: { ... },
    history: { ... },
    programs: { ... },
    blog: { ... },
    gallery: { ... }
  },
  sections: {
    programs: { ... },
    news: { ... },
    testimonials: { ... },
    statistics: { ... },
    achievements: { ... }
  },
  forms: { ... },
  errors: { ... },
  meta: { ... }
}
```

---

## Implementation Order

1. ✅ Step 1: Add LanguageSwitcher to Header
2. ✅ Step 2: Update Header with translations
3. ✅ Step 3: Update Footer with translations
4. ✅ Step 4: Expand translation files (do this in parallel with other steps)
5. ✅ Step 5-9: Update components
6. ✅ Step 10: Update pages
7. ✅ Step 11: Update metadata
8. ✅ Step 12: Testing

---

## Notes

- **API Content**: Some content comes from the API (e.g., hero section, about section). For these, we should:
  - Store bilingual content in the database, OR
  - Use translations as fallbacks when API content is not available, OR
  - Store content with locale field in database
  
- **Font Loading**: Amharic font (Noto Serif Ethiopic) is already configured in `app/layout.tsx`

- **Locale Detection**: Middleware already handles locale detection from cookies and headers

- **Cookie Storage**: Language preference is stored in `deshet_lang` cookie (1 year expiry)

- **Path-based vs Cookie-based**: Currently using cookie-based approach. Path-based (`/en/...`, `/am/...`) can be added later if needed.

---

## Success Criteria

✅ Language switcher visible and functional in header
✅ All navigation items translated
✅ All page content translated
✅ All form labels and messages translated
✅ Language preference persists across page navigation
✅ Amharic text renders correctly with proper font
✅ No hardcoded English text visible
✅ Mobile menu language switcher works
✅ All user-facing text supports both languages







