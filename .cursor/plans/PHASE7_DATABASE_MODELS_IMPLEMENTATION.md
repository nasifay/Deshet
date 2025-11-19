# Phase 7: Database Models - Step-by-Step Implementation

## Overview
This document outlines the detailed step-by-step implementation for Phase 7: Database Models for the Deshet Indigenous Medical Center website transformation.

## Current State Analysis

### ✅ Already Implemented
1. **Booking Model** (`lib/db/models/Booking.ts`)
   - ✅ Already exists with all required fields
   - ✅ Has proper schema validation
   - ✅ Includes status management (pending, confirmed, completed, cancelled)
   - ✅ Has proper indexes
   - ✅ Registered in `mongodb.ts`

2. **NewsPost Model** (`lib/db/models/NewsPost.ts`)
   - ✅ Exists with proper structure
   - ⚠️ Needs alias/rename to BlogPost for consistency

3. **Program Model** (`lib/db/models/Program.ts`)
   - ✅ Exists with proper structure
   - ⚠️ Needs alias/rename to Service for consistency

4. **Volunteer Model** (`lib/db/models/Volunteer.ts`)
   - ✅ Exists
   - ⚠️ Should be marked as deprecated (not removed for backward compatibility)

### ❌ Not Yet Implemented
1. **Product Model** - Needs to be created from scratch
2. **BlogPost alias** - Needs to be added to NewsPost
3. **Service alias** - Needs to be added to Program
4. **Model registration** - Product model needs to be registered in mongodb.ts

---

## Implementation Steps

### Step 1: Create Product Model
**File**: `lib/db/models/Product.ts`

**Tasks**:
- Create new Product model file
- Define IProduct interface with all required fields:
  - `name` (string) - Product name (support bilingual in content)
  - `nameAm` (string, optional) - Amharic name
  - `nameEn` (string, optional) - English name
  - `slug` (string) - URL-friendly identifier
  - `description` (string) - Product description
  - `descriptionAm` (string, optional) - Amharic description
  - `descriptionEn` (string, optional) - English description
  - `ingredients` (string) - List of ingredients
  - `ingredientsAm` (string, optional) - Amharic ingredients
  - `ingredientsEn` (string, optional) - English ingredients
  - `usageInstructions` (string) - How to use the product
  - `usageInstructionsAm` (string, optional) - Amharic instructions
  - `usageInstructionsEn` (string, optional) - English instructions
  - `benefits` (string) - Product benefits
  - `benefitsAm` (string, optional) - Amharic benefits
  - `benefitsEn` (string, optional) - English benefits
  - `safetyNotes` (string, optional) - Safety warnings/notes
  - `safetyNotesAm` (string, optional) - Amharic safety notes
  - `safetyNotesEn` (string, optional) - English safety notes
  - `images` (string[]) - Array of image URLs
  - `price` (number, optional) - Product price
  - `category` (string) - Product category
  - `isActive` (boolean) - Whether product is active/available
  - `status` ('draft' | 'published' | 'archived') - Publication status
  - `order` (number) - Display order
  - `createdAt` (Date) - Creation timestamp
  - `updatedAt` (Date) - Update timestamp

- Create ProductSchema with:
  - Proper validation for all fields
  - Required field validations
  - String trimming
  - Email validation (if needed)
  - Enum validation for status
  - Default values where appropriate
  - Timestamps enabled

- Add indexes:
  - `slug` (unique)
  - `category`
  - `isActive`
  - `status`
  - `order`
  - `createdAt` (descending)

- Export Product model following existing pattern

**Expected Result**: Product model created with full schema definition

---

### Step 2: Add BlogPost Alias to NewsPost Model
**File**: `lib/db/models/NewsPost.ts`

**Tasks**:
- Keep existing NewsPost model unchanged (for backward compatibility)
- Add export alias: `export const BlogPost = NewsPost;`
- Add interface alias: `export type IBlogPost = INewsPost;`
- Add comment explaining the alias relationship
- Ensure both NewsPost and BlogPost can be used interchangeably

**Expected Result**: NewsPost can be referenced as BlogPost without breaking existing code

---

### Step 3: Add Service Alias to Program Model
**File**: `lib/db/models/Program.ts`

**Tasks**:
- Keep existing Program model unchanged (for backward compatibility)
- Add export alias: `export const Service = Program;`
- Add interface alias: `export type IService = IProgram;`
- Add comment explaining the alias relationship
- Ensure both Program and Service can be used interchangeably

**Expected Result**: Program can be referenced as Service without breaking existing code

---

### Step 4: Mark Volunteer Model as Deprecated
**File**: `lib/db/models/Volunteer.ts`

**Tasks**:
- Add deprecation comment at the top of the file
- Add JSDoc comment marking the model as deprecated
- Keep the model functional (for backward compatibility)
- Add note about future removal

**Expected Result**: Volunteer model marked as deprecated but still functional

---

### Step 5: Register Product Model in MongoDB Connection
**File**: `lib/db/mongodb.ts`

**Tasks**:
- Import Product model: `import "~/lib/db/models/Product";`
- Add import statement after existing model imports
- Ensure Product model is registered before connection

**Expected Result**: Product model is registered and available when database connects

---

### Step 6: Verify Model Registration
**File**: `lib/db/mongodb.ts`

**Tasks**:
- Verify all models are imported:
  - ✅ User
  - ✅ NewsPost (BlogPost alias)
  - ✅ Page
  - ✅ Program (Service alias)
  - ✅ SiteSettings
  - ✅ Media
  - ✅ Volunteer (deprecated)
  - ✅ Gallery
  - ✅ GalleryCategory
  - ✅ Contact
  - ✅ BankOption
  - ✅ KeyFunder
  - ✅ Supporter
  - ✅ Booking
  - ✅ Product (new)

**Expected Result**: All models properly registered

---

### Step 7: Create Type Exports File (Optional but Recommended)
**File**: `lib/db/models/index.ts`

**Tasks**:
- Create index file to export all models and types
- Export all interfaces and models
- Export aliases (BlogPost, Service)
- This makes imports cleaner throughout the codebase

**Exports**:
```typescript
export { default as User, type IUser, type UserRole } from './User';
export { default as NewsPost, default as BlogPost, type INewsPost, type IBlogPost } from './NewsPost';
export { default as Page, type IPage } from './Page';
export { default as Program, default as Service, type IProgram, type IService } from './Program';
export { default as Product, type IProduct } from './Product';
export { default as Booking, type IBooking } from './Booking';
// ... other models
```

**Expected Result**: Centralized model exports for easier imports

---

## Model Specifications

### Product Model Schema Details

```typescript
{
  // Identification
  name: string;              // Required, trimmed
  nameAm?: string;           // Optional, Amharic name
  nameEn?: string;           // Optional, English name
  slug: string;              // Required, unique, lowercase, trimmed
  
  // Content (bilingual support)
  description: string;       // Required
  descriptionAm?: string;   // Optional, Amharic description
  descriptionEn?: string;   // Optional, English description
  
  // Product Details
  ingredients: string;       // Required
  ingredientsAm?: string;   // Optional, Amharic ingredients
  ingredientsEn?: string;   // Optional, English ingredients
  
  usageInstructions: string; // Required
  usageInstructionsAm?: string; // Optional
  usageInstructionsEn?: string; // Optional
  
  benefits: string;          // Required
  benefitsAm?: string;      // Optional
  benefitsEn?: string;      // Optional
  
  safetyNotes?: string;      // Optional
  safetyNotesAm?: string;   // Optional
  safetyNotesEn?: string;   // Optional
  
  // Media & Pricing
  images: string[];          // Array of image URLs
  price?: number;            // Optional, min: 0
  
  // Categorization
  category: string;          // Required, trimmed
  isActive: boolean;         // Default: true
  status: 'draft' | 'published' | 'archived'; // Default: 'draft'
  order: number;             // Default: 0
  
  // Timestamps
  createdAt: Date;           // Auto-generated
  updatedAt: Date;           // Auto-generated
}
```

### Indexes for Product Model

1. **slug** - Unique index for URL-friendly lookups
2. **category** - For filtering by category
3. **isActive** - For filtering active products
4. **status** - For filtering by publication status
5. **order** - For sorting products
6. **createdAt** - Descending index for recent products
7. **Compound index**: `{ status: 1, isActive: 1, order: 1 }` - For listing published active products

---

## Implementation Order

1. ✅ **Step 1**: Create Product Model
2. ✅ **Step 2**: Add BlogPost alias to NewsPost
3. ✅ **Step 3**: Add Service alias to Program
4. ✅ **Step 4**: Mark Volunteer as deprecated
5. ✅ **Step 5**: Register Product in mongodb.ts
6. ✅ **Step 6**: Verify all model registrations
7. ✅ **Step 7**: Create type exports file (optional)

---

## Testing Checklist

After implementation, verify:

- [ ] Product model can be imported successfully
- [ ] Product model schema validates correctly
- [ ] Product model indexes are created
- [ ] BlogPost alias works (can import as BlogPost)
- [ ] Service alias works (can import as Service)
- [ ] Volunteer model still works (backward compatibility)
- [ ] All models are registered in mongodb.ts
- [ ] Database connection works with all models
- [ ] TypeScript types are correct for all models
- [ ] No TypeScript errors in model files

---

## Migration Considerations

### For Production Database

1. **Product Collection**: Will be created automatically when first Product document is saved
2. **Indexes**: Will be created automatically when model is first used
3. **Existing Data**: No migration needed for existing collections
4. **Backward Compatibility**: 
   - NewsPost → BlogPost: No data migration needed (same collection)
   - Program → Service: No data migration needed (same collection)
   - Volunteer: Keep collection but mark as deprecated

### Data Migration Script (if needed)

If you need to migrate existing data:
- No migration needed for Product (new collection)
- No migration needed for aliases (same collections)
- Volunteer data can remain (deprecated but functional)

---

## Notes

- **Bilingual Support**: Product model includes optional Amharic/English fields. The main fields (`name`, `description`, etc.) can store bilingual content, while `*Am` and `*En` fields provide language-specific versions if needed.

- **Backward Compatibility**: 
  - NewsPost and Program models are kept as-is
  - Aliases are added for new naming convention
  - Volunteer model is deprecated but not removed

- **Model Pattern**: Follow the existing model pattern:
  - Interface definition
  - Schema definition with validation
  - Indexes
  - Model export with mongoose.models check
  - User reference for author/creator fields

- **Type Safety**: All models use TypeScript interfaces for type safety

- **Validation**: All models include proper Mongoose validation:
  - Required fields
  - String trimming
  - Email validation (where applicable)
  - Enum validation
  - Min/max values (where applicable)

---

## Success Criteria

✅ Product model created with all required fields
✅ Product model properly validated
✅ Product model indexes created
✅ BlogPost alias works for NewsPost
✅ Service alias works for Program
✅ Volunteer model marked as deprecated
✅ All models registered in mongodb.ts
✅ No TypeScript errors
✅ Database connection works
✅ All models can be imported and used

---

## Next Steps (After Phase 7)

After completing Phase 7, proceed to:
- **Phase 8**: API Routes - Create API endpoints for Product CRUD operations
- **Phase 6**: Admin Panel - Create admin interface for Product management
- **Phase 5**: Content Pages - Create public-facing Products page







