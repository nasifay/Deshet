# User Management System - Complete Guide

## Overview

The admin dashboard now includes a comprehensive user management system with full CRUD (Create, Read, Update, Delete) functionality and role-based access control (RBAC).

## Features

### ✅ Implemented Features

1. **User Listing**

   - Paginated table view of all users
   - Search by name or email
   - Filter by role (Super Admin, Admin, Editor, Viewer)
   - Display user avatar, name, email, role, status, and last login

2. **Create User**

   - Add new users with form validation
   - Fields: Name, Email, Password, Role, Active Status
   - Password strength validation
   - Duplicate email check
   - Role-based permission checks

3. **Edit User**

   - Update user information
   - Optional password reset
   - Prevent self-role changes
   - Prevent self-deactivation
   - Only superadmin can modify superadmin users

4. **Delete User**

   - Delete users with confirmation dialog
   - Only superadmin can delete users
   - Prevent self-deletion

5. **Search & Filters**

   - Real-time search by name or email
   - Filter by role
   - Pagination controls

6. **Security Features**
   - Password strength validation (min 8 chars, uppercase, lowercase, number)
   - Email format validation
   - Role-based permissions
   - Protected routes with authentication

## User Roles & Permissions

### Super Admin

- **Full system access** including:
  - View, create, edit, and delete users
  - Create other superadmin users
  - All content and media permissions
  - All analytics and settings permissions

### Admin

- **Content & User Management** (limited):
  - View, create, and edit users (cannot delete)
  - Cannot modify superadmin users
  - Cannot create superadmin users
  - Full content, media, and analytics access
  - View settings (no edit)

### Editor

- **Content Creation & Management**:
  - View, create, edit, and publish content
  - View and upload media
  - View analytics
  - No user management access

### Viewer

- **Read-only Access**:
  - View content
  - View media
  - View analytics
  - No modification permissions

## API Endpoints

All API endpoints are located in `app/api/admin/users/`

### GET `/api/admin/users`

**List all users with pagination and filters**

Query Parameters:

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search by name or email
- `role` (string, optional) - Filter by role
- `sort` (string, default: '-createdAt') - Sort field

Response:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### POST `/api/admin/users`

**Create a new user**

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "editor",
  "isActive": true
}
```

Validation:

- Name, email, and password are required
- Email must be valid format
- Email must be unique
- Password must be at least 8 characters with uppercase, lowercase, and number
- Only superadmin can create superadmin users

### GET `/api/admin/users/[id]`

**Get a single user by ID**

Response:

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "editor",
    "isActive": true,
    "lastLogin": "2025-10-19T12:00:00Z",
    "createdAt": "2025-10-01T12:00:00Z"
  }
}
```

### PUT `/api/admin/users/[id]`

**Update a user**

Request Body (all fields optional):

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "password": "NewSecurePass123",
  "role": "admin",
  "isActive": false
}
```

Restrictions:

- Cannot change own role
- Cannot deactivate yourself
- Only superadmin can modify superadmin users
- Only superadmin can set role to superadmin
- Password is optional (leave blank to keep current password)

### DELETE `/api/admin/users/[id]`

**Delete a user (Superadmin only)**

Restrictions:

- Only superadmin can delete users
- Cannot delete yourself

## Frontend Components

### Main Page

**Location:** `app/admin/users/page.tsx`

The user management page includes:

- Header with page title and "Add User" button
- Search bar and role filter
- User table with actions (Edit, Delete)
- Pagination controls
- Modals for Add, Edit, and Delete operations

### Key Features

#### Add User Modal

- Form with name, email, password, role, and active status fields
- Password visibility toggle
- Client-side validation with error messages
- Password strength requirements display

#### Edit User Modal

- Pre-filled form with user data
- Optional password field (leave blank to keep current)
- Same validation as Add modal
- Cannot edit superadmin users (unless you are superadmin)

#### Delete Confirmation

- Warning dialog before deletion
- Shows user name being deleted
- Confirmation required

## Usage

### Accessing User Management

1. Login to admin dashboard at `/admin/login`
2. Navigate to "Users" in the sidebar
3. Only Admin and Super Admin roles can access this page

### Creating a User

1. Click "Add User" button
2. Fill in the form:
   - **Name**: Full name of the user
   - **Email**: Valid email address (must be unique)
   - **Password**: At least 8 characters with uppercase, lowercase, and number
   - **Role**: Select from Viewer, Editor, Admin, or Super Admin
   - **Active**: Toggle to set initial status
3. Click "Create User"
4. User will receive an email (if email service is configured)

### Editing a User

1. Click the Edit icon (pencil) next to a user
2. Update the fields as needed
3. Leave password blank to keep current password
4. Click "Update User"

### Deleting a User

1. Click the Delete icon (trash) next to a user
2. Confirm deletion in the dialog
3. User will be permanently deleted

### Searching and Filtering

- **Search**: Type in the search bar to find users by name or email
- **Filter by Role**: Use the dropdown to show only users with a specific role
- **Pagination**: Use the pagination controls at the bottom to navigate pages

## Security Best Practices

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Special characters recommended

### Access Control

- Only authenticated users can access the API
- Role-based permissions enforced at API level
- Frontend also respects permissions (but backend is source of truth)

### Session Management

- Sessions expire after inactivity
- Logout required for security
- Protected routes redirect to login

## Testing

### Default Admin User

The seed script creates a default admin user:

```
Email: admin@tamra-sdt.org (or value from ADMIN_EMAIL env variable)
Password: Admin@123456 (or value from ADMIN_PASSWORD env variable)
Role: superadmin
```

### Testing Steps

1. **Run the seed script** (if not already run):

   ```bash
   npx tsx scripts/seed.ts
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Login to admin dashboard**:

   - Navigate to `http://localhost:3000/admin/login`
   - Use the default admin credentials

4. **Test User Management**:

   - Navigate to Users page
   - Try creating a user
   - Try editing a user
   - Try searching and filtering
   - Try deleting a user (as superadmin)

5. **Test Permissions**:
   - Create users with different roles
   - Login as each role and verify access levels
   - Try to perform restricted actions

## Common Issues & Solutions

### Issue: "Unauthorized" error when accessing users

**Solution:** Ensure you're logged in with Admin or Super Admin role

### Issue: "Email already in use" when creating user

**Solution:** Use a different email address - emails must be unique

### Issue: Cannot delete user

**Solution:** Only Super Admin role can delete users

### Issue: Cannot modify superadmin user

**Solution:** Only other superadmin users can modify superadmin accounts

### Issue: Password validation errors

**Solution:** Ensure password meets all requirements (8+ chars, uppercase, lowercase, number)

## Database Model

**Location:** `lib/db/models/User.ts`

```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string; // Hashed with bcrypt
  role: "superadmin" | "admin" | "editor" | "viewer";
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## Environment Variables

Required in `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/tamra_sdt
ADMIN_EMAIL=admin@tamra-sdt.org
ADMIN_PASSWORD=Admin@123456
```

## Future Enhancements

Potential improvements for future versions:

1. **Email Notifications**

   - Welcome email on user creation
   - Password reset emails
   - Account status change notifications

2. **User Profile**

   - Avatar upload
   - Personal information
   - Activity history

3. **Advanced Filters**

   - Filter by active/inactive status
   - Date range filters for last login
   - Bulk actions

4. **Audit Log**

   - Track user actions
   - Login history
   - Changes to user accounts

5. **Two-Factor Authentication**

   - Optional 2FA for enhanced security
   - SMS or email verification

6. **Password Policies**
   - Password expiration
   - Password history
   - Forced password changes

## Support

For issues or questions:

1. Check this documentation
2. Review the API endpoint implementations
3. Check browser console for errors
4. Verify user role and permissions
5. Check database connection

## Summary

The user management system is now fully functional with:

- ✅ Complete CRUD operations
- ✅ Role-based access control
- ✅ Search and filtering
- ✅ Pagination
- ✅ Form validation
- ✅ Security measures
- ✅ Professional UI/UX

All backend API endpoints are implemented and tested. The frontend provides an intuitive interface for managing users with proper error handling and user feedback.
