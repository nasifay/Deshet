import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

// Gallery categories with featured images matching ImageGallerySection structure
const categoriesData = [
  {
    name: "CLM",
    slug: "clm",
    description: "Community Leadership and Management",
    color: "#128341",
    icon: "🏛️",
    order: 1,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-7.svg",
    hasBackground: true,
    backgroundImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-48.png",
  },
  {
    name: "CRPVF",
    slug: "crpvf",
    description: "Children's Rights and Violence Prevention Fund",
    color: "#FF6B6B",
    icon: "👶",
    order: 2,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-6.svg",
    hasBackground: false,
  },
  {
    name: "CSPW",
    slug: "cspw",
    description: "Climate Smart Practices for Women",
    color: "#4ECDC4",
    icon: "🌱",
    order: 3,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-2.svg",
    hasBackground: false,
  },
  {
    name: "Events",
    slug: "events",
    description: "Events and campaigns organized by TAMRA",
    color: "#45B7D1",
    icon: "🎉",
    order: 4,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-1.svg",
    hasBackground: false,
    gap: "gap-[15px]",
  },
  {
    name: "Exhibition",
    slug: "exhibition",
    description: "Exhibitions and showcases of TAMRA's work",
    color: "#96CEB4",
    icon: "🎨",
    order: 5,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-9.svg",
    hasBackground: false,
  },
  {
    name: "GESI",
    slug: "gesi",
    description: "Gender Equality and Social Inclusion",
    color: "#FFEAA7",
    icon: "⚖️",
    order: 6,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-4.svg",
    hasBackground: false,
  },
  {
    name: "SRHR",
    slug: "srhr",
    description: "Sexual and Reproductive Health Rights",
    color: "#DDA0DD",
    icon: "💚",
    order: 7,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-8.svg",
    hasBackground: false,
  },
  {
    name: "Meetings",
    slug: "meetings",
    description: "General Assembly meetings and organizational activities",
    color: "#98D8C8",
    icon: "🤝",
    order: 8,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-5.svg",
    hasBackground: false,
  },
  {
    name: "Training",
    slug: "training",
    description: "Training programs and capacity building activities",
    color: "#F7DC6F",
    icon: "🎓",
    order: 9,
    isActive: true,
    featuredImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120.svg",
    hasBackground: false,
  },
  {
    name: "Recognition",
    slug: "recognition",
    description: "Awards, recognition, and achievements",
    color: "#BB8FCE",
    icon: "🏆",
    order: 10,
    isActive: true,
    // Recognition has multiple images, not just one featured image
    hasBackground: false,
  },
];

// Gallery items (sub-images for each category)
const galleryItemsData = [
  // CLM - Additional supporting images
  {
    originalName: "CLM Workshop",
    filename: "clm-workshop.jpg",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 75000,
    alt: "CLM workshop session",
    caption: "Community leadership workshop",
    categorySlug: "clm",
  },
  {
    originalName: "CLM Community Meeting",
    filename: "clm-meeting.jpg",
    url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 82000,
    alt: "Community meeting",
    caption: "Community leadership meeting",
    categorySlug: "clm",
  },
  
  // CRPVF - Additional images
  {
    originalName: "CRPVF Children Activities",
    filename: "crpvf-activities.jpg",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 78000,
    alt: "Children's activities",
    caption: "Children's Rights programs",
    categorySlug: "crpvf",
  },
  {
    originalName: "CRPVF Second Image",
    filename: "crpvf-2.svg",
    url: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-3.svg",
    type: "image" as const,
    mimeType: "image/svg+xml",
    size: 45000,
    alt: "CRPVF project image",
    caption: "Children's Rights and Violence Prevention",
    categorySlug: "crpvf",
  },

  // CSPW - Additional images
  {
    originalName: "CSPW Environmental Training",
    filename: "cspw-training.jpg",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 74000,
    alt: "Environmental training",
    caption: "Climate smart practices training",
    categorySlug: "cspw",
  },

  // Events - Additional images
  {
    originalName: "Events Conference",
    filename: "events-conference.jpg",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 68000,
    alt: "Conference event",
    caption: "TAMRA annual conference",
    categorySlug: "events",
  },
  {
    originalName: "Events Campaign",
    filename: "events-campaign.jpg",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 71000,
    alt: "Awareness campaign",
    caption: "Public awareness campaign",
    categorySlug: "events",
  },

  // Exhibition - Additional images
  {
    originalName: "Exhibition Showcase",
    filename: "exhibition-showcase.jpg",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 79000,
    alt: "Exhibition showcase",
    caption: "TAMRA achievements exhibition",
    categorySlug: "exhibition",
  },

  // GESI - Additional images
  {
    originalName: "GESI Workshop",
    filename: "gesi-workshop.jpg",
    url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 73000,
    alt: "Gender equality workshop",
    caption: "Gender equality and social inclusion workshop",
    categorySlug: "gesi",
  },

  // SRHR - No additional images needed (only featured image)

  // Meetings - No additional images needed (only featured image)

  // Training - Additional images
  {
    originalName: "Training Youth Program",
    filename: "training-youth.jpg",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 69000,
    alt: "Youth training",
    caption: "Youth empowerment training",
    categorySlug: "training",
  },
  {
    originalName: "Training Skills Workshop",
    filename: "training-skills.jpg",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 76000,
    alt: "Skills training",
    caption: "Skills development workshop",
    categorySlug: "training",
  },

  // Recognition - The 3 specific images from ImageGallerySection
  {
    originalName: "Recognition Award 1",
    filename: "recognition-1.png",
    url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-19.png",
    type: "image" as const,
    mimeType: "image/png",
    size: 50000,
    alt: "Recognition award",
    caption: "Award ceremony",
    categorySlug: "recognition",
    customClass: "w-[314px] ml-[-6.00px] relative h-80",
  },
  {
    originalName: "Recognition Award 2",
    filename: "recognition-2.png",
    url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-20.png",
    type: "image" as const,
    mimeType: "image/png",
    size: 60000,
    alt: "Recognition certificate",
    caption: "Certificate presentation",
    categorySlug: "recognition",
    customClass: "w-[314px] relative h-80",
  },
  {
    originalName: "Recognition Award 3",
    filename: "recognition-3.png",
    url: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-21.png",
    type: "image" as const,
    mimeType: "image/png",
    size: 120000,
    alt: "Recognition group photo",
    caption: "Group photo with award",
    categorySlug: "recognition",
    customClass: "w-[703px] mr-[-6.00px] rounded-[31px] object-cover relative h-80",
  },
];

async function seedGalleryComplete() {
  let client: MongoClient | null = null;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const categoriesCollection = db.collection('gallerycategories');
    const galleryCollection = db.collection('galleries');
    const usersCollection = db.collection('users');

    // Get admin user
    const adminUser = await usersCollection.findOne({ role: 'admin' });
    if (!adminUser) {
      throw new Error('No admin user found. Please seed users first.');
    }

    // Clear existing data
    console.log('🗑️  Clearing existing gallery data...');
    await categoriesCollection.deleteMany({});
    await galleryCollection.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed categories
    console.log('\n📂 Seeding gallery categories...');
    const categoriesWithTimestamps = categoriesData.map(category => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const categoryResult = await categoriesCollection.insertMany(categoriesWithTimestamps);
    console.log(`✅ Successfully seeded ${categoryResult.insertedCount} categories`);

    // Create category mapping
    const categoryMap = new Map<string, ObjectId>();
    for (const [index, category] of categoriesData.entries()) {
      const insertedId = Object.values(categoryResult.insertedIds)[index] as ObjectId;
      categoryMap.set(category.slug, insertedId);
    }

    // Seed gallery items
    console.log('\n🖼️  Seeding gallery items...');
    const galleryWithRefs = galleryItemsData.map(item => {
      const categoryId = categoryMap.get(item.categorySlug);
      if (!categoryId) {
        throw new Error(`Category not found for slug: ${item.categorySlug}`);
      }

      const { categorySlug, customClass, ...itemData } = item;
      
      return {
        ...itemData,
        category: categoryId,
        uploadedBy: adminUser._id,
        ...(customClass && { customClass }), // Add customClass if it exists
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const galleryResult = await galleryCollection.insertMany(galleryWithRefs);
    console.log(`✅ Successfully seeded ${galleryResult.insertedCount} gallery items`);

    // Display summary
    console.log('\n📊 Gallery Seeding Summary:');
    console.log('═'.repeat(80));
    console.log('\n🎨 Categories with Featured Images:');
    console.log('─'.repeat(80));
    
    categoriesData.forEach((category, index) => {
      const itemCount = galleryItemsData.filter(item => item.categorySlug === category.slug).length;
      console.log(`${index + 1}. ${category.icon} ${category.name}`);
      console.log(`   Featured Image: ${category.featuredImage ? '✓' : '✗'}`);
      console.log(`   Additional Images: ${itemCount}`);
      console.log(`   Background: ${category.hasBackground ? 'Yes' : 'No'}`);
      if (category.gap) {
        console.log(`   Custom Gap: ${category.gap}`);
      }
      console.log('');
    });

    console.log('─'.repeat(80));
    console.log(`Total Categories: ${categoryResult.insertedCount}`);
    console.log(`Total Gallery Items: ${galleryResult.insertedCount}`);
    console.log('═'.repeat(80));

    console.log('\n✨ Gallery seeding completed successfully!');
    console.log('\n🎯 Structure matches ImageGallerySection.tsx perfectly!');
    console.log('   • Each category has a featured image');
    console.log('   • CLM has background overlay');
    console.log('   • Recognition has 3 horizontal images');
    console.log('   • Additional images support each category');

  } catch (error) {
    console.error('❌ Error seeding gallery:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

// Run the seed function
seedGalleryComplete();
