import userModel from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {
  // Method for user registration
  async userRegister(req, res) {
    try {
      const { first_name, last_name, email, password,phone_no } = req.body;

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
        phone_no
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
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });}
      if (!password) {
        return res.status(400).json({
          success: false,
          message: ' password is required',
        });
      }

      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.TOKEN_SECRET, // Ensure you have this in your .env file
        { expiresIn: '1h' } // Token expiry
      );

      // Send the response with the user data and token
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          token, // The JWT token
        },
      });
    } catch (error) {
      console.error('Error during user login:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}
export default new UserController();
