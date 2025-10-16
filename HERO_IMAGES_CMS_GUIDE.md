# Hero Section Images - Admin Dashboard Guide

## Overview

The landing page hero section images can now be fully managed through the admin dashboard. This allows you to dynamically update the three rotating image sections without touching code.

## What Changed

### 1. **Admin Dashboard Enhancement**

- Added three image array fields in the Hero Section editor:
  - **Left Section Images** (Green overlay)
  - **Middle Section Images** (Orange/Gold overlay)
  - **Right Section Images** (Green overlay)

### 2. **Dynamic Hero Section**

- The hero section component now accepts props from the CMS
- Images are fetched from the database instead of being hardcoded
- Maintains backward compatibility with default fallback images

### 3. **Database Structure**

- Hero section data is stored in the `Page` model under the `sections` array
- Each image array is stored as comma-separated URLs in the admin interface
- Data structure:
  ```json
  {
    "type": "HeroSection",
    "data": {
      "title": "SERVING",
      "subtitle": "ETHIOPIAN YOUTH",
      "leftImages": ["url1", "url2", "url3"],
      "middleImages": ["url1", "url2", "url3"],
      "rightImages": ["url1", "url2", "url3"],
      "ctaText": "Contact Us",
      "ctaLink": "/contact-us"
    }
  }
  ```

## How to Use

### Accessing the Admin Dashboard

1. Log in to the admin dashboard
2. Navigate to **Landing Page** section
3. Click on the **Hero Section** tab

### Managing Hero Images

#### Adding/Updating Images

1. In the Hero Section editor, you'll see three bordered sections:

   - **Left Section Images**
   - **Middle Section Images**
   - **Right Section Images**

2. For each section, enter image URLs separated by commas:

   ```
   /landing-left.png, https://example.com/image1.jpg, /uploads/hero-image.png
   ```

3. **Image Requirements:**

   - Can use relative paths (e.g., `/landing-left.png`) for images in the `public` folder
   - Can use absolute URLs (e.g., `https://...`) for external images
   - Images should be high quality and appropriate dimensions for hero sections
   - Recommended: Upload images using the Media Upload feature first

4. **Image Rotation:**
   - Left section: Rotates every 5 seconds
   - Middle section: Rotates every 4 seconds
   - Right section: Rotates every 4.5 seconds

#### Updating Title and Subtitle

- **Title**: Main heading (e.g., "SERVING")
- **Subtitle**: Second line (e.g., "ETHIOPIAN YOUTH")

#### Updating Call-to-Action

- **CTA Button Text**: Button label (e.g., "Contact Us")
- **CTA Button Link**: URL destination (e.g., "/contact-us")

### Saving Changes

1. After making your changes, click the **Save Page** button at the top right
2. Ensure the page status is set to **Published** for changes to appear on the live site
3. Click **Preview** to see your changes before publishing

## Image Upload Options

### Option 1: Use Existing Public Images

- Images in the `/public` folder can be referenced directly
- Example: `/landing-left.png`

### Option 2: Upload New Images

1. Navigate to **Media Upload** in the admin dashboard
2. Upload your images
3. Copy the generated URL
4. Paste it in the hero section image fields

### Option 3: Use External URLs

- You can use images hosted on external services
- Example: `https://images.unsplash.com/photo-...`

## Technical Details

### Modified Files

1. **app/admin/components/LandingSectionEditor.tsx**

   - Added image array input fields for left, middle, and right sections
   - Updated default data structure

2. **components/sections/hero-section.tsx**

   - Added TypeScript interface for props
   - Converted from hardcoded values to dynamic props
   - Maintained default fallback values

3. **app/(user-side)/(landing)/page.tsx**

   - Updated to fetch hero section data from API
   - Passes data to HeroSection component

4. **app/admin/landing/page.tsx**
   - Updated default sections with new image array structure

### API Endpoints

- **GET** `/api/public/landing` - Fetches published landing page data
- **GET** `/api/admin/landing` - Fetches landing page for editing (authenticated)
- **PUT** `/api/admin/landing` - Updates landing page (authenticated)

## Best Practices

1. **Image Quality**

   - Use high-resolution images (at least 1920px width)
   - Optimize images for web (compress before uploading)
   - Use consistent aspect ratios

2. **Performance**

   - Limit to 3-5 images per section for optimal performance
   - Use CDN or optimized hosting for external images
   - Test load times after updating images

3. **Content Management**

   - Keep image URLs organized and documented
   - Use descriptive file names for easier management
   - Regularly review and update outdated images

4. **Testing**
   - Always preview changes before publishing
   - Test on different screen sizes (mobile, tablet, desktop)
   - Verify image loading and transitions

## Troubleshooting

### Images Not Showing

- Check that image URLs are correct and accessible
- Verify image paths start with `/` for public folder images
- Ensure images are properly uploaded and available

### Changes Not Appearing

- Verify the landing page status is set to **Published**
- Clear browser cache and refresh the page
- Check the browser console for any errors

### Image Transition Issues

- Ensure at least one image is provided for each section
- Check that image URLs are valid and loading correctly
- Verify no special characters in URLs (or properly encode them)

## Support

For additional support or issues, please contact the development team or refer to the main README.md file.
