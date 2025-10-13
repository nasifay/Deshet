import connectDB from '~/lib/db/mongodb';
import Page from '~/lib/db/models/Page';
import User from '~/lib/db/models/User';

async function seedLandingPage() {
  try {
    console.log('🌱 Starting landing page seed...');
    
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Find an admin user to set as author
    let adminUser = await User.findOne({ role: { $in: ['admin', 'superadmin'] } });
    
    if (!adminUser) {
      console.log('⚠️  No admin user found, creating default admin...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@tsd.org',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Created default admin user (email: admin@tsd.org, password: admin123)');
    }

    // Check if landing page already exists
    const existingLanding = await Page.findOne({ slug: 'landing' });
    
    if (existingLanding) {
      console.log('⚠️  Landing page already exists. Updating...');
      await Page.findByIdAndDelete(existingLanding._id);
    }

    // Create landing page with current data
    const landingPageData = {
      title: 'Landing Page',
      slug: 'landing',
      status: 'published',
      author: adminUser._id,
      seo: {
        metaTitle: 'TSD - Serving Ethiopian Youth | Social Development Organization',
        metaDescription: 'Tamra for Social Development (TSD) is an Ethiopian NGO working in youth empowerment, peacebuilding, SRH & gender equality, and climate justice since 1998.',
        keywords: ['TSD', 'Ethiopia', 'youth empowerment', 'peacebuilding', 'social development', 'NGO', 'Tamra', 'gender equality', 'climate justice'],
      },
      sections: [
        {
          id: 'hero-section-1',
          type: 'HeroSection',
          data: {
            title: 'SERVING ETHIOPIAN YOUTH',
            subtitle: '',
            backgroundImage: '/home-hero.png',
            ctaText: 'Contact Us',
            ctaLink: '/contact-us',
          },
          order: 0,
        },
        {
          id: 'about-section-1',
          type: 'AboutSection',
          data: {
            title: 'ABOUT US',
            description: 'Tamra for social development organization (tsd) is an Ethiopian NGO legally registered since 1998. Founded as an anti-aids club in shashemene, it now operates across Oromia, Sidama, South & Central Ethiopia, and Addis Ababa. TSD works in youth empowerment, peacebuilding, SRH & gender equality, and climate justice & livelihoods. With 25+ years of impact, we drive change through grassroots engagement, advocacy, and community-driven solutions.',
            ctaText: 'Read More',
            ctaLink: '/who-we-are',
            images: [
              '/images/about/1.png',
              '/images/about/2.png',
              '/images/about/3.png',
              '/images/about/4.png',
            ],
          },
          order: 1,
        },
        {
          id: 'statistics-section-1',
          type: 'StatisticsSection',
          data: {
            stats: [
              { number: '58', label: 'Staffs' },
              { number: '5', label: 'Offices in 4 Regions' },
              { number: '250+', label: 'Volunteers' },
              { number: '15', label: 'Protocols' },
            ],
          },
          order: 2,
        },
        {
          id: 'program-areas-section-1',
          type: 'ProgramAreasSection',
          data: {
            title: 'Program Areas',
            description: 'Explore our key program areas focused on empowering Ethiopian youth and communities.',
          },
          order: 3,
        },
        {
          id: 'supporters-section-1',
          type: 'SupportersSection',
          data: {
            title: 'Our Partners',
            supporters: [
              '/suporters/usaid.png',
              '/suporters/pepfar.png',
              '/suporters/gac.png',
              '/suporters/ipas.png',
              '/suporters/norwegian-church.png',
              '/suporters/sonke-gender-justice.png',
              '/suporters/build-up.png',
              '/suporters/children-rights.png',
              '/suporters/search-for-common-ground.png',
              '/suporters/youth-network.png',
              '/suporters/zeleman.png',
            ],
          },
          order: 4,
        },
        {
          id: 'achievements-section-1',
          type: 'AchievementsSection',
          data: {
            title: 'Our Achievements',
            achievements: [
              {
                title: '25+ Years of Impact',
                description: 'Over two decades of dedicated service to Ethiopian communities, driving sustainable change and empowerment.',
              },
              {
                title: 'Multi-Regional Presence',
                description: 'Operating across 5 offices in 4 regions of Ethiopia, reaching diverse communities with tailored programs.',
              },
              {
                title: 'Youth-Centered Approach',
                description: 'Empowering thousands of young people through education, skills training, and leadership development.',
              },
              {
                title: 'Community-Driven Solutions',
                description: 'Working hand-in-hand with local communities to create lasting positive change through grassroots engagement.',
              },
              {
                title: 'Strong Partnerships',
                description: 'Collaborating with international organizations and local stakeholders to maximize impact and reach.',
              },
              {
                title: 'Holistic Development',
                description: 'Addressing multiple dimensions of development including health, education, livelihoods, and climate justice.',
              },
            ],
          },
          order: 5,
        },
        {
          id: 'news-events-section-1',
          type: 'NewsEventsSection',
          data: {
            title: 'Latest News & Events',
            showLimit: 3,
          },
          order: 6,
        },
        {
          id: 'volunteer-banner-1',
          type: 'VolunteerBanner',
          data: {
            title: 'Join Our Mission',
            description: 'Become a volunteer and make a difference in your community. Together, we can create lasting change and empower Ethiopian youth.',
            ctaText: 'Volunteer Now',
            ctaLink: '/volunteer',
            backgroundImage: '/images/cta.jpg',
          },
          order: 7,
        },
      ],
      content: '',
      publishedAt: new Date(),
    };

    const landingPage = await Page.create(landingPageData);
    console.log('✅ Landing page created successfully!');
    console.log(`📄 Page ID: ${landingPage._id}`);
    console.log(`🔗 Slug: ${landingPage.slug}`);
    console.log(`📊 Sections: ${landingPage.sections?.length || 0}`);
    console.log(`👤 Author: ${adminUser.name} (${adminUser.email})`);
    
    console.log('\n✨ Seed completed successfully!');
    console.log('\n📝 You can now edit the landing page at: /admin/landing');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding landing page:', error);
    process.exit(1);
  }
}

// Run the seed function
seedLandingPage();





