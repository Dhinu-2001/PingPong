import { LogOut, User } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className='w-full flex items-center justify-between pr-6 pt-3'>

      <h1 className="text-2xl font-light text-[#b6a420]">PingPong</h1>

      <div className="flex space-x-4">
        <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <User className="h-5 w-5" />
        </button>
        {/* <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <Settings className="h-5 w-5" />
        </button> */}
        <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Header;
