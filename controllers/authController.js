import { validateUser } from '../schemas/user.js'
import { UserModel } from '../models/userModel.js'
export const register = async (req, res) => {
  const result = validateUser(req.body)
  if (result.error) return res.status(400).json(result.error)

  const resultModel = await UserModel.createUser({ input: result.data })
  if (resultModel !== false) {
    return res.json(resultModel)
  }

  return res.send('Error al crear el usuario')
}
export const login = (req, res) => {}
