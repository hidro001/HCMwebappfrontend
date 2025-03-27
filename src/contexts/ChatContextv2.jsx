// // src/contexts/ChatContextv2.js
// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { toast } from "react-toastify";

// // Socket services (replace with your actual socketService)
// import {
//   initSocket,
//   joinRoom,
//   sendPrivateMessage,
//   sendFileMessage,
//   disconnectSocket,
// } from "../service/socketService";

// // API calls (replace with your actual chatService)
// import { fetchChatHistory, fetchAllMember } from "../service/chatService";

// // Zustand store
// import useAuthStore from "../store/store";

// export const ChatContextv2 = createContext();

// const baseUrlSocket = "http://localhost:6060/chat";

// export function ChatProviderv2({ children }) {
//   // ------------------------------------------------------------------
//   // Basic user info
//   // ------------------------------------------------------------------
//   const { employeeId: storeEmployeeId, userName: storeUserName } = useAuthStore();
//   const [employeeId, setEmployeeId] = useState("");
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (storeEmployeeId) setEmployeeId(storeEmployeeId);
//     if (storeUserName) setUsername(storeUserName);
//   }, [storeEmployeeId, storeUserName]);

//   // ------------------------------------------------------------------
//   // Members (for "Members" tab)
//   // ------------------------------------------------------------------
//   const [members, setMembers] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMembers = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { success, count, data } = await fetchAllMember();
//       if (success) {
//         const normalized = data.map((m) => ({
//           ...m,
//           employeeId: m.employee_Id,
//           userAvatar: m.user_Avatar,
//           firstName: m.first_Name,
//           lastName: m.last_Name,
//         }));
//         setMembers(normalized);
//         setTotalCount(count);
//       } else {
//         setError("Failed to fetch members from server.");
//       }
//     } catch (err) {
//       console.error("Error fetching members:", err);
//       setError("Error fetching members. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMembers();
//   }, [fetchMembers]);

//   // ------------------------------------------------------------------
//   // Conversations
//   // ------------------------------------------------------------------
//   const [conversations, setConversations] = useState([]);
//   const [conversationsLoading, setConversationsLoading] = useState(false);
//   const [conversationsError, setConversationsError] = useState(null);

//   // ------------------------------------------------------------------
//   // Current / active conversation
//   // ------------------------------------------------------------------
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedConversation, setSelectedConversation] = useState(null);

//   // Decide which conversation is active
//   const activeConversation = useMemo(() => {
//     return selectedUser || selectedConversation || null;
//   }, [selectedUser, selectedConversation]);

//   // Messages for that active conversation
//   const [messages, setMessages] = useState([]);
//   const [messagesLoading, setMessagesLoading] = useState(false);

//   // Our typed input
//   const [message, setMessage] = useState("");

//   // Socket references
//   const socketRef = useRef(null);
//   const employeeIdRef = useRef("");
//   const activeConversationIdRef = useRef("");

//   useEffect(() => {
//     employeeIdRef.current = employeeId;
//   }, [employeeId]);

//   useEffect(() => {
//     activeConversationIdRef.current = activeConversation?.employeeId || "";
//   }, [activeConversation]);

//   // ------------------------------------------------------------------
//   // Initialize socket, fetch conversation list, handle new messages
//   // ------------------------------------------------------------------
//   useEffect(() => {
//     if (!employeeId) return;

//     // 1) Connect
//     socketRef.current = initSocket(baseUrlSocket, employeeId);

//     // 2) Fetch conversation list
//     const fetchConversations = () => {
//       setConversationsLoading(true);
//       setConversationsError(null);
//       socketRef.current.emit("getAllConverationUser", employeeId);
//     };

//     // 3) Handle conversation list response
//     const handleAllRoomIds = (data) => {
//       setConversationsLoading(false);
//       if (!data.success) {
//         setConversationsError(data.message || "Error fetching conversations");
//         return;
//       }
//       const normalized = data.data.map((item) => ({
//         ...item,
//         employeeId: item.employee_Id,
//         firstName: item.first_Name,
//         lastName: item.last_Name,
//         userAvatar: item.user_Avatar,
//         unreadCount: item.unreadCount || 0,
//       }));
//       setConversations(normalized);
//     };

//     // 4) Handle new messages (server broadcast)
//     const handleNewMessage = (data) => {
//       const { sender, receiver } = data;
//       const fromMe = sender === employeeIdRef.current;
//       const partnerId = fromMe ? receiver : sender;

//       // If message belongs to the active conversation, append it to messages
//       if (partnerId === activeConversationIdRef.current) {
//         setMessages((prev) => [...prev, data]);
//       }
//       // Otherwise, increment unread if it's from someone else
//       else if (!fromMe) {
//         setConversations((prev) => {
//           const index = prev.findIndex((c) => c.employeeId === partnerId);
//           // If not found, add a new conversation
//           if (index === -1) {
//             return [
//               {
//                 employeeId: partnerId,
//                 firstName: data.senderName || "Unknown",
//                 lastName: "",
//                 userAvatar: null,
//                 unreadCount: 1,
//               },
//               ...prev,
//             ];
//           }
//           // If found, increment unread
//           const oldConv = prev[index];
//           const updated = {
//             ...oldConv,
//             unreadCount: (oldConv.unreadCount || 0) + 1,
//           };
//           const newList = [...prev];
//           newList.splice(index, 1);
//           return [updated, ...newList];
//         });
//       }
//     };

//     fetchConversations();
//     socketRef.current.on("allRoomIds", handleAllRoomIds);
//     socketRef.current.on("receiveMessage", handleNewMessage);

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off("allRoomIds", handleAllRoomIds);
//         socketRef.current.off("receiveMessage", handleNewMessage);
//       }
//       disconnectSocket();
//     };
//   }, [employeeId]);

//   // ------------------------------------------------------------------
//   // Selecting a conversation or user
//   // ------------------------------------------------------------------
//   const clearActiveConversation = useCallback(() => {
//     setSelectedUser(null);
//     setSelectedConversation(null);
//     setMessages([]);
//   }, []);

//   const handleSelectConversation = useCallback(
//     (conv) => {
//       if (!socketRef.current || !employeeId) return;
//       setSelectedConversation(conv);
//       setSelectedUser(null);
//       setMessages([]); // will fetch messages below

//       // Clear unread
//       setConversations((prev) =>
//         prev.map((c) =>
//           c.employeeId === conv.employeeId ? { ...c, unreadCount: 0 } : c
//         )
//       );

//       // Join the room & mark read
//       joinRoom(socketRef.current, employeeId, conv.employeeId);
//       socketRef.current.emit("markRead", {
//         sender: employeeId,
//         receiver: conv.employeeId,
//       });
//     },
//     [employeeId]
//   );

//   const handleSelectUser = useCallback(
//     (user) => {
//       if (!socketRef.current || !employeeId) return;
//       setSelectedUser(user);
//       setSelectedConversation(null);
//       setMessages([]); // will fetch messages below

//       // Clear unread
//       setConversations((prev) =>
//         prev.map((c) =>
//           c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c
//         )
//       );

//       joinRoom(socketRef.current, employeeId, user.employeeId);
//       socketRef.current.emit("markRead", {
//         sender: employeeId,
//         receiver: user.employeeId,
//       });
//     },
//     [employeeId]
//   );

//   // ------------------------------------------------------------------
//   // Fetch message history whenever active conversation changes
//   // ------------------------------------------------------------------
//   const fetchMessagesHistory = useCallback(async () => {
//     if (!activeConversation?.employeeId) {
//       setMessages([]);
//       return;
//     }
//     setMessagesLoading(true);
//     try {
//       const res = await fetchChatHistory(employeeId, activeConversation.employeeId);
//       if (res?.success) {
//         setMessages(res.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching chat history:", err);
//     } finally {
//       setMessagesLoading(false);
//     }
//   }, [employeeId, activeConversation]);

//   useEffect(() => {
//     fetchMessagesHistory();
//   }, [fetchMessagesHistory]);

//   // ------------------------------------------------------------------
//   // Sending messages: DO NOT APPEND LOCALLY
//   // Let "receiveMessage" handle it
//   // ------------------------------------------------------------------
//   const sendMessageHandler = useCallback(() => {
//     if (!message.trim() || !activeConversation?.employeeId) return;
//     if (!socketRef.current) return;

//     const msgData = {
//       sender: employeeId,
//       receiver: activeConversation.employeeId,
//       message,
//       time: new Date().toISOString(),
//     };
//     sendPrivateMessage(socketRef.current, msgData);
//     setMessage(""); 
//   }, [employeeId, message, activeConversation]);

//   const sendFileHandler = useCallback(
//     async (file) => {
//       if (!activeConversation?.employeeId) {
//         toast.error("Select a conversation first.");
//         return;
//       }
//       if (!socketRef.current) return;

//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64File = reader.result;
//         const fileData = {
//           sender: employeeId,
//           receiver: activeConversation.employeeId,
//           file: base64File,
//           fileName: file.name,
//           fileType: file.type,
//           time: new Date().toISOString(),
//           type: "file",
//         };
//         sendFileMessage(socketRef.current, fileData);
//       };
//       reader.onerror = (err) => console.error("File reading error:", err);
//       reader.readAsDataURL(file);
//     },
//     [employeeId, activeConversation]
//   );

//   // ------------------------------------------------------------------
//   // Final context value
//   // ------------------------------------------------------------------
//   const contextValue = useMemo(() => {
//     return {
//       // Basic user info
//       employeeId,
//       username,

//       // Members
//       members,
//       totalCount,
//       loading,
//       error,
//       fetchMembers,

//       // Conversations
//       conversations,
//       conversationsLoading,
//       conversationsError,
//       handleSelectConversation,
//       handleSelectUser,
//       clearActiveConversation,

//       // Active conversation
//       selectedUser,
//       setSelectedUser,
//       selectedConversation,
//       setSelectedConversation,
//       activeConversation,

//       // Chat messages
//       messages,
//       messagesLoading,
//       message,
//       setMessage,
//       sendMessageHandler,
//       sendFileHandler,
//     };
//   }, [
//     employeeId,
//     username,
//     members,
//     totalCount,
//     loading,
//     error,
//     fetchMembers,
//     conversations,
//     conversationsLoading,
//     conversationsError,
//     selectedUser,
//     selectedConversation,
//     activeConversation,
//     messages,
//     messagesLoading,
//     message,
//     sendMessageHandler,
//     sendFileHandler,
//     clearActiveConversation,
//   ]);

//   return (
//     <ChatContextv2.Provider value={contextValue}>
//       {children}
//     </ChatContextv2.Provider>
//   );
// }

// ChatContextv2.js

import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import {
  initSocket,
  joinRoom,
  sendPrivateMessage,
  sendFileMessage,
  disconnectSocket,
} from "../service/socketService";
import { fetchChatHistory, fetchAllMember } from "../service/chatService";
import useAuthStore from "../store/store";

export const ChatContextv2 = createContext();

const baseUrlSocket = "http://localhost:6060/chat";

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
  // Members
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

  // ------------------------------------------------------------------
  // Current / active conversation
  // ------------------------------------------------------------------
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const activeConversation = useMemo(() => {
    return selectedUser || selectedConversation || null;
  }, [selectedUser, selectedConversation]);

  // Messages for the active conversation
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Input message
  const [message, setMessage] = useState("");

  // Socket references
  const socketRef = useRef(null);
  const employeeIdRef = useRef("");
  const activeConversationIdRef = useRef("");

  useEffect(() => {
    employeeIdRef.current = employeeId;
  }, [employeeId]);

  useEffect(() => {
    activeConversationIdRef.current = activeConversation?.employeeId || "";
  }, [activeConversation]);

  // ------------------------------------------------------------------
  // Initialize socket and handle real-time updates
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!employeeId) return;

    // 1) Connect
    socketRef.current = initSocket(baseUrlSocket, employeeId);

    // 2) Fetch conversation list
    const fetchConversations = () => {
      setConversationsLoading(true);
      setConversationsError(null);
      socketRef.current.emit("getAllConverationUser", employeeId);
    };

    // 3) Handle conversation list response
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

    // 4) Handle new messages (server broadcast) -> Real-time unread badges here
    const handleNewMessage = (data) => {
      const { sender, receiver } = data;
      const fromMe = sender === employeeIdRef.current;
      // The "other person" in the conversation
      const partnerId = fromMe ? receiver : sender;

      // If this belongs to the currently open conversation, just append it
      if (partnerId === activeConversationIdRef.current) {
        setMessages((prev) => [...prev, data]);
      }
      // If it's from someone else (i.e. I received a new message),
      // update the unread count and move that conversation to top:
      else if (!fromMe) {
        setConversations((prev) => {
          const index = prev.findIndex((c) => c.employeeId === partnerId);

          // If conversation is brand new (not in the list yet)
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

          // Otherwise, increment unread
          const oldConv = prev[index];
          const updated = {
            ...oldConv,
            unreadCount: (oldConv.unreadCount || 0) + 1,
          };

          // Remove the old conversation from the array
          const newList = [...prev];
          newList.splice(index, 1);
          // Put updated conversation at the top
          return [updated, ...newList];
        });
      }
    };

    fetchConversations();
    socketRef.current.on("allRoomIds", handleAllRoomIds);
    socketRef.current.on("receiveMessage", handleNewMessage);

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.off("allRoomIds", handleAllRoomIds);
        socketRef.current.off("receiveMessage", handleNewMessage);
      }
      disconnectSocket();
    };
  }, [employeeId]);

  // ------------------------------------------------------------------
  // Selecting a conversation or user
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
      setMessages([]); // will refetch below

      // Reset unread locally
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === conv.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );

      // Join room & mark read
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
      setMessages([]); // will refetch below

      // Reset unread locally
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
  // Sending messages
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

  const sendFileHandler = useCallback(
    async (file) => {
      if (!activeConversation?.employeeId) {
        toast.error("Select a conversation first.");
        return;
      }
      if (!socketRef.current) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result;
        const fileData = {
          sender: employeeId,
          receiver: activeConversation.employeeId,
          file: base64File,
          fileName: file.name,
          fileType: file.type,
          time: new Date().toISOString(),
          type: "file",
        };
        sendFileMessage(socketRef.current, fileData);
      };
      reader.onerror = (err) => console.error("File reading error:", err);
      reader.readAsDataURL(file);
    },
    [employeeId, activeConversation]
  );

  // ------------------------------------------------------------------
  // Build context value
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
      handleSelectConversation,
      handleSelectUser,
      clearActiveConversation,

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
      sendFileHandler,
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
  ]);

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}
    </ChatContextv2.Provider>
  );
}
