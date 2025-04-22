import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on user preference or system setting
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-1 rounded-md h-8 w-14 bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 text-yellow-500 absolute left-1.5 transition-opacity duration-300 ${
          darkMode ? 'opacity-0' : 'opacity-100'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 text-blue-300 absolute right-1.5 transition-opacity duration-300 ${
          darkMode ? 'opacity-100' : 'opacity-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      
      {/* Toggle circle */}
      <span
        className={`absolute h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
          darkMode ? 'translate-x-2.5' : '-translate-x-2.5'
        }`}
      ></span>
    </button>
  );
};

export default ThemeToggle;