# SEO Implementation Guide - Tamra for Social Development

## 📋 Overview

This document provides a comprehensive guide to the SEO metadata system implemented across your Next.js application. The system includes static and dynamic metadata, structured data (JSON-LD), sitemaps, and robots.txt configuration.

---

## 🚀 Quick Start

### 1. Environment Configuration

Add the following to your `.env.local` file:

```env
# Required: Your production URL
NEXT_PUBLIC_BASE_URL=https://tamra-sdt.org

# Optional: Google Site Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

### 2. Verify Implementation

All pages now have:

- ✅ SEO-optimized titles (under 60 characters)
- ✅ Meta descriptions (under 160 characters)
- ✅ Relevant keywords
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ JSON-LD structured data
- ✅ Breadcrumb navigation

---

## 📁 File Structure

```
lib/seo/
├── metadata-config.ts      # Static page metadata configurations
├── metadata-helpers.ts     # Helper functions for dynamic routes
└── json-ld.ts             # JSON-LD structured data generators

app/
├── layout.tsx             # Root layout with organization schema
├── sitemap.ts             # Dynamic sitemap generator
├── robots.ts              # Robots.txt configuration
└── (user-side)/
    ├── (landing)/layout.tsx
    ├── who-we-are/layout.tsx
    ├── programs/layout.tsx
    ├── news/
    │   ├── layout.tsx
    │   └── [id]/layout.tsx  # Dynamic metadata for articles
    ├── gallery/layout.tsx
    ├── history/layout.tsx
    ├── volunteer/layout.tsx
    ├── donate/layout.tsx
    └── contact-us/layout.tsx
```

---

## 🎯 Implemented Features

### 1. Static Page Metadata

Every static page has optimized metadata defined in `lib/seo/metadata-config.ts`:

- **Home** (`/`)
- **Who We Are** (`/who-we-are`)
- **Programs** (`/programs`)
- **News & Events** (`/news`)
- **Gallery** (`/gallery`)
- **History** (`/history`)
- **Volunteer** (`/volunteer`)
- **Donate** (`/donate`)
- **Contact Us** (`/contact-us`)

### 2. Dynamic Route Metadata

#### News Articles (`/news/[slug]`)

Dynamic metadata is generated using `generateMetadata()` in `app/(user-side)/news/[id]/layout.tsx`:

- Fetches article data from API
- Generates unique title, description, and keywords
- Creates article-specific Open Graph and Twitter cards
- Includes JSON-LD Article schema
- Adds breadcrumb navigation

**Example:**

```typescript
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const news = await fetchNewsData(params.id);

  return generateNewsMetadata({
    title: news.title,
    excerpt: news.excerpt,
    featuredImage: news.featuredImage,
    slug: news.slug,
    // ... more fields
  });
}
```

### 3. JSON-LD Structured Data

All pages include appropriate JSON-LD schemas for better search engine understanding:

#### Organization Schema (Root Layout)

```json
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Tamra for Social Development",
  "url": "https://tamra-sdt.org",
  ...
}
```

#### Article Schema (News Details)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "datePublished": "2025-01-01",
  ...
}
```

#### WebPage Schema (Static Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Name",
  ...
}
```

#### Breadcrumb Schema (All Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### 4. Sitemap

**Location:** `app/sitemap.ts`

- Auto-generates XML sitemap at `/sitemap.xml`
- Includes all static routes
- Dynamically fetches and includes news articles
- Sets appropriate change frequencies and priorities
- Automatically updates when content changes

### 5. Robots.txt

**Location:** `app/robots.ts`

- Accessible at `/robots.txt`
- Allows all crawlers on public pages
- Blocks admin and API routes
- References sitemap location

---

## 🔧 Customization Guide

### Update Organization Information

Edit `lib/seo/metadata-config.ts`:

```typescript
export const ORGANIZATION = {
  name: "Tamra for Social Development",
  shortName: "TSD",
  email: "hello@tsd.com",
  phone: "+251 911 121314",
  // Update with your actual details
};
```

### Update Social Media Links

```typescript
socialMedia: {
  facebook: "https://facebook.com/tamra-sdt",
  twitter: "https://twitter.com/tamra_sdt",
  linkedin: "https://linkedin.com/company/tamra-sdt",
  instagram: "https://instagram.com/tamra_sdt",
},
```

### Modify Page Metadata

To change metadata for any static page:

1. Open `lib/seo/metadata-config.ts`
2. Find the page in `PAGE_METADATA` object
3. Update title, description, keywords, etc.

**Example:**

```typescript
export const PAGE_METADATA: Record<string, Metadata> = {
  programs: {
    title: "Your Custom Title | TSD",
    description: "Your custom description...",
    keywords: ["custom", "keywords"],
    // ...
  },
};
```

### Add New Pages

1. Create a `layout.tsx` in the page directory
2. Import metadata utilities
3. Export metadata and add JSON-LD schemas

**Template:**

```typescript
import { Metadata } from "next";
import { BASE_URL } from "~/lib/seo/metadata-config";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Your Page Title | TSD",
  description: "Your page description",
  // ... more metadata
};

export default function YourPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = generateWebPageSchema({
    name: "Your Page",
    description: "Description",
    url: `${BASE_URL}/your-page`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Your Page", url: `${BASE_URL}/your-page` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
```

---

## 🧪 Testing & Validation

### 1. Test Metadata

Use these tools to validate your SEO implementation:

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Schema Markup Validator**: https://validator.schema.org/

### 2. Check Sitemap

Visit: `https://yourdomain.com/sitemap.xml`

### 3. Verify Robots.txt

Visit: `https://yourdomain.com/robots.txt`

### 4. View Page Source

Right-click on any page → "View Page Source" to verify:

- `<meta>` tags in `<head>`
- JSON-LD scripts before closing `</body>`
- Canonical URLs

---

## 📊 SEO Best Practices Implemented

✅ **Titles:**

- Under 60 characters
- Include brand name (TSD)
- Unique per page
- Keyword-rich

✅ **Meta Descriptions:**

- 150-160 characters
- Compelling and actionable
- Unique per page
- Include target keywords

✅ **Keywords:**

- Relevant to page content
- Mix of general and specific terms
- Include location (Ethiopia)

✅ **Open Graph Tags:**

- Title, description, image for all pages
- Proper image dimensions (1200x630)
- Unique per page

✅ **Structured Data:**

- Organization schema on all pages
- Article schema on blog posts
- Breadcrumb navigation
- Contact page schema

✅ **Technical SEO:**

- Canonical URLs
- Sitemap.xml
- Robots.txt
- Mobile-friendly metadata

---

## 🔍 Keywords Strategy

Each page targets specific keyword themes:

| Page       | Primary Keywords                                     |
| ---------- | ---------------------------------------------------- |
| Home       | NGO Ethiopia, youth empowerment, social development  |
| Programs   | youth programs, peacebuilding, SRHR, climate justice |
| News       | Tamra news, NGO events Ethiopia, community updates   |
| Who We Are | mission vision, leadership team, NGO about           |
| Gallery    | photo gallery, visual stories, community photos      |
| Volunteer  | volunteer Ethiopia, join NGO, make a difference      |
| Donate     | donate Ethiopia, support NGO, charitable giving      |

---

## 🚨 Important Notes

1. **Update BASE_URL**: Change `NEXT_PUBLIC_BASE_URL` in `.env.local` to your production domain
2. **Image Optimization**: Ensure all OG images are 1200x630px for best display
3. **Content Updates**: Metadata is cached - redeploy after significant changes
4. **Google Search Console**: Add your site and submit sitemap
5. **Analytics**: Monitor SEO performance in Google Analytics 4

---

## 📈 Next Steps

### 1. Google Search Console Setup

1. Visit https://search.google.com/search-console
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 2. Social Media Setup

1. Update social media links in `metadata-config.ts`
2. Test sharing with Facebook Debugger
3. Test Twitter Cards

### 3. Monitor Performance

- Track keyword rankings
- Monitor organic traffic in GA4
- Check crawl errors in Search Console
- Update content based on performance

---

## 🆘 Troubleshooting

### Metadata not appearing?

- Clear browser cache
- Check page source to verify tags are present
- Ensure `NEXT_PUBLIC_BASE_URL` is set correctly

### Sitemap not generating?

- Check API endpoint is accessible
- Verify database connection
- Check console for errors during build

### JSON-LD validation errors?

- Use Schema.org validator
- Check for required fields
- Ensure proper date formats (ISO 8601)

### Images not showing in social shares?

- Verify image URLs are absolute (not relative)
- Check image dimensions (1200x630 recommended)
- Test with social media debuggers

---

## 📚 Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)

---

## ✅ Implementation Checklist

- [x] Static metadata for all pages
- [x] Dynamic metadata for news articles
- [x] JSON-LD structured data
- [x] Sitemap generation
- [x] Robots.txt configuration
- [x] Breadcrumb schemas
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [ ] Update BASE_URL in production
- [ ] Add Google verification code
- [ ] Submit sitemap to Search Console
- [ ] Test with validation tools
- [ ] Monitor in Analytics

---

**Need Help?** Refer to this guide or check the Next.js SEO documentation for advanced configurations.
