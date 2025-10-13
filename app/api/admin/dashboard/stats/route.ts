import { NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import User from '~/lib/db/models/User';
import Page from '~/lib/db/models/Page';
import NewsPost from '~/lib/db/models/NewsPost';
import Program from '~/lib/db/models/Program';
import Media from '~/lib/db/models/Media';
import { getSession } from '~/lib/auth/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Fetch all stats in parallel
    const [pagesCount, newsCount, programsCount, mediaCount, usersCount, totalViews] =
      await Promise.all([
        Page.countDocuments(),
        NewsPost.countDocuments(),
        Program.countDocuments(),
        Media.countDocuments(),
        User.countDocuments(),
        NewsPost.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        pages: pagesCount,
        news: newsCount,
        programs: programsCount,
        media: mediaCount,
        users: usersCount,
        totalViews: totalViews[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}








