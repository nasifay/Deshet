/**
 * Seed script for Testimonials
 * Creates sample testimonials for Deshet Indigenous Medical Center
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import Testimonial from "~/lib/db/models/Testimonial";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

async function seedTestimonials() {
  try {
    console.log("🌱 Starting testimonials seed...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Clear existing testimonials (optional - comment out if you want to keep existing)
    // await Testimonial.deleteMany({});
    // console.log("✅ Cleared existing testimonials\n");

    // Sample testimonials with bilingual content
    const testimonials = [
      {
        quote: {
          en: "Deshet Medical Center has been a blessing for my family. The traditional medicine treatments have helped us in ways modern medicine couldn't. The practitioners are knowledgeable and truly care about their patients.",
          am: "ደሸት የሕክምና ማዕከል ለቤተሰቤ በረከት ነው። የባህላዊ ሕክምና ሕክምናዎች ዘመናዊ ሕክምና ያልቻለውን በሁኔታዎች ረድተናል። ሐኪሞቹ የተማሩ እና ስለ ታካሚዎቻቸው በእውነት ይጨነቃሉ።",
        },
        name: "Alemayehu Bekele",
        title: {
          en: "Patient",
          am: "ታካሚ",
        },
        organization: {
          en: "Addis Ababa",
          am: "አዲስ አበባ",
        },
        featured: true,
        order: 0,
        status: "active",
      },
      {
        quote: {
          en: "I have been coming to Deshet for over 5 years. The herbal remedies and spiritual healing services have transformed my health. The center combines traditional wisdom with modern care, which is exactly what we need.",
          am: "ከ5 ዓመታት በላይ ወደ ደሸት እየመጣሁ ነው። የአመዳድብ መድሃኒቶች እና የመንፈሳዊ ሕክምና አገልግሎቶች ጤናዬን ለወጡ። ማዕከሉ ባህላዊ ጥበብን ከዘመናዊ እንክብካቤ ጋር ያጣምራል።",
        },
        name: "Mulugeta Tadesse",
        title: {
          en: "Regular Patient",
          am: "የተለመደ ታካሚ",
        },
        organization: {
          en: "Traditional Medicine Advocate",
          am: "የባህላዊ ሕክምና ደጋፊ",
        },
        featured: true,
        order: 1,
        status: "active",
      },
      {
        quote: {
          en: "The expertise and care at Deshet Medical Center is unmatched. They have helped me with chronic conditions using traditional Ethiopian medicine. I highly recommend their services to anyone seeking authentic traditional healing.",
          am: "በደሸት የሕክምና ማዕከል ያለው ሙያ እና እንክብካቤ ማነጻጸር የለውም። የኢትዮጵያ ባህላዊ ሕክምናን በመጠቀም ከረዥም ጊዜ የቆዩ ሁኔታዎች ረድተዋል። እውነተኛ ባህላዊ ሕክምና ለሚፈልጉ ሁሉ አገልግሎታቸውን በጣም እመክራለሁ።",
        },
        name: "Tigist Hailu",
        title: {
          en: "Satisfied Patient",
          am: "የተደሰተ ታካሚ",
        },
        organization: {
          en: "Health & Wellness Enthusiast",
          am: "የጤና እና ደህንነት ተከታታይ",
        },
        featured: true,
        order: 2,
        status: "active",
      },
      {
        quote: {
          en: "After trying various treatments, I found relief at Deshet. The herbal medicine approach is gentle yet effective. The staff is professional and the atmosphere is welcoming.",
          am: "በተለያዩ ሕክምናዎች ከመሞከር በኋላ በደሸት ምቾት አገኘሁ። የአመዳድብ ሕክምና አቀራረብ ለስላሳ ነው ነገር ግን ውጤታማ ነው። ሰራተኞቹ ሙያዊ ናቸው እና አካባቢው ደህንነት የሚሰጥ ነው።",
        },
        name: "Yonas Shiferaw",
        title: {
          en: "Patient",
          am: "ታካሚ",
        },
        organization: {
          en: "Addis Ababa",
          am: "አዲስ አበባ",
        },
        featured: true,
        order: 3,
        status: "active",
      },
      {
        quote: {
          en: "Deshet Medical Center represents the best of Ethiopian traditional medicine. Their holistic approach addresses not just physical ailments but also spiritual and emotional well-being. Truly remarkable service.",
          am: "ደሸት የሕክምና ማዕከል የኢትዮጵያ ባህላዊ ሕክምና ምርጥ ይወክላል። የእነሱ ሙሉ ሰውነት አቀራረብ አካላዊ ሕመሞችን ብቻ ሳይሆን መንፈሳዊ እና ስሜታዊ ደህንነትንም ይመለከታል። በእውነት አስደናቂ አገልግሎት።",
        },
        name: "Marta Assefa",
        title: {
          en: "Long-term Patient",
          am: "የረጅም ጊዜ ታካሚ",
        },
        organization: {
          en: "Wellness Advocate",
          am: "የደህንነት ደጋፊ",
        },
        featured: true,
        order: 4,
        status: "active",
      },
    ];

    // Create testimonials
    const createdTestimonials = [];
    for (const testimonialData of testimonials) {
      // Check if testimonial already exists (by name and first part of quote)
      const existingTestimonial = await Testimonial.findOne({
        name: testimonialData.name,
      });
      if (existingTestimonial) {
        console.log(
          `⏭️  Testimonial from "${testimonialData.name}" already exists, skipping...`
        );
        continue;
      }

      const testimonial = await Testimonial.create(testimonialData);
      createdTestimonials.push(testimonial);
      console.log(
        `✅ Created testimonial from: ${testimonialData.name}`
      );
    }

    console.log(
      `\n✅ Testimonials seed completed! Created ${createdTestimonials.length} new testimonials.`
    );

    // Close connection
    await mongoose.disconnect();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
    process.exit(1);
  }
}

// Run seed
seedTestimonials();





