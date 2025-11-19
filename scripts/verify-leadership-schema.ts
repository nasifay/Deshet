import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

// Clear any existing models to force reload
delete (mongoose.models as any).SiteSettings;

import SiteSettings from "../lib/db/models/SiteSettings";

async function verifyLeadershipSchema() {
  try {
    console.log("🔍 Verifying leadership schema...");

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Test creating a board member
    const testBoardMember = {
      _id: new mongoose.Types.ObjectId(),
      name: "Test Board Member",
      position: "Test Board Position",
      bio: "Test bio",
      photo: "",
      order: 999,
      email: "test@example.com",
      phone: "+251 911 000000",
      type: "board_member",
    };

    console.log("🧪 Testing board_member type validation...");

    // Get current site settings
    let siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      console.log("📝 Creating new SiteSettings for testing...");
      siteSettings = new SiteSettings({
        leadership: [testBoardMember],
      });
    } else {
      console.log("📝 Adding test board member to existing settings...");
      siteSettings.leadership.push(testBoardMember as any);
    }

    // Mark as modified
    siteSettings.markModified("leadership");

    // Try to save
    await siteSettings.save({ validateModifiedOnly: true });
    console.log("✅ board_member type validation passed!");

    // Remove test member
    siteSettings.leadership = siteSettings.leadership.filter(
      (member: any) => member._id.toString() !== testBoardMember._id.toString()
    );
    siteSettings.markModified("leadership");
    await siteSettings.save({ validateModifiedOnly: true });
    console.log("✅ Test member removed successfully!");

    // Test all three types
    const testMembers = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Test Board Member",
        position: "Board Position",
        bio: "Test bio",
        photo: "",
        order: 999,
        email: "board@example.com",
        phone: "+251 911 000001",
        type: "board_member",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Test Leadership Member",
        position: "Leadership Position",
        bio: "Test bio",
        photo: "",
        order: 998,
        email: "leadership@example.com",
        phone: "+251 911 000002",
        type: "leadership",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Test Team Member",
        position: "Team Position",
        bio: "Test bio",
        photo: "",
        order: 997,
        email: "team@example.com",
        phone: "+251 911 000003",
        type: "team_member",
      },
    ];

    console.log("🧪 Testing all three types...");
    siteSettings.leadership.push(...(testMembers as any));
    siteSettings.markModified("leadership");

    await siteSettings.save({ validateModifiedOnly: true });
    console.log("✅ All three types validation passed!");

    // Remove test members
    siteSettings.leadership = siteSettings.leadership.filter(
      (member: any) =>
        !testMembers.some(
          (test) => test._id.toString() === member._id.toString()
        )
    );
    siteSettings.markModified("leadership");
    await siteSettings.save({ validateModifiedOnly: true });
    console.log("✅ Test members removed successfully!");

    console.log("\n✅ Schema verification completed successfully!");
    console.log(
      "🎯 The schema is working correctly. If you're still getting validation errors,"
    );
    console.log(
      "   try restarting your Next.js development server to clear the model cache."
    );

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Schema verification failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the verification
verifyLeadershipSchema();
