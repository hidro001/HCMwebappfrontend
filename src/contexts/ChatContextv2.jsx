import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  initSocket,
  joinRoom,
  sendPrivateMessage,
  disconnectSocket,
} from "../service/socketService";
import { fetchChatHistory, fetchAllMember } from "../service/chatService";
import useAuthStore from "../store/store";
import axios from "axios";
import { toast } from "react-hot-toast";

export const ChatContextv2 = createContext();

const baseUrlSocket = import.meta.env.VITE_SOCKET_URL;

export function ChatProviderv2({ children }) {
  // ------------------------------------------------------------------
  // Basic user info
  // ------------------------------------------------------------------
  const { employeeId: storeEmployeeId, userName: storeUserName } = useAuthStore();
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (storeEmployeeId) setEmployeeId(storeEmployeeId);
    if (storeUserName) setUsername(storeUserName);
  }, [storeEmployeeId, storeUserName]);

  // ------------------------------------------------------------------
  // Member list
  // ------------------------------------------------------------------
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { success, count, data } = await fetchAllMember();
      if (success) {
        const normalized = data.map((m) => ({
          ...m,
          employeeId: m.employee_Id,
          userAvatar: m.user_Avatar,
          firstName: m.first_Name,
          lastName: m.last_Name,
        }));
        setMembers(normalized);
        setTotalCount(count);
      } else {
        setError("Failed to fetch members from server.");
      }
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Error fetching members. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // ------------------------------------------------------------------
  // Conversations
  // ------------------------------------------------------------------
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [conversationsError, setConversationsError] = useState(null);

  // Current or active conversation
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const activeConversation = useMemo(() => {
    return selectedUser || selectedConversation || null;
  }, [selectedUser, selectedConversation]);

  // ------------------------------------------------------------------
  // Chat messages & input
  // ------------------------------------------------------------------
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ------------------------------------------------------------------
  // Socket references & initialization
  // ------------------------------------------------------------------
  const socketRef = useRef(null);
  const employeeIdRef = useRef("");
  const activeConversationIdRef = useRef("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    employeeIdRef.current = employeeId;
  }, [employeeId]);

  useEffect(() => {
    activeConversationIdRef.current = activeConversation?.employeeId || "";
  }, [activeConversation]);

  useEffect(() => {
    if (!employeeId) return;

    // Connect the socket
    socketRef.current = initSocket(baseUrlSocket, employeeId, token);

    // Fetch conversation list
    const fetchConversations = () => {
      setConversationsLoading(true);
      setConversationsError(null);
      socketRef.current.emit("getAllConverationUser", employeeId);
    };

    // Handle conversation list response
    const handleAllRoomIds = (data) => {
      setConversationsLoading(false);
      if (!data.success) {
        setConversationsError(data.message || "Error fetching conversations");
        return;
      }
      const normalized = data.data.map((item) => ({
        ...item,
        employeeId: item.employee_Id,
        firstName: item.first_Name,
        lastName: item.last_Name,
        userAvatar: item.user_Avatar,
        unreadCount: item.unreadCount || 0,
      }));
      setConversations(normalized);
    };

    // Real-time new messages
    const handleNewMessage = (data) => {
      const { sender, receiver } = data;
      const fromMe = sender === employeeIdRef.current;
      const partnerId = fromMe ? receiver : sender;

      if (partnerId === activeConversationIdRef.current) {
        setMessages((prev) => [...prev, data]);
      } else if (!fromMe) {
        setConversations((prev) => {
          const index = prev.findIndex((c) => c.employeeId === partnerId);
          if (index === -1) {
            return [
              {
                employeeId: partnerId,
                firstName: data.senderName || "Unknown",
                lastName: "",
                userAvatar: null,
                unreadCount: 1,
              },
              ...prev,
            ];
          }
          const oldConv = prev[index];
          const updated = {
            ...oldConv,
            unreadCount: (oldConv.unreadCount || 0) + 1,
          };
          const newList = [...prev];
          newList.splice(index, 1);
          return [updated, ...newList];
        });
      }
    };

    fetchConversations();
    socketRef.current.on("allRoomIds", handleAllRoomIds);
    socketRef.current.on("receiveMessage", handleNewMessage);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("allRoomIds", handleAllRoomIds);
        socketRef.current.off("receiveMessage", handleNewMessage);
      }
      disconnectSocket();
    };
  }, [employeeId, token]);

  // ------------------------------------------------------------------
  // Selecting a conversation
  // ------------------------------------------------------------------
  const clearActiveConversation = useCallback(() => {
    setSelectedUser(null);
    setSelectedConversation(null);
    setMessages([]);
  }, []);

  const handleSelectConversation = useCallback(
    (conv) => {
      if (!socketRef.current || !employeeId) return;
      setSelectedConversation(conv);
      setSelectedUser(null);
      setMessages([]);

      // Reset unreadCount for this conversation
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === conv.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );

      joinRoom(socketRef.current, employeeId, conv.employeeId);
      socketRef.current.emit("markRead", {
        sender: employeeId,
        receiver: conv.employeeId,
      });
    },
    [employeeId]
  );

  const handleSelectUser = useCallback(
    (user) => {
      if (!socketRef.current || !employeeId) return;
      setSelectedUser(user);
      setSelectedConversation(null);
      setMessages([]);

      // Reset unreadCount for this user (if present in conversations)
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );

      joinRoom(socketRef.current, employeeId, user.employeeId);
      socketRef.current.emit("markRead", {
        sender: employeeId,
        receiver: user.employeeId,
      });
    },
    [employeeId]
  );

  // ------------------------------------------------------------------
  // Fetch message history
  // ------------------------------------------------------------------
  const fetchMessagesHistory = useCallback(async () => {
    if (!activeConversation?.employeeId) {
      setMessages([]);
      return;
    }
    setMessagesLoading(true);
    try {
      const res = await fetchChatHistory(employeeId, activeConversation.employeeId);
      if (res?.success) {
        setMessages(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
    } finally {
      setMessagesLoading(false);
    }
  }, [employeeId, activeConversation]);

  useEffect(() => {
    fetchMessagesHistory();
  }, [fetchMessagesHistory]);

  // ------------------------------------------------------------------
  // Sending text messages
  // ------------------------------------------------------------------
  const sendMessageHandler = useCallback(() => {
    if (!message.trim() || !activeConversation?.employeeId) return;
    if (!socketRef.current) return;

    const msgData = {
      sender: employeeId,
      receiver: activeConversation.employeeId,
      message,
      time: new Date().toISOString(),
    };
    sendPrivateMessage(socketRef.current, msgData);
    setMessage("");
  }, [employeeId, message, activeConversation]);

  // ------------------------------------------------------------------
  // Sending files (with progress callback)
  // ------------------------------------------------------------------
  const MAX_FILE_SIZE_MB = 20;
  const MAX_FILES = 10;
  
  const sendFileHandler = useCallback(
    async (files, onProgress) => {
      if (!files?.length || !socketRef.current || !activeConversation?.employeeId) {
        return;
      }
  
      // Check total files limit
      if (files.length > MAX_FILES) {
        toast.error(`Please select at most ${MAX_FILES} files at a time.`);
        return;
      }
  
      // We'll pass this down to the backend
      const totalFileCount = files.length;
  
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast.error(`${file.name} is too large (max ${MAX_FILE_SIZE_MB} MB).`);
          if (onProgress) onProgress(file.name, -1);
          continue;
        }
  
        try {
          // --- Pass totalFileCount in the data object ---
          const { success, data, message: errorMsg } = await new Promise((resolve) => {
            socketRef.current.emit(
              "getPreSignedUploadURL",
              {
                key: file.name,
                contentType: file.type,
                size: file.size,
                totalFileCount, // <=== sending number of files here
              },
              (response) => resolve(response)
            );
          });
  
          if (!success || !data?.uploadUrl) {
            console.error("Failed to generate upload URL:", errorMsg);
            toast.error(`Upload URL generation failed for ${file.name}.`);
            if (onProgress) onProgress(file.name, -1);
            continue;
          }
  
          const { uploadUrl, uniqueKey } = data;
  
          await axios.put(uploadUrl, file, {
            headers: { "Content-Type": file.type },
            onUploadProgress: (event) => {
              if (onProgress) {
                const percent = Math.round((event.loaded * 100) / event.total);
                onProgress(file.name, percent);
              }
            },
          });
  
          // Confirm with server
          const roomId = [employeeId, activeConversation.employeeId].sort().join("_");
          const confirmResponse = await new Promise((resolve) => {
            socketRef.current.emit(
              "confirmUpload",
              {
                uniqueKey,
                roomId,
                sender: employeeId,
                receiver: activeConversation.employeeId,
                fileName: file.name,
                fileType: file.type,
              },
              (cbResp) => resolve(cbResp)
            );
          });
  
          if (confirmResponse.success) {
            if (confirmResponse.data?.newMessage) {
              setMessages((prev) => [...prev, confirmResponse.data.newMessage]);
            }
            if (onProgress) onProgress(file.name, 100);
          } else {
            console.error("Failed to save file metadata:", confirmResponse.message);
            toast.error(`Failed to save file metadata for ${file.name}.`);
            if (onProgress) onProgress(file.name, -1);
          }
        } catch (err) {
          console.error("File upload error:", err);
          toast.error(`Upload error: ${file.name}.`);
          if (onProgress) onProgress(file.name, -1);
        }
      }
    },
    [employeeId, activeConversation]
  );
  
  // ------------------------------------------------------------------
  // requestFileURL for on-click
  // ------------------------------------------------------------------
  const requestFileURL = useCallback((fileName) => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        return reject(new Error("Socket not connected"));
      }
      socketRef.current.emit("requestFileURL", { fileName }, (response) => {
        if (response?.success) {
          resolve(response.data.url);
        } else {
          reject(response?.message || "No URL returned");
        }
      });
    });
  }, []);

  // ------------------------------------------------------------------
  // Derive unread counts
  // ------------------------------------------------------------------
  const unreadCounts = useMemo(() => {
    const map = {};
    conversations.forEach((c) => {
      if (c.employeeId) {
        map[c.employeeId] = c.unreadCount || 0;
      }
    });
    return map;
  }, [conversations]);

  // ------------------------------------------------------------------
  // Final context value
  // ------------------------------------------------------------------
  const contextValue = useMemo(() => {
    return {
      // Basic user info
      employeeId,
      username,

      // Members
      members,
      totalCount,
      loading,
      error,
      fetchMembers,

      // Conversations
      conversations,
      conversationsLoading,
      conversationsError,
      clearActiveConversation,
      handleSelectConversation,
      handleSelectUser,

      // Active conversation
      selectedUser,
      setSelectedUser,
      selectedConversation,
      setSelectedConversation,
      activeConversation,

      // Chat messages
      messages,
      messagesLoading,
      message,
      setMessage,
      sendMessageHandler,

      // File sending
      sendFileHandler,

      // requestFileURL
      requestFileURL,

      // Unread counts
      unreadCounts,
    };
  }, [
    employeeId,
    username,
    members,
    totalCount,
    loading,
    error,
    fetchMembers,
    conversations,
    conversationsLoading,
    conversationsError,
    selectedUser,
    selectedConversation,
    activeConversation,
    messages,
    messagesLoading,
    message,
    sendMessageHandler,
    sendFileHandler,
    clearActiveConversation,
    handleSelectConversation,
    handleSelectUser,
    requestFileURL,
    unreadCounts,
  ]);

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}
    </ChatContextv2.Provider>
  );
}
