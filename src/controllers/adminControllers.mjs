import userModel from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/userModel.js";

const createAdmin = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if user already exists
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash the password
    const bcrypt = await import("bcryptjs");
    const hashPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new User({
      first_name,
      last_name,
      email,
      password: hashPassword,
      is_admin: true, // Explicitly set is_admin to true
    });

    const savedAdmin = await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: {
        id: savedAdmin._id,
        first_name: savedAdmin.first_name,
        last_name: savedAdmin.last_name,
        email: savedAdmin.email,
        is_admin: savedAdmin.is_admin,
      },
    });
  } catch (error) {
    console.error("Error creating admin:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
