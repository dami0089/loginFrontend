import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import Swal from "sweetalert2";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const [cargandoModal, setCargandoModal] = useState(false);

  const handleCargando = () => {
    setCargandoModal((prevState) => !prevState);
  };

  const navigate = useNavigate();




  const cerrarSesionAuth = () => {
    Swal.fire({
      title: "Seguro queres cerrar Sesion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        setAuth({});
        navigate("/");
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
        cargandoModal,
        handleCargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
