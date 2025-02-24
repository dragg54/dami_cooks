import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email },process.env.SECRET_KEY, { expiresIn: '72h' });
  };