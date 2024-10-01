import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, validateCredentials } from "../api/auth.js";
import Cookies from 'js-cookie';
export const AuthContext = createContext();

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth mus be used widthin an AuthProvider ");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogin,setIsLogin]= useState(false);
  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log("respuesta del Api: ", response);
      setLoading(true)
      setUser(response);
      setIsAuthenticated(true);
      setIsLogin(true);
    } catch (error) {
      const dataError = await error.message;
      setValidateErrors(dataError.split(","));
      setLoading(false);
      setIsLogin(false);
      //console.log("error response: ",error);
    }
  };
  const signin = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log("Usuario logueado: ", response);
      setUser(response);
      setIsAuthenticated(true);
      setIsLogin(true);

    } catch (error) {
      setValidateErrors(error.message.split(","));
    }
  };

  const logout = ()=>{
    Cookies.remove("token");
    setIsAuthenticated(false);
    setIsLogin(false);
    setUser(null);
  }
  useEffect(() => {
    if (validateErrors.length > 0) {
      const timer = setTimeout(() => {
        setValidateErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validateErrors]);

  useEffect(() => {
    const validateToken = async () => {
      const cookie = Cookies.get("token");
      if (cookie) {
        try {
          const response = await validateCredentials();
          console.log("validando token: ", response);
          setUser(response);
          setIsAuthenticated(true);
        } catch (error) {
          console.log("Error de validación de token: ", error);
          setUser(null);
          setIsAuthenticated(false);
        } finally {
          setLoading(false); // Esto asegura que loading se detenga después de la validación
        }
      } else{
        if(isLogin){
          console.log("No hay cookie pero si me he logueado");
           setIsAuthenticated(true)
        }else{
          setIsLogin(false)
          setLoading(false); 
          setIsAuthenticated(false)
        }
       // Esto asegura que loading se det
      }
    };
  
     validateToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        validateErrors,
        loading,
        isLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
