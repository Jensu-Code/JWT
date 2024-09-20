import { conect } from '../db/conexion.js'
import bcrypt from 'bcryptjs'
const c = await conect()

export class UserModel {
  static async createUser ({ input }) {
    try {
      const { userName, email, password } = input
      const passwordHash = await bcrypt.hash(password, 10)
      const [userResult] = await c.query(
        'insert into users(userName, correo, password) values(?,?,?)',
        [userName, email, passwordHash]
      )
      if (userResult.affectedRows > 0) {
        const [userData] = await c.query(
          'select bin_to_uuid(id) as id, userName, correo from users where userName = ?',
          [userName]
        )
        console.log(userData)
        return userData
      }

      return false
      // console.log(userResult);
    } catch (e) {
      console.error(e)
    }
  }
}
