/**
 * Seed Landing Page for ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል
 * Creates bilingual landing page content (English and Amharic)
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import { hashPassword } from "../lib/auth/password";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

async function seedLandingPage() {
  try {
    console.log("🌱 Starting Deshet Medical Center landing page seed...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("✅ Connected to MongoDB\n");

    // Import models after connection
    const User = (await import("../lib/db/models/User")).default;
    const Page = (await import("../lib/db/models/Page")).default;

    // Find an admin user to set as author
    let adminUser = await User.findOne({
      role: { $in: ["admin", "superadmin"] },
    });

    if (!adminUser) {
      console.log("⚠️  No admin user found, creating default admin...");
      const hashedPassword = await hashPassword("Admin@123456");
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@deshetmed.com",
        password: hashedPassword,
        role: "superadmin",
        isActive: true,
      });
      console.log(
        "✅ Created default admin user (email: admin@deshetmed.com, password: Admin@123456)\n"
      );
    }

    // Check if landing page already exists
    const existingLanding = await Page.findOne({ slug: "landing" });

    if (existingLanding) {
      console.log("⚠️  Landing page already exists. Updating...");
      await Page.findByIdAndDelete(existingLanding._id);
    }

    // Create landing page with Deshet Medical Center content
    // Bilingual content structure
    const landingPageData = {
      title: "Landing Page",
      slug: "landing",
      status: "published",
      author: adminUser._id,
      seo: {
        metaTitle:
          "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል | Premium Ethiopian Traditional Medicine",
        metaDescription:
          "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል delivers premium Ethiopian traditional medicine, herbal healing, spiritual therapy, and cultural healing services in Addis Ababa, Ethiopia.",
        keywords: [
          "Deshet Medical Center",
          "Ethiopian traditional medicine",
          "indigenous medicine Ethiopia",
          "herbal medicine",
          "traditional healing",
          "Ethiopian herbal remedies",
          "cultural healing",
          "spiritual healing",
          "traditional medical consultation",
          "herbal medicine preparation",
          "Addis Ababa",
          "Ethiopia",
        ],
      },
      sections: [
        {
          id: "hero-section-1",
          type: "HeroSection",
          data: {
            // English content
            title: "DESHET",
            subtitle: "INDIGENOUS MEDICAL CENTER",
            description: {
              en: "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing",
              am: "የኢትዮጵያ ባህላዊ የሕክምና ማዕከል የአመዳድብ ሕክምና፣ መንፈሳዊ እና ባህላዊ ሕክምና እንሰጣለን",
            },
            leftImages: [
              "/landing-left.png",
              "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
            ],
            middleImages: [
              "/landing-middle.png",
              "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop",
            ],
            rightImages: [
              "/landing-right.png",
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
            ],
            ctaText: {
              en: "Book Appointment",
              am: "ቀጠሮ ይውሰዱ",
            },
            ctaLink: "/booking",
            ctaSecondaryText: {
              en: "Learn More",
              am: "ተጨማሪ ይማሩ",
            },
            ctaSecondaryLink: "/who-we-are",
          },
          order: 0,
        },
        {
          id: "about-section-1",
          type: "AboutSection",
          data: {
            title: {
              en: "ABOUT DESHET",
              am: "ስለ ደሸት",
            },
            description: {
              en: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል is a premium Ethiopian traditional medical facility dedicated to preserving and promoting indigenous healing practices. We combine ancient wisdom with modern understanding to provide comprehensive traditional medical services including herbal medicine preparation, traditional diagnostic techniques, detox therapy, and spiritual healing. Our experienced practitioners have deep knowledge of Ethiopian traditional medicine and are committed to delivering authentic, culturally-rooted healing experiences.",
              am: "ደሸት ባህላዊ የሕክምና ማዕከል የኢትዮጵያ ባህላዊ ሕክምናን ማስቀጠል እና ማበረታታት የሚገዛ የሕክምና ተቋም ነው። የጥንት ጥበብን ከዘመናዊ ግንዛቤ ጋር በማዋሃድ የአመዳድብ ሕክምና አዘገጃጀት፣ ባህላዊ የመመርመር ዘዴዎች፣ የሰውነት ማጽዳት ሕክምና እና መንፈሳዊ ሕክምና ጨምሮ ሁሉንም የባህላዊ ሕክምና አገልግሎቶችን እንሰጣለን።",
            },
            ctaText: {
              en: "Read More",
              am: "ተጨማሪ ያንብቡ",
            },
            ctaLink: "/who-we-are",
            images: [
              "/images/about/1.png",
              "/images/about/2.png",
              "/images/about/3.png",
              "/images/about/4.png",
            ],
          },
          order: 1,
        },
        {
          id: "statistics-section-1",
          type: "StatisticsSection",
          data: {
            stats: [
              {
                number: "15+",
                label: {
                  en: "Years of Experience",
                  am: "ዓመታት ልምድ",
                },
              },
              {
                number: "5000+",
                label: {
                  en: "Patients Served",
                  am: "ታካሚዎች",
                },
              },
              {
                number: "50+",
                label: {
                  en: "Herbal Remedies",
                  am: "የአመዳድብ መድሃኒቶች",
                },
              },
              {
                number: "10+",
                label: {
                  en: "Expert Practitioners",
                  am: "ባለሙያዎች",
                },
              },
            ],
          },
          order: 2,
        },
        {
          id: "services-section-1",
          type: "ServicesSection",
          data: {
            title: {
              en: "Our Medical Services",
              am: "የሕክምና አገልግሎቶቻችን",
            },
            subtitle: {
              en: "Comprehensive Traditional Medical Services",
              am: "ሁሉንም የባህላዊ ሕክምና አገልግሎቶች",
            },
            description: {
              en: "We offer a wide range of traditional medical services rooted in Ethiopian healing traditions.",
              am: "የኢትዮጵያ የሕክምና ባህሎች ላይ የተመሰረቱ የባህላዊ ሕክምና አገልግሎቶችን እንሰጣለን።",
            },
          },
          order: 3,
        },
        {
          id: "partners-certifications-section-1",
          type: "PartnersCertificationsSection",
          data: {
            title: {
              en: "CERTIFICATIONS & RECOGNITIONS",
              am: "ማረጋገጫዎች እና እውቅናዎች",
            },
            // Note: Partners and certifications are now managed via /admin/supporters
            // This section will automatically fetch from the supporters API
          },
          order: 4,
        },
        {
          id: "achievements-section-1",
          type: "AchievementsSection",
          data: {
            title: {
              en: "Our Achievements",
              am: "የእኛ ስኬቶች",
            },
            achievements: [
              {
                title: {
                  en: "15+ Years of Excellence",
                  am: "15+ ዓመታት የምርጥ አገልግሎት",
                },
                description: {
                  en: "Over a decade and a half of dedicated service in preserving and promoting Ethiopian traditional medicine.",
                  am: "ከአስራ አምስት ዓመታት በላይ የኢትዮጵያ ባህላዊ ሕክምናን ማስቀጠል እና ማበረታታት ውስጥ የተገዛ አገልግሎት።",
                },
              },
              {
                title: {
                  en: "5000+ Patients Served",
                  am: "5000+ ታካሚዎች ተጠቅመዋል",
                },
                description: {
                  en: "Successfully treated thousands of patients using traditional healing methods and herbal remedies.",
                  am: "ባህላዊ የሕክምና ዘዴዎች እና የአመዳድብ መድሃኒቶችን በመጠቀም በሺዎች የሚቆጠሩ ታካሚዎችን በተሳካ ሁኔታ ሕክምና ሰጥተናል።",
                },
              },
              {
                title: {
                  en: "Expert Practitioners",
                  am: "ባለሙያ ሐኪሞች",
                },
                description: {
                  en: "Our team consists of highly experienced traditional medicine practitioners with deep knowledge of Ethiopian healing traditions.",
                  am: "የእኛ ቡድን የኢትዮጵያ የሕክምና ባህሎች ጥልቅ እውቀት ያላቸው በጣም ተሞክሮ ያላቸው የባህላዊ ሕክምና ሐኪሞችን ያቀፈ ነው።",
                },
              },
              {
                title: {
                  en: "Authentic Herbal Remedies",
                  am: "እውነተኛ የአመዳድብ መድሃኒቶች",
                },
                description: {
                  en: "We prepare traditional herbal medicines using authentic Ethiopian plants and traditional preparation methods.",
                  am: "እውነተኛ የኢትዮጵያ አትክንሶችን እና ባህላዊ የአዘገጃጀት ዘዴዎችን በመጠቀም ባህላዊ የአመዳድብ መድሃኒቶችን እናዘጋጃለን።",
                },
              },
              {
                title: {
                  en: "Cultural Preservation",
                  am: "ባህላዊ ጥበብ ማስቀጠል",
                },
                description: {
                  en: "Committed to preserving and promoting Ethiopian traditional healing knowledge for future generations.",
                  am: "የኢትዮጵያ ባህላዊ የሕክምና እውቀትን ለወደፊት ትውልዶች ማስቀጠል እና ማበረታታት ውስጥ ተገዝተናል።",
                },
              },
              {
                title: {
                  en: "Holistic Healing Approach",
                  am: "ሁሉንም የሚያካትት የሕክምና አቀራረብ",
                },
                description: {
                  en: "We provide comprehensive healing that addresses physical, spiritual, and emotional well-being through traditional methods.",
                  am: "ባህላዊ ዘዴዎችን በመጠቀም አካላዊ፣ መንፈሳዊ እና ስሜታዊ ደህንነትን የሚያካትት ሁሉንም የሚያካትት ሕክምና እንሰጣለን።",
                },
              },
            ],
          },
          order: 5,
        },
        {
          id: "blog-section-1",
          type: "NewsEventsSection",
          data: {
            title: {
              en: "Latest News & Updates",
              am: "የቅርብ ጊዜ ዜና እና ማሻሻያዎች",
            },
            subtitle: {
              en: "Stay informed about traditional medicine",
              am: "ስለ ባህላዊ ሕክምና ይታወቁ",
            },
            showLimit: 3,
          },
          order: 6,
        },
      ],
      content: "",
      publishedAt: new Date(),
    };

    const landingPage = await Page.create(landingPageData);
    console.log("✅ Landing page created successfully!");
    console.log(`📄 Page ID: ${landingPage._id}`);
    console.log(`🔗 Slug: ${landingPage.slug}`);
    console.log(`📊 Sections: ${landingPage.sections?.length || 0}`);
    console.log(`👤 Author: ${adminUser.name} (${adminUser.email})`);
    console.log(`🌍 Languages: English & Amharic (አማርኛ)`);

    console.log("\n✨ Seed completed successfully!");
    console.log("\n📝 You can now edit the landing page at: /admin/landing");
    console.log("🌐 View the landing page at: http://localhost:3000\n");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding landing page:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seed function
seedLandingPage();
