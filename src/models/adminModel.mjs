import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    enum: ["jacklinuxnd@gmail.com"]
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })