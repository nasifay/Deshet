"use client";

import HeroSection from "~/components/sections/hero-section";
import AboutSection from "~/components/sections/about-section";
import ServicesSection from "~/components/sections/services-section";
import StatisticsSection from "~/components/sections/statistics-section";
import AchievementsSection from "~/components/sections/achievements-section";
import BlogSection from "~/components/sections/blog-section";
import PartnersCertificationsSection from "~/components/sections/partners-certifications-section";
import TestimonialsSection from "~/components/sections/TestimonialSection";

/**
 * Landing Page Component
 * 
 * This page displays the public-facing landing page at http://localhost:3000/
 * 
 * Data Source:
 * - Each section component fetches data from /api/public/landing
 * - The landing page data is managed in the admin panel at /admin/landing
 * - Changes made in the admin panel are saved to the database and reflected here
 * 
 * Connection:
 * - Admin Editor: http://localhost:3000/admin/landing
 * - Public Page: http://localhost:3000/
 * - API Endpoint: /api/public/landing (reads from Page model with slug "landing")
 * 
 * Each section component fetches its own data independently
 * This improves separation of concerns and component independence
 */
export default function Home() {
  return (
    <div className="flex  w-full relative flex-col mx-auto items-center gap-y-2 md:gap-y-8 lg:gap-y-12">
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <ServicesSection />
      <PartnersCertificationsSection />
      <AchievementsSection />
      <BlogSection />
      <TestimonialsSection />
    </div>
  );
}
