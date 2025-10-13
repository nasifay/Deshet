import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  categoryId: string;
  categoryLabel: string;
  description: string;
  image: string;
  thumbnails: Array<{
    id: number;
    src: string;
    alt?: string;
    uploaded?: boolean; // true if uploaded, false if URL
  }>;
    projects: Array<{
      id: number;
      name: string;
      description?: string;
      featuredImage?: string;
      galleryThumbnails?: Array<{
        id: number;
        src: string;
        alt?: string;
        uploaded?: boolean;
      }>;
      status?: string;
      partner?: string;
    }>;
  status: 'draft' | 'published' | 'archived';
  order: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema: Schema<IProgram> = new Schema(
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
    categoryId: {
      type: String,
      required: [true, 'Category ID is required'],
      trim: true,
    },
    categoryLabel: {
      type: String,
      required: [true, 'Category label is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      required: [true, 'Main image is required'],
    },
    thumbnails: [
      {
        id: {
          type: Number,
          required: true,
        },
        src: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: '',
        },
        uploaded: {
          type: Boolean,
          default: false,
        },
      },
    ],
    projects: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: '',
        },
        featuredImage: {
          type: String,
          default: '',
        },
        galleryThumbnails: [
          {
            id: {
              type: Number,
              required: true,
            },
            src: {
              type: String,
              required: true,
            },
            alt: {
              type: String,
              default: '',
            },
            uploaded: {
              type: Boolean,
              default: false,
            },
          },
        ],
        status: {
          type: String,
          default: 'active',
        },
        partner: {
          type: String,
          default: '',
        },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    order: {
      type: Number,
      default: 0,
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
ProgramSchema.index({ categoryId: 1, order: 1 });
ProgramSchema.index({ status: 1, publishedAt: -1 });

const Program: Model<IProgram> =
  mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;

