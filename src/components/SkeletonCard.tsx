import React from "react";

interface SkeletonCardProps {
  variant?: "horizontal" | "vertical";
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = "vertical",
}) => {
  // Base classes for the card container - removed animate-pulse to avoid conflict with shimmer
  // Added relative and overflow-hidden to contain the absolute positioned shimmer
   
  // Shimmer overlay element
  const ShimmerOverlay = () => (
    <div className="absolute inset-0 animate-shimmer z-10 pointer-events-none" />
  );

  if (variant === "horizontal") {
    // Recommended.tsx style
    return (
      <div className={`p-3 flex items-center space-x-3`}>
        <ShimmerOverlay />
        {/* Image Placeholder */}
        <div className="rounded-full bg-gray-200 dark:bg-gray-600 h-[100px] w-[100px] shrink-0" />

        {/* Content Placeholder */}
        <div className="flex-1 space-y-3 py-1">
          {/* Title */}
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
          {/* Rating */}
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
          {/* Price */}
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4" />
        </div>

        {/* Add Button Placeholder (optional, positioned absolute in original) */}
        {/* We can just let the flex layout handle empty space or add a small box */}
      </div>
    );
  }

  // Full-menu.tsx style (vertical)
  return (
    <div
      className={`py-3 px-4 flex flex-col items-center gap-2.5 h-full`}
    >
      <ShimmerOverlay />
      {/* Image Placeholder */}
      <div className="rounded-full bg-gray-200 dark:bg-gray-600 h-[100px] w-[100px]" />

      {/* Content Placeholder */}
      <div className="w-full flex flex-col items-center space-y-2">
        {/* Title */}
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
        
        {/* Rating or extra info */}
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />

        {/* Price */}
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
