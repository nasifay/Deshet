import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

// Sample news data based on current hardcoded content
const newsData = [
  {
    title: "TSD NEW YEAR'S PROGRAM",
    slug: "tsd-new-years-program",
    excerpt: "Tamra NGO joyfully celebrated the Ethiopian New Year together with community members, partners, and staff.",
    content: `<p>Tamra NGO joyfully celebrated the Ethiopian New Year together with community members, partners, and staff. The event highlighted our shared achievements over the past year and reaffirmed our commitment to empowering communities through education, health, and social development programs. As we step into the new year, we renew our vision of building a brighter future for all.</p>

<p>The celebration was filled with cultural music, traditional dishes, and words of encouragement from beneficiaries whose lives have been transformed through our initiatives. It was also a moment of gratitude, as we thanked our supporters and stakeholders for standing with us.</p>

<p>Looking forward, Tamra NGO aims to expand its impact, reaching more vulnerable communities and creating sustainable solutions for lasting change.</p>`,
    featuredImage: "/news-and-events/1.png",
    category: "Events",
    tags: ["community", "celebration", "new-year"],
    status: "published",
    isFeatured: true,
    views: 0,
    publishedAt: new Date("2024-09-11"),
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    slug: "tsd-launches-youth-leadership-training-hawassa",
    excerpt: "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa aimed at empowering young leaders in the community.",
    content: `<p>Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa aimed at empowering young leaders in the community. The training program focuses on developing leadership skills, community engagement, and social entrepreneurship among youth.</p>

<p>Participants will engage in interactive workshops, team-building activities, and mentorship sessions with experienced community leaders. The program is designed to equip young people with the tools and confidence they need to become change-makers in their communities.</p>

<p>This initiative is part of TSD's ongoing commitment to investing in the next generation of leaders who will drive sustainable development and social change in Ethiopia.</p>`,
    featuredImage: "/news-and-events/2.png",
    category: "News",
    tags: ["youth", "leadership", "training", "hawassa"],
    status: "published",
    isFeatured: true,
    views: 0,
    publishedAt: new Date("2024-08-15"),
  },
  {
    title: "Community Health Initiative Reaches 500 Families",
    slug: "community-health-initiative-reaches-500-families",
    excerpt: "Our comprehensive community health program has successfully reached over 500 families, providing essential healthcare services and education.",
    content: `<p>Our comprehensive community health program has successfully reached over 500 families across multiple regions, providing essential healthcare services and health education. The initiative includes regular health screenings, vaccination drives, and health awareness workshops.</p>

<p>Through partnerships with local healthcare providers, we've been able to establish mobile health clinics that visit remote communities, ensuring that even the most underserved populations have access to basic healthcare services.</p>

<p>The program has shown remarkable results, with significant improvements in community health indicators and increased awareness of preventive healthcare measures among beneficiaries.</p>`,
    featuredImage: "/news-and-events/3.png",
    category: "Success Stories",
    tags: ["health", "community", "impact"],
    status: "published",
    isFeatured: false,
    views: 0,
    publishedAt: new Date("2024-07-20"),
  },
  {
    title: "Women's Empowerment Workshop Series Concludes Successfully",
    slug: "womens-empowerment-workshop-series-concludes",
    excerpt: "The three-month women's empowerment workshop series concluded with over 150 women gaining new skills in entrepreneurship and financial literacy.",
    content: `<p>The three-month women's empowerment workshop series concluded with remarkable success, having trained over 150 women in entrepreneurship, financial literacy, and small business management. Participants from various communities came together to learn, share experiences, and build networks.</p>

<p>The workshops covered essential topics including business planning, marketing strategies, savings and investment, and accessing credit facilities. Many participants have already started their own small businesses or expanded existing ones using the knowledge and skills gained.</p>

<p>This program demonstrates TSD's commitment to gender equality and economic empowerment, creating pathways for women to achieve financial independence and contribute to their communities' economic development.</p>`,
    featuredImage: "/news-and-events/4.png",
    category: "Success Stories",
    tags: ["women", "empowerment", "entrepreneurship"],
    status: "published",
    isFeatured: false,
    views: 0,
    publishedAt: new Date("2024-06-10"),
  },
  {
    title: "Educational Support Program Helps 200 Students Continue Their Studies",
    slug: "educational-support-program-helps-200-students",
    excerpt: "Through our educational support program, 200 students from vulnerable backgrounds received scholarships and school supplies to continue their education.",
    content: `<p>Through our educational support program, 200 students from vulnerable backgrounds received scholarships and comprehensive school supplies to continue their education. The program addresses the financial barriers that prevent many talented students from accessing quality education.</p>

<p>In addition to financial support, the program includes mentorship, tutoring services, and career guidance to ensure students not only stay in school but thrive academically. Many of these students have shown remarkable improvement in their academic performance.</p>

<p>We believe that education is the foundation for breaking the cycle of poverty, and this program is a testament to our commitment to ensuring every child has the opportunity to learn and succeed.</p>`,
    featuredImage: "/images/hero.jpg",
    category: "News",
    tags: ["education", "scholarships", "youth"],
    status: "published",
    isFeatured: false,
    views: 0,
    publishedAt: new Date("2024-05-05"),
  },
  {
    title: "Clean Water Project Benefits 1,000 Households",
    slug: "clean-water-project-benefits-1000-households",
    excerpt: "TSD's clean water initiative has successfully installed water points in three villages, providing clean drinking water to over 1,000 households.",
    content: `<p>TSD's clean water initiative has successfully installed multiple water points in three villages, providing clean and safe drinking water to over 1,000 households. This transformative project has dramatically reduced water-borne diseases and improved the quality of life for entire communities.</p>

<p>Previously, community members, particularly women and children, had to walk several kilometers daily to fetch water from unsafe sources. Now, with accessible clean water points, they can dedicate this time to education, income-generating activities, and family care.</p>

<p>The project also includes water management training for community members, ensuring the sustainability of these water systems for years to come.</p>`,
    featuredImage: "/images/mission-1.jpg",
    category: "News",
    tags: ["water", "infrastructure", "community"],
    status: "published",
    isFeatured: false,
    views: 0,
    publishedAt: new Date("2024-04-12"),
  },
  {
    title: "Partnership Announcement: Collaboration with Local NGOs",
    slug: "partnership-announcement-collaboration-local-ngos",
    excerpt: "TSD announces strategic partnerships with five local NGOs to expand the reach and impact of community development programs.",
    content: `<p>TSD is pleased to announce strategic partnerships with five local NGOs to expand the reach and impact of our community development programs. These collaborations will enable us to leverage shared resources, expertise, and networks to serve more communities more effectively.</p>

<p>The partnerships focus on key areas including education, healthcare, economic empowerment, and environmental sustainability. By working together, we can avoid duplication of efforts and create more comprehensive solutions to complex social challenges.</p>

<p>This collaborative approach reflects our belief that sustainable development requires coordinated action from multiple stakeholders working towards common goals.</p>`,
    featuredImage: "/images/mission-2.jpg",
    category: "Announcements",
    tags: ["partnership", "collaboration", "impact"],
    status: "published",
    isFeatured: false,
    views: 0,
    publishedAt: new Date("2024-03-28"),
  },
  {
    title: "Agricultural Training Program Boosts Farmers' Income by 40%",
    slug: "agricultural-training-program-boosts-farmers-income",
    excerpt: "Farmers who participated in TSD's agricultural training program reported an average income increase of 40% through improved farming techniques.",
    content: `<p>Farmers who participated in TSD's comprehensive agricultural training program have reported an average income increase of 40% through the adoption of improved farming techniques and modern agricultural practices. The program provided training in crop rotation, soil conservation, pest management, and post-harvest handling.</p>

<p>In addition to technical training, farmers received support in forming cooperatives, accessing markets, and connecting with agricultural input suppliers. This holistic approach has not only improved yields but also strengthened farmers' bargaining power in the market.</p>

<p>The success of this program demonstrates the potential of sustainable agriculture to transform livelihoods and contribute to food security in rural communities.</p>`,
    featuredImage: "/images/mission-3.jpg",
    category: "Success Stories",
    tags: ["agriculture", "training", "income", "farmers"],
    status: "published",
    isFeatured: false,
    views: 0,
    publishedAt: new Date("2024-02-14"),
  },
];

async function seedNews() {
  let client: MongoClient | null = null;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    
    // First, check if there's a default admin user to use as author
    const usersCollection = db.collection('users');
    let adminUser = await usersCollection.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('⚠️ No admin user found. Creating a default admin user...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const result = await usersCollection.insertOne({
        name: 'Admin',
        email: 'admin@tamra.org',
        password: hashedPassword,
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      adminUser = await usersCollection.findOne({ _id: result.insertedId });
      console.log('✅ Created default admin user');
    }

    const authorId = adminUser!._id;

    // Add author to each news item
    const newsWithAuthor = newsData.map(news => ({
      ...news,
      author: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Check if news already exist
    const newsCollection = db.collection('newsposts');
    const existingCount = await newsCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️ Found ${existingCount} existing news posts.`);
      console.log('🗑️ Clearing existing news posts...');
      await newsCollection.deleteMany({});
      console.log('✅ Cleared existing news posts');
    }

    // Insert news posts
    console.log('📰 Seeding news posts...');
    const result = await newsCollection.insertMany(newsWithAuthor);
    console.log(`✅ Successfully seeded ${result.insertedCount} news posts`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log('─'.repeat(50));
    console.log(`Total news posts: ${result.insertedCount}`);
    console.log(`Published posts: ${newsWithAuthor.filter(n => n.status === 'published').length}`);
    console.log(`Featured posts: ${newsWithAuthor.filter(n => n.isFeatured).length}`);
    console.log('─'.repeat(50));
    
    console.log('\n✨ News seeding completed successfully!');
    console.log('\n📝 Sample news posts:');
    newsWithAuthor.slice(0, 3).forEach((news, idx) => {
      console.log(`${idx + 1}. ${news.title}`);
      console.log(`   Slug: ${news.slug}`);
      console.log(`   Category: ${news.category}`);
      console.log(`   Featured: ${news.isFeatured ? 'Yes' : 'No'}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the seed function
seedNews();






