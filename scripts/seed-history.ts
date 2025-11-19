import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load environment variables from .env or .env.local
const envPath = path.resolve(process.cwd(), ".env");
const envLocalPath = path.resolve(process.cwd(), ".env.local");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env or .env.local file");
}

// History data based on the original hardcoded content
const historyData = {
  title: "HISTORY",
  subtitle:
    "Tracing our journey of growth, impact, and commitment to communities across Ethiopia.",
  heroImages: ["https://c.animaapp.com/mgcmuny5RiWnl8/img/rectangle-921.svg"],
  introductionParagraphs: [
    "Since its establishment, Tamra Social Development has been committed to empowering communities and driving sustainable change across Ethiopia. What began as a small initiative has grown into a trusted organization working in diverse thematic areas, building partnerships, and touching countless lives.",
    "Our history reflects not only the milestones we have achieved but also the resilience, collaboration, and vision that continue to guide us toward a more inclusive and equitable future.",
  ],
  milestonesImage: "/milestones.png",
  timelineSections: [
    {
      title: "2025 – TODAY",
      description:
        "Continuing To Create Inclusive, People-centered, And Accountable Programs Aligned With Tamra's Mission And Vision.",
      order: 0,
    },
  ],
  closingQuote:
    "From Our Beginnings To Today, Tamra Social Development Stands Firm In Its Mission, Carrying Forward The Vision Of An Inclusive, Just, And Empowered Society.",
  status: "published",
  publishedAt: new Date(),
};

async function seedHistory() {
  let client: MongoClient | null = null;

  try {
    console.log("🔌 Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();

    // First, check if there's a default admin user to use as author
    const usersCollection = db.collection("users");
    let adminUser = await usersCollection.findOne({ role: "admin" });

    if (!adminUser) {
      console.log("⚠️ No admin user found. Creating a default admin user...");
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const result = await usersCollection.insertOne({
        name: "Admin",
        email: "admin@tamra.org",
        password: hashedPassword,
        role: "admin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      adminUser = await usersCollection.findOne({ _id: result.insertedId });
      console.log("✅ Created default admin user");
    }

    const authorId = adminUser!._id;

    // Add author and timestamps to history data
    const historyWithAuthor = {
      ...historyData,
      author: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if history already exists
    const historyCollection = db.collection("histories");
    const existingCount = await historyCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️ Found ${existingCount} existing history entries.`);
      console.log("🗑️ Clearing existing history entries...");
      await historyCollection.deleteMany({});
      console.log("✅ Cleared existing history entries");
    }

    // Insert history entry
    console.log("📜 Seeding history entry...");
    const result = await historyCollection.insertOne(historyWithAuthor);
    console.log(
      `✅ Successfully seeded history entry with ID: ${result.insertedId}`
    );

    // Display summary
    console.log("\n📊 Seeding Summary:");
    console.log("─".repeat(50));
    console.log(`Title: ${historyData.title}`);
    console.log(`Subtitle: ${historyData.subtitle.substring(0, 50)}...`);
    console.log(`Hero Images: ${historyData.heroImages.length}`);
    console.log(
      `Introduction Paragraphs: ${historyData.introductionParagraphs.length}`
    );
    console.log(`Timeline Sections: ${historyData.timelineSections.length}`);
    console.log(`Status: ${historyData.status}`);
    console.log("─".repeat(50));

    console.log("\n✨ History seeding completed successfully!");
    console.log("\n📝 Content Overview:");
    console.log(`\n📖 Introduction Paragraphs:`);
    historyData.introductionParagraphs.forEach((para, idx) => {
      console.log(`${idx + 1}. ${para.substring(0, 80)}...`);
    });

    console.log(`\n⏳ Timeline Sections:`);
    historyData.timelineSections.forEach((section, idx) => {
      console.log(`${idx + 1}. ${section.title}`);
      console.log(`   ${section.description.substring(0, 80)}...`);
    });

    console.log(`\n💬 Closing Quote:`);
    console.log(`"${historyData.closingQuote.substring(0, 100)}..."`);
  } catch (error) {
    console.error("❌ Error seeding history:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("\n🔌 Disconnected from MongoDB");
    }
  }
}

// Run the seed function
seedHistory();
