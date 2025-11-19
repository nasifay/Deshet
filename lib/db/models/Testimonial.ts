import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  _id: mongoose.Types.ObjectId;
  quote: string | { en: string; am: string };
  name: string;
  title: string | { en: string; am: string };
  organization?: string | { en: string; am: string };
  image?: string;
  featured: boolean;
  order: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    quote: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      required: [true, 'Quote is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    title: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      required: [true, 'Title/Position is required'],
    },
    organization: {
      type: Schema.Types.Mixed, // Supports both string and {en, am} object
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TestimonialSchema.index({ status: 1, order: 1 });
TestimonialSchema.index({ featured: -1, order: 1 });

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;

