# Frontend Integration Guide

This guide shows how to integrate your frontend pages with the admin dashboard backend.

## 📡 Public API Endpoints

All public endpoints are available at `/api/public/*` and don't require authentication.

### Available Endpoints

```typescript
// News & Events
GET /api/public/news                    // List published news
GET /api/public/news/[slug]             // Get single news by slug

// Programs
GET /api/public/programs                // List published programs (grouped by category)

// Pages
GET /api/public/pages/[slug]            // Get page by slug

// Site Settings
GET /api/public/settings                // Get all site settings (stats, achievements, etc.)
```

---

## 🔄 Integration Examples

### 1. Fetch News & Events

Replace static news data with API calls:

```typescript
// app/(user-side)/news/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  views: number;
  isFeatured: boolean;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/public/news?limit=12');
      const data = await response.json();
      
      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((post) => (
        <div key={post._id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.excerpt}</p>
          <a
            href={`/news/${post.slug}`}
            className="text-primary-green mt-4 inline-block"
          >
            Read more →
          </a>
        </div>
      ))}
    </div>
  );
}
```

### 2. Fetch Single News Post

```typescript
// app/(user-side)/news/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string);
    }
  }, [params.id]);

  const fetchPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/public/news/${slug}`);
      const data = await response.json();
      
      if (data.success) {
        setPost(data.data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
```

### 3. Fetch Programs

```typescript
// app/(user-side)/programs/@programsList/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Program {
  _id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryLabel: string;
  description: string;
  image: string;
  thumbnails: Array<{ id: number; src: string }>;
}

interface ProgramCategory {
  categoryId: string;
  categoryLabel: string;
  programs: Program[];
}

export default function ProgramsPage() {
  const [categories, setCategories] = useState<ProgramCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/public/programs');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.categoryId}>
          <h2 className="text-3xl font-bold mb-6">{category.categoryLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.programs.map((program) => (
              <div key={program._id} className="bg-white rounded-lg shadow p-6">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 4. Fetch Site Settings

```typescript
// app/(landing)/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/public/settings');
      const data = await response.json();
      
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div>
      {/* Use settings data */}
      <section className="stats">
        <h2>Our Impact</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <span className="text-4xl font-bold">{settings.stats.staffCount}</span>
            <p>Staff Members</p>
          </div>
          <div>
            <span className="text-4xl font-bold">{settings.stats.volunteersCount}</span>
            <p>Volunteers</p>
          </div>
          <div>
            <span className="text-4xl font-bold">{settings.stats.officesCount}</span>
            <p>Offices</p>
          </div>
          <div>
            <span className="text-4xl font-bold">{settings.stats.regionsCount}</span>
            <p>Active Regions</p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### 5. Volunteer Form Submission

```typescript
// app/(user-side)/volunteer/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/volunteer/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          age: parseInt(data.age),
          gender: data.gender,
          location: data.location,
          occupation: data.occupation,
          skills: data.skills?.split(',').map((s: string) => s.trim()) || [],
          interests: data.interests?.split(',').map((i: string) => i.trim()) || [],
          availability: data.availability,
          experience: data.experience,
          motivation: data.motivation,
          referenceSource: data.referenceSource,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        reset();
        alert(result.message);
      } else {
        alert(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-8">Become a Volunteer</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Full Name *</label>
          <input
            {...register('fullName', { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email *</label>
          <input
            {...register('email', { required: true })}
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Phone *</label>
          <input
            {...register('phone', { required: true })}
            type="tel"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Age</label>
            <input
              {...register('age')}
              type="number"
              min="15"
              max="100"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select {...register('gender')} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Location *</label>
          <input
            {...register('location', { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="City, Region"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Occupation</label>
          <input
            {...register('occupation')}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Skills (comma-separated)</label>
          <input
            {...register('skills')}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Communication, Teaching, Social Media..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Areas of Interest (comma-separated)</label>
          <input
            {...register('interests')}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Youth Empowerment, Health, Education..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Availability *</label>
          <select
            {...register('availability', { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select...</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="both">Both</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Previous Volunteer Experience</label>
          <textarea
            {...register('experience')}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Why do you want to volunteer? *</label>
          <textarea
            {...register('motivation', { required: true })}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">How did you hear about us? *</label>
          <input
            {...register('referenceSource', { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Website, Social Media, Friend, etc."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
```

---

## 🔄 Server-Side Rendering (SSR) Example

For better SEO and performance, use Server Components:

```typescript
// app/(user-side)/news/page.tsx (Server Component)
import { Suspense } from 'react';

async function getNews() {
  const res = await fetch('http://localhost:3000/api/public/news?limit=12', {
    cache: 'no-store', // or 'force-cache' for caching
  });
  return res.json();
}

export default async function NewsPage() {
  const data = await getNews();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.data.map((post: any) => (
        <div key={post._id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 Best Practices

1. **Error Handling**: Always handle API errors gracefully
2. **Loading States**: Show loading indicators while fetching data
3. **Caching**: Use Next.js caching strategies for better performance
4. **Type Safety**: Define TypeScript interfaces for all data structures
5. **Fallbacks**: Provide default/placeholder content while loading

---

## 📝 Query Parameters

### News Endpoint

```typescript
// Pagination
GET /api/public/news?page=1&limit=10

// Filter by category
GET /api/public/news?category=News

// Get only featured posts
GET /api/public/news?featured=true

// Combine filters
GET /api/public/news?page=1&limit=12&category=Events&featured=true
```

### Programs Endpoint

```typescript
// Filter by category
GET /api/public/programs?categoryId=youth-empowerment
```

---

## 🔗 Complete Migration Checklist

- [ ] Replace static news data with `/api/public/news`
- [ ] Replace static programs data with `/api/public/programs`
- [ ] Replace static settings data with `/api/public/settings`
- [ ] Add volunteer form submission to `/api/volunteer/submit`
- [ ] Update news detail pages to use `/api/public/news/[slug]`
- [ ] Update page routes to use `/api/public/pages/[slug]`
- [ ] Add loading states to all data fetching
- [ ] Add error handling for failed API calls
- [ ] Test all pages with actual database data
- [ ] Remove old static data files (optional, keep as backup)

---

**Next Steps**: Start by updating one page at a time, testing thoroughly before moving to the next!








