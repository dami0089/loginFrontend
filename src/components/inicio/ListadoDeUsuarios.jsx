import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";

import { useNavigate } from "react-router-dom";
import useUsuarios from "@/hooks/useUsuarios";
import useEmpresas from "@/hooks/useEmpresas";
import {
  EyeDropperIcon,
  EyeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import useAuth from "@/hooks/useAuth";

const ListadoDeUsuarios = () => {
  const navigate = useNavigate();

  const {
    actualizarListados,
    setActualizarListados,
    handleModalEditarUsuario,
    setNombre,
    setApellido,
    setEmail,
    setNombreDeUsaurio,
    obtenerUsuarios,
    listadoUsuarios,
    setIdUsuarioEditar,
  } = useUsuarios();

  const { auth } = useAuth();

  useEffect(() => {
    const obtenerLosUsuarios = async () => {
      await obtenerUsuarios(auth._id);
      setActualizarListados(false);
    };
    obtenerLosUsuarios();
  }, []);

  useEffect(() => {
    const obtenerLosUsuarios = async () => {
      if (actualizarListados) {
        await obtenerUsuarios();
        setActualizarListados(false);
      }
    };
    obtenerLosUsuarios();
  }, [actualizarListados]);

  const handleModalEditarUser = (
    e,
    _id,
    nombre,
    apellido,
    email,
    nombreUsuario
  ) => {
    setNombre(nombre);
    setApellido(apellido);
    setEmail(email);
    setNombreDeUsaurio(nombreUsuario);
    setIdUsuarioEditar(_id);
    handleModalEditarUsuario();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-10 ">
        <Typography variant="h6" color="blue-gray" className="mb-3 ml-2">
          Listado de Usuarios
        </Typography>
      </div>
      {listadoUsuarios.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6  xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3">
              <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                <table className="w-full min-w-[640px] table-auto">
                  <thead className="sticky top-0 bg-blue-gray-50">
                    <tr>
                      {["Usuario", "Nombre", "Apellido", "Email", "Accion"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 px-6 py-3  text-center"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {listadoUsuarios.map(
                      (
                        { _id, nombre, apellido, email, nombreUsuario },
                        key
                      ) => {
                        const className = `py-3 px-5 text-center ${
                          key === projectsTableData.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography
                                  variant="small"
                                  className="font-bold uppercase"
                                >
                                  {nombreUsuario ? nombreUsuario : "-"}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography variant="small" className="">
                                  {nombre}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography variant="small" className="">
                                  {apellido}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <Typography variant="small" className="">
                                  {email}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center justify-center gap-4">
                                <EyeIcon
                                  className="h-8 w-8 hover:cursor-pointer"
                                  onClick={(e) =>
                                    handleModalEditarUser(
                                      e,
                                      _id,
                                      nombre,
                                      apellido,
                                      email,
                                      nombreUsuario
                                    )
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </>
      ) : (
        <div className="text-center">No hay usuarios por mostrar</div>
      )}
    </>
  );
};

export default ListadoDeUsuarios;
