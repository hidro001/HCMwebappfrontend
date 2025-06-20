import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { fetchChatHistory, fetchAllMember } from "../service/chatService";
import useAuthStore from "../store/store";
import { initSocket } from "../service/socketService.js";
import axios from "axios";

export const ChatContextv2 = createContext();

export function ChatProviderv2({ children }) {
  const { employeeId: storedId, userName: storedName } = useAuthStore();
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (storedId) setEmployeeId(storedId);
    if (storedName) setUsername(storedName);
  }, [storedId, storedName]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = localStorage.getItem("accessToken");
      if (newToken !== token) setToken(newToken);
    }, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const [userStatus, setUserStatus] = useState({});
  const [members, setMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [membersError, setMembersError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [conversationsError, setConversationsError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState(null);
  const [groups, setGroups] = useState([]);

  const activeConversation = selectedUser || selectedConversation;
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const socketRef = useRef(null);
  const messageIds = useRef(new Set());
  const userRef = useRef(employeeId);
  const chatRef = useRef(activeConversation?.employeeId);

  useEffect(() => {
    userRef.current = employeeId;
  }, [employeeId]);
  useEffect(() => {
    chatRef.current = activeConversation?.employeeId;
  }, [activeConversation]);

  const MAX_FILE_SIZE_MB = 20;
  const MAX_FILES = 10;

  const loadMembers = useCallback(async () => {
    setLoadingMembers(true);
    setMembersError(null);
    try {
      const { success, count, data } = await fetchAllMember();
      if (!success) throw new Error("Fetch failed");
      const normalized = data.map((m) => ({
        ...m,
        employeeId: m.employee_Id,
        firstName: m.first_Name,
        lastName: m.last_Name,
        userAvatar: m.user_Avatar,
      }));
      setMembers(normalized);
      setMemberCount(count);
    } catch (err) {
      setMembersError("Unable to load members.");
    } finally {
      setLoadingMembers(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  useEffect(() => {
    if (!employeeId) return;
    const socket = initSocket(employeeId, token);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinPersonalRoom", { employeeId });
      setLoadingConversations(true);
      socket.emit("getAllConverationUser", employeeId);
    });

    socket.on("user-online", ({ userId, online }) => {
      setUserStatus((prev) => ({ ...prev, [userId]: online }));
    });

    socket.on("online-users", (onlineUserIds) => {
      setUserStatus((prev) => {
        const updated = { ...prev };
        onlineUserIds.forEach((id) => {
          updated[id] = true;
        });
        return updated;
      });
    });

    socket.on("allRoomIds", (data) => {
      setLoadingConversations(false);
      if (!data.success) {
        setConversationsError(data.message);
        return;
      }
      console.log("All room IDs:", data.data);
      const list = data.data.map((item) => ({
        ...item,
        employeeId: item.employee_Id,
        firstName: item.first_Name,
        lastName: item.last_Name,
        userAvatar: item.user_Avatar,
        unreadCount: item.unreadCount || 0,
        lastMessage: item.lastMessage || null,
        last_seen: item.last_seen || null,
        isOnline: userStatus[item.employee_Id] || false,
      }));

      console.log("Fetched conversations:", list);
      setConversations(list);
    });

    socket.on("receiveMessage", (msg) => {
      const { sender, receiver } = msg;
      if (!sender || sender === "system") return;
      const fromSelf = sender === userRef.current;
      const partner = fromSelf ? receiver : sender;

      if (!messageIds.current.has(msg._id)) {
        messageIds.current.add(msg._id);
        if (partner === chatRef.current) {
          setMessages((prev) => [...prev, msg]);
        } else if (!fromSelf) {
          setConversations((prev) => {
            const idx = prev.findIndex((c) => c.employeeId === partner);
            if (idx < 0) {
              return [
                {
                  employeeId: partner,
                  firstName: msg.senderName || "Unknown",
                  lastMessage: msg,
                  unreadCount: fromSelf ? 0 : 1,
                },
                ...prev,
              ];
            }
            const updated = [...prev];
            const existing = updated[idx];
            updated[idx] = {
              ...existing,
              lastMessage: msg,
              unreadCount: fromSelf ? 0 : (existing.unreadCount || 0) + 1,
            };
            return [updated[idx], ...updated.filter((_, i) => i !== idx)];
          });
        }
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [employeeId, token]);

  const createGroupUIFlow = (groupName, memberIds, groupIcon = "") => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) return reject("Socket not initialized");
      const payload = {
        groupName,
        admin: employeeId,
        members: memberIds,
        groupIcon,
      };
      socketRef.current.emit("createGroup", payload, (res) => {
        if (res.success) {
          fetchUserGroups();
          resolve(res);
        } else {
          reject(res.message || "Group creation failed");
        }
      });
    });
  };

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleGroupMessage = (msg) => {
      if (
        activeConversation?.isGroup &&
        activeConversation._id === msg.groupId
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("groupMessage", handleGroupMessage);

    return () => {
      socket.off("groupMessage", handleGroupMessage);
    };
  }, [activeConversation]);

  const fetchUserGroups = useCallback(() => {
    if (!socketRef.current || !employeeId) return;

    setGroupsLoading(true);
    setGroupsError(null);

    socketRef.current.emit("getUserGroups", employeeId, (res) => {
      if (res.success) {
        console.log("Fetched groups:", res.data);
        setGroups(res.data || []);
      } else {
        setGroupsError("Failed to load groups.");
        setGroups([]);
      }
      setGroupsLoading(false);
    });
  }, [employeeId]);

  const requestFileURL = useCallback((fileName) => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) return reject(new Error("Socket not connected"));
      socketRef.current.emit("requestFileURL", { fileName }, (resp) => {
        if (resp?.success) {
          resolve(resp.data.url);
        } else {
          reject(resp?.message || "No URL returned");
        }
      });
    });
  }, []);

  const sendFileHandler = useCallback(
    async (files, onProgress) => {
      if (
        !files?.length ||
        !socketRef.current ||
        !activeConversation?.employeeId
      )
        return;
      if (files.length > MAX_FILES) return;
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          if (onProgress) onProgress(file.name, -1);
          continue;
        }
        const { success, data } = await new Promise((resolve) => {
          socketRef.current.emit(
            "getPreSignedUploadURL",
            {
              key: file.name,
              contentType: file.type,
              size: file.size,
              totalFileCount: files.length,
            },
            (response) => resolve(response)
          );
        });
        if (!success || !data?.uploadUrl) {
          if (onProgress) onProgress(file.name, -1);
          continue;
        }
        const { uploadUrl, uniqueKey } = data;
        try {
          await axios.put(uploadUrl, file, {
            headers: { "Content-Type": file.type },
            onUploadProgress: (ev) => {
              if (onProgress) {
                const percent = Math.round((ev.loaded * 100) / ev.total);
                onProgress(file.name, percent);
              }
            },
          });
        } catch (err) {
          if (onProgress) onProgress(file.name, -1);
          continue;
        }
        const roomId = [employeeId, activeConversation.employeeId]
          .sort()
          .join("_");
        const confirmResp = await new Promise((res) => {
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
            (cbResp) => res(cbResp)
          );
        });
        if (onProgress) onProgress(file.name, confirmResp.success ? 100 : -1);
      }
    },
    [employeeId, activeConversation]
  );

  const loadChatHistory = useCallback(async () => {
    if (!activeConversation?.employeeId) {
      setMessages([]);
      return;
    }
    setLoadingMessages(true);
    try {
      const res = await fetchChatHistory(
        employeeId,
        activeConversation.employeeId
      );
      if (res.success) setMessages(res.data || []);
    } finally {
      setLoadingMessages(false);
    }
  }, [employeeId, activeConversation]);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  const sendMessageHandler = useCallback(() => {
    console.log("🧠 Inside sendMessageHandler:", {
      message,
      activeConversation,
    });

    if (!message.trim() || !activeConversation || !socketRef.current) return;

    if (activeConversation.isGroup) {
      socketRef.current.emit(
        "sendGroupMessage",
        {
          groupId: activeConversation._id,
          sender: employeeId,
          text: message,
          senderName: username,
        },
        (res) => {
          console.log("✅ Group message sent:", res);
          if (res.success) setMessage("");
        }
      );
    } else {
      socketRef.current.emit("privateMessage", {
        sender: employeeId,
        receiver: activeConversation.employeeId,
        message,
      });
      setMessage("");
    }
  }, [message, activeConversation, employeeId, username]);

  const joinAndMarkRoom = useCallback(
    (partnerId) => {
      socketRef.current.emit("joinRoom", {
        sender: employeeId,
        receiver: partnerId,
      });
      socketRef.current.emit("markRead", {
        sender: employeeId,
        receiver: partnerId,
      });
    },
    [employeeId]
  );

  const selectChat = useCallback(
    (chat) => {
      setSelectedConversation(chat);
      setSelectedUser(null);
      setMessages([]);
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === chat.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );
      joinAndMarkRoom(chat.employeeId);
    },
    [employeeId, joinAndMarkRoom]
  );

  const selectUser = useCallback(
    (user) => {
      setSelectedUser(user);
      setSelectedConversation(null);
      setMessages([]);
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );
      joinAndMarkRoom(user.employeeId);
    },
    [employeeId, joinAndMarkRoom]
  );

  const selectGroup = useCallback((group) => {
    console.log("Selecting group:", group);
    setSelectedConversation({ ...group, isGroup: true });
    setSelectedUser(null);
    setMessages([]);
    if (socketRef.current) {
      socketRef.current.emit("joinGroupRoom", group._id);
      socketRef.current.emit("getGroupMessages", group._id, (res) => {
        if (res.success) {
          setMessages(res.data || []);
        }
      });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      employeeId,
      username,
      userStatus,
      members,
      memberCount,
      loadingMembers,
      sendMessageHandler,
      membersError,
      loadMembers,
      conversations,
      loadingConversations,
      conversationsError,
      selectChat,
      selectUser,
      selectGroup,
      message,
      groups,
      groupsLoading,
      groupsError,
      setMessage,
      messages,
      loadingMessages,
      activeConversation,
      sendFileHandler,
      fetchUserGroups,
      requestFileURL,
      createGroupUIFlow,
    }),
    [
      employeeId,
      username,
      userStatus,
      selectGroup,
      groups,
      groupsLoading,
      groupsError,
      members,
      memberCount,
      loadingMembers,
      membersError,
      conversations,
      loadingConversations,
      conversationsError,
      createGroupUIFlow,
      messages,
      loadingMessages,
      message,
      setMessage,
      sendMessageHandler,
      sendFileHandler,
      fetchUserGroups,
      loadMembers,
      selectChat,
      selectUser,
      activeConversation,
      requestFileURL,
    ]
  );

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}
    </ChatContextv2.Provider>
  );
}
