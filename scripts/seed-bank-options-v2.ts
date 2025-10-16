import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Direct connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

const defaultBankOptions = [
  {
    name: "Commercial Bank Of Ethiopia",
    accountNumber: "1000102030405",
    swiftCode: "CBETETAA",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0.png",
    copyIcon: "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174.png",
    organizationName: "Tamra ForSocial Development Organization",
    status: "active",
    order: 1,
  },
  {
    name: "Tele Birr",
    number: "+251 91111111",
    id: "1122334455",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/commercial-bank-of-ethiopia-logo-1-1.svg",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-1.png",
    organizationName: "Tamra ForSocial Development Organization",
    status: "active",
    order: 2,
  },
  {
    name: "Bank Of Abyssinia",
    accountNumber: "1000102030405",
    swiftCode: "ABYSETAAXXX",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0-1.png",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-2.png",
    organizationName: "Tamra ForSocial Development Organization",
    status: "active",
    order: 3,
  },
  {
    name: "Awash Bank",
    accountNumber: "1000102030405",
    swiftCode: "AWINETAAXXX",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/commercial-bank-of-ethiopia-logo-1.svg",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-3.png",
    organizationName: "Tamra ForSocial Development Organization",
    status: "active",
    order: 4,
  },
];

async function seedBankOptions() {
  let connection: typeof mongoose | null = null;

  try {
    console.log("🔌 Connecting to MongoDB...");
    console.log("📍 URI:", MONGODB_URI);

    // Create a fresh connection
    connection = await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected");

    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }

    console.log("🔍 Database:", mongoose.connection.db.databaseName);

    // Use direct MongoDB collection methods to avoid model cache issues
    const collection = mongoose.connection.db.collection("bankoptions");
    console.log("🔍 Collection: bankoptions");

    // Check existing count
    const existingCount = await collection.countDocuments();
    console.log(`📊 Existing bank options: ${existingCount}`);

    // Clear existing
    console.log("🗑️  Clearing existing bank options...");
    const deleteResult = await collection.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} documents`);

    // Insert new data
    console.log("🏦 Creating bank options...");
    const insertResult = await collection.insertMany(defaultBankOptions);
    console.log(`✅ Inserted ${insertResult.insertedCount} documents`);

    // Verify the insertion
    const verifyCount = await collection.countDocuments();
    console.log(`🔍 Verification: ${verifyCount} documents in collection`);

    // Fetch and display the inserted documents
    const inserted = await collection.find({}).toArray();
    console.log(`\n✅ Successfully inserted ${inserted.length} bank options:`);
    inserted.forEach((bank: any) => {
      console.log(
        `  - ${bank.name} (Order: ${bank.order}, Status: ${bank.status})`
      );
    });

    if (verifyCount !== defaultBankOptions.length) {
      console.error("❌ WARNING: Document count mismatch!");
    } else {
      console.log("\n🎉 Bank options seeding completed successfully!");
      console.log(
        "\n⚠️  IMPORTANT: Restart your Next.js dev server to see the changes!"
      );
    }
  } catch (error) {
    console.error("❌ Error seeding bank options:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.connection.close();
      console.log("\n👋 Database connection closed");
    }
  }
}

// Run the seed function
seedBankOptions();
