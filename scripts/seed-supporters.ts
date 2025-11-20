import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import Supporter from "../lib/db/models/Supporter";

/**
 * ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል - Supporters Seed Data
 * These supporters will appear in the "CERTIFICATIONS & RECOGNITIONS" section
 */
const defaultSupporters = [
  {
    name: "Ethiopian Ministry of Health",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 1,
    isActive: true,
    link: "https://www.moh.gov.et",
    description: "Official health ministry certification",
  },
  {
    name: "Traditional Medicine Association of Ethiopia",
    logo: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 2,
    isActive: true,
    link: "",
    description: "Professional association for traditional medicine practitioners",
  },
  {
    name: "Herbal Medicine Research Center",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 3,
    isActive: true,
    link: "",
    description: "Research and development partner",
  },
  {
    name: "Indigenous Healing Network",
    logo: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 4,
    isActive: true,
    link: "",
    description: "Network of traditional healing practitioners",
  },
  {
    name: "Traditional Medicine Certification Board",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 5,
    isActive: true,
    link: "",
    description: "Certification and accreditation body",
  },
  {
    name: "Ethiopian Herbal Medicine License",
    logo: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 6,
    isActive: true,
    link: "",
    description: "Licensed herbal medicine preparation facility",
  },
  {
    name: "Medical Center Accreditation",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    order: 7,
    isActive: true,
    link: "",
    description: "Accredited medical center status",
  },
];

async function seedSupporters() {
  try {
    console.log("🌱 Starting Supporters seeding...");

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing supporters
    const deleteResult = await Supporter.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing supporters`);

    // Insert default supporters
    const insertedSupporters = await Supporter.insertMany(defaultSupporters);
    console.log(`✅ Inserted ${insertedSupporters.length} supporters`);

    // Log summary
    console.log("\n📊 Supporters Summary:");
    insertedSupporters.forEach((supporter) => {
      console.log(`  - ${supporter.name} (Order: ${supporter.order})`);
    });

    console.log("\n✅ Supporters seeding completed successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding supporters:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedSupporters();
