import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-hot-toast"; // or 'react-toastify'
import { FaUserCircle, FaPhone, FaVideo, FaPaperclip, FaCommentDots } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PuffLoader } from "react-spinners";
import ChatMember from "./ChatMember";
import ChatList from "./ChatList";


// ------------- ChatHome (Main) -------------
export default function ChatHome() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [employeeId, setEmployeeId] = useState("EMP0001");
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);

  const socketRef = useRef();
  const selectedUserIdRef = useRef(selectedUserId);
  const employeeIdRef = useRef(employeeId);

  const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL 

  // --- Load stored user info ---
  useEffect(() => {
    setUsername(localStorage.getItem("userName") || "Guest");
    setEmployeeId(localStorage.getItem("employeeId") || "EMP0001");
  }, []);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  useEffect(() => {
    employeeIdRef.current = employeeId;
  }, [employeeId]);

  // --- Socket Setup ---
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socketRef.current.on("connect", () => {
      // console.log("✅ Connected to:", SOCKET_SERVER_URL);
      if (employeeId) {
        socketRef.current.emit("joinRoom", {
          sender: employeeId,
          receiver: employeeId,
        });
      }
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection Error:", err);
      toast.error("Unable to connect to chat server.");
    });

    socketRef.current.on("disconnect", (reason) => {
      // console.warn("❌ Disconnected:", reason);s
      if (reason === "io server disconnect") {
        socketRef.current.connect();
      }
    });

    // Incoming message handler
    socketRef.current.on("receiveMessage", (data) => {
      const isRelevant =
        (data.sender === selectedUserIdRef.current &&
          data.receiver === employeeIdRef.current) ||
        (data.sender === employeeIdRef.current &&
          data.receiver === selectedUserIdRef.current);

      if (!isRelevant) return;

      // For file messages from the current user, update the “uploading” message
      if (data.type === "file" && data.sender === employeeIdRef.current) {
        setMessages((prev) =>
          prev.map((msg) => {
            if (
              msg.type === "file" &&
              msg.fileName === data.fileName &&
              msg.uploading &&
              msg.sender === data.sender
            ) {
              return {
                ...msg,
                fileUrl: data.fileUrl,
                uploading: false,
                time: new Date(data.time).toLocaleTimeString(),
              };
            }
            return msg;
          })
        );
      } else {
        // Normal text message or file from the other user
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            type: data.type || "text",
            message: data.message || "",
            fileUrl: data.fileUrl || "",
            fileName: data.fileName || "",
            fileType: data.fileType || "",
            time: new Date(data.time).toLocaleTimeString(),
          },
        ]);
      }
    });

    socketRef.current.on("error", (data) => {
      console.error("Server Error:", data.message);
      toast.error(data.message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [employeeId, SOCKET_SERVER_URL]);

  // --- Fetch Employees ---
  const fetchEmployees = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found. Please log in.");
      return;
    }
    try {
      const [subsResponse, managersResponse] = await Promise.all([
        axios.get("https://apiv2.humanmaximizer.com/api/v1/admin/subordinates", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios.get("https://apiv2.humanmaximizer.com/api/v1/admin/both", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      const subs = subsResponse.data?.data || [];
      const managers = managersResponse.data?.data || [];
      setEmployees([...subs, ...managers]);
    } catch (err) {
      console.error(err);
      setError("Error fetching employees. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // --- Select User ---
  const handleSelectUser = useCallback(
    (name, id) => {
      if (id !== selectedUserId) {
        setMessages([]);
      }
      setSelectedUser(name);
      setSelectedUserId(id);
      socketRef.current.emit("joinRoom", {
        sender: employeeId,
        receiver: id,
      });
    },
    [employeeId, selectedUserId]
  );

  // --- Send Text Message ---
  const sendMessageHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!message.trim() || !selectedUserId) return;

      const msgData = {
        sender: employeeId,
        receiver: selectedUserId,
        message: message,
        time: new Date().toISOString(),
      };
      socketRef.current.emit("privateMessage", msgData);
      setMessage("");
    },
    [employeeId, message, selectedUserId]
  );

  // --- Convert file to base64 & send ---
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const sendFileHandler = useCallback(
    async (file) => {
      if (!selectedUserId) {
        toast.error("Select a user first.");
        return;
      }
      try {
        const base64File = await fileToBase64(file);
        const fileData = {
          sender: employeeId,
          receiver: selectedUserId,
          file: base64File,
          fileName: file.name,
          fileType: file.type,
        };

        socketRef.current.emit("sendFile", fileData);

        // Optimistic UI update: show a 'sending' file bubble
        const uniqueId = `${file.name}-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          {
            id: uniqueId,
            sender: employeeId,
            type: "file",
            fileUrl: "",
            fileName: file.name,
            fileType: file.type,
            time: new Date().toLocaleTimeString(),
            uploading: true,
          },
        ]);
       
      } catch (error) {
        console.error("❌ Error sending file:", error);
        toast.error("Failed to send file.");
      }
    },
    [employeeId, selectedUserId]
  );

  // --- Fetch Chat History for selected user ---
  const fetchMessages = useCallback(async () => {
    if (!selectedUserId) return;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found. Please log in.");
      return;
    }
    try {
      const response = await axios.get(
        `${SOCKET_SERVER_URL}/api/v1/chats/messages`,
        {
          params: { user1: employeeId, user2: selectedUserId },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data?.success) {
        setMessages(
          response.data.data.map((m) => ({
            ...m,
            time: new Date(m.time).toLocaleTimeString(),
          }))
        );
      } else {
        setError(response.data.message || "Failed to fetch chat history.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching chat history. Please try again later.");
    }
  }, [employeeId, selectedUserId, SOCKET_SERVER_URL]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="flex w-full bg-gray-100 dark:bg-gray-900 h-screen" style={{height:"70vh"}}>
      {/* Left side: Team Member List */}
      <ChatMember
        employees={employees}
        currentUser={employeeId}
        onSelectUser={handleSelectUser}
      />
      {/* Right side: Chat */}
      {selectedUser ? (
        <ChatList
          messages={messages}
          currentUser={employeeId}
          selectedUser={selectedUser}
          selectedUserId={selectedUserId}
          sendMessage={sendMessageHandler}
          message={message}
          setMessage={setMessage}
          sendFile={sendFileHandler}
        />
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-gray-600 dark:text-gray-400">
          <FaCommentDots className="w-20 h-20 mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-lg font-semibold">No Chats Selected</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Looks quiet here... Select a contact and start chatting!
          </p>
        </div>
      )}
    </div>
  );
}
