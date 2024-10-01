import { validateTask } from "../schemas/task.js"
import { TaskModel } from "../models/taskModel.js"

export const getAllTask =async (req,res)=>{
  const {id}= req.user;
  const taks = await TaskModel.getAllTask({userId:id})
  if(taks !== false) return  res.json(taks)
  return res.status(404).json({message: 'Task not found'});
}

export const getTask = async (req,res)=>{
  const {id:userId}= req.user;
  const {id}= req.params
  const task = await TaskModel.getTask({id,userId});
  if(task !== false) return res.json(task)
  
  return res.status(404).json({message: 'Task not found'});
}

export const createTask = async(req,res)=>{
  const {title, description, date} = req.body
  const userId = req.user.id
  const result = validateTask({title, description, date,userId})
  if(result.error) return res.status(404).json({errors: result.error.issues.map(err => err.message)});
  console.log(result.data)
  const task = await TaskModel.createTask({task:result.data})
  if(task !== false) return res.json(task)
  return res.status(500).json({mesaage:'Error en la base de datos'})
}

// aca no estoy validando si ha esta tarea le pertenece a 
// ese usuario
export const updateTask = async(req,res)=>{
  const {id}= req.params
  const result = await TaskModel.updateTask({id,task:req.body})
  if(result) return res.json({id, ...req.body})
  return res.status(404).json({message:'task not update'})
}

export const deleteTask =async (req,res)=>{
  const {id:userId}= req.user
  const {id}= req.params
  const result = await TaskModel.deleteTask({userId,id})
  if(result) return res.sendStatus(204)

  res.status(404).json({message:'task not found'})
  //204 retornar quiere decir que todo esta bien 
}
