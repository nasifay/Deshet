import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import SiteSettings from "../lib/db/models/SiteSettings";

const leadershipMembers = [
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2bf"),
    name: "Biruk Yergalemnn",
    position: "Excecutive Director",
    bio: "",
    photo: "/uploads/1760537720992-biruk-yir.png",
    order: 0,
    email: "",
    phone: "",
    type: "leadership",
  },
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2c0"),
    name: "Biruktawit Taye",
    position: "Program Manager",
    bio: "",
    photo: "/uploads/1760537843814-biruk-taye.png",
    order: 1,
    email: "",
    phone: "",
    type: "leadership",
  },
  {
    _id: new mongoose.Types.ObjectId("68efa06c7bc763ee1406f8d2"),
    name: "Bisrat Nigussie",
    position: "Head of Finance, Administration & HR",
    bio: "",
    photo: "/uploads/1760538244747-bisrat.jpg",
    order: 2,
    email: "",
    phone: "",
    type: "leadership",
  },
];

async function seedLeadershipMembers() {
  try {
    console.log("🌱 Starting Leadership members seeding...");

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get or create site settings
    let siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      console.log("📝 Creating new SiteSettings document...");
      siteSettings = new SiteSettings({
        leadership: leadershipMembers,
      });
    } else {
      console.log("📝 Updating existing SiteSettings document...");
      siteSettings.leadership = leadershipMembers as any;
    }

    await siteSettings.save({ validateModifiedOnly: true });
    console.log("✅ Leadership members saved successfully!");

    // Log summary
    console.log("\n📊 Leadership Members Summary:");
    console.log(`  Total Members: ${siteSettings.leadership.length}`);
    siteSettings.leadership.forEach((member: any, index: number) => {
      console.log(
        `    ${index + 1}. ${member.name} - ${member.position} (Type: ${
          member.type
        })`
      );
    });

    console.log("\n✅ Leadership members seeding completed successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding leadership members:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedLeadershipMembers();
