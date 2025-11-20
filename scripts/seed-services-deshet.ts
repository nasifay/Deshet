/**
 * Seed script for Deshet Traditional Medicine Services/Programs
 * Creates sample services for ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል
 */

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as path from "path";
import Program from "../lib/db/models/Program";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

const servicesData = [
  {
    title: "Traditional Medical Consultation",
    slug: "traditional-medical-consultation",
    categoryId: "traditional-consultation",
    categoryLabel: "Traditional Medical Consultation",
    description:
      "Experience personalized consultations with our experienced traditional medicine practitioners. Our consultations combine ancient Ethiopian healing wisdom with modern understanding to provide comprehensive health assessments and treatment plans tailored to your unique needs. Our practitioners use time-honored diagnostic methods including pulse reading, tongue examination, and comprehensive health assessment techniques to understand the root causes of health issues.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        alt: "Traditional consultation session",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "Patient consultation",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "Traditional medicine practice",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "Health assessment",
        uploaded: false,
      },
    ],
    projects: [],
    status: "published",
    order: 1,
    publishedAt: new Date(),
  },
  {
    title: "Herbal Medicine Preparation",
    slug: "herbal-medicine-preparation",
    categoryId: "herbal-medicine",
    categoryLabel: "Herbal Medicine Preparation",
    description:
      "Our expert practitioners prepare custom herbal medicines using traditional Ethiopian recipes passed down through generations. Each preparation is carefully crafted using locally sourced, organic herbs and plants, following ancient methods that preserve the natural healing properties of each ingredient. We use only the finest quality herbs, harvested at optimal times to ensure maximum potency and effectiveness for various health conditions.",
    image: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "Herbal medicine preparation",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        alt: "Traditional herbs",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        alt: "Herbal ingredients",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&crop=center",
        alt: "Medicine preparation process",
        uploaded: false,
      },
    ],
    projects: [],
    status: "published",
    order: 2,
    publishedAt: new Date(),
  },
  {
    title: "Detox & Cleansing Therapy",
    slug: "detox-cleansing-therapy",
    categoryId: "detox-therapy",
    categoryLabel: "Detox & Cleansing Therapy",
    description:
      "Experience our comprehensive detox and cleansing therapies designed to purify the body and restore natural balance. Our traditional methods help eliminate toxins, improve digestion, boost energy levels, and enhance overall wellness through natural herbal treatments and therapeutic practices. Our detox programs are carefully designed to support the body's natural cleansing processes while providing gentle, effective results.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop&crop=center",
        alt: "Detox therapy session",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "Wellness therapy",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center",
        alt: "Cleansing treatment",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        alt: "Health restoration",
        uploaded: false,
      },
    ],
    projects: [],
    status: "published",
    order: 3,
    publishedAt: new Date(),
  },
  {
    title: "Traditional Diagnostic Techniques",
    slug: "traditional-diagnostic-techniques",
    categoryId: "diagnostic-techniques",
    categoryLabel: "Traditional Diagnostic Techniques",
    description:
      "Our practitioners use time-honored diagnostic methods including pulse reading, tongue examination, and comprehensive health assessment techniques. These traditional approaches allow us to understand the root causes of health issues and develop personalized treatment plans that address both symptoms and underlying imbalances. Our diagnostic methods are based on centuries of knowledge and provide deep insights into your overall health and wellness.",
    image: "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        alt: "Pulse reading technique",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        alt: "Traditional diagnosis",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "Health assessment",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        alt: "Diagnostic examination",
        uploaded: false,
      },
    ],
    projects: [],
    status: "published",
    order: 4,
    publishedAt: new Date(),
  },
  {
    title: "Healing Treatments",
    slug: "healing-treatments",
    categoryId: "healing-treatments",
    categoryLabel: "Healing Treatments",
    description:
      "Our comprehensive healing treatments combine traditional Ethiopian medicine practices with modern therapeutic approaches. From massage therapy and energy healing to specialized treatments for chronic conditions, we offer a range of services designed to promote physical, mental, and spiritual wellness. Our treatments are tailored to your individual needs and are designed to support your body's natural healing abilities.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "Healing therapy session",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "Wellness treatment",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "Therapeutic session",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "Holistic healing",
        uploaded: false,
      },
    ],
    projects: [],
    status: "published",
    order: 5,
    publishedAt: new Date(),
  },
];

async function seedServices() {
  try {
    console.log("🌱 Starting services seed for Deshet Medical Center...\n");
    console.log("🔌 Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Clear existing programs/services (optional - comment out if you want to keep existing)
    const existingCount = await Program.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing programs/services.`);
      console.log("🗑️  Clearing existing programs/services...");
      await Program.deleteMany({});
      console.log("✅ Cleared existing programs/services\n");
    }

    // Insert services
    console.log("📚 Seeding services...");
    const createdServices = await Program.insertMany(servicesData);
    console.log(`✅ Created ${createdServices.length} services\n`);

    // Display summary
    console.log("📊 Services Summary:");
    console.log("─".repeat(70));
    servicesData.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title}`);
      console.log(`   Category: ${service.categoryLabel}`);
      console.log(`   Status: ${service.status}`);
      console.log("");
    });
    console.log("─".repeat(70));
    console.log(`Total services: ${createdServices.length}`);
    console.log(`All services are published and ready for public viewing.`);
    console.log("─".repeat(70));

    console.log("\n✨ Services seed completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("   1. Visit /admin/programs to manage services");
    console.log("   2. Visit /programs to view the public services page");
    console.log("   3. Customize services through the admin dashboard\n");
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run if called directly
if (require.main === module) {
  seedServices()
    .then(() => {
      console.log("\n✅ Seed process completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Seed process failed:", error);
      process.exit(1);
    });
}

export default seedServices;

