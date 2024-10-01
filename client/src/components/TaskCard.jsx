import { useTaks } from "../contexto/TasksContex";
import { Link } from "react-router-dom";
function TaskCard({ task }) {
  const {deleteTasksRequest }=useTaks()
  return (
    <div className="bg-zinc-800 max-w-md w-full p-5 rounded-md">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <p className="text-slate-300">{task.description}</p>
          <p>{new Date(task.date).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-x-2 items-center">
          <button className="bg-red-600 px-2 py-1 rounded-md text-white" onClick={()=>deleteTasksRequest(task.id)}>
            Delete
          </button>
          <button className="bg-green-600 px-2 py-1 mx-1 text-white rounded-md">
            <Link to={`/task/${task.id}`} > Edit </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
