# MongoDB Connection Troubleshooting Guide

## Current Issue: DNS Resolution Failure

The MongoDB Atlas hostname `cluster0.0gwcnq5.mongodb.net` cannot be resolved by DNS servers.

## Diagnosis

✅ **Test Script**: Improved with DNS diagnostics  
✅ **Connection Options**: Optimized timeouts and retry logic  
❌ **DNS Resolution**: Failing for MongoDB Atlas hostname  
❌ **Network Connection**: Cannot reach MongoDB Atlas

## Root Cause Analysis

The DNS lookup is failing even with Google DNS (8.8.8.8), which suggests:

1. **MongoDB Atlas Cluster Status**
   - Cluster may be paused or deleted
   - Cluster may have been renamed/moved
   - Hostname in connection string may be incorrect

2. **Network-Level Blocking**
   - ISP blocking MongoDB Atlas domains
   - Corporate firewall blocking DNS queries
   - VPN interference

3. **Connection String Issues**
   - Incorrect hostname
   - Missing database name in URI

## Solutions

### 1. Verify MongoDB Atlas Cluster Status

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Check if your cluster is **running** (not paused)
3. If paused, click "Resume" to start it
4. Verify the cluster hostname matches your connection string

### 2. Check Network Access (IP Whitelist)

1. Go to MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Options:
   - **For Development**: Add `0.0.0.0/0` (allows all IPs - NOT for production)
   - **For Production**: Add your specific IP address
4. Wait 1-2 minutes for changes to propagate

### 3. Verify Connection String Format

Your current connection string format:
```
mongodb+srv://yonas:****@cluster0.0gwcnq5.mongodb.net/?appName=Cluster0
```

**Recommended format** (with database name):
```
mongodb+srv://yonas:****@cluster0.0gwcnq5.mongodb.net/database_name?retryWrites=true&w=majority
```

**To get the correct connection string:**
1. Go to MongoDB Atlas → **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with your database name (e.g., `tamra_sdt`)

### 4. Test DNS Resolution Manually

```bash
# Test with system DNS
nslookup cluster0.0gwcnq5.mongodb.net

# Test with Google DNS
nslookup cluster0.0gwcnq5.mongodb.net 8.8.8.8

# Test with Cloudflare DNS
nslookup cluster0.0gwcnq5.mongodb.net 1.1.1.1
```

If all fail, the cluster may be paused or the hostname is incorrect.

### 5. Check Firewall/VPN

- **Disable VPN** if connected
- **Check firewall rules** - MongoDB uses port 27017 (standard) or SRV records
- **Corporate networks** may block MongoDB connections

### 6. Alternative: Use Standard Connection String

If `mongodb+srv://` fails, try the standard connection format:

1. Get connection details from MongoDB Atlas → **Database** → **Connect** → **"Connect using MongoDB Compass"**
2. Use format: `mongodb://username:password@host1:port1,host2:port2/database?options`

### 7. Test Connection Script

Run the improved test script:
```bash
npm run test:mongodb
```

The script now includes:
- DNS resolution testing
- Better error messages
- Specific troubleshooting steps
- Connection timeout optimizations

## Quick Fix Checklist

- [ ] MongoDB Atlas cluster is **running** (not paused)
- [ ] IP address is whitelisted in Network Access
- [ ] Connection string includes database name
- [ ] Password in connection string is correct
- [ ] VPN is disabled (if applicable)
- [ ] Firewall allows MongoDB connections
- [ ] Internet connection is stable

## Next Steps

1. **Verify cluster status** in MongoDB Atlas dashboard
2. **Check IP whitelist** - add your current IP or `0.0.0.0/0` for dev
3. **Update connection string** if needed (add database name)
4. **Test again** with `npm run test:mongodb`

## Contact Support

If issues persist:
- MongoDB Atlas Support: https://www.mongodb.com/support
- Check MongoDB Atlas Status: https://status.mongodb.com/







