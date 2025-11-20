import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User"; // Import User model to register it for population

export interface IAppointment extends Document {
  _id: mongoose.Types.ObjectId;
  patientName: string;
  phone: string;
  email?: string;
  appointmentDate: Date;
  appointmentTime: string; // Flexible time string
  serviceType: string;
  healthConcern: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  bookingId?: mongoose.Types.ObjectId; // Optional reference to Booking
  notes?: string;
  assignedTo?: mongoose.Types.ObjectId; // Reference to User
  completedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema<IAppointment> = new Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    appointmentTime: {
      type: String,
      required: [true, "Appointment time is required"],
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
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    notes: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
AppointmentSchema.index({ appointmentDate: 1 });
AppointmentSchema.index({ phone: 1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ bookingId: 1 });
AppointmentSchema.index({ appointmentDate: 1, status: 1 }); // Composite index for calendar queries

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;

