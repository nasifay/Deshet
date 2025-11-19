import { NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import SiteSettings from "~/lib/db/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();

    // Assuming singleton settings; pick the most recently updated
    const settings = await SiteSettings.findOne({}, null, {
      sort: { updatedAt: -1 },
    }).lean();

    const fallback = { latitude: 9.0192, longitude: 38.7578, zoom: 13 };
    const loc = settings?.contactLocation || fallback;

    return NextResponse.json({
      success: true,
      data: {
        latitude: loc.latitude,
        longitude: loc.longitude,
        zoom: loc.zoom ?? 13,
      },
    });
  } catch (error) {
    console.error("Contact config fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact configuration" },
      { status: 500 }
    );
  }
}
