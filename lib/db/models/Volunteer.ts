import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User"; // Import User model to register it for population

export interface IVolunteer extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  location: string;
  occupation?: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience?: string;
  motivation: string;
  referenceSource: string;
  document?: string; // Path to uploaded document/resume
  status: "pending" | "reviewed" | "approved" | "rejected" | "contacted";
  notes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema: Schema<IVolunteer> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    age: {
      type: Number,
      min: [15, "Age must be at least 15"],
      max: [100, "Age must be less than 100"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: {
      type: String,
      required: [true, "Availability is required"],
      enum: ["weekdays", "weekends", "both", "flexible"],
    },
    experience: {
      type: String,
      trim: true,
    },
    motivation: {
      type: String,
      required: [true, "Motivation is required"],
      trim: true,
    },
    referenceSource: {
      type: String,
      required: [true, "Reference source is required"],
      trim: true,
    },
    document: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected", "contacted"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
VolunteerSchema.index({ email: 1 });
VolunteerSchema.index({ status: 1, createdAt: -1 });
VolunteerSchema.index({ createdAt: -1 });

const Volunteer: Model<IVolunteer> =
  mongoose.models.Volunteer ||
  mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);

export default Volunteer;
