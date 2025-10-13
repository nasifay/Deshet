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
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error.message);
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
