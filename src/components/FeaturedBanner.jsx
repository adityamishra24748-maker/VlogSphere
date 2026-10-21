import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, TrendingUp, ShieldCheck, Flame } from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function FeaturedBanner() {
  const navigate = useNavigate();
  const { vlogs, searchQuery, selectedCategory } = useVlogs();

  // Only show the featured spotlight on the main home view without search/filters
  if (searchQuery.trim() !== '' || selectedCategory !== 'All') {
    return null;
  }

  // Pick the top trending vlog
  const featured = vlogs[0];
  if (!featured) return null;

  return (
    <div className="relative mb-6 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-dark-border group">
      {/* Background Image with Gradient Overlay */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={featured.thumbnail}
          alt={featured.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent" />
      </div>

      {/* Banner Content */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white backdrop-blur-md uppercase tracking-wider shadow-lg shadow-rose-500/20">
            <Flame className="w-3.5 h-3.5 fill-current" /> Creator Spotlight
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500/40 text-brand-200 border border-brand-400/30 backdrop-blur-md">
            4K HDR
          </span>
        </div>

        <h1
          onClick={() => navigate(`/watch/${featured.id}`)}
          className="text-xl sm:text-3xl font-extrabold max-w-2xl leading-tight mb-2 drop-shadow-sm cursor-pointer hover:text-brand-300 transition-colors"
        >
          {featured.title}
        </h1>

        <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 mb-4">
          <div
            onClick={() => navigate(`/creator/${encodeURIComponent(featured.creator.handle)}`)}
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
          >
            <img
              src={featured.creator.avatar}
              alt={featured.creator.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-white/50"
            />
            <span className="font-semibold text-white">{featured.creator.name}</span>
          </div>
          <span>•</span>
          <span>{featured.formattedViews}</span>
          <span>•</span>
          <span>{featured.uploadedAt}</span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/watch/${featured.id}`)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span>Watch Spotlight</span>
          </button>
        </div>
      </div>
    </div>
  );
}
