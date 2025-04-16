
// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import io from "socket.io-client";

// // 1) Your custom service calls & store (you had these in your code):
// import {
//   fetchChatHistory,
//   fetchAllMember,
// } from "../service/chatService";
// import useAuthStore from "../store/store";

// // 2) Provide the context
// export const ChatContextv2 = createContext();

// /////////////////////////////////////////////////////////////////
// // NOTE: This example references certain socket events for group chat.
// // Make sure your backend (chat.socket.js) has "getUserGroups", "createGroup",
// // "joinGroupRoom", "sendGroupMessage", "updateGroupInfo", etc.
// /////////////////////////////////////////////////////////////////

// export function ChatProviderv2({ children }) {
//   //----------------------------------------------------------------
//   // 1) Basic user info from your store
//   //----------------------------------------------------------------
//   const { employeeId: storeEmployeeId, userName: storeUserName } = useAuthStore();
//   const [employeeId, setEmployeeId] = useState("");
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (storeEmployeeId) setEmployeeId(storeEmployeeId);
//     if (storeUserName) setUsername(storeUserName);
//   }, [storeEmployeeId, storeUserName]);

//   //----------------------------------------------------------------
//   // 2) Member list: fetch from REST API
//   //----------------------------------------------------------------
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

//   //----------------------------------------------------------------
//   // 3) One-to-one conversations
//   //----------------------------------------------------------------
//   const [conversations, setConversations] = useState([]);
//   const [conversationsLoading, setConversationsLoading] = useState(false);
//   const [conversationsError, setConversationsError] = useState(null);

//   // "selectedUser" means you clicked from the UserList
//   const [selectedUser, setSelectedUser] = useState(null);

//   // "selectedConversation" means you clicked an existing conversation
//   const [selectedConversation, setSelectedConversation] = useState(null);

//   // We'll unify them in a single "activeConversation" for your 1-to-1 chat window
//   const activeConversation = useMemo(() => {
//     return selectedUser || selectedConversation || null;
//   }, [selectedUser, selectedConversation]);

//   //----------------------------------------------------------------
//   // 4) Chat messages & input
//   //----------------------------------------------------------------
//   const [messages, setMessages] = useState([]);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   //----------------------------------------------------------------
//   // 5) Socket references and initialization
//   //----------------------------------------------------------------
//   const socketRef = useRef(null);
//   const token = localStorage.getItem("accessToken");
//   const baseUrlSocket = import.meta.env.VITE_SOCKET_URL;

//   // Keep track of current user & active conversation in Refs (for socket callbacks)
//   const employeeIdRef = useRef("");
//   const activeConversationIdRef = useRef("");

//   useEffect(() => {
//     employeeIdRef.current = employeeId;
//   }, [employeeId]);

//   useEffect(() => {
//     activeConversationIdRef.current = activeConversation?.employeeId || "";
//   }, [activeConversation]);

//   // Connect the socket when we have an employeeId
//   useEffect(() => {
//     if (!employeeId) return;

//     // 1) Connect
//     const socket = io(baseUrlSocket, {
//       transports: ["websocket", "polling"],
//       reconnectionAttempts: 5,
//       timeout: 10000,
//       auth: { token },
//     });
//     socketRef.current = socket;

//     // 2) On connect, fetch conversation list
//     socket.on("connect", () => {
//       // If needed, we can join personal room
//       socket.emit("joinPersonalRoom", { employeeId });
//       // fetch conversation list
//       setConversationsLoading(true);
//       setConversationsError(null);
//       socket.emit("getAllConverationUser", employeeId);
//     });

//     // 3) On allRoomIds => update conversation list
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
//     socket.on("allRoomIds", handleAllRoomIds);

//     // 4) On receiveMessage => handle new messages
//     const handleNewMessage = (data) => {
//       const { sender, receiver } = data;
//       const fromMe = sender === employeeIdRef.current;
//       const partnerId = fromMe ? receiver : sender;

//       // If it's the active chat, push to local messages
//       if (partnerId === activeConversationIdRef.current) {
//         setMessages((prev) => [...prev, data]);
//       } else if (!fromMe) {
//         // If we are not in that conversation, increase unread
//         setConversations((prev) => {
//           const idx = prev.findIndex((c) => c.employeeId === partnerId);
//           if (idx === -1) {
//             // Not in conversation list, create new item
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
//           const old = prev[idx];
//           const updated = {
//             ...old,
//             unreadCount: (old.unreadCount || 0) + 1,
//           };
//           const newList = [...prev];
//           newList.splice(idx, 1);
//           return [updated, ...newList];
//         });
//       }
//     };
//     socket.on("receiveMessage", handleNewMessage);

//     // 5) Cleanup
//     return () => {
//       if (!socketRef.current) return;
//       socket.off("allRoomIds", handleAllRoomIds);
//       socket.off("receiveMessage", handleNewMessage);
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [employeeId, token, baseUrlSocket]);

//   //----------------------------------------------------------------
//   // 6) Selecting a conversation
//   //----------------------------------------------------------------
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
//       setMessages([]);

//       // Reset unreadCount in local state
//       setConversations((prev) =>
//         prev.map((c) =>
//           c.employeeId === conv.employeeId ? { ...c, unreadCount: 0 } : c
//         )
//       );

//       // Join the room
//       const payload = { sender: employeeId, receiver: conv.employeeId };
//       socketRef.current.emit("joinRoom", payload);

//       // Mark messages read
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
//       setMessages([]);

//       setConversations((prev) =>
//         prev.map((c) =>
//           c.employeeId === user.employeeId ? { ...c, unreadCount: 0 } : c
//         )
//       );

//       // Join new room
//       const payload = { sender: employeeId, receiver: user.employeeId };
//       socketRef.current.emit("joinRoom", payload);
//       socketRef.current.emit("markRead", {
//         sender: employeeId,
//         receiver: user.employeeId,
//       });
//     },
//     [employeeId]
//   );

//   //----------------------------------------------------------------
//   // 7) Fetching message history for active conversation
//   //----------------------------------------------------------------
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

//   //----------------------------------------------------------------
//   // 8) Sending text messages (1-to-1)
//   //----------------------------------------------------------------
//   const sendMessageHandler = useCallback(() => {
//     if (!message.trim() || !activeConversation?.employeeId) return;
//     if (!socketRef.current) return;
//     const msgData = {
//       sender: employeeId,
//       receiver: activeConversation.employeeId,
//       message,
//       time: new Date().toISOString(),
//     };
//     socketRef.current.emit("privateMessage", msgData);
//     setMessage("");
//   }, [employeeId, message, activeConversation]);

//   //----------------------------------------------------------------
//   // 9) Sending files (1-to-1) with progress
//   //----------------------------------------------------------------
//   const MAX_FILE_SIZE_MB = 20;
//   const MAX_FILES = 10;

//   const sendFileHandler = useCallback(
//     async (files, onProgress) => {
//       if (!files?.length || !socketRef.current || !activeConversation?.employeeId) return;

//       if (files.length > MAX_FILES) {
//         toast.error(`Please select at most ${MAX_FILES} files at once.`);
//         return;
//       }

//       for (const file of files) {
//         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//           toast.error(`${file.name} is too large (max ${MAX_FILE_SIZE_MB} MB).`);
//           if (onProgress) onProgress(file.name, -1);
//           continue;
//         }

//         // 1) Request pre-signed URL
//         const { success, data, message: serverMsg } = await new Promise((resolve) => {
//           socketRef.current.emit(
//             "getPreSignedUploadURL",
//             {
//               key: file.name,
//               contentType: file.type,
//               size: file.size,
//               totalFileCount: files.length,
//             },
//             (response) => resolve(response)
//           );
//         });

//         if (!success || !data?.uploadUrl) {
//           toast.error(`Failed to generate upload URL for ${file.name}.`);
//           if (onProgress) onProgress(file.name, -1);
//           continue;
//         }

//         const { uploadUrl, uniqueKey } = data;

//         // 2) Put file
//         try {
//           await axios.put(uploadUrl, file, {
//             headers: { "Content-Type": file.type },
//             onUploadProgress: (ev) => {
//               if (onProgress) {
//                 const percent = Math.round((ev.loaded * 100) / ev.total);
//                 onProgress(file.name, percent);
//               }
//             },
//           });
//         } catch (err) {
//           console.error("File upload error:", err);
//           toast.error(`Upload error for ${file.name}`);
//           if (onProgress) onProgress(file.name, -1);
//           continue;
//         }

//         // 3) Confirm upload => broadcast file message
//         const roomId = [employeeId, activeConversation.employeeId].sort().join("_");
//         const confirmResp = await new Promise((res) => {
//           socketRef.current.emit(
//             "confirmUpload",
//             {
//               uniqueKey,
//               roomId,
//               sender: employeeId,
//               receiver: activeConversation.employeeId,
//               fileName: file.name,
//               fileType: file.type,
//             },
//             (cbResp) => res(cbResp)
//           );
//         });
//         if (!confirmResp.success) {
//           toast.error(`Error saving file metadata for ${file.name}`);
//           if (onProgress) onProgress(file.name, -1);
//         } else {
//           // If success, mark 100%
//           if (onProgress) onProgress(file.name, 100);
//         }
//       }
//     },
//     [employeeId, activeConversation]
//   );

//   //----------------------------------------------------------------
//   // 10) requestFileURL for onClick a file
//   //----------------------------------------------------------------
//   const requestFileURL = useCallback((fileName) => {
//     return new Promise((resolve, reject) => {
//       if (!socketRef.current) {
//         return reject(new Error("Socket not connected"));
//       }
//       socketRef.current.emit("requestFileURL", { fileName }, (resp) => {
//         if (resp?.success) {
//           resolve(resp.data.url);
//         } else {
//           reject(resp?.message || "No URL returned");
//         }
//       });
//     });
//   }, []);

//   //----------------------------------------------------------------
//   // 11) unreadCounts (for ChatNotification, etc.)
//   //----------------------------------------------------------------
//   const unreadCounts = useMemo(() => {
//     const map = {};
//     conversations.forEach((c) => {
//       if (c.employeeId) {
//         map[c.employeeId] = c.unreadCount || 0;
//       }
//     });
//     return map;
//   }, [conversations]);

//   //////////////////////////////////////////////////////////////////
//   // ============== GROUP CHAT LOGIC BELOW =========================
//   //////////////////////////////////////////////////////////////////

//   // States for group listing
//   const [groups, setGroups] = useState([]);
//   const [groupsLoading, setGroupsLoading] = useState(false);
//   const [groupsError, setGroupsError] = useState(null);

//   // The group currently selected in UI
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   // Its messages
//   const [groupMessages, setGroupMessages] = useState([]);
//   const [groupMessagesLoading, setGroupMessagesLoading] = useState(false);

//   // For the “Group Settings” modal
//   const [showGroupSettingsModal, setShowGroupSettingsModal] = useState(false);
//   const [groupInSettings, setGroupInSettings] = useState(null);

//   // Helper: Are you the admin?
//   const isGroupAdmin = useCallback(
//     (group) => {
//       if (!group || !employeeId) return false;
//       return group.admin === employeeId;
//     },
//     [employeeId]
//   );

//   // Clear group selection
//   const clearActiveGroup = useCallback(() => {
//     setSelectedGroup(null);
//     setGroupMessages([]);
//   }, []);

//   // ============= fetchUserGroups =============
//   const fetchUserGroups = useCallback(() => {
//     if (!socketRef.current) return;
//     setGroupsLoading(true);
//     setGroupsError(null);

//     // We'll assume you have a "getUserGroups" event:
//     socketRef.current.emit("getUserGroups", employeeId, (response) => {
//       setGroupsLoading(false);
//       if (!response.success) {
//         setGroupsError(response.message || "Error fetching groups");
//         return;
//       }
//       setGroups(response.data || []);
//     });
//   }, [employeeId]);

//   // ============= createGroupUIFlow =============
//   const createGroupUIFlow = useCallback(
//     (groupName, selectedMemberIds, groupIcon) => {
//       if (!socketRef.current) return;
//       const payload = {
//         groupName,
//         admin: employeeId,
//         members: selectedMemberIds,
//         groupIcon,
//       };
//       socketRef.current.emit("createGroup", payload, (resp) => {
//         if (!resp.success) {
//           toast.error(resp.message || "Failed to create group");
//           return;
//         }
//         toast.success("Group created successfully!");
//         // refresh your group list
//         fetchUserGroups();
//       });
//     },
//     [employeeId, fetchUserGroups]
//   );

//   // ============= selectGroup =============
//   const selectGroup = useCallback((grp) => {
//     setSelectedGroup(grp);
//     setGroupMessages([]);
//     if (!socketRef.current) return;
//     socketRef.current.emit("joinGroupRoom", grp._id);
//   }, []);

//   // ============= sendGroupTextMessage =============
//   const sendGroupTextMessage = useCallback(
//     (groupId, text) => {
//       if (!socketRef.current) return;
//       const data = { groupId, sender: employeeId,senderName: username, text };
//       socketRef.current.emit("sendGroupMessage", data, (resp) => {
//         if (!resp.success) {
//           toast.error(resp.message || "Error sending group message");
//         }
//       });
//     },
//     [employeeId]
//   );

//   // ============= handleIncomingGroupMessage =============
//   const handleIncomingGroupMessage = useCallback((data) => {
//     // data: { groupId, sender, text, createdAt }
//     if (!selectedGroup) return;
//     if (data.groupId === selectedGroup._id) {
//       setGroupMessages((prev) => [...prev, data]);
//     } else {
//       // It's for a different group (not currently viewing)
//       // e.g. show a toast or increment unread
//     }
//   }, [selectedGroup]);

//   // ============= fetchGroupMessages =============
//   const fetchGroupMessages = useCallback((groupId) => {
//     if (!socketRef.current) return;
//     setGroupMessagesLoading(true);
//     // We'll assume a socket event "getGroupMessages"
//     socketRef.current.emit("getGroupMessages", groupId, (resp) => {
//       setGroupMessagesLoading(false);
//       if (!resp.success) {
//         toast.error(resp.message || "Failed to load group messages");
//         return;
//       }
//       setGroupMessages(resp.data || []);
//     });
//   }, []);

//   // ============= group settings actions =============
//   const openGroupSettingsModal = useCallback((grp) => {
//     setGroupInSettings(grp);
//     setShowGroupSettingsModal(true);
//   }, []);

//   const closeGroupSettingsModal = useCallback(() => {
//     setShowGroupSettingsModal(false);
//     setGroupInSettings(null);
//   }, []);

//   // Add member
//   const addMemberToGroup = useCallback(
//     (groupId, newMemberId) => {
//       if (!socketRef.current) return;
//       socketRef.current.emit(
//         "addMemberToGroup",
//         { groupId, adminId: employeeId, newMemberId },
//         (resp) => {
//           if (resp.success) {
//             toast.success("Member added");
//             fetchUserGroups(); // refresh group data
//           } else {
//             toast.error(resp.message || "Failed to add member");
//           }
//         }
//       );
//     },
//     [employeeId, fetchUserGroups]
//   );

//   // Remove member
//   const removeMemberFromGroup = useCallback(
//     (groupId, memberId) => {
//       if (!socketRef.current) return;
//       socketRef.current.emit(
//         "removeMemberFromGroup",
//         { groupId, adminId: employeeId, memberId },
//         (resp) => {
//           if (resp.success) {
//             toast.success("Member removed");
//             fetchUserGroups();
//           } else {
//             toast.error(resp.message || "Failed to remove member");
//           }
//         }
//       );
//     },
//     [employeeId, fetchUserGroups]
//   );

//   // Update group info
//   const updateGroupInfo = useCallback(
//     (groupId, newName, newIcon) => {
//       if (!socketRef.current) return;
//       const payload = {
//         groupId,
//         adminId: employeeId,
//         newName,
//         newIcon,
//       };
//       socketRef.current.emit("updateGroupInfo", payload, (resp) => {
//         if (resp.success) {
//           toast.success("Group info updated");
//           fetchUserGroups();
//         } else {
//           toast.error(resp.message || "Failed to update group");
//         }
//       });
//     },
//     [employeeId, fetchUserGroups]
//   );

//   // Delete group
//   const deleteGroup = useCallback(
//     (groupId) => {
//       if (!socketRef.current) return;
//       const payload = {
//         groupId,
//         adminId: employeeId,
//       };
//       socketRef.current.emit("deleteGroup", payload, (resp) => {
//         if (resp.success) {
//           toast.success("Group deleted");
//           // remove from local
//           setGroups((prev) => prev.filter((g) => g._id !== groupId));
//           if (selectedGroup && selectedGroup._id === groupId) {
//             clearActiveGroup();
//           }
//         } else {
//           toast.error(resp.message || "Failed to delete group");
//         }
//       });
//     },
//     [employeeId, selectedGroup, clearActiveGroup]
//   );

//   // leaveGroupChat => just close the UI
//   const leaveGroupChat = useCallback(() => {
//     clearActiveGroup();
//   }, [clearActiveGroup]);

//   //----------------------------------------------------------------
//   // 12) Listen for group events
//   //----------------------------------------------------------------
//   useEffect(() => {
//     if (!socketRef.current) return;

//     // groupCreated => if the user is in members, refresh
//     const handleGroupCreated = (data) => {
//       if (data.success && data.members.includes(employeeId)) {
//         toast(`You were added to group: ${data.groupName}`, { icon: "🎉" });
//         fetchUserGroups();
//       }
//     };

//     // groupMessage => if it's for current group, push message
//     const handleGroupMessage = (data) => {
//       handleIncomingGroupMessage(data);
//     };

//     // groupDeleted => remove from local, close if current
//     const handleGroupDeleted = ({ groupId }) => {
//       setGroups((prev) => prev.filter((g) => g._id !== groupId));
//       if (selectedGroup && selectedGroup._id === groupId) {
//         clearActiveGroup();
//       }
//       toast("A group was deleted");
//     };

//     socketRef.current.on("groupCreated", handleGroupCreated);
//     socketRef.current.on("groupMessage", handleGroupMessage);
//     socketRef.current.on("groupDeleted", handleGroupDeleted);

//     return () => {
//       if (!socketRef.current) return;
//       socketRef.current.off("groupCreated", handleGroupCreated);
//       socketRef.current.off("groupMessage", handleGroupMessage);
//       socketRef.current.off("groupDeleted", handleGroupDeleted);
//     };
//   }, [
//     employeeId,
//     selectedGroup,
//     handleIncomingGroupMessage,
//     fetchUserGroups,
//     clearActiveGroup,
//   ]);

//   //----------------------------------------------------------------
//   // 13) Build final context object
//   //----------------------------------------------------------------
//   const contextValue = useMemo(() => {
//     return {
//       //////////////////////////////////////////////////////////////////
//       // 1-to-1 chat
//       //////////////////////////////////////////////////////////////////
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

//       // File sending
//       sendFileHandler,

//       // requestFileURL
//       requestFileURL,

//       // Unread counts
//       unreadCounts,

//       //////////////////////////////////////////////////////////////////
//       // GROUP chat
//       //////////////////////////////////////////////////////////////////
//       groups,
//       groupsLoading,
//       groupsError,
//       fetchUserGroups,
//       createGroupUIFlow,
//       selectedGroup,
//       selectGroup,
//       groupMessages,
//       groupMessagesLoading,
//       sendGroupTextMessage,
//       fetchGroupMessages,
//       leaveGroupChat,

//       isGroupAdmin,
//       openGroupSettingsModal,
//       addMemberToGroup,
//       removeMemberFromGroup,
//       updateGroupInfo,
//       deleteGroup,

//       showGroupSettingsModal,
//       groupInSettings,
//       closeGroupSettingsModal,

//       clearActiveGroup,
//     };
//   }, [
//     // 1-to-1
//     employeeId, username,
//     members, totalCount, loading, error, fetchMembers,
//     conversations, conversationsLoading, conversationsError,
//     selectedUser, selectedConversation, activeConversation,
//     messages, messagesLoading, message,
//     sendMessageHandler, sendFileHandler, requestFileURL,
//     unreadCounts, clearActiveConversation, handleSelectConversation,
//     handleSelectUser,

//     // group
//     groups, groupsLoading, groupsError,
//     fetchUserGroups, createGroupUIFlow, selectedGroup, selectGroup,
//     groupMessages, groupMessagesLoading, sendGroupTextMessage,
//     fetchGroupMessages, leaveGroupChat, isGroupAdmin,
//     openGroupSettingsModal, addMemberToGroup, removeMemberFromGroup,
//     updateGroupInfo, deleteGroup, showGroupSettingsModal, groupInSettings,
//     closeGroupSettingsModal, clearActiveGroup,
//   ]);

//   return (
//     <ChatContextv2.Provider value={contextValue}>
//       {children}
//       {/* Conditionally show the Group Settings Modal */}
//       {showGroupSettingsModal && groupInSettings && (
//         <GroupSettingsModal
//           group={groupInSettings}
//           onClose={closeGroupSettingsModal}
//         />
//       )}
//     </ChatContextv2.Provider>
//   );
// }

// //----------------------------------------------------------------
// // 14) GroupSettingsModal sub-component
// //----------------------------------------------------------------
// function GroupSettingsModal({ group, onClose }) {
//   const {
//     isGroupAdmin,
//     employeeId,
//     members,
//     addMemberToGroup,
//     removeMemberFromGroup,
//     updateGroupInfo,
//     deleteGroup,
//     fetchUserGroups,
//   } = React.useContext(ChatContextv2);

//   const [newName, setNewName] = useState(group.groupName);
//   const [newIcon, setNewIcon] = useState(group.groupIcon || "");
//   // For picking a user to add:
//   const [userToAdd, setUserToAdd] = useState("");
//   // Confirm delete
//   const [deleteConfirm, setDeleteConfirm] = useState("");

//   // Filter out existing members
//   const existingIds = new Set(group.members || []);
//   const possibleNewMembers = members.filter((m) => !existingIds.has(m.employeeId));

//   // The group’s current members
//   // We can remove them if we’re admin
//   const handleRemove = (memberId) => {
//     if (!window.confirm("Remove this user from the group?")) return;
//     removeMemberFromGroup(group._id, memberId);
//   };

//   const handleAdd = () => {
//     if (!userToAdd) return;
//     addMemberToGroup(group._id, userToAdd);
//     setUserToAdd("");
//   };

//   const handleUpdateGroupInfo = () => {
//     if (!newName.trim()) {
//       alert("Group name cannot be blank");
//       return;
//     }
//     updateGroupInfo(group._id, newName.trim(), newIcon.trim());
//   };

//   const handleDelete = () => {
//     if (deleteConfirm !== "DELETE") {
//       alert('Type "DELETE" in the box if you really want to delete this group.');
//       return;
//     }
//     if (!window.confirm("Are you sure you want to permanently delete this group?"))
//       return;
//     deleteGroup(group._id);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-3">
//       <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded p-4 space-y-4 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         >
//           ✕
//         </button>

//         <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
//           Group Settings
//         </h2>

//         {/* If admin, show rename options */}
//         {isGroupAdmin(group) ? (
//           <>
//             <div className="mb-2">
//               <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
//                 Group Name
//               </label>
//               <input
//                 className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//               />
//             </div>

//             <div className="mb-2">
//               <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
//                 Group Icon (URL)
//               </label>
//               <input
//                 className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//                 value={newIcon}
//                 onChange={(e) => setNewIcon(e.target.value)}
//               />
//             </div>

//             <button
//               className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mb-4"
//               onClick={handleUpdateGroupInfo}
//             >
//               Update Group Info
//             </button>

//             <hr />

//             {/* Add member */}
//             <div className="mb-2">
//               <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
//                 Add New Member
//               </label>
//               <select
//                 className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//                 value={userToAdd}
//                 onChange={(e) => setUserToAdd(e.target.value)}
//               >
//                 <option value="">-- Select a user --</option>
//                 {possibleNewMembers.map((m) => (
//                   <option key={m.employeeId} value={m.employeeId}>
//                     {m.firstName} {m.lastName} ({m.employeeId})
//                   </option>
//                 ))}
//               </select>
//               <button
//                 className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
//                 onClick={handleAdd}
//               >
//                 Add Member
//               </button>
//             </div>

//             <hr />

//             {/* Existing members */}
//             <div>
//               <p className="text-sm font-semibold mb-1">
//                 Current Members ({group.members?.length || 0})
//               </p>
//               {group.members?.map((mId) => (
//                 <div key={mId} className="flex items-center justify-between mb-1">
//                   <span className="text-xs text-gray-700 dark:text-gray-200">
//                     {mId}
//                     {mId === group.admin && (
//                       <strong className="ml-1 text-pink-600">(Admin)</strong>
//                     )}
//                   </span>
//                   {mId !== group.admin && (
//                     <button
//                       className="text-red-600 hover:text-red-800 text-xs"
//                       onClick={() => handleRemove(mId)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <hr />
//             {/* Delete group */}
//             <div>
//               <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">
//                 Type <strong>DELETE</strong> to confirm:
//               </p>
//               <input
//                 className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
//                 placeholder="DELETE"
//                 value={deleteConfirm}
//                 onChange={(e) => setDeleteConfirm(e.target.value)}
//               />
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//               >
//                 Delete Group
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-sm text-gray-600 dark:text-gray-300">
//             You are <strong>not</strong> the admin, so you cannot update this group.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


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
import {
  fetchChatHistory,
  fetchAllMember,
} from "../service/chatService";
import useAuthStore from "../store/store";

// 2) Provide the context
export const ChatContextv2 = createContext();

/////////////////////////////////////////////////////////////////
// NOTE: This example references certain socket events for group chat.
// Make sure your backend (chat.socket.js) has "getUserGroups", "createGroup",
// "joinGroupRoom", "sendGroupMessage", "updateGroupInfo", etc.
/////////////////////////////////////////////////////////////////

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
          // If success, mark 100%
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

    // We'll assume you have a "getUserGroups" event:
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
          // remove from local
          setGroups((prev) => prev.filter((g) => g._id !== groupId));
          if (selectedGroup && selectedGroup._id === groupId) {
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

    // groupDeleted => remove from local, close if current
    const handleGroupDeleted = ({ groupId }) => {
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      if (selectedGroup && selectedGroup._id === groupId) {
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

//----------------------------------------------------------------
// 14) GroupSettingsModal sub-component
//----------------------------------------------------------------
function GroupSettingsModal({ group, onClose }) {
  const {
    isGroupAdmin,
    employeeId,
    members,
    addMemberToGroup,
    removeMemberFromGroup,
    updateGroupInfo,
    deleteGroup,
    fetchUserGroups,
  } = React.useContext(ChatContextv2);

  const [newName, setNewName] = useState(group.groupName);
  const [newIcon, setNewIcon] = useState(group.groupIcon || "");
  // For picking a user to add:
  const [userToAdd, setUserToAdd] = useState("");
  // Confirm delete
  const [deleteConfirm, setDeleteConfirm] = useState("");

  // Filter out existing members
  const existingIds = new Set(group.members || []);
  const possibleNewMembers = members.filter((m) => !existingIds.has(m.employeeId));

  // The group’s current members
  // We can remove them if we’re admin
  const handleRemove = (memberId) => {
    if (!window.confirm("Remove this user from the group?")) return;
    removeMemberFromGroup(group._id, memberId);
  };

  const handleAdd = () => {
    if (!userToAdd) return;
    addMemberToGroup(group._id, userToAdd);
    setUserToAdd("");
  };

  const handleUpdateGroupInfo = () => {
    if (!newName.trim()) {
      alert("Group name cannot be blank");
      return;
    }
    updateGroupInfo(group._id, newName.trim(), newIcon.trim());
  };

  const handleDelete = () => {
    if (deleteConfirm !== "DELETE") {
      alert('Type "DELETE" in the box if you really want to delete this group.');
      return;
    }
    if (!window.confirm("Are you sure you want to permanently delete this group?"))
      return;
    deleteGroup(group._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-3">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded p-4 space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
          Group Settings
        </h2>

        {/* If admin, show rename options */}
        {isGroupAdmin(group) ? (
          <>
            <div className="mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Group Name
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Group Icon (URL)
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mb-4"
              onClick={handleUpdateGroupInfo}
            >
              Update Group Info
            </button>

            <hr />

            {/* Add member */}
            <div className="mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Add New Member
              </label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={userToAdd}
                onChange={(e) => setUserToAdd(e.target.value)}
              >
                <option value="">-- Select a user --</option>
                {possibleNewMembers.map((m) => (
                  <option key={m.employeeId} value={m.employeeId}>
                    {m.firstName} {m.lastName} ({m.employeeId})
                  </option>
                ))}
              </select>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
                onClick={handleAdd}
              >
                Add Member
              </button>
            </div>

            <hr />

            {/* Existing members */}
            <div>
              <p className="text-sm font-semibold mb-1">
                Current Members ({group.members?.length || 0})
              </p>
              {group.members?.map((mId) => (
                <div key={mId} className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 dark:text-gray-200">
                    {mId}
                    {mId === group.admin && (
                      <strong className="ml-1 text-pink-600">(Admin)</strong>
                    )}
                  </span>
                  {mId !== group.admin && (
                    <button
                      className="text-red-600 hover:text-red-800 text-xs"
                      onClick={() => handleRemove(mId)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <hr />
            {/* Delete group */}
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
                placeholder="DELETE"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
              />
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete Group
              </button>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            You are <strong>not</strong> the admin, so you cannot update this group.
          </div>
        )}
      </div>
    </div>
  );
}
