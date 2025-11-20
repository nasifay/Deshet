import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import SiteSettings from "~/lib/db/models/SiteSettings";

// GET - Get public footer data
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get site settings
    const siteSettings = await SiteSettings.findOne();

    if (!siteSettings || !siteSettings.footer) {
      return NextResponse.json({
        success: true,
        data: {
          socialLinks: [],
          whatsappNumber: "",
          termsAndConditions: { fileUrl: "", fileName: "" },
          privacyPolicy: { fileUrl: "", fileName: "" },
          contactInfo: {
            email: "yohansshefraw@gmail.com",
            address: "ገርጂ ዮኒቲ ዮኒቨርስቲ ከብርቲሽ ት/ቤት ወረድ ብሎ ደሸት",
            phone: "+251 902474828, +251 91 147 1783",
          },
          keyFunders: [],
          networks: [],
        },
      });
    }

    // Filter only active social links
    const activeSocialLinks = siteSettings.footer.socialLinks.filter(
      (link: any) => link.isActive
    );

    return NextResponse.json({
      success: true,
      data: {
        ...siteSettings.footer,
        socialLinks: activeSocialLinks,
      },
    });
  } catch (error) {
    console.error("Error fetching public footer data:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
