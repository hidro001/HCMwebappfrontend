import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import { FaCommentDots } from "react-icons/fa";
import ChatMember from "./ChatMember";
import ChatList from "./ChatList";
import { fetchSubordinates, fetchBoth,fetchChatHistory } from "../../service/chatService";
import {
  initSocket,
  joinRoom,
  sendPrivateMessage,
  sendFileMessage,
  subscribeToMessages,
  disconnectSocket,
} from "../../service/socketService";


export default function ChatHome() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [employeeId, setEmployeeId] = useState("EMP0001");
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);
  const selectedUserIdRef = useRef(selectedUserId);
  const employeeIdRef = useRef(employeeId);

  const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

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

  // --- Initialize Socket ---
  useEffect(() => {
    socketRef.current = initSocket(SOCKET_SERVER_URL, employeeId);
    subscribeToMessages(socketRef.current, selectedUserIdRef, employeeIdRef, setMessages);

    return () => {
      disconnectSocket();
    };
  }, [employeeId, SOCKET_SERVER_URL]);

  // --- Fetch Employees ---
  const fetchEmployees = useCallback(async () => {
    try {
      const [subsResponse, managersResponse] = await Promise.all([
        fetchSubordinates(),
        fetchBoth(),
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
      joinRoom(socketRef.current, employeeId, id);
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
      sendPrivateMessage(socketRef.current, msgData);
      setMessage("");
    },
    [employeeId, message, selectedUserId]
  );

  // --- Helper: Convert file to base64 & send ---
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

        sendFileMessage(socketRef.current, fileData);

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
        console.error("Error sending file:", error);
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
      const data = await fetchChatHistory(employeeId, selectedUserId, accessToken);
      if (data?.success) {
        setMessages(
          data.data.map((m) => ({
            ...m,
            time: new Date(m.time).toLocaleTimeString(),
          }))
        );
      } else {
        setError(data.message || "Failed to fetch chat history.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching chat history. Please try again later.");
    }
  }, [employeeId, selectedUserId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="flex w-full bg-gray-100 dark:bg-gray-900 h-screen" style={{ height: "70vh" }}>
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
