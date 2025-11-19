import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

// Program data based on organizational chart structure
const programsData = [
  // Youth Empowerment & Peacebuilding Programs
  {
    title: "Youth Challenge Initiative (YCI)",
    slug: "youth-challenge-initiative-yci",
    categoryId: "youth-empowerment",
    categoryLabel: "Youth Empowerment & Peacebuilding",
    description:
      "The project focuses on increasing Sexual and Reproductive Health (SRH) awareness among youth, improving their health-seeking behavior, and enhancing access to youth-friendly SRH services. It also aims to build the entrepreneurship skills of young people and implement a sustainable business model for producing and distributing reusable sanitary pads.",
    image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        alt: "Youth Challenge Initiative thumbnail 1",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "Youth Challenge Initiative thumbnail 2",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "Youth Challenge Initiative thumbnail 3",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "Youth Challenge Initiative thumbnail 4",
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
    ],
    status: "published",
    order: 1,
    publishedAt: new Date("2024-01-01"),
  },
  {
    title: "Peace (NORAD)",
    slug: "peace-norad",
    categoryId: "youth-empowerment",
    categoryLabel: "Youth Empowerment & Peacebuilding",
    description:
      "The project aims to raise awareness among communities, particularly women and youth, on peacebuilding, conflict prevention, and social cohesion. It seeks to promote dialogue, tolerance, and mutual respect among diverse groups, while strengthening community resilience to prevent violence and discrimination. The project also strives to foster institutional commitment among public stakeholders and community leaders to support peacebuilding initiatives through advocacy, capacity building, and inclusive policy dialogue.",
    image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904.png",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "Peace NORAD thumbnail 1",
        uploaded: false,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        alt: "Peace NORAD thumbnail 2",
        uploaded: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        alt: "Peace NORAD thumbnail 3",
        uploaded: false,
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&crop=center",
        alt: "Peace NORAD thumbnail 4",
        uploaded: false,
      },
    ],
    projects: [
      {
        id: 1,
        name: "Peace - NORAD",
        description:
          "Peacebuilding project funded by Norwegian Agency for Development Cooperation",
        status: "active",
        partner: "NORAD",
      },
    ],
    status: "published",
    order: 2,
    publishedAt: new Date("2024-01-02"),
  },
  {
    title:
      "Enhance Resilience Against Online and Offline Violence in the Society of Ethiopia (ERASE)",
    slug: "erase-ethiopia",
    categoryId: "youth-empowerment",
    categoryLabel: "Youth Empowerment & Peacebuilding",
    description:
      "The project aims to foster trust and empathy through open dialogue and mutual understanding while establishing community monitoring and volunteer networks to detect and respond to conflicts early using technology. It engages local leaders, youth, women, and persons with disabilities (PWDs) in mediating disputes and promoting peace, and mobilizes communities to advocate for peace and inclusive policies.",
    image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-2.png",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop&crop=center",
        alt: "ERASE thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "ERASE thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center",
        alt: "ERASE thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        alt: "ERASE thumbnail 4",
      },
    ],
    status: "published",
    order: 3,
    publishedAt: new Date("2024-01-03"),
  },
  {
    title: "Children's Rights and Violence Prevention Fund (CRVPF)",
    slug: "crvpf",
    categoryId: "youth-empowerment",
    categoryLabel: "Youth Empowerment & Peacebuilding",
    description:
      "The project aims to strengthen parenting skills and spousal relationships to create a supportive family environment in Woreda 2, Kirkos Sub-City. It seeks to empower families through effective saving practices that reduce stress and socio-economic challenges affecting children's well-being, while also promoting safe and supportive school environments that enhance access to education and overall well-being for children and youth.",
    image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-3.png",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        alt: "CRVPF thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        alt: "CRVPF thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "CRVPF thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        alt: "CRVPF thumbnail 4",
      },
    ],
    status: "published",
    order: 4,
    publishedAt: new Date("2024-01-04"),
  },

  // SRH & Gender Development Programs
  {
    title: "GBV (NCA)",
    slug: "gbv-nca",
    categoryId: "srh-gender",
    categoryLabel: "SRH & Gender Development",
    description:
      "The Project Aims To Improve Social Norms And Attitudes Toward Ending Violence Against Women And Girls (VAWG) Within School Communities And Other Targeted Areas In The Intervention Sub-Cities. It Seeks To Engage Men, Boys, And Volunteers In Promoting Positive Masculinity And Contributing To The Transformation Of Harmful Social Norms, While Reaching Communities With Gender-Based Violence (GBV) Messages And Information To Encourage Active Participation In Preventing And Responding To VAWG Issues.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "GBV NCA thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "GBV NCA thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "GBV NCA thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "GBV NCA thumbnail 4",
      },
    ],
    status: "published",
    order: 5,
    publishedAt: new Date("2024-01-05"),
  },
  {
    title: "Safe City (NCA)",
    slug: "safe-city-nca",
    categoryId: "srh-gender",
    categoryLabel: "SRH & Gender Development",
    description:
      "The Project Aims To Improve Social Norms And Attitudes Toward Ending Violence Against Women And Girls (VAWG) Within School Communities And Other Target Areas In The Intervention Sub-Cities. It Seeks To Meaningfully Engage Men, Boys, And Volunteers In Promoting Positive Masculinity And Contributing To Equitable Social Norms, While Reaching Communities With Gender-Based Violence (GBV) Messages And Information To Encourage Active Participation In Preventing And Responding To VAWG Issues.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        alt: "Safe City thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        alt: "Safe City thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&crop=center",
        alt: "Safe City thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        alt: "Safe City thumbnail 4",
      },
    ],
    status: "published",
    order: 6,
    publishedAt: new Date("2024-01-06"),
  },
  {
    title: "SONKE (SRHR)",
    slug: "sonke-srhr",
    categoryId: "srh-gender",
    categoryLabel: "SRH & Gender Development",
    description:
      "The Project Aims To Empower Women, Girls, And Marginalized Groups To Make Informed Decisions And Demand Access To Sexual And Reproductive Health And Rights (SRHR) Information And Services. It Also Seeks To Engage Communities In Challenging Myths And Harmful Practices Related To SRHR By Promoting Shared Responsibility And Mutual Understanding While Strengthening SRHR Service Delivery Through Awareness Creation, Barrier Removal, And Advocacy For Policy Change.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "SONKE thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "SONKE thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "SONKE thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "SONKE thumbnail 4",
      },
    ],
    status: "published",
    order: 7,
    publishedAt: new Date("2024-01-07"),
  },
  {
    title: "GESI (GIZ)",
    slug: "gesi-giz",
    categoryId: "srh-gender",
    categoryLabel: "SRH & Gender Development",
    description:
      "(2017-2025, Packard Foundation Via YNSD) - SRH Awareness, Entrepreneurship, Reusable Sanitary Pads.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        alt: "GESI thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        alt: "GESI thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "GESI thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        alt: "GESI thumbnail 4",
      },
    ],
    status: "published",
    order: 8,
    publishedAt: new Date("2024-01-08"),
  },
  {
    title: "SRHR (IPAS)",
    slug: "srhr-ipas",
    categoryId: "srh-gender",
    categoryLabel: "SRH & Gender Development",
    description:
      "The Project Aims To Raise Awareness Among Factory Workers, Particularly Women And Girls, On Sexual And Reproductive Health And Rights (SRHR), Including Safe Abortion, Contraception, And The Prevention Of Sexual And Gender-Based Violence (SGBV). It Also Seeks To Promote Gender Equality And Ensure Access To SRHR Services And Rights For Women And Girls Working At Eastern Industrial Park, While Fostering Institutional Commitment Among Factory Managers And Public Stakeholders To Support Gender-Responsive SRHR Initiatives Through Advocacy And Policy Dialogue.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        alt: "SRHR IPAS thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        alt: "SRHR IPAS thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        alt: "SRHR IPAS thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        alt: "SRHR IPAS thumbnail 4",
      },
    ],
    status: "published",
    order: 9,
    publishedAt: new Date("2024-01-09"),
  },

  // Climate Justice & Livelihoods Programs
  {
    title: "Climate Resilience (PLACEHOLDER)",
    slug: "climate-resilience-placeholder",
    categoryId: "climate-justice",
    categoryLabel: "Climate Justice & Livelihoods",
    description:
      "This is a placeholder program for Climate Justice & Livelihoods category. The actual program details will be added here when available.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    thumbnails: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center",
        alt: "Climate Resilience thumbnail 1",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
        alt: "Climate Resilience thumbnail 2",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
        alt: "Climate Resilience thumbnail 3",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
        alt: "Climate Resilience thumbnail 4",
      },
    ],
    status: "published",
    order: 10,
    publishedAt: new Date("2024-01-10"),
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
    console.log("📚 Seeding programs...");
    const result = await programsCollection.insertMany(programsWithTimestamps);
    console.log(`✅ Successfully seeded ${result.insertedCount} programs`);

    // Display summary by category
    console.log("\n📊 Seeding Summary:");
    console.log("─".repeat(70));

    const categorySummary = programsData.reduce((acc: any, program) => {
      if (!acc[program.categoryLabel]) {
        acc[program.categoryLabel] = 0;
      }
      acc[program.categoryLabel]++;
      return acc;
    }, {});

    Object.keys(categorySummary).forEach((category) => {
      console.log(`${category}: ${categorySummary[category]} programs`);
    });

    console.log("─".repeat(70));
    console.log(`Total programs: ${result.insertedCount}`);
    console.log(
      `Published programs: ${
        programsData.filter((p) => p.status === "published").length
      }`
    );
    console.log("─".repeat(70));

    console.log("\n✨ Programs seeding completed successfully!");
    console.log("\n📝 Sample programs:");
    programsData.slice(0, 3).forEach((program, idx) => {
      console.log(`${idx + 1}. ${program.title}`);
      console.log(`   Category: ${program.categoryLabel}`);
      console.log(`   Slug: ${program.slug}`);
      console.log("");
    });
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
