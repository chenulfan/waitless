import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./shared/components/header";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import { PageNotFound } from "./views/PageNotFound";
import { Notifications } from "react-push-notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
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
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Suspense>
    <div className="h-screen w-screen">
      <Notifications />
      <Header />
      <div className="h-[calc(100%-60px)]">
        <RouterProvider router={router} />
      </div>
    </div>
  </React.Suspense>
);
