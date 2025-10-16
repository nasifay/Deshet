# Hero Section Images - Upload Guide

## Overview

The landing page hero section images can now be **directly uploaded** or managed via URLs through the admin dashboard. No coding required!

## Features ✨

### Image Upload Interface

- ✅ **Direct File Upload** - Upload images directly from your computer
- ✅ **URL Support** - Add images via URL (local or external)
- ✅ **Preview Thumbnails** - See all your images before saving
- ✅ **Reorder Images** - Change the order images appear
- ✅ **Auto-Save Order** - Image order changes are automatically saved
- ✅ **Order Display** - Each image shows its position with a numbered badge
- ✅ **Remove Images** - Delete unwanted images easily
- ✅ **Dark Mode Support** - Works seamlessly in light and dark themes

## How to Use

### Step 1: Access the Admin Dashboard

1. Navigate to `/admin/landing`
2. Click on the **Hero Section** tab
3. You'll see three image sections:
   - **Left Section Images** (Green overlay)
   - **Middle Section Images** (Orange/Gold overlay)
   - **Right Section Images** (Green overlay)

### Step 2: Add Images

#### Method A: Upload from Computer (Recommended)

1. Click the **Upload** button in any section
2. Choose an image file from your computer
3. Wait for the upload to complete (usually a few seconds)
4. The image will appear in the list with a preview thumbnail

**Supported Formats:**

- PNG, JPG, JPEG, GIF, WebP
- Maximum size: 5MB per image
- Recommended resolution: 1920px width or higher

#### Method B: Add via URL

1. Click the **Add URL** button
2. Enter the image URL in the input field
3. Click **Add** to include it
4. The image will be added to the list

**URL Examples:**

```
/landing-left.png                          (Public folder)
/uploads/hero-image-2024.jpg               (Uploaded images)
https://example.com/images/hero.jpg        (External URL)
```

### Step 3: Manage Your Images

#### View Images

- Each image shows a thumbnail preview
- Image URL is displayed below the thumbnail
- Position indicator shows "Image X of Y"

#### Reorder Images

- Click the **↑** (up arrow) to move an image up
- Click the **↓** (down arrow) to move an image down
- Images rotate in the order they appear in the list
- **Order is auto-saved**: When you reorder images, changes are automatically saved to the database
- A green "Saving order..." indicator appears during auto-save
- Each image shows its order number with a green badge

#### Remove Images

- Click the **X** button next to any image
- Confirm the removal when prompted
- The image will be removed from the list

### Step 4: Save Changes

**Note:** Image reordering is auto-saved automatically. For other changes:

1. After managing all three sections, click **Save Page**
2. Ensure page status is set to **Published**
3. Click **Preview** to see your changes live
4. Visit your homepage to see the updated hero section

**Auto-Save Features:**

- ✅ Reordering images triggers automatic save
- ✅ No manual save needed when changing image order
- ✅ Visual feedback shows "Saving order..." while processing
- ⚠️ Adding/removing images still requires manual save via "Save Page" button

## Image Rotation Timing

The three sections rotate at different speeds for visual interest:

- **Left Section**: Changes every **5 seconds**
- **Middle Section**: Changes every **4 seconds**
- **Right Section**: Changes every **4.5 seconds**

## Best Practices 🎯

### Image Quality

- Use high-resolution images (minimum 1920px width)
- Optimize images before uploading (compress to reduce file size)
- Use consistent aspect ratios across all images
- Ensure images look good with colored overlays (green or orange)

### Image Content

- Choose images that represent your mission
- Use professional, high-quality photographs
- Ensure images are properly lit and in focus
- Consider diversity and representation in your image selection

### Performance

- Limit to 3-5 images per section for optimal loading
- Compress images before uploading (use tools like TinyPNG)
- Use modern formats like WebP when possible
- Test page load speed after adding images

### Organization

- Use descriptive file names before uploading
- Keep track of which images are in which section
- Regularly review and update outdated images
- Remove unused images to keep the database clean

## Troubleshooting 🔧

### Upload Failed

**Problem**: Image won't upload
**Solutions**:

- Check file size (must be under 5MB)
- Verify file format (PNG, JPG, GIF, WebP only)
- Ensure stable internet connection
- Try compressing the image and uploading again

### Image Not Showing

**Problem**: Uploaded image doesn't display
**Solutions**:

- Check that the image URL is correct
- Verify the image uploaded successfully
- Clear browser cache and refresh
- Check browser console for error messages

### Changes Not Appearing

**Problem**: Saved changes don't show on website
**Solutions**:

- Verify page status is set to **Published**
- Click **Save Page** button after making changes
- Clear browser cache
- Try opening the site in an incognito window

### Preview Shows Error

**Problem**: Image preview shows error icon
**Solutions**:

- Check that the URL is accessible
- Verify the image file isn't corrupted
- Try re-uploading the image
- Use a different image format

## Technical Details 🔧

### File Storage

- Uploaded images are stored in `/public/uploads/`
- Files are automatically renamed with timestamps
- Original file names are preserved in metadata

### Database Structure

Images are stored as arrays in the Page model:

```json
{
  "type": "HeroSection",
  "data": {
    "leftImages": ["url1", "url2", "url3"],
    "middleImages": ["url1", "url2", "url3"],
    "rightImages": ["url1", "url2", "url3"]
  }
}
```

### API Endpoints

- **POST** `/api/admin/media/upload` - Uploads image file
- **PUT** `/api/admin/landing` - Saves landing page data
- **GET** `/api/public/landing` - Fetches published landing data

### Components Used

1. **ImageArrayUploadField** - Manages multiple images
2. **LandingSectionEditor** - Hero section editor
3. **HeroSection** - Frontend display component

## Workflow Example 📋

### Scenario: Updating Hero Section for New Campaign

1. **Prepare Images**

   - Create/select 9 high-quality images (3 per section)
   - Optimize and compress all images
   - Name files descriptively (e.g., `campaign-2024-youth-1.jpg`)

2. **Upload to Admin**

   - Log into admin dashboard (`/admin`)
   - Navigate to Landing Page editor
   - Click Hero Section tab

3. **Add Images**

   - Left Section: Upload 3 images showing community engagement
   - Middle Section: Upload 3 images showing program activities
   - Right Section: Upload 3 images showing success stories

4. **Review & Organize**

   - Check all previews load correctly
   - Reorder images for best visual flow
   - Remove any that don't fit the theme

5. **Test & Publish**
   - Use Preview button to check live site
   - Verify images rotate smoothly
   - Save and publish changes
   - Test on mobile and desktop

## Quick Reference Card 📋

| Action       | Steps                                            | Auto-Saved? |
| ------------ | ------------------------------------------------ | ----------- |
| Upload image | Click **Upload** → Choose file → Wait for upload | No          |
| Add URL      | Click **Add URL** → Paste URL → Click **Add**    | No          |
| Reorder      | Use **↑** / **↓** arrows                         | **Yes** ✅  |
| Remove       | Click **X** button → Confirm                     | No          |
| Save         | Click **Save Page** at top                       | N/A         |
| Preview      | Click **Preview** button at top                  | N/A         |

## Support & Resources

- **Admin Dashboard**: `/admin/landing`
- **Main Guide**: See `HERO_IMAGES_CMS_GUIDE.md`
- **Frontend Component**: `components/sections/hero-section.tsx`
- **Editor Component**: `app/admin/components/LandingSectionEditor.tsx`

For additional help, contact your development team.
