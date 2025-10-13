import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

// Gallery categories data
const categoriesData = [
  {
    name: "CLM",
    slug: "clm",
    description: "Community Leadership and Management initiatives and activities",
    color: "#128341",
    icon: "🏛️",
    order: 1,
    isActive: true,
  },
  {
    name: "CRPVF",
    slug: "crpvf", 
    description: "Children's Rights and Violence Prevention Fund projects",
    color: "#FF6B6B",
    icon: "👶",
    order: 2,
    isActive: true,
  },
  {
    name: "CSPW",
    slug: "cspw",
    description: "Climate Smart Practices for Women environmental initiatives",
    color: "#4ECDC4",
    icon: "🌱",
    order: 3,
    isActive: true,
  },
  {
    name: "Events",
    slug: "events",
    description: "Events and campaigns organized by TAMRA",
    color: "#45B7D1",
    icon: "🎉",
    order: 4,
    isActive: true,
  },
  {
    name: "Exhibition",
    slug: "exhibition",
    description: "Exhibitions and showcases of TAMRA's work",
    color: "#96CEB4",
    icon: "🎨",
    order: 5,
    isActive: true,
  },
  {
    name: "GESI",
    slug: "gesi",
    description: "Gender Equality and Social Inclusion programs",
    color: "#FFEAA7",
    icon: "⚖️",
    order: 6,
    isActive: true,
  },
  {
    name: "SRHR",
    slug: "srhr",
    description: "Sexual and Reproductive Health Rights initiatives",
    color: "#DDA0DD",
    icon: "💚",
    order: 7,
    isActive: true,
  },
  {
    name: "Meetings",
    slug: "meetings",
    description: "General Assembly meetings and organizational activities",
    color: "#98D8C8",
    icon: "🤝",
    order: 8,
    isActive: true,
  },
  {
    name: "Training",
    slug: "training",
    description: "Training programs and capacity building activities",
    color: "#F7DC6F",
    icon: "🎓",
    order: 9,
    isActive: true,
  },
  {
    name: "Recognition",
    slug: "recognition",
    description: "Awards, recognition, and achievements",
    color: "#BB8FCE",
    icon: "🏆",
    order: 10,
    isActive: true,
  },
];

async function seedGalleryCategories() {
  let client: MongoClient | null = null;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const categoriesCollection = db.collection('gallerycategories');

    // Check if categories already exist
    const existingCount = await categoriesCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing gallery categories.`);
      console.log('🗑️  Clearing existing categories...');
      await categoriesCollection.deleteMany({});
      console.log('✅ Cleared existing categories');
    }

    // Add timestamps to each category
    const categoriesWithTimestamps = categoriesData.map(category => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert categories
    console.log('📂 Seeding gallery categories...');
    const result = await categoriesCollection.insertMany(categoriesWithTimestamps);
    console.log(`✅ Successfully seeded ${result.insertedCount} gallery categories`);

    // Display summary
    console.log('\n📊 Gallery Categories Seeding Summary:');
    console.log('─'.repeat(80));
    
    categoriesData.forEach((category, index) => {
      console.log(`${index + 1}. ${category.icon} ${category.name}`);
      console.log(`   Color: ${category.color}`);
      console.log(`   Description: ${category.description}`);
      console.log('');
    });

    console.log('─'.repeat(80));
    console.log(`Total Categories: ${result.insertedCount}`);
    console.log('─'.repeat(80));

    console.log('\n✨ Gallery categories seeding completed successfully!');
    console.log('\n🎯 Categories Available:');
    categoriesData.forEach(cat => {
      console.log(`• ${cat.icon} ${cat.name} - ${cat.description}`);
    });

  } catch (error) {
    console.error('❌ Error seeding gallery categories:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the seed function
seedGalleryCategories();


