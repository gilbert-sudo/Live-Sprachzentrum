import React from 'react';
import { Link } from 'react-router-dom';

export default function Kurse() {
  return (
    <>
      <main className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-6">
        {/* Course Header */}
        <div className="mb-8 bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-6 border border-surface-variant">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-germany-gold icon-filled">star</span>
            <span className="font-label-md text-label-md text-secondary">AKTUELLER KURS</span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-germany-black dark:text-white">Mein Kurs: B1 Standard</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-germany-red w-[45%] rounded-full"></div>
            </div>
            <span className="font-label-md text-label-md text-secondary">45% Abgeschlossen</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {/* Chapter 1: Completed */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant overflow-hidden group">
            <div className="p-4 md:p-6 flex items-center gap-4 cursor-pointer hover:bg-surface-subtle transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#E8F3EB] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-success-green icon-filled">check_circle</span>
              </div>
              <div className="flex-1">
                <h3 className="font-title-lg text-title-lg text-germany-black dark:text-white">Kapitel 1: Wohnformen</h3>
                <p className="font-body-md text-body-md text-secondary">10/10 Lektionen</p>
              </div>
              <span className="material-symbols-outlined text-secondary transition-transform group-hover:translate-x-1">chevron_right</span>
            </div>
          </div>

          {/* Chapter 2: In Progress */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-2 border-germany-red overflow-hidden">
            <div className="p-4 md:p-6 flex items-center gap-4 border-b border-surface-variant bg-surface-subtle">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-germany-red icon-filled">play_arrow</span>
              </div>
              <div className="flex-1">
                <h3 className="font-title-lg text-title-lg text-germany-black dark:text-white">Kapitel 2: Arbeitswelt</h3>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-germany-red w-[40%] rounded-full"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary">40%</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-germany-red rotate-90">chevron_right</span>
            </div>

            {/* Expanded Lessons */}
            <div className="bg-surface-container-lowest py-2">
              <Link to="/uebung" className="flex items-center gap-4 px-6 py-3 hover:bg-surface-subtle transition-colors">
                <span className="material-symbols-outlined text-success-green text-[20px] icon-filled">check_circle</span>
                <div className="flex-1">
                  <h4 className="font-body-md text-body-md text-germany-black dark:text-white">Lektion 2.1: Berufe und Tätigkeiten</h4>
                </div>
              </Link>
              <Link to="/uebung" className="flex items-center gap-4 px-6 py-3 bg-surface-container-low hover:bg-surface-subtle transition-colors">
                <span className="material-symbols-outlined text-germany-red text-[20px] icon-filled">play_circle</span>
                <div className="flex-1">
                  <h4 className="font-body-md text-body-md text-germany-black dark:text-white font-semibold">Lektion 2.2: Bewerbungsgespräch</h4>
                </div>
              </Link>
              <div className="flex items-center gap-4 px-6 py-3 opacity-50">
                <span className="material-symbols-outlined text-secondary text-[20px] icon-filled">lock</span>
                <div className="flex-1">
                  <h4 className="font-body-md text-body-md text-secondary">Lektion 2.3: Arbeitsvertrag verstehen</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 3: Locked */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant overflow-hidden opacity-75">
            <div className="p-4 md:p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-secondary icon-filled">lock</span>
              </div>
              <div className="flex-1">
                <h3 className="font-title-lg text-title-lg text-secondary">Kapitel 3: Feste und Traditionen</h3>
                <p className="font-body-md text-body-md text-secondary">0/8 Lektionen</p>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
