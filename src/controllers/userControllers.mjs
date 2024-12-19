import userModel from ('../models/userModel.mjs');
import bcrypt from ('bcryptjs')

const userRegister = async(req,res)=>{
  try{
    const {first_name,last_name,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      })
    }

    const user = new User({
      first_name,
      last_name,
      email,
      password:hashPassword
    })

    const userData = await user.save();

    return res.status(200).json({
      success: true,
      message: 'User Registeration Successful';
      user : userData
    })
  }catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}