import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  ThumbsUp,
  Play,
  Trash2,
  Bookmark,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function WatchLaterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    vlogs,
    watchLaterList,
    toggleWatchLater,
    likedVideos,
    toggleLike
  } = useVlogs();

  const tabParam = searchParams.get('tab');
  const isLikedTab = tabParam === 'liked';

  const [activeTab, setActiveTab] = useState(isLikedTab ? 'liked' : 'watch-later');

  useEffect(() => {
    setActiveTab(isLikedTab ? 'liked' : 'watch-later');
  }, [isLikedTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'liked' ? { tab: 'liked' } : {});
  };

  const currentIds = activeTab === 'liked' ? likedVideos : watchLaterList;
  const savedVlogs = vlogs.filter(v => currentIds.includes(v.id));

  const handlePlayAll = () => {
    if (savedVlogs.length > 0) {
      navigate(`/watch/${savedVlogs[0].id}`);
    }
  };

  return (
    <div className="py-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-dark-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            {activeTab === 'liked' ? (
              <>
                <ThumbsUp className="w-7 h-7 text-rose-500" />
                <span>Liked Vlogs</span>
              </>
            ) : (
              <>
                <Clock className="w-7 h-7 text-brand-500" />
                <span>Watch Later Queue</span>
              </>
            )}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {activeTab === 'liked'
              ? 'Videos you have appreciated across the platform.'
              : 'Your personal saved queue. Catch up on long-form stories anytime.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-dark-card rounded-2xl border border-gray-200/80 dark:border-dark-border self-start sm:self-auto">
          <button
            onClick={() => handleTabSwitch('watch-later')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'watch-later'
                ? 'bg-white dark:bg-dark-surface text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Watch Later ({watchLaterList.length})</span>
          </button>

          <button
            onClick={() => handleTabSwitch('liked')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'liked'
                ? 'bg-white dark:bg-dark-surface text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ThumbsUp className="w-4 h-4 text-rose-500" />
            <span>Liked ({likedVideos.length})</span>
          </button>
        </div>
      </div>

      {/* Action Banner if list is not empty */}
      {savedVlogs.length > 0 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-50/60 dark:bg-dark-card border border-brand-200/50 dark:border-dark-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {savedVlogs.length} {savedVlogs.length === 1 ? 'vlog' : 'vlogs'} in queue
            </span>
            <span className="text-xs text-gray-400">• Approx. {savedVlogs.length * 15} minutes</span>
          </div>

          <button
            onClick={handlePlayAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play All</span>
          </button>
        </div>
      )}

      {/* Content List */}
      {savedVlogs.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center rounded-3xl bg-gray-50/50 dark:bg-dark-card/40 border border-dashed border-gray-200 dark:border-dark-border px-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {activeTab === 'liked' ? 'No liked vlogs yet' : 'Your queue is empty'}
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Explore exciting stories from creators across the globe and save your favorites to watch whenever you want.
          </p>
          <Link
            to="/explore"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-500 shadow-md transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Vlogs</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedVlogs.map((vlog, index) => (
            <div
              key={vlog.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200/70 dark:border-dark-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                {/* Index number */}
                <span className="hidden sm:inline-block w-6 text-center text-xs font-mono font-bold text-gray-400">
                  {index + 1}
                </span>

                {/* Thumbnail */}
                <div
                  onClick={() => navigate(`/watch/${vlog.id}`)}
                  className="relative w-36 sm:w-44 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-dark-surface cursor-pointer"
                >
                  <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-medium">
                    {vlog.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/watch/${vlog.id}`}
                    className="font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:text-brand-500 line-clamp-2 leading-snug transition-colors"
                  >
                    {vlog.title}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {vlog.creator.name} • {vlog.formattedViews} • {vlog.uploadedAt}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => navigate(`/watch/${vlog.id}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-dark-surface hover:bg-brand-500 hover:text-white text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch</span>
                </button>

                <button
                  onClick={() => {
                    if (activeTab === 'liked') {
                      toggleLike(vlog.id);
                    } else {
                      toggleWatchLater(vlog.id);
                    }
                  }}
                  className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Remove from list"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
