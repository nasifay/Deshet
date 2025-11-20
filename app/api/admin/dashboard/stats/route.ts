import { NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import User from "~/lib/db/models/User";
import Page from "~/lib/db/models/Page";
import NewsPost from "~/lib/db/models/NewsPost";
import Program from "~/lib/db/models/Program";
import Gallery from "~/lib/db/models/Gallery";
import Booking from "~/lib/db/models/Booking";
import Appointment from "~/lib/db/models/Appointment";
import Product from "~/lib/db/models/Product";
import { getSession } from "~/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch all stats in parallel
    const [
      pagesCount,
      blogCount,
      servicesCount,
      bookingsCount,
      appointmentsCount,
      pendingBookingsCount,
      todayAppointmentsCount,
      upcomingAppointmentsCount,
      productsCount,
      mediaCount,
      usersCount,
      totalViews,
    ] = await Promise.all([
      Page.countDocuments(),
      NewsPost.countDocuments(), // Using NewsPost model for blog (will be renamed later)
      Program.countDocuments(), // Using Program model for services (will be renamed later)
      Booking.countDocuments(),
      Appointment.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Appointment.countDocuments({
        appointmentDate: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: { $ne: "cancelled" },
      }),
      Appointment.countDocuments({
        appointmentDate: { $gte: new Date() },
        status: { $in: ["scheduled", "in-progress"] },
      }),
      Product.countDocuments(),
      Gallery.countDocuments(),
      User.countDocuments(),
      NewsPost.aggregate([
        { $group: { _id: null, total: { $sum: "$views" } } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        pages: pagesCount,
        blog: blogCount,
        services: servicesCount,
        bookings: bookingsCount,
        appointments: appointmentsCount,
        pendingBookings: pendingBookingsCount,
        todayAppointments: todayAppointmentsCount,
        upcomingAppointments: upcomingAppointmentsCount,
        products: productsCount,
        media: mediaCount,
        users: usersCount,
        totalViews: totalViews[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
