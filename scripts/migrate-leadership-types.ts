import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import SiteSettings from "../lib/db/models/SiteSettings";

async function migrateLeadershipTypes() {
  try {
    console.log("🔄 Starting leadership types migration...");

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get site settings
    const siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      console.log("❌ No SiteSettings found. Nothing to migrate.");
      await mongoose.connection.close();
      return;
    }

    console.log(
      "📊 Current leadership members:",
      siteSettings.leadership.length
    );

    // Update any existing members that might have invalid types
    let updated = false;
    for (let i = 0; i < siteSettings.leadership.length; i++) {
      const member = siteSettings.leadership[i];

      // If type is not one of the valid enum values, set it to a default
      if (
        !["board_member", "leadership", "team_member"].includes(member.type)
      ) {
        console.log(
          `🔄 Updating member ${member.name} type from '${member.type}' to 'leadership'`
        );
        siteSettings.leadership[i].type = "leadership";
        updated = true;
      }
    }

    if (updated) {
      // Mark the array as modified
      siteSettings.markModified("leadership");
      await siteSettings.save({ validateModifiedOnly: true });
      console.log("✅ Leadership types updated successfully!");
    } else {
      console.log("✅ All leadership types are already valid!");
    }

    // Verify the schema is working
    console.log("\n🧪 Testing schema validation...");

    // Try to create a test member with board_member type
    const testMember = {
      _id: new mongoose.Types.ObjectId(),
      name: "Test Board Member",
      position: "Test Position",
      bio: "Test bio",
      photo: "",
      order: 999,
      email: "",
      phone: "",
      type: "board_member",
    };

    // Add test member temporarily
    siteSettings.leadership.push(testMember as any);
    siteSettings.markModified("leadership");

    try {
      await siteSettings.save({ validateModifiedOnly: true });
      console.log(
        "✅ Schema validation test passed - board_member type is accepted!"
      );

      // Remove test member
      siteSettings.leadership = siteSettings.leadership.filter(
        (member: any) => member._id.toString() !== testMember._id.toString()
      );
      siteSettings.markModified("leadership");
      await siteSettings.save({ validateModifiedOnly: true });
      console.log("✅ Test member removed successfully!");
    } catch (error) {
      console.error("❌ Schema validation test failed:", error);

      // Remove test member if it was added
      siteSettings.leadership = siteSettings.leadership.filter(
        (member: any) => member._id.toString() !== testMember._id.toString()
      );
      siteSettings.markModified("leadership");
      await siteSettings.save({ validateModifiedOnly: true });
    }

    // Log final summary
    console.log("\n📊 Final Leadership Summary:");
    const boardMembers = siteSettings.leadership.filter(
      (m: any) => m.type === "board_member"
    );
    const leadership = siteSettings.leadership.filter(
      (m: any) => m.type === "leadership"
    );
    const teamMembers = siteSettings.leadership.filter(
      (m: any) => m.type === "team_member"
    );

    console.log(`  Board Members: ${boardMembers.length}`);
    console.log(`  Leadership: ${leadership.length}`);
    console.log(`  Team Members: ${teamMembers.length}`);
    console.log(`  Total: ${siteSettings.leadership.length}`);

    console.log("\n✅ Leadership types migration completed successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during leadership types migration:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the migration
migrateLeadershipTypes();
