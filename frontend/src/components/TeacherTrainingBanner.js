import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TeacherTrainingBanner({ className = "mb-6" }) {
  const { user } = useSelector((state) => state.auth);
  const [trainingCount, setTrainingCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`lsz_teacher_training_${user?._id || 'guest'}_completed`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setTrainingCount(parsed.length);
      }
    } catch (e) {}
  }, [user]);

  const trainingPercent = Math.round((trainingCount / 11) * 100);

  return (
    <section className={`relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0c0d12] via-[#14161f] to-[#0c0d12] text-white p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/[0.08] group transition-all duration-500 hover:border-white/[0.15] ${className}`}>
      {/* Ambient Atmosphere Lights */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-br from-germany-red/20 to-transparent rounded-full filter blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-germany-gold/15 to-transparent rounded-full filter blur-[90px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
      
      {/* Subtle Top Accent Wire */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left Column: Editorial & Philosophy */}
        <div className="flex-1 max-w-2xl space-y-4">
          
          {/* Meta Header Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-germany-gold animate-pulse"></span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold">
                Dozentenakademie · Hueber Edition
              </span>
            </div>
            <span className="text-[11px] text-white/40 font-mono">Stand: Oktober 2026</span>
          </div>

          {/* Main Heading */}
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Lehrerhandbuch: <span className="bg-gradient-to-r from-white via-white/90 to-germany-gold bg-clip-text text-transparent">Deutsch unterrichten auf Deutsch</span>
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-2 font-medium leading-relaxed max-w-xl">
              Die verbindliche Methodik des Live-Sprachzentrums von Direktorin Frau Loïsa. 
              Einsprachige Vermittlung, didaktischer Baukasten ohne Übersetzung, Satzmelodien und Vorbereitungs-Checkliste.
            </p>
          </div>

          {/* Minimalist Feature Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              { label: 'Schritte plus Neu (A1–B1)', icon: 'auto_stories' },
              { label: 'Sicher! aktuell (B2)', icon: 'school' },
              { label: 'Plan B ohne Strom', icon: 'bolt' },
              { label: '11 Interaktive Module', icon: 'fact_check' }
            ].map((chip, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/70 font-medium hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-germany-gold">{chip.icon}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Interactive Monograph Card */}
        <div className="shrink-0 w-full lg:w-80">
          <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between gap-4 shadow-inner">
            
            {/* Progress Header */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/50 uppercase tracking-widest text-[10px] font-bold">Fortschritt</span>
                <span className="font-mono text-xs font-bold text-germany-gold">
                  {trainingPercent}%
                </span>
              </div>
              {/* Micro Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-germany-red via-germany-gold to-amber-300 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(5, trainingPercent)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-white/50 mt-1.5 font-medium">
                {trainingCount === 0 ? 'Noch nicht begonnen' : `${trainingCount} von 11 Lektionen absolviert`}
              </p>
            </div>

            {/* Quick chapter preview */}
            <div className="space-y-1.5 py-1 border-y border-white/[0.06] text-xs">
              <div className="flex items-center justify-between text-white/70 py-1">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-white/40">01</span>
                  <span>Einsprachige Philosophie</span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-white/40">arrow_forward_ios</span>
              </div>
              <div className="flex items-center justify-between text-white/70 py-1">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-white/40">05</span>
                  <span>Grammatik & Farben</span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-white/40">arrow_forward_ios</span>
              </div>
              <div className="flex items-center justify-between text-white/70 py-1">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-white/40">09</span>
                  <span>Musterstunde & Checkliste</span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-white/40">arrow_forward_ios</span>
              </div>
            </div>

            {/* Clean CTA Button */}
            <Link
              to="/lehrer-training"
              className="w-full py-3.5 px-5 rounded-xl bg-white text-germany-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-germany-gold transition-all duration-300 shadow-md active:scale-95 group/btn"
            >
              <span>{trainingCount > 0 ? 'Lektion fortsetzen' : 'Handbuch aufschlagen'}</span>
              <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}

