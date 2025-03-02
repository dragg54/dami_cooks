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
        res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
        );
    }
};

export const loginUser = async (req, res) => {
    try {
      const user = await userService.loginUser(req.body)
      res.cookie('token', user.token, {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
      }).send(user)
    }
    catch (error) {
      res.status(error.statusCode || 500).json(error.message || "Internal server error")
    }
  }