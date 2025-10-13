# 🚀 Quick Start: Landing Page CMS

## ✅ What's Been Created

A complete CMS system for managing your landing page content through an admin interface - no code changes needed!

## 📍 Access the CMS

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Log in to admin panel:**
   - Navigate to: `http://localhost:3000/admin/login`
   - Use your admin credentials

3. **Access Landing Page Editor:**
   - Click "Landing Page" in the sidebar (🏠 icon)
   - Or go directly to: `http://localhost:3000/admin/landing`

## 🎨 First Time Setup

When you first access the Landing Page editor, it will initialize with **8 default sections** based on your current landing page:

### Default Sections:
1. 🎯 **Hero Section** - "SERVING ETHIOPIAN YOUTH"
2. ℹ️ **About Section** - Organization description with carousel
3. 📊 **Statistics** - Staffs, Offices, Volunteers, Protocols
4. 📁 **Program Areas** - Auto-pulls from Programs database
5. 🤝 **Partners/Supporters** - Partner logos
6. 🏆 **Achievements** - Achievement cards
7. 📰 **News & Events** - Latest news (auto-pulled)
8. 💚 **Volunteer Banner** - Call-to-action

## ✏️ How to Edit Content

### Edit a Section:
1. Click on the section tab at the top
2. Modify the form fields
3. Upload images using the image upload buttons
4. Click "Save Page" when done

### Add a New Section:
1. Click "+ Add Section" button
2. Choose section type from the modal
3. Fill in the section data
4. Click "Save Page"

### Reorder Sections:
1. Click on a section tab to make it active
2. Use the ← → arrow buttons to move it
3. Click "Save Page" to persist the order

### Remove a Section:
1. Click on the section tab
2. Click the trash icon (🗑️)
3. Confirm deletion
4. Click "Save Page"

## 📝 Editing Each Section Type

### 🎯 Hero Section
- **Title:** Main headline text
- **Subtitle:** Optional secondary text
- **Background Image:** Hero background image URL
- **CTA Button Text:** Button label (e.g., "Contact Us")
- **CTA Button Link:** Where button links to (e.g., "/contact-us")

**Current Values:**
```
Title: SERVING ETHIOPIAN YOUTH
Background: /home-hero.png
CTA: Contact Us → /contact-us
```

### ℹ️ About Section
- **Title:** Section heading
- **Description:** Full organization description
- **CTA Button Text:** Button label
- **CTA Button Link:** Where button links to
- **Carousel Images:** Comma-separated image URLs

**Current Values:**
```
Title: ABOUT US
Description: Tamra for social development organization...
Images: /images/about/1.png, /images/about/2.png, /images/about/3.png, /images/about/4.png
CTA: Read More → /who-we-are
```

### 📊 Statistics Section
- **Stats:** Add/remove stat items
- Each stat has:
  - **Number:** The statistic (e.g., "58", "250+")
  - **Label:** Description (e.g., "Staffs", "Volunteers")

**Current Values:**
```
58 - Staffs
5 - Offices in 4 Regions
250+ - Volunteers
15 - Protocols
```

### 📁 Program Areas Section
- **Title:** Section heading
- **Note:** Programs are automatically pulled from the Programs database
- Manage actual programs in the "Programs" section of admin

### 🤝 Partners/Supporters Section
- **Title:** Section heading
- **Partner Logos:** Comma-separated image URLs

**Current Values:**
```
Title: Our Partners
Logos: /suporters/usaid.png, /suporters/pepfar.png, /suporters/gac.png, ...
```

### 🏆 Achievements Section
- **Title:** Section heading
- **Achievements:** Add/remove achievement cards
- Each achievement has:
  - **Title:** Achievement heading
  - **Description:** Achievement details

**Example:**
```
Title: 25+ Years of Impact
Description: Over two decades of dedicated service...
```

### 📰 News & Events Section
- **Title:** Section heading
- **Show Limit:** Number of news items to display (1-12)
- **Note:** News is automatically pulled from the News database

### 💚 Volunteer Banner
- **Title:** Banner heading
- **Description:** Call-to-action text
- **Background Image:** Banner background URL
- **CTA Button Text:** Button label
- **CTA Button Link:** Where button links to

**Current Values:**
```
Title: Join Our Mission
Background: /images/cta.jpg
CTA: Volunteer Now → /volunteer
```

## 🖼️ Uploading Images

### Using the Image Upload Field:
1. Click the image upload button in any section
2. Choose an image file from your computer
3. Image is uploaded to the Media Library
4. URL is automatically inserted into the field

### Manual Image URLs:
You can also manually enter image paths:
- Relative paths: `/images/hero.jpg`
- Absolute URLs: `https://example.com/image.jpg`

## 💾 Saving Changes

### Save Button:
- Located in the top-right corner
- Click "Save Page" after making any changes
- Changes are immediately saved to the database

### Preview Button:
- Click "Preview" to see your changes
- Opens the landing page in a new tab
- Note: You may need to refresh to see updates

## 📋 SEO Settings

Edit SEO metadata for better search engine optimization:

### Meta Title (60 characters max):
```
TSD - Serving Ethiopian Youth | Social Development Organization
```

### Meta Description (160 characters max):
```
Tamra for Social Development (TSD) is an Ethiopian NGO working in youth empowerment, peacebuilding, SRH & gender equality, and climate justice since 1998.
```

### Keywords (comma-separated):
```
TSD, Ethiopia, youth empowerment, peacebuilding, social development, NGO, Tamra, gender equality, climate justice
```

## 🎯 Best Practices

### Content Writing:
- ✅ Keep titles concise and impactful
- ✅ Use clear, action-oriented language
- ✅ Maintain consistent tone and voice
- ✅ Proofread before saving

### Images:
- ✅ Use high-quality images
- ✅ Optimize images for web (compress before upload)
- ✅ Use descriptive file names
- ✅ Ensure images are relevant to content

### SEO:
- ✅ Include target keywords in meta title
- ✅ Write compelling meta descriptions
- ✅ Use relevant keywords (5-10 max)
- ✅ Keep URLs clean and descriptive

### Section Order:
- ✅ Start with Hero section (most important)
- ✅ Follow with About section
- ✅ Place CTAs strategically
- ✅ End with Volunteer Banner

## 🔄 Workflow Example

### Typical Editing Session:

1. **Log in** to admin panel
2. **Navigate** to Landing Page
3. **Click** on "Hero Section" tab
4. **Update** the title text
5. **Upload** a new background image
6. **Click** "Save Page"
7. **Click** "Preview" to check changes
8. **Repeat** for other sections as needed
9. **Save** final changes
10. **Publish** when ready (status: Published)

## 🆘 Troubleshooting

### Changes Not Showing:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check if status is "Published"
- Verify you clicked "Save Page"

### Images Not Loading:
- Check image path is correct
- Verify image exists in public folder
- Try uploading through Media Library
- Use absolute URLs if needed

### Section Not Saving:
- Check all required fields are filled
- Look for error messages
- Verify you're logged in
- Try refreshing the page

### Can't Access Admin:
- Verify you're logged in
- Check your user role (need admin access)
- Clear cookies and log in again
- Contact system administrator

## 📚 Additional Resources

- **LANDING_PAGE_CMS.md** - Complete technical documentation
- **LANDING_SEED_INSTRUCTIONS.md** - Database seeding guide
- **ADMIN_SETUP.md** - Admin panel setup

## 🎉 You're Ready!

The Landing Page CMS is fully functional and ready to use. Start editing your content through the admin interface - no coding required!

### Quick Links:
- 🏠 Landing Page Editor: `/admin/landing`
- 📄 Pages Manager: `/admin/pages`
- 📰 News Manager: `/admin/news`
- 📁 Programs Manager: `/admin/programs`
- 🖼️ Media Library: `/admin/media`

---

**Need Help?** Check the documentation files or contact your development team.

**Happy Editing! 🚀**





