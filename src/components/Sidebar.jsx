import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Compass,
  Users,
  Clock,
  ThumbsUp,
  LayoutDashboard,
  Film,
  Code2,
  Coffee,
  Dumbbell,
  Radio,
  X
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isSidebarExpanded,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setSelectedCategory,
    setSearchQuery,
    watchLaterList,
    likedVideos,
    allCreators,
    subscribedCreators
  } = useVlogs();

  const handleNavClick = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    setSearchQuery('');
    navigate(`/?category=${encodeURIComponent(catName)}`);
    setIsMobileSidebarOpen(false);
  };

  const mainNav = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore & Trending', icon: Compass },
    { path: '/dashboard', label: 'Creator Studio', icon: LayoutDashboard },
  ];

  const libraryNav = [
    { path: '/watch-later', label: 'Watch Later', icon: Clock, count: watchLaterList.length },
    { path: '/watch-later?tab=liked', label: 'Liked Vlogs', icon: ThumbsUp, count: likedVideos.length },
  ];

  const categoriesNav = [
    { name: 'Travel', icon: Compass },
    { name: 'Tech & Coding', icon: Code2 },
    { name: 'Lifestyle', icon: Coffee },
    { name: 'Cinematography', icon: Film },
    { name: 'Fitness', icon: Dumbbell },
  ];

  function renderSidebarContent() {
    return (
      <div className="space-y-6">
        {/* Main Nav */}
        <div className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`w-full flex items-center gap-4 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Library Nav */}
        <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
          <p className="px-3.5 pb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Library
          </p>
          <div className="space-y-1">
            {libraryNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname + location.search === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-xs bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full font-mono">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Explore Categories */}
        <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
          <p className="px-3.5 pb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Explore Topics
          </p>
          <div className="space-y-1">
            {categoriesNav.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="w-full flex items-center gap-4 px-3.5 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover transition-all text-left"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subscribed Creators */}
        <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
          <div className="px-3.5 pb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Creators
            </span>
            <span className="text-xs text-brand-500 font-medium">
              {allCreators.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {allCreators.map((creator) => (
              <Link
                key={creator.id}
                to={`/creator/${encodeURIComponent(creator.handle)}`}
                onClick={handleNavClick}
                className="flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    {creator.isLive && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-dark-bg animate-ping" />
                    )}
                    {creator.hasNewUpload && !creator.isLive && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white dark:ring-dark-bg" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate font-normal">
                    {creator.name}
                  </span>
                </div>
                {creator.isLive && (
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse" /> Live
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Mini Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-dark-border px-3.5 text-xs text-gray-400 dark:text-gray-500 space-y-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            <Link to="/explore" className="hover:underline">Explore</Link>
            <Link to="/upload" className="hover:underline">Upload</Link>
            <Link to="/dashboard" className="hover:underline">Studio</Link>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
          <p className="text-[10px]">© 2026 VlogSphere Inc.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
        <div
          className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-dark-surface shadow-2xl p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-border mb-4">
            <span className="font-bold text-lg text-gray-900 dark:text-white">Navigation</span>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {renderSidebarContent()}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block sticky top-16 h-[calc(100vh-4rem)] flex-shrink-0 border-r border-gray-200/80 dark:border-dark-border/80 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm transition-all duration-300 overflow-y-auto ${
          isSidebarExpanded ? 'w-64 p-4' : 'w-20 p-2'
        }`}
      >
        {isSidebarExpanded ? (
          renderSidebarContent()
        ) : (
          /* Collapsed Mini Sidebar */
          <div className="flex flex-col items-center space-y-4 pt-2">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] tracking-tight">{item.label}</span>
                </Link>
              );
            })}

            <div className="w-8 h-px bg-gray-200 dark:bg-dark-border my-2" />

            {libraryNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname + location.search === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all relative ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] tracking-tight text-center leading-none">
                    {item.label.split(' ')[0]}
                  </span>
                  {item.count > 0 && (
                    <span className="absolute top-1 right-2 w-2 h-2 bg-brand-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </aside>
    </>
  );
}
