import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import {
  validateRegister,
  validateLogin,
  validateUpdateProfile
} from '../middlewares/validationMiddleware.js';
import { uploadFields, uploadToCloudinary } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/refresh', refreshAccessToken);

router.post('/logout', protect, logoutUser);
router.get('/getProfile', protect, getUserProfile);
router.put(
  '/updateProfile',
  protect,
  uploadFields,
  validateUpdateProfile,
  uploadToCloudinary,
  updateUserProfile
);
router.get('/getAllUsers', protect, getAllUsers);
router.get('/getUserById/:id', protect, getUserById);

export default router;
