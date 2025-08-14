import React, { createContext, useState, useEffect, useRef, useCallback, useMemo } from "react";
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

  // state
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
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const isGroupAdmin = useCallback((group) => group && group.admin === employeeId, [employeeId]);
  const openGroupSettingsModal = (group) => setSettingsGroup(group);
  const closeGroupSettingsModal = () => setSettingsGroup(null);

  const activeConversation = selectedUser || selectedConversation;

  const socketRef = useRef(null);
  const messageIds = useRef(new Set());
  const userRef = useRef(employeeId);
  const chatRef = useRef(activeConversation?.employeeId);

  useEffect(() => { userRef.current = employeeId; }, [employeeId]);
  useEffect(() => { chatRef.current = activeConversation?.employeeId; }, [activeConversation]);

  const MAX_FILE_SIZE_MB = 20;
  const MAX_FILES = 10;

  /** Load members from API */
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
    } catch {
      setMembersError("Unable to load members.");
    } finally {
      setLoadingMembers(false);
    }
  }, []);

  useEffect(() => {
    if (!storedId) return;
    loadMembers();
  }, [loadMembers, storedId]);

  /** SOCKET SETUP */
  useEffect(() => {
    if (!employeeId || !token) return;
    const socket = initSocket(employeeId, token);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinPersonalRoom", { employeeId });
      setLoadingConversations(true);
      socket.emit("getAllConverationUser", employeeId);
    });

    // Online status
    socket.on("user-online", ({ userId, online }) => {
      setUserStatus((prev) => ({ ...prev, [userId]: online }));
    });
    socket.on("online-users", (onlineUserIds) => {
      setUserStatus((prev) => {
        const updated = { ...prev };
        onlineUserIds.forEach((id) => { updated[id] = true; });
        return updated;
      });
    });

    // Conversations list
    socket.on("allRoomIds", (data) => {
      setLoadingConversations(false);
      if (!data.success || !Array.isArray(data.data)) {
        setConversationsError(data.message || "Error loading conversations");
        return;
      }
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

      // Auto-join all DM rooms
      list.forEach(conv => {
        socketRef.current.emit("joinRoom", { sender: employeeId, receiver: conv.employeeId });
      });

      setConversations(list);
    });

    // Direct message
    socket.on("receiveMessage", (msg) => {
      const { sender, receiver } = msg;
      if (!sender || sender === "system") return;
      const fromSelf = sender === userRef.current;
      const partner = fromSelf ? receiver : sender;

      // Update conversations list
      setConversations((prev) => {
        const idx = prev.findIndex(c => c.employeeId === partner);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            lastMessage: msg,
            unreadCount: fromSelf ? updated[idx].unreadCount : (updated[idx].unreadCount || 0) + 1,
          };
          return [updated[idx], ...updated.filter((_, i) => i !== idx)];
        } else {
          return [
            { employeeId: partner, firstName: msg.senderName || "Unknown", lastMessage: msg, unreadCount: fromSelf ? 0 : 1 },
            ...prev
          ];
        }
      });

      // Append to messages if relevant
      if (!messageIds.current.has(msg._id)) {
        messageIds.current.add(msg._id);
        if (partner === chatRef.current || fromSelf) {
          setMessages((prev) => [...prev, msg]);
        }
      }
    });

    // Group events
    socket.on("groupInfoUpdated", ({ groupId, groupName, groupIcon }) => {
      setGroups((prev) =>
        prev.map((g) => g._id === groupId ? { ...g, groupName, groupIcon } : g)
      );
      if (activeConversation?.isGroup && activeConversation._id === groupId) {
        setSelectedConversation((prev) => prev ? { ...prev, groupName, groupIcon } : prev);
      }
    });
    socket.on("groupDeleted", ({ groupId }) => {
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      if (activeConversation?.isGroup && activeConversation._id === groupId) {
        setSelectedConversation(null);
        setMessages([]);
      }
    });
    socket.on("groupMessage", (msg) => {
      if (activeConversation?.isGroup && activeConversation._id === msg.groupId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [employeeId, token]);

  const fetchUserGroups = useCallback(() => {
    if (!socketRef.current || !employeeId) return;
    setGroupsLoading(true);
    setGroupsError(null);
    socketRef.current.emit("getUserGroups", employeeId, (res) => {
      if (res.success) {
        setGroups(res.data || []);
      } else {
        setGroupsError("Failed to load groups.");
        setGroups([]);
      }
      setGroupsLoading(false);
    });
  }, [employeeId]);

  const createGroupUIFlow = (groupName, memberIds, groupIcon = "") =>
    new Promise((resolve, reject) => {
      if (!socketRef.current) return reject("Socket not initialized");
      socketRef.current.emit("createGroup", { groupName, admin: employeeId, members: memberIds, groupIcon }, (res) => {
        if (res.success) {
          fetchUserGroups();
          resolve(res);
        } else {
          reject(res.message || "Group creation failed");
        }
      });
    });

  const addMemberToGroup = useCallback((groupId, newMemberId) => {
    socketRef.current?.emit("addMemberToGroup", { groupId, adminId: employeeId, newMemberId }, (res) => {
      res.success ? toast.success("Member added") : toast.error(res.message);
      if (res.success) fetchUserGroups();
    });
  }, [employeeId, fetchUserGroups]);

  const removeMemberFromGroup = useCallback((groupId, memberId) => {
    socketRef.current?.emit("removeMemberFromGroup", { groupId, adminId: employeeId, memberId }, (res) => {
      res.success ? toast.success("Member removed") : toast.error(res.message);
      if (res.success) fetchUserGroups();
    });
  }, [employeeId, fetchUserGroups]);

  const updateGroupInfo = useCallback((groupId, newName, newIcon) => {
    socketRef.current?.emit("updateGroupInfo", { groupId, adminId: employeeId, newName, newIcon }, (res) => {
      res.success ? toast.success("Group updated") : toast.error(res.message);
      if (res.success) fetchUserGroups();
    });
  }, [employeeId, fetchUserGroups]);

  const deleteGroup = useCallback((groupId) => {
    socketRef.current?.emit("deleteGroup", { groupId, adminId: employeeId }, (res) => {
      res.success ? toast.success("Group deleted") : toast.error(res.message);
      if (res.success) {
        fetchUserGroups();
        if (activeConversation?.isGroup && activeConversation._id === groupId) {
          setSelectedConversation(null);
          setMessages([]);
        }
      }
    });
  }, [employeeId, activeConversation, fetchUserGroups]);

  /** File upload handlers */
  const requestFileURL = useCallback((fileName) => new Promise((resolve, reject) => {
    socketRef.current?.emit("requestFileURL", { fileName }, (resp) => {
      if (resp?.success) resolve(resp.data.url);
      else reject(resp?.message || "No URL returned");
    });
  }), []);

  const sendFileHandler = useCallback(async (files, onProgress) => {
    if (!files?.length || !socketRef.current || !activeConversation?.employeeId) return;
    if (files.length > MAX_FILES) return;
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        if (onProgress) onProgress(file.name, -1);
        continue;
      }
      const { success, data } = await new Promise((resolve) => {
        socketRef.current.emit("getPreSignedUploadURL", { key: file.name, contentType: file.type, size: file.size, totalFileCount: files.length }, (response) => resolve(response));
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
      } catch {
        if (onProgress) onProgress(file.name, -1);
        continue;
      }
      const roomId = [employeeId, activeConversation.employeeId].sort().join("_");
      const confirmResp = await new Promise((res) => {
        socketRef.current.emit("confirmUpload", { uniqueKey, roomId, sender: employeeId, receiver: activeConversation.employeeId, fileName: file.name, fileType: file.type }, (cbResp) => res(cbResp));
      });
      if (onProgress) onProgress(file.name, confirmResp.success ? 100 : -1);
    }
  }, [employeeId, activeConversation]);

  /** History loader */
  const loadChatHistory = useCallback(async () => {
    if (!activeConversation?.employeeId) { setMessages([]); return; }
    setLoadingMessages(true);
    try {
      const res = await fetchChatHistory(employeeId, activeConversation.employeeId);
      if (res.success) setMessages(res.data || []);
    } finally { setLoadingMessages(false); }
  }, [employeeId, activeConversation]);
  useEffect(() => { loadChatHistory(); }, [loadChatHistory]);

  /** Send message */
  const sendMessageHandler = useCallback(() => {
    if (!message.trim() || !activeConversation || !socketRef.current) return;
    if (activeConversation.isGroup) {
      socketRef.current.emit("sendGroupMessage", { groupId: activeConversation._id, sender: employeeId, text: message, senderName: username }, (res) => {
        if (res.success) setMessage("");
      });
    } else {
      const tempMsg = { _id: Date.now().toString(), sender: employeeId, receiver: activeConversation.employeeId, message, time: new Date().toISOString() };
      setMessages((prev) => [...prev, tempMsg]);
      socketRef.current.emit("privateMessage", { sender: employeeId, receiver: activeConversation.employeeId, message });
      setMessage("");
    }
  }, [message, activeConversation, employeeId, username]);

  /** Selectors */
  const selectChat = useCallback((chat) => {
    setSelectedConversation(chat);
    setSelectedUser(null);
    setMessages([]);
    chatRef.current = chat.employeeId;
    socketRef.current.emit("joinRoom", { sender: employeeId, receiver: chat.employeeId });
    socketRef.current.emit("markRead", { sender: employeeId, receiver: chat.employeeId });
    setConversations((prev) => prev.map((c) => c.employeeId === chat.employeeId ? { ...c, unreadCount: 0 } : c));
  }, [employeeId]);

  const selectUser = useCallback((user) => {
    setSelectedUser(user);
    setSelectedConversation(null);
    setMessages([]);
    chatRef.current = user.employeeId;
    socketRef.current.emit("joinRoom", { sender: employeeId, receiver: user.employeeId });
    socketRef.current.emit("markRead", { sender: employeeId, receiver: user.employeeId });
    setConversations((prev) => prev.map((c) => c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c));
  }, [employeeId]);

  const selectGroup = useCallback((group) => {
    setSelectedConversation({ ...group, isGroup: true });
    setSelectedUser(null);
    setMessages([]);
    socketRef.current?.emit("joinGroupRoom", group._id);
    socketRef.current?.emit("getGroupMessages", group._id, (res) => {
      if (res.success) setMessages(res.data || []);
    });
  }, []);

  /** context */
  const contextValue = useMemo(() => ({
    employeeId, username, userStatus, members, memberCount, loadingMembers,
    sendMessageHandler, membersError, loadMembers, conversations, loadingConversations,
    conversationsError, selectChat, selectUser, selectGroup, message, groups, groupsLoading,
    groupsError, setMessage, messages, loadingMessages, activeConversation,
    sendFileHandler, fetchUserGroups, requestFileURL, createGroupUIFlow, isGroupAdmin,
    openGroupSettingsModal, closeGroupSettingsModal, addMemberToGroup, removeMemberFromGroup,
    updateGroupInfo, deleteGroup, selectedGroup: activeConversation?.isGroup ? activeConversation : null,
  }), [
    employeeId, username, userStatus, members, memberCount, loadingMembers, membersError,
    conversations, loadingConversations, conversationsError, message, groups, groupsLoading,
    groupsError, messages, loadingMessages, activeConversation, sendMessageHandler, sendFileHandler,
    fetchUserGroups, loadMembers, selectChat, selectUser, selectGroup, requestFileURL, isGroupAdmin,
    openGroupSettingsModal, closeGroupSettingsModal, addMemberToGroup, removeMemberFromGroup,
    updateGroupInfo, deleteGroup
  ]);

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}
      {settingsGroup && <GroupSettingsModal group={settingsGroup} onClose={closeGroupSettingsModal} />}
    </ChatContextv2.Provider>
  );
}
