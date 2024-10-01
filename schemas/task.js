import zod from 'zod';

const taskSchema = zod.object({
    title: zod.string({
        invalid_type_error: 'En el campo title no se aceptan valores numericos',
        required_error: 'Este campo es requerido'
    }).max(50,{
        message: 'El campo title no acepta valores mayores a 50 catacteres'
    }),
    description: zod.string({
        required_error: 'El campo descripcion es requerido'
    }),
    date: zod.string().date({
        message: "Invalid date string!"
    }),
    userId: zod.string().uuid({
        message: 'Invalid uuid'
    })
})

export function validateTask(input){
   return taskSchema.safeParse(input);
}