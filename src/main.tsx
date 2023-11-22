import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement || createAppWrapper());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function createAppWrapper() {
  const appDiv = document.createElement("div");
  appDiv.setAttribute("id", "root");
  document.body.appendChild(appDiv);
  return appDiv;
}
