# Developer Handover Document

## Tamra for Social Development (TSD) NGO Website

**Document Version:** 1.0  
**Date:**  
**Prepared by:** Development Team  
**Handover Date:** [To be filled]

---

## 1. Project Overview

### Brief Description

The Tamra for Social Development (TSD) website is a comprehensive digital platform for an Ethiopian NGO focused on youth empowerment, peacebuilding, gender development, and community development. The platform serves as both a public-facing website and a content management system for organization staff.

### Key Objectives

- **Public Website**: Showcase organization's mission, programs, news, and impact to visitors
- **Content Management**: Enable non-technical staff to manage website content independently
- **Admin Dashboard**: Provide comprehensive backend management for all organizational aspects
- **SEO Optimization**: Built-in SEO features for better search engine visibility
- **Analytics Integration**: Google Analytics 4 integration for performance tracking
- **Donation Platform**: Facilitate online donations and volunteer applications

### Primary Users

- **Public Visitors**: General public, potential donors, volunteers, and beneficiaries
- **Content Editors**: NGO staff who manage website content (news, programs, gallery)
- **Administrators**: Senior staff with full system access for user and content management
- **Superadmins**: Technical administrators with complete system control

---

## 2. Key Features

### Public Website Features

- **Dynamic Landing Page**: Rotating hero images, organization overview, program highlights
- **Program Showcase**: Detailed program information with project galleries
- **News & Events**: Blog-style news with categories, tags, and featured articles
- **Photo Gallery**: Categorized image gallery with filtering capabilities
- **Organization History**: Timeline of milestones and achievements
- **Volunteer Application**: Online form for potential volunteer applications
- **Donation Platform**: Bank information and donation instructions
- **Contact System**: Contact forms and organization details

### Admin Dashboard Features

- **Dashboard Overview**: Statistics cards, quick actions, recent activity
- **Content Management**: News, programs, pages, and media management
- **User Management**: Role-based user accounts with permission system
- **Analytics Dashboard**: Google Analytics 4 integration with visualizations
- **Media Library**: File upload, organization, and optimization
- **SEO Controls**: Meta tags, descriptions, and social media optimization

### Content Management System (CMS)

- **Section-based Pages**: Modular page building with drag-and-drop interface
- **Rich Text Editor**: TipTap-based content editing with media support
- **Draft System**: Save work in progress with preview capabilities
- **Bulk Operations**: Mass content management and organization

### Planned/Pending Features

- **Multi-language Support**: Amharic and English language options
- **Advanced Analytics**: Custom reporting and insights
- **Email Integration**: Automated email campaigns and notifications
- **Mobile App**: Companion mobile application for field staff

---

## 3. Technology Stack

### Frontend Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: TipTap editor
- **Image Optimization**: Next.js Image component

### Backend Technologies

- **Runtime**: Node.js 18+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Jose library
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **API**: Next.js API Routes (RESTful)

### Third-party Services & Integrations

- **Analytics**: Google Analytics 4
- **Image Hosting**: Local file system with Next.js optimization

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git
- **Build Tool**: Next.js built-in

---

## 4. Architecture Overview

### High-Level System Design

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Public Site   │    │  Admin Dashboard│    │   API Layer     │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│  (Next.js API)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   MongoDB       │
                    │   Database      │
                    └─────────────────┘
```

### Frontend-Backend Interaction

- **Public Pages**: Server-side rendered with static generation where possible
- **Admin Dashboard**: Client-side rendered with API calls for dynamic content
- **API Routes**: RESTful endpoints handling CRUD operations
- **Middleware**: JWT authentication and route protection

### Authentication Flow

1. User submits credentials via login form
2. Server validates credentials against MongoDB
3. JWT token generated and stored in HTTP-only cookie
4. Middleware validates token on protected routes
5. User permissions checked based on role

### Data Flow

1. **Public Content**: Fetched from MongoDB via public API routes
2. **Admin Content**: Fetched via protected admin API routes
3. **Real-time Updates**: Client-side state management with React hooks
4. **File Uploads**: Direct to server filesystem with database metadata

### Security Measures

- JWT-based authentication with secure cookies
- Role-based access control (RBAC)
- Input validation with Zod schemas
- Password hashing with bcryptjs
- CORS protection and rate limiting
- XSS protection with sanitized HTML

---

## 5. Project Structure

```
ngo-site/
├── app/                          # Next.js App Router
│   ├── (user-side)/             # Public website pages
│   │   ├── (landing)/           # Landing page components
│   │   │   ├── layout.tsx       # Landing page layout
│   │   │   └── page.tsx         # Landing page content
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
│   │   │   ├── AdminLayoutClient.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   ├── analytics/           # Analytics dashboard
│   │   ├── users/               # User management
│   │   ├── news/                # News management
│   │   ├── programs/            # Programs management
│   │   ├── gallery/             # Gallery management
│   │   └── settings/            # Site settings
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   │   ├── dashboard/       # Dashboard statistics
│   │   │   ├── users/           # User CRUD operations
│   │   │   ├── news/            # News management
│   │   │   ├── programs/        # Program management
│   │   │   └── gallery/         # Media management
│   │   ├── auth/                # Authentication endpoints
│   │   │   ├── login/           # User login
│   │   │   ├── logout/          # User logout
│   │   │   └── session/         # Session validation
│   │   ├── public/              # Public API endpoints
│   │   │   ├── landing/         # Homepage content
│   │   │   ├── news/            # Public news
│   │   │   ├── programs/        # Public programs
│   │   │   └── gallery/         # Public gallery
│   │   └── volunteer/           # Volunteer submission
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Site header
│   │   ├── Footer.tsx           # Site footer
│   │   └── user-side-layout.tsx # Public site layout
│   ├── sections/                # Page sections
│   │   ├── hero-section.tsx     # Landing page hero
│   │   ├── about-section.tsx    # About organization
│   │   └── [35 other sections]  # Various page sections
│   └── ui/                      # UI primitives
│       ├── Button.tsx           # Custom button component
│       ├── Card.tsx             # Card component
│       └── [15 other UI components]
├── lib/                         # Utility libraries
│   ├── auth/                    # Authentication utilities
│   │   ├── jwt.ts               # JWT token handling
│   │   ├── password.ts          # Password utilities
│   │   └── permissions.ts       # Role-based permissions
│   ├── db/                      # Database models & connection
│   │   ├── mongodb.ts           # Database connection
│   │   └── models/              # Mongoose models
│   │       ├── User.ts          # User model
│   │       ├── NewsPost.ts      # News model
│   │       ├── Program.ts       # Program model
│   │       └── [12 other models]
│   ├── seo/                     # SEO utilities
│   │   ├── metadata-config.ts   # SEO configuration
│   │   └── json-ld.ts           # Structured data
│   └── analytics/               # Analytics integration
│       └── ga4.ts               # Google Analytics 4
├── public/                      # Static assets
│   ├── images/                  # Image assets
│   ├── uploads/                 # User-uploaded files
│   └── [various static files]
├── scripts/                     # Database seeding scripts
│   ├── seed.ts                  # Main seeding script
│   ├── seed-news.ts             # News data seeding
│   ├── seed-programs.ts         # Programs data seeding
│   └── [15 other seeding scripts]
├── middleware.ts                # Next.js middleware
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

### Key Files Explanation

- **`middleware.ts`**: Handles authentication and route protection
- **`lib/db/mongodb.ts`**: Database connection with caching
- **`lib/auth/`**: Authentication and authorization utilities
- **`scripts/`**: Database seeding and migration scripts
- **`components/sections/`**: Reusable page sections for CMS
- **`app/api/`**: API routes organized by functionality

---

## 6. Setup Instructions

### Prerequisites

- Node.js 18 or higher
- MongoDB database (local or cloud)
- npm or yarn package manager
- Git

### Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd ngo-site
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database Setup**

   ```bash
   # Start MongoDB (if running locally)
   mongod

   # Or use MongoDB Atlas cloud database
   # Update MONGODB_URI in .env.local
   ```

5. **Database Seeding**

   ```bash
   # Seed with sample data
   npm run seed

   # Or seed specific data types
   npm run seed:landing
   npm run seed:news
   npm run seed:programs
   npm run seed:gallery
   ```

6. **Start Development Server**

   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Public site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin
   - Default admin credentials: [See Access Credentials section]

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run seed             # Seed database with sample data
npm run seed:landing     # Seed landing page content
npm run seed:news        # Seed news articles
npm run seed:programs    # Seed programs data
npm run seed:gallery     # Seed gallery content
npm run verify:ga4       # Verify Google Analytics configuration
```

---

## 7. Environment Variables (.env)

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tamra_sdt
# For production: mongodb+srv://username:password@cluster.mongodb.net/tamra_sdt

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
# Generate a strong secret: openssl rand -base64 32

# Google Analytics 4
GA4_PROPERTY_ID=your-ga4-property-id
GA4_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"

# Site Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production: https://tamra-sdt.org

# Google Site Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code

# Optional: Email Configuration (for future implementation)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

### Environment Variable Descriptions

- **MONGODB_URI**: Connection string for MongoDB database
- **JWT_SECRET**: Secret key for JWT token signing (keep secure)
- **GA4_PROPERTY_ID**: Google Analytics 4 property ID
- **GA4_CLIENT_EMAIL**: Service account email for GA4 API access
- **GA4_PRIVATE_KEY**: Private key for GA4 service account
- **NEXT_PUBLIC_BASE_URL**: Base URL for the application
- **NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION**: Google Search Console verification code

---

## 8. API Documentation

### Public API Endpoints

#### Landing Page Content

```
GET /api/public/landing
Response: {
  success: boolean,
  data: {
    sections: Array<{
      type: string,
      data: object,
      order: number
    }>
  }
}
```

#### News Articles

```
GET /api/public/news
Query Parameters: ?page=1&limit=10&category=all&featured=false
Response: {
  success: boolean,
  data: {
    posts: INewsPost[],
    pagination: {
      page: number,
      limit: number,
      total: number,
      pages: number
    }
  }
}

GET /api/public/news/[slug]
Response: {
  success: boolean,
  data: INewsPost
}
```

#### Programs

```
GET /api/public/programs
Response: {
  success: boolean,
  data: IProgram[]
}
```

#### Gallery

```
GET /api/public/gallery
Query Parameters: ?category=all&page=1&limit=12
Response: {
  success: boolean,
  data: {
    items: IGalleryItem[],
    categories: string[],
    pagination: object
  }
}
```

#### Contact Form Submission

```
POST /api/public/contact/submit
Body: {
  name: string,
  email: string,
  subject: string,
  message: string
}
Response: {
  success: boolean,
  message: string
}
```

### Admin API Endpoints

#### Authentication

```
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: {
  success: boolean,
  data: {
    user: IUser,
    token: string
  }
}

POST /api/auth/logout
Headers: { Cookie: admin_token=... }
Response: {
  success: boolean,
  message: string
}
```

#### Dashboard Statistics

```
GET /api/admin/dashboard/stats
Headers: { Cookie: admin_token=... }
Response: {
  success: boolean,
  data: {
    stats: {
      pages: number,
      news: number,
      programs: number,
      media: number,
      users: number
    }
  }
}
```

#### News Management

```
GET /api/admin/news
Headers: { Cookie: admin_token=... }
Query Parameters: ?page=1&limit=10&status=all

POST /api/admin/news
Headers: { Cookie: admin_token=... }
Body: INewsPost

PUT /api/admin/news/[id]
Headers: { Cookie: admin_token=... }
Body: Partial<INewsPost>

DELETE /api/admin/news/[id]
Headers: { Cookie: admin_token=... }
```

#### User Management

```
GET /api/admin/users
Headers: { Cookie: admin_token=... }

POST /api/admin/users
Headers: { Cookie: admin_token=... }
Body: {
  name: string,
  email: string,
  password: string,
  role: UserRole
}

PUT /api/admin/users/[id]
Headers: { Cookie: admin_token=... }
Body: Partial<IUser>

DELETE /api/admin/users/[id]
Headers: { Cookie: admin_token=... }
```

#### Media Upload

```
POST /api/admin/media/upload
Headers: { Cookie: admin_token=... }
Body: FormData with file
Response: {
  success: boolean,
  data: {
    filename: string,
    url: string,
    size: number
  }
}
```

### Authentication Requirements

- **Public APIs**: No authentication required
- **Admin APIs**: Require valid JWT token in cookie named `admin_token`
- **Token Expiration**: 7 days (configurable)
- **Role-based Access**: Different permissions based on user role

---

## 9. Database Schema / Models

### Core Models

#### User Model

```typescript
interface IUser {
  _id: ObjectId;
  name: string; // User's full name
  email: string; // Unique email address
  password: string; // Hashed password
  role: "superadmin" | "admin" | "editor" | "viewer";
  avatar?: string; // Profile image URL
  isActive: boolean; // Account status
  lastLogin?: Date; // Last login timestamp
  createdAt: Date;
  updatedAt: Date;
}
```

#### NewsPost Model

```typescript
interface INewsPost {
  _id: ObjectId;
  title: string; // Article title
  slug: string; // URL-friendly slug
  content: string; // Rich text content
  excerpt: string; // Short description
  featuredImage?: string; // Main article image
  category: string; // News category
  tags: string[]; // Article tags
  status: "draft" | "published" | "archived";
  author: ObjectId; // Reference to User
  views: number; // View count
  isFeatured: boolean; // Featured article flag
  publishedAt?: Date; // Publication date
  createdAt: Date;
  updatedAt: Date;
}
```

#### Program Model

```typescript
interface IProgram {
  _id: ObjectId;
  title: string;                   // Program title
  slug: string;                    // URL-friendly slug
  categoryId: string;              // Program category ID
  categoryLabel: string;           // Category display name
  description: string;             // Program description
  image: string;                   // Main program image
  thumbnails: Array<{              // Additional images
    id: number;
    src: string;
    alt?: string;
    uploaded?: boolean;
  }>;
  projects: Array<{                // Program projects
    id: number;
    name: string;
    description?: string;
    featuredImage?: string;
    galleryThumbnails?: Array<{...}>;
    status?: string;
    partner?: string;
  }>;
  status: 'draft' | 'published' | 'archived';
  order: number;                   // Display order
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Additional Models

#### Gallery Model

```typescript
interface IGallery {
  _id: ObjectId;
  title: string;
  description?: string;
  image: string;
  category: string;
  tags: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Contact Model

```typescript
interface IContact {
  _id: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}
```

#### Volunteer Model

```typescript
interface IVolunteer {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  skills: string[];
  experience: string;
  motivation: string;
  availability: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}
```

### Database Relationships

- **User → NewsPost**: One-to-many (author relationship)
- **Program → Projects**: One-to-many (embedded documents)
- **Gallery → Categories**: Many-to-one (category reference)

### Indexes

- **User**: email (unique), role
- **NewsPost**: slug (unique), status + publishedAt, category
- **Program**: slug (unique), categoryId + order, status + publishedAt
- **Gallery**: category, isActive + order

---

## 10. Authentication & Authorization

### Authentication Flow

1. **Login Process**:

   - User submits email/password via `/api/auth/login`
   - Server validates credentials against MongoDB
   - JWT token generated with user info and role
   - Token stored in HTTP-only cookie named `admin_token`
   - User redirected to admin dashboard

2. **Token Validation**:

   - Middleware checks for `admin_token` cookie on protected routes
   - JWT token verified using secret key
   - User info extracted and added to request headers
   - Invalid/expired tokens redirect to login

3. **Session Management**:
   - Tokens expire after 7 days
   - Refresh tokens available for 30 days
   - Logout clears cookies and invalidates session

### User Roles & Permissions

#### Role Hierarchy

1. **Superadmin**: Full system access
2. **Admin**: Content and user management
3. **Editor**: Content creation and editing
4. **Viewer**: Read-only access

#### Permission System

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

#### Role-Permission Mapping

- **Superadmin**: All permissions
- **Admin**: All except `settings.edit`
- **Editor**: Content and media permissions only
- **Viewer**: View permissions only

### Security Measures

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Security**: Signed tokens with expiration
- **Cookie Security**: HTTP-only, secure cookies
- **Input Validation**: Zod schema validation
- **XSS Protection**: HTML sanitization
- **CSRF Protection**: SameSite cookie attribute

---

## 11. Deployment Guide

### Production Deployment

#### Environment Setup

1. **Server Requirements**:

   - Node.js 18+
   - MongoDB database
   - SSL certificate
   - Domain name configured

2. **Build Process**:
   ```bash
   npm run build
   npm run start
   ```

#### Deployment Options

##### Option 1: Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy automatically on git push

##### Option 2: Traditional Hosting

1. Upload built files to server
2. Install Node.js and dependencies
3. Configure reverse proxy (Nginx/Apache)
4. Set up SSL certificate
5. Configure PM2 for process management

#### Environment Configuration

```env
# Production Environment Variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tamra_sdt
JWT_SECRET=production-secret-key
NEXT_PUBLIC_BASE_URL=https://tamra-sdt.org
GA4_PROPERTY_ID=production-ga4-id
GA4_CLIENT_EMAIL=production-service-account@project.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nProduction-Private-Key\n-----END PRIVATE KEY-----\n"
```

#### Database Setup

1. Create production MongoDB instance
2. Run seeding scripts for initial data
3. Create admin user account
4. Configure database backups

#### Domain Configuration

- **Primary Domain**: tamra-sdt.org
- **Admin Subdomain**: admin.tamra-sdt.org (optional)
- **SSL Certificate**: Let's Encrypt or commercial certificate
- **DNS Configuration**: A records pointing to server IP

---

## 12. Access Credentials & Accounts

### Development Environment

- **MongoDB**: Local instance (mongodb://localhost:27017/tamra_sdt)
- **Admin User**: admin@tamra-sdt.org / [Default password in seeding script]
- **JWT Secret**: [Development secret in .env.local]

### Production Environment

- **MongoDB Atlas**: [Credentials stored securely]
- **Admin User**: [Production admin credentials]
- **Google Analytics**: [Service account credentials]
- **Domain Registrar**: [Domain management credentials]
- **Hosting Provider**: [Server access credentials]

### Credential Storage

- **Development**: `.env.local` file (not committed to git)
- **Production**: Environment variables in hosting platform
- **Sensitive Data**: Encrypted storage or secure vault
- **Backup**: Secure backup of all credentials

### Default Admin Account

After running `npm run seed`, default admin account is created:

- **Email**: admin@tamra-sdt.org
- **Password**: [Check seeding script for default password]
- **Role**: superadmin

**⚠️ Important**: Change default password immediately after first login.

---

## 13. Current Issues / Known Bugs

### High Priority Issues

1. **Image Upload Optimization**: Large images may cause performance issues

   - **Status**: In progress
   - **Workaround**: Compress images before upload
   - **Reference**: Issue #123

2. **Mobile Responsiveness**: Some admin dashboard sections need mobile optimization
   - **Status**: Pending
   - **Impact**: Limited mobile admin access
   - **Reference**: Issue #156

### Medium Priority Issues

1. **SEO Meta Tags**: Some dynamic pages missing proper meta descriptions

   - **Status**: Pending
   - **Impact**: Reduced SEO performance
   - **Reference**: Issue #189

2. **Gallery Performance**: Large galleries may load slowly
   - **Status**: Under review
   - **Workaround**: Implement pagination
   - **Reference**: Issue #201

### Low Priority Issues

1. **Browser Compatibility**: Some features may not work in older browsers
   - **Status**: Known limitation
   - **Impact**: Minimal (modern browsers supported)
   - **Reference**: Issue #234

### Technical Debt

1. **Code Refactoring**: Some components need optimization
2. **Test Coverage**: Unit tests need to be implemented
3. **Documentation**: API documentation needs completion
4. **Performance**: Database queries need optimization

### Pending Features

1. **Multi-language Support**: Amharic translation
2. **Email Notifications**: Automated email system
3. **Advanced Analytics**: Custom reporting
4. **Mobile App**: Companion mobile application

---

## 14. Development & Coding Standards

### Code Standards

- **Language**: TypeScript with strict mode enabled
- **Linting**: ESLint with Next.js configuration
- **Formatting**: Prettier (if configured)
- **Type Checking**: Strict TypeScript compilation

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: kebab-case (e.g., `user-profile/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Variables**: camelCase
- **Functions**: camelCase
- **Classes**: PascalCase

### File Organization

- **Components**: Grouped by functionality in `/components`
- **Pages**: Organized by route structure in `/app`
- **Utilities**: Centralized in `/lib`
- **Types**: Co-located with components or in `/lib/types`

### Git Workflow

- **Branching**: Feature branches from `main`
- **Commits**: Conventional commit messages
- **Pull Requests**: Required for all changes
- **Code Review**: Mandatory before merging

### Commit Message Format

```
type(scope): description

feat(auth): add JWT token refresh functionality
fix(api): resolve user creation validation error
docs(readme): update installation instructions
```

### Code Quality

- **TypeScript**: Strict type checking
- **Error Handling**: Comprehensive error boundaries
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized images and code splitting

---

### Version 1.0.0

**Initial Release**

- Complete NGO website with public and admin interfaces
- User authentication and role-based access control
- Content management system for news, programs, and gallery
- Google Analytics 4 integration
- SEO optimization features
- Database seeding scripts
- Responsive design for mobile and desktop

**Beta Release**

- Core functionality implementation
- Admin dashboard development
- Database models and API endpoints
- Basic authentication system

**Development Phase**

- Project setup and architecture
- Database schema design
- UI component library
- Basic page structure

### Handover Notes

- **Documentation**: This handover document contains all essential information
- **Code Comments**: Extensive inline documentation in source code
- **Seeding Scripts**: Use for setting up development environment
- **Environment Setup**: Follow setup instructions carefully
- **Known Issues**: Review current issues section before starting work

### Transition Advice

1. **Start with Development Setup**: Follow setup instructions exactly
2. **Review Database Models**: Understand data structure before making changes
3. **Test Admin Functions**: Verify all admin features work correctly
4. **Check Dependencies**: Ensure all packages are up to date
5. **Backup Database**: Always backup before making schema changes
6. **Monitor Performance**: Watch for performance issues with large datasets

## 17. Appendices

### Appendix A: Database ERD

```
[Entity Relationship Diagram would be included here]
```

### Appendix B: API Collection

- **Postman Collection**: [Link to Postman collection]
- **Swagger Documentation**: [Link to Swagger docs]
- **API Testing**: Use provided Postman collection for testing

### Appendix C: Design Resources

- **Figma Files**: [Link to Figma design files]
- **Style Guide**: [Link to design system]
- **Asset Library**: [Link to design assets]

### Appendix D: Architecture Diagrams

```
[System architecture diagrams would be included here]
```

### Appendix E: Component Flow

```
[Component interaction diagrams would be included here]
```

### Appendix F: Deployment Scripts

```bash
# Production deployment script
#!/bin/bash
npm run build
npm run start
```

### Appendix G: Monitoring & Logs

- **Application Logs**: [Log location and format]
- **Error Tracking**: [Error monitoring setup]
- **Performance Monitoring**: [Performance tracking tools]

### Appendix H: Backup Procedures

1. **Database Backup**: Daily automated backups
2. **File Backup**: Weekly file system backups
3. **Code Backup**: Git repository with remote backup
4. **Configuration Backup**: Environment variables backup

---
