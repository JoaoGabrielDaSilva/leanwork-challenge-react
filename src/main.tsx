import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles.scss";
import { Router } from "./routes/Router";
import "./variables.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
