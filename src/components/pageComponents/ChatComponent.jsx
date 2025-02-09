import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  MoreVertical,
  Paperclip,
  Mic,
  Send,
  MessageCircle,
} from "lucide-react";
import { ChatList } from "./ChatList";
import { store } from "../../redux/Store";
import { useParams } from "react-router-dom";
import userAxiosInstance from "../../Axios/UserAxios";
import { toast } from "sonner";
import { format } from "date-fns";

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return format(date, "MMMM do, yyyy 'at' h:mm a");
};
const env = import.meta.env;
const WSbaseURL = env.VITE_WSbaseURL;

function ChatComponent() {
  const state = store.getState();
  const senderId = state.id;
  const senderName = state.username ? state.username : "User";

  const [receiverId, setReceiverId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [recieverData, setRecieverData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatStatus, setChatStatus] = useState(null);

  const { reciever_id } = useParams();
  const receiverid = Number(reciever_id);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = React.useRef(null);

  const callWebsocket = async () => {
    console.log("websocket calling");
    try {
      if (roomName) {
        // Connect to WebSocket
        socketRef.current = new WebSocket(`${WSbaseURL}/ws/chat/${roomName}/`);

        // Handle incoming messages
        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setMessages((prev) => [...prev, data]);
        };
        return () => socketRef.current.close();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      setReceiverId(receiverid);
      const room_array = [senderId, receiverid];

      room_array.sort((a, b) => a - b);

      setRoomName(`chat_${room_array[0]}-${room_array[1]}`);
      console.log("receiverid", receiverid, senderId);
      console.log("roomName", roomName);

      const response = await userAxiosInstance.get(`chat/user/${receiverid}/`);
      console.log("reciever data", response.data);
      setRecieverData(response.data.user_data);
      setChatStatus(response.data.chat_room_status);
      setLoading(false);
      if (response.data.chat_room_status === "exist") {
        callWebsocket();
      }
      console.log("chatStatus", response.data.chat_room_status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      if (receiverid) {
        setLoading(true);
        setMessages([]);
        console.log("initail Loading", loading);
        fetchData();
        // if (chatStatus == "exist") {
        //   callWebsocket();
        // }
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [roomName, receiverid]);

  const sendMessage = () => {
    if (message !== "") {
      const recieverName =
        recieverData.username || recieverData.email.split("@")[0];
      const payload = {
        message,
        senderName,
        senderId,
        recieverName,
        receiverId,
      };
      socketRef.current.send(JSON.stringify(payload));
      setMessage("");
    }
  };

  const handleDecisionButton = async (decision) => {
    try {
      const response = await userAxiosInstance.post("chat/decision-interest/", {
        decision,
        roomName,
      });
      console.log("response", response);
      if (response.status == 200) {
        toast.success(`${decision} interest request`);
        if (decision == "Accepted") {
          setChatStatus("exist");
          callWebsocket();
        } else if (decision == "Declined") {
          setChatStatus("not exist");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send response.");
    }
  };

  const handleRequestButton = async () => {
    const status = "Pending";
    try {
      const response = await userAxiosInstance.post(`chat/send-interest/`, {
        senderId,
        receiverId,
        roomName,
        status,
      });

      console.log("response", response);
      if (response.status == 201) {
        setChatStatus("Pending");
        toast.success("Interest request sended!");
      }
    } catch (err) {
      toast.error("Interest request failed to sended!");
    }
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="flex flex-1 min-w-0 m-4 ml-0 bg-white rounded-2xl">
      {/* Chat List */}
      <div className="lg:w-80 w-70  flex flex-col">
        <div className="p-4">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full  rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none ring-2 ring-amber-300"
            />
          </div> */}
          <h1 className="text-2xl font-bold text-amber-400">PingPong</h1>
        </div>
        <ChatList />
      </div>

      {receiverId ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4  border-gray-800">
            <div className="flex item gap-4 w-full">
              {/* <img
                src={recieverData.profile_picture}
                alt="DP"
                width={40}
                height={40}
                className="rounded-full"
              /> */}
              <div className="flex flex-col items-start space-x-4">
                <h2 className="text-xl font-semibold">
                  {recieverData.username}
                </h2>
                <span className="text-sm text-gray-400">
                  {recieverData.email}
                </span>
              </div>
            </div>
            {/* <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div> */}
          </div>

          {chatStatus === "not exist" && (
            <div className="flex-1 flex flex-col justify-center items-center gap-4">
              <h2 className="text-xl font-bold">
                Send an interest request to {recieverData.username}.
              </h2>
              <button
                onClick={handleRequestButton}
                className="py-2 px-4 rounded-full bg-[#f7f478] hover:bg-[#fffd7d] text-black font-medium"
              >
                Send Request
              </button>
            </div>
          )}

          {chatStatus === "Pending" && (
            <div className="flex-1 flex flex-col justify-center items-center gap-4">
              <h2 className="text-xl font-bold">
                Wait for {recieverData.username} to accept your interest
                request.
              </h2>
            </div>
          )}

          {chatStatus === "Decision" && (
            <div className="flex-1 flex flex-col justify-center items-center gap-4">
              <h2 className="text-xl font-bold">
                {recieverData.username} has sent an interest request to you.
              </h2>
              <div className="space-x-3">
                <button
                  onClick={() => handleDecisionButton("Accepted")}
                  className="py-2 px-4 rounded-full bg-[#f7f478] hover:bg-[#fffd7d] text-black font-medium"
                >
                  Accept Request
                </button>
                <button
                  onClick={() => handleDecisionButton("Declined")}
                  className="py-2 px-4 rounded-full bg-[#f7f478] hover:bg-[#fffd7d] text-black font-medium"
                >
                  Reject Request
                </button>
              </div>
            </div>
          )}

          {chatStatus === "exist" && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, index) =>
                  msg.user_id === receiverId ? (
                    <div key={index} className="flex items-end space-x-2">
                      {/* <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt={msg.username} />
                  <AvatarFallback>
                    {msg.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar> */}
                      <div>
                        <div className="p-2 rounded-lg bg-gradient-to-tl from-[#f2f2f2] to-amber-300">
                        <p className="text-sm text-left font-bold ">
                            {recieverData.username}
                          </p>
                          <p className="text-sm text-black">{msg.message}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatDate(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex items-end justify-end space-x-2"
                    >
                      <div>
                        <div className="p-2 pt-1 rounded-lg bg-gradient-to-tl from-[#f2f2f2] to-amber-300 text-black">
                          <p className="text-sm text-right font-bold ">
                            {senderName}
                          </p>
                          <p className="text-2sm">{msg.message}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatDate(msg.timestamp)}
                        </p>
                      </div>

                      {/* <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar> */}
                    </div>
                  )
                )}

                {/* Message bubbles */}
                {/* <div className="flex items-start space-x-3">
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
          </div> */}

                {/* More messages would go here */}
              </div>

              {/* Message Input */}
              <div className="p-4  border-gray-800">
                <div className="flex items-center space-x-4 rounded-lg px-4 py-2">
                  {/* <button className="text-gray-400 hover:text-gray-300">
              <Paperclip className="h-5 w-5" />
            </button> */}
                  <input
                    type="text"
                    placeholder="Your message"
                    className="flex-1 p-3 rounded-full border border-gray-200 pr-10 bg-white ring-2 ring-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 text-sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {/* <button className="text-gray-400 hover:text-gray-300">
              <Mic className="h-5 w-5" />
            </button> */}
                  <button
                    className="text-purple-black hover:text-purple-400"
                    onClick={sendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className=" flex-1 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light">Welcome to PingPong</h1>
            <div className="flex items-center">
              <MessageCircle className="w-9 h-9" />
              <h1>Message</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
