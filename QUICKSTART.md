# 🚀 Quick Start Guide - TSD Admin Dashboard

Get your admin dashboard up and running in 5 minutes!

---

## ⚡ Fast Setup (5 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start MongoDB

**Option A - Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
mongod
```

**Option B - MongoDB Atlas:**
Use your MongoDB Atlas connection string instead.

### Step 3: Create Environment File

Create `.env.local` in the project root:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/tamra_sdt

# Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXTAUTH_SECRET=your-nextauth-secret-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@tamra-sdt.org
ADMIN_PASSWORD=Admin@123456
```

### Step 4: Seed Database
```bash
npm run seed
```

**Expected Output:**
```
✅ Database seeding completed successfully!
📧 Email: admin@tamra-sdt.org
🔑 Password: Admin@123456
```

### Step 5: Start Development Server
```bash
npm run dev
```

---

## 🎯 Access Admin Dashboard

1. Open browser: **http://localhost:3000/admin/login**
2. Login with:
   - Email: `admin@tamra-sdt.org`
   - Password: `Admin@123456`
3. **Change password immediately!**

---

## 📂 What's Included?

✅ **Authentication System** - Secure login with JWT
✅ **Content Management** - Pages, News, Programs, Media
✅ **Rich Text Editor** - WYSIWYG content editing
✅ **File Uploads** - Image and document management
✅ **User Management** - Role-based access control
✅ **Analytics Dashboard** - Ready for GA4 integration
✅ **Responsive Design** - Mobile-friendly interface

---

## 🗺️ Admin Dashboard Routes

```
/admin                  → Dashboard Home
/admin/login           → Login Page

/admin/pages           → Pages Management
/admin/news            → News & Events
/admin/programs        → Programs Management
/admin/media           → Media Library

/admin/users           → User Management
/admin/analytics       → Analytics Dashboard
/admin/settings        → Site Settings
```

---

## 🔑 Default User Roles

| Role | Access Level |
|------|-------------|
| **Superadmin** | Full access to everything |
| **Admin** | Most access (except user deletion) |
| **Editor** | Content management only |
| **Viewer** | Read-only access |

---

## 📝 Common Tasks

### Create a News Post
1. Go to `/admin/news`
2. Click "New Post"
3. Fill in the form
4. Use rich text editor for content
5. Set status (Draft/Published)
6. Click "Create Post"

### Upload Media
1. Go to `/admin/media`
2. Upload files (drag & drop or click)
3. Add alt text and caption
4. Copy URL to use in content

### Add New User
1. Go to `/admin/users`
2. Click "Add User"
3. Fill in details and select role
4. User can now login

---

## 🔧 Troubleshooting

### Can't connect to MongoDB?
```bash
# Check if MongoDB is running
mongosh

# If not, start it:
brew services start mongodb-community
```

### Authentication not working?
- Clear browser cookies
- Check JWT_SECRET in `.env.local`
- Restart dev server

### Seed script failed?
- Ensure MongoDB is running
- Check MONGODB_URI is correct
- Delete existing database and try again

---

## 📚 Full Documentation

For complete documentation, see:
- **ADMIN_SETUP.md** - Complete setup guide
- **IMPLEMENTATION_SUMMARY.md** - Feature overview

---

## 🆘 Need Help?

1. Check the logs in terminal
2. Review environment variables
3. Verify MongoDB connection
4. Check documentation files

---

## 🎉 You're All Set!

Your admin dashboard is ready to use. Start creating content and managing your website!

**Frontend Site**: http://localhost:3000  
**Admin Dashboard**: http://localhost:3000/admin/login

---

**Happy Coding! 🚀**








