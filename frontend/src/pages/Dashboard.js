import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
        
        {/* Welcome Header */}
        <section className="mb-2 md:mb-4">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Hallo, Ranaivo!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Bereit für deine nächste Lektion?</p>
        </section>

        {/* Upcoming Events (New Feature) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Demnächst</h3>
          </div>
          {/* Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 md:pb-0 md:grid md:grid-cols-2 snap-x snap-mandatory -mx-margin-mobile px-margin-mobile scroll-pl-margin-mobile md:mx-0 md:px-0 md:scroll-pl-0">
            {/* Stammtisch Event */}
            <div className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start bg-germany-red text-white rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between interactive-card">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">groups</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-white/80 uppercase tracking-wider">Morgen, 18:00 Uhr</p>
                  <h4 className="font-title-md text-title-md">Online Stammtisch</h4>
                </div>
              </div>
              <button className="relative z-10 w-full bg-white text-germany-red font-label-md text-label-md py-2 rounded-lg hover:bg-white/90 transition-colors">
                Teilnehmen
              </button>
            </div>
            {/* Next Live Class */}
            <div className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between interactive-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-tertiary-container/20 text-tertiary-container rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Freitag, 14:00 Uhr</p>
                  <h4 className="font-title-md text-title-md text-on-surface">Live-Unterricht B1</h4>
                </div>
              </div>
              <button className="w-full bg-surface text-primary font-label-md text-label-md py-2 rounded-lg border border-surface-variant hover:bg-surface-container-low transition-colors">
                Zum Kursraum
              </button>
            </div>
          </div>
        </section>

        {/* Main Course Card & Weekly Goal */}
        <section className="bg-surface-container-lowest rounded-xl p-5 md:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 hover:-translate-y-0.5 transition-transform duration-200">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded-full">Aktueller Kurs</span>
              <span className="md:hidden font-label-md text-label-md text-on-surface font-bold">B1 Standard</span>
            </div>
            
            <div className="flex gap-4 items-center">
              {/* Circular Progress Indicator */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                  <path className="text-germany-red" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="65, 100" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
                <span className="absolute font-label-md text-label-md text-on-surface">65%</span>
              </div>
              
              <div>
                <h3 className="hidden md:block font-title-lg text-title-lg text-on-surface mb-1">B1 Standard</h3>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-0.5">Nächste Lektion</p>
                <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface font-medium leading-tight">Passiv mit Modalverben</p>
              </div>
            </div>
            
            {/* New Feature: Weekly Goal */}
            <div className="mt-5 pt-5 border-t border-surface-variant">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-sm text-label-sm text-secondary">Wochenziel: 3/5 Lektionen</span>
                <span className="material-symbols-outlined text-success-green text-[18px]">verified</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-success-green h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
          
          <Link to="/uebung" className="w-full md:w-auto shrink-0 bg-germany-red text-on-primary font-label-md text-label-md py-3 px-6 rounded-full shadow-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
            Lektion fortsetzen
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </section>

        {/* Action Center & Stats (Horizontal Scroll on Mobile) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Aktivitäten & Tools</h3>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 md:pb-0 md:grid md:grid-cols-4 snap-x snap-mandatory -mx-margin-mobile px-margin-mobile scroll-pl-margin-mobile md:mx-0 md:px-0 md:scroll-pl-0">
            
            {/* Streak Stat */}
            <div className="min-w-[140px] md:min-w-0 snap-start bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/20 text-tertiary-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined icon-filled">local_fire_department</span>
              </div>
              <div>
                <p className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">12</p>
                <p className="font-label-sm text-label-sm text-secondary line-clamp-1">Tage Lernserie</p>
              </div>
            </div>

            {/* Vocab Stat */}
            <div className="min-w-[140px] md:min-w-0 snap-start bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
              <div className="w-10 h-10 rounded-full bg-success-green/10 text-success-green flex items-center justify-center mb-3">
                <span className="material-symbols-outlined">spellcheck</span>
              </div>
              <div>
                <p className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">450</p>
                <p className="font-label-sm text-label-sm text-secondary line-clamp-1">Wörter gelernt</p>
              </div>
            </div>

            {/* Career Shortcut */}
            <Link to="/karriere" className="min-w-[240px] md:min-w-0 md:col-span-2 snap-start bg-gradient-to-r from-germany-black via-germany-black to-surface-container-highest rounded-xl p-[1px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-transform duration-200 flex flex-col">
              <div className="bg-surface-container-lowest rounded-xl p-4 md:p-5 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 flex flex-col pointer-events-none">
                  <div className="flex-1 bg-germany-black"></div>
                  <div className="flex-1 bg-germany-red"></div>
                  <div className="flex-1 bg-germany-gold"></div>
                </div>
                <div className="flex items-center gap-3 relative z-10 mb-2">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-surface-container flex items-center justify-center border border-surface-variant">
                    <div className="w-5 h-3 flex flex-col rounded-sm overflow-hidden">
                      <div className="flex-1 bg-germany-black"></div>
                      <div className="flex-1 bg-germany-red"></div>
                      <div className="flex-1 bg-germany-gold"></div>
                    </div>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface">Objectif Ausbildung</h4>
                </div>
                <div className="flex items-end justify-between relative z-10 mt-2">
                  <p className="font-body-sm text-sm text-on-surface-variant max-w-[160px]">Dein Weg zur Karriere in Deutschland</p>
                  <button className="text-germany-red p-1 rounded-full bg-surface hover:bg-surface-container-low border border-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* TELC Simulator */}
            <Link to="/simulator" className="min-w-[240px] md:min-w-0 md:col-span-2 md:col-start-3 snap-start bg-surface-container-lowest rounded-xl p-4 md:p-5 h-full flex flex-col justify-between relative overflow-hidden border border-surface-variant hover:-translate-y-0.5 transition-transform duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 relative z-10 mb-2">
                <div className="w-10 h-10 shrink-0 rounded-full bg-germany-red/10 text-germany-red flex items-center justify-center">
                  <span className="material-symbols-outlined">quiz</span>
                </div>
                <h4 className="font-title-md text-title-md text-on-surface">Prüfungssimulator</h4>
              </div>
              <div className="flex items-end justify-between relative z-10 mt-2">
                <p className="font-body-sm text-sm text-on-surface-variant max-w-[160px]">Bereite dich auf die TELC Prüfung vor</p>
                <button className="text-germany-red p-1 rounded-full bg-surface hover:bg-surface-container-low border border-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </Link>

          </div>
        </section>

      </main>

    </>
  );
}
