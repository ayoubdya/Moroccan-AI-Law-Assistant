const bcrypt = require('bcrypt');

/**
 * User Controller for handling user operations
 */

/**
 * Get all users (admin only)
 */
exports.getAllUsers = async (req, res) => {
  try {
    // Get all users with limited fields for security
    const users = await req.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        _count: {
          select: { chatSessions: true }
        }
      }
    });
    
    res.json({
      status: 'success',
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve users',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get user by ID
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find user with limited fields for security
    const user = await req.prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        _count: {
          select: { chatSessions: true }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Update user profile
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;
    
    // Check if user exists
    const existingUser = await req.prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    // Check if email is being changed and already exists
    if (email && email !== existingUser.email) {
      const emailExists = await req.prisma.user.findUnique({
        where: { email }
      });
      
      if (emailExists) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already in use'
        });
      }
    }
    
    // Update user
    const updatedUser = await req.prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        fullName: fullName || existingUser.fullName,
        email: email || existingUser.email
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true
      }
    });
    
    res.json({
      status: 'success',
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Change user password
 */
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password and new password are required'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must be at least 6 characters long'
      });
    }
    
    // Check if user exists
    const user = await req.prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    
    // Update password
    await req.prisma.user.update({
      where: { id: parseInt(id) },
      data: { passwordHash }
    });
    
    res.json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to change password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Delete user account
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await req.prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    // Delete user (cascade will delete related records)
    await req.prisma.user.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({
      status: 'success',
      message: 'User account deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get current authenticated user
 */
exports.getCurrentUser = async (req, res) => {
  try {
    // The user ID comes from the auth middleware
    const userId = req.user.id;
    
    // Get user with limited fields for security
    const user = await req.prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        _count: {
          select: { chatSessions: true }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve current user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
