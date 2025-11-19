# Quick Start Guide - Adapting This Template

## 🎯 Essential Changes (Do These First)

### 1. Organization Information
**File**: `lib/seo/metadata-config.ts`
```typescript
// Lines 8-29: Update ORGANIZATION object
export const ORGANIZATION = {
  name: "Your Organization Name",        // ← Change this
  shortName: "YON",                       // ← Change this
  description: "Your description...",     // ← Change this
  email: "your@email.com",                // ← Change this
  phone: "+1234567890",                   // ← Change this
  address: { ... },                        // ← Update address
  logo: `${BASE_URL}/logo.svg`,           // ← Ensure logo exists
  socialMedia: { ... }                     // ← Update social links
};

// Line 4-5: Update BASE_URL
export const BASE_URL = "https://yourdomain.com";  // ← Change this
```

### 2. Logo
**Action**: Replace `/public/logo.svg` with your logo file

### 3. Navigation Menu
**File**: `lib/constants.ts`
```typescript
// Lines 1-9: Update navigation items
export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },      // ← Customize routes
  { href: "/services", label: "Services" }, // ← Add/remove items
  // ... etc
] as const;
```

**Also update**: `components/layout/Header.tsx` (lines 22-26, 177-181) if dropdown structure changes

### 4. Colors & Branding
**Files to search and replace**:
- `#ff7a00` → Your primary color (orange currently)
- `primary-green` → Your secondary color (green currently)
- `#0f6d35` → Dark green variant

**Main files**:
- `components/layout/Header.tsx` - Navigation colors
- `app/globals.css` - Global color definitions
- `components/sections/*.tsx` - Section components

### 5. Environment Variables
**Create**: `.env.local` file in root directory
```env
MONGODB_URI=mongodb://localhost:27017/your_database
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
JWT_SECRET=generate-a-random-secret-key-here
```

---

## 📄 Page Content Updates

### Landing Page
**File**: `app/(user-side)/(landing)/page.tsx`
- Update section components or modify them in `components/sections/`

**Section Components** (in `components/sections/`):
- `hero-section.tsx` - Hero banner
- `about-section.tsx` - About preview
- `statistics-section.tsx` - Stats/numbers
- `program-areas-section.tsx` - Programs/services
- `news-events-section.tsx` - Latest news
- `certifications-section.tsx` - Certifications display
- `medical-partners-section.tsx` - Medical partners & recognition
- `TestimonialSection.tsx` - Testimonials

### About/Who We Are Page
**File**: `app/(user-side)/who-we-are/page.tsx`
**Components**: `components/sections/who-we-are/*.tsx`

### Programs Page
**File**: `app/(user-side)/programs/page.tsx`
**Data**: Managed via admin panel or database

### News Page
**File**: `app/(user-side)/news/page.tsx`
**Data**: Managed via admin panel (`/admin/news`)

### Gallery Page
**File**: `app/(user-side)/gallery/page.tsx`
**Data**: Managed via admin panel (`/admin/gallery`)

### Contact Page
**File**: `app/(user-side)/contact-us/page.tsx`
**API**: `app/api/public/contact/route.ts`

### Donate Page
**File**: `app/(user-side)/donate/page.tsx`
**Bank Options**: Managed via admin panel (`/admin/bank-options`)

### Volunteer Page
**File**: `app/(user-side)/volunteer/page.tsx`
**API**: `app/api/volunteer/route.ts`

---

## 🎨 Styling Changes

### Global Styles
**File**: `app/globals.css`
- Update CSS variables for colors
- Modify Tailwind theme if needed

### Component Styles
- Most styling uses Tailwind classes
- Search for color codes: `#ff7a00`, `primary-green`, `#0f6d35`
- Update in individual component files

---

## 🗄️ Database Setup

### 1. Install MongoDB
- Local: Install MongoDB locally
- Cloud: Use MongoDB Atlas (free tier available)

### 2. Update Connection
**File**: `lib/db/mongodb.ts`
- Line 17-18: Default connection string (or use env variable)

### 3. Seed Initial Data (Optional)
```bash
npm run seed              # Full seed
npm run seed:landing      # Landing page content
npm run seed:programs     # Programs
npm run seed:news         # News posts
npm run seed:gallery      # Gallery images
```

---

## 👤 Admin Panel Setup

### 1. Create Admin User
**Option A**: Use seed script (if available)
**Option B**: Create via API or directly in database

### 2. Access Admin
- URL: `http://localhost:3000/admin/login`
- Default routes protected by middleware

### 3. Admin Sections
- `/admin` - Dashboard
- `/admin/news` - Manage news
- `/admin/programs` - Manage programs
- `/admin/gallery` - Manage gallery
- `/admin/users` - User management
- `/admin/settings` - Site settings

---

## 🔍 Search & Replace Checklist

Use "Find and Replace" in your editor for these:

1. **"Tamra"** or **"Tamra for Social Development"** → Your org name
2. **"TSD"** → Your org abbreviation
3. **"tamra-sdt.org"** → Your domain
4. **"tamra_sdt"** → Your org identifier
5. **"Ethiopia"** → Your location (if different)
6. **"#ff7a00"** → Your primary color hex code
7. **"primary-green"** → Your secondary color class name

---

## 📦 Package.json Updates

**File**: `package.json`
- Line 2: `"name": "your-project-name"`

---

## 🚀 Deployment Checklist

Before deploying:

- [ ] All environment variables set
- [ ] Database connection working
- [ ] Logo and images replaced
- [ ] Organization info updated
- [ ] Colors/branding updated
- [ ] Navigation menu customized
- [ ] Page content updated
- [ ] Admin user created
- [ ] Test all pages
- [ ] Test admin panel
- [ ] SEO metadata updated
- [ ] Google Analytics configured (if using)
- [ ] Domain configured
- [ ] SSL certificate set up

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database
npm run seed
```

---

## 📝 File Modification Priority

### 🔴 Critical (Must Change)
1. `lib/seo/metadata-config.ts` - Organization info
2. `/public/logo.svg` - Logo file
3. `.env.local` - Environment variables
4. `lib/constants.ts` - Navigation

### 🟡 Important (Should Change)
5. `components/layout/Header.tsx` - Navigation colors
6. `app/globals.css` - Global colors
7. `app/(user-side)/(landing)/page.tsx` - Landing content
8. `package.json` - Project name

### 🟢 Optional (Nice to Have)
9. Individual page content files
10. Section components
11. Admin panel branding
12. Database models (if structure changes)

---

## 💡 Pro Tips

1. **Use Git**: Commit before making changes, so you can revert if needed
2. **Test Locally**: Always test changes locally before deploying
3. **Backup Database**: Export database before major changes
4. **Incremental Changes**: Make one type of change at a time (colors, then content, etc.)
5. **Browser DevTools**: Use browser inspector to find color values quickly
6. **Search Function**: Use your editor's search to find all instances of text/colors

---

## 🆘 Common Issues

### "MongoDB connection failed"
- Check MongoDB is running
- Verify `MONGODB_URI` in `.env.local`
- Check firewall/network settings

### "Cannot find module"
- Run `npm install`
- Check file paths are correct
- Restart dev server

### "Authentication failed"
- Check `JWT_SECRET` is set in `.env.local`
- Clear browser cookies
- Verify admin user exists in database

### "Build errors"
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct
- Check environment variables are set

---

## 📚 Next Steps

1. ✅ Read this guide
2. ✅ Set up environment variables
3. ✅ Update organization info
4. ✅ Replace logo
5. ✅ Update navigation
6. ✅ Change colors
7. ✅ Update page content
8. ✅ Test everything
9. ✅ Deploy!

Good luck with your new website! 🚀



