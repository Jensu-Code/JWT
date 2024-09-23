import { Connection } from "../db/conexion.js";

const c = await Connection.getConnection();
export class TaskModel {
  static async getAllTask({ userId }) {
    try {
      const [tasks] = await c.query(
        `select * from tasks where user_id = uuid_to_bin(?)`,
        [userId]
      );
      if(tasks.length > 0) return tasks;
      return false
    } catch (error) {
      console.error(error);
    }
  }

  static async getTask({ id, userId }) {
    try {
      const [tasks] = await c.query(
        `select * from tasks where id=? and user_id = uuid_to_bin(?)`,
        [id, userId]
      );
      if(tasks.length > 0) return tasks;
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  static async createTask({ task }) {
    try {
      // console.log('tareas: ',task);
  
      const { title, description, date, userId } = task;
      const [result] = await c.query(`select uuid_to_bin(?) as id`, [userId]);
      const [{ id }] = result;
      const [createResult] = await c.query(
        `insert into tasks (title,description,date, user_id) values(?,?,?,?)`,[title,description,date,id]
      )
      if(createResult.affectedRows>0){
        //  console.log("tarea creada ",createResult)
         const idTask = createResult.insertId
         const [task]= await c.query(`select * from tasks where id= ? and user_id= ?`,[idTask,id])
         console.log('tarea result: ',task)
         if(task.length>0) return task

         return false;
      }
      return false
    } catch (error) {
        console.error(error)
    }
  }
  static async updateTask({ id, task }) {
    const {title,description,date}= task;
    const [updateTaskResult] = await c.query(`update tasks set title=?, description=?, date=? where id=?`,[title,description,date,id])
    if(updateTaskResult.affectedRows > 0) return true
    return false
  }
  static async deleteTask({userId,id}) {
    try {
      const [resultDelete]= await c.query(`delete from tasks where user_id= uuid_to_bin(?) and id=?`,[userId,id])
      if(resultDelete.affectedRows > 0) return true

      return false;
    } catch (error) {
      console.error(error)
    }
   
  }
}
