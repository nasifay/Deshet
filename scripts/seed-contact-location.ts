/**
 * Seed Contact Location (SiteSettings.contactLocation)
 *
 * Run with:
 *   npx tsx scripts/seed-contact-location.ts
 *
 * Optional environment overrides:
 *   CONTACT_LAT=9.0192 CONTACT_LNG=38.7578 CONTACT_ZOOM=13 npx tsx scripts/seed-contact-location.ts
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

async function main() {
  console.log("🌱 Seeding contact location...\n");
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("✅ MongoDB Connected\n");

    const SiteSettings = (await import("../lib/db/models/SiteSettings"))
      .default;

    const latitude = parseFloat(process.env.CONTACT_LAT || "9.0192");
    const longitude = parseFloat(process.env.CONTACT_LNG || "38.7578");
    const zoom = parseInt(process.env.CONTACT_ZOOM || "13", 10);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      throw new Error(
        "Invalid CONTACT_LAT or CONTACT_LNG. Provide numeric values."
      );
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90.");
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180.");
    }

    // Use most recent settings document or create one
    let settings = await SiteSettings.findOne({}, null, {
      sort: { updatedAt: -1 },
    });
    if (!settings) {
      console.log(
        "No SiteSettings found. Creating a new one with contactLocation only..."
      );
      settings = await SiteSettings.create({
        contactLocation: { latitude, longitude, zoom },
      } as any);
    } else {
      settings.contactLocation = { latitude, longitude, zoom } as any;
      await settings.save();
    }

    console.log("   📍 contactLocation set to:");
    console.log(`      latitude:  ${latitude}`);
    console.log(`      longitude: ${longitude}`);
    console.log(`      zoom:      ${zoom}`);
    console.log("\n✅ Done.");
  } catch (err) {
    console.error("❌ Failed to seed contact location:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from database");
  }
}

main();
