import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Replaced Live Classes with Mock "My Courses" for the new UI
    const myCourses = [
      { id: 'c1', level: 'A1', name: 'Intensivkurs Deutsch', progress: 80, icon: 'school' },
      { id: 'c2', level: 'B1', name: 'Grammatik & Konversation', progress: 35, icon: 'translate' },
      { id: 'c3', level: 'Alle', name: 'Aussprachetraining', progress: 15, icon: 'record_voice_over' }
    ];
    setCourses(myCourses);
  }, []);

  return (
    <>
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
        
        {/* Welcome Header */}
        <section className="mb-2 md:mb-4 flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Hallo, {user ? user.name : 'Gast'}!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Bereit für deine nächste Lektion?</p>
          </div>
        </section>

        {/* Campus Entry Banner */}
        <section className="mb-4 md:mb-8">
          <Link to="/campus" className="group block w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/malagasy_student_banner.png')" }}
            ></div>
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-germany-black/90 via-germany-black/60 to-transparent"></div>
            
            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-center justify-between h-full gap-6 min-h-[220px]">
              
              <div className="text-center md:text-left flex-1 max-w-xl">
                <h3 className="font-title-lg text-title-lg md:text-4xl text-white mb-3 font-bold tracking-tight drop-shadow-md">
                  Willkommen auf dem <span className="text-germany-gold">Campus</span>
                </h3>
                <p className="text-white/90 font-body-lg text-lg drop-shadow-md">
                  Betrete die virtuelle Schule. Wähle dein Niveau, finde Live-Klassen und lerne gemeinsam mit anderen.
                </p>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <div className="w-full md:w-auto bg-germany-red text-white font-label-lg px-8 py-4 rounded-full shadow-lg group-hover:bg-red-700 transition-colors flex items-center justify-center gap-3 cursor-pointer backdrop-blur-sm border border-white/20">
                  <span className="material-symbols-outlined">meeting_room</span>
                  Campus betreten
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* My Courses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Meine Kurse</h3>
          </div>
          {/* Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 md:pb-0 md:grid md:grid-cols-3 snap-x snap-mandatory -mx-margin-mobile px-margin-mobile scroll-pl-margin-mobile md:mx-0 md:px-0 md:scroll-pl-0">
            
            {/* Render My Courses */}
            {courses.map(course => (
              <div key={course.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between interactive-card group hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-surface-variant/30 text-secondary rounded-lg flex items-center justify-center group-hover:bg-germany-red/10 group-hover:text-germany-red transition-colors">
                    <span className="material-symbols-outlined">{course.icon}</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Niveau {course.level}</p>
                    <h4 className="font-title-md text-title-md text-on-surface line-clamp-1">{course.name}</h4>
                  </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] text-secondary mb-1">
                     <span>Fortschritt</span>
                     <span>{course.progress}%</span>
                   </div>
                   <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mb-4">
                     <div className="bg-germany-red h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                   </div>
                  <button className="w-full bg-surface-container-high text-on-surface font-label-md text-label-md py-2 rounded-lg hover:bg-surface-variant transition-colors group-hover:bg-germany-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-germany-black shadow-sm">
                    Weiterlernen
                  </button>
                </div>
              </div>
            ))}
            
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
          
          <Link to="/uebung" className="w-full md:w-auto shrink-0 bg-germany-black dark:bg-white text-white dark:text-germany-black font-label-md text-label-md py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
            Lektion fortsetzen
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </section>

        {/* Action Center & Stats (Horizontal Scroll on Mobile) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Aktivitäten & Tools</h3>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 md:pb-0 md:grid md:grid-cols-3 md:grid-rows-2 snap-x snap-mandatory -mx-margin-mobile px-margin-mobile scroll-pl-margin-mobile md:mx-0 md:px-0 md:scroll-pl-0">
            
            {/* Completed Lessons Stat */}
            <div className="min-w-[140px] md:min-w-0 snap-start bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200 md:col-start-1 md:row-start-1">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary dark:bg-primary/10 dark:text-primary flex items-center justify-center mb-3">
                <span className="material-symbols-outlined icon-filled">check_circle</span>
              </div>
              <div>
                <p className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">24</p>
                <p className="font-label-sm text-label-sm text-secondary line-clamp-1">Lektionen beendet</p>
              </div>
            </div>

            {/* Vocab Stat */}
            <div className="min-w-[140px] md:min-w-0 snap-start bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200 md:col-start-1 md:row-start-2">
              <div className="w-10 h-10 rounded-full bg-success-green/10 text-success-green dark:bg-success-green/20 dark:text-green-400 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined">spellcheck</span>
              </div>
              <div>
                <p className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">450</p>
                <p className="font-label-sm text-label-sm text-secondary line-clamp-1">Wörter gelernt</p>
              </div>
            </div>

            {/* Career Shortcut */}
            <Link to="/karriere" className="group min-w-[240px] md:min-w-0 md:col-span-2 md:col-start-2 md:row-start-1 snap-start bg-gradient-to-r from-germany-black via-germany-black to-surface-container-highest rounded-xl p-[1px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-transform duration-200 flex flex-col">
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
                  <button className="text-secondary group-hover:text-germany-black dark:group-hover:text-white p-1 rounded-full bg-surface-variant/30 hover:bg-surface-variant/50 transition-colors">
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* TELC Simulator */}
            <Link to="/simulator" className="group min-w-[240px] md:min-w-0 md:col-span-2 md:col-start-2 md:row-start-2 snap-start bg-surface-container-lowest rounded-xl p-4 md:p-5 h-full flex flex-col justify-between relative overflow-hidden border border-surface-variant hover:-translate-y-0.5 transition-transform duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 relative z-10 mb-2">
                <div className="w-10 h-10 shrink-0 rounded-full bg-germany-red/10 text-germany-red dark:bg-germany-red/20 dark:text-red-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">quiz</span>
                </div>
                <h4 className="font-title-md text-title-md text-on-surface">Prüfungssimulator</h4>
              </div>
              <div className="flex items-end justify-between relative z-10 mt-2">
                <p className="font-body-sm text-sm text-on-surface-variant max-w-[160px]">Bereite dich auf die TELC Prüfung vor</p>
                <button className="text-secondary group-hover:text-germany-black dark:group-hover:text-white p-1 rounded-full bg-surface-variant/30 hover:bg-surface-variant/50 transition-colors">
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                </button>
              </div>
            </Link>

          </div>
        </section>

      </main>

    </>
  );
}
