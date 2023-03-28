import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./shared/components/header";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import Profile from "./views/profile";
import { PageNotFound } from "./views/PageNotFound";
import { Notifications } from "react-push-notification";
import { AuthProvider } from "./utils/AuthContext";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <React.Suspense>
    <AuthProvider>
      <div className="h-screen w-screen">
        <Notifications />
        <div className="h-[calc(100%-60px)]">
          <BrowserRouter>
            <Header>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Header>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  </React.Suspense>
);
