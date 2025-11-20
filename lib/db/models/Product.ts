import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  // Identification
  name: string;
  nameAm?: string; // Amharic name
  nameEn?: string; // English name
  slug: string;
  
  // Content (bilingual support)
  description: string;
  descriptionAm?: string; // Amharic description
  descriptionEn?: string; // English description
  
  // Product Details
  ingredients: string;
  ingredientsAm?: string; // Amharic ingredients
  ingredientsEn?: string; // English ingredients
  
  usageInstructions: string;
  usageInstructionsAm?: string; // Amharic usage instructions
  usageInstructionsEn?: string; // English usage instructions
  
  benefits: string;
  benefitsAm?: string; // Amharic benefits
  benefitsEn?: string; // English benefits
  
  safetyNotes?: string;
  safetyNotesAm?: string; // Amharic safety notes
  safetyNotesEn?: string; // English safety notes
  
  // Media & Pricing
  images: string[]; // Array of image URLs
  
  price?: number; // Optional price
  
  // Categorization
  category: string;
  isActive: boolean;
  status: 'draft' | 'published' | 'archived';
  order: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    nameAm: {
      type: String,
      trim: true,
    },
    nameEn: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    descriptionAm: {
      type: String,
    },
    descriptionEn: {
      type: String,
    },
    ingredients: {
      type: String,
      required: [true, 'Ingredients are required'],
    },
    ingredientsAm: {
      type: String,
    },
    ingredientsEn: {
      type: String,
    },
    usageInstructions: {
      type: String,
      required: [true, 'Usage instructions are required'],
    },
    usageInstructionsAm: {
      type: String,
    },
    usageInstructionsEn: {
      type: String,
    },
    benefits: {
      type: String,
      required: [true, 'Benefits are required'],
    },
    benefitsAm: {
      type: String,
    },
    benefitsEn: {
      type: String,
    },
    safetyNotes: {
      type: String,
      trim: true,
    },
    safetyNotesAm: {
      type: String,
      trim: true,
    },
    safetyNotesEn: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      min: [0, 'Price must be non-negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Note: slug index is automatically created by unique: true
ProductSchema.index({ category: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ status: 1, isActive: 1, order: 1 });
ProductSchema.index({ createdAt: -1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;














