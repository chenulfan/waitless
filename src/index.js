import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./shared/components/header";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import { Notifications } from "react-push-notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Notifications />
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);
