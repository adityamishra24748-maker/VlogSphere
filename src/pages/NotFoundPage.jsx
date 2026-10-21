import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-inner">
        <Film className="w-10 h-10" />
      </div>

      <span className="text-xs font-mono font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full mb-3">
        404 Error
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
        Scene Not Found
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The vlog, creator, or page you were looking for doesn't exist or may have been unlisted.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-md shadow-brand-500/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/explore"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Trending</span>
        </Link>
      </div>
    </div>
  );
}
