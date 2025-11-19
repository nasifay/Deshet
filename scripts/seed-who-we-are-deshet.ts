/**
 * Seed script for Who We Are page
 * Creates page sections with Deshet Medical Center content in English and Amharic
 */

import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import Page from "~/lib/db/models/Page";
import User from "~/lib/db/models/User";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

// Placeholder images for Deshet Medical Center
const placeholderImages = {
  heroMain: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  heroContent: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  vision: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  mission: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  practitioner: "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
};

async function seedWhoWeArePage() {
  try {
    console.log("🌱 Starting Who We Are page seed for Deshet Medical Center...\n");

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

    // Find or create the who-we-are page
    let whoWeArePage = await Page.findOne({ slug: "who-we-are" });

    const sections = [
      {
        type: "AboutUsHeader",
        data: {
          title: {
            en: "ABOUT US",
            am: "ስለ እኛ",
          },
          subtitle: {
            en: "Honoring Ethiopia's Healing Heritage with Modern Excellence",
            am: "የኢትዮጵያን ባህላዊ ሕክምና ብርሃን በዘመናዊ ጥራት መድገም",
          },
        },
        order: 1,
      },
      {
        type: "GroupPhotoSection",
        data: {
          imageSrc: placeholderImages.heroMain,
          altText: {
            en: "Deshet Medical Center team",
            am: "የደሸት የሕክምና ማዕከል ቡድን",
          },
        },
        order: 2,
      },
      {
        type: "AboutTSDSection",
        data: {
          description: {
            en: "Deshet Indigenous Medical Center was founded to preserve, elevate, and modernize Ethiopia's ancient healing traditions. Our work is rooted in centuries of herbal knowledge, cultural wisdom, and natural therapeutic practices — presented today with modern professionalism, safety standards, and compassionate care.\n\nWe believe healing is more than treating symptoms; it is the restoration of balance between body, mind, and spirit. Our approach blends ancestral methods with contemporary understanding to deliver holistic, effective, and natural wellness solutions.",
            am: "የDeshet ባህላዊ ሕክምና ማዕከል መቋቋሙ የተነሳው ዘመናዊ የጤና ፍላጎቶችን ሳናሳልፍ፣ ከትውልድ ወደ ትውልድ የተተላለፈውን የኢትዮጵያ ባህላዊ ሕክምና ብርሃን ለመጠበቅ፣ ለመደገፍ እና በሙያዊነት ለማቀረብ ነው።\n\nእኛ ለሰውነት፣ ለአእምሮ እና ለመንፈስ መዛመቻ ማቋቋም እንደ እውነተኛ ሕክምና እናምናለን።",
          },
          frontImageSrc: placeholderImages.heroContent,
          backImageSrc: placeholderImages.heroContent,
        },
        order: 3,
      },
      {
        type: "VisionMissionSection",
        data: {
          visionText: {
            en: "To be Ethiopia's leading center for natural and traditional healthcare, recognized for professionalism, authenticity, and exceptional healing outcomes.",
            am: "በኢትዮጵያ ውስጥ በተፈጥሯዊ እና ባህላዊ ሕክምና መስክ የተለየ ቅንነት ያለው የመጀመሪያ ማዕከል መሆን።",
          },
          missionText: {
            en: "To enhance the well-being of our community through natural medicine, expert care, and ancestral wisdom blended with modern standards.",
            am: "የህብረተሰቡን ጤናና ደህንነት በተፈጥሯዊ ዘዴ፣ በባህላዊ ፍላጎት እና በሙያዊ ስራ ማሻሻል።",
          },
          visionImage: placeholderImages.vision,
          missionImage: placeholderImages.mission,
        },
        order: 4,
      },
      {
        type: "OurStorySection",
        data: {
          title: {
            en: "Our Story",
            am: "ታሪካችን",
          },
          content: {
            en: "The Deshet practice originates from a family lineage known for traditional healing, herbal knowledge, and cultural medical wisdom passed down through generations.\n\nOver the years, this knowledge evolved, expanded, and strengthened — becoming a trusted healing system used by individuals and families throughout Ethiopia.\n\nThrough careful preservation and professional refinement, Deshet Indigenous Medical Center now provides this cultural heritage in a modern, accessible form designed for today's health needs.",
            am: "የDeshet ሕክምና ሥርዓት የተጀመረው ከባህላዊ ሕክምናን በአመታት ተሞልቶ በቤተሰብ ትውልድ የተሰጠ ውርስ መሠረት ነው።\n\nእዚህ የተሰበሰበው እውቀት በዘመናዊ ጥንካሬ ተጨምሮ፣ በኢትዮጵያ ውስጥ ለህዝብ የታመነና የተፈተነ መፍትሔ ሆኖ ተሸምቷል።\n\nዛሬ ይህ ውርስ በሙያዊ እቅድ፣ በዘመናዊ ተዘጋጅታ እና በተፈጥሯዊ ንፅህና የተማረ መልኩ ለተለያዩ የጤና ፍላጎቶች እንዲሰራ ተቀድቷል።",
          },
          image: placeholderImages.heroContent,
        },
        order: 5,
      },
      {
        type: "OurPhilosophySection",
        data: {
          title: {
            en: "Our Philosophy",
            am: "የስነ-ልቦናችን መሠረት",
          },
          principles: [
            {
              title: {
                en: "Nature First",
                am: "ተፈጥሯዊ ሕክምና",
              },
              description: {
                en: "We believe the most powerful medicine is found in the plants, soil, and forests of our land. Every remedy we use is derived from pure, natural sources with no chemical additives.",
                am: "ሕክምናው ብርቱ ከተፈጥሯዊ ፍጥረታት ነው የሚመጣው። እኛ የምናጠቀምባቸው እፅዋት፣ ሥሮች፣ ቅጠሎች፣ ተፈጥሯዊ ዘይቶችና ስብስቦች በሙሉ ንፁህ ናቸው።",
              },
              icon: "🌿",
            },
            {
              title: {
                en: "Cultural Respect",
                am: "ባህላዊነት እና ምስክርነት",
              },
              description: {
                en: "Our treatments honor Ethiopian identity, values, and healing traditions — ensuring authenticity in every step.",
                am: "ዕውቀታችን በኢትዮጵያ ሕይወት፣ ባህል እና ተፅዕኖ የተተረከበ ነው። ትክክለኛ የባህላዊ ሕክምና ልምድን በእውነት እንድናቀርብ እንጠንቀቃለን።",
              },
              icon: "🏛️",
            },
            {
              title: {
                en: "Holistic Healing",
                am: "አጠቃላይ ፈውስ",
              },
              description: {
                en: "We address the whole person, not just the symptoms. Energy balance, emotional well-being, nutrition, lifestyle, and environmental factors all influence wellness.",
                am: "ሰውነት፣ አእምሮ እና መንፈስ በአንድ ልዩ ሚዛን ላይ እንዲሰሩ እንመራለን። የራስ ሁኔታ፣ ምግብ፣ እንቅስቃሴ እና ስሜት የጤና መሠረት መሆናቸውን እናውቃለን።",
              },
              icon: "⚖️",
            },
            {
              title: {
                en: "Professional Standards",
                am: "ዘመናዊ ጥራት & ደህንነት",
              },
              description: {
                en: "Modern hygiene, organization, documentation, and responsible preparation guide all our services and herbal products.",
                am: "ሁሉም እቃና ሕክምናዎች በንፅህና፣ በተደራጀ ዘዴ እና በሙያዊ መመሪያ ይዘጋጃሉ።",
              },
              icon: "✅",
            },
            {
              title: {
                en: "Personalized Care",
                am: "ተመጣጣኝ የግል እንክብካቤ",
              },
              description: {
                en: "Every individual receives a tailored evaluation and treatment plan based on their body needs, symptoms, and living conditions.",
                am: "በእያንዳንዱ እንደ ሰው ፍላጎት የተመዘነ ትኩረት እና ምክር እንሰጣለን።",
              },
              icon: "👤",
            },
          ],
        },
        order: 6,
      },
      {
        type: "HealingApproachSection",
        data: {
          title: {
            en: "Our Healing Approach",
            am: "የምናደርገው የፈውስ አቀራረብ",
          },
          content: {
            en: "Deshet's healing process combines:\n\n• Indigenous diagnostic methods\n• Herbal treatment traditions\n• Natural remedies made from roots, leaves, seeds, and extracts\n• Personalized lifestyle and nutritional guidance\n• Spiritual and emotional harmony practices\n• Modern organization & safety standards\n\nThis integrated approach allows us to offer safe, effective, and culturally rooted healing for a wide range of conditions.",
            am: "Deshet በተወሰነ መልኩ ባህላዊ መፍትሔን ከዘመናዊ ተዘጋጅታ ጋር ያቀላቅላል፦\n\n• የባህላዊ ምርመራ ጥናት\n• የእፅዋት መድኃኒት ዝግጅት\n• ተፈጥሯዊ ቅርፀ ሕክምና\n• የሕይወት ቅጥያ እና አመጋገብ ምክር\n• የመንፈሳዊ እርግጥ መመሪያ\n• ዘመናዊ ደህንነት & ተደራሽነት\n\nይህ የተቀላቀለ አቀራረብ በማንኛውም ዕድሜ ተፈላጊ የሆነ እውነተኛ ፈውስ ይጠቅማል።",
          },
          image: placeholderImages.vision,
        },
        order: 7,
      },
      {
        type: "PractitionerSection",
        data: {
          title: {
            en: "Meet the Practitioner",
            am: "ሀኪሙን ይውቁ",
          },
          name: {
            en: "Dr. Yohans Shiferaw (Deshet)",
            am: "ዶ/ር ዮሐንስ ሽፈራው (Deshet)",
          },
          position: {
            en: "Traditional Medicine Specialist & Herbal Practitioner",
            am: "የባህላዊ ሕክምና ባለሙያ • የእፅዋት መድኃኒት ባለሙያ",
          },
          bio: {
            en: "A practitioner with years of experience in indigenous medicine, Dr. Yohans comes from a family tradition deeply rooted in Ethiopian healing practices.\n\nHe specializes in:\n• Traditional diagnostics\n• Herbal remedy formulation\n• Natural healing techniques\n• Body cleansing & detox systems\n• Emotional and spiritual balance\n• Cultural wellness consultation\n\nHis mission is to help individuals regain balance, restore wellness, and reconnect with nature's healing power.",
            am: "ዶ/ር ዮሐንስ በርካታ ዓመታት ልምድ፣ ትውልድ የተሰጠ ዕውቀት እና በተፈጥሯዊ መፍትሔ ውስጥ የተጠናከረ ብልጽግና ይዞ ይሰራል።\n\nየሚመረጡት ስራዎች፦\n• ባህላዊ ምርመራ\n• የእፅዋት መድኃኒት ዝግጅት\n• ተፈጥሯዊ ቅርፀ ሕክምና\n• እንጥረት መታከም እና የመንፈስ ሚዛን\n• የሰውነት ንፅህና እና ዲቶክስ\n• የየቅርብ የባህላዊ መደበኛ ምክር",
          },
          image: placeholderImages.practitioner,
          mission: {
            en: "The truth of healing is the restoration of balance between body, mind, and spirit. Traditional medicine is a service we honor to bring this to the community.",
            am: "የፈውስ እውነቱ የሰውነት፣ የአእምሮ እና የመንፈስ ሚዛን መመለስ ነው። ባህላዊ ሕክምና ይህንንን ማኅበረሰብ ላይ እንድናቀርብ የምንከብር ተግባር ነው።",
          },
        },
        order: 8,
      },
      {
        type: "CommitmentSection",
        data: {
          title: {
            en: "Our Commitment",
            am: "ቁርጠኛ ቃላችን",
          },
          commitments: [
            {
              en: "Providing safe, natural, and effective treatments",
              am: "የተጠናቀቀ፣ የተፈተነ እና 100% ተፈጥሯዊ ፈውስ ማቅረብ",
            },
            {
              en: "Preserving and protecting Ethiopia's healing heritage",
              am: "ባህላዊ ሕክምናን ለዘመናዊ ትውልድ በሙሉ ክብር እንዲደርስ እንጥራለን",
            },
            {
              en: "Delivering respectful, compassionate care to every person",
              am: "የእግዚአብሔርን ፍጥረት ከሳይንሳዊ ጥናት ጋር በመዋሃድ የሚመርቱ መፍትሄዎችን እናቀርባለን",
            },
            {
              en: "Offering reliable herbal products produced with integrity",
              am: "የተጠናቀቀ፣ የተፈተነ እና 100% ተፈጥሯዊ ፈውስ ማቅረብ",
            },
            {
              en: "Leading the revival of indigenous healing in a modern era",
              am: "ባህላዊ ሕክምናን ለዘመናዊ ትውልድ በሙሉ ክብር እንዲደርስ እንጥራለን",
            },
          ],
        },
        order: 9,
      },
      {
        type: "CallToActionSection",
        data: {
          title: {
            en: "Experience Authentic Ethiopian Healing",
            am: "እውነተኛ የኢትዮጵያ ፈውስን ያግኙ",
          },
          description: {
            en: "Learn more about our services, products, and booking options below.",
            am: "አገልግሎታችንን ይመልከቱ፣ ቀጠሮ ይያዙ ወይም የተፈጥሯዊ መፍትሔዎቻችንን ይዘዙ።",
          },
          primaryButton: {
            text: {
              en: "View Services",
              am: "አገልግሎቶችን ይመልከቱ",
            },
            link: "/programs",
          },
          secondaryButton: {
            text: {
              en: "Book an Appointment",
              am: "ቀጠሮ ይያዙ",
            },
            link: "/booking",
          },
        },
        order: 10,
      },
    ];

    if (whoWeArePage) {
      // Update existing page
      whoWeArePage.sections = sections as any;
      whoWeArePage.title = {
        en: "Who We Are - Deshet Medical Center",
        am: "ስለእኛ - ደሸት የሕክምና ማዕከል",
      };
      whoWeArePage.content = {
        en: "About Deshet Indigenous Medical Center",
        am: "ስለ ደሸት ባህላዊ ሕክምና ማዕከል",
      };
      await whoWeArePage.save();
      console.log("✅ Updated Who We Are page with Deshet content\n");
    } else {
      // Create new page
      whoWeArePage = await Page.create({
        title: {
          en: "Who We Are - Deshet Medical Center",
          am: "ስለእኛ - ደሸት የሕክምና ማዕከል",
        },
        slug: "who-we-are",
        content: {
          en: "About Deshet Indigenous Medical Center",
          am: "ስለ ደሸት ባህላዊ ሕክምና ማዕከል",
        },
        status: "published",
        author: adminUser._id,
        sections: sections as any,
      });
      console.log("✅ Created Who We Are page with Deshet content\n");
    }

    console.log(`✅ Seeded ${sections.length} sections for Who We Are page\n`);
    console.log("✅ Who We Are page seed completed!");

    // Close connection
    await mongoose.disconnect();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding Who We Are page:", error);
    process.exit(1);
  }
}

// Run seed
seedWhoWeArePage();


