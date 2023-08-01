import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const rootElement = document.querySelector("#root");
const root = createRoot(rootElement as HTMLElement);

if (module && module.hot) {
  module.hot.accept();
}

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
