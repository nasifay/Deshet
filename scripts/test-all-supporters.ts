#!/usr/bin/env node
/**
 * Master Test Script: Complete Supporters Integration Test
 * 
 * This script runs all tests in sequence:
 * 1. Cleanup MedicalPartnersSection
 * 2. Seed supporters data
 * 3. Test integration
 * 
 * Usage: npx tsx scripts/test-all-supporters.ts
 */

import { execSync } from "child_process";
import { resolve } from "path";

const scriptsDir = resolve(process.cwd(), "scripts");

console.log("🚀 Starting Complete Supporters Integration Test\n");
console.log("=" .repeat(60));
console.log("");

try {
  // Step 1: Cleanup MedicalPartnersSection
  console.log("📋 Step 1: Cleaning up MedicalPartnersSection...");
  console.log("-".repeat(60));
  try {
    execSync("npx tsx scripts/cleanup-medical-partners-section.ts", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log("");
  } catch (error) {
    console.log("⚠️  Cleanup script had issues (this is okay if no data exists)\n");
  }

  // Step 2: Seed supporters
  console.log("📋 Step 2: Seeding supporters data...");
  console.log("-".repeat(60));
  execSync("npx tsx scripts/seed-supporters.ts", {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  console.log("");

  // Step 3: Test integration
  console.log("📋 Step 3: Testing integration...");
  console.log("-".repeat(60));
  execSync("npx tsx scripts/test-supporters-integration.ts", {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  console.log("");

  console.log("=" .repeat(60));
  console.log("✅ All tests completed successfully!");
  console.log("");
  console.log("📝 Next steps:");
  console.log("   1. Visit /admin/supporters to manage supporters");
  console.log("   2. Visit /admin/landing to verify no MedicalPartnersSection");
  console.log("   3. Visit / to see PartnersCertificationsSection in action");
  console.log("");

} catch (error) {
  console.error("❌ Test failed:", error);
  process.exit(1);
}






