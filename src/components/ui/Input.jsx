import React from 'react';

const Input = ({ className, type, ...props }) => {
    return (
        <input
            type={type}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
            {...props}
        />
    );
};

export { Input };