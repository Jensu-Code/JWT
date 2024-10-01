import { createContext, useContext, useState } from "react";
import { createTask, getAllTask, deleteTask, getTask, updateTask } from "../api/tasks.js";
const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTaks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("UseTaks must be used with a TaskProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTaskRequest = async (task) => {
    try {
      const response = await createTask(task);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  const getTasksRequest = async () => {
    try {
      const response = await getAllTask();
      setTasks(response);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTasksRequest = async (id) => {
     try{
        const r = await deleteTask(id);
        if(r.status == 204){
          setTasks(tasks.filter(task => task.id != id));
        }
     }catch(e){
      console.error(e);
     }
  };

  const getTaskRequest = async (id) => {
     try {
        const task= await getTask(id) 
        return task;
     } catch (error) {
      console.error(error);
     }
  }
  const updateTaskRequest = async (id, task) => {
    try {
      const response = await updateTask(id, task)
      console.log(response)
    } catch (error) {
      console.error(error);
    }
    
  }
  return (
    <TaskContext.Provider
      value={{ createTaskRequest, getTasksRequest, tasks, deleteTasksRequest,getTaskRequest, updateTaskRequest}}
    >
      {children}
    </TaskContext.Provider>
  );
}
