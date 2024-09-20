import zod from 'zod';

const userSchema = zod.object({
    userName: zod.string({
        invalid_type_error: 'No se aceptan valores numericos',
        required_error: 'Este campo es requerido'
    }),
    email: zod.string().email({
        required_error: 'Este campo es requerido'
    }),
    password: zod.string({required_error: 'Este campo es requerido'})
    .min(6,{
        message: 'La contraseña debe de tener al menos 6 caracteres'
    }).max(10,{
        message: 'La contraseña no debe de tener mas de 10 caracteres'
    })
})

export function validateUser(input){
    return userSchema.safeParse(input);
}