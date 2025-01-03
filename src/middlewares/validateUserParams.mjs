
const uservalidateparams = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone_no } = req.body;
    console.log(req.body);

    // Validation using regex
    const nameRegex = /^[a-zA-Z]{2,30}$/; // Only letters, 2-30 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least 1 letter and 1 number
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format for international phone numbers (+country_code followed by digits)

    if (!first_name || !last_name || !email || !password || !phone_no) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
      return res.status(400).json({
        success: false,
        message: 'Names must be alphabetic and 2-30 characters long',
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Password must be at least 8 characters long, with at least one letter and one number',
    //   });
    // }

    // Validate phone number
    if (!phoneRegex.test(phone_no)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. It should be in international format (e.g., +1234567890).',
      });
    }

    next()
  } catch (err) {
    console.log(err)
    const error = new Error
    error.statusCode = 500;
    error.status = "faild to validate"
    error.message = err
    next(error);
  }
};

export default uservalidateparams;
