import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

// Additional gallery data to populate more categories
const additionalGalleryData = [
  // CLM Category - Additional items
  {
    filename: "clm-workshop-1.jpg",
    originalName: "CLM Workshop Session",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 75000,
    alt: "CLM workshop in progress",
    caption: "Community Leadership and Management workshop session with participants",
    categorySlug: "clm",
  },
  {
    filename: "clm-community-meeting.jpg",
    originalName: "Community Meeting",
    url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 82000,
    alt: "Community leadership meeting",
    caption: "Community leadership meeting discussing local development initiatives",
    categorySlug: "clm",
  },

  // Events Category - Additional items
  {
    filename: "events-conference.jpg",
    originalName: "Annual Conference",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 68000,
    alt: "Annual conference event",
    caption: "TAMRA's annual conference bringing together stakeholders and partners",
    categorySlug: "events",
  },
  {
    filename: "events-campaign.jpg",
    originalName: "Awareness Campaign",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 71000,
    alt: "Public awareness campaign",
    caption: "Public awareness campaign on social development issues",
    categorySlug: "events",
  },

  // Training Category - Additional items
  {
    filename: "training-workshop.jpg",
    originalName: "Skills Training Workshop",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 78000,
    alt: "Skills training workshop",
    caption: "Skills training workshop for community development",
    categorySlug: "training",
  },
  {
    filename: "training-youth.jpg",
    originalName: "Youth Training Program",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 69000,
    alt: "Youth training program",
    caption: "Youth empowerment and leadership training program",
    categorySlug: "training",
  },

  // GESI Category - Additional items
  {
    filename: "gesi-gender-equality.jpg",
    originalName: "Gender Equality Workshop",
    url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 73000,
    alt: "Gender equality workshop",
    caption: "Gender equality and social inclusion workshop",
    categorySlug: "gesi",
  },

  // SRHR Category - Additional items
  {
    filename: "srhr-health-awareness.jpg",
    originalName: "Health Awareness Session",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 76000,
    alt: "Health awareness session",
    caption: "Sexual and reproductive health awareness session",
    categorySlug: "srhr",
  },

  // CSPW Category - Additional items
  {
    filename: "cspw-environmental.jpg",
    originalName: "Environmental Training",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 74000,
    alt: "Environmental training session",
    caption: "Climate smart practices training for women",
    categorySlug: "cspw",
  },

  // Exhibition Category - Additional items
  {
    filename: "exhibition-achievements.jpg",
    originalName: "Achievements Exhibition",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&crop=center",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 79000,
    alt: "Achievements exhibition",
    caption: "Exhibition showcasing TAMRA's achievements and impact",
    categorySlug: "exhibition",
  },
];

async function seedAdditionalGallery() {
  let client: MongoClient | null = null;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const galleryCollection = db.collection('galleries');
    const categoryCollection = db.collection('gallerycategories');
    const userCollection = db.collection('users');

    // Get a default admin user for uploads
    const defaultUser = await userCollection.findOne({ role: 'admin' });
    if (!defaultUser) {
      throw new Error('No admin user found. Please run user seeding first.');
    }

    // Get category mapping
    const categories = await categoryCollection.find({}).toArray();
    const categoryMap = new Map();
    categories.forEach(category => {
      categoryMap.set(category.slug, category._id);
    });

    console.log(`📂 Found ${categoryMap.size} categories for mapping`);

    // Add timestamps and user reference to each gallery item
    const galleryWithTimestamps = additionalGalleryData.map(item => {
      const categoryId = categoryMap.get(item.categorySlug);
      if (!categoryId) {
        throw new Error(`Category not found for slug: ${item.categorySlug}`);
      }

      return {
        ...item,
        category: categoryId,
        uploadedBy: defaultUser._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Insert additional gallery items
    console.log('🖼️  Seeding additional gallery items...');
    const result = await galleryCollection.insertMany(galleryWithTimestamps);
    console.log(`✅ Successfully seeded ${result.insertedCount} additional gallery items`);

    // Display summary by category
    console.log('\n📊 Additional Gallery Seeding Summary:');
    console.log('─'.repeat(60));
    
    const categoryCounts = additionalGalleryData.reduce((acc, item) => {
      acc[item.categorySlug] = (acc[item.categorySlug] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(categoryCounts).forEach(([categorySlug, count]) => {
      const category = categories.find(c => c.slug === categorySlug);
      const icon = category?.icon || '🖼️';
      const name = category?.name || categorySlug;
      console.log(`${icon} ${name}: ${count} new items`);
    });

    console.log('─'.repeat(60));
    console.log(`Total Additional Items: ${result.insertedCount}`);
    console.log('─'.repeat(60));

    console.log('\n✨ Additional gallery seeding completed successfully!');
    console.log('\n🎯 Categories now have more content:');
    Object.entries(categoryCounts).forEach(([categorySlug, count]) => {
      const category = categories.find(c => c.slug === categorySlug);
      const icon = category?.icon || '🖼️';
      const name = category?.name || categorySlug;
      console.log(`• ${icon} ${name} - ${count} additional items`);
    });

  } catch (error) {
    console.error('❌ Error seeding additional gallery:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the seed function
seedAdditionalGallery();


