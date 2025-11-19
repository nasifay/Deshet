import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User"; // Import User model to register it for population
import GalleryCategory from "./GalleryCategory"; // Import GalleryCategory model for population

export interface IGallery extends Document {
  _id: mongoose.Types.ObjectId;
  filename: string;
  originalName: string;
  url: string;
  type: "image" | "video" | "document" | "other";
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string | { en: string; am: string };
  caption?: string | { en: string; am: string };
  customClass?: string; // Custom CSS class for special layouts (e.g., Recognition images)
  section: "CLM" | "CRPVF" | "general"; // Gallery section for organization
  position: number; // Order within section
  featured: boolean; // Featured image for main display
  category: mongoose.Types.ObjectId; // Reference to GalleryCategory
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema<IGallery> = new Schema(
  {
    filename: {
      type: String,
      required: [true, "Filename is required"],
    },
    originalName: {
      type: String,
      required: [true, "Original name is required"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
    },
    type: {
      type: String,
      enum: ["image", "video", "document", "other"],
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
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
    },
    caption: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
    },
    customClass: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
      enum: ["CLM", "CRPVF", "general"],
      default: "general",
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "GalleryCategory",
      required: [true, "Category is required"],
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
GallerySchema.index({ section: 1, position: 1 });
GallerySchema.index({ section: 1, featured: 1 });

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;
