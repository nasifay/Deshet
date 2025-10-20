# Testimonials CRUD System - Complete Guide

This guide provides comprehensive documentation for the Testimonials CRUD (Create, Read, Update, Delete) system in the admin dashboard.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Database Model](#database-model)
4. [API Routes](#api-routes)
5. [Admin Pages](#admin-pages)
6. [Frontend Integration](#frontend-integration)
7. [Setup & Seeding](#setup--seeding)
8. [Usage Guide](#usage-guide)

---

## 🎯 Overview

The Testimonials CRUD system allows administrators to manage testimonials from supporters, partners, and beneficiaries. Featured testimonials are automatically displayed on the landing page.

## ✨ Features

- **Full CRUD Operations**: Create, read, update, and delete testimonials
- **Featured System**: Mark testimonials as featured to display on the landing page
- **Order Management**: Control the display order of testimonials
- **Status Control**: Set testimonials as active or inactive
- **Search & Filter**: Search by name, title, quote, or organization
- **Image Support**: Optional profile images (with fallback avatar)
- **Responsive UI**: Mobile-friendly admin interface
- **Public API**: Dedicated endpoint for frontend consumption

---

## 🗄️ Database Model

**File**: `lib/db/models/Testimonial.ts`

### Schema Structure

```typescript
interface ITestimonial {
  _id: ObjectId;
  quote: string; // Required: The testimonial quote
  name: string; // Required: Person's name
  title: string; // Required: Job title/position
  organization?: string; // Optional: Organization name
  image?: string; // Optional: Profile image URL
  featured: boolean; // Default: false
  order: number; // Default: 0 (lower = higher priority)
  status: "active" | "inactive"; // Default: 'active'
  createdAt: Date;
  updatedAt: Date;
}
```

### Indexes

- `{ status: 1, order: 1 }` - For efficient querying
- `{ featured: -1, order: 1 }` - For featured testimonials

---

## 🚀 API Routes

### Admin Routes (Protected)

All admin routes require authentication via session.

#### 1. GET `/api/admin/testimonials`

**Description**: List all testimonials with pagination and filters

**Query Parameters**:

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `search` (string): Search in name, title, quote, organization
- `status` (string): Filter by status ('active' | 'inactive' | 'all')
- `featured` (boolean): Filter by featured status

**Response**:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

#### 2. POST `/api/admin/testimonials`

**Description**: Create a new testimonial

**Request Body**:

```json
{
  "quote": "Amazing organization...",
  "name": "John Doe",
  "title": "Executive Director",
  "organization": "ABC Foundation",
  "image": "https://example.com/photo.jpg",
  "featured": true,
  "order": 1,
  "status": "active"
}
```

**Response**:

```json
{
  "success": true,
  "data": {...},
  "message": "Testimonial created successfully"
}
```

#### 3. GET `/api/admin/testimonials/[id]`

**Description**: Get a single testimonial by ID

**Response**:

```json
{
  "success": true,
  "data": {...}
}
```

#### 4. PUT `/api/admin/testimonials/[id]`

**Description**: Update a testimonial

**Request Body**: Same as POST

**Response**:

```json
{
  "success": true,
  "data": {...},
  "message": "Testimonial updated successfully"
}
```

#### 5. DELETE `/api/admin/testimonials/[id]`

**Description**: Delete a testimonial

**Response**:

```json
{
  "success": true,
  "message": "Testimonial deleted successfully"
}
```

### Public Routes

#### GET `/api/public/testimonials`

**Description**: Get public testimonials (active status only)

**Query Parameters**:

- `featured` (boolean): Filter featured testimonials
- `limit` (number): Maximum items to return (default: 10)

**Response**:

```json
{
  "success": true,
  "data": [...]
}
```

---

## 📱 Admin Pages

### 1. List Page: `/admin/testimonials`

**Features**:

- Paginated table view
- Search functionality
- Status filtering
- Quick actions (Edit, Delete)
- Featured indicator
- Create new testimonial button

### 2. Create Page: `/admin/testimonials/new`

**Fields**:

- Quote (required, textarea)
- Name (required, text)
- Title/Position (required, text)
- Organization (optional, text)
- Image URL (optional, text)
- Display Order (number, default: 0)
- Status (select: active/inactive)
- Featured (checkbox)

### 3. Edit Page: `/admin/testimonials/[id]/edit`

Same fields as create page, pre-populated with existing data.

---

## 🎨 Frontend Integration

### TestimonialSection Component

**File**: `components/sections/TestimonialSection.tsx`

**Features**:

- Automatically fetches featured testimonials from API
- Fallback to default testimonials if API fails
- Swiper carousel integration
- Responsive design
- Loading state
- Optional profile images with fallback avatar

**Usage**:

```tsx
import TestimonialsSection from "~/components/sections/TestimonialSection";

export default function LandingPage() {
  return (
    <div>
      {/* Other sections */}
      <TestimonialsSection />
      {/* Other sections */}
    </div>
  );
}
```

---

## 🛠️ Setup & Seeding

### 1. Database Setup

The Testimonial model is automatically registered when the app connects to MongoDB.

### 2. Seed Initial Data

Run the seed script to populate initial testimonials:

```bash
# Using npm
npm run seed:testimonials

# Using npx directly
npx tsx scripts/seed-testimonials.ts
```

**Add to package.json** (if not already present):

```json
{
  "scripts": {
    "seed:testimonials": "tsx scripts/seed-testimonials.ts"
  }
}
```

### 3. Verify Setup

1. Navigate to `/admin/testimonials`
2. You should see the seeded testimonials
3. Test create, edit, and delete operations
4. Check the public landing page to see featured testimonials

---

## 📖 Usage Guide

### Adding a New Testimonial

1. **Navigate** to `/admin/testimonials`
2. **Click** "New Testimonial" button
3. **Fill in** the required fields:
   - Quote: The testimonial text
   - Name: Person's full name
   - Title: Their job title or position
4. **Optional fields**:
   - Organization: Their company/organization
   - Image URL: Link to their profile photo
   - Display Order: Lower numbers appear first (0, 1, 2, ...)
5. **Check** "Featured" to display on landing page
6. **Select** status (Active/Inactive)
7. **Click** "Create Testimonial"

### Editing a Testimonial

1. **Navigate** to `/admin/testimonials`
2. **Click** the edit icon (pencil) next to the testimonial
3. **Update** the fields as needed
4. **Click** "Save Changes"

### Deleting a Testimonial

1. **Navigate** to `/admin/testimonials`
2. **Click** the delete icon (trash) next to the testimonial
3. **Confirm** the deletion in the popup dialog

### Managing Display Order

- Testimonials are displayed in ascending order (0, 1, 2, ...)
- Lower numbers appear first
- Edit the "Display Order" field to change position
- Featured testimonials on landing page respect this order

### Featured vs Non-Featured

- **Featured**: Displayed on the landing page
- **Non-Featured**: Only visible in admin panel and API responses
- You can have multiple featured testimonials
- The middle testimonial in the carousel has special styling (green background)

---

## 🎯 Best Practices

### Content Guidelines

1. **Quote Length**: Keep quotes concise (100-200 words)
2. **Name Format**: Use full names with proper capitalization
3. **Title Format**: Include specific role/position
4. **Organization**: Add for credibility and context
5. **Images**: Use professional photos (400x400px minimum)

### Display Management

1. **Featured Count**: Recommend 3-6 featured testimonials
2. **Order Strategy**: Place strongest testimonials first (order: 1, 2, 3)
3. **Status**: Set to "Inactive" instead of deleting to preserve history
4. **Regular Updates**: Refresh testimonials quarterly to keep content fresh

### Image Guidelines

1. **Format**: JPG or PNG
2. **Size**: 400x400px (square) recommended
3. **Quality**: High resolution for retina displays
4. **Hosting**: Use CDN or your uploads folder
5. **Fallback**: Default avatar icon used if no image provided

---

## 🔒 Security

- All admin routes require authentication
- Session-based access control
- Input validation on all fields
- MongoDB injection protection via Mongoose
- XSS protection via React

---

## 🐛 Troubleshooting

### Testimonials Not Appearing on Landing Page

**Check**:

1. Testimonials are marked as "Featured" ✅
2. Status is set to "Active" ✅
3. Public API is accessible: `/api/public/testimonials?featured=true`
4. Browser console for errors

### Cannot Create/Edit Testimonials

**Check**:

1. User is logged in to admin panel
2. Session is valid (not expired)
3. All required fields are filled
4. MongoDB connection is active

### Images Not Loading

**Check**:

1. Image URL is valid and accessible
2. CORS settings allow the image domain
3. Next.js image domains configured in `next.config.ts`
4. Network tab in browser dev tools for 404 errors

---

## 📊 Database Queries

### Get All Featured Testimonials (Active)

```javascript
const testimonials = await Testimonial.find({
  status: "active",
  featured: true,
}).sort({ order: 1 });
```

### Get Latest Testimonials

```javascript
const latest = await Testimonial.find({ status: "active" })
  .sort({ createdAt: -1 })
  .limit(5);
```

### Search Testimonials

```javascript
const results = await Testimonial.find({
  $or: [
    { name: { $regex: searchTerm, $options: "i" } },
    { organization: { $regex: searchTerm, $options: "i" } },
    { quote: { $regex: searchTerm, $options: "i" } },
  ],
});
```

---

## 🎨 Customization

### Styling

The testimonial cards use Tailwind CSS. Customize in `components/sections/TestimonialSection.tsx`:

- **Card background**: Modify `bg-white` and `bg-primary-green`
- **Text colors**: Adjust `text-gray-600`, `text-white`, etc.
- **Spacing**: Change padding/margin classes
- **Carousel**: Configure Swiper options (autoplay delay, slides per view, etc.)

### Carousel Settings

```typescript
autoplay={{
  delay: 4000, // Change slide duration
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}}
```

---

## 📝 Notes

- Testimonials are soft-deletable (use status: "inactive" instead of deleting)
- The system automatically falls back to default testimonials if database is empty
- Featured testimonials are cached by the browser for better performance
- Consider adding image upload functionality instead of URL input

---

## 🎉 Summary

You now have a complete testimonials management system with:

✅ Database model with proper indexing  
✅ Full CRUD API endpoints  
✅ Admin dashboard pages  
✅ Public API for frontend  
✅ Integration with landing page  
✅ Seed script for initial data  
✅ Responsive design  
✅ Search and filtering  
✅ Featured/order management

**Need Help?** Check the troubleshooting section or review the code comments in the source files.
