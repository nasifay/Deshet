# News System - Quick Reference Guide

## 🚀 Quick Start

### 1. Access Admin Panel
```
URL: http://localhost:3000/admin/login
Email: admin@tamra.org
Password: admin123
```

### 2. Manage News Posts
```
Dashboard: http://localhost:3000/admin/news
```

---

## 📝 Common Tasks

### Add a New Post
1. Click **"New Post"** button
2. Enter title (slug auto-generates)
3. Write excerpt and content
4. Add image URL
5. Select category
6. Choose status (draft/published)
7. Click **"Create Post"**

### Edit a Post
1. Find post in list
2. Click **edit icon** (pencil)
3. Make changes
4. Click **"Save Changes"**

### Delete a Post
1. Click **edit icon** on post
2. Click **"Delete"** button (top right)
3. Confirm deletion

### Feature a Post
- Check **"Mark as featured"** checkbox when creating/editing
- Featured posts appear first and are highlighted

---

## 📂 File Structure

```
app/
├── (user-side)/
│   └── news/
│       ├── [id]/page.tsx          # Single news view
│       └── page.tsx                # News listing
│
├── admin/
│   └── news/
│       ├── page.tsx                # Admin dashboard
│       ├── new/page.tsx            # Create new post
│       └── [id]/edit/page.tsx      # Edit existing post
│
└── api/
    ├── public/news/                # Public API (no auth)
    │   ├── route.ts                # List posts
    │   └── [slug]/route.ts         # Single post
    │
    └── admin/news/                 # Admin API (auth required)
        ├── route.ts                # List/Create
        └── [id]/route.ts           # Get/Update/Delete

components/
└── sections/
    ├── news-events-section.tsx     # Landing page news
    ├── NewsEventsSection.tsx       # News page featured
    └── MainContentSection.tsx      # News page grid

scripts/
└── seed-news.ts                    # Database seeding

lib/db/models/
└── NewsPost.ts                     # Database schema
```

---

## 🔗 URL Structure

### Public URLs
- `/` - Landing page (shows 4 latest news)
- `/news` - News listing page (shows all news)
- `/news/[slug]` - Individual news post
  - Example: `/news/tsd-new-years-program`

### Admin URLs
- `/admin/news` - News management
- `/admin/news/new` - Create post
- `/admin/news/[id]/edit` - Edit post

---

## 🎨 Categories

Available categories:
- **News** - General updates and announcements
- **Events** - Upcoming and past events
- **Announcements** - Official announcements
- **Success Stories** - Impact stories and testimonials

To add more categories, update:
- `app/admin/news/new/page.tsx` (line ~190)
- `app/admin/news/[id]/edit/page.tsx` (line ~290)

---

## 🎯 Post Status

| Status | Visibility | Use Case |
|--------|-----------|----------|
| **draft** | Admin only | Work in progress |
| **published** | Public | Live on website |
| **archived** | Admin only | Hidden but saved |

---

## 💾 Database Commands

### Seed News Data
```bash
npm run seed:news
```
Populates database with 8 sample news posts.

### Re-seed (Clear & Reload)
```bash
npm run seed:news
```
Clears existing news and adds fresh sample data.

---

## 🔧 API Examples

### Fetch Latest News (Public)
```javascript
fetch('/api/public/news?limit=4&sort=-publishedAt')
```

### Fetch Featured News
```javascript
fetch('/api/public/news?featured=true&limit=4')
```

### Fetch by Category
```javascript
fetch('/api/public/news?category=Events')
```

### Get Single Post
```javascript
fetch('/api/public/news/tsd-new-years-program')
```

---

## 📊 Database Fields

### Required Fields
- `title` - Post title
- `slug` - URL-friendly identifier (auto-generated)
- `excerpt` - Short description
- `content` - Full HTML content
- `category` - Post category

### Optional Fields
- `featuredImage` - Image URL
- `tags` - Array of tags
- `isFeatured` - Boolean (default: false)
- `status` - draft/published/archived (default: draft)

### Auto-Generated Fields
- `views` - View count (increments on view)
- `publishedAt` - When status changed to published
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `author` - Linked to user who created it

---

## 🎓 Tips & Best Practices

1. **Slugs**: Auto-generated from title, but can be edited
   - Keep them short and descriptive
   - Use hyphens, not underscores
   - All lowercase

2. **Images**: Use high-quality images
   - Recommended size: 1200x600px
   - Format: JPG or PNG
   - Host on CDN or in `/public` folder

3. **Excerpts**: Keep under 200 characters
   - Used in listings and previews
   - Should hook the reader

4. **Content**: Use the rich text editor
   - Add headings for structure
   - Break into paragraphs
   - Add links where relevant

5. **Featured Posts**: Use sparingly
   - Max 2-3 featured posts
   - For most important news

6. **Status Management**:
   - Use **draft** while writing
   - **Publish** when ready to go live
   - **Archive** old posts instead of deleting

---

## 🐛 Troubleshooting

### News not showing on public site?
- Check post status is **"published"**
- Refresh the page (data cached for 60s)
- Check browser console for errors

### Can't create new post?
- Make sure you're logged in as admin
- Check all required fields are filled
- Ensure slug is unique

### Images not loading?
- Verify image URL is accessible
- Check URL format (https://...)
- Try uploading to `/public/news/` folder

### Seed script fails?
- Check MongoDB connection in `.env.local`
- Ensure database is running
- Check for permission errors

---

## 📱 Mobile Responsive

All news pages are fully responsive:
- ✅ Landing page news section
- ✅ News listing page
- ✅ Single news view
- ✅ Admin dashboard (desktop recommended)

---

## 🎉 You're All Set!

The news system is fully integrated and ready to use. Start by:

1. Logging into admin panel
2. Reviewing the seeded posts
3. Creating your first custom post
4. Visiting the public site to see it live!

Need help? Check `NEWS_INTEGRATION_SUMMARY.md` for detailed information.






