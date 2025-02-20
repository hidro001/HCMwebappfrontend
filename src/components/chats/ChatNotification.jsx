import { useState, useEffect, useContext } from 'react';
import { ChatContext } from '../../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

export default function ChatNotification() {
  const { unreadCounts, employees, selectUser } = useContext(ChatContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Use JSON.stringify to perform a deep comparison on unreadCounts.
  useEffect(() => {
    if (JSON.stringify(unreadCounts) !== "{}") {
      setVisible(true);
    }
  }, [JSON.stringify(unreadCounts)]);

  // Get the notification entries.
  const notificationEntries = Object.entries(unreadCounts);
  if (notificationEntries.length === 0) return null;
  if (!visible) return null;

  // For demonstration, pick the first unread notification.
  const [firstSenderId, count] = notificationEntries[0];
  const employee = employees.find((emp) => emp.employee_Id === firstSenderId);
  const userName = employee ? `${employee.first_Name} ${employee.last_Name}` : firstSenderId;
  const userAvatar = employee ? employee.avatar : null;

  const handleNotificationClick = () => {
    // Hide the notification.
    setVisible(false);
    // Open the chat for the sender.
    if (selectUser) {
      selectUser(userName, firstSenderId);
    }
    // Navigate to the chat page after a short delay.
    setTimeout(() => {
      navigate('/dashboard/chats');
    }, 100);
  };

  return (
    <div
      onClick={handleNotificationClick}
      className="fixed bottom-4 right-4 w-full max-w-sm p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl z-50"
    >
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close Notification"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center mt-2">
        <div className="flex-shrink-0">
          {userAvatar ? (
            <img
              className="w-10 h-10 rounded-full"
              src={userAvatar}
              alt={userName}
            />
          ) : (
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4z"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {userName}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Just now
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            You have received {count} new message{count > 1 ? 's' : ''}.
          </p>
        </div>
      </div>
    </div>
  );
}
