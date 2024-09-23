import { validateUser } from '../schemas/user.js'
import { UserModel } from '../models/userModel.js'
import { createAccessToken } from '../libs/jwt.js'
import bcrypt from "bcryptjs"
export const register = async (req, res) => {
  const result = validateUser(req.body)
  if (result.error) return res.status(400).json(result.error)

  const resultModel = await UserModel.createUser({ input: result.data })
  if (resultModel !== false) {
    const [{ id, userName, correo }] = resultModel
    console.log('id del usuario: ', id)
    const tk = createAccessToken({ id })
    res.cookie('token', tk)
    return res.json({
      id,
      userName,
      correo,
      token: tk
    })
  }

  return res.send('Error al crear el usuario')
}
export const login = async (req, res) => {
   const { email , password } = req.body
   console.log("email controller: ",email)
   const user = await UserModel.findUser({email})
   if(user !== false){
     const isMatch = await bcrypt.compare(password, user[0].password)
     if(!isMatch) return res.status(400).json({message:'credentials ismatch'})
     const token = createAccessToken({id: user[0].id })
     res.cookie("token",token)
     return res.json({
      id: user[0].id,
      userName: user[0].userName,
      email
     })
   }
   return res.status(400).json({ message:'user not found'})
}

export const logout = (req, res) => {
  res.cookie('token',"",{ expires:
    new Date(0),
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
   const idUser = req.user.id
   const userFound = await UserModel.findUser({idUser})
   if(userFound===false) return res.status(400).json({message:'User not found'})
   
  const [{id, userName, correo}] = userFound
  return res.json({
     id,
     userName,
     email: correo
  })
}
