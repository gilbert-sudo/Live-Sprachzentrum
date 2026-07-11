import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
          <img alt="Live-Sprachzentrum Logo" className="h-9 w-9 object-contain rounded-full bg-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajzHZvIVHyGtzpaTOMfCYoh2qcqvZc2mxKP4qdffIhO6axfheodHm4nRwZT3bnQ3CP_iQdTyzj_brGF9rgKXKdkGNfFKtlFQ7vnwRycAwr2AcYQ68Z-2dY7t8s6N0_M3Fg-rIP4HnDaH-rfbqFLfC6Ok4Ts_63iwGCtOeQSpWRKitw4XzXCbth14E7fwEgCyLeBhC-4wCYYL8n3Zx1OOTFSArzAjjJSAW4UqV2QRUTZJqHpagPoouhP5QnKjUgDQtj4GPUnT_x1vN"/>
          <h1 className="font-title-md text-title-md font-bold text-primary truncate">Live-Sprachzentrum</h1>
        </Link>
        <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full relative flex-shrink-0">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
        </button>
      </header>

      {/* Floating Logo (Desktop Top-Left) */}
      <Link to="/" className="hidden md:flex fixed top-6 left-6 items-center gap-4 z-50">
        <img alt="Live-Sprachzentrum Logo" className="h-10 w-10 object-contain rounded-full bg-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajzHZvIVHyGtzpaTOMfCYoh2qcqvZc2mxKP4qdffIhO6axfheodHm4nRwZT3bnQ3CP_iQdTyzj_brGF9rgKXKdkGNfFKtlFQ7vnwRycAwr2AcYQ68Z-2dY7t8s6N0_M3Fg-rIP4HnDaH-rfbqFLfC6Ok4Ts_63iwGCtOeQSpWRKitw4XzXCbth14E7fwEgCyLeBhC-4wCYYL8n3Zx1OOTFSArzAjjJSAW4UqV2QRUTZJqHpagPoouhP5QnKjUgDQtj4GPUnT_x1vN"/>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">Live-Sprachzentrum</h1>
      </Link>

      {/* Floating Notifications (Desktop Top-Right) */}
      <button className="hidden md:flex fixed top-6 right-8 p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full bg-surface shadow-sm z-50">
        <span className="material-symbols-outlined">notifications</span>
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
      </button>

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
