import { Router} from 'express'
import { register, login } from '../controllers/authController.js';

export function createAuthController(){
    const authRouter = Router();

    authRouter.post('/login', login)
    authRouter.post('/register', register);

    return authRouter;
}
