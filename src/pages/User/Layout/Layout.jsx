import React from "react";
import NavBar from "../../../components/pageComponents/NavBar";
import ChatComponent from "../../../components/pageComponents/ChatComponent";
import { Outlet } from "react-router-dom";
import Header from "../../../components/pageComponents/Header";
function Layout() {
  return (
    <div className="h-screen lg:w-screen w-screen bg-gradient-to-tl from-[#ffff] to-[#fbffac] flex text-black">
      <NavBar />
      {/* <div className="">
        <Header /> */}
        <Outlet />
      {/* </div> */}
    </div>
  );
}

export default Layout;
