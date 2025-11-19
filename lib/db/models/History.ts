import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User"; // Ensure User model is registered for population

export interface IHistory extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  subtitle: string;
  heroImages: string[];
  introductionParagraphs: string[];
  milestonesImage?: string;
  timelineSections: Array<{
    title: string;
    description: string;
    order: number;
  }>;
  closingQuote?: string;
  status: "draft" | "published" | "archived";
  author: mongoose.Types.ObjectId;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HistorySchema: Schema<IHistory> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      default: "HISTORY",
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      trim: true,
    },
    heroImages: [
      {
        type: String,
        trim: true,
      },
    ],
    introductionParagraphs: [
      {
        type: String,
        trim: true,
      },
    ],
    milestonesImage: {
      type: String,
      default: null,
    },
    timelineSections: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    closingQuote: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
HistorySchema.index({ status: 1, publishedAt: -1 });

const History: Model<IHistory> =
  mongoose.models.History || mongoose.model<IHistory>("History", HistorySchema);

export default History;
