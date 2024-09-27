import zod from 'zod'

const loginSchema = zod.object({
    email : zod.string({
        required_error: 'El campo email es requerido'
    }).email({
      message: 'Email invalido'
    }),
    password : zod.string({required_error: 'El campo password es requerido'}).min(6,{
        message : 'Este campo adminte como minimo 6 caracteres'
    }),
})

const createUserSchema = zod.object({
    userName: zod.string({
        required_error: 'El campo userName es requerido'
    }).refine((value) => !/^\d+$/.test(value), {
        message: "El campo userName no puede contener solo números",
      }),
    email: zod.string({required_error: 'El campo email es requerido'}).email({message: 'Email invalido'}),
    password: zod.string({required_error: 'El campo password es requerido'}).min(6,{message: 'El campo password adminte como minimo 6 caracteres'})
});

export function validateLogin(input){
   return loginSchema.safeParse(input);
}

export function validateUser(input){
  return createUserSchema.safeParse(input)
}