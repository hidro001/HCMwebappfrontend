// --- your imports stay the same ---
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

  useEffect(() => {
    if (!employeeId || !token) return;
    const socket = initSocket(employeeId, token);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinPersonalRoom", { employeeId });
      setLoadingConversations(true);
      socket.emit("getAllConverationUser", employeeId);
    });

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
      list.forEach(conv => {
        const roomId = [employeeId, conv.employeeId].sort().join("_");
        socketRef.current.emit("joinRoom", { sender: employeeId, receiver: conv.employeeId });
      });

      setConversations(list);

    });

    socket.on("receiveMessage", (msg) => {
      const { sender, receiver } = msg;
      if (!sender || sender === "system") return;

      const fromSelf = sender === userRef.current;
      const partner = fromSelf ? receiver : sender;

      setConversations((prev) => {
        const idx = prev.findIndex(c => c.employeeId === partner);
        if (idx >= 0) {
          const updated = [...prev];
          const existing = updated[idx];
          updated[idx] = {
            ...existing,
            lastMessage: msg,
            unreadCount: fromSelf
              ? existing.unreadCount
              : (existing.unreadCount || 0) + 1,
          };
          return [updated[idx], ...updated.filter((_, i) => i !== idx)];
        } else {
          return [
            {
              employeeId: partner,
              firstName: msg.senderName || "Unknown",
              lastMessage: msg,
              unreadCount: fromSelf ? 0 : 1,
            },
            ...prev
          ];
        }
      });

      if (!messageIds.current.has(msg._id)) {
        messageIds.current.add(msg._id);
        // update conversations list...
        if (partner === chatRef.current || fromSelf) {
          setMessages((prev) => [...prev, msg]);
        }
      }
    });


    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [employeeId, token, userStatus]);

  const loadChatHistory = useCallback(async () => {
    if (!activeConversation?.employeeId) {
      setMessages([]);
      return;
    }
    setLoadingMessages(true);
    try {
      const res = await fetchChatHistory(employeeId, activeConversation.employeeId);
      if (res.success) setMessages(res.data || []);
    } finally {
      setLoadingMessages(false);
    }
  }, [employeeId, activeConversation]);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  // ✅ CHANGED — append own message locally
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
        (res) => { if (res.success) setMessage(""); }
      );
    } else {
      const tempMsg = {
        _id: Date.now().toString(),
        sender: employeeId,
        receiver: activeConversation.employeeId,
        message,
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempMsg]); // add instantly

      socketRef.current.emit("privateMessage", {
        sender: employeeId,
        receiver: activeConversation.employeeId,
        message,
      });
      setMessage("");
    }
  }, [message, activeConversation, employeeId, username]);

  // ✅ CHANGED — set chatRef and join room immediately
  const selectChat = useCallback(
    (chat) => {
      setSelectedConversation(chat);
      setSelectedUser(null);
      setMessages([]);
      chatRef.current = chat.employeeId;

      const roomId = [employeeId, chat.employeeId].sort().join("_");
      socketRef.current.emit("joinRoom", { sender: employeeId, receiver: chat.employeeId });
      socketRef.current.emit("markRead", { sender: employeeId, receiver: chat.employeeId });

      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === chat.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );
    },
    [employeeId]
  );

  const selectUser = useCallback(
    (user) => {
      setSelectedUser(user);
      setSelectedConversation(null);
      setMessages([]);
      chatRef.current = user.employeeId;

      const roomId = [employeeId, user.employeeId].sort().join("_");
      socketRef.current.emit("joinRoom", { sender: employeeId, receiver: user.employeeId });
      socketRef.current.emit("markRead", { sender: employeeId, receiver: user.employeeId });

      setConversations((prev) =>
        prev.map((c) =>
          c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c
        )
      );
    },
    [employeeId]
  );

  const contextValue = useMemo(() => ({
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
    message,
    groups,
    groupsLoading,
    groupsError,
    setMessage,
    messages,
    loadingMessages,
    activeConversation
  }), [
    employeeId, username, userStatus, members, memberCount, loadingMembers,
    membersError, conversations, loadingConversations, conversationsError,
    message, groups, groupsLoading, groupsError, messages, loadingMessages,
    activeConversation
  ]);

  return (
    <ChatContextv2.Provider value={contextValue}>
      {children}
      {settingsGroup && (
        <GroupSettingsModal group={settingsGroup} onClose={closeGroupSettingsModal} />
      )}
    </ChatContextv2.Provider>
  );
}
