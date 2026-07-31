// backend/update-password.js
// CLI tool to update a user's password
// Usage: node update-password.js <email> <password>
// Example: node update-password.js metawish@gmail.com 11111111

import './loadEnv.js';
import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const run = async () => {
  await connectDB();

  const [, , email, password] = process.argv;

  if (!email) {
    console.error('Usage: node update-password.js <email> <password>');
    process.exit(1);
  }

  if (!password) {
    console.error('Password is required.');
    console.error('Usage: node update-password.js <email> <password>');
    process.exit(1);
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.log('❌ User not found:', email);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  await user.save();

  console.log('✅ Password updated successfully.');
  console.log('Email:', email);

  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
