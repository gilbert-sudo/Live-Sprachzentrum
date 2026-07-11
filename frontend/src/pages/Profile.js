import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function Profile() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <>
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
        {/* Profile Header */}
        <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden interactive-card">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold"></div>

          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-surface-container flex items-center justify-center shadow-sm relative shrink-0 mt-2 border border-surface-variant">
            <span className="material-symbols-outlined text-[48px] md:text-[64px] text-secondary">person</span>
            <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:bg-surface-tint transition-colors">
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">edit</span>
            </button>
          </div>

          <div className="flex-1 text-center md:text-left mt-2 md:mt-4">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Mikajy Ranaivo</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">mikajy.ranaivo@beispiel.de</p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded-full">
                <span className="material-symbols-outlined text-[16px]">school</span>
                B1 Standard Student
              </span>
            </div>
          </div>
        </section>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Account Settings */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col gap-4 interactive-card">
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Kontoeinstellungen</h3>

            <button className="flex items-center justify-between p-3 rounded-full hover:bg-surface-container-low transition-colors text-left group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">Passwort ändern</p>
                  <p className="font-label-sm text-label-sm text-secondary">Zuletzt aktualisiert vor 3 Monaten</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary">chevron_right</span>
            </button>

            <div className="h-[1px] bg-surface-variant w-full my-1"></div>

            <button className="flex items-center justify-between p-3 rounded-full hover:bg-surface-container-low transition-colors text-left group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">Zahlungsmethoden</p>
                  <p className="font-label-sm text-label-sm text-secondary">Mastercard endet auf 1234</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary">chevron_right</span>
            </button>
          </section>

          {/* Preferences */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col gap-4 interactive-card">
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Einstellungen</h3>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined">notifications</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">Push-Benachrichtigungen</p>
                </div>
              </div>
              {/* Toggle switch placeholder */}
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 bottom-1 w-4 bg-on-primary rounded-full"></div>
              </div>
            </div>

            <div className="h-[1px] bg-surface-variant w-full my-1"></div>

            <div onClick={toggleTheme} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">Dark Mode</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-primary' : 'bg-surface-variant'}`}>
                <div className={`absolute left-1 top-1 bottom-1 w-4 rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-secondary'}`}></div>
              </div>
            </div>

            <div className="h-[1px] bg-surface-variant w-full my-1"></div>

            <button className="flex items-center justify-between p-3 rounded-full hover:bg-surface-container-low transition-colors text-left group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">Sprache</p>
                  <p className="font-label-sm text-label-sm text-secondary">Deutsch</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary">chevron_right</span>
            </button>
          </section>

        </div>

        {/* Action Buttons */}
        <section className="flex flex-col md:flex-row gap-4 mt-2">
          <button className="flex-1 bg-surface-container-lowest text-on-surface font-label-md text-label-md py-4 px-6 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 border border-surface-variant shadow-sm interactive-card">
            <span className="material-symbols-outlined">help</span>
            Hilfe & Support
          </button>
          <button className="flex-1 bg-error-container text-on-error-container font-label-md text-label-md py-4 px-6 rounded-full hover:bg-error/20 transition-colors flex items-center justify-center gap-2 border border-error/20 shadow-sm interactive-card">
            <span className="material-symbols-outlined">logout</span>
            Abmelden
          </button>
        </section>

      </main>
    </>
  );
}
