import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js';
export const authRequired = (req, res, next) =>{
  console.log('validando');
  //const cookies = req.headers
  const {token} = req.cookies
  if(!token) return res.status(401).json({message:'No token, authorization denied'});
  jwt.verify(token,SECRET_JWT_KEY,(error,user)=>{
    if(error) return res.status(403).json({message:'Invalid token'});
    req.user = user;
    next();
  })
  //console.log(token);

}