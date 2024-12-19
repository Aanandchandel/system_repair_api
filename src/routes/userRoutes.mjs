import express from 'express';
import userValidator from '../middlewares/validateUserParams.mjs';
import userController from '../controllers/userControllers.mjs';

const router = express.Router();

// User registration route with validation
router.post('/register',userValidator, userController.userRegister);
router.post('/login', userController.userLogin);
export default router;
