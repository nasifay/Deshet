import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import User from '~/lib/db/models/User';
import { hashPassword, validatePasswordStrength } from '~/lib/auth/password';
import { getSession } from '~/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    // Check if requester is authenticated and has admin role
    const session = await getSession();

    if (!session || !['admin', 'superadmin'].includes(session.role)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const { name, email, password, role = 'viewer' } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.errors[0] },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}








