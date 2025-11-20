import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import User from "~/lib/db/models/User";
import { comparePassword } from "~/lib/auth/password";
import { generateToken, generateRefreshToken } from "~/lib/auth/jwt";
import { setAuthCookies } from "~/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user with password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "Account is deactivated" },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = await generateToken(tokenPayload);
    const refreshToken = await generateRefreshToken(tokenPayload);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
    });

    // Set cookies on the response
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    response.cookies.set("admin_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Provide more detailed error information in development
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? "Internal server error" 
      : error.message || "Internal server error";
    
    // Check for specific error types
    if (error.message?.includes('MongoServerError') || error.message?.includes('MongoNetworkError')) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Database connection failed. Please check MONGODB_URI environment variable.",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }
    
    if (error.message?.includes('JWT') || error.message?.includes('secret')) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Authentication configuration error. Please check JWT_SECRET environment variable.",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
