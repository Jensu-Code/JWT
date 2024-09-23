import { validateLogin, validateUser } from "../schemas/login.js";

export const validateSchema = (req, res, next) => {
  const result = validateLogin(req.body);
  if (result.error) {
    return res.json(result.error.issues.map(err => err.message));
  }
  console.log('validando credenciales');
  next();
};

export const validateUserCreate = (req, res, next) => {
    const result = validateUser(req.body);
    if(result.error) {
        return res.json(result.error.issues.map(err => err.message));
    }
    next();
}
