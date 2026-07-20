// backend/promote-admin.js
// CLI tool to create or promote a user to admin role
// Usage: node promote-admin.js <email> <password>
// Example: node promote-admin.js admin@crestafoods.com MySecurePass123

import './loadEnv.js';
import connectDB from './config/db.js';
import User from './models/User.js';
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';

const run = async () => {
  await connectDB();

  const [, , email, password] = process.argv;

  if (!email) {
    console.error('Usage: node promote-admin.js <email> [password]');
    process.exit(1);
  }

  const adminRole = await Role.findOne({ name: 'admin' });
  if (!adminRole) {
    console.error('Admin role not found. Please run: node seed.js first.');
    process.exit(1);
  }

  let user = await User.findOne({ email });

  if (user) {
    // Promote existing user
    user.role = adminRole._id;
    await user.save();
    console.log(`✅ User "${email}" has been promoted to admin`);
  } else {
    // Create new admin user
    if (!password) {
      console.error('Password is required when creating a new user.');
      console.error('Usage: node promote-admin.js <email> <password>');
      process.exit(1);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split('@')[0];
    user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: adminRole._id,
    });
    console.log(`✅ Admin user created: ${email} / username: ${username}`);
  }

  process.exit(0);
};

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
