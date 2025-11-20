/**
 * Cleanup Script: Remove MedicalPartnersSection from Landing Page
 * 
 * This script removes any existing MedicalPartnersSection entries from the landing page
 * and replaces them with PartnersCertificationsSection if needed.
 * 
 * Usage: npx tsx scripts/cleanup-medical-partners-section.ts
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

async function cleanupMedicalPartnersSection() {
  try {
    console.log("🧹 Starting cleanup of MedicalPartnersSection...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("✅ Connected to MongoDB\n");

    // Import Page model
    const Page = (await import("../lib/db/models/Page")).default;

    // Find landing page
    const landingPage = await Page.findOne({ slug: "landing" });

    if (!landingPage) {
      console.log("⚠️  Landing page not found. Nothing to clean up.");
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log(`📄 Found landing page: ${landingPage._id}`);
    console.log(`📊 Current sections: ${landingPage.sections?.length || 0}\n`);

    // Check if MedicalPartnersSection exists
    const medicalPartnersSections = landingPage.sections?.filter(
      (section: any) => section.type === "MedicalPartnersSection"
    ) || [];

    if (medicalPartnersSections.length === 0) {
      console.log("✅ No MedicalPartnersSection found. Nothing to clean up.");
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log(`🔍 Found ${medicalPartnersSections.length} MedicalPartnersSection(s) to remove\n`);

    // Remove MedicalPartnersSection and update order
    const updatedSections = landingPage.sections
      ?.filter((section: any) => section.type !== "MedicalPartnersSection")
      .map((section: any, index: number) => ({
        ...section,
        order: index,
      })) || [];

    // Update landing page
    landingPage.sections = updatedSections;
    await landingPage.save();

    console.log(`✅ Removed ${medicalPartnersSections.length} MedicalPartnersSection(s)`);
    console.log(`📊 Updated sections count: ${updatedSections.length}`);
    console.log("\n✨ Cleanup completed successfully!");
    console.log("\n📝 Note: Supporters are now managed via /admin/supporters");
    console.log("🌐 The PartnersCertificationsSection will automatically fetch from the supporters API\n");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the cleanup function
cleanupMedicalPartnersSection();






