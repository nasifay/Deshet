# Phase 10: Image Assets Requirements

## Overview
This document outlines the image requirements for replacing NGO images with medical/herbal images for Deshet Medical Center.

## Image Replacement Requirements

### 10.2.1 Hero Images
**Location**: `public/images/` or hero section data
**Current**: NGO/youth images
**Required**:
- Traditional Ethiopian medical practitioner images
- Herbal medicine preparation scenes
- Traditional healing tools and instruments
- Natural/plant-based imagery
- Medical center facility images
- **Format**: High-resolution JPG/PNG (1920x1080 minimum)
- **Style**: Professional, warm, culturally authentic

### 10.2.2 Section Background Images
**Location**: Various section components
**Current**: NGO-related images
**Required**:
- Herbal plants and botanicals
- Traditional medicine ingredients
- Healing hands/ceremonial images
- Nature and wellness imagery
- **Format**: JPG/PNG (1200x800 minimum)
- **Style**: Subtle, premium, medical-focused

### 10.2.3 About Section Images
**Location**: `components/sections/about-section.tsx`
**Current**: `/images/about/1.png`, `/images/about/2.png`, etc.
**Required**:
- Medical center facilities
- Traditional healing practices
- Herbal medicine preparation
- Patient care scenes (with consent)
- **Format**: JPG/PNG (800x600 minimum)
- **Style**: Professional, authentic

### 10.2.4 Services/Programs Images
**Location**: `components/sections/services-section.tsx`
**Current**: `/overview/1.png`, `/overview/2.png`, etc.
**Required**:
- Traditional Medical Consultation images
- Herbal Medicine Preparation scenes
- Detox & Cleansing Therapy imagery
- Traditional Diagnostic Techniques
- Healing Treatments
- **Format**: JPG/PNG (1200x800 minimum)
- **Style**: Medical, professional, culturally appropriate

### 10.2.5 Product Images
**Location**: Products page and ProductCard component
**Current**: Placeholder images
**Required**:
- Herbal product photography
- Ingredient close-ups
- Packaging images
- Usage demonstration images
- **Format**: JPG/PNG (800x800 minimum, square)
- **Style**: Clean, professional product photography

### 10.2.6 Gallery Images
**Location**: Gallery page
**Current**: NGO event images
**Required**:
- Medical center facilities
- Traditional healing ceremonies (with consent)
- Herbal garden/plant cultivation
- Community health events
- **Format**: JPG/PNG (various sizes)
- **Style**: Documentary, authentic

## Image Guidelines

### Cultural Sensitivity
- Ensure all images respect Ethiopian cultural traditions
- Obtain proper consent for any patient/people images
- Use authentic traditional medical imagery
- Avoid stereotypical or misrepresentative images

### Quality Standards
- High resolution (minimum 1200px width for hero images)
- Professional photography preferred
- Consistent color grading
- Optimized file sizes (use Next.js Image optimization)

### File Organization
```
public/
  images/
    hero/
      hero-landscape.jpg
      hero-left-1.jpg
      hero-middle-1.jpg
      hero-right-1.jpg
    about/
      about-1.jpg
      about-2.jpg
      about-3.jpg
      about-4.jpg
    services/
      traditional-consultation.jpg
      herbal-preparation.jpg
      detox-therapy.jpg
      diagnostic-techniques.jpg
    products/
      product-placeholder.png
    gallery/
      [organized by category]
```

## Implementation Notes

1. **Manual Replacement Required**: Image replacement must be done manually as it requires:
   - Sourcing appropriate images
   - Obtaining rights/permissions
   - Cultural review and approval
   - Professional photography if needed

2. **Placeholder Strategy**: Current placeholder images should remain until proper replacements are available

3. **Next.js Image Optimization**: All images should use Next.js `<Image>` component for automatic optimization

4. **Alt Text**: Update all alt text to reflect medical center context (already done in components)

## Priority Order

1. **High Priority**:
   - Hero section images
   - Services section images
   - About section images

2. **Medium Priority**:
   - Product images
   - Gallery images

3. **Low Priority**:
   - Background textures (can use CSS patterns)
   - Decorative elements

## Next Steps

1. Source or commission appropriate images
2. Review images for cultural appropriateness
3. Optimize images for web
4. Replace placeholder images in components
5. Update image paths in database/admin panel
6. Test image loading and optimization



