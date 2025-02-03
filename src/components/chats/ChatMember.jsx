import { FaUserCircle } from "react-icons/fa";

export default function ChatMember({ setSelectedChat, chatMessages }) {
  const teamMembers = [
    { name: "Agent Rue", status: "Online", avatar: "" },
    { name: "Agent Daniel", status: "Offline", avatar: "", unread: 10 },
    { name: "Agent Rose", status: "Offline", avatar: "", unread: 9 },
    { name: "Agent William", status: "Online", avatar: "" },
  ];

  return (
    <div className="w-1/4 bg-white dark:bg-gray-800 p-4 shadow-lg hidden md:flex flex-col overflow-y-auto">
      <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">Your Team Member</h2>
      <ul>
        {teamMembers.map((member, index) => (
          <li key={index} className="flex items-center justify-between p-3 border-b dark:border-gray-700 cursor-pointer" onClick={() => setSelectedChat(member.name)}>
            <div className="flex items-center space-x-3">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{member.name}</p>
                <p className={`text-xs ${member.status === "Online" ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}>{member.status}</p>
              </div>
            </div>
            {chatMessages[member.name]?.length > 0 && <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">{chatMessages[member.name].length}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
