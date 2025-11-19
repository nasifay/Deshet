/**
 * Seed script for Gallery
 * Creates gallery categories and items for Deshet Indigenous Medical Center
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import Gallery from "~/lib/db/models/Gallery";
import GalleryCategory from "~/lib/db/models/GalleryCategory";
import User from "~/lib/db/models/User";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

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
    console.log("🌱 Starting gallery seed for Deshet Medical Center...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Find or get admin user
    let adminUser = await User.findOne({ email: "admin@deshetmed.com" });
    if (!adminUser) {
      adminUser = await User.findOne({ role: "admin" });
    }
    if (!adminUser) {
      console.error("❌ No admin user found. Please run npm run seed first.");
      process.exit(1);
    }
    console.log(`✅ Using admin user: ${adminUser.email}\n`);

    // Clear existing gallery items (optional - comment out if you want to keep existing)
    // await Gallery.deleteMany({});
    // await GalleryCategory.deleteMany({});
    // console.log("✅ Cleared existing gallery data\n");

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

    // Create categories
    const createdCategories = [];
    for (const catData of categories) {
      const existingCategory = await GalleryCategory.findOne({
        slug: catData.slug,
      });
      if (existingCategory) {
        console.log(
          `⏭️  Category "${catData.slug}" already exists, skipping...`
        );
        createdCategories.push(existingCategory);
        continue;
      }

      const category = await GalleryCategory.create(catData);
      createdCategories.push(category);
      console.log(`✅ Created category: ${catData.slug}`);
    }

    console.log(`\n✅ Created ${createdCategories.length} categories\n`);

    // Create gallery items with placeholder images
    const galleryItems = [];
    let position = 0;

    for (const category of createdCategories) {
      // Create 3-4 images per category
      const itemsPerCategory = category.slug === "medical-center" ? 4 : 3;
      
      for (let i = 0; i < itemsPerCategory; i++) {
        const imageIndex = (position + i) % medicalImages.length;
        const imageUrl = medicalImages[imageIndex];

        const existingItem = await Gallery.findOne({
          url: imageUrl,
          category: category._id,
        });

        if (existingItem) {
          continue;
        }

        const item = await Gallery.create({
          filename: `medical-image-${category.slug}-${i + 1}.jpg`,
          originalName: `Medical Image ${i + 1} - ${category.slug}`,
          url: imageUrl,
          type: "image",
          mimeType: "image/jpeg",
          size: 0,
          alt: {
            en: `${category.name.en || category.name} - Image ${i + 1}`,
            am: `${category.name.am || category.name} - ምስል ${i + 1}`,
          },
          caption: {
            en: `Deshet Medical Center - ${category.name.en || category.name}`,
            am: `ደሸት የሕክምና ማዕከል - ${category.name.am || category.name}`,
          },
          section: "general",
          position: position + i,
          featured: i === 0, // First item in each category is featured
          category: category._id,
          uploadedBy: adminUser._id,
        });

        galleryItems.push(item);
      }
      position += itemsPerCategory;
    }

    console.log(`✅ Created ${galleryItems.length} gallery items\n`);
    console.log(`✅ Gallery seed completed!`);

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



