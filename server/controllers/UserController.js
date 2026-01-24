import db from '../configs/db.js';
import * as userService from '../services/UserService.js'

export const createUser = async (req, res) => {
  const transaction = await db.transaction()
    try {
        const user = await userService.createUser(req, transaction);
        await transaction.commit()
        res.status(201).json("user created");
    } catch (error) {
      await transaction.rollback()
      console.log(error)
        res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
        );
    }
};

export const loginUser = async (req, res) => {
  const transaction = await db.transaction()
    try {
      const user = await userService.loginUser(req)
      res.cookie('token', user.token, {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
      }).send(user)
    }
    catch (error) {
      console.log(error.message)
      res.status(error.statusCode || 500).json(error.message || "Internal server error")
    }
  }

  export const getAdmin = async(req, res) =>{
    try {
      const admin = await userService.getAdmin(req)
       res.json(admin)
    }
    catch (error) {
      console.log(error.message)
      res.status(error.statusCode || 500).json(error.message || "Internal server error")
    }
  }

  export const updateUser = async(req, res) =>{
    try {
       await userService.updateUser(req)
       res.json("User updated")
    }
    catch (error) {
      console.log(error.message)
      res.status(error.statusCode || 500).json(error.message || "Internal server error")
    }
  }

  export const changePassword = async(req, res) =>{
    try {
       await userService.changePassword(req)
       res.json("User password updated")
    }
    catch (error) {
      console.log(error)
      res.status(error.statusCode || 500).json(error.message || "Internal server error")
    }
  }

export const verifyEmail = async (req, res) => {
  try {
    await userService.verifyEmail(req)
    res.json("Verification email sent")
  }
  catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json(error.message || "Internal server error")
  }
}

export const resendEmailVerification = async (req, res) => {
  try {
    await userService.resentVerificationEmail(req)
    res.json("Verification email resent")
  }
  catch(error) {
    console.log(error)
    res.status(error.statusCode || 500).json(error.message || "Internal server error")
  }
}

export const forgotPassword = async (req, res) => {
  try {
    await userService.forgotPassword(req)
    res.json("Reset password link email resent")
  }
  catch(error) {
    console.log(error)
    res.status(error.statusCode || 500).json(error.message || "Internal server error")
  }
}

export const resetPassword = async (req, res) => {
  try {
    await userService.resetPassword(req)
    res.json("Reset password successful")
  }
  catch(error) {
    console.log(error)
    res.status(error.statusCode || 500).json(error.message || "Internal server error")
  }
}


