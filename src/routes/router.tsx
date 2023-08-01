import React from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import Root from "@/components/Root";
import Login from "@/pages/Login/login";
import Home from "@/pages/Home/home";
import About from "@/pages/About/about";

const routes: RouteObject[] = [
  { path: "/", element: <Root /> },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
