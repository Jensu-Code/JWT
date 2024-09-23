import Router from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getAllTask, getTask , createTask, updateTask, deleteTask } from '../controllers/taskController.js';

export  const createTaskRouter=()=>{
    const routerTask = Router();
    routerTask.get('/',authRequired,getAllTask)
    routerTask.get('/:id',authRequired,getTask)
    routerTask.post('/',authRequired,createTask)
    routerTask.put('/:id',authRequired,updateTask)
    routerTask.delete('/:id',authRequired,deleteTask)

    return routerTask;
}