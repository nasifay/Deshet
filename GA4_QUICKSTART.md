# 🚀 GA4 Quick Start Guide

## Setup in 5 Minutes

### 1️⃣ Get Your Service Account Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to: **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **Service Account**
4. Create the account and download the JSON key file

### 2️⃣ Enable the API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for **"Google Analytics Data API"**
3. Click **Enable**

### 3️⃣ Grant Access to Your GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Navigate to: **Admin** → **Property** → **Property Access Management**
3. Click **Add Users** (+)
4. Add your service account email (from the JSON file)
5. Assign **Viewer** role

### 4️⃣ Configure Environment Variables

Create/edit `.env.local` in your project root:

```bash
# From your service account JSON file:
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"
```

**⚠️ Important:**
- Keep the quotes around `GA4_PRIVATE_KEY`
- Keep the `\n` characters in the key
- Don't add spaces around the `=` signs

### 5️⃣ Verify Setup

Run the verification script:

```bash
npm run verify:ga4
```

If successful, restart your dev server:

```bash
npm run dev
```

Then visit: **http://localhost:3000/admin/analytics**

## 📋 Quick Checklist

- [ ] Service account created in Google Cloud
- [ ] Google Analytics Data API enabled
- [ ] Service account added to GA4 property with Viewer role
- [ ] All 3 environment variables added to `.env.local`
- [ ] Verification script passes (`npm run verify:ga4`)
- [ ] Dev server restarted
- [ ] Analytics page shows real data

## 🆘 Common Issues

### "Google Analytics not configured"
→ Missing environment variables in `.env.local`

### "PERMISSION_DENIED"
→ Service account not added to GA4 property or missing Viewer role

### "NOT_FOUND"
→ Wrong Property ID or property doesn't exist

### "API has not been used"
→ Google Analytics Data API not enabled in Cloud Console

## 📖 Detailed Guide

For step-by-step instructions with screenshots, see: **ANALYTICS_SETUP.md**

## 🔧 Commands

```bash
# Verify GA4 configuration
npm run verify:ga4

# Start dev server
npm run dev

# Build for production
npm run build
```

## ✨ What You Get

The analytics dashboard shows:
- 📊 Real-time user metrics
- 📈 Traffic trends over time
- 🌍 Geographic distribution
- 📱 Device breakdown
- 🔗 Traffic sources
- 📄 Top performing pages

With date range options: 7, 30, or 90 days

---

**Need help?** Check ANALYTICS_SETUP.md for detailed troubleshooting



