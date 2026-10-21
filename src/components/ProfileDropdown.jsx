import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Video, Clock, Bookmark, Settings, LogOut, ShieldCheck, ExternalLink, LogIn } from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import { useAuth } from '../context/AuthContext';

export default function ProfileDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { watchLaterList, likedVideos } = useVlogs();
  const { user, logout, isAuthenticated } = useAuth();
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

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div
        ref={dropdownRef}
        className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-2xl z-50 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="text-center py-2">
          <p className="font-semibold text-gray-900 dark:text-white text-sm">
            Sign in to VlogSphere
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Upload vlogs, subscribe to creators, and track your watch list.
          </p>
        </div>
        <button
          onClick={() => handleNavigate('/login')}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </button>
        <button
          onClick={() => handleNavigate('/signup')}
          className="w-full py-2 rounded-xl border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-dark-hover"
        >
          Create Channel
        </button>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* User Header */}
      <div className="p-4 bg-gradient-to-br from-brand-50 to-indigo-50/40 dark:from-dark-surface dark:to-dark-card border-b border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500 ring-offset-2 ring-offset-white dark:ring-offset-dark-card"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.handle}
            </p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-100 dark:bg-brand-900/50 px-2 py-0.5 rounded-full">
              {user.role} • {user.subscribers}
            </span>
          </div>
        </div>
      </div>

      {/* Menu links */}
      <div className="p-2 space-y-1">
        <button
          onClick={() => handleNavigate(`/creator/${encodeURIComponent(user.handle)}`)}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors text-left"
        >
          <User className="w-4 h-4 text-gray-400" />
          <span>Your Channel</span>
        </button>

        <button
          onClick={() => handleNavigate('/dashboard')}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Video className="w-4 h-4 text-gray-400" />
            <span>VlogStudio Dashboard</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </button>

        <button
          onClick={() => handleNavigate('/watch-later')}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Watch Later</span>
          </div>
          <span className="text-xs bg-gray-100 dark:bg-dark-surface px-2 py-0.5 rounded-full text-gray-500">
            {watchLaterList.length}
          </span>
        </button>

        <button
          onClick={() => handleNavigate('/watch-later?tab=liked')}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-gray-400" />
            <span>Liked Vlogs</span>
          </div>
          <span className="text-xs bg-gray-100 dark:bg-dark-surface px-2 py-0.5 rounded-full text-gray-500">
            {likedVideos.length}
          </span>
        </button>
      </div>

      <div className="p-2 border-t border-gray-100 dark:border-dark-border space-y-1">
        <button
          onClick={() => handleNavigate('/dashboard')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors text-left"
        >
          <Settings className="w-4 h-4 text-gray-400" />
          <span>Studio Settings</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
