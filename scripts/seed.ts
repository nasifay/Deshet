/**
 * Database Seed Script
 *
 * This script populates the MongoDB database with:
 * - Default admin user
 * - Site settings (statistics, achievements, core values, leadership, etc.)
 * - Programs from the existing static data
 *
 * Run with: npx tsx scripts/seed.ts
 */

import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local first, then .env
dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

import mongoose from "mongoose";
import { hashPassword } from "../lib/auth/password";
import {
  coreValues,
  leadershipTeam,
  targetGroups,
  operationRegions,
} from "../lib/data/who-we-are-data";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@deshetmed.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123456";

async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Connect directly with mongoose
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("✅ MongoDB Connected\n");

    // Import models after connection is established
    const User = (await import("../lib/db/models/User")).default;
    const Program = (await import("../lib/db/models/Program")).default;
    const SiteSettings = (await import("../lib/db/models/SiteSettings"))
      .default;
    const Page = (await import("../lib/db/models/Page")).default;

    // 1. Create default admin user
    console.log("1. Creating admin user...");
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    let adminUser;
    if (existingAdmin) {
      console.log("   ✅ Admin user already exists");
      adminUser = existingAdmin;
    } else {
      const hashedPassword = await hashPassword(ADMIN_PASSWORD);
      adminUser = await User.create({
        name: "Admin User",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "superadmin",
        isActive: true,
      });
      console.log("   ✅ Admin user created");
      console.log(`   📧 Email: ${ADMIN_EMAIL}`);
      console.log(`   🔑 Password: ${ADMIN_PASSWORD}`);
    }

    // 2. Seed Site Settings
    console.log("\n2. Seeding site settings...");
    const existingSettings = await SiteSettings.findOne();

    if (existingSettings) {
      console.log("   ✅ Site settings already exist");
    } else {
      await SiteSettings.create({
        stats: {
          staffCount: "58",
          officesCount: "5",
          regionsCount: "4",
          volunteersCount: "250+",
          protocolsCount: "15",
        },
        achievements: {
          recognitionsCount: "120+",
          radioYears: "11+",
          serviceYears: "28",
          activeRegions: "4",
        },
        coreValues: coreValues,
        leadership: leadershipTeam,
        targetGroups: targetGroups,
        operationRegions: operationRegions,
        supporters: [
          { name: "USAID", logo: "/suporters/usaid.png" },
          { name: "PEPFAR", logo: "/suporters/pepfar.png" },
          {
            name: "Norwegian Church Aid",
            logo: "/suporters/norwegian-church.png",
          },
          { name: "GAC", logo: "/suporters/gac.png" },
          { name: "IPAS", logo: "/suporters/ipas.png" },
          { name: "Build Up", logo: "/suporters/build-up.png" },
          { name: "Children Rights", logo: "/suporters/children-rights.png" },
          {
            name: "Sonke Gender Justice",
            logo: "/suporters/sonke-gender-justice.png",
          },
          {
            name: "Search for Common Ground",
            logo: "/suporters/search-for-common-ground.png",
          },
          { name: "Youth Network", logo: "/suporters/youth-network.png" },
          { name: "Zeleman", logo: "/suporters/zeleman.png" },
        ],
      });
      console.log("   ✅ Site settings created");
    }

    // 3. Seed Programs
    console.log("\n3. Seeding programs...");
    const existingPrograms = await Program.countDocuments();

    if (existingPrograms > 0) {
      console.log("   ✅ Programs already exist");
    } else {
      const programs = [
        {
          title: "Youth Challenge Initiative (YCI)",
          slug: "youth-challenge-initiative",
          categoryId: "youth-empowerment",
          categoryLabel: "Youth Empowerment & Peacebuilding",
          description:
            "The project focuses on increasing Sexual and Reproductive Health (SRH) awareness among youth, improving their health-seeking behavior, and enhancing access to youth-friendly SRH services. It also aims to build the entrepreneurship skills of young people and implement a sustainable business model for producing and distributing reusable sanitary pads.",
          image:
            "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
          thumbnails: [
            {
              id: 1,
              src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop",
            },
            {
              id: 2,
              src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
            },
            {
              id: 3,
              src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop",
            },
            {
              id: 4,
              src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            },
          ],
          status: "published",
          order: 1,
          publishedAt: new Date(),
        },
        {
          title: "PEACE (NORAD)",
          slug: "peace-norad",
          categoryId: "youth-empowerment",
          categoryLabel: "Youth Empowerment & Peacebuilding",
          description:
            "Peacebuilding and conflict resolution program funded by NORAD, focusing on youth engagement and community dialogue.",
          image:
            "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
          thumbnails: [
            {
              id: 1,
              src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop",
            },
            {
              id: 2,
              src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
            },
          ],
          status: "published",
          order: 2,
          publishedAt: new Date(),
        },
        {
          title: "SRH & Gender Equality Program",
          slug: "srh-gender-equality",
          categoryId: "srh-gender",
          categoryLabel: "SRH & Gender Development",
          description:
            "Comprehensive Sexual and Reproductive Health and Gender Development program promoting equality and health awareness.",
          image:
            "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
          thumbnails: [
            {
              id: 1,
              src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop",
            },
            {
              id: 2,
              src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
            },
          ],
          status: "published",
          order: 1,
          publishedAt: new Date(),
        },
        {
          title: "Climate Justice & Livelihoods",
          slug: "climate-justice-livelihoods",
          categoryId: "climate-justice",
          categoryLabel: "Climate Justice & Livelihoods",
          description:
            "Environmental sustainability and livelihood development program addressing climate change impacts on communities.",
          image:
            "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
          thumbnails: [
            {
              id: 1,
              src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop",
            },
            {
              id: 2,
              src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
            },
          ],
          status: "published",
          order: 1,
          publishedAt: new Date(),
        },
      ];

      await Program.insertMany(programs);
      console.log(`   ✅ Created ${programs.length} programs`);
    }

    // 4. Seed existing website pages
    console.log("\n4. Seeding existing website pages...");
    const existingPagesCount = await Page.countDocuments();

    if (existingPagesCount > 0) {
      console.log("   ✅ Pages already exist");

      // Update "Who We Are" page with sections
      console.log('   📝 Updating "Who We Are" page with sections...');
      const whoWeArePage = await Page.findOne({ slug: "who-we-are" });
      if (whoWeArePage) {
        whoWeArePage.sections = [
          {
            type: "AboutUsHeader",
            data: {},
            order: 0,
          },
          {
            type: "TaglineSection",
            data: {
              tagline:
                "Working hand in hand with communities for a brighter future.",
            },
            order: 1,
          },
          {
            type: "GroupPhotoSection",
            data: {
              imageSrc:
                "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-921.svg",
              altText:
                "TSD Team - Working hand in hand with communities for a brighter future",
            },
            order: 2,
          },
          {
            type: "AboutTSDSection",
            data: {
              description:
                "Tamra for Social Development Organization (TSD) is an Ethiopian civil society organization founded in 1998 by ten visionary youths as an Anti-AIDS club at Shashemene High School. It was re-registered as a local CSO by the Authority for Civil Society Organizations (ACSO) on June 7, 2019, with registration No. 0184. TSD focuses on Youth Empowerment, Peacebuilding, Sexual and Reproductive health, Gender Development, and Climate justice. Operating across Addis Ababa, Oromia, Sidama, South Ethiopia, and Central Ethiopia regions, it coordinates efforts through regional offices in Shashemene and Wolayita Sodo, as well as project coordination offices in towns like Hawassa.",
              backImageSrc:
                "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-929.png",
              frontImageSrc:
                "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-930.png",
            },
            order: 3,
          },
          {
            type: "VisionMissionSection",
            data: {
              visionImage: "/images/Mask group.png",
              visionText:
                "TSD envisioned a developed Ethiopia with empowered youth and women.",
              missionImage: "/images/Mask group (1).png",
              missionText:
                "TSD Strives To Realize The Human Right Of Youth And Women Through Evidence-Based Advocacy And Empowerment Works.",
            },
            order: 4,
          },
          {
            type: "CoreValuesSection",
            data: {},
            order: 5,
          },
          {
            type: "LeadershipSection",
            data: {},
            order: 6,
          },
          {
            type: "TargetGroupSection",
            data: {
              headerImage:
                "https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png",
            },
            order: 7,
          },
          {
            type: "OperationRegionsSection",
            data: {
              mapImageSrc: "/images/Objects.png",
              mapLayerSrc:
                "https://c.animaapp.com/mgclt9blEcJSeI/img/layer-1.png",
            },
            order: 8,
          },
        ] as any;
        await whoWeArePage.save();
        console.log('   ✅ Updated "Who We Are" page with sections');
      }
    } else {
      const pageData = [
        {
          title: "Who We Are - About TSD",
          slug: "who-we-are",
          content: `
            <h1>About TSD</h1>
            <p>Tamra for Social Development Organization (TSD) is an Ethiopian civil society organization founded in 1998 by ten visionary youths as an Anti-AIDS club at Shashemene High School. It was re-registered as a local CSO by the Authority for Civil Society Organizations (ACSO) on June 7, 2019, with registration No. 0184.</p>
          `,
          status: "published",
          author: adminUser._id,
          sections: [
            {
              type: "AboutUsHeader",
              data: {},
              order: 0,
            },
            {
              type: "TaglineSection",
              data: {
                tagline:
                  "Working hand in hand with communities for a brighter future.",
              },
              order: 1,
            },
            {
              type: "GroupPhotoSection",
              data: {
                imageSrc:
                  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-921.svg",
                altText:
                  "TSD Team - Working hand in hand with communities for a brighter future",
              },
              order: 2,
            },
            {
              type: "AboutTSDSection",
              data: {
                description:
                  "Tamra for Social Development Organization (TSD) is an Ethiopian civil society organization founded in 1998 by ten visionary youths as an Anti-AIDS club at Shashemene High School. It was re-registered as a local CSO by the Authority for Civil Society Organizations (ACSO) on June 7, 2019, with registration No. 0184. TSD focuses on Youth Empowerment, Peacebuilding, Sexual and Reproductive health, Gender Development, and Climate justice. Operating across Addis Ababa, Oromia, Sidama, South Ethiopia, and Central Ethiopia regions, it coordinates efforts through regional offices in Shashemene and Wolayita Sodo, as well as project coordination offices in towns like Hawassa.",
                backImageSrc:
                  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-929.png",
                frontImageSrc:
                  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-930.png",
              },
              order: 3,
            },
            {
              type: "VisionMissionSection",
              data: {
                visionImage: "/images/Mask group.png",
                visionText:
                  "TSD envisioned a developed Ethiopia with empowered youth and women.",
                missionImage: "/images/Mask group (1).png",
                missionText:
                  "TSD Strives To Realize The Human Right Of Youth And Women Through Evidence-Based Advocacy And Empowerment Works.",
              },
              order: 4,
            },
            {
              type: "CoreValuesSection",
              data: {},
              order: 5,
            },
            {
              type: "LeadershipSection",
              data: {},
              order: 6,
            },
            {
              type: "TargetGroupSection",
              data: {
                headerImage:
                  "https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png",
              },
              order: 7,
            },
            {
              type: "OperationRegionsSection",
              data: {
                mapImageSrc: "/images/Objects.png",
                mapLayerSrc:
                  "https://c.animaapp.com/mgclt9blEcJSeI/img/layer-1.png",
              },
              order: 8,
            },
          ],
          seo: {
            metaTitle: "Who We Are - About TSD | Tamra Social Development",
            metaDescription:
              "Learn about TSD, an Ethiopian civil society organization focused on youth empowerment, peacebuilding, SRH, gender development, and climate justice since 1998.",
            keywords: [
              "TSD",
              "about",
              "youth empowerment",
              "peacebuilding",
              "Ethiopia",
              "civil society",
            ],
          },
        },
        {
          title: "Contact Us",
          slug: "contact-us",
          content: `
            <h1>CONTACT US</h1>
            <p>Get in touch and be part of our journey of transformation.</p>
            
            <h2>Let's Explore how we can work together for a better future</h2>
            <p>Together, we can turn challenges into opportunities, let's talk.</p>
            
            <h3>Contact Information</h3>
            <ul>
              <li><strong>Phone:</strong> +251 911 121314</li>
              <li><strong>Email:</strong> hello@tsd.com</li>
            </ul>
            
            <h3>Location</h3>
            <p>Addis Ababa, Ethiopia</p>
            
            <h3>Send us a Message</h3>
            <p>Use our contact form to reach out to us directly. We'll get back to you as soon as possible.</p>
          `,
          status: "published",
          author: adminUser._id,
          seo: {
            metaTitle: "Contact Us - TSD | Get in Touch",
            metaDescription:
              "Contact Tamra Social Development Organization. Phone: +251 911 121314, Email: hello@tsd.com. Located in Addis Ababa, Ethiopia.",
            keywords: [
              "contact",
              "TSD",
              "phone",
              "email",
              "Addis Ababa",
              "Ethiopia",
            ],
          },
        },
        {
          title: "Donate",
          slug: "donate",
          content: `
            <h1>DONATE</h1>
            
            <h2>Your Support Creates Lasting Change</h2>
            <p>Empowering Youth, Uplifting Women, Protecting The Vulnerable, And Strengthening Leaders. Your Donation Makes It Possible.</p>
            
            <h2>BANK OPTIONS</h2>
            
            <h3>Commercial Bank Of Ethiopia</h3>
            <ul>
              <li><strong>Account Number:</strong> 1000102030405</li>
              <li><strong>Swift Code:</strong> CBETETAA</li>
              <li><strong>Account Name:</strong> Tamra For Social Development Organization</li>
            </ul>
            
            <h3>Tele Birr</h3>
            <ul>
              <li><strong>Number:</strong> +251 91111111</li>
              <li><strong>ID:</strong> 1122334455</li>
            </ul>
            
            <h3>Bank Of Abyssinia</h3>
            <ul>
              <li><strong>Account Number:</strong> 1000102030405</li>
              <li><strong>Swift Code:</strong> ABYSETAAXXX</li>
              <li><strong>Account Name:</strong> Tamra For Social Development Organization</li>
            </ul>
            
            <h3>Awash Bank</h3>
            <ul>
              <li><strong>Account Number:</strong> 1000102030405</li>
              <li><strong>Swift Code:</strong> AWINETAAXXX</li>
              <li><strong>Account Name:</strong> Tamra For Social Development Organization</li>
            </ul>
          `,
          status: "published",
          author: adminUser._id,
          seo: {
            metaTitle: "Donate to TSD | Support Our Mission",
            metaDescription:
              "Support TSD's mission to empower youth, uplift women, and strengthen communities. Multiple banking options available for donations.",
            keywords: [
              "donate",
              "support",
              "TSD",
              "banking",
              "charity",
              "Ethiopia",
            ],
          },
        },
        {
          title: "Gallery",
          slug: "gallery",
          content: `
            <h1>GALLERY</h1>
            <p>Explore our photo gallery showcasing TSD's work and impact in communities across Ethiopia.</p>
            
            <h2>Our Work in Pictures</h2>
            <p>This gallery captures the essence of our programs, the communities we serve, and the positive changes we're making together.</p>
            
            <h3>Gallery Sections</h3>
            <ul>
              <li>Youth Empowerment Programs</li>
              <li>Community Development Projects</li>
              <li>Leadership Training Sessions</li>
              <li>Climate Justice Initiatives</li>
              <li>Gender Development Workshops</li>
              <li>Team and Partnership Photos</li>
            </ul>
            
            <p>Each image tells a story of transformation, hope, and the power of community-driven development.</p>
          `,
          status: "published",
          author: adminUser._id,
          seo: {
            metaTitle: "Gallery - TSD | Our Work in Pictures",
            metaDescription:
              "Browse TSD's photo gallery showcasing our programs, community impact, and transformative work across Ethiopia.",
            keywords: [
              "gallery",
              "photos",
              "TSD",
              "programs",
              "community",
              "impact",
            ],
          },
        },
        {
          title: "History",
          slug: "history",
          content: `
            <h1>HISTORY</h1>
            <p>Tracing our journey of growth, impact, and commitment to communities across Ethiopia.</p>
            
            <h2>Our Journey</h2>
            <p>Since its establishment, Tamra Social Development has been committed to empowering communities and driving sustainable change across Ethiopia. What began as a small initiative has grown into a trusted organization working in diverse thematic areas, building partnerships, and touching countless lives.</p>
            
            <p>Our history reflects not only the milestones we have achieved but also the resilience, collaboration, and vision that continue to guide us toward a more inclusive and equitable future.</p>
            
            <h2>MILESTONES</h2>
            <p>Throughout our journey, we have achieved significant milestones that have shaped our organization and expanded our impact.</p>
            
            <h2>2025 – TODAY</h2>
            <p>Continuing To Create Inclusive, People-centered, And Accountable Programs Aligned With Tamra's Mission And Vision.</p>
            
            <blockquote>
              <p>"From Our Beginnings To Today, Tamra Social Development Stands Firm In Its Mission, Carrying Forward The Vision Of An Inclusive, Just, And Empowered Society."</p>
            </blockquote>
          `,
          status: "published",
          author: adminUser._id,
          seo: {
            metaTitle: "History - TSD | Our Journey Since 1998",
            metaDescription:
              "Discover TSD's history from its founding in 1998 as an Anti-AIDS club to becoming a leading civil society organization in Ethiopia.",
            keywords: [
              "history",
              "TSD",
              "1998",
              "milestones",
              "journey",
              "Ethiopia",
              "civil society",
            ],
          },
        },
        {
          title: "Join as a Volunteer",
          slug: "volunteer",
          content: `
            <h1>JOIN AS A VOLUNTEER</h1>
            
            <h2>Join A Network Of People Committed To Equality, Empowerment, And Sustainable Change.</h2>
            <p>Become part of our volunteer network and help us create lasting positive change in communities across Ethiopia.</p>
            
            <h3>Why Volunteer with TSD?</h3>
            <ul>
              <li>Make a meaningful impact in your community</li>
              <li>Develop new skills and gain experience</li>
              <li>Join a network of like-minded individuals</li>
              <li>Contribute to sustainable development</li>
              <li>Be part of transformative change</li>
            </ul>
            
            <h3>Volunteer Opportunities</h3>
            <ul>
              <li>Community Outreach Programs</li>
              <li>Youth Mentorship</li>
              <li>Training and Workshop Facilitation</li>
              <li>Administrative Support</li>
              <li>Event Organization</li>
              <li>Translation and Communication</li>
            </ul>
            
            <h3>How to Apply</h3>
            <p>Fill out our volunteer application form below. We'll review your application and get back to you with available opportunities that match your interests and skills.</p>
            
            <p><strong>Required Information:</strong></p>
            <ul>
              <li>Name and Contact Information</li>
              <li>Age and Gender</li>
              <li>Address</li>
              <li>Skills and Interests</li>
              <li>Availability</li>
              <li>Message about why you want to volunteer</li>
            </ul>
          `,
          status: "published",
          author: adminUser._id,
          seo: {
            metaTitle: "Volunteer with TSD | Join Our Mission",
            metaDescription:
              "Join TSD as a volunteer and help create lasting change in communities. Multiple volunteer opportunities available across Ethiopia.",
            keywords: [
              "volunteer",
              "TSD",
              "community",
              "service",
              "opportunities",
              "Ethiopia",
            ],
          },
        },
      ];

      await Page.insertMany(pageData);
      console.log(`   ✅ Created ${pageData.length} pages`);
    }

    console.log("\n✅ Database seeding completed successfully!\n");
    console.log("📝 Summary:");
    console.log(`   - Admin Email: ${ADMIN_EMAIL}`);
    console.log(`   - Admin Password: ${ADMIN_PASSWORD}`);
    console.log(`   - Total Users: ${await User.countDocuments()}`);
    console.log(`   - Total Programs: ${await Program.countDocuments()}`);
    console.log(`   - Total Pages: ${await Page.countDocuments()}`);
    console.log(`   - Site Settings: ${await SiteSettings.countDocuments()}`);
    console.log(
      "\n🚀 You can now login to the admin dashboard at http://localhost:3000/admin/login\n"
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from database");
  }
}

// Run seed function
seed();
