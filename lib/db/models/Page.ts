import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User'; // Import User model to register it for population

export interface IPage extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  author: mongoose.Types.ObjectId;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  sections?: Array<{
    type: string;
    data: Record<string, any>;
    order: number;
  }>;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema<IPage> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      trim: true,
    },
    featuredImage: {
      type: String,
      default: null,
    },
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
    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: [String],
    },
    sections: [
      {
        type: {
          type: String,
          required: true,
        },
        data: {
          type: Schema.Types.Mixed,
          default: {},
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
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
PageSchema.index({ status: 1 });
PageSchema.index({ publishedAt: -1 });

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

export default Page;

