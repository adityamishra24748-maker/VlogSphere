import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ThumbsUp,
  Share2,
  CheckCircle2,
  Play,
  Check
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {
    isWatchLater,
    toggleWatchLater,
    isLiked,
    toggleLike
  } = useVlogs();

  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const watchLaterActive = isWatchLater(video.id);
  const likedActive = isLiked(video.id);

  const handleCardClick = () => {
    navigate(`/watch/${video.id}`);
  };

  const handleCreatorClick = (e) => {
    e.stopPropagation();
    if (video.creator?.handle) {
      navigate(`/creator/${encodeURIComponent(video.creator.handle)}`);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/watch/${video.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    toggleWatchLater(video.id);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLike(video.id);
  };

  return (
    <div
      className="group flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-dark-card shadow-sm group-hover:shadow-xl group-hover:shadow-brand-500/10 transition-all duration-300">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Video Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-semibold text-white tracking-wider">
          {video.duration}
        </div>

        {/* 4K Badge */}
        {video.is4K && (
          <div className="absolute bottom-2.5 left-2.5 px-1.5 py-0.5 rounded bg-brand-600/90 backdrop-blur-md text-[10px] font-bold text-white tracking-wider uppercase">
            4K
          </div>
        )}

        {/* Quick Action Overlay Buttons on Hover */}
        <div
          className={`absolute top-2.5 right-2.5 flex flex-col gap-1.5 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {/* Watch Later Button */}
          <button
            onClick={handleWatchLaterClick}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
              watchLaterActive
                ? 'bg-brand-600 text-white'
                : 'bg-black/60 hover:bg-black/80 text-white hover:scale-110'
            }`}
            title={watchLaterActive ? 'Remove from Watch Later' : 'Watch Later'}
          >
            <Clock className="w-4 h-4" />
          </button>

          {/* Like Button */}
          <button
            onClick={handleLikeClick}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
              likedActive
                ? 'bg-rose-600 text-white'
                : 'bg-black/60 hover:bg-black/80 text-white hover:scale-110'
            }`}
            title={likedActive ? 'Liked' : 'Like'}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110 shadow-md"
            title="Copy vlog link"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hover Center Play Icon Glow */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-dark-surface/90 text-brand-600 dark:text-brand-400 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Simulated Hover Playback Progress Line */}
        <div
          className={`absolute bottom-0 inset-x-0 h-1 bg-brand-500 transition-all duration-1000 ${
            isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </div>

      {/* Video Info Details */}
      <div className="flex gap-3 mt-3.5 px-0.5">
        {/* Creator Avatar - clickable */}
        <div
          className="flex-shrink-0"
          onClick={handleCreatorClick}
          title={`View ${video.creator?.name}'s profile`}
        >
          <img
            src={video.creator.avatar}
            alt={video.creator.name}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 dark:ring-dark-border hover:ring-brand-500 transition-all"
          />
        </div>

        {/* Text Metadata */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
            title={video.title}
          >
            {video.title}
          </h3>

          <div
            onClick={handleCreatorClick}
            className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <span className="font-medium truncate">
              {video.creator.name}
            </span>
            {video.creator.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            <span>{video.formattedViews}</span>
            <span>•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
