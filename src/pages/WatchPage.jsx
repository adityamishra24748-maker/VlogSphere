import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Clock,
  CheckCircle2,
  MessageSquare,
  Send,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Film,
  ArrowLeft
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import { useAuth } from '../context/AuthContext';
import { WatchPlayerSkeleton } from '../components/LoadingSkeleton';

export default function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getVlogById,
    vlogs,
    isLiked,
    toggleLike,
    isWatchLater,
    toggleWatchLater,
    isSubscribed,
    toggleSubscribe,
    addCommentToVlog
  } = useVlogs();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Find video
    const found = getVlogById(id);
    setVideo(found || null);

    // Short simulated buffer time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => clearTimeout(timer);
  }, [id, vlogs]);

  if (isLoading) {
    return (
      <div className="py-4 max-w-7xl mx-auto">
        <WatchPlayerSkeleton />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-dark-card flex items-center justify-center mb-4 text-gray-400">
          <Film className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Vlog Not Found
        </h2>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          This vlog may have been removed or the URL is incorrect.
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  const liked = isLiked(video.id);
  const watchLater = isWatchLater(video.id);
  const creatorSubscribed = isSubscribed(video.creator?.handle);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      user: user?.name || 'VlogSphere Explorer',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      text: commentText.trim(),
      likes: 0,
      time: 'Just now'
    };

    addCommentToVlog(video.id, newComment);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedVlogs = vlogs.filter(v => v.id !== video.id).slice(0, 6);

  return (
    <div className="py-2 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* HTML5 Video Player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-gray-200/40 dark:border-dark-border">
            <video
              src={video.videoUrl}
              poster={video.thumbnail}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video streaming.
            </video>
          </div>

          {/* Video Title */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-snug">
            {video.title}
          </h1>

          {/* Channel Bar & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200/80 dark:border-dark-border">
            {/* Creator Channel Details */}
            <div className="flex items-center gap-3">
              <Link to={`/creator/${encodeURIComponent(video.creator.handle)}`}>
                <img
                  src={video.creator.avatar}
                  alt={video.creator.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30 hover:ring-brand-500 transition-all"
                />
              </Link>
              <div>
                <Link
                  to={`/creator/${encodeURIComponent(video.creator.handle)}`}
                  className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>{video.creator.name}</span>
                  {video.creator.verified && (
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  )}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {video.creator.subscribers}
                </p>
              </div>

              <button
                onClick={() => toggleSubscribe(video.creator.handle)}
                className={`ml-3 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  creatorSubscribed
                    ? 'bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:opacity-90 shadow-md shadow-brand-500/20'
                }`}
              >
                {creatorSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Engagement Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Like / Dislike */}
              <div className="flex items-center bg-gray-100 dark:bg-dark-card rounded-full p-0.5 border border-transparent dark:border-dark-border">
                <button
                  onClick={() => {
                    toggleLike(video.id);
                    setIsDisliked(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    liked
                      ? 'text-rose-500 bg-white dark:bg-dark-surface shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-dark-surface/60'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                  <span>{video.likes.toLocaleString()}</span>
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-dark-border" />
                <button
                  onClick={() => {
                    setIsDisliked(!isDisliked);
                    if (!isDisliked && liked) toggleLike(video.id);
                  }}
                  className={`p-1.5 rounded-full text-xs transition-colors ${
                    isDisliked
                      ? 'text-gray-900 dark:text-white bg-white dark:bg-dark-surface'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-dark-surface/60'
                  }`}
                  title="Dislike"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Save / Watch Later */}
              <button
                onClick={() => toggleWatchLater(video.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors border ${
                  watchLater
                    ? 'bg-brand-50 dark:bg-brand-950 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-300'
                    : 'bg-gray-100 dark:bg-dark-card border-transparent dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-hover'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{watchLater ? 'Saved' : 'Save'}</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-gray-100 dark:bg-dark-card border border-transparent dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="p-5 rounded-2xl bg-gray-100/80 dark:bg-dark-card/80 border border-gray-200/80 dark:border-dark-border text-sm">
            <div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 mb-2">
              <span>{video.formattedViews}</span>
              <span>•</span>
              <span>{video.uploadedAt}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs">
                {video.category}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {video.tags.map((tag, i) => (
                <span key={i} className="text-xs font-medium text-brand-600 dark:text-brand-400">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Text description */}
            <p className={`text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed ${!isDescExpanded ? 'line-clamp-2' : ''}`}>
              {video.description}
            </p>

            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="mt-3 font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline text-xs"
            >
              {isDescExpanded ? (
                <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>Show more <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">
                {(video.comments || []).length} Comments
              </h2>
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-3 mb-8">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name || 'User'}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Join the discussion or leave feedback for the creator..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-gray-100 dark:bg-dark-card border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-dark-surface outline-none text-gray-900 dark:text-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-brand-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Post</span>
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-5">
              {(video.comments || []).map((comm) => (
                <div key={comm.id} className="flex gap-3.5">
                  <img
                    src={comm.avatar}
                    alt={comm.user}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                        {comm.user}
                      </span>
                      <span className="text-xs text-gray-400">
                        {comm.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 leading-snug">
                      {comm.text}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{comm.likes || 0}</span>
                      </button>
                      <button className="hover:text-gray-600 dark:hover:text-gray-300 font-medium">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Up Next Recommendations Sidebar (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-dark-border">
            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Up Next Vlogs</span>
            </h3>
            <span className="text-xs text-gray-400">Auto-play ready</span>
          </div>

          <div className="space-y-3.5">
            {relatedVlogs.map((rVlog) => (
              <div
                key={rVlog.id}
                onClick={() => navigate(`/watch/${rVlog.id}`)}
                className="flex gap-3 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors cursor-pointer group"
              >
                <div className="relative w-36 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-dark-card shadow-sm">
                  <img
                    src={rVlog.thumbnail}
                    alt={rVlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-medium">
                    {rVlog.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
                    {rVlog.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {rVlog.creator.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {rVlog.formattedViews} • {rVlog.uploadedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
