# Tamra for Social Development - Developer Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features & Functionality](#core-features--functionality)
5. [Database Models](#database-models)
6. [API Architecture](#api-architecture)
7. [Authentication & Authorization](#authentication--authorization)
8. [Admin Dashboard](#admin-dashboard)
9. [Content Management System](#content-management-system)
10. [SEO & Analytics](#seo--analytics)
11. [Development Setup](#development-setup)
12. [Deployment](#deployment)
13. [Contributing Guidelines](#contributing-guidelines)

## Project Overview

**Tamra for Social Development (TSD)** is a comprehensive NGO website built with Next.js 15, featuring a modern content management system, admin dashboard, and public-facing website. The platform serves as a digital presence for an Ethiopian NGO focused on youth empowerment, peacebuilding, gender development, and community development.

### Key Objectives

- **Public Website**: Showcase organization's mission, programs, news, and impact
- **Content Management**: Enable non-technical staff to manage website content
- **Admin Dashboard**: Comprehensive backend for managing all aspects of the organization
- **SEO Optimization**: Built-in SEO features for better search engine visibility
- **Analytics Integration**: Google Analytics 4 integration for tracking performance

## Architecture & Technology Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Rich Text**: TipTap editor

### Backend

- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Jose library
- **File Upload**: Multer
- **Password Hashing**: bcryptjs

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in

### External Services

- **Analytics**: Google Analytics 4
- **Image Optimization**: Next.js Image component
- **SEO**: Built-in Next.js metadata API

## Project Structure

```
ngo-site/
├── app/                          # Next.js App Router
│   ├── (user-side)/             # Public website pages
│   │   ├── (landing)/           # Landing page
│   │   ├── who-we-are/          # About page
│   │   ├── programs/            # Programs showcase
│   │   ├── news/                # News & events
│   │   ├── gallery/             # Photo gallery
│   │   ├── history/             # Organization history
│   │   ├── volunteer/           # Volunteer application
│   │   ├── donate/              # Donation page
│   │   └── contact-us/          # Contact form
│   ├── admin/                   # Admin dashboard
│   │   ├── components/          # Admin-specific components
│   │   ├── analytics/           # Analytics dashboard
│   │   ├── users/               # User management
│   │   ├── news/                # News management
│   │   ├── programs/            # Programs management
│   │   ├── gallery/             # Gallery management
│   │   └── settings/            # Site settings
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   ├── auth/                # Authentication endpoints
│   │   ├── public/              # Public API endpoints
│   │   └── volunteer/           # Volunteer submission
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── layout/                  # Layout components
│   ├── sections/                # Page sections
│   └── ui/                      # UI primitives
├── lib/                         # Utility libraries
│   ├── auth/                    # Authentication utilities
│   ├── db/                      # Database models & connection
│   ├── seo/                     # SEO utilities
│   └── analytics/               # Analytics integration
├── public/                      # Static assets
├── scripts/                     # Database seeding scripts
└── middleware.ts                # Next.js middleware
```

## Core Features & Functionality

### 1. Public Website Features

#### Landing Page

- **Dynamic Hero Section**: Rotating images with customizable content
- **About Section**: Organization overview with image carousel
- **Programs Preview**: Featured programs with navigation
- **News Highlights**: Latest news and events
- **Statistics**: Key metrics and impact numbers
- **Call-to-Action**: Volunteer and donation prompts

#### Content Pages

- **Who We Are**: Mission, vision, values, leadership team
- **Programs**: Detailed program information with projects
- **News & Events**: Blog-style news with categories and tags
- **Gallery**: Categorized photo gallery with filtering
- **History**: Timeline of organization milestones
- **Volunteer**: Application form for potential volunteers
- **Donate**: Donation information and bank options
- **Contact**: Contact form and organization details

### 2. Admin Dashboard Features

#### Dashboard Overview

- **Statistics Cards**: Quick overview of content counts
- **Quick Actions**: Direct links to common tasks
- **Recent Activity**: Latest updates and changes

#### Content Management

- **News Management**: Create, edit, publish news articles
- **Programs Management**: Manage programs and projects
- **Gallery Management**: Upload and organize photos
- **Page Management**: Edit static page content
- **Media Library**: File upload and management

#### User Management

- **User Roles**: Superadmin, Admin, Editor, Viewer
- **Permission System**: Granular access control
- **User CRUD**: Create, read, update, delete users

#### Analytics

- **Google Analytics Integration**: GA4 data visualization
- **Traffic Sources**: Referral and channel analysis
- **Top Pages**: Most viewed content
- **Geographic Data**: Visitor location insights

### 3. Content Management System (CMS)

#### Dynamic Content

- **Section-based Pages**: Modular page building
- **Rich Text Editor**: TipTap-based content editing
- **Image Management**: Upload and organize media
- **SEO Controls**: Meta tags, descriptions, keywords

#### Content Types

- **News Posts**: Articles with categories, tags, featured images
- **Programs**: Detailed program information with projects
- **Gallery Items**: Categorized photos with metadata
- **Leadership Profiles**: Team member information
- **Testimonials**: User feedback and quotes

## Database Models

### Core Models

#### User Model

```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "editor" | "viewer";
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### NewsPost Model

```typescript
interface INewsPost {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  author: ObjectId;
  views: number;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Program Model

```typescript
interface IProgram {
  _id: ObjectId;
  title: string;
  slug: string;
  categoryId: string;
  categoryLabel: string;
  description: string;
  image: string;
  thumbnails: Array<{
    id: number;
    src: string;
    alt?: string;
    uploaded?: boolean;
  }>;
  projects: Array<{
    id: number;
    name: string;
    description?: string;
    featuredImage?: string;
    galleryThumbnails?: Array<{...}>;
    status?: string;
    partner?: string;
  }>;
  status: 'draft' | 'published' | 'archived';
  order: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Additional Models

- **Gallery**: Photo management with categories
- **Contact**: Contact form submissions
- **Volunteer**: Volunteer applications
- **BankOption**: Donation bank information
- **KeyFunder**: Funding partner information
- **Supporter**: Organization supporters
- **Testimonial**: User testimonials
- **Leadership**: Team member profiles
- **SiteSettings**: Global site configuration

## API Architecture

### API Structure

The API is organized into three main categories:

#### 1. Public API (`/api/public/`)

- **Landing**: Homepage content
- **News**: Public news articles
- **Programs**: Public program information
- **Gallery**: Public gallery access
- **Contact**: Contact form submission
- **Settings**: Public site settings

#### 2. Admin API (`/api/admin/`)

- **Dashboard**: Admin statistics
- **Users**: User management
- **News**: News CRUD operations
- **Programs**: Program management
- **Gallery**: Media management
- **Analytics**: Analytics data
- **Settings**: Site configuration

#### 3. Authentication API (`/api/auth/`)

- **Login**: User authentication
- **Logout**: Session termination
- **Register**: User registration
- **Session**: Session validation

### API Patterns

- **RESTful Design**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Consistent Response Format**:
  ```typescript
  {
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
  }
  ```
- **Authentication**: JWT-based authentication for admin routes
- **Validation**: Zod schema validation for request data
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Authentication & Authorization

### Authentication System

- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: Cookie-based session handling
- **Token Expiration**: Configurable token lifetime

### Authorization Levels

1. **Superadmin**: Full system access
2. **Admin**: Content and user management
3. **Editor**: Content creation and editing
4. **Viewer**: Read-only access

### Permission System

```typescript
type Permission =
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "content.view"
  | "content.create"
  | "content.edit"
  | "content.delete"
  | "content.publish"
  | "media.view"
  | "media.upload"
  | "media.delete"
  | "analytics.view"
  | "settings.view"
  | "settings.edit";
```

### Middleware Protection

- **Route Protection**: Automatic redirect to login for unauthorized access
- **API Protection**: Token validation for admin API endpoints
- **Role-based Access**: Permission checking for sensitive operations

## Admin Dashboard

### Dashboard Components

- **TopBar**: Navigation and user menu
- **Sidebar**: Main navigation menu
- **Content Area**: Dynamic content based on selected section

### Key Sections

1. **Dashboard**: Overview and statistics
2. **Content Management**: News, programs, pages
3. **Media Management**: Gallery and file uploads
4. **User Management**: User accounts and roles
5. **Analytics**: Google Analytics integration
6. **Settings**: Site configuration

### Admin Features

- **Rich Text Editor**: TipTap-based content editing
- **Image Upload**: Drag-and-drop file uploads
- **Bulk Operations**: Mass content management
- **Preview Mode**: Content preview before publishing
- **Draft System**: Save work in progress

## Content Management System

### Dynamic Page Building

- **Section-based Architecture**: Modular page components
- **Drag-and-Drop Interface**: Visual content arrangement
- **Template System**: Reusable page templates
- **SEO Integration**: Built-in SEO controls

### Content Types

- **Hero Sections**: Landing page banners
- **About Sections**: Organization information
- **Program Sections**: Program showcases
- **News Sections**: Article listings
- **Gallery Sections**: Photo displays
- **Contact Sections**: Contact forms

### Media Management

- **File Upload**: Multiple file type support
- **Image Optimization**: Automatic image processing
- **Gallery Organization**: Categorized media library
- **CDN Integration**: Optimized asset delivery

## SEO & Analytics

### SEO Features

- **Metadata Management**: Title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific metadata
- **JSON-LD**: Structured data for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling control

### Analytics Integration

- **Google Analytics 4**: Comprehensive tracking
- **Custom Events**: User interaction tracking
- **Performance Metrics**: Page load and user behavior
- **Admin Dashboard**: Analytics visualization

### SEO Configuration

```typescript
// Example metadata configuration
export const metadata: Metadata = {
  title: "Tamra for Social Development | Empowering Communities",
  description: "Leading NGO in Ethiopia empowering youth...",
  keywords: ["NGO Ethiopia", "youth empowerment", ...],
  openGraph: {
    title: "Tamra for Social Development",
    description: "Empowering communities...",
    images: ["/images/hero.jpg"]
  }
};
```

## Development Setup

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn package manager

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/tamra_sdt

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Google Analytics
GA4_PROPERTY_ID=your-ga4-property-id
GA4_CLIENT_EMAIL=your-service-account-email
GA4_PRIVATE_KEY=your-private-key

# Site Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ngo-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**

   ```bash
   # Start MongoDB (if running locally)
   mongod

   # Seed the database
   npm run seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Public site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
```

### Database Seeding

The project includes comprehensive seeding scripts:

```bash
npm run seed:landing      # Seed landing page content
npm run seed:news         # Seed news articles
npm run seed:programs     # Seed programs data
npm run seed:gallery      # Seed gallery content
npm run seed:users        # Create admin users
```

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Configuration

Ensure all production environment variables are set:

- Database connection string
- JWT secret key
- Google Analytics credentials
- Site URL configuration

### Database Setup

1. Set up production MongoDB instance
2. Run seeding scripts for initial data
3. Create admin user account

### Performance Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Built-in Next.js caching strategies
- **CDN**: Static asset delivery optimization

## Contributing Guidelines

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)
- **Conventional Commits**: Standardized commit messages

### Development Workflow

1. **Feature Branch**: Create feature branch from main
2. **Development**: Implement feature with tests
3. **Code Review**: Submit pull request for review
4. **Testing**: Ensure all tests pass
5. **Merge**: Merge to main after approval

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: kebab-case (e.g., `user-profile/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Component Guidelines

- **Functional Components**: Use React functional components
- **TypeScript**: Proper typing for all props and state
- **Props Interface**: Define clear prop interfaces
- **Error Boundaries**: Implement error handling
- **Accessibility**: Follow WCAG guidelines

### API Guidelines

- **RESTful Design**: Follow REST principles
- **Error Handling**: Consistent error responses
- **Validation**: Input validation with Zod
- **Documentation**: Document all API endpoints
- **Testing**: Write tests for API endpoints

---

## Support & Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Getting Help

- Check existing documentation
- Review code comments and examples
- Test with sample data using seeding scripts
- Contact development team for complex issues

This developer guide provides a comprehensive overview of the Tamra for Social Development website codebase. For specific implementation details, refer to the source code and inline documentation.
