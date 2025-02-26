import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import {
  initSocket,
  joinRoom,
  sendPrivateMessage,
  sendFileMessage,
  subscribeToMessages,
  disconnectSocket,
} from "../service/socketService";
import { fetchChatHistory, fetchAllMember } from "../service/chatService";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Shared state
  const [username, setUsername] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  // Store the whole user object in selectedUser
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});

  const socketRef = useRef(null);
  const selectedUserIdRef = useRef(selectedUserId);
  const employeeIdRef = useRef(employeeId);

  const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

  // Load stored user info
  useEffect(() => {
    setUsername(localStorage.getItem("userName"));
    setEmployeeId(localStorage.getItem("employeeId"));
  }, []);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  useEffect(() => {
    employeeIdRef.current = employeeId;
  }, [employeeId]);

  // Initialize Socket and subscribe to messages
  useEffect(() => {
    socketRef.current = initSocket(SOCKET_SERVER_URL, employeeId);

    subscribeToMessages(
      socketRef.current,
      selectedUserIdRef,
      employeeIdRef,
      setMessages,
      (senderId) => {
        // Increase unread count if the message is not in the active conversation
        setUnreadCounts((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
    );

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [employeeId, SOCKET_SERVER_URL]);

  // Fetch employees (both subordinates and managers)
  const fetchEmployees = useCallback(async () => {
    try {
      const [subsResponse] = await Promise.all([
        fetchAllMember(),
        // fetchBoth(),
      ]);
      const subs = subsResponse.data?.data || [];
      // const managers = managersResponse.data?.data || [];
      setEmployees([...subs]);
    } catch (err) {
      console.error(err);
      setError("Error fetching employees. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // When a user is selected, join their chat room and clear unread count.
  // The function now accepts a complete user object.
  // In src/contexts/ChatContext.js
  const selectUser = useCallback(
    (user) => {
      if (user.employee_Id !== selectedUserId) {
        setMessages([]);
      }
      setSelectedUser(user);
      setSelectedUserId(user.employee_Id);
      setUnreadCounts((prev) => {
        const newState = { ...prev };
        delete newState[user.employee_Id];
        return newState;
      });
      // Use employee_Id for the payload instead of _id
      joinRoom(socketRef.current, employeeId, user.employee_Id);
      socketRef.current.emit("markRead", {
        sender: employeeId,
        receiver: user.employee_Id,
      });
    },
    [employeeId, selectedUserId]
  );

  // Send a text message
  const sendMessageHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!message.trim() || !selectedUserId) return;
      const msgData = {
        sender: employeeId,
        receiver: selectedUserId,
        message,
        time: new Date().toISOString(),
      };
      sendPrivateMessage(socketRef.current, msgData);
      setMessage("");
    },
    [employeeId, message, selectedUserId]
  );

  // Helper: Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Send a file message
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
        // Optimistic UI update: add a temporary file bubble
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

  // Fetch chat history for the selected conversation
  const fetchMessages = useCallback(async () => {
    if (!selectedUserId) return;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found. Please log in.");
      return;
    }
    try {
      const data = await fetchChatHistory(
        employeeId,
        selectedUserId,
        accessToken
      );
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
    <ChatContext.Provider
      value={{
        username,
        employeeId,
        messages,
        setMessages,
        message,
        setMessage,
        employees,
        selectedUser,
        selectedUserId,
        error,
        unreadCounts,
        selectUser,
        sendMessageHandler,
        sendFileHandler,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
