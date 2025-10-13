import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '~/lib/auth/session';
import {
  getOverviewMetrics,
  getTrafficSources,
  getTopPages,
  getGeographicData,
  getDeviceData,
  getDailyTrend,
  isGA4Configured,
} from '~/lib/analytics/ga4';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Check if GA4 is configured
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Google Analytics not configured',
          message:
            'Please configure GA4 credentials in your environment variables. See ADMIN_SETUP.md for instructions.',
        },
        { status: 503 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('range') || '30daysAgo';

    // Fetch all analytics data in parallel
    const [overview, trafficSources, topPages, geographic, devices, dailyTrend] =
      await Promise.all([
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
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch analytics data',
        message: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}








