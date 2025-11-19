import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';
import { hashPassword, validatePasswordStrength } from '~/lib/auth/password';

// GET - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !['admin', 'superadmin'].includes(session.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();

    const { id } = await params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !['admin', 'superadmin'].includes(session.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { name, email, password, role, isActive } = body;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Prevent users from editing themselves (role or active status)
    if (id === session.userId) {
      if (role && role !== user.role) {
        return NextResponse.json(
          { success: false, error: 'You cannot change your own role' },
          { status: 403 }
        );
      }
      if (isActive === false) {
        return NextResponse.json(
          { success: false, error: 'You cannot deactivate yourself' },
          { status: 403 }
        );
      }
    }

    // Only superadmin can modify superadmin users
    if (user.role === 'superadmin' && session.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Only superadmins can modify superadmin users' },
        { status: 403 }
      );
    }

    // Only superadmin can set role to superadmin
    if (role === 'superadmin' && session.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Only superadmins can create superadmin users' },
        { status: 403 }
      );
    }

    // Update fields
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Email already in use' },
          { status: 409 }
        );
      }
      user.email = email;
    }
    if (password) {
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        return NextResponse.json(
          { success: false, error: passwordValidation.errors[0] },
          { status: 400 }
        );
      }
      user.password = await hashPassword(password);
    }
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    const updatedUser = await User.findById(id).select('-password');

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    // Only superadmin can delete users
    if (!session || session.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Only superadmins can delete users' },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Prevent users from deleting themselves
    if (id === session.userId) {
      return NextResponse.json(
        { success: false, error: 'You cannot delete yourself' },
        { status: 403 }
      );
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}








