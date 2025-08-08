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
import { toast } from "react-hot-toast";
import GroupSettingsModal from "../components/chats/chatv2/GroupSettingsModal.jsx";

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
  const [settingsGroup, setSettingsGroup] = useState(null);

  const isGroupAdmin = useCallback(
    (group) => group && group.admin === employeeId,
    [employeeId]
  );


  const openGroupSettingsModal = (group) => setSettingsGroup(group);
  const closeGroupSettingsModal = () => setSettingsGroup(null);

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
    if (!storedId) return;
    loadMembers();
  }, [loadMembers, storedId]);

  useEffect(() => {
    console.log("🔧 Socket useEffect triggered:", { employeeId, hasToken: !!token });
    if (!employeeId) {
      console.log("❌ No employeeId, skipping socket initialization");
      return;
    }
    if (!token) {
      console.log("❌ No token, skipping socket initialization");
      return;
    }
    const socket = initSocket(employeeId, token);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Socket connected, emitting events...");
      console.log("🔌 Socket ID:", socket.id);
      console.log("🔌 Employee ID:", employeeId);
      socket.emit("joinPersonalRoom", { employeeId });
      setLoadingConversations(true);
      socket.emit("getAllConverationUser", employeeId);
      console.log("🔌 Events emitted: joinPersonalRoom, getAllConverationUser");
      
      // Fetch groups when socket connects
      setTimeout(() => {
        console.log("📋 Fetching groups after socket connection...");
        if (socketRef.current && employeeId) {
          socketRef.current.emit("getUserGroups", employeeId, (res) => {
            console.log("📋 getUserGroups response:", res);
            if (res.success) {
              console.log("📋 Groups loaded:", res.data?.length || 0, "groups");
              console.log("📋 Groups with unread counts:", res.data?.filter(g => g.unreadCount > 0) || []);
              setGroups(res.data || []);
            } else {
              setGroupsError("Failed to load groups.");
              setGroups([]);
            }
          });
        }
      }, 2000);
      
      // Test socket connection with a ping
      setTimeout(() => {
        console.log("🏓 Testing socket with ping...");
        socket.emit("ping", { test: true });
      }, 1000);
    });

    socket.on("connect_error", (error) => {
      console.log("❌ Socket connection error:", error);
      setConversationsError("Failed to connect to chat server");
      setLoadingConversations(false);
    });

    socket.on("disconnect", (reason) => {
      // Socket disconnected
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
      console.log("🔍 allRoomIds event received:", data);
      setLoadingConversations(false);
      if (!data.success) {
        console.log("❌ Server returned error:", data.message);
        setConversationsError(data.message);
        return;
      }
      
      if (!data.data || !Array.isArray(data.data)) {
        console.log("❌ Invalid data structure:", data);
        setConversationsError("Invalid data structure received");
        return;
      }
      
      console.log("📊 Processing", data.data.length, "conversations");
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

      console.log("✅ Successfully loaded", list.length, "conversations");
      setConversations(list);
    });

    // Test socket connection with a simple ping
    socket.on("pong", (data) => {
      console.log("🏓 Socket ping test successful:", data);
    });

    setTimeout(() => {
      if (loadingConversations) {
        console.log("⏰ Timeout: allRoomIds event was never received");
        setConversationsError("Timeout: No response from server");
        setLoadingConversations(false);

        console.log("🔄 Trying alternative event names...");
        socket.emit("getConversations", employeeId);
        socket.emit("getAllConversations", employeeId);
        socket.emit("getUserConversations", employeeId);
      }
    }, 10000);



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

    socket.on("groupInfoUpdated", ({ groupId, groupName, groupIcon }) => {
      setGroups((prev) =>
        prev.map((g) =>
          g._id === groupId ? { ...g, groupName, groupIcon } : g
        )
      );
      if (activeConversation?.isGroup && activeConversation._id === groupId) {
        setSelectedConversation((prev) =>
          prev ? { ...prev, groupName, groupIcon } : prev
        );
      }
    });

    socket.on("groupDeleted", ({ groupId }) => {
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      if (activeConversation?.isGroup && activeConversation._id === groupId) {
        setSelectedConversation(null);
        setMessages([]);
      }
    });

    socket.on("messageRead", ({ sender, receiver }) => {
      const partner = sender === employeeId ? receiver : sender;
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === partner ? { ...c, unreadCount: 0 } : c
        )
      );
    });

    socket.on("unreadCountUpdate", ({ partnerId, count }) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === partnerId ? { ...c, unreadCount: count } : c
        )
      );
    });

    socket.on("groupUnreadCountUpdate", ({ groupId, count }) => {
      console.log("📊 Group unread count update:", { groupId, count });
      setGroups((prev) =>
        prev.map((g) =>
          g._id === groupId ? { ...g, unreadCount: count } : g
        )
      );
    });

    // Add listener for group message read confirmation
    socket.on("groupMessageRead", ({ groupId, userId }) => {
      console.log("📖 Group message read:", { groupId, userId });
      if (userId === employeeId) {
        setGroups((prev) =>
          prev.map((g) =>
            g._id === groupId ? { ...g, unreadCount: 0 } : g
          )
        );
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
      
      // Find the appropriate manager (upper level manager who is not deactivated)
      const findAppropriateManager = (currentEmployeeId) => {
        if (!members.length) return currentEmployeeId;

        // Find current employee
        const currentEmployee = members.find(emp => emp.employeeId === currentEmployeeId);
        if (!currentEmployee) return currentEmployeeId;

        // If current employee has managers assigned (this would need to be fetched from backend)
        // For now, we'll use the current employee as fallback
        // TODO: Implement proper manager hierarchy lookup
        console.log(`👤 Using current employee as admin: ${currentEmployeeId}`);
        return currentEmployeeId;
      };

      const appropriateAdmin = findAppropriateManager(employeeId);
      
      const payload = {
        groupName,
        admin: appropriateAdmin,
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
      console.log("📨 Group message received:", msg);
      console.log("📨 Current active conversation:", activeConversation);
      console.log("📨 Current employeeId:", employeeId);
      
      // Add message to current conversation if it's the active group
      if (
        activeConversation?.isGroup &&
        activeConversation._id === msg.groupId
      ) {
        console.log("📨 Adding message to active group conversation");
        setMessages((prev) => [...prev, msg]);
      }

      // Update group list with new message and unread count
      setGroups((prev) => {
        console.log("📨 Current groups:", prev.length);
        const groupIndex = prev.findIndex((g) => g._id === msg.groupId);
        console.log("📨 Group index found:", groupIndex);
        
        if (groupIndex >= 0) {
          const updatedGroups = [...prev];
          const group = updatedGroups[groupIndex];
          
          // Only increment unread count if this group is not currently active
          // or if the message is not from the current user
          let newUnreadCount = group.unreadCount || 0;
          const isCurrentActiveGroup = activeConversation?.isGroup && activeConversation._id === msg.groupId;
          const isFromCurrentUser = msg.sender === employeeId;
          
          console.log("📨 Unread count logic:", {
            currentUnreadCount: newUnreadCount,
            isCurrentActiveGroup,
            isFromCurrentUser,
            shouldIncrement: !isCurrentActiveGroup && !isFromCurrentUser
          });
          
          if (!isCurrentActiveGroup && !isFromCurrentUser) {
            newUnreadCount += 1;
          }

          updatedGroups[groupIndex] = {
            ...group,
            lastMessage: msg,
            lastMessageTimestamp: msg.timestamp,
            unreadCount: newUnreadCount,
          };

          console.log("📨 Updated group:", updatedGroups[groupIndex]);
          return updatedGroups;
        } else {
          console.log("📨 Group not found in groups array");
        }
        return prev;
      });
    };

    socket.on("groupMessage", handleGroupMessage);

    return () => {
      socket.off("groupMessage", handleGroupMessage);
    };
  }, [activeConversation, employeeId]);

  const fetchUserGroups = useCallback(() => {
    if (!socketRef.current || !employeeId) return;

    setGroupsLoading(true);
    setGroupsError(null);

    socketRef.current.emit("getUserGroups", employeeId, (res) => {
      console.log("📋 getUserGroups response:", res);
      if (res.success) {
        console.log("📋 Groups loaded:", res.data?.length || 0, "groups");
        console.log("📋 Groups with unread counts:", res.data?.filter(g => g.unreadCount > 0) || []);
        setGroups(res.data || []);
      } else {
        setGroupsError("Failed to load groups.");
        setGroups([]);
      }
      setGroupsLoading(false);
    });
  }, [employeeId]);

  const addMemberToGroup = useCallback(
    (groupId, newMemberId) => {
      if (!socketRef.current) return;
      socketRef.current.emit(
        "addMemberToGroup",
        { groupId, adminId: employeeId, newMemberId },
        (res) => {
          res.success
            ? toast.success("Member added")
            : toast.error(res.message);
          if (res.success) fetchUserGroups();
        }
      );
    },
    [employeeId, fetchUserGroups]
  );

  const removeMemberFromGroup = useCallback(
    (groupId, memberId) => {
      if (!socketRef.current) return;
      socketRef.current.emit(
        "removeMemberFromGroup",
        { groupId, adminId: employeeId, memberId },
        (res) => {
          res.success
            ? toast.success("Member removed")
            : toast.error(res.message);
          if (res.success) fetchUserGroups();
        }
      );
    },
    [employeeId, fetchUserGroups]
  );

  const updateGroupInfo = useCallback(
    (groupId, newName, newIcon) => {
      if (!socketRef.current) return;
      socketRef.current.emit(
        "updateGroupInfo",
        { groupId, adminId: employeeId, newName, newIcon },
        (res) => {
          res.success
            ? toast.success("Group updated")
            : toast.error(res.message);
          if (res.success) fetchUserGroups();
        }
      );
    },
    [employeeId, fetchUserGroups]
  );

  const deleteGroup = useCallback(
    (groupId) => {
      if (!socketRef.current) return;
      socketRef.current.emit(
        "deleteGroup",
        { groupId, adminId: employeeId },
        (res) => {
          res.success
            ? toast.success("Group deleted")
            : toast.error(res.message);
          if (res.success) {
            fetchUserGroups();
            if (
              activeConversation?.isGroup &&
              activeConversation._id === groupId
            ) {
              setSelectedConversation(null);
              setMessages([]);
            }
          }
        }
      );
    },
    [employeeId, activeConversation, fetchUserGroups]
  );

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
      if (!socketRef.current) return;

      socketRef.current.emit("joinRoom", {
        sender: employeeId,
        receiver: partnerId,
      });

      socketRef.current.emit("markRead", {
        sender: employeeId,
        receiver: partnerId,
      });

      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === partnerId ? { ...c, unreadCount: 0 } : c
        )
      );
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
    console.log("🔗 Selecting group:", group);
    setSelectedConversation({ ...group, isGroup: true });
    setSelectedUser(null);
    setMessages([]);
    
    // Reset unread count for the selected group
    setGroups((prev) =>
      prev.map((g) =>
        g._id === group._id ? { ...g, unreadCount: 0 } : g
      )
    );
    
    if (socketRef.current) {
      socketRef.current.emit("joinGroupRoom", group._id);
      socketRef.current.emit("getGroupMessages", group._id, (res) => {
        if (res.success) {
          setMessages(res.data || []);
        }
      });
      
      // Mark group messages as read
      socketRef.current.emit("markGroupRead", {
        groupId: group._id,
        userId: employeeId
      });
    }
  }, [employeeId]);

  // Manual retry logic for conversations
  useEffect(() => {
    if (conversations.length === 0 && !loadingConversations && !conversationsError && employeeId) {
      const timer = setTimeout(() => {
        console.log("🔄 Manual retry: Emitting getAllConverationUser again...");
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit("getAllConverationUser", employeeId);
          console.log("🔄 Manual retry: Emitted getAllConverationUser again...");
        }
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [conversations.length, loadingConversations, conversationsError, employeeId]);

  const contextValue = useMemo(
    () => {
      console.log("📊 Context value updated:", {
        conversationsLength: conversations.length,
        loadingConversations,
        conversationsError,
        employeeId
      });
      
      return {
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
        isGroupAdmin,
        openGroupSettingsModal,
        closeGroupSettingsModal,
        addMemberToGroup,
        removeMemberFromGroup,
        updateGroupInfo,
        deleteGroup,
        selectedGroup: activeConversation?.isGroup ? activeConversation : null,
      };
    },
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
      isGroupAdmin,
      openGroupSettingsModal,
      closeGroupSettingsModal,
      addMemberToGroup,
      removeMemberFromGroup,
      updateGroupInfo,
      deleteGroup,
      activeConversation,
    ]
  );

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}
      {settingsGroup && (
        <GroupSettingsModal
          group={settingsGroup}
          onClose={closeGroupSettingsModal}
        />
      )}
    </ChatContextv2.Provider>
  );
}
