import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button id="theme-toggle" onClick={toggleTheme} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full focus:outline-none group hover:bg-surface-container-low transition-colors duration-200 md:shadow-sm bg-surface" aria-label="Toggle Dark Mode">
      <div className="relative inline-flex items-center w-[3.25rem] h-7 rounded-full bg-surface-container-highest dark:bg-inverse-surface transition-colors duration-300 shadow-inner border border-surface-variant dark:border-secondary">
        <div className={`absolute left-1 top-1 w-5 h-5 bg-surface-container-lowest dark:bg-surface-variant rounded-full shadow-sm transition-transform duration-300 transform z-0 ring-1 ring-surface-variant dark:ring-secondary ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>

        <div className="w-full flex justify-between px-1.5 z-10 relative pointer-events-none">
          <svg className={`w-4 h-4 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'text-germany-gold opacity-100'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          <svg className={`w-4 h-4 transition-opacity duration-300 ${isDarkMode ? 'text-germany-gold opacity-100' : 'opacity-0'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
