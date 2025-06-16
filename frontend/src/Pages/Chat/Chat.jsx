import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import axiosInstance  from "../../axios/axiosInstance";
import UserNav from "../../Components/Navbar/userNav";
import { useTranslation } from "react-i18next";
const socket = io("http://localhost:5000");
function Chat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const { id: e } = useParams();
  const [receiverId, setReceiverId] = useState(null);
  const token = sessionStorage.getItem("token");
  const sender_id = sessionStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  const getUserById = () => {
    if (!e) return;
    axiosInstance
      .get(`/users/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({
          name: res.data.data.name,
          email: res.data.data.email,
        });
      })
      .catch((err) => console.log(err));
  };

  const getMessages = () => {
    if (!receiverId) return;
    axiosInstance
      .post(
        "/messages/get",
        { userIds: [sender_id, receiverId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
  };

  const handleMessageSubmit = (s) => {
    if (s.key === "Enter" && message.trim() && receiverId) {
      s.preventDefault();
      // Always fetch latest messages before sending
      getMessages();
      axiosInstance
        .post(
          "/messages/send",
          { sender: sender_id, receiver: receiverId, message },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setMessage("");
          getMessages();
          socket.emit("chat message", res.data);
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  };

  useEffect(() => {
    let receiver = null;
    let receiverName = "";
    // Try to get receiver from navigation state
    if (location.state && location.state.userId && location.state.userName) {
      receiver = location.state.userId;
      receiverName = location.state.userName;
    } else if (e) {
      receiver = e;
    } else {
      // Try to get receiver from localStorage/sessionStorage (for page refresh)
      receiver = sessionStorage.getItem("lastChatUserId");
      receiverName = sessionStorage.getItem("lastChatUserName");
    }

    if (receiver) {
      setReceiverId(receiver);
      if (receiverName) {
        setUser({ name: receiverName, email: "", _id: receiver });
      } else {
        getUserById();
      }
      axiosInstance
        .post(
          "/messages/get",
          { userIds: [sender_id, receiver] },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.error("Error fetching messages:", err);
        });
      // Save receiver info for refresh
      sessionStorage.setItem("lastChatUserId", receiver);
      if (receiverName) sessionStorage.setItem("lastChatUserName", receiverName);
    }
  }, []);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      // Only fetch messages if the new message is for this chat
      if (
        (msg.sender === sender_id && msg.receiver === receiverId) ||
        (msg.sender === receiverId && msg.receiver === sender_id)
      ) {
        getMessages();
      }
    };
    socket.on("chat message", handleNewMessage);
    return () => {
      socket.off("chat message", handleNewMessage);
    };
  }, [receiverId, sender_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <UserNav />
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 mt-22 border-b bg-gradient-to-r from-blue-100 to-purple-100 fixed w-full z-10">
          <span
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 cursor-pointer text-blue-700 hover:text-purple-600 font-semibold text-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("Back")}
          </span>
          <div className="flex flex-col ml-2">
            <span className="font-semibold text-lg text-gray-800">
              {user.name}
            </span>
            {user.email && (
              <span className="text-xs text-gray-500">{user.email}</span>
            )}
          </div>
        </div>
        {/* Messages */}
        <div
          className="flex-1 flex flex-col gap-2 px-6 py-4 mt-38 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 bg-gradient-to-br from-white to-blue-50 min-h-[60vh]"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message, idx) => (
            <div
              className={
                sender_id === message.sender
                  ? "self-end max-w-xs bg-blue-500 text-white p-3 rounded-2xl rounded-br-sm shadow-md"
                  : "self-start max-w-xs bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-sm shadow"
              }
              key={message._id ? `${message._id}-${idx}` : idx}
            >
              <span className="text-sm break-words">{message.message}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form
          className="flex items-center gap-2 px-6 py-4 border-t bg-gradient-to-r from-blue-50 to-purple-50"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm bg-white shadow"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleMessageSubmit}
          />
          <button
            type="button"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-purple-600 transition"
            onClick={(e) =>
              handleMessageSubmit({
                key: "Enter",
                preventDefault: () => e.preventDefault(),
              })
            }
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;