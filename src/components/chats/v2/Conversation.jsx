import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Replace with your actual endpoint and include authentication if needed.
        const response = await axios.get('/api/conversations');
        if (response.data.success) {
          setConversations(response.data.data);
        } else {
          toast.error("Failed to fetch conversations");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching conversations");
      }
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (conversation) => {
    // For this conversation, choose the other participant as the chat partner.
    // Assuming participants array contains exactly two employee IDs.
    const currentUserId = localStorage.getItem('employeeId');
    const otherParticipant = conversation.participants.find(id => id !== currentUserId);
    navigate(`/chat/${otherParticipant}`, { state: { conversation } });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Conversations</h2>
      <ul>
        {conversations.map((conv) => (
          <li
            key={conv._id}
            onClick={() => handleConversationClick(conv)}
            className="flex items-center justify-between p-3 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              {/* Display the avatar of the other participant if available */}
              {conv.otherAvatar ? (
                <img
                  src={conv.otherAvatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-500" />
              )}
              <div>
                <p className="font-semibold text-gray-800">{conv.otherName || conv.participants.join(', ')}</p>
                {conv.lastMessage && (
                  <p className="text-xs text-gray-500">
                    {conv.lastMessage.length > 30 ? conv.lastMessage.substring(0, 30) + '...' : conv.lastMessage}
                  </p>
                )}
              </div>
            </div>
            {conv.unreadCounts && conv.unreadCounts.get && conv.unreadCounts.get(localStorage.getItem('employeeId')) > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                {conv.unreadCounts.get(localStorage.getItem('employeeId'))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
