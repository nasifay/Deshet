# Landing Page Seed Instructions

## 🌱 Seeding the Landing Page

This script will populate your database with the current landing page content, making it immediately editable through the CMS admin interface.

## 📋 What Gets Seeded

The seed script creates a landing page with **8 sections**:

1. **Hero Section** - "SERVING ETHIOPIAN YOUTH" with background image
2. **About Section** - Organization description with 4 carousel images
3. **Statistics Section** - 4 stats (Staffs, Offices, Volunteers, Protocols)
4. **Program Areas Section** - Auto-pulls from Programs database
5. **Supporters Section** - 11 partner logos
6. **Achievements Section** - 6 achievement cards
7. **News & Events Section** - Shows latest 3 news items
8. **Volunteer Banner** - Call-to-action banner

## 🚀 How to Run

### Step 1: Ensure Environment Variables

Make sure your `.env.local` file has the MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

### Step 2: Run the Seed Script

```bash
npm run seed:landing
```

Or using yarn:

```bash
yarn seed:landing
```

Or using pnpm:

```bash
pnpm seed:landing
```

## ✅ Expected Output

When successful, you'll see:

```
🌱 Starting landing page seed...
✅ Connected to MongoDB
✅ Landing page created successfully!
📄 Page ID: [MongoDB ObjectId]
🔗 Slug: landing
📊 Sections: 8
👤 Author: Admin User (admin@tsd.org)

✨ Seed completed successfully!

📝 You can now edit the landing page at: /admin/landing
```

## ⚠️ Important Notes

### If Landing Page Already Exists

The script will **delete and recreate** the landing page. Any previous edits will be lost. Make sure to backup if needed.

### Admin User

If no admin user exists in your database, the script will create one:
- **Email:** `admin@tsd.org`
- **Password:** `admin123`
- **Role:** `admin`

**⚠️ IMPORTANT:** Change this password immediately after first login!

## 📝 After Seeding

1. **Log in to Admin Panel**
   - Go to `/admin/login`
   - Use your admin credentials

2. **Access Landing Page Editor**
   - Click "Landing Page" in the sidebar
   - Or navigate to `/admin/landing`

3. **Edit Content**
   - Click on any section tab to edit
   - Modify text, images, links, etc.
   - Add or remove sections as needed
   - Reorder sections using arrow buttons

4. **Save Changes**
   - Click "Save Page" button
   - Changes are immediately saved to database

5. **Preview**
   - Click "Preview" button to see changes
   - Or visit the homepage directly

## 🔄 Re-running the Seed

You can run the seed script multiple times. Each time it will:
- Delete the existing landing page
- Create a fresh landing page with default content
- Reset all sections to their original state

This is useful for:
- Testing
- Resetting to defaults
- Starting fresh after experiments

## 🎨 Customization

After seeding, you can:

### Add New Sections
- Click "+ Add Section"
- Choose from 8 section types
- Configure section data
- Save

### Modify Existing Sections
- Click on section tab
- Edit fields
- Upload new images
- Update text content
- Change links

### Reorder Sections
- Use ← → arrow buttons
- Drag sections to new positions
- Save to persist order

### Remove Sections
- Click trash icon on section
- Confirm deletion
- Save changes

## 📊 Section Data Details

### Hero Section
- Title: "SERVING ETHIOPIAN YOUTH"
- Background: `/home-hero.png`
- CTA: "Contact Us" → `/contact-us`

### About Section
- Title: "ABOUT US"
- Description: Full organization description
- Images: 4 carousel images from `/images/about/`
- CTA: "Read More" → `/who-we-are`

### Statistics
- 58 Staffs
- 5 Offices in 4 Regions
- 250+ Volunteers
- 15 Protocols

### Supporters
11 partner logos from `/suporters/` directory

### Achievements
6 achievement cards with titles and descriptions

### News & Events
Shows latest 3 news items (auto-pulled from database)

### Volunteer Banner
- Title: "Join Our Mission"
- Description: Volunteer call-to-action
- Background: `/images/cta.jpg`
- CTA: "Volunteer Now" → `/volunteer`

## 🔧 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Check your `MONGODB_URI` in `.env.local`
- Ensure MongoDB is running
- Verify network connection

### Error: "No admin user found"
- Script will automatically create one
- Use credentials: `admin@tsd.org` / `admin123`

### Error: "Module not found"
- Run `npm install` to install dependencies
- Ensure `tsx` is installed (dev dependency)

### Seed runs but no changes in admin
- Clear browser cache
- Refresh the admin page
- Check MongoDB to verify data was saved

## 📚 Related Documentation

- **LANDING_PAGE_CMS.md** - Complete CMS documentation
- **ADMIN_SETUP.md** - Admin panel setup guide
- **README.md** - General project documentation

## 🎯 Next Steps

After seeding:

1. ✅ Log in to admin panel
2. ✅ Navigate to Landing Page editor
3. ✅ Customize content as needed
4. ✅ Upload your own images
5. ✅ Update text and links
6. ✅ Add/remove sections
7. ✅ Save and preview changes
8. ✅ Publish when ready

---

**Created:** October 10, 2025  
**Script:** `scripts/seed-landing.ts`  
**Command:** `npm run seed:landing`





