import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

import SiteSettings from "../lib/db/models/SiteSettings";

const defaultFooterData = {
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/TamraSDT",
      icon: "Facebook",
      isActive: true,
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/tamrasdt",
      icon: "Instagram",
      isActive: true,
    },
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@tamrasdt",
      icon: "Music4",
      isActive: true,
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/tamra-social-development-tamra-sdt",
      icon: "Linkedin",
      isActive: true,
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/tamrasdt",
      icon: "Twitter",
      isActive: true,
    },
  ],
  whatsappNumber: "+251911234567",
  termsAndConditions: {
    fileUrl: "/documents/terms-and-conditions.pdf",
    fileName: "Terms and Conditions.pdf",
  },
  privacyPolicy: {
    fileUrl: "/documents/privacy-policy.pdf",
    fileName: "Privacy Policy.pdf",
  },
  contactInfo: {
    email: "TSD@ngo.com",
    address:
      "Friendship Business Center, 7th Floor, Bole, Addis Ababa, Ethiopia",
    phone: "+251-11-618-6565",
  },
  keyFunders: [
    { name: "NCA" },
    { name: "YNSD" },
    { name: "CRVPF" },
    { name: "PEPFAR" },
    { name: "Sonke Gender Justice" },
  ],
  networks: [
    { name: "CCRDA" },
    { name: "CORHA" },
    { name: "PHE Ethiopia" },
    { name: "Men Engage Ethiopia" },
    { name: "Ubuntu Youth Peace Alliance" },
    { name: "Ethiopian Civil Societies Council" },
  ],
};

async function seedFooter() {
  try {
    console.log("🌱 Starting Footer seeding...");

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get or create site settings
    let siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      console.log("📝 Creating new SiteSettings document...");
      siteSettings = new SiteSettings({
        footer: defaultFooterData,
      });
    } else {
      console.log("📝 Updating existing SiteSettings document...");
      siteSettings.footer = defaultFooterData;
    }

    await siteSettings.save();
    console.log("✅ Footer data saved successfully!");

    // Log summary
    console.log("\n📊 Footer Data Summary:");
    console.log(`  Social Links: ${siteSettings.footer.socialLinks.length}`);
    siteSettings.footer.socialLinks.forEach((link) => {
      console.log(
        `    - ${link.platform}: ${link.url} (${
          link.isActive ? "Active" : "Inactive"
        })`
      );
    });

    console.log(`\n  Contact Info:`);
    console.log(`    - Email: ${siteSettings.footer.contactInfo.email}`);
    console.log(`    - Phone: ${siteSettings.footer.contactInfo.phone}`);
    console.log(`    - Address: ${siteSettings.footer.contactInfo.address}`);

    console.log(`\n  WhatsApp: ${siteSettings.footer.whatsappNumber}`);

    console.log(`\n  Key Funders: ${siteSettings.footer.keyFunders.length}`);
    siteSettings.footer.keyFunders.forEach((funder) => {
      console.log(`    - ${funder.name}`);
    });

    console.log(`\n  Networks: ${siteSettings.footer.networks.length}`);
    siteSettings.footer.networks.forEach((network) => {
      console.log(`    - ${network.name}`);
    });

    console.log(`\n  Documents:`);
    console.log(
      `    - Terms & Conditions: ${
        siteSettings.footer.termsAndConditions.fileName || "Not set"
      }`
    );
    console.log(
      `    - Privacy Policy: ${
        siteSettings.footer.privacyPolicy.fileName || "Not set"
      }`
    );

    console.log("\n✅ Footer seeding completed successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding footer:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedFooter();
