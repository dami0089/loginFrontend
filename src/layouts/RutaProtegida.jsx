import { Outlet, Navigate } from "react-router-dom";

import routes from "@/routes";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";

import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/login/Cargando";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RutaProtegida = () => {
  const { auth, setAuth, cargando } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      const navigate = useNavigate();

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        if (!data) {
          navigate("/");
        }
      } catch (error) {
        // setAuth({});
      }
    };
    autenticarUsuario();
  }, []);

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
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
