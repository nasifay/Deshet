import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBankOption extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  accountNumber?: string;
  number?: string; // For mobile money like Tele Birr
  id?: string; // For mobile money ID
  swiftCode?: string;
  logo: string;
  copyIcon?: string;
  organizationName: string;
  status: "active" | "inactive";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BankOptionSchema: Schema<IBankOption> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Bank name is required"],
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
      default: null,
    },
    number: {
      type: String,
      trim: true,
      default: null,
    },
    id: {
      type: String,
      trim: true,
      default: null,
    },
    swiftCode: {
      type: String,
      trim: true,
      default: null,
    },
    logo: {
      type: String,
      required: [true, "Logo is required"],
    },
    copyIcon: {
      type: String,
      default: null,
    },
    organizationName: {
      type: String,
      default: "Tamra ForSocial Development Organization",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
BankOptionSchema.index({ status: 1 });
BankOptionSchema.index({ order: 1 });

const BankOption: Model<IBankOption> =
  mongoose.models.BankOption ||
  mongoose.model<IBankOption>("BankOption", BankOptionSchema);

export default BankOption;
