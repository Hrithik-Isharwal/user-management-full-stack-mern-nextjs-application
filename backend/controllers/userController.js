const User = require('../models/users');

// Fetch a paginated list of users
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const { count, rows: users } = await User.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      totalUsers: count,
      totalPages: Math.ceil(count / perPage),
      currentPage: parseInt(page),
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Fetch All Users (without pagination limit)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching all users:', error);
    return res.status(500).json({ error: 'Failed to fetch all users' });
  }
};

// Fetch a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      avatar,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, role, avatar } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      avatar,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};