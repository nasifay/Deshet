/**
 * Seed script for Gallery
 * Creates gallery categories and items for ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@tamra-sdt.org";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

// Medical/traditional medicine placeholder images
const medicalImages = [
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1581091215367-59ab6c99d1a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1590608897129-79da98d159ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1551836022-4c4c79ecde16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
];

async function seedGallery() {
  try {
    console.log("🌱 Starting gallery seed for Dashet Medical Center...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("✅ Connected to MongoDB\n");

    // Import models after connection is established
    const User = (await import("../lib/db/models/User")).default;
    const Gallery = (await import("../lib/db/models/Gallery")).default;
    const GalleryCategory = (await import("../lib/db/models/GalleryCategory")).default;

    // Find or get admin user
    let adminUser = await User.findOne({ email: ADMIN_EMAIL });
    if (!adminUser) {
      adminUser = await User.findOne({ role: "admin" });
    }
    if (!adminUser) {
      console.error("❌ No admin user found. Please run npm run seed first.");
      process.exit(1);
    }
    console.log(`✅ Using admin user: ${adminUser.email}\n`);

    // Clear existing gallery items and categories to ensure clean data
    console.log("🗑️  Clearing existing gallery data...");
    const deletedItems = await Gallery.deleteMany({});
    console.log(`✅ Cleared ${deletedItems.deletedCount} existing gallery items`);
    
    const deletedCategories = await GalleryCategory.deleteMany({});
    console.log(`✅ Cleared ${deletedCategories.deletedCount} existing gallery categories\n`);

    // Create gallery categories for Deshet Medical Center
    const categories = [
      {
        name: {
          en: "Traditional Medicine",
          am: "ባህላዊ ሕክምና",
        },
        slug: "traditional-medicine",
        description: {
          en: "Traditional Ethiopian medicine practices and treatments",
          am: "የኢትዮጵያ ባህላዊ ሕክምና ልምዶች እና ሕክምናዎች",
        },
        color: "#00a878",
        icon: "🌿",
        order: 1,
        isActive: true,
      },
      {
        name: {
          en: "Herbal Remedies",
          am: "የአመዳድብ መድሃኒቶች",
        },
        slug: "herbal-remedies",
        description: {
          en: "Herbal medicine preparation and administration",
          am: "የአመዳድብ ሕክምና አዘገጃጀት እና አሰጣጥ",
        },
        color: "#00a878",
        icon: "🌱",
        order: 2,
        isActive: true,
      },
      {
        name: {
          en: "Medical Center",
          am: "የሕክምና ማዕከል",
        },
        slug: "medical-center",
        description: {
          en: "Medical center facilities and infrastructure",
          am: "የሕክምና ማዕከል ተግባራት እና መሠረተ ልማት",
        },
        color: "#00a878",
        icon: "🏥",
        order: 3,
        isActive: true,
      },
      {
        name: {
          en: "Events & Activities",
          am: "ዝግጅቶች እና እንቅስቃሴዎች",
        },
        slug: "events-activities",
        description: {
          en: "Medical center events and community activities",
          am: "የሕክምና ማዕከል ዝግጅቶች እና የማህበረሰብ እንቅስቃሴዎች",
        },
        color: "#F09632",
        icon: "🎉",
        order: 4,
        isActive: true,
      },
      {
        name: {
          en: "Recognition & Awards",
          am: "እውቅናዎች እና ሽልማቶች",
        },
        slug: "recognition-awards",
        description: {
          en: "Awards, certifications, and recognition",
          am: "ሽልማቶች፣ የምስክር ወረቀቶች እና እውቅናዎች",
        },
        color: "#FF9700",
        icon: "🏆",
        order: 5,
        isActive: true,
      },
    ];

    // Create categories - always create fresh since we cleared them
    const createdCategories: any[] = [];
    for (const catData of categories) {
      const category = await GalleryCategory.create(catData);
      createdCategories.push(category);
      console.log(`✅ Created category: ${catData.slug} (ID: ${category._id})`);
    }

    console.log(`\n✅ Created ${createdCategories.length} categories\n`);

    // Create gallery items with placeholder images
    const galleryItems: any[] = [];
    let position = 0;

    for (const category of createdCategories) {
      // Create 4-5 images per category for better testing
      const itemsPerCategory = category.slug === "medical-center" ? 5 : 4;
      
      console.log(`\n📸 Creating ${itemsPerCategory} images for category: ${category.slug}...`);
      
      for (let i = 0; i < itemsPerCategory; i++) {
        const imageIndex = (position + i) % medicalImages.length;
        const imageUrl = medicalImages[imageIndex];

        // Get category name for alt/caption (handle bilingual)
        const categoryNameEn = typeof category.name === 'object' ? category.name.en : category.name;
        const categoryNameAm = typeof category.name === 'object' ? category.name.am : category.name;

        const item = await Gallery.create({
          filename: `medical-image-${category.slug}-${i + 1}.jpg`,
          originalName: `Medical Image ${i + 1} - ${category.slug}`,
          url: imageUrl,
          type: "image",
          mimeType: "image/jpeg",
          size: Math.floor(Math.random() * 500000) + 100000, // Random size 100KB-600KB
          dimensions: {
            width: 800,
            height: 600,
          },
          alt: {
            en: `${categoryNameEn} - Image ${i + 1}`,
            am: `${categoryNameAm} - ምስል ${i + 1}`,
          },
          caption: {
            en: `Dashet Medical Center - ${categoryNameEn}`,
            am: `ደሸት የሕክምና ማዕከል - ${categoryNameAm}`,
          },
          section: "general",
          position: position + i,
          featured: i === 0, // First item in each category is featured
          category: category._id, // Use ObjectId reference
          uploadedBy: adminUser._id,
        });

        galleryItems.push(item);
        console.log(`   ✅ Created image ${i + 1}/${itemsPerCategory} for ${category.slug} (Category ID: ${category._id})`);
      }
      position += itemsPerCategory;
    }

    console.log(`\n✅ Created ${galleryItems.length} gallery items total`);
    
    // Verify the data
    console.log("\n🔍 Verifying data...");
    for (const category of createdCategories) {
      const count = await Gallery.countDocuments({ category: category._id });
      const categoryName = typeof category.name === 'object' ? category.name.en : category.name;
      console.log(`   ${categoryName}: ${count} images (Category ID: ${category._id})`);
    }
    
    console.log(`\n✅ Gallery seed completed successfully!`);

    // Close connection
    await mongoose.disconnect();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding gallery:", error);
    process.exit(1);
  }
}

// Run seed
seedGallery();




