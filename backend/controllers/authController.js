// backend/controllers/authController.js
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ message: 'User with this email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleDoc = await Role.findOne({ name: role || 'user' });

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleDoc?._id,
    });

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email }).populate({
      path: 'role',
      populate: { path: 'permissions' },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id, role: user.role?.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const permissions = (user.role?.permissions || []).map((p) => p.slug);

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role?.name,
      permissions,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate({ path: 'role', populate: { path: 'permissions' } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const permissions = (user.role?.permissions || []).map((p) => p.slug);
    res.json({ ...user.toObject(), permissions });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};
