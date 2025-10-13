import { NextRequest, NextResponse } from "next/server";
import { getSession } from "~/lib/auth/session";
import {
  getOverviewMetrics,
  getTrafficSources,
  getTopPages,
  getGeographicData,
  getDeviceData,
  getDailyTrend,
  isGA4Configured,
} from "~/lib/analytics/ga4";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if GA4 is configured
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Analytics not configured",
          message:
            "Please configure GA4 credentials in your environment variables. See ADMIN_SETUP.md for instructions.",
        },
        { status: 503 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get("range") || "30daysAgo";

    // Fetch all analytics data in parallel
    const [
      overview,
      trafficSources,
      topPages,
      geographic,
      devices,
      dailyTrend,
    ] = await Promise.all([
      getOverviewMetrics(dateRange),
      getTrafficSources(dateRange),
      getTopPages(dateRange, 10),
      getGeographicData(dateRange, 10),
      getDeviceData(dateRange),
      getDailyTrend(dateRange),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        overview,
        trafficSources,
        topPages,
        geographic,
        devices,
        dailyTrend,
      },
      dateRange,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const error = err as { message?: string; code?: number };
    console.error("Error fetching analytics:", error);

    // Check for permission errors
    if (error.message?.includes("PERMISSION_DENIED") || error.code === 7) {
      return NextResponse.json(
        {
          success: false,
          error: "Permission Denied",
          message:
            "The service account does not have access to this GA4 property. Please add the service account email to your GA4 property with Viewer role in Google Analytics Admin settings.",
          details: error.message,
        },
        { status: 403 }
      );
    }

    // Check for API not enabled errors
    if (
      error.message?.includes("API has not been used") ||
      error.message?.includes("not enabled")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "API Not Enabled",
          message:
            "Google Analytics Data API is not enabled for your project. Enable it in Google Cloud Console.",
          details: error.message,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics data",
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
