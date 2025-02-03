import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Common/Register";
import Home from "../pages/Common/Home";
import Login from "../pages/Common/Login";
import OtpVerification from "../pages/Common/OtpVerification";
import Layout from "../pages/User/Layout/Layout";
import ChatComponent from "../components/pageComponents/ChatComponent";
import SearchUsers from "../pages/Common/SearchUsers";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp_verification" element={<OtpVerification />} />
      <Route path="/" element={<Home />} />

      <Route path="/home" element={<Layout />}>
        <Route path="chat" element={<ChatComponent />} />
        <Route path="chat/:reciever_id" element={<ChatComponent />} />
        <Route path="search_users" element={<SearchUsers />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
