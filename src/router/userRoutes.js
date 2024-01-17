import express from 'express';
import userController from '../controller/authController.js'
import exerciseTracker from '../controller/exerciseTracker.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser)
router.post('/exerciserecord',authenticateToken, exerciseTracker.exerciseRecord)

export default router;
