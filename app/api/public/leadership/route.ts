import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import SiteSettings from "~/lib/db/models/SiteSettings";

// GET - Public endpoint to fetch leadership/team members
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'leadership' or 'team_member' or null for all

    const settings = await SiteSettings.findOne().lean();

    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Site settings not found" },
        { status: 404 }
      );
    }

    // Filter leadership by type if specified
    let members = settings.leadership || [];

    if (type === "leadership") {
      members = members.filter((member: any) => member.type === "leadership");
    } else if (type === "team_member") {
      members = members.filter((member: any) => member.type === "team_member");
    }

    // Sort by order
    members = members.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

    return NextResponse.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error("Error fetching leadership/team members:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
