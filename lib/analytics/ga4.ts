import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA4_PROPERTY_ID;
const clientEmail = process.env.GA4_CLIENT_EMAIL;
const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n');

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

/**
 * Get or create GA4 analytics client
 */
function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (!propertyId || !clientEmail || !privateKey) {
    throw new Error('GA4 credentials not configured. Please set GA4_PROPERTY_ID, GA4_CLIENT_EMAIL, and GA4_PRIVATE_KEY in your environment variables.');
  }

  if (!analyticsDataClient) {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });
  }

  return analyticsDataClient;
}

/**
 * Get overview metrics (users, sessions, page views, etc.)
 */
export async function getOverviewMetrics(dateRange: string = '30daysAgo') {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange,
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'sessionsPerUser' },
      ],
    });

    const row = response.rows?.[0];
    if (!row) {
      return {
        totalUsers: 0,
        totalSessions: 0,
        totalPageViews: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        sessionsPerUser: 0,
      };
    }

    return {
      totalUsers: parseInt(row.metricValues?.[0]?.value || '0'),
      totalSessions: parseInt(row.metricValues?.[1]?.value || '0'),
      totalPageViews: parseInt(row.metricValues?.[2]?.value || '0'),
      avgSessionDuration: parseFloat(row.metricValues?.[3]?.value || '0'),
      bounceRate: parseFloat(row.metricValues?.[4]?.value || '0'),
      sessionsPerUser: parseFloat(row.metricValues?.[5]?.value || '0'),
    };
  } catch (error) {
    console.error('Error fetching overview metrics:', error);
    throw error;
  }
}

/**
 * Get traffic sources breakdown
 */
export async function getTrafficSources(dateRange: string = '30daysAgo') {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange,
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    });

    return (
      response.rows?.map((row) => ({
        source: row.dimensionValues?.[0]?.value || 'Unknown',
        sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []
    );
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    throw error;
  }
}

/**
 * Get top pages by views
 */
export async function getTopPages(dateRange: string = '30daysAgo', limit: number = 10) {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange,
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit,
    });

    return (
      response.rows?.map((row) => ({
        title: row.dimensionValues?.[0]?.value || 'Unknown',
        path: row.dimensionValues?.[1]?.value || '/',
        views: parseInt(row.metricValues?.[0]?.value || '0'),
        avgDuration: parseFloat(row.metricValues?.[1]?.value || '0'),
        bounceRate: parseFloat(row.metricValues?.[2]?.value || '0'),
      })) || []
    );
  } catch (error) {
    console.error('Error fetching top pages:', error);
    throw error;
  }
}

/**
 * Get geographic data
 */
export async function getGeographicData(dateRange: string = '30daysAgo', limit: number = 10) {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange,
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit,
    });

    return (
      response.rows?.map((row) => ({
        country: row.dimensionValues?.[0]?.value || 'Unknown',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
        sessions: parseInt(row.metricValues?.[1]?.value || '0'),
      })) || []
    );
  } catch (error) {
    console.error('Error fetching geographic data:', error);
    throw error;
  }
}

/**
 * Get device data
 */
export async function getDeviceData(dateRange: string = '30daysAgo') {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange,
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
    });

    return (
      response.rows?.map((row) => ({
        device: row.dimensionValues?.[0]?.value || 'Unknown',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []
    );
  } catch (error) {
    console.error('Error fetching device data:', error);
    throw error;
  }
}

/**
 * Get daily trend data
 */
export async function getDailyTrend(dateRange: string = '30daysAgo') {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange,
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    return (
      response.rows?.map((row) => ({
        date: row.dimensionValues?.[0]?.value || '',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
        sessions: parseInt(row.metricValues?.[1]?.value || '0'),
        pageViews: parseInt(row.metricValues?.[2]?.value || '0'),
      })) || []
    );
  } catch (error) {
    console.error('Error fetching daily trend:', error);
    throw error;
  }
}

/**
 * Check if GA4 is configured
 */
export function isGA4Configured(): boolean {
  return !!(propertyId && clientEmail && privateKey);
}








