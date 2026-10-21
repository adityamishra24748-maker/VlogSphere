import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, Clock, Sparkles } from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function NotificationDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser } = useVlogs();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNotificationClick = (item) => {
    onClose();
    // Navigate to watch or explore
    navigate('/watch/vlog-5');
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="p-4 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
            {currentUser.notifications.filter(n => !n.read).length} new
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-brand-500 transition-colors flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" /> Mark read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-dark-border">
        {currentUser.notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNotificationClick(item)}
            className={`p-3.5 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors flex items-start gap-3 cursor-pointer ${
              !item.read ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
            }`}
          >
            <img
              src={item.thumbnail}
              alt="Notification thumbnail"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                {item.description}
              </p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{item.time}</span>
              </div>
            </div>
            {!item.read && (
              <span className="w-2 h-2 rounded-full bg-brand-500 mt-1 flex-shrink-0"></span>
            )}
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-gray-50 dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border text-center">
        <button
          onClick={() => {
            onClose();
            navigate('/explore');
          }}
          className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" /> View all creator activity
        </button>
      </div>
    </div>
  );
}
