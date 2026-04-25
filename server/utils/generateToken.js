import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { randomUUID } from 'crypto';

dotenv.config()

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '5h' });
  };