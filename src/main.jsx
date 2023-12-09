import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { AuthProvider } from "./context/AuthProvider";
import { UsuariosProvider } from "./context/UsuariosProvider";
import { EmpresasProvider } from "./context/EmpresasProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <AuthProvider>
            <EmpresasProvider>
              <UsuariosProvider>
                <App />
              </UsuariosProvider>
            </EmpresasProvider>
          </AuthProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);
