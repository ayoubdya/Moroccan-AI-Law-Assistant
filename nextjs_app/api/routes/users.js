const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');

// User profile routes
router.get('/me', auth, userController.getCurrentUser);

// TODO: Implement user's chat sessions route once the chatController is fully implemented
// router.get('/me/sessions', auth, chatController.getUserSessions);

// User CRUD operations
router.put('/:id', auth, userController.updateUser);
router.post('/:id/change-password', auth, userController.changePassword);
router.delete('/:id', auth, userController.deleteUser);

// Admin route - get all users
router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);

module.exports = router;
