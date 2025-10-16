import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISupporter extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  link?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SupporterSchema: Schema<ISupporter> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Supporter name is required"],
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
  },
  {
    timestamps: true,
  }
);

// Add index for efficient querying
SupporterSchema.index({ order: 1, isActive: 1 });

const Supporter: Model<ISupporter> =
  mongoose.models.Supporter ||
  mongoose.model<ISupporter>("Supporter", SupporterSchema);

export default Supporter;
