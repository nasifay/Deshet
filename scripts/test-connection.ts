import dotenv from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import dns from "dns";
import { promisify } from "util";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const dnsLookup = promisify(dns.lookup);
const dnsResolveTxt = promisify(dns.resolveTxt);

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("❌ MONGODB_URI environment variable is not set!");
      console.error("   Please set it in your .env or .env.local file");
      process.exit(1);
    }

    console.log("🔍 Testing MongoDB Atlas Connection...\n");
    console.log("Connection URI (masked):", uri?.replace(/:[^:@]+@/, ":****@"));
    console.log("");

    // Extract hostname from URI for DNS testing
    const hostnameMatch = uri.match(/@([^/]+)/);
    const hostname = hostnameMatch ? hostnameMatch[1] : null;

    if (hostname) {
      console.log("0. Testing DNS resolution...");
      try {
        const addresses = await dnsLookup(hostname);
        console.log(`   ✅ DNS resolved to: ${addresses.address}`);
      } catch (dnsError: any) {
        console.log(`   ❌ DNS lookup failed: ${dnsError.message}`);
        console.log(`   ⚠️  This will likely cause connection failures`);
        console.log(`   💡 Try: Change DNS server to 8.8.8.8 or 1.1.1.1`);
        console.log(`   💡 Or check if MongoDB Atlas cluster is paused`);
        console.log("");
      }
    }

    console.log("1. Attempting to connect...");
    const connectionOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      retryReads: true,
    };
    
    await mongoose.connect(uri, connectionOptions);
    console.log("✅ Connection successful!\n");

    console.log("2. Testing database access...");
    const adminDb = mongoose.connection.db.admin();
    const { databases } = await adminDb.listDatabases();
    console.log("✅ Can list databases!\n");
    console.log("Available databases:");
    databases.forEach((db: any) => {
      console.log(
        `   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`
      );
    });

    console.log("\n3. Testing collection access...");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("✅ Can list collections!");
    console.log(
      `Collections in "${mongoose.connection.db.databaseName}" database:`,
      collections.length
    );
    if (collections.length > 0) {
      collections.forEach((coll: any) => {
        console.log(`   - ${coll.name}`);
      });
    } else {
      console.log(
        "   (No collections yet - this is normal for a new database)"
      );
    }

    console.log("\n✅ All tests passed! Your connection is working correctly.");
  } catch (error: any) {
    console.error("\n❌ Connection test failed:", error.message);
    
    // Provide specific troubleshooting based on error type
    if (error.code === 'ETIMEOUT' || error.message.includes('ETIMEOUT')) {
      console.error("\n🔧 NETWORK TIMEOUT - Check the following:");
      console.error("   1. Your internet connection");
      console.error("   2. MongoDB Atlas cluster status (not paused)");
      console.error("   3. IP whitelist in MongoDB Atlas:");
      console.error("      - Go to https://cloud.mongodb.com/");
      console.error('      - Click "Network Access" in the left sidebar');
      console.error("      - Add your current IP or use 0.0.0.0/0 for development");
      console.error("   4. Firewall/VPN settings (may be blocking connection)");
      console.error("   5. Try disconnecting from VPN if connected");
    } else if (error.message.includes("authentication") || error.code === 8000) {
      console.error("\n🔧 AUTHENTICATION ERROR - Check your MongoDB Atlas credentials:");
      console.error("   1. Go to https://cloud.mongodb.com/");
      console.error('   2. Click "Database Access" in the left sidebar');
      console.error('   3. Verify your username and password in MONGODB_URI');
      console.error('   4. Ensure user has "readWrite" permissions');
      console.error('   5. Make sure the user can access your database');
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("DNS")) {
      console.error("\n🔧 DNS ERROR - Cannot resolve MongoDB hostname:");
      console.error("   1. Check your internet connection");
      console.error("   2. Verify the MongoDB URI hostname is correct");
      console.error("   3. Try using a different DNS server (e.g., 8.8.8.8)");
    } else {
      console.error("\nError details:", error);
      console.error("\n🔧 GENERAL TROUBLESHOOTING:");
      console.error("   1. Verify MONGODB_URI format is correct");
      console.error("   2. Check MongoDB Atlas cluster is running");
      console.error("   3. Verify network access and IP whitelist");
    }
    
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log("\n🔌 Disconnected from database");
    }
  }
}

testConnection();
