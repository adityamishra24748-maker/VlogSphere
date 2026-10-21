import React from 'react';

export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="aspect-video w-full rounded-2xl bg-gray-200 dark:bg-dark-card" />
      
      {/* Details skeleton */}
      <div className="flex gap-3 px-1">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-card flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-dark-card rounded-md w-5/6" />
          <div className="h-3 bg-gray-200 dark:bg-dark-card rounded-md w-1/2" />
          <div className="h-3 bg-gray-200 dark:bg-dark-card rounded-md w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function VideoGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function WatchPlayerSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-video w-full rounded-2xl bg-gray-200 dark:bg-dark-card" />
      <div className="h-6 bg-gray-200 dark:bg-dark-card rounded-md w-3/4" />
      <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-dark-card" />
          <div className="space-y-1.5">
            <div className="h-4 w-28 bg-gray-200 dark:bg-dark-card rounded" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-dark-card rounded" />
          </div>
        </div>
        <div className="h-9 w-24 bg-gray-200 dark:bg-dark-card rounded-full" />
      </div>
      <div className="h-24 bg-gray-100 dark:bg-dark-card rounded-2xl" />
    </div>
  );
}
