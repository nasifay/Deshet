import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import SiteSettings from "../lib/db/models/SiteSettings";

async function migrateAddTypeToLeadership() {
  try {
    console.log(
      "🌱 Starting migration: Add type field to leadership members..."
    );

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get site settings
    const siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      console.log("❌ No SiteSettings document found!");
      process.exit(1);
    }

    console.log(
      `\n📊 Found ${siteSettings.leadership.length} leadership members`
    );

    let updatedCount = 0;

    // Update each member without a type field
    siteSettings.leadership.forEach((member: any, index: number) => {
      if (!member.type) {
        member.type = "leadership";
        updatedCount++;
        console.log(`  ✅ Updated: ${member.name} - added type: "leadership"`);
      } else {
        console.log(
          `  ⏭️  Skipped: ${member.name} - already has type: "${member.type}"`
        );
      }
    });

    if (updatedCount > 0) {
      await siteSettings.save({ validateModifiedOnly: true });
      console.log(
        `\n✅ Migration completed! Updated ${updatedCount} member(s)`
      );
    } else {
      console.log(
        "\n✅ No updates needed - all members already have type field"
      );
    }

    // Log final summary
    console.log("\n📋 Final Leadership Members:");
    siteSettings.leadership.forEach((member: any, index: number) => {
      console.log(
        `    ${index + 1}. ${member.name} - ${member.position} (Type: ${
          member.type
        })`
      );
    });

    // Close connection
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during migration:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the migration
migrateAddTypeToLeadership();
