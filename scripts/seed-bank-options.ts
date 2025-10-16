import mongoose from "mongoose";
import BankOption from "../lib/db/models/BankOption";
import connectDB from "../lib/db/mongodb";

const defaultBankOptions = [
  {
    name: "Commercial Bank Of Ethiopia",
    accountNumber: "1000102030405",
    swiftCode: "CBETETAA",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0.png",
    copyIcon: "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174.png",
    organizationName: "Tamra ForSocial Development Organization",
    status: "active" as const,
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
    status: "active" as const,
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
    status: "active" as const,
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
    status: "active" as const,
    order: 4,
  },
];

async function seedBankOptions() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();

    console.log("🗑️  Clearing existing bank options...");
    await BankOption.deleteMany({});

    console.log("🏦 Creating bank options...");
    const bankOptions = await BankOption.insertMany(defaultBankOptions);

    console.log(`✅ Successfully created ${bankOptions.length} bank options:`);
    bankOptions.forEach((bank) => {
      console.log(`  - ${bank.name} (Order: ${bank.order})`);
    });

    console.log("\n🎉 Bank options seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding bank options:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("👋 Database connection closed");
  }
}

// Run the seed function
seedBankOptions();
