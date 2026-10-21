import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Users,
  Video,
  Eye,
  Calendar,
  Share2,
  Camera,
  Film,
  Sparkles,
  Check
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import VideoCard from '../components/VideoCard';

export default function CreatorProfilePage() {
  const { handle } = useParams();
  const { allCreators, getVlogsByCreator, isSubscribed, toggleSubscribe, currentUser } = useVlogs();

  const [activeTab, setActiveTab] = useState('vlogs'); // vlogs, about, playlists
  const [copied, setCopied] = useState(false);

  // Decode handle
  const cleanHandle = handle ? decodeURIComponent(handle) : '';
  const isCurrent = currentUser.handle.toLowerCase() === cleanHandle.toLowerCase();

  // Find creator details
  const creator = isCurrent
    ? currentUser
    : allCreators.find(c => c.handle.toLowerCase() === cleanHandle.toLowerCase()) || {
        name: cleanHandle.replace('@', ''),
        handle: cleanHandle,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        subscribers: '100K',
        verified: true
      };

  const creatorVlogs = getVlogsByCreator(cleanHandle);
  const subscribed = isSubscribed(creator.handle);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-2 space-y-6">
      {/* Channel Banner */}
      <div className="relative h-44 sm:h-64 w-full rounded-3xl overflow-hidden bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 shadow-xl border border-gray-200/50 dark:border-dark-border">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80"
          alt="Channel Banner"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
      </div>

      {/* Creator Info Header */}
      <div className="px-2 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-white dark:ring-dark-bg shadow-2xl"
            />
            {creator.verified && (
              <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1 rounded-full bg-brand-500 text-white ring-2 ring-white dark:ring-dark-bg">
                <CheckCircle2 className="w-5 h-5 fill-current" />
              </span>
            )}
          </div>

          {/* Name & Stats */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <span>{creator.name}</span>
            </h1>
            <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
              {creator.handle}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 pt-1">
              <span className="font-semibold text-gray-900 dark:text-white">
                {creator.subscribers}
              </span>
              <span>•</span>
              <span>{creatorVlogs.length} vlogs</span>
              <span>•</span>
              <span>12.4M total views</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center sm:justify-end gap-3 self-center sm:self-end">
          <button
            onClick={() => toggleSubscribe(creator.handle)}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md ${
              subscribed
                ? 'bg-gray-200 dark:bg-dark-card text-gray-800 dark:text-gray-200 hover:bg-gray-300'
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:opacity-95 shadow-brand-500/25'
            }`}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors shadow-sm"
            title="Share channel"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-dark-border gap-6 px-2 sm:px-6 pt-4 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('vlogs')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'vlogs'
              ? 'border-brand-500 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Vlogs ({creatorVlogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'about'
              ? 'border-brand-500 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>About & Gear</span>
        </button>
      </div>

      {/* Tab 1: Creator's Vlogs */}
      {activeTab === 'vlogs' && (
        <div>
          {creatorVlogs.length === 0 ? (
            <div className="py-16 text-center">
              <Film className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-base font-bold text-gray-900 dark:text-white">
                No uploads yet
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This creator hasn't published public vlogs yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
              {creatorVlogs.map((vlog) => (
                <VideoCard key={vlog.id} video={vlog} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: About & Camera Gear */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Channel Description
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              Welcome to my official VlogSphere channel! I document adventures in high-fidelity 4K 60FPS. Exploring street cultures, minimalist architecture, software development stories, and nature trails across the globe.
              {'\n\n'}
              New cinematic uploads every Tuesday and Saturday!
            </p>

            <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
              Primary Camera & Sound Setup
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Main Camera: Sony FX3 Cinema Line Full Frame</li>
              <li>Lenses: Sony FE 24-70mm f/2.8 GM II & FE 35mm f/1.4 GM</li>
              <li>Aerial: DJI Mavic 3 Pro Cine</li>
              <li>Microphone: Sennheiser MKH 416 Shotgun & Rode Wireless PRO</li>
              <li>Color Grading: DaVinci Resolve Studio 19</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border space-y-4 h-fit">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Channel Stats
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined August 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span>12,480,910 Views</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-gray-400" />
                <span>{creatorVlogs.length} Videos Uploaded</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
