import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

async function migrateGalleryCategories() {
  let client: MongoClient | null = null;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const galleryCollection = db.collection('galleries');
    const categoryCollection = db.collection('gallerycategories');

    // Get all categories and create a mapping from slug to ObjectId
    const categories = await categoryCollection.find({}).toArray();
    const categoryMap = new Map();
    
    categories.forEach(category => {
      categoryMap.set(category.slug, category._id);
      console.log(`📂 Mapped category: ${category.slug} -> ${category._id}`);
    });

    console.log(`\n🗺️  Created category mapping with ${categoryMap.size} categories`);

    // Get all gallery items with string categories
    const galleryItems = await galleryCollection.find({ 
      category: { $type: 'string' } 
    }).toArray();

    console.log(`\n🖼️  Found ${galleryItems.length} gallery items with string categories`);

    if (galleryItems.length === 0) {
      console.log('✅ No migration needed - all items already have ObjectId categories');
      return;
    }

    // Update each gallery item
    let updatedCount = 0;
    let errorCount = 0;

    for (const item of galleryItems) {
      const categorySlug = item.category;
      const categoryId = categoryMap.get(categorySlug);

      if (!categoryId) {
        console.log(`⚠️  Warning: No category found for slug "${categorySlug}" in item ${item._id}`);
        errorCount++;
        continue;
      }

      try {
        await galleryCollection.updateOne(
          { _id: item._id },
          { $set: { category: categoryId } }
        );
        
        console.log(`✅ Updated item "${item.originalName}" from "${categorySlug}" to ObjectId`);
        updatedCount++;
      } catch (error) {
        console.error(`❌ Error updating item ${item._id}:`, error);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log('─'.repeat(50));
    console.log(`✅ Successfully updated: ${updatedCount} items`);
    console.log(`❌ Errors: ${errorCount} items`);
    console.log(`📂 Total categories: ${categoryMap.size}`);
    console.log(`🖼️  Total items processed: ${galleryItems.length}`);
    console.log('─'.repeat(50));

    if (updatedCount > 0) {
      console.log('\n✨ Migration completed successfully!');
      console.log('🎯 Gallery items now have proper ObjectId category references');
    } else {
      console.log('\n⚠️  No items were updated during migration');
    }

  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the migration
migrateGalleryCategories();


