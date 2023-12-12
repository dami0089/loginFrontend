import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BuildingLibraryIcon,
  PlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";

import useAuth from "@/hooks/useAuth";

import { useState } from "react";
import useEmpresas from "@/hooks/useEmpresas";
import useUsuarios from "@/hooks/useUsuarios";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { cerrarSesionAuth, auth } = useAuth();
  const {
    buscar,
    setBuscar,
    busqueda,
    handleModalNuevoCasoRol,
    handleModalNuevoCasoSuperAdmin,
  } = useEmpresas();
  const navigate = useNavigate();

  const { handleModalNuevoUsuario } = useUsuarios();

  const handleclose = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  const handleNuevoUsuario = () => {
    handleModalNuevoUsuario();
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={` mb-5 rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-0 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className=" flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {auth.rol === "superAdmin" && pathname === "/usuarios" ? (
          <div
            className="mb-12 ml-4 mt-5 grid p-3 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-4"
            onClick={(e) => handleNuevoUsuario()}
          >
            <Button className="absolute -mt-4 grid h-14 place-items-center bg-white text-black">
              <PlusIcon className="h-8 w-8" />
            </Button>
          </div>
        ) : null}

        <div className="wd flex items-center">
          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            {auth.nombre} {auth.apellido}
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                onClick={handleclose}
                color="blue-gray"
              >
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={handleclose}
                />
              </IconButton>
            </MenuHandler>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
