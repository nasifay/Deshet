import { NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';

/**
 * Health check endpoint to verify environment and database connectivity
 * This helps diagnose deployment issues
 */
export async function GET() {
  const health: {
    status: 'ok' | 'error';
    timestamp: string;
    environment: {
      nodeEnv: string;
      hasMongoUri: boolean;
      hasJwtSecret: boolean;
    };
    database: {
      connected: boolean;
      error?: string;
    };
  } = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'unknown',
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
    },
    database: {
      connected: false,
    },
  };

  // Check database connection
  try {
    await connectDB();
    health.database.connected = true;
  } catch (error: any) {
    health.status = 'error';
    health.database.error = error.message || 'Database connection failed';
  }

  // Check if critical environment variables are missing
  if (!health.environment.hasMongoUri || !health.environment.hasJwtSecret) {
    health.status = 'error';
  }

  return NextResponse.json(health, {
    status: health.status === 'ok' ? 200 : 500,
  });
}

