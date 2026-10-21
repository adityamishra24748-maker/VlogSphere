import React, { useState, useEffect } from 'react';
import {
  X,
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
  Play
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function WatchModal() {
  const {
    activeVideo,
    setActiveVideo,
    vlogs,
    isLiked,
    toggleLike,
    isWatchLater,
    toggleWatchLater,
    isSubscribed,
    toggleSubscribe,
    currentUser
  } = useVlogs();

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // Sync comments from active video
  useEffect(() => {
    if (activeVideo) {
      setCommentsList(activeVideo.comments || []);
      setIsDescExpanded(false);
      setCommentText('');
      setIsDisliked(false);
    }
  }, [activeVideo]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeVideo, setActiveVideo]);

  if (!activeVideo) return null;

  const liked = isLiked(activeVideo.id);
  const watchLater = isWatchLater(activeVideo.id);
  const creatorSubscribed = isSubscribed(activeVideo.creator?.handle);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      user: currentUser.name,
      avatar: currentUser.avatar,
      text: commentText.trim(),
      likes: 0,
      time: 'Just now'
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Recommendations: Other vlogs excluding current
  const relatedVlogs = vlogs.filter(v => v.id !== activeVideo.id).slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white dark:bg-dark-surface rounded-none sm:rounded-3xl shadow-2xl border border-gray-200/50 dark:border-dark-border overflow-hidden my-auto max-h-[96vh] flex flex-col">
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Now Playing • Theater Mode
            </span>
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
            title="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content: Player, Info, Comments (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* HTML5 Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
              <video
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnail}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Title */}
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
              {activeVideo.title}
            </h1>

            {/* Channel Bar & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-dark-border">
              {/* Creator Info */}
              <div className="flex items-center gap-3">
                <img
                  src={activeVideo.creator.avatar}
                  alt={activeVideo.creator.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                      {activeVideo.creator.name}
                    </span>
                    {activeVideo.creator.verified && (
                      <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeVideo.creator.subscribers}
                  </p>
                </div>

                <button
                  onClick={() => toggleSubscribe(activeVideo.creator.handle)}
                  className={`ml-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    creatorSubscribed
                      ? 'bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                      : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:opacity-90 shadow-md shadow-brand-500/20'
                  }`}
                >
                  {creatorSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>

              {/* Engagement Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Like / Dislike Pill */}
                <div className="flex items-center bg-gray-100 dark:bg-dark-card rounded-full p-0.5 border border-transparent dark:border-dark-border">
                  <button
                    onClick={() => {
                      toggleLike(activeVideo.id);
                      setIsDisliked(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      liked
                        ? 'text-rose-500 bg-white dark:bg-dark-surface shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-dark-surface/60'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                    <span>{activeVideo.likes.toLocaleString()}</span>
                  </button>
                  <div className="w-px h-4 bg-gray-300 dark:bg-dark-border" />
                  <button
                    onClick={() => {
                      setIsDisliked(!isDisliked);
                      if (!isDisliked && liked) toggleLike(activeVideo.id);
                    }}
                    className={`p-1.5 rounded-full text-xs transition-colors ${
                      isDisliked
                        ? 'text-gray-900 dark:text-white bg-white dark:bg-dark-surface'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-dark-surface/60'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Watch Later */}
                <button
                  onClick={() => toggleWatchLater(activeVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                    watchLater
                      ? 'bg-brand-50 dark:bg-brand-950 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-300'
                      : 'bg-gray-100 dark:bg-dark-card border-transparent dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-hover'
                  }`}
                  title="Watch Later"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save</span>
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-dark-card border border-transparent dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Description Card */}
            <div className="p-4 rounded-2xl bg-gray-100 dark:bg-dark-card border border-gray-200/60 dark:border-dark-border text-xs sm:text-sm">
              <div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <span>{activeVideo.formattedViews}</span>
                <span>•</span>
                <span>{activeVideo.uploadedAt}</span>
                <span className="px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs">
                  {activeVideo.category}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {activeVideo.tags.map((tag, i) => (
                  <span key={i} className="text-brand-600 dark:text-brand-400 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className={`text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed ${!isDescExpanded ? 'line-clamp-2' : ''}`}>
                {activeVideo.description}
              </p>

              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="mt-2 font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
              >
                {isDescExpanded ? (
                  <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Show more <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>

            {/* Comments Section */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-brand-500" />
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {commentsList.length} Comments
                </h3>
              </div>

              {/* Add Comment Input Form */}
              <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment or thought..."
                    className="flex-1 px-4 py-2 text-sm rounded-xl bg-gray-100 dark:bg-dark-card border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-dark-surface outline-none text-gray-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-sm font-semibold flex items-center gap-1 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Existing Comments List */}
              <div className="space-y-4">
                {commentsList.map((comm) => (
                  <div key={comm.id} className="flex gap-3">
                    <img
                      src={comm.avatar}
                      alt={comm.user}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                          {comm.user}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {comm.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-0.5 leading-snug">
                        {comm.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{comm.likes || 0}</span>
                        </button>
                        <button className="hover:text-gray-600 dark:hover:text-gray-300">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Recommendations (1 col) */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-brand-500" /> Up Next Vlogs
            </h3>

            <div className="space-y-3">
              {relatedVlogs.map((vlog) => (
                <div
                  key={vlog.id}
                  onClick={() => setActiveVideo(vlog)}
                  className="flex gap-3 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors cursor-pointer group"
                >
                  <div className="relative w-36 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-dark-card">
                    <img
                      src={vlog.thumbnail}
                      alt={vlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[10px] text-white font-medium">
                      {vlog.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
                      {vlog.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {vlog.creator.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {vlog.formattedViews} • {vlog.uploadedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
