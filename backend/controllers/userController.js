// backend/controllers/userController.js
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('role', 'name description');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('role', 'name description');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }
  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleDoc = await Role.findOne({ name: role || 'user' });
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleDoc?._id,
    });
    res.status(201).json({ message: 'User created', id: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (role) {
      const roleDoc = await Role.findOne({ name: role });
      if (roleDoc) updates.role = roleDoc._id;
    }

    await User.findByIdAndUpdate(req.params.id, updates);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
