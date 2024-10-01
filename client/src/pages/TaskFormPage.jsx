import { useForm } from "react-hook-form";
import { useTaks } from "../contexto/TasksContex";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTaskRequest, updateTaskRequest } = useTaks();
  const navigate = useNavigate();
  const params = useParams();
  const {getTaskRequest} =useTaks()
  const onSubmit = handleSubmit((data) => {
    //console.log(data)
    if(params.id){
      updateTaskRequest(params.id, data)
    }else{
      createTaskRequest(data);
    }
    
    navigate("/tasks");
  });
  useEffect(()=>{
    if(params.id){
      (async()=>{
        const task = await getTaskRequest(params.id)
        const isoDate = new Date(task[0].date).toISOString().split('T')[0];
        setValue("title",task[0].title)
        setValue("description",task[0].description)
        setValue("date",isoDate)
        console.log(task)
      })()
      
    }
  },[params])
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          autoFocus
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <textarea
          rows="3"
          placeholder="descripcion"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <input className="bg-sky-500 px-2 py-1 my-2 text-white rounded-md cursor-pointer" type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default TaskFormPage;
