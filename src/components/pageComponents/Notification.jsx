import React, { useEffect, useRef, useState } from "react";
import { store } from "../../redux/Store";
import { Bell } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
// import { env } from "@/utils/env";

// import { getConfig } from "../../config";
// let { VITE_notification_svc } = getConfig();

const env = import.meta.env;
const WSbaseURL = env.VITE_WSbaseURL;

// VITE_notification_svc = VITE_notification_svc || env.VITE_notification_svc;

export default function Notification() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const state = store.getState();
  const user_id = state.id;
  const dropdownRef = useRef(null);

  // const handleMarkAsRead = (id) => {
  //     setNotifications(messages.filter(notif => notif.id !== id))
  // }

  const connectChatRoomsWebSocket = async () => {
    // Open WebSocket connection
    const socket = new WebSocket(`${WSbaseURL}/ws/notifications/${user_id}/`);

    socket.onopen = () => {
      console.log("Notification WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [data, ...prevMessages]);
    };

    socket.onclose = () => {
      console.error("WebSocket closed unexpectedly");
      setTimeout(connectChatRoomsWebSocket, 3000);
    };
    socket.onerror = function (error) {
      console.log("WebSocket Error: ", error);
    };

    return () => socket.close();
  };

  const handleMarkAsRead = (id) => {
    setMessages(messages.filter((notif) => notif.id !== id));
  };

  useEffect(() => {
    connectChatRoomsWebSocket();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center justify-center"
      >
        <Bell className="h-5 w-5" />
        {messages.length > 0 && (
          <span className="h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {open && (
        <div className="w-80 h-96 overflow-y-auto rounded-lg ring-3 ring-amber-300 bg-amber-100 absolute top-5 z-20 right-10 p-2">
          <h3 className="text-xl font-medium text-black ">Notification</h3>
          {messages.length === 0 ? (
            <div className="text-center text mt-2">No new notifications</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="flex flex-col items-start p-2 border-b-1 border-b-amber-400"
              >
                <div className="flex justify-between w-full">
                  <span className="font-medium">{msg.notification_type}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
                {msg.notification_type === "  Message" ? (
                  <Link to={`/home/chat/${msg?.senderId}/`}>
                    <button
                      variant="link"
                      size="sm"
                      onClick={() => handleMarkAsRead(index)}
                      className="mt-1 p-0 h-auto"
                    >
                      Open Chat
                    </button>
                  </Link>
                ) : (
                    <Link to={`/home/chat/${msg?.senderId}/`}>
                  <button
                    variant="link"
                    size="sm"
                    onClick={() => handleMarkAsRead(index)}
                    className="mt-1 p-0 h-auto"
                  >
                    View Interest
                  </button>
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
