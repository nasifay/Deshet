import mongoose from "mongoose";
// Import all models to ensure they are registered
import "~/lib/db/models/User";
import "~/lib/db/models/NewsPost";
import "~/lib/db/models/Page";
import "~/lib/db/models/Program";
import "~/lib/db/models/SiteSettings";
import "~/lib/db/models/Media";
import "~/lib/db/models/Volunteer";
import "~/lib/db/models/Gallery";
import "~/lib/db/models/GalleryCategory";
import "~/lib/db/models/Contact";
import "~/lib/db/models/BankOption";
import "~/lib/db/models/KeyFunder";
import "~/lib/db/models/Supporter";
import "~/lib/db/models/Booking";
import "~/lib/db/models/Appointment";
import "~/lib/db/models/Product";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tamra_sdt";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB Already Connected");
    return mongoose;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Increased from 10s to 30s
      socketTimeoutMS: 60000, // Increased from 45s to 60s
      connectTimeoutMS: 30000, // Add connection timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Maintain at least 1 socket connection
      retryWrites: true,
      retryReads: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error.message);
        // Log more details for debugging
        if (error.code === 'ETIMEOUT') {
          console.error("   This is a network timeout. Check:");
          console.error("   1. Your internet connection");
          console.error("   2. MongoDB Atlas cluster status");
          console.error("   3. IP whitelist in MongoDB Atlas");
          console.error("   4. Firewall/VPN settings");
        }
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
