const userModels = require('../models/userModels')
const bcrypt = require('bcryptjs')

// GET USER
const getUserController = async (req, res) => {
  try {
    const user = await userModels.findById({ _id: req.body.id }, { _id: 0 })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User does not exist',
      })
    }

    // hide password
    user.password = undefined

    res.status(200).send({
      success: true,
      message: 'User Successfully gotten',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error User Not Found',
    })
  }
}

// UPDATE USER DETAILS
const updateUser = async (req, res) => {
  try {
    const user = await userModels.findById({ _id: req.body.id })
    // validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'User not found',
      })
    }

    const { userName, address, phone } = req.body
    if (userName) user.userName = userName
    if (address) user.address = address
    if (phone) user.phone = phone

    await user.save()
    user.password = undefined
    res.status(200).send({
      success: true,
      message: 'User Update Successfuly',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Update API',
    })
  }
}

// UPDATE USER PASSWORD
const updatePassword = async (req, res) => {
  try {
    const user = await userModels.findById({ _id: req.body.id })
    if (!user) {
      res.status(401).send({
        success: false,
        message: 'User not found',
      })
    }

    // Get old password and New Password
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
      res.status(401).send({
        success: false,
        message: 'Old Password and New Password is required',
      })
    }

    // CHeck user password
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: 'Wrong Password',
      })
    }
    // Hash New Password
    var salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    user.save()
    res.status(200).send({
      success: true,
      message: 'Password Update Successful',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in update Password API',
    })
  }
}

// Delete User Profile
const mongoose = require('mongoose')

const deleteUser = async (req, res) => {
  const { id } = req.params

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      success: false,
      message: 'Invalid user ID format',
    })
  }
  try {
    // Attempt to delete the user by ID
    const deletedUser = await userModels.findByIdAndDelete(id)
    // If no user is found, return a 404 response
    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      })
    }
    //  Return success message if the user was deleted
    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error(error) // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message: 'Error in Delete API',
    })
  }
}

module.exports = { getUserController, updateUser, updatePassword, deleteUser }
