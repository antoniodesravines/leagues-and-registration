import React from 'react';
import { Mail } from 'lucide-react';

interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count <= 0) return null;
  
  return (
    <div className="inline-flex items-center ml-2 animate-pulse">
      <Mail className="h-4 w-4 text-[#194A8D]" />
      <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-5 text-center">
        {count}
      </span>
    </div>
  );
};

export default NotificationBadge;