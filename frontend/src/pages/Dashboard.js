import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
        {/* Welcome Header */}
        <section className="mb-4">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Hallo, Ranaivo!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Bereit für deine nächste Lektion?</p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Course Card */}
          <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded-full mb-3">Aktueller Kurs</span>
                  <h3 className="font-title-lg text-title-lg text-on-surface">B1 Standard</h3>
                </div>
                {/* Circular Progress Indicator */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    <path className="text-germany-red" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="65, 100" strokeLinecap="round" strokeWidth="4"></path>
                  </svg>
                  <span className="absolute font-label-md text-label-md text-on-surface">65%</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1">Nächste Lektion</p>
                <p className="font-body-lg text-body-lg text-on-surface">Passiv mit Modalverben</p>
              </div>
            </div>
            <Link to="/uebung" className="w-full md:w-auto bg-germany-red text-on-primary font-label-md text-label-md py-3 px-6 rounded-full shadow-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
              Lektion fortsetzen
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Quick Stats Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined icon-filled">local_fire_department</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-on-surface">12 <span className="font-body-md text-body-md text-on-surface-variant font-normal">Tage</span></p>
                <p className="font-label-sm text-label-sm text-secondary">Lernserie</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
              <div className="w-12 h-12 rounded-full bg-success-green/10 text-success-green flex items-center justify-center">
                <span className="material-symbols-outlined">spellcheck</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-on-surface">450 <span className="font-body-md text-body-md text-on-surface-variant font-normal">Wörter</span></p>
                <p className="font-label-sm text-label-sm text-secondary">Gelerntes Vokabular</p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Shortcut (Objectif Ausbildung) */}
        <Link to="/karriere" className="mt-2 bg-gradient-to-r from-germany-black via-germany-black to-surface-container-highest rounded-xl p-[1px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-transform duration-200 block">
          <div className="bg-surface-container-lowest rounded-xl p-6 h-full flex items-center justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex flex-col">
              <div className="flex-1 bg-germany-black"></div>
              <div className="flex-1 bg-germany-red"></div>
              <div className="flex-1 bg-germany-gold"></div>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-surface-variant">
                <div className="w-6 h-4 flex flex-col rounded-sm overflow-hidden">
                  <div className="flex-1 bg-germany-black"></div>
                  <div className="flex-1 bg-germany-red"></div>
                  <div className="flex-1 bg-germany-gold"></div>
                </div>
              </div>
              <div>
                <h4 className="font-title-lg text-title-lg text-on-surface">Objectif Ausbildung</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Dein Weg zur Karriere in Deutschland</p>
              </div>
            </div>
            <button className="text-germany-red hover:text-primary transition-colors relative z-10 p-2 rounded-full hover:bg-surface-container-low">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </Link>
        <Link to="/simulator" className="mt-2 bg-surface-container-lowest rounded-xl p-6 h-full flex items-center justify-between relative overflow-hidden border border-surface-variant hover:-translate-y-0.5 transition-transform duration-200 block shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-germany-red/10 text-germany-red flex items-center justify-center">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <div>
              <h4 className="font-title-lg text-title-lg text-on-surface">TELC B1 Prüfungssimulator</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Bereite dich auf die TELC Prüfung vor</p>
            </div>
          </div>
          <button className="text-germany-red hover:text-primary transition-colors relative z-10 p-2 rounded-full hover:bg-surface-container-low">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </Link>
      </main>

    </>
  );
}
