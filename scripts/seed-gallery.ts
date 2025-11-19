import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";
import { existsSync } from "fs";

// Load environment variables from .env or .env.local
const envPath = path.resolve(process.cwd(), ".env");
const envLocalPath = path.resolve(process.cwd(), ".env.local");

if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env or .env.local file");
}

const galleryCategories = [
  {
    name: "CLM",
    slug: "clm",
    description: "Child Labor Monitoring program images",
    color: "#128341",
    icon: "👶",
    order: 1,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-7.svg",
    hasBackground: true,
    backgroundImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-48.png",
    gap: "gap-[54px]",
  },
  {
    name: "CRPVF",
    slug: "crpvf",
    description: "Child Rights Protection and Violence Free program",
    color: "#128341",
    icon: "🛡️",
    order: 2,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-6.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "CSPW",
    slug: "cspw",
    description: "Child Safe Protection and Wellbeing program",
    color: "#128341",
    icon: "🏥",
    order: 3,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-2.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "Events",
    slug: "events",
    description: "Organization events and activities",
    color: "#FF9700",
    icon: "🎉",
    order: 4,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-1.svg",
    hasBackground: false,
    gap: "gap-[15px]",
  },
  {
    name: "Exhibition",
    slug: "exhibition",
    description: "Exhibitions and showcases",
    color: "#128341",
    icon: "🎨",
    order: 5,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-9.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "GESI",
    slug: "gesi",
    description: "Gender Equality and Social Inclusion program",
    color: "#128341",
    icon: "⚖️",
    order: 6,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-4.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "SRHR",
    slug: "srhr",
    description: "Sexual and Reproductive Health Rights program",
    color: "#128341",
    icon: "❤️",
    order: 7,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-8.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "Meetings",
    slug: "meetings",
    description: "Organizational meetings and conferences",
    color: "#128341",
    icon: "🤝",
    order: 8,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-5.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "Training",
    slug: "training",
    description: "Training programs and workshops",
    color: "#128341",
    icon: "📚",
    order: 9,
    isActive: true,
    featuredImage:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120.svg",
    hasBackground: false,
    gap: "gap-[54px]",
  },
  {
    name: "Recognition",
    slug: "recognition",
    description: "Awards, certifications, and recognition",
    color: "#FF9700",
    icon: "🏆",
    order: 10,
    isActive: true,
    hasBackground: false,
    gap: "gap-[54px]",
  },
];

async function seedGallery() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    console.log("🌱 Starting gallery seed...");

    // Connect to database
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    const usersCollection = db.collection("users");
    const categoriesCollection = db.collection("gallerycategories");
    const galleryCollection = db.collection("galleries");

    // Get admin user for uploads (or create one if needed)
    let adminUser = await usersCollection.findOne({ role: "admin" });
    if (!adminUser) {
      adminUser = await usersCollection.findOne({ role: "superadmin" });
    }
    if (!adminUser) {
      console.log(
        "⚠️  No admin user found. Please create an admin user first."
      );
      console.log("   Run: npm run seed");
      process.exit(1);
    }
    console.log(`✅ Using admin user: ${adminUser.email}`);

    // Clear existing gallery data
    console.log("🗑️  Clearing existing gallery data...");
    const deletedItems = await galleryCollection.deleteMany({});
    console.log(
      `✅ Cleared ${deletedItems.deletedCount} existing gallery items`
    );

    const deletedCategories = await categoriesCollection.deleteMany({});
    console.log(
      `✅ Cleared ${deletedCategories.deletedCount} existing gallery categories`
    );

    // Seed categories
    console.log("📁 Seeding gallery categories...");
    const categoryResult = await categoriesCollection.insertMany(
      galleryCategories.map((cat) => ({
        ...cat,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
    console.log(
      `✅ Created ${categoryResult.insertedCount} gallery categories`
    );

    // Get inserted categories to get their IDs
    const insertedCategories = await categoriesCollection.find({}).toArray();

    // Create sample gallery items for each category
    console.log("🖼️  Seeding gallery items...");

    const sampleImages = [
      {
        url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-19.png",
        alt: "Sample gallery image 1",
        caption: "Community engagement activity",
      },
      {
        url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-20.png",
        alt: "Sample gallery image 2",
        caption: "Training workshop session",
      },
      {
        url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-21.png",
        alt: "Sample gallery image 3",
        caption: "Field visit and monitoring",
        customClass: "w-[703px] rounded-[31px] object-cover relative h-80",
      },
    ];

    const galleryItems = [];

    // Add 2-3 images per category
    for (const category of insertedCategories) {
      const numImages = Math.floor(Math.random() * 2) + 2; // 2-3 images

      for (let i = 0; i < numImages; i++) {
        const sampleImage = sampleImages[i % sampleImages.length];

        galleryItems.push({
          filename: `${category.slug}-${Date.now()}-${i}.jpg`,
          originalName: `${category.name} - Image ${i + 1}.jpg`,
          url: sampleImage.url,
          type: "image",
          mimeType: "image/png",
          size: Math.floor(Math.random() * 500000) + 100000, // Random size 100KB-600KB
          dimensions: {
            width: 800,
            height: 600,
          },
          alt: `${category.name} - ${sampleImage.alt}`,
          caption: `${category.name}: ${sampleImage.caption}`,
          customClass: i === 2 ? sampleImage.customClass : undefined,
          category: new ObjectId(category._id),
          uploadedBy: new ObjectId(adminUser._id),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Add special recognition images
    const recognitionCategory = insertedCategories.find(
      (cat) => (cat as unknown as { slug: string }).slug === "recognition"
    );
    if (recognitionCategory) {
      const recognitionImages = [
        {
          url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-19.png",
          customClass:
            "w-full md:w-[314px] max-w-[314px] md:ml-[-6.00px] relative h-auto md:h-80",
          alt: "Award Certificate 1",
        },
        {
          url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-20.png",
          customClass:
            "w-full md:w-[314px] max-w-[314px] relative h-auto md:h-80",
          alt: "Award Certificate 2",
        },
        {
          url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-21.png",
          customClass:
            "w-full md:w-[703px] max-w-[703px] md:mr-[-6.00px] rounded-[31px] object-cover relative h-auto md:h-80",
          alt: "Recognition Event",
        },
      ];

      for (let i = 0; i < recognitionImages.length; i++) {
        const img = recognitionImages[i];
        galleryItems.push({
          filename: `recognition-${Date.now()}-${i}.png`,
          originalName: `Recognition ${i + 1}.png`,
          url: img.url,
          type: "image",
          mimeType: "image/png",
          size: Math.floor(Math.random() * 500000) + 100000,
          dimensions: {
            width: 800,
            height: 600,
          },
          alt: img.alt,
          caption: `Recognition and awards for our achievements`,
          customClass: img.customClass,
          category: new ObjectId(recognitionCategory._id),
          uploadedBy: new ObjectId(adminUser._id),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    const itemsResult = await galleryCollection.insertMany(galleryItems);
    console.log(`✅ Created ${itemsResult.insertedCount} gallery items`);

    // Summary
    console.log("\n📊 Seed Summary:");
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Gallery Items: ${itemsResult.insertedCount}`);

    console.log("\n✨ Gallery seed completed successfully!");

    // Display categories with item counts
    console.log("\n📁 Categories created:");
    for (const category of insertedCategories) {
      const count = galleryItems.filter(
        (item) =>
          (item as { category: ObjectId }).category.toString() ===
          category._id.toString()
      ).length;
      console.log(
        `   ${category.icon} ${category.name} (${category.slug}): ${count} items`
      );
    }
  } catch (error) {
    console.error("❌ Error seeding gallery:", error);
    throw error;
  } finally {
    await client.close();
    console.log("✅ Database connection closed");
  }
}

// Run the seed function
seedGallery();
