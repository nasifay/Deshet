# 🎯 Admin Dashboard - Quick Reference

## 🚀 Quick Start (3 Commands)

```bash
npm install              # Install dependencies
npm run seed            # Populate database
npm run dev             # Start server
```

**Login:** http://localhost:3000/admin/login  
**Email:** admin@tamra-sdt.org  
**Password:** Admin@123456

---

## 📱 Admin Pages

| Page | URL | Purpose |
|------|-----|---------|
| 🏠 Dashboard | `/admin` | Overview & stats |
| 📄 Pages | `/admin/pages` | Manage pages |
| 📰 News | `/admin/news` | Manage news |
| 📁 Programs | `/admin/programs` | Manage programs |
| 🖼️ Media | `/admin/media` | Upload files |
| ❤️ Volunteers | `/admin/volunteers` | Review applications |
| 👥 Users | `/admin/users` | Manage admins |
| 📊 Analytics | `/admin/analytics` | View GA4 data |
| ⚙️ Settings | `/admin/settings` | Site config |

---

## 🔌 Public APIs

```bash
# News & Events
GET /api/public/news
GET /api/public/news/[slug]

# Programs
GET /api/public/programs

# Pages
GET /api/public/pages/[slug]

# Settings
GET /api/public/settings

# Volunteer Form
POST /api/volunteer/submit
```

---

## 🔐 User Roles

| Role | Access |
|------|--------|
| **Superadmin** | Everything |
| **Admin** | Most (no user delete) |
| **Editor** | Content only |
| **Viewer** | Read only |

---

## 📚 Documentation

1. **QUICKSTART.md** - Start here
2. **ADMIN_SETUP.md** - Complete guide
3. **FRONTEND_INTEGRATION.md** - API usage
4. **FINAL_SUMMARY.md** - Feature overview
5. **.env.example** - Configuration

---

## ⚡ Quick Commands

```bash
# Development
npm run dev

# Production
npm run build
npm start

# Seed database
npm run seed

# Check MongoDB
mongosh
```

---

## 🆘 Troubleshooting

**Can't login?**
- Check MongoDB is running
- Run `npm run seed`
- Clear browser cookies

**API errors?**
- Check `.env.local` exists
- Verify MONGODB_URI
- Restart server

---

## 📊 Features Checklist

✅ Authentication & Security  
✅ Content Management (Pages, News, Programs)  
✅ Media Upload System  
✅ Volunteer Application System  
✅ User Management (CRUD)  
✅ Google Analytics Integration  
✅ Public APIs for Frontend  
✅ Rich Text Editor  
✅ Role-Based Access Control  
✅ Complete Documentation  

---

**Need More Help?** Read the full documentation files!

🚀 **Happy Coding!**
