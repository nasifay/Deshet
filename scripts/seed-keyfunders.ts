import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import KeyFunder from "../lib/db/models/KeyFunder";

const defaultKeyFunders = [
  {
    name: "Norwegian Church Aid",
    logo: "/suporters/norweign-church.png",
    order: 1,
    isActive: true,
    link: "https://www.kirkensnodhjelp.no/",
    description:
      "International humanitarian organization working for justice and dignity",
    type: "key_funder",
  },
  {
    name: "Youth Network for Sustainable Development",
    logo: "/suporters/youth-network.png",
    order: 2,
    isActive: true,
    link: "https://ynsd.org/",
    description: "Empowering youth for sustainable development across Africa",
    type: "key_funder",
  },
  {
    name: "PEPFAR",
    logo: "/suporters/pepfar.png",
    order: 3,
    isActive: true,
    link: "https://www.state.gov/pepfar/",
    description: "U.S. President's Emergency Plan for AIDS Relief",
    type: "key_funder",
  },
  {
    name: "Children's Rights and Violence Prevention Fund",
    logo: "/suporters/children-rights.png",
    order: 4,
    isActive: true,
    link: "https://www.crvpf.org/",
    description: "Building a violence-free Africa for children",
    type: "key_funder",
  },
  {
    name: "Sonke Gender Justice",
    logo: "/suporters/sonke-gender-justice.png",
    order: 5,
    isActive: true,
    link: "https://genderjustice.org.za/",
    description:
      "Working to prevent gender-based violence and promote gender equality",
    type: "key_funder",
  },
];

async function seedKeyFunders() {
  try {
    console.log("🌱 Starting Key Funders seeding...");

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing key funders
    const deleteResult = await KeyFunder.deleteMany({});
    console.log(
      `🗑️  Cleared ${deleteResult.deletedCount} existing key funders`
    );

    // Insert default key funders
    const insertedKeyFunders = await KeyFunder.insertMany(defaultKeyFunders);
    console.log(`✅ Inserted ${insertedKeyFunders.length} key funders`);

    // Log summary
    console.log("\n📊 Key Funders Summary:");
    insertedKeyFunders.forEach((keyFunder) => {
      console.log(`  - ${keyFunder.name} (Order: ${keyFunder.order})`);
    });

    console.log("\n✅ Key Funders seeding completed successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding key funders:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedKeyFunders();
