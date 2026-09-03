import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Stammtisch() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-102px)] md:h-[calc(100vh-64px)] w-full max-w-[1120px] mx-auto flex flex-col items-center justify-center relative -mt-4 md:-mt-8 rounded-none md:rounded-t-2xl md:rounded-b-none overflow-hidden bg-surface-container-lowest border-x border-t border-surface-variant shadow-sm z-0">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[80px] animate-pulse -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-germany-red/10 rounded-full blur-[100px] animate-pulse -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-germany-gold/15 rounded-full blur-[100px] animate-pulse -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" style={{ animationDelay: '1s' }}></div>

      {/* Main Content Card (Glassmorphism) */}
      <div className="relative z-10 flex flex-col items-center p-8 md:p-12 text-center max-w-lg mx-4 rounded-[2rem] bg-surface-container-lowest/60 dark:bg-surface-container-highest/30 backdrop-blur-3xl border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        
        {/* Animated Icon Container */}
        <div className="relative mb-8 group cursor-default">
          <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl group-hover:bg-primary/40 transition-all duration-700"></div>
          <div className="relative w-28 h-28 bg-gradient-to-br from-primary to-primary-fixed rounded-[2rem] flex items-center justify-center shadow-xl transform rotate-3 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <span className="material-symbols-outlined text-white text-[56px] font-light">construction</span>
          </div>
          
          {/* Floating mini icons */}
          <div className="absolute -top-4 -right-4 bg-surface-container-lowest p-2 rounded-full shadow-lg border border-surface-variant animate-bounce delay-100">
            <span className="material-symbols-outlined text-germany-gold text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
          </div>
          <div className="absolute -bottom-2 -left-4 bg-surface-container-lowest p-2 rounded-full shadow-lg border border-surface-variant animate-bounce delay-300">
            <span className="material-symbols-outlined text-germany-red text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
          </div>
        </div>

        {/* Typography */}
        <h2 className="text-3xl md:text-4xl font-black text-on-surface mb-4 tracking-tight">
          Stammtisch im <span className="bg-gradient-to-r from-primary to-germany-red bg-clip-text text-transparent">Umbau</span>
        </h2>
        
        <p className="text-base md:text-lg text-secondary mb-8 leading-relaxed max-w-sm mx-auto">
          Wir arbeiten an einem völlig neuen Erlebnis für dich, <strong className="text-on-surface font-semibold">{user?.name?.split(' ')[0] || 'lieber Schüler'}</strong>. Bald kannst du dich hier noch besser mit deinen Mitschülern austauschen!
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-[280px] mx-auto mb-10 space-y-2">
          <div className="flex justify-between text-xs font-bold text-secondary uppercase tracking-wider">
            <span>Fortschritt</span>
            <span className="text-primary">In Kürze</span>
          </div>
          <div className="h-2.5 w-full bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full relative overflow-hidden w-[85%]">
               <div className="absolute inset-0 bg-white/30 w-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/campus')}
          className="px-8 py-3.5 bg-on-surface text-surface-container-lowest font-bold rounded-full hover:bg-primary hover:text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg flex items-center gap-2 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Zurück zum Campus
        </button>
      </div>
    </div>
  );
}
