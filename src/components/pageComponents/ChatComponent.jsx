import React from "react";
import { Search, Phone, MoreVertical, Paperclip, Mic, Send } from "lucide-react"
import { ChatList } from "./ChatList";

function ChatComponent() {
  
  return (
    <div className="flex flex-1 min-w-0 m-4 ml-0 bg-white rounded-2xl">
      {/* Chat List */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800/50 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <ChatList />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Design chat</h2>
            <span className="text-sm text-gray-400">23 members, 10 online</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Message bubbles */}
          <div className="flex items-start space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-G8KybZ8c4ee4VwxmmTbUaI9LPJBAsu.png"
              alt="Jasmin Lowery"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Jasmin Lowery</span>
                <span className="text-sm text-gray-400">09:20</span>
              </div>
              <div className="mt-1 bg-purple-600/30 rounded-2xl rounded-tl-none p-3 text-sm">
                I added new flows to our design system. Now you can use them for
                your projects!
              </div>
              <div className="flex items-center mt-1 space-x-2">
                <button className="text-xs bg-gray-800 rounded-full px-2 py-1">
                  👍 4
                </button>
              </div>
            </div>
          </div>

          {/* More messages would go here */}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-4 bg-gray-800/50 rounded-lg px-4 py-2">
            <button className="text-gray-400 hover:text-gray-300">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="Your message"
              className="flex-1 bg-transparent focus:outline-none text-sm"
            />
            <button className="text-gray-400 hover:text-gray-300">
              <Mic className="h-5 w-5" />
            </button>
            <button className="text-purple-500 hover:text-purple-400">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
