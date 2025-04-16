// import React, { useState, useContext } from "react";
// import ConversationList from "./ConversationList";
// import UserList from "./UserList";
// import ChatWindow from "./ChatWindow";
// import GroupList from "./GroupList";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import GroupChatWindow from "./GroupChatWindow";

// export default function Chat() {
//   const [activeTab, setActiveTab] = useState("Conversations");
//   const {
//     activeConversation,
//     clearActiveConversation,
//     setSelectedUser,
//     setSelectedConversation,
//     // We'll also add selectedGroup in the ChatContext below
//     selectedGroup,
//     clearActiveGroup, // We'll define in context
//   } = useContext(ChatContextv2);

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     // Reset everything
//     clearActiveConversation();
//     clearActiveGroup?.();
//     setSelectedUser(null);
//     setSelectedConversation(null);
//   };

//   const renderLeftPanelContent = () => {
//     if (activeTab === "Members") return <UserList />;
//     if (activeTab === "Groups") return <GroupList />;
//     return <ConversationList />;
//   };

//   const renderRightPanelContent = () => {
//     // If a 1-to-1 conversation is selected
//     if (activeConversation) return <ChatWindow />;

//     // If a group is selected, we’ll create GroupChatWindow
//     if (selectedGroup) {
//       // Show the group chat window
//       return <GroupChatWindow />;
//     }

//     return (
//       <div className="flex flex-col items-center justify-center h-full">
//         <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6 flex flex-col items-center">
//           <div className="text-4xl mb-4" role="img" aria-label="Chat icon">
//             💬
//           </div>
//           <p className="text-sm text-gray-700 dark:text-gray-300">
//             Select a conversation or group to start chatting
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-[70vh] w-full bg-gray-100 dark:bg-gray-800 transition-colors">
//       {/* LEFT PANEL */}
//       <div className="w-full md:w-3/12 h-auto md:h-full flex flex-col transition-all">
//         {/* Tabs */}
//         <div className="flex flex-row h-12 md:h-14 p-2 gap-2 justify-center">
//           {/* Chat tab */}
//           <div
//             onClick={() => handleTabSwitch("Conversations")}
//             className={`
//               w-1/3 flex items-center justify-center
//               text-sm font-semibold cursor-pointer
//               shadow-md transition-all rounded-l-lg
//               ${
//                 activeTab === "Conversations"
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//               }
//             `}
//           >
//             Chat
//           </div>

//           {/* Members Tab */}
//           <div
//             onClick={() => handleTabSwitch("Members")}
//             className={`
//               w-1/3 flex items-center justify-center
//               text-sm font-semibold cursor-pointer
//               shadow-md transition-all
//               ${
//                 activeTab === "Members"
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//               }
//             `}
//           >
//             Members
//           </div>

//           {/* Groups Tab */}
//           <div
//             onClick={() => handleTabSwitch("Groups")}
//             className={`
//               w-1/3 flex items-center justify-center
//               text-sm font-semibold cursor-pointer
//               shadow-md transition-all rounded-r-lg
//               ${
//                 activeTab === "Groups"
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//               }
//             `}
//           >
//             Groups
//           </div>
//         </div>

//         {/* List area */}
//         <div className="flex-1 overflow-y-auto px-2 pb-2">
//           {renderLeftPanelContent()}
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="flex-1 h-full p-4 overflow-y-auto">
//         {renderRightPanelContent()}
//       </div>
//     </div>
//   );
// }




import React, { useState, useContext } from "react";
import ConversationList from "./ConversationList";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import GroupList from "./GroupList";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import GroupChatWindow from "./GroupChatWindow";
// Import React icons
import { 
  FiMessageSquare, 
  FiUsers, 
  FiUserPlus, 
  FiMessageCircle 
} from "react-icons/fi";

export default function Chat() {
  const [activeTab, setActiveTab] = useState("Conversations");
  const {
    activeConversation,
    clearActiveConversation,
    setSelectedUser,
    setSelectedConversation,
    selectedGroup,
    clearActiveGroup,
  } = useContext(ChatContextv2);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    clearActiveConversation();
    clearActiveGroup?.();
    setSelectedUser(null);
    setSelectedConversation(null);
  };

  const renderLeftPanelContent = () => {
    if (activeTab === "Members") return <UserList />;
    if (activeTab === "Groups") return <GroupList />;
    return <ConversationList />;
  };

  const renderRightPanelContent = () => {
    if (activeConversation) return <ChatWindow />;
    if (selectedGroup) return <GroupChatWindow />;

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-slate-800/40 backdrop-blur-lg rounded-xl shadow-xl p-8 flex flex-col items-center border border-slate-700/50">
          <div className="text-6xl mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-4 shadow-lg">
            <FiMessageCircle className="text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Ready to Connect
          </h3>
          <p className="text-sm text-slate-300 text-center">
            Select a conversation or group to start chatting
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-[75vh] w-full bg-slate-900 text-slate-200 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      {/* LEFT PANEL */}
      <div className="w-full md:w-3/12 h-auto md:h-full flex flex-col transition-all bg-slate-800/50 backdrop-blur-md">
        {/* Tabs */}
        <div className="flex flex-row h-16 p-3 gap-2 justify-center bg-slate-900/50">
          {/* Chat tab */}
          <div
            onClick={() => handleTabSwitch("Conversations")}
            className={`
              w-1/3 flex items-center justify-center gap-2
              text-sm font-semibold cursor-pointer
              transition-all rounded-xl
              ${
                activeTab === "Conversations"
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            `}
          >
            <FiMessageSquare className="text-lg" />
            <span className="hidden md:inline">Chats</span>
          </div>

          {/* Members Tab */}
          <div
            onClick={() => handleTabSwitch("Members")}
            className={`
              w-1/3 flex items-center justify-center gap-2
              text-sm font-semibold cursor-pointer
              transition-all rounded-xl
              ${
                activeTab === "Members"
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            `}
          >
            <FiUserPlus className="text-lg" />
            <span className="hidden md:inline">Members</span>
          </div>

          {/* Groups Tab */}
          <div
            onClick={() => handleTabSwitch("Groups")}
            className={`
              w-1/3 flex items-center justify-center gap-2
              text-sm font-semibold cursor-pointer
              transition-all rounded-xl
              ${
                activeTab === "Groups"
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            `}
          >
            <FiUsers className="text-lg" />
            <span className="hidden md:inline">Groups</span>
          </div>
        </div>

        {/* List area with glass effect */}
        <div className="flex-1 overflow-y-auto px-3 py-4 backdrop-blur-sm">
          <div className="text-sm uppercase tracking-wider text-slate-400 font-medium mb-3 pl-2">
            {activeTab}
          </div>
          {renderLeftPanelContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 h-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        {renderRightPanelContent()}
      </div>
    </div>
  );
}