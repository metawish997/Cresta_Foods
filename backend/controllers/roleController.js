// backend/controllers/roleController.js
import Role from '../models/Role.js';
import Permission from '../models/Permission.js';

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions', 'name slug');
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching roles', error: err.message });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ slug: 1 });
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching permissions', error: err.message });
  }
};

export const createRole = async (req, res) => {
  const { name, description, permissions } = req.body;
  if (!name) return res.status(400).json({ message: 'Role name is required' });
  try {
    const existing = await Role.findOne({ name });
    if (existing) return res.status(409).json({ message: 'Role already exists' });

    const role = await Role.create({ name, description, permissions: permissions || [] });
    res.status(201).json({ message: 'Role created', id: role._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating role', error: err.message });
  }
};

export const updateRole = async (req, res) => {
  const { name, description, permissions } = req.body;
  try {
    await Role.findByIdAndUpdate(req.params.id, { name, description, permissions });
    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating role', error: err.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting role', error: err.message });
  }
};
