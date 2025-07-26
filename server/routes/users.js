const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/users');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/users
// @desc    Get all users (Admin)
// @access  Private/Admin
router.get('/', [auth, admin], userController.getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID (Admin)
// @access  Private/Admin
router.get('/:id', [auth, admin], userController.getUserById);

// @route   PUT /api/users/update
// @desc    Update user profile
// @access  Private
router.put(
  '/update',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail()
    ]
  ],
  userController.updateUser
);

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin)
// @access  Private/Admin
router.delete('/:id', [auth, admin], userController.deleteUser);

module.exports = router;