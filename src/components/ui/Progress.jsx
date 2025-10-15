// src/components/ui/progress.jsx
import React from 'react';

export function Progress({ value, className = '' }) {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full w-full flex-1 bg-[#00D084] transition-all duration-500 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}