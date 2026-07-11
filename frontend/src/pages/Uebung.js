import React from 'react';
import { Link } from 'react-router-dom';

export default function Uebung() {
  return (
    <>
      <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile py-6 md:py-margin-desktop pb-32">
        {/* Progress Track */}
        <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden mb-6">
          <div className="h-full bg-germany-red w-3/4 rounded-full transition-all duration-500"></div>
        </div>

        {/* Lesson Meta */}
        <div className="mb-8">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">Kapitel 2</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Lektion 2.2 - Übung</h2>
        </div>

        {/* Audio Player Component */}
        <section className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-surface-variant/40 mb-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-secondary">headphones</span>
            <h3 className="font-title-lg text-title-lg text-on-surface">Hörtext: Arbeiten in Deutschland</h3>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex-shrink-0 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all z-10">
              <span className="material-symbols-outlined icon-filled">play_arrow</span>
            </button>
            <div className="flex-grow flex flex-col justify-center gap-1.5 z-10">
              <div className="w-full h-2.5 bg-surface-container-high rounded-full relative cursor-pointer hover:h-3 transition-all flex items-center">
                <div className="absolute left-0 h-full bg-germany-red rounded-full w-[45%]"></div>
                <div className="absolute left-[45%] -translate-x-1/2 w-4 h-4 bg-germany-red rounded-full shadow border-2 border-surface-container-lowest opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-secondary">
                <span>0:42</span>
                <span>2:15</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Exercise: Textes à trous */}
        <section className="bg-surface-container-lowest rounded-xl p-5 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-surface-variant/40 relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-tertiary-container rounded-l-xl"></div>
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Ergänzen Sie den Text</h3>
              <p className="font-body-md text-body-md text-secondary">Hören Sie genau zu und füllen Sie die fehlenden Wörter ein.</p>
            </div>
            <span className="material-symbols-outlined text-tertiary-container text-opacity-50 text-4xl hidden md:block">edit_note</span>
          </div>

          <div className="font-body-lg text-body-lg text-on-surface leading-loose md:leading-[2.5]">
            In Deutschland ist Pünktlichkeit am Arbeitsplatz sehr 
            <span className="relative inline-block mx-1 group">
              <input autoComplete="off" className="exercise-input w-28 md:w-32 bg-surface border-b-2 border-surface-variant text-center font-title-lg text-title-lg text-primary focus:border-primary focus:bg-primary-fixed/20 focus:outline-none transition-all px-2 py-1 rounded-t-md" spellCheck="false" type="text"/>
            </span>
            . Man sollte immer 
            <span className="relative inline-block mx-1 group">
              <input autoComplete="off" className="exercise-input w-32 md:w-36 bg-surface border-b-2 border-surface-variant text-center font-title-lg text-title-lg text-primary focus:border-primary focus:bg-primary-fixed/20 focus:outline-none transition-all px-2 py-1 rounded-t-md" spellCheck="false" type="text"/>
            </span>
            zum Meeting erscheinen. Wenn man krank ist, muss man dem Arbeitgeber sofort 
            <span className="relative inline-block mx-1 group">
              <input autoComplete="off" className="exercise-input w-32 md:w-36 bg-surface border-b-2 border-surface-variant text-center font-title-lg text-title-lg text-primary focus:border-primary focus:bg-primary-fixed/20 focus:outline-none transition-all px-2 py-1 rounded-t-md" spellCheck="false" type="text"/>
            </span>
            geben.
          </div>
        </section>
      </main>

      {/* Contextual Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-variant p-4 pb-safe z-40 shadow-[0_-8px_16px_rgba(0,0,0,0.05)] md:static md:bg-transparent md:border-none md:shadow-none md:p-0 md:max-w-container-max-width md:mx-auto md:px-margin-desktop md:pb-12">
        <div className="flex flex-col-reverse md:flex-row gap-3 max-w-md mx-auto md:max-w-none md:justify-end md:items-center">
          <Link to="/kurse" className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border-2 border-germany-black dark:border-white text-germany-black dark:text-white font-label-md text-label-md hover:bg-surface-variant/30 active:scale-95 transition-all w-full md:w-auto">
            <span className="material-symbols-outlined">lightbulb</span>
            Hilfe
          </Link>
          <button className="flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-surface-tint active:scale-95 hover:-translate-y-0.5 transition-all shadow-md w-full md:w-auto">
            <span className="material-symbols-outlined icon-filled">check_circle</span>
            Prüfen
          </button>
        </div>
      </div>
    </>
  );
}
