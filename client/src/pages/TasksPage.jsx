import { useEffect } from "react";
import { useTaks } from "../contexto/TasksContex";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasksRequest, tasks } = useTaks();
  useEffect(() => {
    getTasksRequest();
  }, []);
  if(tasks.length<0){
    return <h1>No hay tareas</h1>
  }
  return (
    <div className="grid sm:grid-clos-1 md:grid-cols-3 gap-2">
      {tasks.map((tarea) => (
         <TaskCard task={tarea} key={tarea.id}/>
      ))}
    </div>
  );
}

export default TasksPage;
