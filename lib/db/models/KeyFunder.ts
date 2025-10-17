import mongoose, { Schema, Document, Model } from "mongoose";

export interface IKeyFunder extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  link?: string;
  description?: string;
  type: "key_funder" | "supporter"; // Distinguish between key funders and regular supporters
  createdAt: Date;
  updatedAt: Date;
}

const KeyFunderSchema: Schema<IKeyFunder> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Key funder name is required"],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, "Logo is required"],
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["key_funder", "supporter"],
      default: "key_funder",
    },
  },
  {
    timestamps: true,
  }
);

// Add index for efficient querying
KeyFunderSchema.index({ order: 1, isActive: 1, type: 1 });

const KeyFunder: Model<IKeyFunder> =
  mongoose.models.KeyFunder ||
  mongoose.model<IKeyFunder>("KeyFunder", KeyFunderSchema);

export default KeyFunder;
