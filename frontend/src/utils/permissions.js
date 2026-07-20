// frontend/src/utils/permissions.js
/**
 * Check if the user has a specific permission.
 * Admins always have all permissions.
 */
export const hasPermission = (user, permission) => {
  if (!permission) return true;
  if (!user) return false;
  if (user.role === 'admin') return true;
  return (user.permissions || []).includes(permission);
};
