import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import Supporter from "../lib/db/models/Supporter";

const defaultSupporters = [
  {
    name: "Norwegian Church Aid",
    logo: "/suporters/norweign-church.png",
    order: 1,
    isActive: true,
    link: "",
    description: "International humanitarian organization",
  },
  {
    name: "Ipas",
    logo: "/suporters/ipas.png",
    order: 2,
    isActive: true,
    link: "",
    description: "Global reproductive health and rights organization",
  },
  {
    name: "Sonke Gender Justice",
    logo: "/suporters/sonke-gender-justice.png",
    order: 3,
    isActive: true,
    link: "",
    description: "Gender justice and health organization",
  },
  {
    name: "Children Rights",
    logo: "/suporters/children-rights.png",
    order: 4,
    isActive: true,
    link: "",
    description: "Child rights advocacy organization",
  },
  {
    name: "PEPFAR",
    logo: "/suporters/pepfar.png",
    order: 5,
    isActive: true,
    link: "",
    description: "U.S. President's Emergency Plan for AIDS Relief",
  },
  {
    name: "Youth Network",
    logo: "/suporters/youth-network.png",
    order: 6,
    isActive: true,
    link: "",
    description: "Youth empowerment network",
  },
  {
    name: "GAC",
    logo: "/suporters/gac.png",
    order: 7,
    isActive: true,
    link: "",
    description: "Global Affairs Canada",
  },
  {
    name: "Build Up",
    logo: "/suporters/build-up.png",
    order: 8,
    isActive: true,
    link: "",
    description: "Community development organization",
  },
  {
    name: "USAID",
    logo: "/suporters/usaid.png",
    order: 9,
    isActive: true,
    link: "",
    description: "United States Agency for International Development",
  },
  {
    name: "Zeleman",
    logo: "/suporters/zeleman.png",
    order: 10,
    isActive: true,
    link: "",
    description: "Development partner",
  },
  {
    name: "Supporter",
    logo: "/suporters/supporter-logo.png",
    order: 11,
    isActive: true,
    link: "",
    description: "Supporting organization",
  },
  {
    name: "Search for Common Ground",
    logo: "/suporters/search-for-common-ground.png",
    order: 12,
    isActive: true,
    link: "",
    description: "Peacebuilding organization",
  },
  {
    name: "Supporter 2",
    logo: "/suporters/supporter-logo-2.png",
    order: 13,
    isActive: true,
    link: "",
    description: "Supporting organization",
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
