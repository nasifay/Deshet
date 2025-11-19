import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryCategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string | { en: string; am: string };
  slug: string;
  description?: string | { en: string; am: string };
  color?: string; // Hex color for category display (e.g., #128341)
  icon?: string; // Icon name or emoji
  order: number;
  isActive: boolean;
  featuredImage?: string; // Main hero/featured image for the category
  hasBackground?: boolean; // Whether to show background overlay
  backgroundImage?: string; // Background image URL (for categories like CLM)
  gap?: string; // Custom gap class (e.g., "gap-[15px]")
  createdAt: Date;
  updatedAt: Date;
}

const GalleryCategorySchema: Schema<IGalleryCategory> = new Schema(
  {
    name: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      required: [true, 'Category name is required'],
      // Note: unique constraint removed since Mixed type doesn't support it well
      // Slug is used as the unique identifier instead
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
    },
    color: {
      type: String,
      default: '#128341', // Default to primary green
      validate: {
        validator: function(v: string) {
          return /^#[0-9A-F]{6}$/i.test(v);
        },
        message: 'Color must be a valid hex color'
      }
    },
    icon: {
      type: String,
      default: '🖼️',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    hasBackground: {
      type: Boolean,
      default: false,
    },
    backgroundImage: {
      type: String,
      trim: true,
    },
    gap: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Note: slug index is automatically created by unique: true on line 31
GalleryCategorySchema.index({ order: 1 });
GalleryCategorySchema.index({ isActive: 1 });

const GalleryCategory: Model<IGalleryCategory> = mongoose.models.GalleryCategory || mongoose.model<IGalleryCategory>('GalleryCategory', GalleryCategorySchema);

export default GalleryCategory;


