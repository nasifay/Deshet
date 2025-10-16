import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;

    console.log("🔍 Testing MongoDB Atlas Connection...\n");
    console.log("Connection URI (masked):", uri?.replace(/:[^:@]+@/, ":****@"));
    console.log("");

    console.log("1. Attempting to connect...");
    await mongoose.connect(uri!);
    console.log("✅ Connection successful!\n");

    console.log("2. Testing database access...");
    const adminDb = mongoose.connection.db.admin();
    const { databases } = await adminDb.listDatabases();
    console.log("✅ Can list databases!\n");
    console.log("Available databases:");
    databases.forEach((db: any) => {
      console.log(
        `   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`
      );
    });

    console.log("\n3. Testing collection access...");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("✅ Can list collections!");
    console.log(
      `Collections in "${mongoose.connection.db.databaseName}" database:`,
      collections.length
    );
    if (collections.length > 0) {
      collections.forEach((coll: any) => {
        console.log(`   - ${coll.name}`);
      });
    } else {
      console.log(
        "   (No collections yet - this is normal for a new database)"
      );
    }

    console.log("\n✅ All tests passed! Your connection is working correctly.");
  } catch (error: any) {
    console.error("\n❌ Connection test failed:", error.message);
    console.error("\nError details:", error);

    if (error.message.includes("authentication")) {
      console.error("\n🔧 FIX: Check your MongoDB Atlas user permissions:");
      console.error("   1. Go to https://cloud.mongodb.com/");
      console.error('   2. Click "Database Access" in the left sidebar');
      console.error(
        '   3. Edit your user and ensure they have "readWrite" permissions'
      );
      console.error('   4. Make sure the user can access the "tamra" database');
    }
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from database");
  }
}

testConnection();
