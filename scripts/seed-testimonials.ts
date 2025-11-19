import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

const testimonials = [
  {
    quote:
      "I Envision For Tamra, In The Future, A Leadership And Empowerment Hub, A Youth-Focused Resource Center In Ethiopia And Beyond.",
    name: "Kidist Belayneh",
    title: "County Program Manager",
    organization: "Norwegian Church Aid",
    featured: true,
    order: 1,
    status: "active",
  },
  {
    quote:
      "I Hope To See More Of Them In Various Regions Around The World. I Wish Them Success Over The Next 25 Years, Strengthening Their Institutional Efforts And Continuing The Successful Journey That Started To Enhance The Lives Of Many Young People.",
    name: "Ephrem Burhan",
    title: "Executive Director",
    organization: "Tilant Youth Association",
    featured: true,
    order: 2,
    status: "active",
  },
  {
    quote:
      "I Want To Express My Gratitude To The Integrated Social Development Organization, Which Has Been A Valuable Resource For Mothers, Youth, And Our Community Since It Was Founded.",
    name: "Adane T/georgis",
    title: "Shashemene City Administration",
    organization: "",
    featured: true,
    order: 3,
    status: "active",
  },
];

async function seedTestimonials() {
  let client: MongoClient | null = null;

  try {
    console.log("🔌 Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    const testimonialsCollection = db.collection("testimonials");

    // Check if testimonials already exist
    const existingCount = await testimonialsCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing testimonials.`);
      console.log("🗑️  Clearing existing testimonials...");
      await testimonialsCollection.deleteMany({});
      console.log("✅ Cleared existing testimonials");
    }

    // Add timestamps to each testimonial
    const testimonialsWithTimestamps = testimonials.map((testimonial) => ({
      ...testimonial,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert testimonials
    console.log("💬 Seeding testimonials...");
    const result = await testimonialsCollection.insertMany(
      testimonialsWithTimestamps
    );
    console.log(`✅ Successfully seeded ${result.insertedCount} testimonials`);

    // Display summary
    console.log("\n📊 Testimonials Seeding Summary:");
    console.log("─".repeat(70));

    testimonials.forEach((testimonial, index) => {
      console.log(`${index + 1}. ${testimonial.name}`);
      console.log(`   Title: ${testimonial.title}`);
      console.log(`   Organization: ${testimonial.organization || "N/A"}`);
      console.log(`   Featured: ${testimonial.featured ? "Yes" : "No"}`);
      console.log(`   Status: ${testimonial.status}`);
      console.log("");
    });

    console.log("─".repeat(70));
    console.log(`Total Testimonials: ${result.insertedCount}`);
    console.log(
      `Featured Testimonials: ${testimonials.filter((t) => t.featured).length}`
    );
    console.log(
      `Active Testimonials: ${
        testimonials.filter((t) => t.status === "active").length
      }`
    );
    console.log("─".repeat(70));

    console.log("\n✨ Testimonials seeding completed successfully!");
    console.log("\n📝 Next Steps:");
    console.log("1. Access /admin/testimonials to manage testimonials");
    console.log("2. Featured testimonials will appear on the landing page");
    console.log('3. Adjust the "order" field to control display sequence');
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
}

// Run the seed function
seedTestimonials();
