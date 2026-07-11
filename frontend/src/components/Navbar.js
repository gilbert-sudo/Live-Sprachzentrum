import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState('DE');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={langMenuRef}>
      <button id="lang-menu-button" type="button" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 text-secondary hover:text-on-surface hover:bg-surface-container-low bg-surface md:shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
        <span className="block font-bold sm:font-medium">{currentLang}</span>
      </button>

      <div id="lang-dropdown" className={`absolute right-0 mt-3 p-2 min-w-max rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-surface/95 backdrop-blur-md border border-surface-variant focus:outline-none transition-all duration-300 z-50 ${isLangMenuOpen ? 'opacity-100 transform translate-y-0 pointer-events-auto' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-1.5" role="menu" aria-orientation="horizontal" aria-labelledby="lang-menu-button">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentLang('FR'); setIsLangMenuOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-on-surface hover:bg-surface-container-low transition-all hover:-translate-y-1 ${currentLang === 'FR' ? 'bg-surface-container-high' : ''}`} role="menuitem">
            <img src="https://flagcdn.com/w40/fr.png" alt="Français" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${currentLang === 'FR' ? 'ring-germany-red' : 'ring-transparent hover:ring-germany-red'}`} />
            <span>FR</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentLang('EN'); setIsLangMenuOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-on-surface hover:bg-surface-container-low transition-all hover:-translate-y-1 ${currentLang === 'EN' ? 'bg-surface-container-high' : ''}`} role="menuitem">
            <img src="https://flagcdn.com/w40/gb.png" alt="English" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${currentLang === 'EN' ? 'ring-germany-gold' : 'ring-transparent hover:ring-germany-gold'}`} />
            <span>EN</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentLang('DE'); setIsLangMenuOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-on-surface hover:bg-surface-container-low transition-all hover:-translate-y-1 ${currentLang === 'DE' ? 'bg-surface-container-high' : ''}`} role="menuitem">
            <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${currentLang === 'DE' ? 'ring-germany-gold' : 'ring-transparent hover:ring-germany-gold'}`} />
            <span>DE</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

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

  const navItems = [
    { path: '/', icon: 'home', label: 'Lernen', match: '/' },
    { path: '/kurse', icon: 'menu_book', label: 'Kurse', match: '/kurse' },
    { path: '/karriere', icon: 'work', label: 'Karriere', match: '/karriere' },
    { path: '/stammtisch', icon: 'groups', label: 'Stammtisch', match: '/stammtisch' },
    { path: '/profil', icon: 'person', label: 'Profil', match: '/profil' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      
      {/* Mobile Top AppBar */}
      <header className="md:hidden bg-surface/95 backdrop-blur-md shadow-sm border-b border-surface-variant sticky top-0 z-40 w-full h-16 flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-3">
          <img alt="Live-Sprachzentrum Logo" className="h-9 w-9 object-contain rounded-full bg-white shadow-sm" src="/logo.png"/>
          <h1 className="font-title-md text-title-md font-bold text-primary truncate">Live-Sprachzentrum</h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full relative flex-shrink-0">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
          </button>
        </div>
      </header>

      {/* Floating Logo (Desktop Top-Left) */}
      <Link to="/" className="hidden md:flex fixed top-6 left-6 items-center gap-4 z-50">
        <img alt="Live-Sprachzentrum Logo" className="h-10 w-10 object-contain rounded-full bg-white shadow-sm" src="/logo.png"/>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">Live-Sprachzentrum</h1>
      </Link>

      {/* Floating Actions (Desktop Top-Right) */}
      <div className="hidden md:flex fixed top-6 right-8 items-center gap-4 z-50">
        <ThemeToggle />
        <LanguageSelector />
        <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full bg-surface shadow-sm relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
        </button>
      </div>

      {/* Floating Nav (Mobile & Desktop) */}
      <nav className="fixed z-50 bg-surface/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-surface-variant rounded-[2rem] transition-all duration-300
        bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] px-3 py-2 flex flex-row justify-between items-center
        md:top-1/2 md:-translate-y-1/2 md:left-6 md:bottom-auto md:translate-x-0 md:w-auto md:h-auto md:flex-col md:px-2 md:py-6 md:gap-4">
        {navItems.map(item => {
          const isActive = path === item.match;
          return (
            <Link key={item.path} to={item.path} className={`flex-1 w-full flex flex-col items-center justify-center py-2 md:py-3 rounded-2xl transition-all duration-300 ${isActive ? 'text-primary' : 'text-secondary hover:bg-surface-variant/30 hover:text-on-surface'}`}>
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'icon-filled' : ''}`}>{item.icon}</span>
              <span className={`font-label-sm text-[10px] md:text-xs mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              {/* Subtle active dot indicator */}
              <div className={`w-1 h-1 rounded-full mt-1 transition-all duration-300 ${isActive ? 'bg-primary' : 'bg-transparent'}`}></div>
            </Link>
          )
        })}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full pb-28 md:pb-8 pt-4 md:pt-24 md:pl-32 lg:pl-40">
        {children}
      </main>

    </div>
  );
}
