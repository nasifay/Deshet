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
  // Board Members
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2bf"),
    name: "Dr. Sarah Johnson",
    position: "Board Chair",
    bio: "Dr. Sarah Johnson brings over 20 years of experience in international development and governance.",
    photo: "/uploads/board-chair.jpg",
    order: 0,
    email: "sarah.johnson@example.com",
    phone: "+251 911 123456",
    type: "board_member",
  },
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2c0"),
    name: "Michael Chen",
    position: "Board Vice-Chair",
    bio: "Michael Chen is a seasoned executive with expertise in strategic planning and organizational development.",
    photo: "/uploads/board-vice-chair.jpg",
    order: 1,
    email: "michael.chen@example.com",
    phone: "+251 911 234567",
    type: "board_member",
  },
  {
    _id: new mongoose.Types.ObjectId("68efa06c7bc763ee1406f8d2"),
    name: "Aisha Mohammed",
    position: "Board Secretary",
    bio: "Aisha Mohammed is a legal expert specializing in non-profit governance and compliance.",
    photo: "/uploads/board-secretary.jpg",
    order: 2,
    email: "aisha.mohammed@example.com",
    phone: "+251 911 345678",
    type: "board_member",
  },
  // Leadership Team
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2c1"),
    name: "Biruk Yergalemnn",
    position: "Executive Director",
    bio: "Biruk Yergalemnn leads the organization with vision and dedication to community development.",
    photo: "/uploads/1760537720992-biruk-yir.png",
    order: 0,
    email: "biruk.yergalemnn@example.com",
    phone: "+251 911 456789",
    type: "leadership",
  },
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2c2"),
    name: "Biruktawit Taye",
    position: "Program Manager",
    bio: "Biruktawit Taye oversees program implementation and ensures quality service delivery.",
    photo: "/uploads/1760537843814-biruk-taye.png",
    order: 1,
    email: "biruktawit.taye@example.com",
    phone: "+251 911 567890",
    type: "leadership",
  },
  {
    _id: new mongoose.Types.ObjectId("68efa06c7bc763ee1406f8d3"),
    name: "Bisrat Nigussie",
    position: "Head of Finance, Administration & HR",
    bio: "Bisrat Nigussie manages the organization's financial operations and human resources.",
    photo: "/uploads/1760538244747-bisrat.jpg",
    order: 2,
    email: "bisrat.nigussie@example.com",
    phone: "+251 911 678901",
    type: "leadership",
  },
  // Team Members
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2c3"),
    name: "Elena Rodriguez",
    position: "Community Outreach Coordinator",
    bio: "Elena Rodriguez coordinates community engagement activities and volunteer programs.",
    photo: "/uploads/team-member-1.jpg",
    order: 0,
    email: "elena.rodriguez@example.com",
    phone: "+251 911 789012",
    type: "team_member",
  },
  {
    _id: new mongoose.Types.ObjectId("68e8ce61eb5288e81b8fb2c4"),
    name: "David Kim",
    position: "IT Support Specialist",
    bio: "David Kim provides technical support and maintains the organization's digital infrastructure.",
    photo: "/uploads/team-member-2.jpg",
    order: 1,
    email: "david.kim@example.com",
    phone: "+251 911 890123",
    type: "team_member",
  },
  {
    _id: new mongoose.Types.ObjectId("68efa06c7bc763ee1406f8d4"),
    name: "Fatima Hassan",
    position: "Administrative Assistant",
    bio: "Fatima Hassan provides administrative support and ensures smooth office operations.",
    photo: "/uploads/team-member-3.jpg",
    order: 2,
    email: "fatima.hassan@example.com",
    phone: "+251 911 901234",
    type: "team_member",
  },
];

async function seedLeadershipEnhanced() {
  try {
    console.log("🌱 Starting Enhanced Leadership members seeding...");

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
    console.log("✅ Enhanced leadership members saved successfully!");

    // Log summary by type
    const boardMembers = siteSettings.leadership.filter(
      (m: any) => m.type === "board_member"
    );
    const leadership = siteSettings.leadership.filter(
      (m: any) => m.type === "leadership"
    );
    const teamMembers = siteSettings.leadership.filter(
      (m: any) => m.type === "team_member"
    );

    console.log("\n📊 Leadership Structure Summary:");
    console.log(`  Board Members: ${boardMembers.length}`);
    console.log(`  Leadership Team: ${leadership.length}`);
    console.log(`  Team Members: ${teamMembers.length}`);
    console.log(`  Total Members: ${siteSettings.leadership.length}`);

    console.log("\n🏛️ Board Members:");
    boardMembers.forEach((member: any, index: number) => {
      console.log(`    ${index + 1}. ${member.name} - ${member.position}`);
    });

    console.log("\n👔 Leadership Team:");
    leadership.forEach((member: any, index: number) => {
      console.log(`    ${index + 1}. ${member.name} - ${member.position}`);
    });

    console.log("\n👥 Team Members:");
    teamMembers.forEach((member: any, index: number) => {
      console.log(`    ${index + 1}. ${member.name} - ${member.position}`);
    });

    console.log(
      "\n✅ Enhanced leadership members seeding completed successfully!"
    );

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding enhanced leadership members:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedLeadershipEnhanced();
