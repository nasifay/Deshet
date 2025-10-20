import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

// Enhanced program data based on organizational chart
const programsData = [
  // Youth Empowerment & Peacebuilding Program
  {
    title: "Youth Empowerment & Peace Building",
    slug: "youth-empowerment-peace-building",
    categoryId: "youth-empowerment",
    categoryLabel: "Youth Empowerment & Peace Building",
    description:
      "This program focuses on empowering young people with leadership skills, entrepreneurship training, and peacebuilding initiatives. We work to create opportunities for youth to become proactive leaders and ambassadors of positive change in their communities.",
    image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        alt: "Youth empowerment training session",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "Peacebuilding workshop",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "Youth leadership development",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "Community dialogue session",
        uploaded: false,
      },
    ],
    projects: [
      {
        id: 1,
        name: "YCI YNSD",
        description:
          "Youth Challenge Initiative implemented by Youth Network for Sustainable Development",
        status: "active",
        partner: "YNSD",
      },
      {
        id: 2,
        name: "Peace - NORAD",
        description:
          "Peacebuilding project funded by Norwegian Agency for Development Cooperation",
        status: "active",
        partner: "NORAD",
      },
      {
        id: 3,
        name: "ERASE EILDA",
        description:
          "Enhance resilience against online and offline violence in the society of Ethiopia",
        status: "active",
        partner: "EILDA",
      },
      {
        id: 4,
        name: "VAC CRVPF",
        description:
          "Violence Against Children project under Children's Rights and Violence Prevention Fund",
        status: "active",
        partner: "CRVPF",
      },
      {
        id: 5,
        name: "YDP - TSD",
        description:
          "Youth Development Program implemented by Tamra Sustainable Development",
        status: "active",
        partner: "TSD",
      },
    ],
    status: "published",
    order: 1,
    publishedAt: new Date("2024-01-01"),
  },

  // SRH and Gender Development Program
  {
    title: "SRH and Gender Development",
    slug: "srh-gender-development",
    categoryId: "srh-gender",
    categoryLabel: "SRH and Gender Development",
    description:
      "This program aims to improve sexual and reproductive health awareness, promote gender equality, and prevent gender-based violence. We work with communities to challenge harmful social norms and ensure access to quality SRH services for women and girls.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "SRH awareness session",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "Gender equality workshop",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "Women's empowerment training",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "Safe spaces for women",
        uploaded: false,
      },
    ],
    projects: [
      {
        id: 1,
        name: "GBV - NCA",
        description:
          "Gender-Based Violence prevention project funded by Norwegian Church Aid",
        status: "active",
        partner: "NCA",
      },
      {
        id: 2,
        name: "Safe City NCA",
        description: "Creating safe urban environments for women and girls",
        status: "active",
        partner: "NCA",
      },
      {
        id: 3,
        name: "SRHR - Sonke",
        description:
          "Sexual and Reproductive Health and Rights project with Sonke Gender Justice",
        status: "active",
        partner: "Sonke",
      },
      {
        id: 4,
        name: "GESI - GIZ",
        description:
          "Gender Equality and Social Inclusion project with German Development Cooperation",
        status: "active",
        partner: "GIZ",
      },
      {
        id: 5,
        name: "SRHR Ipas",
        description:
          "Sexual and Reproductive Health and Rights project with Ipas",
        status: "active",
        partner: "Ipas",
      },
    ],
    status: "published",
    order: 2,
    publishedAt: new Date("2024-01-02"),
  },

  // Climate Justice and Livelihood Program
  {
    title: "Climate Justice and Livelihood",
    slug: "climate-justice-livelihood",
    categoryId: "climate-justice",
    categoryLabel: "Climate Justice and Livelihood",
    description:
      "This program addresses climate change impacts and promotes sustainable livelihoods. We work with communities to build resilience against climate change, promote environmental sustainability, and create economic opportunities that support both people and the planet.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center",
        alt: "Climate adaptation training",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
        alt: "Sustainable agriculture",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
        alt: "Environmental conservation",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
        alt: "Community resilience building",
        uploaded: false,
      },
    ],
    projects: [
      {
        id: 1,
        name: "Climate - NCA",
        description:
          "Climate adaptation and mitigation project with Norwegian Church Aid",
        status: "active",
        partner: "NCA",
      },
      {
        id: 2,
        name: "Livelihood NCA",
        description: "Sustainable livelihood development project",
        status: "active",
        partner: "NCA",
      },
      {
        id: 3,
        name: "CSPW - YNSD",
        description:
          "Climate Smart Practices for Women implemented by Youth Network for Sustainable Development",
        status: "active",
        partner: "YNSD",
      },
      {
        id: 4,
        name: "W4V - NCA",
        description: "Water for Vulnerable Communities project",
        status: "active",
        partner: "NCA",
      },
      {
        id: 5,
        name: "IRWA",
        description: "Integrated River Watershed Management project",
        status: "planning",
        partner: "TBD",
      },
      {
        id: 6,
        name: "Envt TSD",
        description:
          "Environmental protection project by Tamra Sustainable Development",
        status: "active",
        partner: "TSD",
      },
    ],
    status: "published",
    order: 3,
    publishedAt: new Date("2024-01-03"),
  },
];

async function seedPrograms() {
  let client: MongoClient | null = null;

  try {
    console.log("🔌 Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    const programsCollection = db.collection("programs");

    // Check if programs already exist
    const existingCount = await programsCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing programs.`);
      console.log("🗑️  Clearing existing programs...");
      await programsCollection.deleteMany({});
      console.log("✅ Cleared existing programs");
    }

    // Add timestamps to each program
    const programsWithTimestamps = programsData.map((program) => ({
      ...program,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert programs
    console.log("📚 Seeding enhanced programs...");
    const result = await programsCollection.insertMany(programsWithTimestamps);
    console.log(`✅ Successfully seeded ${result.insertedCount} programs`);

    // Display summary
    console.log("\n📊 Enhanced Programs Seeding Summary:");
    console.log("─".repeat(70));

    programsData.forEach((program, index) => {
      console.log(`${index + 1}. ${program.title}`);
      console.log(`   Projects: ${program.projects.length}`);
      program.projects.forEach((project) => {
        console.log(`     - ${project.name} (${project.partner})`);
      });
      console.log("");
    });

    console.log("─".repeat(70));
    console.log(`Total Programs: ${result.insertedCount}`);
    console.log(
      `Total Projects: ${programsData.reduce(
        (acc, p) => acc + p.projects.length,
        0
      )}`
    );
    console.log("─".repeat(70));

    console.log("\n✨ Enhanced programs seeding completed successfully!");
    console.log("\n🎯 Structure:");
    console.log("Programs → Projects");
    console.log("• Youth Empowerment & Peace Building → 5 projects");
    console.log("• SRH and Gender Development → 5 projects");
    console.log("• Climate Justice and Livelihood → 6 projects");
  } catch (error) {
    console.error("❌ Error seeding programs:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
}

// Run the seed function
seedPrograms();
