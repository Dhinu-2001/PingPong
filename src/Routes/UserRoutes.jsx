import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Common/Register";
import Home from "../pages/Common/Home";
import Login from "../pages/Common/Login";
import OtpVerification from "../pages/Common/OtpVerification";
import Layout from "../pages/User/Layout/Layout";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp_verification" element={<OtpVerification />} />
      <Route path="/" element={<Home />} />

      <Route path="/home" element={<Layout />}>
        {/* <Route
          path="/"
          element={
            <EventsDataProvider>
              <Home />
            </EventsDataProvider>
          }
        ></Route> */}
        </Route>

    </Routes>
  );
}

export default UserRoutes;
