import express from 'express';
import userController from '../controller/authController.js'
import exerciseTracker from '../controller/exerciseTracker.js';
import authenticateToken from '../middleware/authenticateToken.js';
import upComingEvent from '../controller/upComingEvent.js';
import Caloriesburn from '../controller/Caloriesburn.js';

const router = express.Router();

router.get('/upcomingevents', authenticateToken, upComingEvent.upComingEvents )
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser)
router.post('/exerciserecord',authenticateToken, exerciseTracker.exerciseRecord)
router.get('/caloriesburn', authenticateToken , Caloriesburn.getCaloriesBurned)
router.get('/totalworkouts', authenticateToken, Caloriesburn.totalWorkouts)

export default router;
