import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "./pages/auth";
import PrimerPassword from "./pages/auth/PrimerPassword";
import OlvidePassword from "./pages/auth/OlvidePassword";
import NuevoPassword from "./pages/auth/NuevoPassword";

import useAuth from "./hooks/useAuth";
import RutaProtegida from "./layouts/RutaProtegida";
import { Home } from "./pages/inicio";

function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="crear-password/:token" element={<PrimerPassword />} />
      <Route path="olvide-password" element={<OlvidePassword />} />
      <Route path="olvide-password/:token" element={<NuevoPassword />} />

      <Route path="/usuarios" element={<RutaProtegida />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
