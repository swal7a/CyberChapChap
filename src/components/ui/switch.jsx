import React from 'react';

const Switch = ({ checked, onCheckedChange, ...props }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
        ${checked ? 'bg-[#004AAD]' : 'bg-gray-200'}
        focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:ring-offset-2
      `}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`
          inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
};

export { Switch };