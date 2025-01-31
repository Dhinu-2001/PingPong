import React from "react";
import NavBar from "../../../components/pageComponents/NavBar";
import ChatComponent from "../../../components/pageComponents/ChatComponent";

function Layout() {
  return (
    <div className="h-screen lg:w-screen bg-gradient-to-tl from-[#ffff] to-[#fbffac] flex text-black">
        <NavBar/>
        
        <ChatComponent/>
      
    </div>
  );
}

export default Layout;
