import { UserModel } from "../models/userModel.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config.js";
export const register = async (req, res) => {
  // if (result.error) return res.status(400).json({errors:result.error.issues.map(error => error.message)})

  const resultModel = await UserModel.createUser({ input: req.body });
  if (resultModel !== false) {
    const [{ id, userName, correo }] = resultModel;
    console.log("id del usuario: ", id);
    const tk = createAccessToken({ id });
    res.cookie("token", tk);
    return res.json({
      id,
      userName,
      correo,
      token: tk,
    });
  } else {
    return res
      .status(400)
      .json({ errors: ["Ya existe un usuario con esas credenciales"] });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email controller: ", email);
  const user = await UserModel.findUser({ email });
  if (user !== false) {
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(400).json({ errors: "Password invalido" });
    const token = createAccessToken({ id: user[0].id });
    res.cookie("token", token, {
      sameSite: "none", //aca estamos deciendo que no estamos en el mismo domi
      secure: true,
      httpOnly: false,
      maxAge: 3600000,
    });
    return res.json({
      id: user[0].id,
      userName: user[0].userName,
      email,
    });
  }
  return res.status(400).json({ errors: "user not found" });
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const idUser = req.user.id;
  const userFound = await UserModel.findUser({ idUser });
  if (userFound === false)
    return res.status(400).json({ message: "User not found" });

  const [{ id, userName, correo }] = userFound;
  return res.json({
    id,
    userName,
    email: correo,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ errors: "NO autorizado" });
  jwt.verify(token, SECRET_JWT_KEY, async (error, user) => {
    if (error) return res.status(401).json({ errors: "NO autorizado" });
    const userFond = await UserModel.findUser({ idUser: user.id });
    if (userFond == false)
      return res.status(401).json({ errors: "NO autorizado" });
    return res.json({
      id: userFond[0].id,
      userName: userFond[0].userName,
      email: userFond[0].correo,
    });
  });
};
