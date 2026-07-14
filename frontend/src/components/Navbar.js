import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';


const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container-low transition-colors duration-200 focus:outline-none"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-germany-red text-white flex items-center justify-center font-bold text-lg shadow-sm border border-surface-variant">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </button>

      <div className={`absolute right-0 mt-3 p-2 min-w-[200px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-surface border border-surface-variant focus:outline-none transition-all duration-300 z-50 ${isOpen ? 'opacity-100 transform translate-y-0 pointer-events-auto' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
        <div className="px-3 py-2 border-b border-surface-variant mb-2">
          <p className="text-sm font-bold text-on-surface">{user.name}</p>
          <p className="text-xs text-secondary truncate">{user.email}</p>
          <p className="text-[10px] font-bold text-germany-gold uppercase tracking-wider mt-1">{user.role}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Link to="/profil" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined text-[20px]">person</span>
            Mein Profil
          </Link>
          <button onClick={() => { setIsOpen(false); logout(); }} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-germany-red hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left w-full">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Abmelden
          </button>
        </div>
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button id="theme-toggle" onClick={toggleTheme} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full focus:outline-none group hover:bg-surface-container-low transition-colors duration-200 md:shadow-sm bg-surface" aria-label="Toggle Dark Mode">
      <div className="relative inline-flex items-center w-[3.25rem] h-7 rounded-full bg-surface-container-highest dark:bg-inverse-surface transition-colors duration-300 shadow-inner border border-surface-variant dark:border-secondary">
        <div className={`absolute left-1 top-1 w-5 h-5 bg-white dark:bg-surface-variant rounded-full shadow-sm transition-transform duration-300 transform z-0 ring-1 ring-surface-variant dark:ring-secondary ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>

        <div className="w-full flex justify-between px-1.5 z-10 relative pointer-events-none">
          <svg className={`w-4 h-4 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'text-germany-gold opacity-100'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          <svg className={`w-4 h-4 transition-opacity duration-300 ${isDarkMode ? 'text-germany-gold opacity-100' : 'opacity-0'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        </div>
      </div>
    </button>
  );
};

export default function Navbar({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const { user, openAuthModal } = useAuth();

  const navItems = [
    { path: '/', icon: 'home', label: 'Lernen', match: '/' },
    { path: '/kurse', icon: 'menu_book', label: 'Kurse', match: '/kurse' },
    { path: '/karriere', icon: 'work', label: 'Karriere', match: '/karriere' },
    { path: '/stammtisch', icon: 'groups', label: 'Stammtisch', match: '/stammtisch' },
    { path: '/profil', icon: 'person', label: 'Profil', match: '/profil' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      
      {/* Top AppBar */}
      <header className="bg-surface shadow-sm border-b border-surface-variant sticky top-0 z-40 w-full h-14 md:h-[72px] flex justify-between items-center px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 md:gap-4">
          <img alt="Live-Sprachzentrum Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain rounded-full bg-white shadow-sm border border-surface-variant/50" src="/logo.png"/>
          <h1 className="font-title-md md:font-headline-md text-title-md md:text-headline-md font-bold truncate"><span className="text-germany-black dark:text-white">Live</span>-<span className="text-germany-red">Sprach</span><span className="text-germany-gold">zentrum</span></h1>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <button className="flex items-center justify-center p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full relative flex-shrink-0 md:bg-surface-container-lowest md:shadow-sm">
            <span className="material-symbols-outlined leading-none">notifications</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
          </button>
          
          {user ? (
            <UserMenu />
          ) : (
            <button 
              onClick={openAuthModal}
              className="bg-germany-red hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              Anmelden
            </button>
          )}
        </div>
      </header>

      {/* Floating Nav (Mobile & Desktop) */}
      <nav className="fixed z-50 bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-surface-variant rounded-[1.5rem] transition-all duration-300
        bottom-1 left-1/2 -translate-x-1/2 w-[98%] max-w-[400px] px-2 py-1 flex flex-row justify-between items-center
        md:top-1/2 md:-translate-y-1/2 md:left-4 md:bottom-auto md:translate-x-0 md:w-auto md:h-auto md:flex-col md:px-2 md:py-4 md:gap-2">
        {navItems.map(item => {
          const isActive = path === item.match;
          return (
            <Link key={item.path} to={item.path} className={`flex-1 w-full flex flex-col items-center justify-center py-1 md:py-2 rounded-xl transition-all duration-300 ${isActive ? 'text-red-600 dark:text-red-400' : 'text-secondary hover:bg-surface-variant/30 hover:text-on-surface'}`}>
              <span className={`material-symbols-outlined text-[20px] md:text-[24px] ${isActive ? 'icon-filled' : ''}`}>{item.icon}</span>
              <span className={`font-label-sm text-[10px] leading-tight md:text-xs mt-0.5 md:mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full pb-16 md:pb-8 pt-4 md:pt-8 md:pl-24 lg:pl-32">
        {children}
      </main>

    </div>
  );
}
