# Landing Page CMS System

## Overview

A complete Content Management System for the TSD Landing Page has been created, allowing administrators to fully customize all sections of the homepage through an intuitive admin interface.

## 📁 Files Created

### Admin Interface
- **`app/admin/landing/page.tsx`** - Main admin page for editing the landing page
- **`app/admin/components/LandingSectionEditor.tsx`** - Section editor component with tabbed interface

### API Endpoints
- **`app/api/admin/landing/route.ts`** - Admin API for CRUD operations (GET, PUT)
- **`app/api/public/landing/route.ts`** - Public API for fetching published landing page

### Updates
- **`app/admin/components/Sidebar.tsx`** - Added "Landing Page" menu item with Home icon

## 🎨 Features

### 1. **Section-Based Architecture**

The landing page is built using a modular section system. Each section can be:
- ✅ Added dynamically
- ✅ Removed
- ✅ Reordered (drag & drop style with left/right arrows)
- ✅ Individually configured

### 2. **Available Section Types**

#### 🎯 **Hero Section**
- Title (e.g., "SERVING ETHIOPIAN YOUTH")
- Subtitle (optional)
- Background image
- CTA button text and link

#### ℹ️ **About Section**
- Title
- Description text
- CTA button text and link
- Carousel images (multiple images)

#### 📊 **Statistics Section**
- Multiple stats with:
  - Number (e.g., "58", "250+")
  - Label (e.g., "Staffs", "Volunteers")
- Add/remove stats dynamically

#### 📁 **Program Areas Section**
- Section title
- Auto-pulls programs from Programs database
- Note: Programs managed in separate Programs section

#### 🤝 **Partners/Supporters Section**
- Section title
- Partner logo images (comma-separated URLs)

#### 🏆 **Achievements Section**
- Section title
- Multiple achievements with:
  - Title
  - Description
- Add/remove achievements dynamically

#### 📰 **News & Events Section**
- Section title
- Number of items to display
- Auto-pulls latest news from News database

#### 💚 **Volunteer Banner**
- Title
- Description
- Background image
- CTA button text and link

### 3. **Admin Interface Features**

#### **Compact Modern Design**
- Clean, efficient layout
- Reduced padding and spacing
- Modern card-based UI
- Responsive design

#### **Three Main Sections**
1. **Basic Information**
   - Page title
   - URL slug (fixed as "landing")
   - Status (Draft/Published/Archived)

2. **SEO Settings**
   - Meta title (60 char limit with counter)
   - Meta description (160 char limit with counter)
   - Keywords (comma-separated)

3. **Page Information** (read-only)
   - Author
   - Created date
   - Last updated date

#### **Tabbed Section Editor**
- Visual tabs for each section
- Section type icons
- Section numbering
- Active section highlighting
- Easy navigation between sections

#### **Section Management**
- **Add Section** - Modal with all available section types
- **Remove Section** - With confirmation
- **Reorder Sections** - Left/Right arrow buttons
- **Edit Section** - Individual forms for each section type

### 4. **Data Flow**

```
Admin Interface → API (PUT /api/admin/landing) → MongoDB → Public API (GET /api/public/landing) → Landing Page
```

#### **Save Process:**
1. Admin edits sections in tabbed interface
2. Clicks "Save Page" button
3. Data sent to `/api/admin/landing` (PUT)
4. Stored in MongoDB Pages collection with slug "landing"
5. Available via `/api/public/landing` (GET) for frontend

### 5. **Database Structure**

```typescript
{
  _id: ObjectId,
  title: "Landing Page",
  slug: "landing",
  status: "published" | "draft" | "archived",
  seo: {
    metaTitle: string,
    metaDescription: string,
    keywords: string[]
  },
  sections: [
    {
      id: string,
      type: "HeroSection" | "AboutSection" | ...,
      data: {
        // Section-specific data
      },
      order: number
    }
  ],
  author: ObjectId,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

### 6. **Default Sections**

When first accessing the Landing Page CMS, it initializes with these default sections:
1. Hero Section
2. About Section
3. Statistics Section
4. Program Areas Section
5. Supporters Section
6. Achievements Section
7. News & Events Section
8. Volunteer Banner

## 🚀 Usage

### Accessing the CMS

1. Log in to admin panel
2. Click "Landing Page" in sidebar
3. Edit sections as needed
4. Click "Save Page"
5. Preview changes by clicking "Preview" button

### Adding a New Section

1. Click "+ Add Section" button
2. Choose section type from modal
3. Configure section data
4. Save page

### Reordering Sections

1. Click on section tab to make it active
2. Use ← → arrow buttons to move left/right
3. Save page to persist order

### Editing Section Content

1. Click on section tab
2. Fill in form fields
3. Upload images using image upload fields
4. Save page

## 🔧 Integration with Frontend

### Next Steps (To Complete):

The landing page (`app/(landing)/page.tsx`) needs to be updated to:

1. **Fetch data from API**
```typescript
const response = await fetch('/api/public/landing');
const { data } = await response.json();
```

2. **Render sections dynamically**
```typescript
{data.sections.map((section) => {
  switch (section.type) {
    case 'HeroSection':
      return <HeroSection key={section.id} {...section.data} />;
    case 'AboutSection':
      return <AboutSection key={section.id} {...section.data} />;
    // ... etc
  }
})}
```

3. **Update section components to accept props**
- Modify each section component to accept data as props
- Replace hardcoded values with prop values
- Maintain existing styling and animations

## 📝 Notes

- **Landing page slug is fixed** as "landing" and cannot be changed
- **Only one landing page** exists in the system
- **Section order** is preserved and reflected on the frontend
- **Draft status** means the page won't be visible via public API
- **Published status** makes the page accessible to visitors
- **Image uploads** integrate with the Media Library
- **Programs and News** sections auto-pull from their respective databases

## 🎯 Benefits

1. **No Code Changes Needed** - Content updates without developer intervention
2. **Flexible Layout** - Add, remove, reorder sections as needed
3. **SEO Optimized** - Built-in SEO settings for better search rankings
4. **Version Control** - Track changes with timestamps and author info
5. **Preview Before Publish** - Test changes before making them live
6. **Responsive Design** - Works on all devices
7. **User-Friendly** - Intuitive interface for non-technical users

## 🔐 Security

- **Authentication Required** - Only logged-in admins can access
- **Role-Based Access** - Can be restricted to specific user roles
- **Input Validation** - Server-side validation of all data
- **XSS Protection** - Sanitized inputs prevent injection attacks

## 🎨 Design Philosophy

The CMS follows the same compact, modern design principles as the rest of the admin interface:
- Efficient use of space
- Clear visual hierarchy
- Consistent styling
- Intuitive workflows
- Minimal empty space
- Professional appearance

---

**Created:** October 10, 2025  
**Status:** ✅ Admin Interface Complete | ⏳ Frontend Integration Pending





