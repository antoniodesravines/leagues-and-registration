import React from 'react';
import { Mail } from 'lucide-react';

/**
 * NotificationBadge component
 *
 * Displays an animated mail icon with a notification count badge.
 * If the count is 0 or negative, renders nothing.
 *
 * Props:
 * - count (number): The number of notifications to display.
 *
 * Usage:
 * <NotificationBadge count={3} />
 */
const NotificationBadge = ({ count }) => {
  // If no notifications, render nothing
  if (count <= 0) return null;

  return (
    <div className="inline-flex items-center ml-2 animate-pulse">
      {/* Mail icon */}
      <Mail className="h-4 w-4 text-[#194A8D]" />

      {/* Notification count */}
      <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-5 text-center">
        {count}
      </span>
    </div>
  );
};

export default NotificationBadge;
