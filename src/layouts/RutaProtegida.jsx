import { Outlet, Navigate, useLocation } from "react-router-dom";

import routes from "@/routes";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";

import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import useAuth from "@/hooks/useAuth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import clienteAxios from "@/configs/clinteAxios";
import Cargando from "@/components/login/Cargando";

const RutaProtegida = () => {
  const { auth, setAuth, cargando, handleCargando } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const navigate = useNavigate();
  const location = useLocation();
  const [buscar, setBuscar] = useState(false)

  useEffect(() => {
    const obtenerPath = () =>{
      if(location.pathname === '/usuarios'){
        setBuscar(true)
      } 
    }
  }, []);


  useEffect(() => {
    const autenticarUsuario = async () => {
      if(buscar){
        const token = localStorage.getItem('token');
        console.log("Obtener Token");
        console.log(token);
        if (!token) {
          navigate("/");
          return;
        }
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("Por hacer la consulta");
        handleCargando()
        try {
          const { data } = await clienteAxios(`/usuarios/perfil`, config);
          console.log(data);
      
          await setAuth(data);
        handleCargando()
  
          if (!data) {
            navigate("/");
          }
          setBuscar(false)
        } catch (error) {
          console.log(error);
        }
      }
      
    };
    autenticarUsuario();
  }, [buscar]);

  return (
    <>
      {auth._id && auth.rol === "superAdmin" ? (
        <div className="flex min-h-screen flex-col bg-blue-gray-50/50">
          <div className="flex flex-1 flex-col p-4 ">
            <DashboardNavbar />

            <div className="flex-1">
              <Outlet />
            </div>
            <div className="mt-auto text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        null
      )}
        <Cargando/>
    </>
  );
};

export default RutaProtegida;
