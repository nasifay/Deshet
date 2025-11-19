import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User'; // Ensure User model is registered for population

export interface INewsPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string | { en: string; am: string };
  slug: string;
  content: string | { en: string; am: string };
  excerpt: string | { en: string; am: string };
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  author: mongoose.Types.ObjectId;
  views: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsPostSchema: Schema<INewsPost> = new Schema(
  {
    title: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      required: [true, 'Title is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      required: [true, 'Excerpt is required'],
    },
    featuredImage: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Note: slug index is automatically created by unique: true
NewsPostSchema.index({ status: 1, publishedAt: -1 });
NewsPostSchema.index({ category: 1 });
NewsPostSchema.index({ isFeatured: -1, publishedAt: -1 });

const NewsPost: Model<INewsPost> =
  mongoose.models.NewsPost || mongoose.model<INewsPost>('NewsPost', NewsPostSchema);

export default NewsPost;

// Alias for BlogPost (used in Phase 7 transformation)
// BlogPost and NewsPost refer to the same model/collection
export const BlogPost = NewsPost;
export type IBlogPost = INewsPost;