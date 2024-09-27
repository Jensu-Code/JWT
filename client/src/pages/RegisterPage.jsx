import { useForm } from "react-hook-form";
import { UseAuth } from "../contexto/AuthContex";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, validateErrors } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (value) => {
    console.log("data enviar: ", value);
    await signup(value);
  });
  return (
    <div className="flex  h-[calc(100vh-100px)] justify-center items-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {validateErrors.map((e, index) => (
          <div className="bg-red-500 p-2 text-white" key={index}>
            {e}
          </div>
        ))}
        <h1 className="text-2xl font-bold">Registrate</h1>
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            {...register("userName", { required: true })}
            placeholder="userName"
          />
          {errors.userName && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md my-2"
            type="email"
            {...register("email", { required: true })}
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md my-2"
            type="password"
            {...register("password", { required: true })}
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <input
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md my-2"
            type="submit"
          />
        </form>
        <p className="flex gap-2 justify-between">
          Ya estas registrado? <Link to="/login" className="font-bold text-sky-600"> Sing in </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
