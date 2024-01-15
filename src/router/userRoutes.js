import express from 'express';
import userController from '../controller/authController.js'

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
