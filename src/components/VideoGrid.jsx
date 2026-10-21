import React from 'react';
import { Film, Sparkles, RefreshCcw, Flame, Clock, ThumbsUp, Users } from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import VideoCard from './VideoCard';

export default function VideoGrid() {
  const {
    filteredVlogs,
    activeTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveTab
  } = useVlogs();

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setActiveTab('home');
  };

  const getSectionTitle = () => {
    if (searchQuery) {
      return (
        <div className="flex items-center gap-2">
          <span>Results for</span>
          <span className="font-bold text-brand-600 dark:text-brand-400">"{searchQuery}"</span>
        </div>
      );
    }
    if (activeTab === 'trending') {
      return (
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-500" />
          <span>Trending Vlogs</span>
        </div>
      );
    }
    if (activeTab === 'subscriptions') {
      return (
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          <span>From Your Subscribed Creators</span>
        </div>
      );
    }
    if (activeTab === 'watch-later') {
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span>Your Watch Later Queue</span>
        </div>
      );
    }
    if (activeTab === 'liked') {
      return (
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-rose-500" />
          <span>Liked Vlogs</span>
        </div>
      );
    }
    if (selectedCategory !== 'All') {
      return (
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <span>{selectedCategory} Vlogs</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <span>Featured Community Vlogs</span>
      </div>
    );
  };

  return (
    <section className="py-4">
      {/* Grid Header Info */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          {getSectionTitle()}
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-card px-2.5 py-1 rounded-full font-medium">
          {filteredVlogs.length} {filteredVlogs.length === 1 ? 'vlog' : 'vlogs'}
        </span>
      </div>

      {/* Empty State */}
      {filteredVlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-gray-50/60 dark:bg-dark-card/40 border border-dashed border-gray-200 dark:border-dark-border">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 shadow-inner">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            No vlogs found
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            We couldn't find any vlogs matching your current search or category filter. Try exploring another topic or clearing your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-md shadow-brand-500/20 transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        /* Video Card Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
          {filteredVlogs.map((vlog) => (
            <VideoCard key={vlog.id} video={vlog} />
          ))}
        </div>
      )}
    </section>
  );
}
