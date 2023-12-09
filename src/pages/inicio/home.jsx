import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";

import {
  ArrowPathIcon,
  BanknotesIcon,
  BellIcon,
  BookOpenIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  DocumentCheckIcon,
  EnvelopeIcon,
  InboxArrowDownIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  TruckIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Chart from "react-apexcharts";
import { chartsConfig } from "@/configs";
import useEmpresas from "@/hooks/useEmpresas";
import ListadoDeUsuarios from "@/components/inicio/ListadoDeUsuarios";
import { ToastContainer } from "react-toastify";
import Cargando from "@/components/login/Cargando";
import useUsuarios from "@/hooks/useUsuarios";
import ModalAgregarUsuario from "@/components/inicio/ModalAgregarUsuario";
import ModalEditarUsuario from "@/components/inicio/ModalEditarUsuario";

export function Home() {
  const [actualizaciones, setActualizaciones] = useState([]);

  const { modalNuevoUsuario, modalEditarUsuario } = useUsuarios();

  return (
    <div>
      <ToastContainer pauseOnFocusLoss={false} />

      <ListadoDeUsuarios />
      {modalNuevoUsuario ? <ModalAgregarUsuario /> : ""}
      {modalEditarUsuario ? <ModalEditarUsuario /> : ""}
      <Cargando />
    </div>
  );
}

export default Home;
