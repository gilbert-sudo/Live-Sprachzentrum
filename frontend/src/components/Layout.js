import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
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
      {/* TopAppBar Desktop/Mobile */}
      <header className="bg-surface border-b border-surface-variant shadow-sm docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-7xl mx-auto">
          {/* Leading: Avatar / Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img alt="Live-Sprachzentrum Logo" className="h-10 w-10 object-contain rounded-full bg-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajzHZvIVHyGtzpaTOMfCYoh2qcqvZc2mxKP4qdffIhO6axfheodHm4nRwZT3bnQ3CP_iQdTyzj_brGF9rgKXKdkGNfFKtlFQ7vnwRycAwr2AcYQ68Z-2dY7t8s6N0_M3Fg-rIP4HnDaH-rfbqFLfC6Ok4Ts_63iwGCtOeQSpWRKitw4XzXCbth14E7fwEgCyLeBhC-4wCYYL8n3Zx1OOTFSArzAjjJSAW4UqV2QRUTZJqHpagPoouhP5QnKjUgDQtj4GPUnT_x1vN"/>
              <h1 className="font-headline-md text-headline-md font-bold text-primary hidden md:block">Live-Sprachzentrum</h1>
            </Link>
          </div>
          {/* Desktop Nav (Hidden on Mobile) */}
          <nav className="hidden md:flex gap-4 lg:gap-8">
            {navItems.map(item => {
              const isActive = path === item.match;
              return (
                <Link key={item.path} to={item.path} className={`${isActive ? 'text-primary bg-surface-container-low' : 'text-secondary'} font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2`}>
                  <span className={`material-symbols-outlined ${isActive ? 'icon-filled' : ''}`}>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {/* Trailing: Notifications */}
          <div className="flex items-center">
            <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pb-28 md:pb-8">
        {children}
      </main>

      {/* Floating Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-[400px] bg-surface/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-surface-variant rounded-[2rem] z-50 px-3 py-2 flex justify-between items-center transition-all duration-300">
        {navItems.map(item => {
          const isActive = path === item.match;
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary-container text-on-primary-container scale-105' : 'text-secondary hover:bg-surface-variant/50 hover:text-on-surface'}`}>
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'icon-filled' : ''}`}>{item.icon}</span>
              <span className="font-label-sm text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
