// backend/routes/roles.js
import express from 'express';
import {
  getAllRoles, getAllPermissions, createRole, updateRole, deleteRole
} from '../controllers/roleController.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// GET permissions list — used by admin UI to assign perms
router.get('/permissions', [verifyToken, checkPermission('manage_roles')], getAllPermissions);

// All role routes
router.get('/', [verifyToken, checkPermission('manage_roles')], getAllRoles);
router.post('/', [verifyToken, checkPermission('manage_roles')], createRole);
router.put('/:id', [verifyToken, checkPermission('manage_roles')], updateRole);
router.delete('/:id', [verifyToken, checkPermission('manage_roles')], deleteRole);

export default router;
