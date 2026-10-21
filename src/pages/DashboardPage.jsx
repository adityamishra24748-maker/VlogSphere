import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  DollarSign,
  Upload,
  Trash2,
  ExternalLink,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Video
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { vlogs, deleteVlog } = useVlogs();
  const { user } = useAuth();

  const [deletedId, setDeletedId] = useState(null);

  // Filter creator's vlogs
  const myVlogs = vlogs.filter(
    v => v.creator?.handle?.toLowerCase() === user?.handle?.toLowerCase() ||
         v.creator?.name?.toLowerCase() === user?.name?.toLowerCase()
  );

  // If none match, show top vlogs as studio demo items
  const displayVlogs = myVlogs.length > 0 ? myVlogs : vlogs.slice(0, 5);

  const handleDelete = (id) => {
    deleteVlog(id);
    setDeletedId(id);
    setTimeout(() => setDeletedId(null), 3000);
  };

  const metrics = [
    {
      title: 'Total Views (28d)',
      value: '1,420,850',
      change: '+18.4%',
      isPositive: true,
      icon: Eye,
      color: 'text-brand-500 bg-brand-50 dark:bg-brand-950/60'
    },
    {
      title: 'Watch Time (Hours)',
      value: '92,410',
      change: '+12.1%',
      isPositive: true,
      icon: Clock,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60'
    },
    {
      title: 'Subscribers',
      value: user?.subscribers || '128K',
      change: '+3,400',
      isPositive: true,
      icon: Users,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60'
    },
    {
      title: 'Estimated Revenue',
      value: '$5,240.80',
      change: '+24.6%',
      isPositive: true,
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60'
    }
  ];

  return (
    <div className="py-2 space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-dark-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              VlogStudio Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
              Pro Suite
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Performance overview for <span className="font-semibold text-gray-800 dark:text-gray-200">{user?.name}</span> ({user?.handle})
          </p>
        </div>

        <Link
          to="/upload"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Vlog</span>
        </Link>
      </div>

      {deletedId && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between">
          <span>Vlog removed from your studio channel.</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {m.title}
                </span>
                <div className={`p-2 rounded-xl ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  {m.value}
                </p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{m.change} vs prior period</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 28-Day Performance SVG Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-500" />
              <span>Audience Growth & Impression Curve (Past 28 Days)</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Daily views benchmarked against your channel average
            </p>
          </div>
          <span className="text-xs font-mono text-brand-600 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-full">
            Avg: 48.2K / day
          </span>
        </div>

        {/* Responsive Area Chart */}
        <div className="h-44 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150">
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid horizontal guidelines */}
            <line x1="0" y1="30" x2="600" y2="30" stroke="#888888" strokeOpacity="0.1" strokeDasharray="4" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="#888888" strokeOpacity="0.1" strokeDasharray="4" />
            <line x1="0" y1="130" x2="600" y2="130" stroke="#888888" strokeOpacity="0.1" strokeDasharray="4" />

            {/* Smooth trend curve */}
            <path
              d="M 0,110 Q 50,90 100,105 T 200,60 T 300,75 T 400,35 T 500,45 T 600,20 L 600,150 L 0,150 Z"
              fill="url(#gradientArea)"
            />
            <path
              d="M 0,110 Q 50,90 100,105 T 200,60 T 300,75 T 400,35 T 500,45 T 600,20"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Highlights */}
            <circle cx="400" cy="35" r="4.5" fill="#f43f5e" />
            <circle cx="600" cy="20" r="4.5" fill="#8b5cf6" />
          </svg>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-2">
            <span>Day 1</span>
            <span>Day 7</span>
            <span>Day 14</span>
            <span>Day 21</span>
            <span>Today (Peak 84.2K)</span>
          </div>
        </div>
      </div>

      {/* Video Management Table */}
      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-brand-500" />
              <span>Channel Content & Published Vlogs</span>
            </h2>
            <p className="text-xs text-gray-500">
              Manage your videos, view metrics, or remove uploads
            </p>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            {displayVlogs.length} Videos
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-dark-surface text-xs uppercase text-gray-500 font-semibold border-b border-gray-100 dark:border-dark-border">
              <tr>
                <th className="py-3.5 px-4">Vlog Details</th>
                <th className="py-3.5 px-4">Visibility</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Likes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {displayVlogs.map((vlog) => (
                <tr key={vlog.id} className="hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vlog.thumbnail}
                        alt={vlog.title}
                        className="w-20 aspect-video rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <Link
                          to={`/watch/${vlog.id}`}
                          className="font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-brand-500 text-xs sm:text-sm"
                        >
                          {vlog.title}
                        </Link>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {vlog.category} • {vlog.duration}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Public
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-500">
                    {vlog.uploadedAt}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {vlog.formattedViews}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                    {vlog.likes.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/watch/${vlog.id}`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-brand-500 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                        title="Watch on platform"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(vlog.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete vlog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
