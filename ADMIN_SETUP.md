# TSD Admin Dashboard - Setup Guide

This document provides complete setup instructions for the Tamra for Social Development (TSD) Admin Dashboard system.

## 📋 Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Default Credentials](#default-credentials)
8. [Admin Dashboard Structure](#admin-dashboard-structure)
9. [API Routes](#api-routes)
10. [Deployment](#deployment)

---

## ✨ Features

### Authentication & Security
- ✅ Secure JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (RBAC)
- ✅ Protected routes middleware
- ✅ Session management with HTTP-only cookies

### Content Management System (CMS)
- ✅ **Pages Management** - Create and edit website pages
- ✅ **News & Events** - Manage news posts and events
- ✅ **Programs** - Organize programs by category
- ✅ **Media Library** - Upload and manage images/files
- ✅ **Rich Text Editor** - Tiptap WYSIWYG editor
- ✅ **SEO Fields** - Meta titles, descriptions, keywords
- ✅ **Draft/Publish Workflow** - Save drafts before publishing
- ✅ **Featured Content** - Mark posts as featured

### User Management
- ✅ Create and manage admin users
- ✅ 4 User Roles: Superadmin, Admin, Editor, Viewer
- ✅ Permission-based access control
- ✅ User activity tracking

### Analytics & Reporting
- ✅ Dashboard with key statistics
- ✅ Content views tracking
- ✅ Google Analytics 4 integration ready
- ✅ Real-time data updates

### UI/UX
- ✅ Modern, responsive admin interface
- ✅ Dark mode support
- ✅ Mobile-friendly sidebar navigation
- ✅ Beautiful admin login page
- ✅ Loading states and error handling

---

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (v6.0 or higher)
  - Local installation OR
  - MongoDB Atlas cloud instance

---

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15.5.4
- MongoDB & Mongoose
- Authentication libraries (bcryptjs, jsonwebtoken)
- Form handling (react-hook-form, zod)
- Rich text editor (@tiptap/react)
- And more...

---

## 💾 Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB** (if not already installed):
   - **macOS**: `brew install mongodb-community`
   - **Ubuntu**: `sudo apt-get install mongodb`
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

2. **Start MongoDB**:
   ```bash
   # macOS/Linux
   brew services start mongodb-community
   # OR
   sudo systemctl start mongod
   
   # Windows (run as service or manually)
   mongod
   ```

3. **Verify MongoDB is running**:
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string (replace `<password>` with your database user password)
4. Whitelist your IP address

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tamra_sdt
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tamra_sdt

# Authentication (Generate secure random strings in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-use-256-bit-key
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google Analytics (Optional - for analytics dashboard)
GA4_PROPERTY_ID=
GA4_CLIENT_EMAIL=
GA4_PRIVATE_KEY=

# File Upload
UPLOAD_DIR=./public/uploads

# Admin Default Credentials (Used for seeding)
ADMIN_EMAIL=admin@tamra-sdt.org
ADMIN_PASSWORD=Admin@123456
```

### Generate Secure Secrets

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🌱 Seeding the Database

The seed script will create:
- Default admin user
- Site settings (statistics, achievements, core values, leadership, etc.)
- Sample programs

Run the seed script:

```bash
npm run seed
```

**Output:**
```
🌱 Starting database seed...

1. Creating admin user...
   ✅ Admin user created
   📧 Email: admin@tamra-sdt.org
   🔑 Password: Admin@123456

2. Seeding site settings...
   ✅ Site settings created

3. Seeding programs...
   ✅ Created 4 programs

✅ Database seeding completed successfully!
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

### Production Build

```bash
npm run build
npm start
```

---

## 🔐 Default Credentials

After running the seed script, use these credentials to login:

**Admin Login Page**: http://localhost:3000/admin/login

```
Email: admin@tamra-sdt.org
Password: Admin@123456
```

**⚠️ IMPORTANT**: Change these credentials immediately after first login!

---

## 🏗 Admin Dashboard Structure

### Routes

```
/admin                          # Dashboard home
/admin/login                    # Login page
/admin/pages                    # Pages management
/admin/pages/new                # Create new page
/admin/pages/[id]/edit          # Edit page
/admin/news                     # News & Events list
/admin/news/new                 # Create news post
/admin/news/[id]/edit           # Edit news post
/admin/programs                 # Programs management
/admin/programs/new             # Create program
/admin/programs/[id]/edit       # Edit program
/admin/media                    # Media library
/admin/users                    # User management (Admin/Superadmin only)
/admin/analytics                # Analytics dashboard
/admin/settings                 # Site settings (Admin/Superadmin only)
```

### User Roles & Permissions

| Permission | Superadmin | Admin | Editor | Viewer |
|------------|:----------:|:-----:|:------:|:------:|
| View Content | ✅ | ✅ | ✅ | ✅ |
| Create Content | ✅ | ✅ | ✅ | ❌ |
| Edit Content | ✅ | ✅ | ✅ | ❌ |
| Delete Content | ✅ | ✅ | ✅ | ❌ |
| Publish Content | ✅ | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ✅ | ❌ | ❌ |
| Delete Users | ✅ | ❌ | ❌ | ❌ |
| View Analytics | ✅ | ✅ | ✅ | ✅ |
| Edit Settings | ✅ | ✅ | ❌ | ❌ |

---

## 🔌 API Routes

### Authentication

```typescript
POST   /api/auth/login         # User login
POST   /api/auth/logout        # User logout
GET    /api/auth/session       # Get current session
POST   /api/auth/register      # Register new user (Admin only)
```

### Content Management

```typescript
# News & Events
GET    /api/admin/news                 # List all news posts
POST   /api/admin/news                 # Create news post
GET    /api/admin/news/[id]            # Get single post
PUT    /api/admin/news/[id]            # Update post
DELETE /api/admin/news/[id]            # Delete post

# Pages
GET    /api/admin/pages                # List all pages
POST   /api/admin/pages                # Create page
GET    /api/admin/pages/[id]           # Get single page
PUT    /api/admin/pages/[id]           # Update page
DELETE /api/admin/pages/[id]           # Delete page

# Programs
GET    /api/admin/programs             # List all programs
POST   /api/admin/programs             # Create program
GET    /api/admin/programs/[id]        # Get single program
PUT    /api/admin/programs/[id]        # Update program
DELETE /api/admin/programs/[id]        # Delete program

# Media
GET    /api/admin/media                # List all media files
POST   /api/admin/media/upload         # Upload file
PUT    /api/admin/media/[id]           # Update media metadata
DELETE /api/admin/media/[id]           # Delete media file

# Dashboard
GET    /api/admin/dashboard/stats      # Get dashboard statistics
```

### Query Parameters

**List Endpoints** support these query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (draft, published, archived)
- `search` - Search term
- `sort` - Sort field (default: -createdAt)
- `category` - Filter by category

**Example:**
```
GET /api/admin/news?page=1&limit=10&status=published&search=youth&sort=-publishedAt
```

---

## 📝 Usage Examples

### Creating a News Post

1. Navigate to `/admin/news`
2. Click "New Post"
3. Fill in the form:
   - **Title**: Auto-generates slug
   - **Excerpt**: Brief description
   - **Content**: Use rich text editor
   - **Category**: Select from dropdown
   - **Tags**: Comma-separated
   - **Featured Image**: URL or upload
   - **Status**: Draft or Published
4. Click "Create Post"

### Managing Media

1. Navigate to `/admin/media`
2. Click "Upload" or drag & drop files
3. Supported formats:
   - Images: JPG, PNG, GIF, WebP, SVG
   - Videos: MP4, WebM
   - Documents: PDF
4. Edit metadata: Alt text, caption, category
5. Copy URL to use in content

### Adding New Admin User

1. Navigate to `/admin/users` (Admin/Superadmin only)
2. Click "Add User"
3. Fill in details:
   - Name, Email, Password
   - Role: Superadmin, Admin, Editor, or Viewer
4. User receives credentials

---

## 🚢 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Connect to Vercel: https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables on Vercel

Add all variables from `.env.local` in:
**Project Settings → Environment Variables**

### MongoDB Atlas for Production

1. Use MongoDB Atlas instead of local MongoDB
2. Update `MONGODB_URI` with your Atlas connection string
3. Whitelist Vercel IP addresses or use `0.0.0.0/0` (less secure)

---

## 🔒 Security Best Practices

1. **Change default admin password immediately**
2. **Use strong JWT secrets** (32+ character random strings)
3. **Enable HTTPS** in production
4. **Restrict MongoDB access** (use Atlas IP whitelist)
5. **Regular backups** of MongoDB database
6. **Update dependencies** regularly
7. **Monitor logs** for suspicious activity
8. **Use environment variables** for all secrets

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running:
```bash
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

### Authentication Not Working

**Solution**: 
1. Clear browser cookies
2. Check JWT_SECRET in `.env.local`
3. Restart dev server

### Uploads Failing

**Solution**:
1. Ensure `public/uploads` directory exists
2. Check write permissions
3. Verify file size limits

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tiptap Editor Docs](https://tiptap.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🤝 Support

For questions or issues:
1. Check this documentation
2. Review error logs
3. Contact the development team

---

**Last Updated**: October 2025








