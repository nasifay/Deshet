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
  },
  {
    name: "CRPVF",
    slug: "crpvf",
    description: "Child Rights Protection and Violence Free program",
    color: "#128341",
    icon: "🛡️",
    order: 2,
    isActive: true,
  },
  {
    name: "General",
    slug: "general",
    description: "General gallery images",
    color: "#128341",
    icon: "📸",
    order: 3,
    isActive: true,
  },
  {
    name: "Events",
    slug: "events",
    description: "Organization events and activities",
    color: "#FF9700",
    icon: "🎉",
    order: 4,
    isActive: true,
  },
  {
    name: "Training",
    slug: "training",
    description: "Training programs and workshops",
    color: "#128341",
    icon: "📚",
    order: 5,
    isActive: true,
  },
];

// Sample images using the actual uploaded images from the uploads directory
const sampleImages = {
  CLM: [
    {
      url: "/uploads/1760683689344-norweig.png",
      alt: "CLM Conference Speaker",
      caption: "Keynote speaker at CLM conference",
      featured: true,
    },
    {
      url: "/uploads/1760693752603-timeline.png",
      alt: "CLM Group Discussion",
      caption: "Interactive group discussion session",
      featured: false,
    },
    {
      url: "/uploads/1760693879451-timeline.png",
      alt: "CLM Presentation",
      caption: "Presentation on child labor monitoring",
      featured: false,
    },
    {
      url: "/uploads/1760693937153-timeline.png",
      alt: "CLM Conference Room",
      caption: "Conference room with participants",
      featured: false,
    },
    {
      url: "/uploads/1760694090934-timeline.png",
      alt: "CLM Speaker Close-up",
      caption: "Speaker addressing the audience",
      featured: false,
    },
    {
      url: "/uploads/1760694665255-timeline.png",
      alt: "CLM Table Discussion",
      caption: "Round table discussion on monitoring",
      featured: false,
    },
  ],
  CRPVF: [
    {
      url: "/uploads/1760693752603-timeline.png",
      alt: "CRPVF Women's Group",
      caption: "Women's empowerment session",
      featured: true,
    },
    {
      url: "/uploads/1760693879451-timeline.png",
      alt: "CRPVF Group Activity",
      caption: "Community engagement activity",
      featured: false,
    },
    {
      url: "/uploads/1760693937153-timeline.png",
      alt: "CRPVF Training Session",
      caption: "Parenting skills training session",
      featured: false,
    },
    {
      url: "/uploads/1760694090934-timeline.png",
      alt: "CRPVF Discussion Group",
      caption: "Community discussion on child rights",
      featured: false,
    },
    {
      url: "/uploads/1760694665255-timeline.png",
      alt: "CRPVF Meeting",
      caption: "Stakeholder meeting on violence prevention",
      featured: false,
    },
  ],
  general: [
    {
      url: "/uploads/1760683689344-norweig.png",
      alt: "General Event",
      caption: "Community event and gathering",
      featured: false,
    },
    {
      url: "/uploads/1760693752603-timeline.png",
      alt: "Workshop Session",
      caption: "Educational workshop session",
      featured: false,
    },
    {
      url: "/uploads/1760693879451-timeline.png",
      alt: "Team Meeting",
      caption: "Team coordination meeting",
      featured: false,
    },
  ],
};

async function seedGallery() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    console.log("🌱 Starting enhanced gallery seed...");

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

    // Create gallery items with new model fields
    console.log("🖼️  Seeding gallery items with enhanced model...");

    const galleryItems = [];

    // Add images for each section
    for (const [sectionName, images] of Object.entries(sampleImages)) {
      const category = insertedCategories.find(
        (cat) => cat.slug === sectionName.toLowerCase()
      );

      if (!category) {
        console.log(`⚠️  Category not found for section: ${sectionName}`);
        continue;
      }

      images.forEach((image, index) => {
        galleryItems.push({
          filename: `${sectionName.toLowerCase()}-${Date.now()}-${index}.png`,
          originalName: `${sectionName} - ${image.alt}.png`,
          url: image.url,
          type: "image",
          mimeType: "image/png",
          size: Math.floor(Math.random() * 500000) + 100000, // Random size 100KB-600KB
          dimensions: {
            width: 800,
            height: 600,
          },
          alt: image.alt,
          caption: image.caption,
          section: sectionName,
          position: index,
          featured: image.featured,
          category: new ObjectId(category._id),
          uploadedBy: new ObjectId(adminUser._id),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }

    // Add some additional images to other categories
    const eventsCategory = insertedCategories.find(
      (cat) => cat.slug === "events"
    );
    const trainingCategory = insertedCategories.find(
      (cat) => cat.slug === "training"
    );

    // Add events images
    if (eventsCategory) {
      const eventImages = [
        {
          url: "/uploads/1760683689344-norweig.png",
          alt: "Annual Conference",
          caption: "Annual organization conference",
          featured: true,
        },
        {
          url: "/uploads/1760693752603-timeline.png",
          alt: "Community Event",
          caption: "Community outreach event",
          featured: false,
        },
      ];

      eventImages.forEach((image, index) => {
        galleryItems.push({
          filename: `events-${Date.now()}-${index}.png`,
          originalName: `Events - ${image.alt}.png`,
          url: image.url,
          type: "image",
          mimeType: "image/png",
          size: Math.floor(Math.random() * 500000) + 100000,
          dimensions: { width: 800, height: 600 },
          alt: image.alt,
          caption: image.caption,
          section: "general", // Events go to general section
          position: index,
          featured: image.featured,
          category: new ObjectId(eventsCategory._id),
          uploadedBy: new ObjectId(adminUser._id),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }

    // Add training images
    if (trainingCategory) {
      const trainingImages = [
        {
          url: "/uploads/1760693879451-timeline.png",
          alt: "Training Workshop",
          caption: "Staff training workshop",
          featured: true,
        },
        {
          url: "/uploads/1760693937153-timeline.png",
          alt: "Skills Development",
          caption: "Skills development session",
          featured: false,
        },
      ];

      trainingImages.forEach((image, index) => {
        galleryItems.push({
          filename: `training-${Date.now()}-${index}.png`,
          originalName: `Training - ${image.alt}.png`,
          url: image.url,
          type: "image",
          mimeType: "image/png",
          size: Math.floor(Math.random() * 500000) + 100000,
          dimensions: { width: 800, height: 600 },
          alt: image.alt,
          caption: image.caption,
          section: "general", // Training goes to general section
          position: index,
          featured: image.featured,
          category: new ObjectId(trainingCategory._id),
          uploadedBy: new ObjectId(adminUser._id),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }

    const itemsResult = await galleryCollection.insertMany(galleryItems);
    console.log(`✅ Created ${itemsResult.insertedCount} gallery items`);

    // Summary
    console.log("\n📊 Enhanced Seed Summary:");
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Gallery Items: ${itemsResult.insertedCount}`);

    // Count by section
    const sectionCounts = galleryItems.reduce((acc, item) => {
      acc[item.section] = (acc[item.section] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("\n📁 Items by Section:");
    Object.entries(sectionCounts).forEach(([section, count]) => {
      const featuredCount = galleryItems.filter(
        (item) => item.section === section && item.featured
      ).length;
      console.log(`   ${section}: ${count} items (${featuredCount} featured)`);
    });

    console.log("\n✨ Enhanced gallery seed completed successfully!");
    console.log("🎯 New features included:");
    console.log("   - Section organization (CLM, CRPVF, general)");
    console.log("   - Position ordering within sections");
    console.log("   - Featured image support");
    console.log("   - Real uploaded images from /uploads directory");
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
