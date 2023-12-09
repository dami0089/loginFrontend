import { HomeIcon, QueueListIcon, UserIcon } from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications } from "@/pages/inicio";

import RutaProtegida from "./layouts/RutaProtegida";

import { Home } from "./pages/inicio";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  //   {
  //     layout: "inicio",
  //     pages: [
  //       {
  //         icon: <HomeIcon {...icon} />,
  //         name: "inicio",
  //         path: "/",
  //         element: <Home />,
  //       },
  //     ],
  //   },
  //   {
  //     layout: "entidades",
  //     pages: [
  //       {
  //         icon: <BuildingOffice2Icon {...icon} />,
  //         name: "Entidades",
  //         path: "/",
  //         element: <Empresas />,
  //       },
  //     ],
  //   },
  //   {
  //     layout: "documentos",
  //     pages: [
  //       {
  //         icon: <QueueListIcon {...icon} />,
  //         name: "Documentos",
  //         path: "/",
  //         element: <CasosSuperAdmin />,
  //       },
  //     ],
  //   },
  // ];
  // export const routesSuper = [
  //   {
  //     layout: "inicio",
  //     pages: [
  //       {
  //         icon: <HomeIcon {...icon} />,
  //         name: "inicio",
  //         path: "/",
  //         element: <HomeSuper />,
  //       },
  //     ],
  //   },
  //   {
  //     layout: "usuarios",
  //     pages: [
  //       {
  //         icon: <UserIcon {...icon} />,
  //         name: "Usuarios",
  //         path: "/",
  //         element: <Usuarios />,
  //       },
  //     ],
  //   },
  //   {
  //     layout: "documentos",
  //     pages: [
  //       {
  //         icon: <QueueListIcon {...icon} />,
  //         name: "Documentos",
  //         path: "/",
  //         element: <Casos />,
  //       },
  //     ],
  //   },
];

export default routes;
