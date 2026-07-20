// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized — invalid or expired token' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.userRole)) {
    return res.status(403).json({ message: 'Insufficient role' });
  }
  next();
};

export const checkPermission = (requiredPermissions) => {
  const required = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  return async (req, res, next) => {
    try {
      // Admin bypasses all permission checks
      if (req.userRole === 'admin') return next();

      const user = await User.findById(req.userId).populate({
        path: 'role',
        populate: { path: 'permissions' },
      });

      const permSet = new Set(
        (user?.role?.permissions || []).map((p) => p.slug)
      );
      const hasAll = required.every((slug) => permSet.has(slug));

      if (!hasAll) {
        return res.status(403).json({ message: 'Missing required permission' });
      }
      req.userPermissions = [...permSet];
      next();
    } catch (err) {
      res.status(500).json({ message: 'Permission check failed', error: err.message });
    }
  };
};
