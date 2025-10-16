import mongoose from "mongoose";

// Direct connection without using the cached connection
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

// Define the schema inline to avoid import issues
const BankOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bank name is required"],
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
      default: null,
    },
    number: {
      type: String,
      trim: true,
      default: null,
    },
    id: {
      type: String,
      trim: true,
      default: null,
    },
    swiftCode: {
      type: String,
      trim: true,
      default: null,
    },
    logo: {
      type: String,
      required: [true, "Logo is required"],
    },
    copyIcon: {
      type: String,
      default: null,
    },
    organizationName: {
      type: String,
      default: "Tamra ForSocial Development Organization",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

async function seedBankOptions() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    console.log("📍 URI:", MONGODB_URI);

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected");
    console.log("🔍 Database:", mongoose.connection.db.databaseName);

    // Get or create the model
    const BankOption =
      mongoose.models.BankOption ||
      mongoose.model("BankOption", BankOptionSchema);

    console.log("🔍 Collection name:", BankOption.collection.name);

    // Check existing count
    const existingCount = await BankOption.countDocuments();
    console.log(`📊 Existing bank options: ${existingCount}`);

    console.log("🗑️  Clearing existing bank options...");
    const deleteResult = await BankOption.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} documents`);

    console.log("🏦 Creating bank options...");
    const bankOptions = await BankOption.insertMany(defaultBankOptions);

    console.log(`✅ Inserted ${bankOptions.length} documents`);

    // Verify the insertion
    const verifyCount = await BankOption.countDocuments();
    console.log(`🔍 Verification: ${verifyCount} documents in collection`);

    // Fetch and display the inserted documents
    const inserted = await BankOption.find().lean();
    console.log(`\n✅ Successfully inserted ${inserted.length} bank options:`);
    inserted.forEach((bank: any) => {
      console.log(
        `  - ${bank.name} (Order: ${bank.order}, Status: ${bank.status})`
      );
    });

    // Direct collection verification
    const directCount = await mongoose.connection.db
      .collection("bankoptions")
      .countDocuments();
    console.log(`\n🔍 Direct collection count: ${directCount}`);

    if (directCount === 0) {
      console.error("❌ WARNING: Documents not found in collection!");
    } else {
      console.log("\n🎉 Bank options seeding completed successfully!");
    }
  } catch (error) {
    console.error("❌ Error seeding bank options:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
  }
}

// Run the seed function
seedBankOptions();
