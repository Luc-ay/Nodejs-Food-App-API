const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

// register route
const authRegisterUser = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body
    if (!userName || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide all Fields',
      })
    }
    // CHECK FOR EXISTING USER
    const existing = await userModel.findOne({ email })
    if (existing) {
      return res.status(500).send({
        success: false,
        message: 'Email already Exist Please Login',
      })
    }

    var salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //    CREATE NEW USER
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
    })
    res.status(200).send({
      success: true,
      message: 'Registeration Successful, Welcome',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Register API',
      error,
    })
  }
}

// Login Route
const authLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: 'Input Email and Password',
      })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(500).send({
        Success: false,
        Message: 'Email Does not exist',
      })
    }

    // CHeck user password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: 'Wrong Password',
      })
    }

    // token check
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    user.password = undefined
    res.status(200).send({
      success: true,
      message: 'Welcome to your Dashboard',
      token,
      user,
    })
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: 'Error From Login API',
        error,
      })
  }
}

module.exports = { authRegisterUser, authLoginUser }
