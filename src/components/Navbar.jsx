import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  X,
  Upload,
  Sun,
  Moon,
  Bell,
  Play,
  SlidersHorizontal,
  LogIn
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const {
    toggleSidebar,
    setIsMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    sortBy,
    setSortBy,
    currentUser
  } = useVlogs();

  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const handleLogoClick = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/' && window.location.pathname !== '/explore') {
      navigate('/');
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-gray-200/80 dark:border-dark-border/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileSidebarOpen(true);
              } else {
                toggleSidebar();
              }
            }}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-gray-900 via-brand-700 to-indigo-600 dark:from-white dark:via-brand-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  VlogSphere
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/40">
                  v2.0
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar with Filters */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-6">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Search className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vlogs, cinematic stories, tags..."
              className="w-full pl-10 pr-20 py-2 text-sm rounded-full bg-gray-100 dark:bg-dark-card border border-transparent focus:border-brand-500/50 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-dark-surface text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 shadow-inner"
            />

            <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Sort Filter Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className={`p-1.5 rounded-full text-xs transition-colors ${
                    sortBy !== 'recommended'
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Sort options"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-xl z-50 p-1.5 text-xs">
                    <p className="px-2.5 py-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Sort by
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy('recommended');
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        sortBy === 'recommended'
                          ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                      }`}
                    >
                      ✨ Recommended
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy('newest');
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        sortBy === 'newest'
                          ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                      }`}
                    >
                      🕒 Recently Uploaded
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy('views');
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        sortBy === 'views'
                          ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                      }`}
                    >
                      🔥 Most Viewed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Right: Actions, Theme, Notifications, User */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Upload Page Link */}
          <Link
            to="/upload"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-90 duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 animate-in spin-in-90 duration-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {currentUser.notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-dark-bg animate-pulse"></span>
              )}
            </button>
            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
            />
          </div>

          {/* User Profile or Sign In */}
          {isAuthenticated ? (
            <div className="relative ml-1">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-brand-500/40 hover:ring-brand-500 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              <ProfileDropdown
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-dark-border text-xs sm:text-sm font-semibold hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
            >
              <LogIn className="w-4 h-4 text-brand-500" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
