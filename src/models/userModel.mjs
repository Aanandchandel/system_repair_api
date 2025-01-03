import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  valid:{
    type:Boolean,
    required:false
  },
  is_admin: {
    type: Boolean,
    default: false, // Default value is false (regular user)
  },
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);
export default userModel