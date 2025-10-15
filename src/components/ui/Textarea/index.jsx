import React from 'react';

export function Textarea({ className, ...props }) {
  const baseClasses = "w-full p-2 rounded-md min-h-[120px] bg-white bg-opacity-10 border border-gray-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:border-transparent transition-colors";
  const combinedClasses = `${baseClasses} ${className || ''}`;

  return (
    <textarea
      className={combinedClasses}
      {...props}
    />
  );
}