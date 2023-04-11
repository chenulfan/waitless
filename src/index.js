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
import { AuthProvider } from "./utils/AuthContext";
import { createRoot } from "react-dom/client";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBt5dDv-CvLIWUi104LBpbQjHGF1ktzGKE",
  authDomain: "waitless-2df5f.firebaseapp.com",
  projectId: "waitless-2df5f",
  storageBucket: "waitless-2df5f.appspot.com",
  messagingSenderId: "607472923191",
  appId: "1:607472923191:web:b805f23404063d50c585b2",
  measurementId: "G-7FZL47128B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")).render(
  <React.Suspense>
    <AuthProvider>
      <div className="h-screen w-screen">
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
