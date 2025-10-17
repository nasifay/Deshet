import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import SiteSettings from "~/lib/db/models/SiteSettings";
import { getSession } from "~/lib/auth/session";

// GET - Get footer settings
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get or create site settings
    let siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      // Create default site settings with footer data
      siteSettings = await SiteSettings.create({
        footer: {
          socialLinks: [
            { platform: "Facebook", url: "", icon: "Facebook", isActive: true },
            {
              platform: "Instagram",
              url: "",
              icon: "Instagram",
              isActive: true,
            },
            { platform: "TikTok", url: "", icon: "Music4", isActive: true },
            { platform: "LinkedIn", url: "", icon: "Linkedin", isActive: true },
            { platform: "Twitter", url: "", icon: "Twitter", isActive: true },
          ],
          whatsappNumber: "",
          termsAndConditions: { fileUrl: "", fileName: "" },
          privacyPolicy: { fileUrl: "", fileName: "" },
          contactInfo: {
            email: "TSD@ngo.com",
            address:
              "Friendship Business Center, 7th Floor, Bole, Addis Ababa, Ethiopia",
            phone: "",
          },
          keyFunders: [
            { name: "NCA" },
            { name: "YNSD" },
            { name: "CRVPF" },
            { name: "PEPFAR" },
            { name: "Sonke Gender Justice" },
          ],
          networks: [
            { name: "CCRDA" },
            { name: "CORHA" },
            { name: "PHE Ethiopia" },
            { name: "Men Engage Ethiopia" },
            { name: "Ubuntu Youth Peace Alliance" },
            { name: "Ethiopian Civil Societies Council" },
          ],
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: siteSettings.footer,
    });
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update footer settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Get or create site settings
    let siteSettings = await SiteSettings.findOne();

    if (!siteSettings) {
      siteSettings = await SiteSettings.create({});
    }

    // Update footer settings
    siteSettings.footer = {
      ...siteSettings.footer,
      ...body,
    };

    await siteSettings.save();

    return NextResponse.json({
      success: true,
      message: "Footer settings updated successfully",
      data: siteSettings.footer,
    });
  } catch (error) {
    console.error("Error updating footer settings:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
