import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

// Complete program data with all projects based on organizational chart
const programsData = [
  // Youth Empowerment & Peace Building Program
  {
    title: "Youth Empowerment & Peace Building (YEPB)",
    slug: "youth-empowerment-peace-building",
    categoryId: "youth-empowerment",
    categoryLabel: "Youth Empowerment &\nPeacebuilding",
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
          "Youth Challenge Initiative implemented by Youth Network for Sustainable Development. Focuses on SRH awareness, health-seeking behavior, entrepreneurship skills, and sustainable business model for reusable sanitary pads.",
        featuredImage:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
            alt: "YCI YNSD thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
            alt: "YCI YNSD thumbnail 2",
            uploaded: false,
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
            alt: "YCI YNSD thumbnail 3",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "YNSD",
      },
      {
        id: 2,
        name: "Peace - NORAD",
        description:
          "Peacebuilding project funded by Norwegian Agency for Development Cooperation. Aims to raise awareness on peacebuilding, conflict prevention, and social cohesion among communities.",
        featuredImage:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
            alt: "Peace NORAD thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
            alt: "Peace NORAD thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "NORAD",
      },
      {
        id: 3,
        name: "ERASE EILDA",
        description:
          "Enhance resilience against online and offline violence in the society of Ethiopia. Fosters trust through dialogue and establishes community monitoring networks.",
        featuredImage:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
            alt: "ERASE EILDA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
            alt: "ERASE EILDA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "EILDA",
      },
      {
        id: 4,
        name: "VAC CRVPF",
        description:
          "Violence Against Children project under Children's Rights and Violence Prevention Fund. Strengthens parenting skills and creates supportive family environments.",
        featuredImage:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
            alt: "VAC CRVPF thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
            alt: "VAC CRVPF thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "CRVPF",
      },
      {
        id: 5,
        name: "YDP - TSD",
        description:
          "Youth Development Program implemented by Tamra Sustainable Development. Comprehensive youth development initiative focusing on leadership and community engagement.",
        featuredImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
            alt: "YDP TSD thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
            alt: "YDP TSD thumbnail 2",
            uploaded: false,
          },
        ],
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
    title: "SRH and Gender Development (SRHGD)",
    slug: "srh-gender-development",
    categoryId: "srh-gender",
    categoryLabel: "SRH & Gender\nDevelopment",
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
          "Gender-Based Violence prevention project funded by Norwegian Church Aid. Improves social norms and attitudes toward ending violence against women and girls within school communities.",
        featuredImage:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
            alt: "GBV NCA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
            alt: "GBV NCA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "NCA",
      },
      {
        id: 2,
        name: "Safe City NCA",
        description:
          "Creating safe urban environments for women and girls. Engages men, boys, and volunteers in promoting positive masculinity and equitable social norms.",
        featuredImage:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
            alt: "Safe City NCA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
            alt: "Safe City NCA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "NCA",
      },
      {
        id: 3,
        name: "SRHR - Sonke",
        description:
          "Sexual and Reproductive Health and Rights project with Sonke Gender Justice. Empowers women, girls, and marginalized groups to make informed decisions about SRHR.",
        featuredImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
            alt: "SRHR Sonke thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
            alt: "SRHR Sonke thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "Sonke",
      },
      {
        id: 4,
        name: "GESI - GIZ",
        description:
          "Gender Equality and Social Inclusion project with German Development Cooperation. Focuses on SRH awareness, entrepreneurship, and reusable sanitary pads (2017-2025).",
        featuredImage:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
            alt: "GESI GIZ thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
            alt: "GESI GIZ thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "GIZ",
      },
      {
        id: 5,
        name: "SRHR Ipas",
        description:
          "Sexual and Reproductive Health and Rights project with Ipas. Raises awareness among factory workers on SRHR, safe abortion, contraception, and SGBV prevention.",
        featuredImage:
          "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
            alt: "SRHR Ipas thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
            alt: "SRHR Ipas thumbnail 2",
            uploaded: false,
          },
        ],
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
    title: "Climate Justice and Livelihood (CJL)",
    slug: "climate-justice-livelihood",
    categoryId: "climate-justice",
    categoryLabel: "Climate Justice &\nLivelihoods",
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
          "Climate adaptation and mitigation project with Norwegian Church Aid. Builds community resilience against climate change impacts and promotes sustainable practices.",
        featuredImage:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center",
            alt: "Climate NCA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
            alt: "Climate NCA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "NCA",
      },
      {
        id: 2,
        name: "Livelihood NCA",
        description:
          "Sustainable livelihood development project. Creates economic opportunities that support both people and environmental sustainability.",
        featuredImage:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
            alt: "Livelihood NCA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
            alt: "Livelihood NCA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "NCA",
      },
      {
        id: 3,
        name: "CSPW - YNSD",
        description:
          "Climate Smart Practices for Women implemented by Youth Network for Sustainable Development. Empowers women with climate-resilient agricultural practices.",
        featuredImage:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
            alt: "CSPW YNSD thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
            alt: "CSPW YNSD thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "YNSD",
      },
      {
        id: 4,
        name: "W4V - NCA",
        description:
          "Water for Vulnerable Communities project. Ensures access to clean water and promotes water conservation practices in vulnerable communities.",
        featuredImage:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
            alt: "W4V NCA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center",
            alt: "W4V NCA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "active",
        partner: "NCA",
      },
      {
        id: 5,
        name: "IRWA",
        description:
          "Integrated River Watershed Management project. Focuses on comprehensive watershed management and environmental protection.",
        featuredImage:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center",
            alt: "IRWA thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
            alt: "IRWA thumbnail 2",
            uploaded: false,
          },
        ],
        status: "planning",
        partner: "TBD",
      },
      {
        id: 6,
        name: "Envt TSD",
        description:
          "Environmental protection project by Tamra Sustainable Development. Promotes environmental conservation and sustainable development practices.",
        featuredImage:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center",
        galleryThumbnails: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
            alt: "Envt TSD thumbnail 1",
            uploaded: false,
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
            alt: "Envt TSD thumbnail 2",
            uploaded: false,
          },
        ],
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
    console.log("📚 Seeding complete programs with all projects...");
    const result = await programsCollection.insertMany(programsWithTimestamps);
    console.log(`✅ Successfully seeded ${result.insertedCount} programs`);

    // Display summary
    console.log("\n📊 Complete Programs Seeding Summary:");
    console.log("─".repeat(80));

    programsData.forEach((program, index) => {
      console.log(`${index + 1}. ${program.title}`);
      console.log(`   Category: ${program.categoryLabel.replace("\n", " ")}`);
      console.log(`   Projects (${program.projects.length}):`);
      program.projects.forEach((project) => {
        console.log(
          `     - ${project.name} (${project.partner}) - ${project.status}`
        );
      });
      console.log("");
    });

    console.log("─".repeat(80));
    console.log(`Total Programs: ${result.insertedCount}`);
    console.log(
      `Total Projects: ${programsData.reduce(
        (acc, p) => acc + p.projects.length,
        0
      )}`
    );
    console.log("─".repeat(80));

    console.log("\n✨ Complete programs seeding completed successfully!");
    console.log("\n🎯 Perfect Structure Match:");
    console.log("Programs → Projects (matching organizational chart)");
    console.log("• Youth Empowerment & Peace Building → 5 projects");
    console.log("• SRH and Gender Development → 5 projects");
    console.log("• Climate Justice and Livelihood → 6 projects");
    console.log(
      "\n📝 All projects are now seeded under correct program categories!"
    );
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
