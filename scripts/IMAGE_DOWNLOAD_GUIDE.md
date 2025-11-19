# Image Download Guide

This guide helps you download and organize images for the Deshet Medical Center website.

## Quick Start

1. **Run the checklist** to see what images you need:
   ```bash
   npm run images:checklist
   ```
   Or directly:
   ```bash
   tsx scripts/organize-image-downloads.ts checklist
   ```

2. **Download images** from free stock photo sites:
   - [Pexels](https://www.pexels.com) - Free, no attribution required
   - [Unsplash](https://unsplash.com) - Free, attribution appreciated
   - [Pixabay](https://pixabay.com) - Free, no attribution required

3. **Save downloads** to: `downloads/images/` directory

4. **Organize files** by moving them to the correct locations:
   - Hero images → `public/images/hero/`
   - About images → `public/images/about/`
   - Services images → `public/images/services/`
   - Products images → `public/images/products/`
   - Gallery images → `public/images/gallery/`

5. **Validate images** to ensure they meet requirements:
   ```bash
   npm run images:validate
   ```

## Script Commands

### `checklist` (default)
Shows complete checklist with search queries and URLs:
```bash
npm run images:checklist
```

### `summary`
Shows progress summary only:
```bash
npm run images:summary
```

### `validate`
Validates all existing images (requires ImageMagick):
```bash
npm run images:validate
```

**Note:** ImageMagick must be installed for dimension validation:
- macOS: `brew install imagemagick`
- Ubuntu/Debian: `sudo apt-get install imagemagick`
- Windows: Download from [ImageMagick website](https://imagemagick.org/)

## Image Requirements

### Hero Images (High Priority)
- **Format**: JPG/PNG
- **Size**: 1920x1080px minimum
- **Files needed**: 4 images
  - `hero-landscape.jpg` - Main hero image
  - `hero-left-1.jpg` - Left side image
  - `hero-middle-1.jpg` - Middle image
  - `hero-right-1.jpg` - Right side image

### About Section (High Priority)
- **Format**: JPG/PNG
- **Size**: 800x600px minimum
- **Files needed**: 4 images
  - `about-1.jpg` - Medical center facilities
  - `about-2.jpg` - Traditional healing practices
  - `about-3.jpg` - Herbal medicine preparation
  - `about-4.jpg` - Patient care scenes

### Services Section (High Priority)
- **Format**: JPG/PNG
- **Size**: 1200x800px minimum
- **Files needed**: 4 images
  - `traditional-consultation.jpg`
  - `herbal-preparation.jpg`
  - `detox-therapy.jpg`
  - `diagnostic-techniques.jpg`

### Products (Medium Priority)
- **Format**: JPG/PNG
- **Size**: 800x800px minimum (square)
- **Files needed**: 1+ images
  - `product-placeholder.png`

### Gallery (Medium Priority)
- **Format**: JPG/PNG
- **Size**: 1200x800px minimum
- **Files needed**: Multiple images
  - `facility-1.jpg`
  - `herbal-garden-1.jpg`
  - (Add more as needed)

## Search Tips

### Recommended Search Terms
- "traditional ethiopian medicine"
- "herbal medicine preparation"
- "traditional healing tools"
- "medicinal herbs"
- "natural medicine"
- "holistic health"
- "herbal remedies"
- "traditional therapy"

### What to Look For
✅ **Good images:**
- Professional photography
- Warm, authentic feeling
- Culturally appropriate
- High resolution
- Good lighting

❌ **Avoid:**
- Stereotypical representations
- Low quality images
- Images that don't match Ethiopian context
- Images without proper licensing

## File Naming

When downloading, you can use any filename. The script will help you identify which file goes where. Just make sure to:
1. Keep the original filename or use a descriptive name
2. Place it in `downloads/images/` first
3. Rename it to match the required filename when moving to the final location

## Cultural Sensitivity

⚠️ **Important:** When selecting images:
- Ensure images respect Ethiopian cultural traditions
- Avoid stereotypical or misrepresentative images
- If using images with people, ensure proper consent
- Consider commissioning professional photography for authentic representation

## Troubleshooting

### Script won't run
Make sure you have TypeScript and tsx installed:
```bash
npm install -g tsx
```

### Validation fails
- Install ImageMagick (see above)
- Check that images are actual image files (not HTML redirects)
- Ensure files meet minimum size requirements

### Can't find suitable images
- Try different search terms
- Consider commissioning custom photography
- Use placeholder images temporarily until better ones are found

## Next Steps

After downloading and organizing images:
1. Review images for cultural appropriateness
2. Optimize images for web (Next.js will handle this automatically)
3. Update image paths in components
4. Test image loading and optimization
5. Update database/admin panel with new image paths

