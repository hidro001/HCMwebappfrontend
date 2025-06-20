import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContextv2 } from '../../contexts/ChatContextv2';

export default function ChatNotification() {
  const { unreadCounts = {}, members = [], handleSelectUser } = useContext(ChatContextv2);
  const navigate = useNavigate();

  // Track dismissed senders as a Set
  const [dismissed, setDismissed] = useState(() => new Set());

  // Remove dismissed entries when their unread count resets
  useEffect(() => {
    if (dismissed.size === 0) return;
    let changed = false;
    const next = new Set();
    dismissed.forEach((id) => {
      if (unreadCounts[id] > 0) {
        next.add(id);
      } else {
        changed = true;
      }
    });
    if (changed) setDismissed(next);
  }, [unreadCounts, dismissed]);

  // Build list of active notifications
  const notifications = useMemo(
    () =>
      Object.entries(unreadCounts)
        .filter(([id, count]) => count > 0 && !dismissed.has(id))
        .map(([id, count]) => ({ id, count })),
    [unreadCounts, dismissed]
  );

  if (notifications.length === 0) return null;

  // Handle clicking a notification
  const onNotificationClick = useCallback(
    (id) => {
      setDismissed((prev) => new Set(prev).add(id));
      const user = members.find((u) => u.employeeId === id);
      if (user) handleSelectUser(user);
      navigate('/dashboard/chats');
    },
    [members, handleSelectUser, navigate]
  );

  // Dismiss without opening
  const onDismiss = useCallback(
    (e, id) => {
      e.stopPropagation();
      setDismissed((prev) => new Set(prev).add(id));
    },
    []
  );

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-3 z-50">
      {notifications.map(({ id, count }) => {
        const user = members.find((u) => u.employeeId === id) || {};
        const name = user.firstName
          ? `${user.firstName} ${user.lastName}`
          : id;
        const avatar = user.userAvatar;

        return (
          <div
            key={id}
            onClick={() => onNotificationClick(id)}
            className="flex items-start max-w-sm p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg cursor-pointer transition-transform hover:-translate-y-1"
          >
            <button
              onClick={(e) => onDismiss(e, id)}
              aria-label="Dismiss"
              className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>

            <div className="flex-shrink-0 mr-3">
              {avatar ? (
                <img className="w-10 h-10 rounded-full" src={avatar} alt={name} />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  {name[0]}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  {name}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Just now
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
                {`You have ${count} new message${count > 1 ? 's' : ''}.`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
