import { useForm } from "react-hook-form";
import { UseAuth } from "../contexto/AuthContex";
import { Link } from "react-router-dom"
function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {signin, validateErrors}= UseAuth()
  const onSubmit = handleSubmit((value) => {
    signin(value);
    console.log(value);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          validateErrors.map((e,index)=>(
            <div className="bg-red-500 p-2 text-white text-center" key={index}>{e}</div>
          ))
        }
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
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
            type="submit" value="Login"
          />
        </form>
        <p className="flex gap-x-2 justify-between">
          No tienes una cuenta? <Link to="/register" className="text-sky-700 font-bold"> Sing up </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
