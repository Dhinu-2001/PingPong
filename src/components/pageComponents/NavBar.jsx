import React from "react";
import {
  MessageSquare,
  Briefcase,
  Users,
  Newspaper,
  Archive,
  User,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { clearAuthData } from "../../redux/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout=()=>{
    dispatch(clearAuthData())
    toast.success('Logout successfully!')
    navigate('/login')
  }
  return (
    <div className="w-20 flex flex-col items-center py-6">
      <div className="w-10 h-10 bg-white rounded-lg mb-8 flex items-center justify-center">
        <span className="text-[#dcc215]">▲</span>
      </div>

      <nav className="flex-1 space-y-4">
        <Link to="chat">
          <button className="w-10 h-10 rounded-lg  text-gray-400 hover:bg-gray-800 flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </button>
        </Link>

        <Link to="search_users">
          <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </button>
        </Link>

        {/* <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center relative">
          <Briefcase className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
            4
          </span>
        </button>

        <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <Newspaper className="h-5 w-5" />
        </button>
        <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <Archive className="h-5 w-5" />
        </button> */}
      </nav>

      <div className="space-y-4">
        <Notification/>
        {/* <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <Bell  className="h-5 w-5" />
        </button> */}
        {/* <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <Settings className="h-5 w-5" />
        </button> */}
        <button onClick={handleLogout} className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
