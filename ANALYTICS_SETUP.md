# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 (GA4) integration for your admin analytics dashboard.

## Overview

The analytics dashboard displays real-time data from Google Analytics 4, including:

- Total users, page views, and sessions
- Average session duration and bounce rate
- Traffic trends over time
- Traffic sources breakdown
- Top performing pages
- Geographic distribution of visitors
- Device breakdown (desktop, mobile, tablet)

## Prerequisites

- Google Analytics 4 property set up for your website
- Google Cloud Platform account
- Admin access to your GA4 property

## Step-by-Step Setup

### 1. Create a Google Analytics 4 Property

If you haven't already:

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Add your website and install the GA4 tracking code
4. Note your **Property ID** (format: `123456789`)

### 2. Enable Google Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select or create a project
3. Navigate to **APIs & Services** > **Library**
4. Search for "Google Analytics Data API"
5. Click **Enable**

### 3. Create Service Account

1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - Service account name: `ga4-analytics-reader` (or your preferred name)
   - Service account ID: will auto-populate
   - Description: "Service account for reading GA4 analytics data"
4. Click **Create and Continue**
5. Grant the service account the **Viewer** role (optional for this step)
6. Click **Continue** and then **Done**

### 4. Generate Service Account Key

1. Click on the newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create** - a JSON file will be downloaded

### 5. Add Service Account to GA4 Property

1. Go back to [Google Analytics](https://analytics.google.com)
2. Select your GA4 property
3. Go to **Admin** (bottom left)
4. Under **Property**, click **Property Access Management**
5. Click **Add Users** (+ icon)
6. Enter the service account email (from the JSON file, looks like `name@project-id.iam.gserviceaccount.com`)
7. Assign **Viewer** role
8. Click **Add**

### 6. Configure Environment Variables

Open your `.env.local` file (create it if it doesn't exist) and add:

```bash
# Google Analytics 4 Configuration
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**

- `GA4_PROPERTY_ID`: Just the numeric ID (e.g., `123456789`), not the full property string
- `GA4_CLIENT_EMAIL`: Copy from the `client_email` field in your downloaded JSON
- `GA4_PRIVATE_KEY`: Copy from the `private_key` field in your downloaded JSON
  - Keep the quotes around the key
  - Keep the `\n` characters (they represent newlines)
  - Make sure the entire key is on one line in your .env.local file

**Example of properly formatted private key in .env.local:**

```bash
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### 7. Restart Development Server

After adding the environment variables:

```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

### 8. Verify Installation

1. Log in to your admin panel
2. Navigate to **Analytics** in the admin menu
3. You should see real data from your GA4 property
4. If you see an error, check the browser console and server logs for details

## Troubleshooting

### ⚠️ "PERMISSION_DENIED" Error (Most Common Issue)

**Error Message:** `7 PERMISSION_DENIED: User does not have sufficient permissions for this property`

**Cause:** Your service account credentials are configured correctly, but the service account email hasn't been granted access to your GA4 property.

**Solution:**

1. **Go to Google Analytics** at [analytics.google.com](https://analytics.google.com)
2. **Select your GA4 property**
3. **Click "Admin"** (gear icon in the bottom left)
4. **Under "Property", click "Property Access Management"**
5. **Click the "+" icon** at the top right to add users
6. **Enter your service account email** (from `GA4_CLIENT_EMAIL` in your `.env.local`)
   - Format: `name@project-id.iam.gserviceaccount.com`
7. **Assign "Viewer" role** (uncheck "Notify new users by email")
8. **Click "Add"**
9. **Wait 2-3 minutes** for permissions to propagate
10. **Refresh your analytics dashboard**

### "Google Analytics not configured" Error

**Cause:** Environment variables are not set or formatted incorrectly.

**Solution:**

1. Verify all three environment variables are in `.env.local`
2. Check for typos in variable names
3. Ensure the private key is properly quoted and formatted
4. Restart your development server

### "Failed to fetch analytics data" Error

**Cause:** Service account doesn't have access to the GA4 property or Property ID is incorrect.

**Solution:**

1. Verify the service account email is added to your GA4 property (see PERMISSION_DENIED section above)
2. Ensure it has at least **Viewer** role
3. Wait a few minutes for permissions to propagate
4. Double-check that the Property ID is correct (just the numbers, e.g., `123456789`)

### "API has not been used" Error

**Cause:** Google Analytics Data API is not enabled.

**Solution:**

1. Go to Google Cloud Console
2. Enable the Google Analytics Data API
3. Wait a few minutes for it to activate

### No Data Showing

**Cause:** Your website might not have any traffic yet, or GA4 tracking isn't set up.

**Solution:**

1. Verify GA4 tracking code is installed on your website
2. Visit your website to generate some traffic
3. Check Google Analytics to confirm data is being collected
4. Note: GA4 data can take 24-48 hours to fully process

## Date Range Options

The dashboard supports three date ranges:

- **Last 7 Days**: Recent trends and quick insights
- **Last 30 Days**: Monthly overview (default)
- **Last 90 Days**: Quarterly trends and patterns

## Features

### Real-Time Metrics

- Live user count and session tracking
- Page view statistics
- Average session duration
- Bounce rate analysis

### Traffic Analysis

- Daily trend charts showing users, sessions, and page views
- Traffic source breakdown (Organic Search, Direct, Social, Referral, etc.)
- Device distribution (Desktop, Mobile, Tablet)

### Content Performance

- Top performing pages with view counts
- Average time on page
- Bounce rate per page

### Geographic Insights

- Top countries by user count
- Session distribution by location

## Security Notes

⚠️ **Important:**

- Never commit your `.env.local` file to version control
- The service account has read-only access to analytics data
- Keep your private key secure and don't share it
- Rotate your service account keys periodically for security

## API Endpoints

The analytics dashboard uses the following API endpoints:

- `GET /api/admin/analytics/overview?range=30daysAgo`
  - Returns all analytics data for the specified date range
  - Requires authentication

## Support

If you continue to have issues:

1. Check the [Google Analytics Data API documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
2. Review the [service account setup guide](https://cloud.google.com/iam/docs/service-accounts)
3. Check your browser console and server logs for detailed error messages

## Additional Resources

- [Google Analytics Help Center](https://support.google.com/analytics)
- [Google Cloud Console](https://console.cloud.google.com)
- [GA4 Property Setup](https://support.google.com/analytics/answer/9304153)
