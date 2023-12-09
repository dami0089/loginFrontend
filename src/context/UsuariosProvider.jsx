import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [modalNuevoUsuario, setModalNuevoUsuario] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const [listadoUsuarios, setListadoUsuarios] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState("");
  const [actualizarListados, setActualizarListados] = useState(false);
  const [paso1, setPaso1] = useState(false);
  const [paso2, setPaso2] = useState(false);
  const [paso3, setPaso3] = useState(false);
  const [modalEditarUsuario, setModalEditarUsuario] = useState(false);
  const [idEmpresaEditarUsuario, setIdEmpresaEditarUsuario] = useState("");
  const [sectorUsuario, setSectorUsuario] = useState("");
  const [nombreDeUsuario, setNombreDeUsaurio] = useState("");
  const [idUsuarioEditar, setIdUsuarioEditar] = useState("");

  const handleModalNuevoUsuario = () => {
    setModalNuevoUsuario(!modalNuevoUsuario);
  };
  const handleModalEditarUsuario = () => {
    setModalEditarUsuario(!modalEditarUsuario);
  };
  //Guarda los usuarios en la base de datos
  const registrarUsuarios = async (nombre, apellido, email) => {
    const usuario = {
      nombre: nombre,
      apellido: apellido,
      email: email,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/usuarios/registrar/`,
        usuario,
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

  const editarUsuario = async (_id, nombreUsuario, nombre, apellido, email) => {
    const info = {
      nombreUsuario: nombreUsuario,
      nombre: nombre,
      apellido: apellido,
      email: email,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/usuarios/editar-usuario/${_id}`,
        info,
        config
      );
      toast.success("Editado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/usuarios/obtener-usuarios", config);

      setListadoUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        handleModalNuevoUsuario,
        modalNuevoUsuario,
        nombre,
        setNombre,
        apellido,
        setApellido,
        email,
        setEmail,
        obtenerUsuarios,
        listadoUsuarios,
        idEmpresa,
        setIdEmpresa,
        registrarUsuarios,
        actualizarListados,
        setActualizarListados,
        handleModalEditarUsuario,
        modalEditarUsuario,
        idEmpresaEditarUsuario,
        setIdEmpresaEditarUsuario,
        sectorUsuario,
        setSectorUsuario,
        nombreDeUsuario,
        setNombreDeUsaurio,
        idUsuarioEditar,
        setIdUsuarioEditar,
        editarUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export { UsuariosProvider };

export default UsuariosContext;
