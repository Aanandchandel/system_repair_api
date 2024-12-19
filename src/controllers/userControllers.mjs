import userModel from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';

class UserController {
  // Method for user registration
  async register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      // Check if email already exists
      const isExist = await userModel.findOne({ email });
      if (isExist) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = new userModel({
        first_name,
        last_name,
        email,
        password: hashPassword,
      });

      const userData = await user.save();

      // Return success response without exposing sensitive data
      return res.status(201).json({
        success: true,
        message: 'User registration successful',
        user: {
          id: userData._id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
        },
      });
    } catch (error) {
      console.error('Error during user registration:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}

export default new UserController();
