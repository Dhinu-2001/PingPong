import React from "react";
import NavBar from "../../components/pageComponents/NavBar";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen lg:w-screen w-screen bg-gradient-to-tl from-[#ffff] to-[#fbffac] flex text-black">
      {/* <NavBar /> */}
      {/* <div className="">
        <Header /> */}
      <div className=" flex-1 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-light">Welcome to PingPong</h1>
          <div className="flex items-center">
            <MessageCircle className="w-9 h-9" />
            <h1>Message</h1>
          </div>
          <div className="flex space-x-2 p-2">
            <Link to="/login">
              <button className="w-full py-2 px-4 rounded-full bg-[#f7f478] hover:bg-[#fffd7d] text-black">
                SignIn
              </button>
            </Link>

            <Link to="/register">
              <button className="w-full  py-2 px-4 rounded-full bg-[#f7f478] hover:bg-[#fffd7d] text-black">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
