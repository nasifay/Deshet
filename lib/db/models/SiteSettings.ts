import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  _id: mongoose.Types.ObjectId;
  // Statistics
  stats: {
    staffCount: string;
    officesCount: string;
    regionsCount: string;
    volunteersCount: string;
    protocolsCount: string;
  };
  // Achievements
  achievements: {
    recognitionsCount: string;
    radioYears: string;
    serviceYears: string;
    activeRegions: string;
  };
  // Core Values
  coreValues: Array<{
    title: string;
    description: string;
    icon: string;
    iconWidth: string;
    iconHeight: string;
    separator: string;
    gap: string;
  }>;
  // Leadership Team
  leadership: Array<{
    name: string;
    position: string;
    bio?: string;
    photo?: string;
    order: number;
    email?: string;
    phone?: string;
    type: "leadership" | "team_member"; // Categorize members
  }>;
  // Target Groups
  targetGroups: Array<{
    icon: string;
    title: string;
    iconWidth: string;
    iconHeight: string;
  }>;
  // Operation Regions
  operationRegions: Array<{
    name: string;
    description?: string;
    position: { x: string; y: string };
  }>;
  // Supporters
  supporters: Array<{
    name: string;
    logo: string;
  }>;
  // Footer Settings
  footer: {
    socialLinks: Array<{
      platform: string;
      url: string;
      icon: string;
      isActive: boolean;
    }>;
    whatsappNumber: string;
    termsAndConditions: {
      fileUrl: string;
      fileName: string;
    };
    privacyPolicy: {
      fileUrl: string;
      fileName: string;
    };
    contactInfo: {
      email: string;
      address: string;
      phone: string;
    };
    keyFunders: Array<{
      name: string;
    }>;
    networks: Array<{
      name: string;
    }>;
  };
  updatedAt: Date;
  createdAt: Date;
}

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
  {
    stats: {
      staffCount: { type: String, default: "58" },
      officesCount: { type: String, default: "5" },
      regionsCount: { type: String, default: "4" },
      volunteersCount: { type: String, default: "250+" },
      protocolsCount: { type: String, default: "15" },
    },
    achievements: {
      recognitionsCount: { type: String, default: "120+" },
      radioYears: { type: String, default: "11+" },
      serviceYears: { type: String, default: "28" },
      activeRegions: { type: String, default: "4" },
    },
    coreValues: [
      {
        title: String,
        description: String,
        icon: String,
        iconWidth: String,
        iconHeight: String,
        separator: String,
        gap: String,
      },
    ],
    leadership: [
      {
        name: { type: String, required: true },
        position: { type: String, required: true },
        bio: { type: String, default: "" },
        photo: { type: String, default: "" },
        order: { type: Number, default: 0 },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        type: {
          type: String,
          enum: ["leadership", "team_member"],
          default: "leadership",
        },
      },
    ],
    targetGroups: [
      {
        icon: String,
        title: String,
        iconWidth: String,
        iconHeight: String,
      },
    ],
    operationRegions: [
      {
        name: String,
        description: String,
        position: {
          x: String,
          y: String,
        },
      },
    ],
    supporters: [
      {
        name: String,
        logo: String,
      },
    ],
    footer: {
      socialLinks: [
        {
          platform: { type: String, required: true },
          url: { type: String, required: true },
          icon: { type: String, required: true },
          isActive: { type: Boolean, default: true },
        },
      ],
      whatsappNumber: { type: String, default: "" },
      termsAndConditions: {
        fileUrl: { type: String, default: "" },
        fileName: { type: String, default: "" },
      },
      privacyPolicy: {
        fileUrl: { type: String, default: "" },
        fileName: { type: String, default: "" },
      },
      contactInfo: {
        email: { type: String, default: "TSD@ngo.com" },
        address: {
          type: String,
          default:
            "Friendship Business Center, 7th Floor, Bole, Addis Ababa, Ethiopia",
        },
        phone: { type: String, default: "" },
      },
      keyFunders: [
        {
          name: String,
        },
      ],
      networks: [
        {
          name: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
