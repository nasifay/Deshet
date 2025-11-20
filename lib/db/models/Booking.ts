import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User"; // Import User model to register it for population
import Appointment from "./Appointment"; // Import Appointment model to register it for population

export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone: string;
  preferredDate: Date;
  preferredTime: string;
  serviceType: string;
  healthConcern: string;
  requestCallback: boolean;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  confirmedBy?: mongoose.Types.ObjectId;
  confirmedAt?: Date;
  appointmentId?: mongoose.Types.ObjectId; // Optional reference to Appointment
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
      trim: true,
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      trim: true,
    },
    healthConcern: {
      type: String,
      required: [true, "Health concern description is required"],
      trim: true,
    },
    requestCallback: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
    },
    confirmedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    confirmedAt: {
      type: Date,
      default: null,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
BookingSchema.index({ email: 1 });
BookingSchema.index({ status: 1, createdAt: -1 });
BookingSchema.index({ preferredDate: 1 });
BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ appointmentId: 1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;









