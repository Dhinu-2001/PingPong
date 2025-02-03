import { Check } from "lucide-react"
import { store } from "../../redux/Store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const env = import.meta.env;
const WSbaseURL = env.VITE_WSbaseURL;

export function ChatList() {
  const socketRef = React.useRef(null);
    const state = store.getState()
    const user_id = state.id
    const [chats, setChats] = useState([]);
    const navigate = useNavigate()

    const handleNavigate = (chat) =>{
        const recieverId = chat.room.user1 === user_id ? chat.room.user2 : chat.room.user1
        navigate(`/home/chat/${recieverId}`)
    }

    useEffect(() => {
        // Connect to WebSocket
        socketRef.current = new WebSocket(`${WSbaseURL}/ws/chat-list/${user_id}/`);

        // Handle incoming messages
        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            setChats((prev) => {
                const prevChats = prev.filter(
                    (chat) => chat.room.id !== data.room.id
                );
                return [...prevChats];
            });
            setChats((prev) => [data, ...prev]);
            console.log('chatList', chats)
        };
        return () => socketRef.current.close();

    }, [])  

  // const chats = [
  //   {
  //     id: 1,
  //     name: "Design chat",
  //     lastMessage: "Jessie Rollins sent...",
  //     time: "4m",
  //     unread: 1,
  //     isGroup: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Osman Campos",
  //     lastMessage: "You: Hey! We are read...",
  //     time: "20m",
  //     unread: 0,
  //   },
  //   // Add more chat items as needed
  // ]


  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div key={chat.id} className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800/50 cursor-pointer">
          <div className="relative">
            <img src="/placeholder.svg" alt={chat.name} width={48} height={48} className="rounded-full" />
            {chat.isGroup && (
              <span className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                <span className="sr-only">Group chat</span>
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate">{chat.name}</h3>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
              {chat.unread > 0 ? (
                <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unread}
                </span>
              ) : (
                <Check className="h-4 w-4 text-purple-500" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

