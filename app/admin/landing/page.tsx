'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import LandingSectionEditor from '~/app/admin/components/LandingSectionEditor';

interface LandingPage {
  _id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  sections?: Array<{
    id: string;
    type: string;
    data: Record<string, any>;
    order: number;
  }>;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function LandingPageAdmin() {
  const router = useRouter();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: 'Landing Page',
    slug: 'landing',
    status: 'published' as 'draft' | 'published' | 'archived',
    sections: [] as Array<{
      id: string;
      type: string;
      data: Record<string, any>;
      order: number;
    }>,
    seo: {
      metaTitle: 'TSD - Serving Ethiopian Youth | Social Development Organization',
      metaDescription: 'Tamra for Social Development (TSD) is an Ethiopian NGO working in youth empowerment, peacebuilding, SRH & gender equality, and climate justice since 1998.',
      keywords: ['TSD', 'Ethiopia', 'youth empowerment', 'peacebuilding', 'social development', 'NGO'],
    },
  });

  useEffect(() => {
    fetchLandingPage();
  }, []);

  const fetchLandingPage = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/landing');
      const data = await response.json();

      if (data.success) {
        setPage(data.data);
        setFormData({
          title: data.data.title || 'Landing Page',
          slug: data.data.slug || 'landing',
          status: data.data.status || 'published',
          sections: (data.data.sections || []).map((section: any, index: number) => ({
            id: section.id || `section-${index}`,
            type: section.type,
            data: section.data || {},
            order: section.order !== undefined ? section.order : index,
          })),
          seo: {
            metaTitle: data.data.seo?.metaTitle || 'TSD - Serving Ethiopian Youth | Social Development Organization',
            metaDescription: data.data.seo?.metaDescription || 'Tamra for Social Development (TSD) is an Ethiopian NGO working in youth empowerment, peacebuilding, SRH & gender equality, and climate justice since 1998.',
            keywords: data.data.seo?.keywords || ['TSD', 'Ethiopia', 'youth empowerment', 'peacebuilding', 'social development', 'NGO'],
          },
        });
      } else {
        // If no landing page exists, initialize with default sections
        initializeDefaultSections();
      }
    } catch (error) {
      console.error('Error fetching landing page:', error);
      initializeDefaultSections();
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultSections = () => {
    const defaultSections = [
      {
        id: 'hero-section',
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
        id: 'about-section',
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
        id: 'statistics-section',
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
        id: 'program-areas-section',
        type: 'ProgramAreasSection',
        data: {
          title: 'Program Areas',
          programs: [
            {
              title: 'Youth Empowerment & Peacebuilding',
              description: 'Empowering young people to become agents of positive change in their communities.',
              image: '/programs/hero.png',
            },
            {
              title: 'SRH & Gender Development',
              description: 'Promoting sexual and reproductive health and gender equality.',
              image: '/programs/hero.png',
            },
            {
              title: 'Climate Justice & Livelihoods',
              description: 'Building climate resilience and sustainable livelihoods.',
              image: '/programs/hero.png',
            },
          ],
        },
        order: 3,
      },
      {
        id: 'supporters-section',
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
          ],
        },
        order: 4,
      },
      {
        id: 'achievements-section',
        type: 'AchievementsSection',
        data: {
          title: 'Our Achievements',
          achievements: [
            {
              title: '25+ Years of Impact',
              description: 'Decades of dedicated service to Ethiopian communities.',
            },
            {
              title: 'Multi-Regional Presence',
              description: 'Operating across 4 regions of Ethiopia.',
            },
            {
              title: 'Youth-Centered Approach',
              description: 'Empowering thousands of young people.',
            },
          ],
        },
        order: 5,
      },
      {
        id: 'news-events-section',
        type: 'NewsEventsSection',
        data: {
          title: 'Latest News & Events',
          showLimit: 3,
        },
        order: 6,
      },
      {
        id: 'volunteer-banner',
        type: 'VolunteerBanner',
        data: {
          title: 'Join Our Mission',
          description: 'Become a volunteer and make a difference in your community.',
          ctaText: 'Volunteer Now',
          ctaLink: '/volunteer',
          backgroundImage: '/images/cta.jpg',
        },
        order: 7,
      },
    ];

    setFormData(prev => ({
      ...prev,
      sections: defaultSections,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/admin/landing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Landing page saved successfully!');
        router.refresh();
      } else {
        alert(data.error || 'Failed to save landing page');
      }
    } catch (error) {
      console.error('Error saving landing page:', error);
      alert('Failed to save landing page');
    } finally {
      setSaving(false);
    }
  };

  const handleKeywordsChange = (keywordsString: string) => {
    const keywords = keywordsString
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    setFormData(prev => ({
      ...prev,
      seo: { ...prev.seo, keywords },
    }));
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Landing Page Editor</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {page ? `Last updated: ${new Date(page.updatedAt).toLocaleString()}` : 'Create new landing page'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreview}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Page Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="Landing Page"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="landing"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                URL: /{formData.slug}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">SEO Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.seo.metaTitle}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  seo: { ...prev.seo, metaTitle: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="SEO title for search engines"
                maxLength={60}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{formData.seo.metaTitle.length}/60 characters</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Description
              </label>
              <textarea
                value={formData.seo.metaDescription}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  seo: { ...prev.seo, metaDescription: e.target.value }
                }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none text-sm"
                placeholder="Brief description for search engines"
                maxLength={160}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{formData.seo.metaDescription.length}/160 characters</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Keywords
              </label>
              <input
                type="text"
                value={formData.seo.keywords.join(', ')}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate keywords with commas
              </p>
            </div>
          </div>
        </div>

        {/* Page Information */}
        {page && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Page Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Author:</span>
                <p className="text-gray-600 dark:text-gray-400">{page.author.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Created:</span>
                <p className="text-gray-600 dark:text-gray-400">{new Date(page.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
                <p className="text-gray-600 dark:text-gray-400">{new Date(page.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Landing Page Sections - Full Width Section Editor */}
      <LandingSectionEditor
        sections={formData.sections}
        onChange={(sections) => setFormData(prev => ({ ...prev, sections }))}
      />
    </div>
  );
}





