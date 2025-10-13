import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './User'; // Import User model to register it for population

export interface IGallery extends Document {
  _id: mongoose.Types.ObjectId;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'other';
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string;
  caption?: string;
  category: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema<IGallery> = new Schema(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
    },
    originalName: {
      type: String,
      required: [true, 'Original name is required'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
    },
    type: {
      type: String,
      enum: ['image', 'video', 'document', 'other'],
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    dimensions: {
      width: Number,
      height: Number,
    },
    alt: {
      type: String,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: 'general',
      trim: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
GallerySchema.index({ type: 1, category: 1 });
GallerySchema.index({ uploadedBy: 1 });
GallerySchema.index({ createdAt: -1 });

const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;







