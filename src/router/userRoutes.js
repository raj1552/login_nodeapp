const express = require('express');
const userController = require('../controller/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', authenticateUser, userController.loginUser);

module.exports = router;
