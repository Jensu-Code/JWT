import { Connection } from "../db/conexion.js";
import bcrypt from "bcryptjs";

const c = await Connection.getConnection();
export class UserModel {
  static async createUser({ input }) {
    try {
      const { userName, email, password } = input;
      const [duplicateUser]= await c.query('select * from users where correo=? or userName=?',[email,userName])
      if(duplicateUser.length == 0){
        const passwordHash = await bcrypt.hash(password, 10);
        const [userResult] = await c.query(
          "insert into users(userName, correo, password) values(?,?,?)",
          [userName, email, passwordHash]
        );
        if (userResult.affectedRows > 0) {
          const [userData] = await c.query(
            "select bin_to_uuid(id) as id, userName, correo from users where userName = ?",
            [userName]
          );
          console.log("datos guardados: ", userData);
          return userData;
        }
      }
      return false;
      // console.log(userResult);
    } catch (e) {
      console.error(e);
    }
  }
  static async findUser({ email, idUser = null }) {
    try {
      if (idUser) {
        const [dataId] = await c.query(`select uuid_to_bin(?) as id`, [idUser]);
        const [{ id }] = dataId;
        const [userBYid] = await c.query(
          `select bin_to_uuid(id) as id, userName, correo from users where id = ?`,
          [id]
        );
        if (userBYid.length > 0) return userBYid;
      } else {
        const [user] = await c.query(
          `select bin_to_uuid(id) as id, userName, password from users where correo = ?`,
          [email]
        );
        if (user.length > 0) return user;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }
}
