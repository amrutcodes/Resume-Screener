const asyncHandler = require('express-async-handler');
const User = require('../schemas/userSchema');

const userType = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, age } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res.status(409).json({ success: false, msg: 'User already exists' });
  }

  const user = await User.create({ name, email, password, phone, address, age });
  res.status(201).json({ success: true, msg: 'User created', data: user });
});

const findAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).json({ success: false, msg: 'No users found' });
  res.status(200).json({ success: true, msg: 'Users found', data: users });
});

// GET /api/users/getUserCount
const getUserCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json({ count });
});

// GET /api/user/getAllUsers
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json({ success: true, users });
});


const update = asyncHandler(async (req, res) => {
  const { userId, name, email, phone, address, age } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

  await User.updateOne({ _id: userId }, { name, email, phone, address, age });
  res.status(200).json({ success: true, msg: 'User updated successfully' });
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, msg: 'User not found' });

  res.status(200).json({ success: true, msg: 'User deleted successfully', data: deleted });
});

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ success: false, msg: 'All fields are required' });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    let msg = 'User already exists with ';
    if (existingUser.email === email && existingUser.phone === phone) msg += 'email and phone';
    else if (existingUser.email === email) msg += 'email';
    else msg += 'phone';

    return res.status(400).json({ success: false, msg });
  }

  const admin = await User.create({ name, email, phone, password, role: userType.ADMIN });

  res.status(201).json({
    success: true,
    msg: 'Admin account created successfully',
    user: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, msg: 'Email and password are required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

  if (user.password !== password) return res.status(401).json({ success: false, msg: 'Incorrect password' });

  res.status(200).json({
    success: true,
    msg: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, msg: 'User logged out successfully' });
});

module.exports = {
  createUser,
  findAll,
  update,
  deleteUser,
  createAdmin,
  login,
  logout,
  getUserCount,
  getAllUsers
};
