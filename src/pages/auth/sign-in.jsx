import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import useAuth from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

import fondo from "../../img/fondo-mano-robot-3d-vista-lateral-tecnologia-ai.jpg";
import {
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import Cargando from "@/components/login/Cargando";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth, handleCargando, auth } = useAuth();

  const [autenticarUsuario, setAutenticarUsuario] = useState(false);

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    const token = localStorage.getItem("token");
    const cookie = Cookies.get("autentication");

    if (!token) {
      return false;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/usuarios/perfil", config);
      console.log(cookie);
      console.log(data.autentication);
      if (cookie !== data.autentication) {
        localStorage.removeItem("token");
        Cookies.remove("autentication");
        toastWarning();
        return false;
      }
      setAuth(data);
      return data._id ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const toastWarning = () => {
    toast(
      "⚠️ Se inició sesión con tu usuario desde otro navegador. Vuelve a identificarte",
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  useEffect(() => {
    checkAuthentication().then((authenticated) => {
      if (authenticated && location.pathname === "/") {
        window.location.href = "http://datapredictor.solutions:5000";
        // navigate("/usuarios");
      } else {
        setIsAuthenticated(authenticated);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    if ([email, password].includes("")) {
      toast("⚠️ Todos los campos son obligatorios!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      handleCargando();
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      await setAuth(data);
      localStorage.setItem("token", data.token);

      Cookies.set("autentication", data.autentication, {
        expires: 7,
        path: "/",
        domain: "datapredictor.solutions",
      });

      //Modificar domain de cache de arriba y el navigate de abajo
      window.location.href = "http://datapredictor.solutions:5000";
      // navigate("/usuarios");

      handleCargando();
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <>
        <img
          src={fondo}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <ToastContainer pauseOnFocusLoss={false} />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white" className="uppercase">
                Ingresar
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                label="Usuario o Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="relative">
                {" "}
                {/* Contenedor relativo para el input y el ícono */}
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                fullWidth
                onClick={(e) => handleSubmit(e)}
              >
                Iniciar Sesion
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Olvidaste tu Password?
                <Link to="/olvide-password">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Recuperar
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </>

      <Cargando />
    </>
  );
}

export default SignIn;
