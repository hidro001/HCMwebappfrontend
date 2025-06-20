import { useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";

function Unread({ searchTerm }) {
  const { conversations } = useContext(ChatContextv2);

  const unreadConversations = conversations.filter(c => c.unreadCount > 0);

  const filteredUnreadConversations = unreadConversations.filter(chat => {
    const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
    const employeeId = chat.employeeId?.toLowerCase();
    const messageText = chat.lastMessage?.message?.toLowerCase() || "";
    const q = searchTerm.toLowerCase();

    return fullName.includes(q) || employeeId?.includes(q) || messageText.includes(q);
  });

  return (
    <div className="container text-black">
      {filteredUnreadConversations.length > 0 ? (
        filteredUnreadConversations.map((chat, index) => {
          const avatarUrl =
            chat.userAvatar || `https://ui-avatars.com/api/?name=${chat.firstName}`;

          return (
            <div key={index} className="flex items-center justify-between border-b py-3">
              <div className="flex items-center">
                <img
                  src={avatarUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{chat.firstName}</p>
                  <p className="text-sm text-gray-500">
                    {chat.lastMessage?.message || "New message"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {chat.lastMessage?.timestamp
                    ? new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    : ""}
                </p>
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full inline-block mt-1">
                  {chat.unreadCount}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <p className="dark:text-white">No unread messages</p>
      )}
    </div>
  );
}

export default Unread;
