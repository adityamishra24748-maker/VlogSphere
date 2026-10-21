import React, { useState, useEffect } from 'react';
import CategoryPills from '../components/CategoryPills';
import FeaturedBanner from '../components/FeaturedBanner';
import VideoGrid from '../components/VideoGrid';
import { VideoGridSkeleton } from '../components/LoadingSkeleton';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial content hydration simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Horizontal Category Pill Bar */}
      <CategoryPills />

      {/* Featured Creator Spotlight Banner */}
      <FeaturedBanner />

      {/* Video Content Feed */}
      {isLoading ? (
        <div className="py-4">
          <div className="h-6 w-48 bg-gray-200 dark:bg-dark-card rounded-md mb-6 animate-pulse" />
          <VideoGridSkeleton count={8} />
        </div>
      ) : (
        <VideoGrid />
      )}
    </div>
  );
}
