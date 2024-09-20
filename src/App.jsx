import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Login from "./Page/Login/Login";
import Button from "./components/Button/Button";
import GreenGuide from "./Page/GreenGuide/GreenGuide";
import Profile from "./Page/Profile/Profile";
import { currentUser } from "./connecting";
import { login } from "./store/userData";
import { useDispatch } from "react-redux";
import AuthLayout from "./auth";
import Carbon from "./Page/Carbon/Carbon";
import Reedem from "./Page/Reedem/Reedem";

const App = () => {
  const [loading, setLoading] = useState(true);
  const Dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      await currentUser()
        .then((res) => {
          console.log(res.message);
          Dispatch(login(res.message));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    load();
  }, []);
  if (!loading) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/About"
              element={
                <AuthLayout authentication={true}>
                  <About />
                </AuthLayout>
              }
            />
            <Route
              path="/Login"
              element={
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/Addimage"
              element={
                <AuthLayout authentication={true}>
                  <Button />
                </AuthLayout>
              }
            />
            <Route path="/GreenGuide" element={<GreenGuide />} />
            <Route
              path="/Profile"
              element={
                <AuthLayout authentication={true}>
                  <Profile />
                </AuthLayout>
              }
            />
             <Route path="/footprint" element={<Carbon />} />
             <Route path="/reedem" element={<Reedem />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
