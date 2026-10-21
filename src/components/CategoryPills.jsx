import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function CategoryPills() {
  const { categories, selectedCategory, setSelectedCategory } = useVlogs();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="relative flex items-center py-3 bg-white/70 dark:bg-dark-bg/70 backdrop-blur-sm sticky top-16 z-30 border-b border-gray-100 dark:border-dark-border/40">
      {/* Left Scroll Button */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 z-10 p-1.5 rounded-full bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200 shadow-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Pill Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-1"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                  : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-hover border border-transparent dark:border-dark-border/60'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      {showRightArrow && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 z-10 p-1.5 rounded-full bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200 shadow-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
