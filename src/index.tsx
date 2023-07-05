import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

const rootElement = document.querySelector("#root");
const root = createRoot(rootElement as HTMLElement);

if (module && module.hot) {
  module.hot.accept();
}

root.render(
  <React.StrictMode>
    <App name="cxy" age={27} />
  </React.StrictMode>,
);
