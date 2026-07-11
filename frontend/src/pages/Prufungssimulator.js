import React from 'react';
import { Link } from 'react-router-dom';

export default function Prufungssimulator() {
  return (
    <>
      {/* Top Navigation Area */}
      <header className="bg-surface border-b border-surface-variant sticky top-16 z-40 shadow-sm">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Beenden" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-secondary">
              <span className="material-symbols-outlined">close</span>
            </Link>
            <h1 className="font-headline-md text-headline-md text-primary truncate max-w-[200px] md:max-w-none">
              TELC B1 Prüfungssimulator
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-error-container text-on-error-container px-4 py-2 rounded-full font-label-md text-label-md font-bold">
            <span className="material-symbols-outlined text-xl icon-filled">timer</span>
            <span>01:45:00</span>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="bg-tertiary-container text-on-tertiary-container px-margin-mobile py-2 md:px-margin-desktop flex items-center gap-2 font-label-md text-label-md justify-center shadow-sm">
        <span className="material-symbols-outlined text-sm icon-filled">warning</span>
        <span>Bitte achten Sie auf die Zeit. Der Teil "Leseverstehen" endet in 45 Minuten.</span>
      </div>

      {/* Main Exam Canvas */}
      <main className="flex-1 max-w-container-max-width mx-auto w-full px-margin-mobile md:px-margin-desktop py-6 flex flex-col gap-6 relative">
        {/* Section Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 border-b border-surface-variant -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-t-full bg-surface-container-low text-secondary font-label-md text-label-md opacity-50 cursor-not-allowed whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">headphones</span>
            Hören
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-t-full bg-surface text-primary border-b-2 border-primary font-label-md text-label-md whitespace-nowrap">
            <span className="material-symbols-outlined icon-filled text-sm">menu_book</span>
            Lesen
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-t-full bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">edit</span>
            Schreiben
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-t-full bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">mic</span>
            Sprechen
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center font-label-sm text-label-sm text-secondary">
            <span>Teil 1: Leseverstehen</span>
            <span>Frage 4 von 20</span>
          </div>
          <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-germany-red w-[20%] rounded-full"></div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1">
          {/* Left Column: Reading Text */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.04)] border border-surface-subtle lg:w-3/5 overflow-y-auto max-h-[530px] lg:max-h-[618px]">
            <h2 className="font-title-lg text-title-lg mb-4 text-on-surface">Lesen Sie den Text und lösen Sie die Aufgaben.</h2>
            <div className="prose prose-sm md:prose-base text-on-surface-variant space-y-4 font-body-lg text-body-lg leading-relaxed">
              <p>Sehr geehrte Damen und Herren,</p>
              <p>ich wende mich an Sie bezüglich der Stellenausschreibung als IT-Support Mitarbeiter in Ihrem Unternehmen. Mit großem Interesse habe ich Ihre Anzeige auf dem Online-Portal gelesen und möchte mich hiermit um diese Position bewerben.</p>
              <p>In den letzten drei Jahren war ich bei einer mittelständischen Firma in München tätig, wo ich umfangreiche Erfahrungen im First- und Second-Level-Support sammeln konnte. Zu meinen Hauptaufgaben gehörte die Betreuung der internen Netzwerkinfrastruktur sowie die Lösung von Hard- und Softwareproblemen der Mitarbeiter.</p>
              <p>Besonders reizt mich an der von Ihnen ausgeschriebenen Stelle die Möglichkeit, in einem internationalen Team zu arbeiten und meine Englischkenntnisse täglich anwenden zu können. Ich bin es gewohnt, selbstständig zu arbeiten, schätze aber auch den Austausch im Team sehr.</p>
              <p>Für ein persönliches Gespräch stehe ich Ihnen jederzeit gerne zur Verfügung.</p>
              <p>Mit freundlichen Grüßen<br/>Max Mustermann</p>
            </div>
          </div>

          {/* Right Column: Question and Options */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.04)] border border-surface-subtle lg:w-2/5 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-title-lg text-title-lg text-on-surface">Aufgabe 4</h3>
              <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                Warum bewirbt sich Max Mustermann auf die Stelle?
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-4 p-4 rounded-lg border-2 border-surface-variant hover:border-primary/50 hover:bg-surface transition-all cursor-pointer group">
                <div className="mt-0.5">
                  <input className="w-5 h-5 text-germany-red focus:ring-germany-red border-surface-variant bg-surface-container-lowest" name="q4" type="radio"/>
                </div>
                <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                  a) Weil er nach München umziehen möchte.
                </span>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-lg border-2 border-germany-red bg-primary-fixed/20 cursor-pointer">
                <div className="mt-0.5">
                  <input defaultChecked className="w-5 h-5 text-germany-red focus:ring-germany-red border-germany-red bg-surface-container-lowest" name="q4" type="radio"/>
                </div>
                <span className="font-body-md text-body-md text-on-primary-fixed-variant font-medium">
                  b) Weil er in einem internationalen Team arbeiten möchte.
                </span>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-lg border-2 border-surface-variant hover:border-primary/50 hover:bg-surface transition-all cursor-pointer group">
                <div className="mt-0.5">
                  <input className="w-5 h-5 text-germany-red focus:ring-germany-red border-surface-variant bg-surface-container-lowest" name="q4" type="radio"/>
                </div>
                <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                  c) Weil er keine Erfahrungen im IT-Support hat.
                </span>
              </label>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Action Area */}
      <footer className="bg-surface border-t border-surface-variant sticky bottom-0 z-40">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop h-20 flex items-center justify-between gap-4">
          <button className="px-6 py-3 rounded-full border border-germany-black dark:border-white text-germany-black dark:text-white font-label-md text-label-md font-bold hover:bg-surface-container-low transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Zurück
          </button>
          
          <div className="hidden md:flex gap-1">
            <div className="w-2 h-2 rounded-full bg-germany-red"></div>
            <div className="w-2 h-2 rounded-full bg-germany-red"></div>
            <div className="w-2 h-2 rounded-full bg-germany-red"></div>
            <div className="w-2 h-2 rounded-full bg-germany-red ring-2 ring-primary-fixed ring-offset-2 ring-offset-surface"></div>
            <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
            <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
          </div>

          <button className="px-6 py-3 rounded-full bg-germany-red text-white font-label-md text-label-md font-bold hover:bg-primary transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md flex items-center gap-2">
            Weiter
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </footer>
    </>
  );
}
