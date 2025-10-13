import { type UserRole } from '../db/models/User';

export type Permission =
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'content.view'
  | 'content.create'
  | 'content.edit'
  | 'content.delete'
  | 'content.publish'
  | 'media.view'
  | 'media.upload'
  | 'media.delete'
  | 'analytics.view'
  | 'settings.view'
  | 'settings.edit';

/**
 * Role to permissions mapping
 */
export const rolePermissions: Record<UserRole, Permission[]> = {
  superadmin: [
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'content.view',
    'content.create',
    'content.edit',
    'content.delete',
    'content.publish',
    'media.view',
    'media.upload',
    'media.delete',
    'analytics.view',
    'settings.view',
    'settings.edit',
  ],
  admin: [
    'users.view',
    'users.create',
    'users.edit',
    'content.view',
    'content.create',
    'content.edit',
    'content.delete',
    'content.publish',
    'media.view',
    'media.upload',
    'media.delete',
    'analytics.view',
    'settings.view',
  ],
  editor: [
    'content.view',
    'content.create',
    'content.edit',
    'content.publish',
    'media.view',
    'media.upload',
    'analytics.view',
  ],
  viewer: ['content.view', 'media.view', 'analytics.view'],
};

/**
 * Check if role has permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.includes(permission);
}

/**
 * Check if role has any of the permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/**
 * Check if role has all permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}








