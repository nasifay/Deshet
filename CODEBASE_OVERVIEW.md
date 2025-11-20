# Codebase Overview - NGO Website Template

## Project Summary
This is a **Next.js 15** website template for an NGO (Non-Governmental Organization) called "Tamra for Social Development" (TSD). It's a full-stack application with:
- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with MongoDB/Mongoose
- **Admin Panel**: Full CMS for content management
- **Authentication**: JWT-based admin authentication

---

## 🏗️ Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken, jose)
- **UI Components**: Radix UI, custom components
- **Forms**: React Hook Form + Zod validation
- **Rich Text**: Tiptap editor
- **Animations**: Framer Motion, Lenis (smooth scroll)
- **Analytics**: Google Analytics 4

---

## 📁 Directory Structure

```
tamra_SDT_WEBSITE/
├── app/                          # Next.js App Router
│   ├── (user-side)/             # Public-facing pages
│   │   ├── (landing)/           # Home page
│   │   ├── who-we-are/          # About page
│   │   ├── history/              # Organization history
│   │   ├── programs/             # Programs listing
│   │   ├── news/                 # News & events
│   │   ├── gallery/              # Photo gallery
│   │   ├── volunteer/            # Volunteer page
│   │   ├── contact-us/           # Contact page
│   │   └── donate/               # Donation page
│   ├── admin/                    # Admin CMS panel
│   │   ├── login/                # Admin login
│   │   ├── news/                 # Manage news
│   │   ├── programs/             # Manage programs
│   │   ├── gallery/              # Manage gallery
│   │   ├── users/                # User management
│   │   ├── analytics/            # Analytics dashboard
│   │   └── ...                   # Other admin sections
│   └── api/                      # API routes
│       ├── admin/                # Admin API endpoints
│       ├── auth/                 # Authentication
│       ├── public/               # Public API endpoints
│       └── volunteer/            # Volunteer API
├── components/                   # React components
│   ├── layout/                   # Header, Footer, Layouts
│   ├── sections/                 # Page sections (Hero, About, etc.)
│   └── ui/                       # Reusable UI components
├── lib/                          # Utilities & configurations
│   ├── db/                       # Database models & connection
│   ├── auth/                     # Authentication utilities
│   ├── seo/                      # SEO metadata & JSON-LD
│   └── constants.ts              # App constants
├── public/                       # Static assets
│   ├── images/                   # Images
│   ├── logo.svg                  # Logo
│   └── uploads/                  # User-uploaded files
├── scripts/                      # Database seeding scripts
└── middleware.ts                 # Route protection middleware
```

---

## 🔑 Key Files to Modify for New Website

### 1. **Organization Information** (HIGH PRIORITY)
**File**: `lib/seo/metadata-config.ts`
- Change `ORGANIZATION` object:
  - `name`: Organization name
  - `shortName`: Short name/abbreviation
  - `description`: Organization description
  - `email`, `phone`, `address`: Contact info
  - `logo`, `image`: Logo and hero image paths
  - `socialMedia`: Social media links
- Update `BASE_URL` to your domain
- Update all `PAGE_METADATA` with your content
- Update `DEFAULT_KEYWORDS` array

### 2. **Navigation Menu** (HIGH PRIORITY)
**File**: `lib/constants.ts`
- Modify `NAV_ITEMS` array to match your navigation structure
- Update routes in `components/layout/Header.tsx` if needed

### 3. **Branding & Colors** (HIGH PRIORITY)
**Files**: 
- `app/globals.css` - Update Tailwind theme colors
- `components/layout/Header.tsx` - Update color scheme (currently uses `#ff7a00` orange and `primary-green`)
- Search for color values: `#ff7a00`, `primary-green`, `#0f6d35`

### 4. **Logo & Images** (HIGH PRIORITY)
**Files**:
- Replace `/public/logo.svg` with your logo
- Replace images in `/public/images/` directory
- Update image references in components

### 5. **Database Models** (MEDIUM PRIORITY)
**Directory**: `lib/db/models/`
- Review and adapt models to your needs:
  - `User.ts` - Admin users (may not need changes)
  - `NewsPost.ts` - News/blog posts
  - `Program.ts` - Programs/services
  - `Gallery.ts` - Photo gallery
  - `Volunteer.ts` - Volunteer applications
  - `Contact.ts` - Contact submissions
  - `History.ts` - Organization history
  - `KeyFunder.ts`, `Supporter.ts` - Sponsors/supporters
  - `BankOption.ts` - Payment options for donations
  - `Testimonial.ts` - Testimonials

### 6. **Page Content** (MEDIUM PRIORITY)
**Directory**: `app/(user-side)/`
- Update page content in each route:
  - Landing page sections
  - About/Who We Are content
  - Programs descriptions
  - News/events content
  - Gallery images
  - Volunteer form
  - Contact form
  - Donation page

### 7. **Admin Panel Branding** (MEDIUM PRIORITY)
**File**: `app/admin/page.tsx`
- Line 87: Change "TSD Admin Dashboard" to your organization name
- Update welcome messages

### 8. **Environment Variables** (REQUIRED)
Create `.env.local` file with:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/your_database_name

# Base URL
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# JWT Secret (generate a random string)
JWT_SECRET=your-secret-key-here

# Google Analytics (optional)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Email (if using email features)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

### 9. **Package.json** (LOW PRIORITY)
**File**: `package.json`
- Line 2: Update `name` from "ngo-site" to your project name

### 10. **Database Seeding** (OPTIONAL)
**Directory**: `scripts/`
- Review and run seed scripts to populate initial data:
  - `seed.ts` - Main seed script
  - `seed-landing.ts` - Landing page content
  - `seed-programs.ts` - Programs data
  - `seed-news.ts` - News posts
  - `seed-gallery.ts` - Gallery images
  - etc.

---

## 🎨 Design System

### Color Scheme (Current)
- **Primary Orange**: `#ff7a00` - Used for highlights, active states
- **Primary Green**: `primary-green` / `#0f6d35` - Used for buttons, CTAs
- **Background**: White with backdrop blur effects
- **Text**: Gray scale (`gray-800`, `gray-600`, etc.)

### Typography
- **Font**: Roboto (from Google Fonts)
- Configured in `app/layout.tsx`

### Components
- Custom UI components in `components/ui/`
- Reusable sections in `components/sections/`
- Layout components in `components/layout/`

---

## 🔐 Authentication & Security

### Admin Authentication
- **Method**: JWT tokens stored in cookies
- **Middleware**: `middleware.ts` protects `/admin` routes
- **Login**: `/admin/login`
- **User Roles**: `superadmin`, `admin`, `editor`, `viewer`
- **Token**: Stored as `admin_token` cookie

### API Protection
- Admin API routes (`/api/admin/*`) require authentication
- Public API routes (`/api/public/*`) are accessible without auth

---

## 📊 Database Schema

### Key Models
1. **User** - Admin users with roles
2. **NewsPost** - News articles/events
3. **Program** - Organization programs/services
4. **Gallery** - Photo gallery with categories
5. **Volunteer** - Volunteer applications
6. **Contact** - Contact form submissions
7. **History** - Organization timeline/history
8. **KeyFunder** - Major funders/sponsors
9. **Supporter** - Supporters/partners
10. **BankOption** - Payment options for donations
11. **Testimonial** - User testimonials
12. **Page** - Dynamic pages
13. **SiteSettings** - Site-wide settings
14. **Media** - Uploaded media files

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local` with required variables (see section 8 above)

### 3. Connect Database
Ensure MongoDB is running and update `MONGODB_URI` in `.env.local`

### 4. Seed Database (Optional)
```bash
npm run seed
# Or individual seeds:
npm run seed:landing
npm run seed:programs
npm run seed:news
```

### 5. Run Development Server
```bash
npm run dev
```

### 6. Access Admin Panel
- Navigate to `/admin/login`
- Create first admin user via seed script or API

---

## 📝 Customization Checklist

When adapting this template for a new website:

- [ ] Update organization info in `lib/seo/metadata-config.ts`
- [ ] Replace logo and images in `/public/`
- [ ] Update navigation menu in `lib/constants.ts` and `Header.tsx`
- [ ] Change color scheme (search for `#ff7a00`, `primary-green`)
- [ ] Update page content in `app/(user-side)/`
- [ ] Modify database models if needed
- [ ] Update admin panel branding
- [ ] Set up environment variables
- [ ] Update package.json name
- [ ] Review and customize SEO metadata
- [ ] Test all pages and functionality
- [ ] Update footer content
- [ ] Customize email templates (if using)
- [ ] Set up Google Analytics (optional)
- [ ] Configure domain and base URL

---

## 🔧 Common Customizations

### Changing Routes
1. Update route folders in `app/(user-side)/`
2. Update `NAV_ITEMS` in `lib/constants.ts`
3. Update links in `Header.tsx` and `Footer.tsx`

### Adding New Sections
1. Create component in `components/sections/`
2. Add to appropriate page in `app/(user-side)/`
3. Create API route if needed in `app/api/`

### Modifying Admin Features
1. Admin pages in `app/admin/`
2. Admin API routes in `app/api/admin/`
3. Admin components in `app/admin/components/`

---

## 📚 Additional Notes

- **SEO**: Comprehensive SEO setup with metadata, JSON-LD schemas, sitemap, robots.txt
- **Responsive**: Mobile-first design with Tailwind CSS
- **Performance**: Optimized images with Next.js Image component
- **Accessibility**: Uses semantic HTML and ARIA attributes
- **Internationalization**: Currently English only, but structure supports i18n

---

## 🐛 Troubleshooting

### Database Connection Issues
- Check MongoDB is running
- Verify `MONGODB_URI` in `.env.local`
- Check network/firewall settings

### Authentication Issues
- Verify `JWT_SECRET` is set
- Check cookie settings
- Clear browser cookies and try again

### Build Errors
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors: `npm run lint`
- Verify all environment variables are set

---

## 📞 Support

For questions or issues:
1. Check this documentation
2. Review Next.js documentation: https://nextjs.org/docs
3. Check MongoDB/Mongoose documentation
4. Review component code for examples

---

**Last Updated**: Template analysis for website adaptation
**Version**: Based on Next.js 15.5.4












