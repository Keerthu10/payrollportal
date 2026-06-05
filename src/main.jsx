import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

import { HashRouter } from "react-router-dom";

import App from "./App";

import CssBaseline from "@mui/material/CssBaseline";

import { ToastProvider } from "./context/ToastContext";

import { LoaderProvider } from "./context/LoaderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <ToastProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>,
);
