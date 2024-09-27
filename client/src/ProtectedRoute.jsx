import { UseAuth } from "./contexto/AuthContex"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute(){
    const { isAuthenticated, loading }= UseAuth() 
    console.log(isAuthenticated,loading)
    if(loading) return(<h1>Cargando ....</h1>) 
    if(!isAuthenticated && !loading) return <Navigate to="login" replace />
    return (<Outlet/>)
}

export default ProtectedRoute