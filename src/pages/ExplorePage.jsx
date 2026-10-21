import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Compass, Users, Sparkles, CheckCircle2, Play, Eye } from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import VideoCard from '../components/VideoCard';

export default function ExplorePage() {
  const navigate = useNavigate();
  const { vlogs, allCreators, categories, setSelectedCategory } = useVlogs();
  const [activeTab, setActiveTab] = useState('trending'); // trending, categories, creators

  // Sort by highest views for trending leaderboard
  const trendingVlogs = [...vlogs].sort((a, b) => b.views - a.views);

  return (
    <div className="py-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-dark-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-brand-500" />
            <span>Explore & Trending</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Discover what's capturing the world's attention across cinema, tech, and lifestyle.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-dark-card rounded-2xl border border-gray-200/80 dark:border-dark-border/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'trending'
                ? 'bg-white dark:bg-dark-surface text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Trending Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('creators')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'creators'
                ? 'bg-white dark:bg-dark-surface text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-500" />
            <span>Top Creators</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-dark-surface text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Topics</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Trending Leaderboard */}
      {activeTab === 'trending' && (
        <div className="space-y-6">
          {/* Top 3 Featured Podiums */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trendingVlogs.slice(0, 3).map((vlog, idx) => {
              const medals = ['🥇 #1 Trending', '🥈 #2 Trending', '🥉 #3 Trending'];
              const gradients = [
                'from-amber-500 to-orange-500',
                'from-slate-400 to-slate-600',
                'from-amber-700 to-amber-900'
              ];
              return (
                <div
                  key={vlog.id}
                  onClick={() => navigate(`/watch/${vlog.id}`)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/80 dark:border-dark-border bg-white dark:bg-dark-card flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={vlog.thumbnail}
                      alt={vlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-bold shadow-md">
                      <span className={`bg-gradient-to-r ${gradients[idx]} px-2.5 py-1 rounded-full`}>
                        {medals[idx]}
                      </span>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-semibold">
                      {vlog.duration}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-brand-500 transition-colors">
                        {vlog.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={vlog.creator.avatar}
                          alt={vlog.creator.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          {vlog.creator.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-dark-border text-xs text-gray-500">
                      <span>{vlog.formattedViews}</span>
                      <span>{vlog.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining Trending Grid */}
          <div className="pt-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <span>Full Trending Leaderboard</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
              {trendingVlogs.slice(3).map((vlog) => (
                <VideoCard key={vlog.id} video={vlog} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Top Creators */}
      {activeTab === 'creators' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCreators.map((creator) => {
            const creatorVlogs = vlogs.filter(v => v.creator.handle === creator.handle);
            return (
              <div
                key={creator.id}
                className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="relative mb-4">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-500/20 group-hover:ring-brand-500 transition-all"
                  />
                  {creator.verified && (
                    <CheckCircle2 className="w-5 h-5 text-brand-500 absolute bottom-0 right-0 bg-white dark:bg-dark-bg rounded-full" />
                  )}
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {creator.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                  {creator.handle}
                </p>

                <div className="flex items-center gap-4 my-4 py-2 px-4 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border text-xs">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{creator.subscribers}</p>
                    <p className="text-gray-500">Subscribers</p>
                  </div>
                  <div className="w-px h-6 bg-gray-200 dark:bg-dark-border" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{creatorVlogs.length} Vlogs</p>
                    <p className="text-gray-500">Published</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/creator/${encodeURIComponent(creator.handle)}`)}
                  className="w-full mt-auto py-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-600 dark:hover:bg-brand-600 text-brand-600 dark:text-brand-300 hover:text-white dark:hover:text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Channel Profile</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Topics / Categories Grid */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.filter(c => c !== 'All').map((category) => {
            const count = vlogs.filter(v => v.category.toLowerCase() === category.toLowerCase()).length;
            const categoryThumbnail = vlogs.find(v => v.category.toLowerCase() === category.toLowerCase())?.thumbnail ||
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

            return (
              <div
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  navigate(`/?category=${encodeURIComponent(category)}`);
                }}
                className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-dark-border"
              >
                <img
                  src={categoryThumbnail}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase font-bold text-brand-300 tracking-wider">
                    Category Spotlight
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                    {category}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    {count} {count === 1 ? 'vlog' : 'vlogs'} available
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
