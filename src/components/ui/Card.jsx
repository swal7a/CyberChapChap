import React from 'react';

export function Card({ children, className }) {
  const baseClasses = "p-8 rounded-lg shadow-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20";
  const combinedClasses = `${baseClasses} ${className || ''}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}