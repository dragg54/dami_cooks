import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import dotenv  from 'dotenv'

dotenv.config()
export const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;
  if(!token){
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

