import React, { useState, useEffect, useRef } from 'react';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('DE'); // 'FR' or 'DE'
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (lang, e) => {
    e.preventDefault();
    setSelectedLang(lang);
    setIsOpen(false);
    // Future: Dispatch action to change language globally
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        <span className="block font-bold sm:font-medium">{selectedLang}</span>
      </button>

      {/* Dropdown */}
      <div className={`absolute right-0 mt-3 p-2 min-w-max rounded-full backdrop-blur-md shadow-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-white/10 focus:outline-none transition-all duration-300 z-50 ${isOpen ? 'opacity-100 transform translate-y-0 pointer-events-auto' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-1.5" role="menu">
          <a 
            href="#" 
            onClick={(e) => selectLanguage('FR', e)} 
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all hover:-translate-y-1 ${selectedLang === 'FR' ? 'relative before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-slate-200 dark:before:ring-slate-700 bg-white/50 dark:bg-slate-800/50' : ''}`} 
            role="menuitem"
          >
            <img src="https://flagcdn.com/w40/fr.png" alt="Français" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${selectedLang === 'FR' ? 'ring-germany-red' : 'ring-transparent hover:ring-germany-red'}`} />
            <span>FR</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => selectLanguage('DE', e)} 
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all hover:-translate-y-1 ${selectedLang === 'DE' ? 'relative before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-slate-200 dark:before:ring-slate-700 bg-white/50 dark:bg-slate-800/50' : ''}`} 
            role="menuitem"
          >
            <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${selectedLang === 'DE' ? 'ring-germany-gold' : 'ring-transparent hover:ring-germany-gold'}`} />
            <span>DE</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
