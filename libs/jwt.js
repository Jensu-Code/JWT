import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'
export const createAccessToken = (payload) => {
  const token = jwt.sign(payload, SECRET_JWT_KEY, {
    expiresIn: '1d'
  })
  return token
}
