# MongoDB Connection Issues - Diagnosis & Fixes

## ✅ Issues Fixed

### 1. Duplicate Schema Index Warning
**Status**: ✅ FIXED
- **File**: `lib/db/models/GalleryCategory.ts`
- **Issue**: Duplicate index on `slug` field (both `unique: true` and explicit `index()`)
- **Fix**: Removed explicit `GalleryCategorySchema.index({ slug: 1 })` since `unique: true` auto-creates it

### 2. MongoDB Connection Timeout Settings
**Status**: ✅ IMPROVED
- **File**: `lib/db/mongodb.ts`
- **Changes**:
  - Increased `serverSelectionTimeoutMS`: 10s → 30s
  - Increased `socketTimeoutMS`: 45s → 60s
  - Added `connectTimeoutMS: 30000`
  - Added connection pooling (`maxPoolSize: 10`, `minPoolSize: 1`)
  - Added retry logic (`retryWrites: true`, `retryReads: true`)
  - Improved error messages with troubleshooting tips

### 3. Test Connection Script
**Status**: ✅ ENHANCED
- **File**: `scripts/test-connection.ts`
- **Changes**:
  - Added same connection options as main connection
  - Enhanced error handling with specific troubleshooting for different error types
  - Added validation for missing MONGODB_URI
- **New Command**: `npm run test:mongodb`

---

## ❌ Current Issue: DNS Resolution Failure

### Problem
The DNS server cannot resolve `cluster0.0gwcnq5.mongodb.net`:
```
*** Can't find cluster0.0gwcnq5.mongodb.net: No answer
```

### Root Causes (Check These)

1. **Internet Connection**
   - ✅ Basic connectivity works (ping to 8.8.8.8 succeeds)
   - ❌ DNS resolution fails for MongoDB Atlas hostname

2. **DNS Server Issues**
   - Current DNS: `127.0.0.53` (systemd-resolved)
   - May need to use different DNS servers (8.8.8.8, 1.1.1.1)

3. **MongoDB URI Format**
   - Current URI: `mongodb+srv://yonas:****@cluster0.0gwcnq5.mongodb.net/?appName=Cluster0`
   - ⚠️ **Missing database name** - should be: `mongodb+srv://...@cluster0.0gwcnq5.mongodb.net/database_name?retryWrites=true&w=majority`

4. **Network/Firewall**
   - Corporate firewall blocking MongoDB Atlas
   - VPN interference
   - ISP DNS blocking

---

## 🔧 Fixes to Try

### Fix 1: Update MongoDB URI Format
**File**: `.env` or `.env.local`

```env
# Current (missing database name):
MONGODB_URI=mongodb+srv://yonas:password@cluster0.0gwcnq5.mongodb.net/?appName=Cluster0

# Should be (with database name):
MONGODB_URI=mongodb+srv://yonas:password@cluster0.0gwcnq5.mongodb.net/tamra_sdt?retryWrites=true&w=majority
```

### Fix 2: Change DNS Server
Try using Google DNS or Cloudflare DNS:

```bash
# Test with Google DNS
nslookup cluster0.0gwcnq5.mongodb.net 8.8.8.8

# If that works, update your system DNS:
# Edit /etc/resolv.conf or use NetworkManager
```

### Fix 3: Check MongoDB Atlas Settings

1. **Network Access (IP Whitelist)**
   - Go to: https://cloud.mongodb.com/
   - Click "Network Access" → "IP Access List"
   - Add your current IP or `0.0.0.0/0` for development

2. **Cluster Status**
   - Ensure cluster is not paused
   - Check cluster is running in MongoDB Atlas dashboard

3. **Database User**
   - Verify username/password are correct
   - Ensure user has proper permissions

### Fix 4: Test with Different Connection Method

If `mongodb+srv://` fails, try standard connection string:
```env
MONGODB_URI=mongodb://cluster0-shard-00-00.0gwcnq5.mongodb.net:27017,cluster0-shard-00-01.0gwcnq5.mongodb.net:27017,cluster0-shard-00-02.0gwcnq5.mongodb.net:27017/tamra_sdt?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

(Get the exact connection string from MongoDB Atlas → Connect → Connect your application)

---

## 📋 Quick Checklist

- [ ] MongoDB URI includes database name
- [ ] MongoDB URI format is correct
- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] MongoDB cluster is running (not paused)
- [ ] Internet connection is stable
- [ ] DNS can resolve MongoDB hostname
- [ ] No firewall/VPN blocking connection
- [ ] Database user credentials are correct

---

## 🧪 Testing

Run the connection test:
```bash
npm run test:mongodb
```

This will:
1. Validate MONGODB_URI is set
2. Attempt connection with improved timeout settings
3. Test database access
4. List available databases and collections
5. Provide specific error messages with troubleshooting tips

---

## 📝 Notes

- The duplicate index warning is now fixed ✅
- Connection timeout settings are improved ✅
- The DNS resolution issue is a network/infrastructure problem, not a code issue
- Once DNS resolves, the improved connection settings should handle the connection better











