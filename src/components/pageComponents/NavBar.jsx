import React from 'react'
import {
    MessageSquare,
    Briefcase,
    Users,
    Newspaper,
    Archive,
    User,
    Settings,
    LogOut,
  } from "lucide-react";
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="w-20 flex flex-col items-center py-6">
        <div className="w-10 h-10 bg-white rounded-lg mb-8 flex items-center justify-center">
          <span className="text-[#dcc215]">▲</span>
        </div>

        <nav className="flex-1 space-y-4">
          <button className="w-10 h-10 rounded-lg bg-gray-600/50 text-white flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </button>
          <Link to='search_users'>
          <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </button>
          </Link>
          <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center relative">
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
          </button>
        </nav>

        <div className="space-y-4">
          <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
            <User className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
            <Settings className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
  )
}

export default NavBar
