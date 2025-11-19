/**
 * Seed script for Blog Posts
 * Creates sample blog posts for Deshet Indigenous Medical Center
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import NewsPost from "~/lib/db/models/NewsPost";
import User from "~/lib/db/models/User";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

async function seedBlog() {
  try {
    console.log("🌱 Starting blog seed...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Find or create admin user
    let adminUser = await User.findOne({ email: "admin@deshetmed.com" });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@deshetmed.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created");
    } else {
      console.log("✅ Admin user found");
    }

    // Clear existing blog posts (optional - comment out if you want to keep existing posts)
    // await NewsPost.deleteMany({});
    // console.log("✅ Cleared existing blog posts\n");

    // Sample blog posts with bilingual content
    const blogPosts = [
      {
        title: {
          en: "Understanding Traditional Ethiopian Medicine",
          am: "የኢትዮጵያ ባህላዊ ሕክምናን መረዳት",
        },
        slug: "understanding-traditional-ethiopian-medicine",
        excerpt: {
          en: "Explore the rich heritage of Ethiopian traditional medicine and its holistic approach to healing.",
          am: "የኢትዮጵያ ባህላዊ ሕክምና እና የሙሉ ሰውነት የሕክምና አቀራረብን ያስሱ።",
        },
        content: {
          en: "<p>Traditional Ethiopian medicine has been practiced for thousands of years, combining herbal remedies, spiritual healing, and cultural practices. At Deshet Indigenous Medical Center, we honor these ancient traditions while providing modern healthcare services.</p><p>Our practitioners are trained in traditional diagnostic techniques and herbal medicine preparation, ensuring that patients receive authentic and effective treatments.</p>",
          am: "<p>የኢትዮጵያ ባህላዊ ሕክምና ለሺህ ዓመታት የተግባራዊ የሆነ ሲሆን የአመዳድብ መድሃኒቶች፣ መንፈሳዊ ሕክምና እና ባህላዊ ልምዶችን ያጣምራል። በደሸት ባህላዊ የሕክምና ማዕከል እነዚህን ጥንታዊ ባህሎች እያከበርን ዘመናዊ የጤና አገልግሎቶችን እንሰጣለን።</p><p>የእኛ ሐኪሞች በባህላዊ የመመርመር ዘዴዎች እና የአመዳድብ ሕክምና አዘገጃጀት የተሰለጠኑ ሲሆኑ ታካሚዎች እውነተኛ እና ውጤታማ ሕክምና እንዲያገኙ ያረጋግጣሉ።</p>",
        },
        featuredImage:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Traditional Medicine",
        tags: ["traditional medicine", "ethiopian healing", "herbal remedies"],
        status: "published",
        isFeatured: true,
        author: adminUser._id,
        publishedAt: new Date(),
      },
      {
        title: {
          en: "The Power of Herbal Medicine in Modern Healthcare",
          am: "የአመዳድብ ሕክምና ኃይል በዘመናዊ የጤና አገልግሎት",
        },
        slug: "power-of-herbal-medicine-modern-healthcare",
        excerpt: {
          en: "Discover how traditional herbal remedies complement modern medical practices for comprehensive patient care.",
          am: "ባህላዊ የአመዳድብ መድሃኒቶች ዘመናዊ የሕክምና ልምዶችን እንዴት እንደሚደግፉ ይወቁ።",
        },
        content: {
          en: "<p>Herbal medicine has been a cornerstone of Ethiopian traditional healing for centuries. At Deshet, we carefully prepare and administer herbal remedies using time-tested recipes passed down through generations.</p><p>Our herbal medicine program includes consultation, preparation, and follow-up care to ensure optimal results for our patients.</p>",
          am: "<p>የአመዳድብ ሕክምና ለዘመናት የኢትዮጵያ ባህላዊ ሕክምና መሰረት ነው። በደሸት በትውልድ የተላለፉ የተፈተኑ የመድሃኒት ዝግጅቶችን በጥንቃቄ እናዘጋጃለን እና እንሰጣለን።</p><p>የእኛ የአመዳድብ ሕክምና ፕሮግራም ምክክር፣ አዘገጃጀት እና ተከታታይ እንክብካቤን ያካትታል።</p>",
        },
        featuredImage:
          "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Herbal Remedies",
        tags: ["herbal medicine", "natural healing", "traditional remedies"],
        status: "published",
        isFeatured: true,
        author: adminUser._id,
        publishedAt: new Date(),
      },
      {
        title: {
          en: "Spiritual Healing and Wellness at Deshet",
          am: "መንፈሳዊ ሕክምና እና ደህንነት በደሸት",
        },
        slug: "spiritual-healing-wellness-deshet",
        excerpt: {
          en: "Learn about our spiritual healing services that integrate traditional practices with modern wellness approaches.",
          am: "ባህላዊ ልምዶችን ከዘመናዊ የደህንነት አቀራረቦች ጋር የሚያዋሃዱ የመንፈሳዊ ሕክምና አገልግሎቶቻችንን ይወቁ።",
        },
        content: {
          en: "<p>Spiritual healing is an integral part of traditional Ethiopian medicine. Our spiritual healing services provide holistic care that addresses the mind, body, and spirit.</p><p>We offer various spiritual healing modalities including prayer, meditation, and traditional ceremonies designed to promote overall wellness and healing.</p>",
          am: "<p>መንፈሳዊ ሕክምና የኢትዮጵያ ባህላዊ ሕክምና ዋና አካል ነው። የእኛ የመንፈሳዊ ሕክምና አገልግሎቶች አእምሮ፣ ሰውነት እና መንፈስን የሚያስተናግዱ ሙሉ ሰውነት እንክብካቤ ይሰጣሉ።</p><p>ጸሎት፣ ማሰላሰል እና አጠቃላይ ደህንነትን ለማሻሻል የተነደፉ ባህላዊ ሥነ ሥርዓቶችን ጨምሮ የተለያዩ የመንፈሳዊ ሕክምና ዘዴዎችን እንሰጣለን።</p>",
        },
        featuredImage:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Wellness",
        tags: ["spiritual healing", "wellness", "holistic care"],
        status: "published",
        isFeatured: true,
        author: adminUser._id,
        publishedAt: new Date(),
      },
      {
        title: {
          en: "Detox Therapy: Cleansing Your Body Naturally",
          am: "የሰውነት ማጽዳት ሕክምና: ሰውነትዎን በተፈጥሮ መልሶ ማጽዳት",
        },
        slug: "detox-therapy-cleansing-body-naturally",
        excerpt: {
          en: "Explore our natural detoxification therapies that help cleanse and rejuvenate your body using traditional methods.",
          am: "ባህላዊ ዘዴዎችን በመጠቀም ሰውነትዎን ለማጽዳት እና ለማደስ የሚረዱ የተፈጥሮ የሰውነት ማጽዳት ሕክምናዎቻችንን ያስሱ።",
        },
        content: {
          en: "<p>Detox therapy is an essential component of traditional Ethiopian medicine. Our detox programs use natural herbs and traditional techniques to help your body eliminate toxins and restore balance.</p><p>We offer personalized detox programs tailored to individual needs, ensuring safe and effective cleansing.</p>",
          am: "<p>የሰውነት ማጽዳት ሕክምና የኢትዮጵያ ባህላዊ ሕክምና ዋና አካል ነው። የእኛ የማጽዳት ፕሮግራሞች ተፈጥሯዊ አመዳድቦች እና ባህላዊ ዘዴዎችን በመጠቀም ሰውነትዎ መጥፎ ንጥረ ነገሮችን እንዲያስወግድ እና ሚዛን እንዲመለስ ይረዳሉ።</p><p>እያንዳንዱ ሰው የሚፈልገውን የሚያሟላ የግል የማጽዳት ፕሮግራሞችን እንሰጣለን።</p>",
        },
        featuredImage:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: "Health Tips",
        tags: ["detox", "cleansing", "natural therapy"],
        status: "published",
        isFeatured: true,
        author: adminUser._id,
        publishedAt: new Date(),
      },
    ];

    // Create blog posts
    const createdPosts = [];
    for (const postData of blogPosts) {
      // Check if post already exists
      const existingPost = await NewsPost.findOne({ slug: postData.slug });
      if (existingPost) {
        console.log(`⏭️  Post "${postData.slug}" already exists, skipping...`);
        continue;
      }

      const post = await NewsPost.create(postData);
      createdPosts.push(post);
      console.log(`✅ Created blog post: ${postData.slug}`);
    }

    console.log(`\n✅ Blog seed completed! Created ${createdPosts.length} new posts.`);

    // Close connection
    await mongoose.disconnect();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding blog:", error);
    process.exit(1);
  }
}

// Run seed
seedBlog();



