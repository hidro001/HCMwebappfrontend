

// ChatProviderv2.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import io from "socket.io-client";

// 1) Your custom service calls & store:
import { fetchChatHistory, fetchAllMember } from "../service/chatService";
import useAuthStore from "../store/store";

// 2) Provide the context
export const ChatContextv2 = createContext();

// --- IMPORT THE GROUP SETTINGS MODAL HERE ---
import GroupSettingsModal from "../components/chats/chatv2/GroupSettingsModal";

export function ChatProviderv2({ children }) {
  //----------------------------------------------------------------
  // 1) Basic user info from your store
  //----------------------------------------------------------------
  const { employeeId: storeEmployeeId, userName: storeUserName } = useAuthStore();
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (storeEmployeeId) setEmployeeId(storeEmployeeId);
    if (storeUserName) setUsername(storeUserName);
  }, [storeEmployeeId, storeUserName]);

  //----------------------------------------------------------------
  // 2) Member list: fetch from REST API
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // 3) One-to-one conversations
  //----------------------------------------------------------------
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [conversationsError, setConversationsError] = useState(null);

  // "selectedUser" means you clicked from the UserList
  const [selectedUser, setSelectedUser] = useState(null);

  // "selectedConversation" means you clicked an existing conversation
  const [selectedConversation, setSelectedConversation] = useState(null);

  // We'll unify them in a single "activeConversation" for your 1-to-1 chat window
  const activeConversation = useMemo(() => {
    return selectedUser || selectedConversation || null;
  }, [selectedUser, selectedConversation]);

  //----------------------------------------------------------------
  // 4) Chat messages & input
  //----------------------------------------------------------------
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [message, setMessage] = useState("");

  //----------------------------------------------------------------
  // 5) Socket references and initialization
  //----------------------------------------------------------------
  const socketRef = useRef(null);
  const token = localStorage.getItem("accessToken");
  const baseUrlSocket = import.meta.env.VITE_SOCKET_URL;

  // Keep track of current user & active conversation in Refs (for socket callbacks)
  const employeeIdRef = useRef("");
  const activeConversationIdRef = useRef("");

  useEffect(() => {
    employeeIdRef.current = employeeId;
  }, [employeeId]);

  useEffect(() => {
    activeConversationIdRef.current = activeConversation?.employeeId || "";
  }, [activeConversation]);

  // Connect the socket when we have an employeeId
  useEffect(() => {
    if (!employeeId) return;

    // 1) Connect
    const socket = io(baseUrlSocket, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 10000,
      auth: { token },
    });
    socketRef.current = socket;

    // 2) On connect, fetch conversation list
    socket.on("connect", () => {
      // If needed, we can join personal room
      socket.emit("joinPersonalRoom", { employeeId });
      // fetch conversation list
      setConversationsLoading(true);
      setConversationsError(null);
      socket.emit("getAllConverationUser", employeeId);
    });

    // 3) On "allRoomIds" => update conversation list
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
    socket.on("allRoomIds", handleAllRoomIds);

    // 4) On receiveMessage => handle new messages
    const handleNewMessage = (data) => {
      // 1) Filter out system or unknown messages
      if (!data.sender || data.sender === "system" || data.sender === "Unknown") {
        // simply ignore them so they don't appear as a phantom user
        return;
      }

      // Normal handling for real user messages:
      const { sender, receiver } = data;
      const fromMe = sender === employeeIdRef.current;
      const partnerId = fromMe ? receiver : sender;

      // If it's the active chat, push to local messages
      if (partnerId === activeConversationIdRef.current) {
        setMessages((prev) => [...prev, data]);
      } else if (!fromMe) {
        // If we are not in that conversation, increase unread
        setConversations((prev) => {
          const idx = prev.findIndex((c) => c.employeeId === partnerId);
          if (idx === -1) {
            // Not in conversation list, create new item
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
          const old = prev[idx];
          const updated = {
            ...old,
            unreadCount: (old.unreadCount || 0) + 1,
          };
          const newList = [...prev];
          newList.splice(idx, 1);
          return [updated, ...newList];
        });
      }
    };
    socket.on("receiveMessage", handleNewMessage);

    // 5) Cleanup
    return () => {
      if (!socketRef.current) return;
      socket.off("allRoomIds", handleAllRoomIds);
      socket.off("receiveMessage", handleNewMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [employeeId, token, baseUrlSocket]);

  //----------------------------------------------------------------
  // 6) Selecting a conversation
  //----------------------------------------------------------------
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

      // Reset unreadCount in local state
      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === conv.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );

      // Join the room
      const payload = { sender: employeeId, receiver: conv.employeeId };
      socketRef.current.emit("joinRoom", payload);

      // Mark messages read
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

      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );

      // Join new room
      const payload = { sender: employeeId, receiver: user.employeeId };
      socketRef.current.emit("joinRoom", payload);
      socketRef.current.emit("markRead", {
        sender: employeeId,
        receiver: user.employeeId,
      });
    },
    [employeeId]
  );

  //----------------------------------------------------------------
  // 7) Fetching message history for active conversation
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // 8) Sending text messages (1-to-1)
  //----------------------------------------------------------------
  const sendMessageHandler = useCallback(() => {
    if (!message.trim() || !activeConversation?.employeeId) return;
    if (!socketRef.current) return;
    const msgData = {
      sender: employeeId,
      receiver: activeConversation.employeeId,
      message,
      time: new Date().toISOString(),
    };
    socketRef.current.emit("privateMessage", msgData);
    setMessage("");
  }, [employeeId, message, activeConversation]);

  //----------------------------------------------------------------
  // 9) Sending files (1-to-1) with progress
  //----------------------------------------------------------------
  const MAX_FILE_SIZE_MB = 20;
  const MAX_FILES = 10;

  const sendFileHandler = useCallback(
    async (files, onProgress) => {
      if (!files?.length || !socketRef.current || !activeConversation?.employeeId) return;

      if (files.length > MAX_FILES) {
        toast.error(`Please select at most ${MAX_FILES} files at once.`);
        return;
      }

      for (const file of files) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast.error(`${file.name} is too large (max ${MAX_FILE_SIZE_MB} MB).`);
          if (onProgress) onProgress(file.name, -1);
          continue;
        }

        // 1) Request pre-signed URL
        const { success, data, message: serverMsg } = await new Promise((resolve) => {
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
          toast.error(`Failed to generate upload URL for ${file.name}.`);
          if (onProgress) onProgress(file.name, -1);
          continue;
        }

        const { uploadUrl, uniqueKey } = data;

        // 2) Put file
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
          console.error("File upload error:", err);
          toast.error(`Upload error for ${file.name}`);
          if (onProgress) onProgress(file.name, -1);
          continue;
        }

        // 3) Confirm upload => broadcast file message
        const roomId = [employeeId, activeConversation.employeeId].sort().join("_");
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
        if (!confirmResp.success) {
          toast.error(`Error saving file metadata for ${file.name}`);
          if (onProgress) onProgress(file.name, -1);
        } else {
          if (onProgress) onProgress(file.name, 100);
        }
      }
    },
    [employeeId, activeConversation]
  );

  //----------------------------------------------------------------
  // 10) requestFileURL for onClick a file
  //----------------------------------------------------------------
  const requestFileURL = useCallback((fileName) => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        return reject(new Error("Socket not connected"));
      }
      socketRef.current.emit("requestFileURL", { fileName }, (resp) => {
        if (resp?.success) {
          resolve(resp.data.url);
        } else {
          reject(resp?.message || "No URL returned");
        }
      });
    });
  }, []);

  //----------------------------------------------------------------
  // 11) unreadCounts (for ChatNotification, etc.)
  //----------------------------------------------------------------
  const unreadCounts = useMemo(() => {
    const map = {};
    conversations.forEach((c) => {
      if (c.employeeId) {
        map[c.employeeId] = c.unreadCount || 0;
      }
    });
    return map;
  }, [conversations]);

  //////////////////////////////////////////////////////////////////
  // ============== GROUP CHAT LOGIC BELOW =========================
  //////////////////////////////////////////////////////////////////

  // States for group listing
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState(null);

  // The group currently selected in UI
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Its messages
  const [groupMessages, setGroupMessages] = useState([]);
  const [groupMessagesLoading, setGroupMessagesLoading] = useState(false);

  // For the “Group Settings” modal
  const [showGroupSettingsModal, setShowGroupSettingsModal] = useState(false);
  const [groupInSettings, setGroupInSettings] = useState(null);

  // Helper: Are you the admin?
  const isGroupAdmin = useCallback(
    (group) => {
      if (!group || !employeeId) return false;
      return group.admin === employeeId;
    },
    [employeeId]
  );

  // Clear group selection
  const clearActiveGroup = useCallback(() => {
    setSelectedGroup(null);
    setGroupMessages([]);
  }, []);

  // ============= fetchUserGroups =============
  const fetchUserGroups = useCallback(() => {
    if (!socketRef.current) return;
    setGroupsLoading(true);
    setGroupsError(null);

    // We'll assume you have a "getUserGroups" event
    socketRef.current.emit("getUserGroups", employeeId, (response) => {
      setGroupsLoading(false);
      if (!response.success) {
        setGroupsError(response.message || "Error fetching groups");
        return;
      }
      setGroups(response.data || []);
    });
  }, [employeeId]);

  // ============= createGroupUIFlow =============
  const createGroupUIFlow = useCallback(
    (groupName, selectedMemberIds, groupIcon) => {
      if (!socketRef.current) return;
      const payload = {
        groupName,
        admin: employeeId,
        members: selectedMemberIds,
        groupIcon,
      };
      socketRef.current.emit("createGroup", payload, (resp) => {
        if (!resp.success) {
          toast.error(resp.message || "Failed to create group");
          return;
        }
        toast.success("Group created successfully!");
        // refresh your group list
        fetchUserGroups();
      });
    },
    [employeeId, fetchUserGroups]
  );

  // ============= selectGroup =============
  const selectGroup = useCallback((grp) => {
    setSelectedGroup(grp);
    setGroupMessages([]);
    if (!socketRef.current) return;
    socketRef.current.emit("joinGroupRoom", grp._id);
  }, []);

  // ============= sendGroupTextMessage =============
  const sendGroupTextMessage = useCallback(
    (groupId, text) => {
      if (!socketRef.current) return;
      const data = { groupId, sender: employeeId, senderName: username, text };
      socketRef.current.emit("sendGroupMessage", data, (resp) => {
        if (!resp.success) {
          toast.error(resp.message || "Error sending group message");
        }
      });
    },
    [employeeId, username]
  );

  // ============= handleIncomingGroupMessage =============
  const handleIncomingGroupMessage = useCallback(
    (data) => {
      // data: { groupId, sender, text, createdAt }
      if (!selectedGroup) return;
      if (data.groupId === selectedGroup._id) {
        setGroupMessages((prev) => [...prev, data]);
      } else {
        // It's for a different group (not currently viewing)
        // e.g. show a toast or increment unread
      }
    },
    [selectedGroup]
  );

  // ============= fetchGroupMessages =============
  const fetchGroupMessages = useCallback((groupId) => {
    if (!socketRef.current) return;
    setGroupMessagesLoading(true);
    // We'll assume a socket event "getGroupMessages"
    socketRef.current.emit("getGroupMessages", groupId, (resp) => {
      setGroupMessagesLoading(false);
      if (!resp.success) {
        toast.error(resp.message || "Failed to load group messages");
        return;
      }
      setGroupMessages(resp.data || []);
    });
  }, []);

  // ============= group settings actions =============
  const openGroupSettingsModal = useCallback((grp) => {
    setGroupInSettings(grp);
    setShowGroupSettingsModal(true);
  }, []);

  const closeGroupSettingsModal = useCallback(() => {
    setShowGroupSettingsModal(false);
    setGroupInSettings(null);
  }, []);

  // Add member
  const addMemberToGroup = useCallback(
    (groupId, newMemberId) => {
      if (!socketRef.current) return;
      socketRef.current.emit(
        "addMemberToGroup",
        { groupId, adminId: employeeId, newMemberId },
        (resp) => {
          if (resp.success) {
            toast.success("Member added");
            fetchUserGroups(); // refresh group data
          } else {
            toast.error(resp.message || "Failed to add member");
          }
        }
      );
    },
    [employeeId, fetchUserGroups]
  );

  // Remove member
  const removeMemberFromGroup = useCallback(
    (groupId, memberId) => {
      if (!socketRef.current) return;
      socketRef.current.emit(
        "removeMemberFromGroup",
        { groupId, adminId: employeeId, memberId },
        (resp) => {
          if (resp.success) {
            toast.success("Member removed");
            fetchUserGroups();
          } else {
            toast.error(resp.message || "Failed to remove member");
          }
        }
      );
    },
    [employeeId, fetchUserGroups]
  );

  // Update group info
  const updateGroupInfo = useCallback(
    (groupId, newName, newIcon) => {
      if (!socketRef.current) return;
      const payload = {
        groupId,
        adminId: employeeId,
        newName,
        newIcon,
      };
      socketRef.current.emit("updateGroupInfo", payload, (resp) => {
        if (resp.success) {
          toast.success("Group info updated");
          fetchUserGroups();
        } else {
          toast.error(resp.message || "Failed to update group");
        }
      });
    },
    [employeeId, fetchUserGroups]
  );

  // Delete group
  const deleteGroup = useCallback(
    (groupId) => {
      if (!socketRef.current) return;
      const payload = {
        groupId,
        adminId: employeeId,
      };
      socketRef.current.emit("deleteGroup", payload, (resp) => {
        if (resp.success) {
          toast.success("Group deleted");
          // Also do a fresh fetch from the server if you want to be 100% sure
          fetchUserGroups(); 
          // If it was the currently-selected group, clear it
          if (selectedGroup && String(selectedGroup._id) === String(resp.groupId)) {
            clearActiveGroup();
          }
        } else {
          toast.error(resp.message || "Failed to delete group");
        }
      });
      
    },
    [employeeId, selectedGroup, clearActiveGroup]
  );

  // leaveGroupChat => just close the UI
  const leaveGroupChat = useCallback(() => {
    clearActiveGroup();
  }, [clearActiveGroup]);

  //----------------------------------------------------------------
  // 12) Listen for group events
  //----------------------------------------------------------------
  useEffect(() => {
    if (!socketRef.current) return;

    // groupCreated => if the user is in members, refresh
    const handleGroupCreated = (data) => {
      if (data.success && data.members.includes(employeeId)) {
        toast(`You were added to group: ${data.groupName}`, { icon: "🎉" });
        fetchUserGroups();
      }
    };

    // groupMessage => if it's for current group, push message
    const handleGroupMessage = (data) => {
      handleIncomingGroupMessage(data);
    };

    // // groupDeleted => remove from local, close if current
    // const handleGroupDeleted = ({ groupId }) => {
    //   setGroups((prev) => prev.filter((g) => g._id !== groupId));
    //   if (selectedGroup && selectedGroup._id === groupId) {
    //     clearActiveGroup();
    //   }
    //   toast("A group was deleted");
    // };

    const handleGroupDeleted = ({ groupId }) => {
      // `groupId` here is the string the server emitted
      // Make sure we compare it to our local groups by converting to string:
      setGroups((prev) =>
        prev.filter((g) => String(g._id) !== String(groupId))
      );
    
      if (selectedGroup && String(selectedGroup._id) === String(groupId)) {
        clearActiveGroup();
      }
    
      toast("A group was deleted");
    };

    socketRef.current.on("groupCreated", handleGroupCreated);
    socketRef.current.on("groupMessage", handleGroupMessage);
    socketRef.current.on("groupDeleted", handleGroupDeleted);

    return () => {
      if (!socketRef.current) return;
      socketRef.current.off("groupCreated", handleGroupCreated);
      socketRef.current.off("groupMessage", handleGroupMessage);
      socketRef.current.off("groupDeleted", handleGroupDeleted);
    };
  }, [
    employeeId,
    selectedGroup,
    handleIncomingGroupMessage,
    fetchUserGroups,
    clearActiveGroup,
  ]);

  //----------------------------------------------------------------
  // 13) Build final context object
  //----------------------------------------------------------------
  const contextValue = useMemo(() => {
    return {
      //////////////////////////////////////////////////////////////////
      // 1-to-1 chat
      //////////////////////////////////////////////////////////////////
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

      // File sending
      sendFileHandler,

      // requestFileURL
      requestFileURL,

      // Unread counts
      unreadCounts,

      //////////////////////////////////////////////////////////////////
      // GROUP chat
      //////////////////////////////////////////////////////////////////
      groups,
      groupsLoading,
      groupsError,
      fetchUserGroups,
      createGroupUIFlow,
      selectedGroup,
      selectGroup,
      groupMessages,
      groupMessagesLoading,
      sendGroupTextMessage,
      fetchGroupMessages,
      leaveGroupChat,

      isGroupAdmin,
      openGroupSettingsModal,
      addMemberToGroup,
      removeMemberFromGroup,
      updateGroupInfo,
      deleteGroup,

      showGroupSettingsModal,
      groupInSettings,
      closeGroupSettingsModal,

      clearActiveGroup,
    };
  }, [
    // 1-to-1
    employeeId, username,
    members, totalCount, loading, error, fetchMembers,
    conversations, conversationsLoading, conversationsError,
    selectedUser, selectedConversation, activeConversation,
    messages, messagesLoading, message,
    sendMessageHandler, sendFileHandler, requestFileURL,
    unreadCounts, clearActiveConversation, handleSelectConversation,
    handleSelectUser,

    // group
    groups, groupsLoading, groupsError,
    fetchUserGroups, createGroupUIFlow, selectedGroup, selectGroup,
    groupMessages, groupMessagesLoading, sendGroupTextMessage,
    fetchGroupMessages, leaveGroupChat, isGroupAdmin,
    openGroupSettingsModal, addMemberToGroup, removeMemberFromGroup,
    updateGroupInfo, deleteGroup, showGroupSettingsModal, groupInSettings,
    closeGroupSettingsModal, clearActiveGroup,
  ]);

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}

      {/* Conditionally show the Group Settings Modal */}
      {showGroupSettingsModal && groupInSettings && (
        <GroupSettingsModal
          group={groupInSettings}
          onClose={closeGroupSettingsModal}
        />
      )}
    </ChatContextv2.Provider>
  );
}
