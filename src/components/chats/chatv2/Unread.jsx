import { useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";

function Unread({ searchTerm }) {
  const { conversations, groups, selectChat, selectGroup } = useContext(ChatContextv2);

  const unreadConversations = conversations.filter(c => c.unreadCount > 0);
  const unreadGroups = groups.filter(g => g.unreadCount > 0);

  console.log("🔔 Unread - All groups:", groups);
  console.log("🔔 Unread - Groups with unread count:", unreadGroups);
  console.log("🔔 Unread - All conversations:", conversations);
  console.log("🔔 Unread - Conversations with unread count:", unreadConversations);

  const combinedUnreadItems = [
    ...unreadConversations.map(chat => ({ ...chat, type: 'conversation' })),
    ...unreadGroups.map(group => ({ ...group, type: 'group' }))
  ];

  const filteredUnreadItems = combinedUnreadItems.filter(item => {
    const q = searchTerm.toLowerCase();
    
    if (item.type === 'conversation') {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      const employeeId = item.employeeId?.toLowerCase();
      const messageText = item.lastMessage?.message?.toLowerCase() || "";
      return fullName.includes(q) || employeeId?.includes(q) || messageText.includes(q);
    } else {
      const groupName = item.groupName?.toLowerCase() || "";
      const messageText = item.lastMessage?.message?.toLowerCase() || "";
      return groupName.includes(q) || messageText.includes(q);
    }
  });

  const handleItemClick = (item) => {
    if (item.type === 'conversation') {
      selectChat(item);
    } else {
      selectGroup({ ...item, isGroup: true });
    }
  };

  const renderItem = (item, index) => {
    if (item.type === 'conversation') {
      const avatarUrl = item.userAvatar || `https://ui-avatars.com/api/?name=${item.firstName}`;
      
      return (
        <div 
          key={`conversation-${index}`} 
          className="flex items-center justify-between border-b py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt="profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {item.firstName} {item.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.lastMessage?.message || "New message"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 dark:text-gray-300">
              {item.lastMessage?.timestamp
                ? new Date(item.lastMessage.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : ""}
            </p>
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full inline-block mt-1">
              {item.unreadCount}
            </span>
          </div>
        </div>
      );
    } else {
      const avatarUrl = item.groupIcon || `https://ui-avatars.com/api/?name=${item.groupName}`;
      
      return (
        <div 
          key={`group-${index}`} 
          className="flex items-center justify-between border-b py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt="group"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {item.groupName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.lastMessage?.message || "New message"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 dark:text-gray-300">
              {item.lastMessage?.timestamp
                ? new Date(item.lastMessage.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : ""}
            </p>
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full inline-block mt-1">
              {item.unreadCount}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container text-black">
      {filteredUnreadItems.length > 0 ? (
        filteredUnreadItems.map((item, index) => renderItem(item, index))
      ) : (
        <p className="dark:text-white text-center py-4">No unread messages</p>
      )}
    </div>
  );
}

export default Unread;
