import express from 'express';
import UserValidator from '../middlewares/validateUserParams.mjs';
import UserController from '../controllers/userControllers.mjs';

const router = express.Router();

// User registration route with validation
router.post('/register', UserValidator.validateParams, UserController.register);

export default router;
