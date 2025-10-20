import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";
import { existsSync } from "fs";

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env");
const envLocalPath = path.resolve(process.cwd(), ".env.local");

if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env or .env.local file");
}

async function verifyGallerySeed() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    console.log("🔍 Verifying gallery seed data...");

    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    const categoriesCollection = db.collection("gallerycategories");
    const galleryCollection = db.collection("galleries");

    // Get all categories
    const categories = await categoriesCollection.find({}).toArray();
    console.log(`\n📁 Categories (${categories.length}):`);
    categories.forEach((cat) => {
      console.log(`   ${cat.icon} ${cat.name} (${cat.slug})`);
    });

    // Get all gallery items
    const galleryItems = await galleryCollection.find({}).toArray();
    console.log(`\n🖼️  Gallery Items (${galleryItems.length}):`);

    // Group by section
    const sectionGroups = galleryItems.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    Object.entries(sectionGroups).forEach(([section, items]) => {
      const featuredCount = items.filter((item) => item.featured).length;
      console.log(
        `\n   📂 ${section} (${items.length} items, ${featuredCount} featured):`
      );

      items.forEach((item) => {
        const featuredBadge = item.featured ? " ⭐" : "";
        console.log(`      - ${item.alt}${featuredBadge}`);
      });
    });

    // Check for required fields
    console.log("\n🔧 Model Field Verification:");
    const sampleItem = galleryItems[0];
    const requiredFields = ["section", "position", "featured"];

    requiredFields.forEach((field) => {
      const hasField = sampleItem && sampleItem[field] !== undefined;
      console.log(
        `   ${hasField ? "✅" : "❌"} ${field}: ${
          hasField ? "Present" : "Missing"
        }`
      );
    });

    console.log("\n✨ Gallery seed verification completed!");
  } catch (error) {
    console.error("❌ Error verifying gallery seed:", error);
    throw error;
  } finally {
    await client.close();
    console.log("✅ Database connection closed");
  }
}

// Run the verification
verifyGallerySeed();
