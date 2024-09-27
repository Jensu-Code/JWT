import { Router } from "express";
import { register, login , logout, profile, verifyToken } from "../controllers/authController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema,validateUserCreate } from "../middlewares/validateUser.js";
export function createAuthController() {
  const authRouter = Router()

  authRouter.post("/login",validateSchema,login)
  authRouter.post("/register",validateUserCreate,register)
  authRouter.post("/logout",logout)
  authRouter.get("/verify",verifyToken)
  authRouter.get('/profile',authRequired ,profile)

  return authRouter
}
