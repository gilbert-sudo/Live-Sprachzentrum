import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeworks } from '../store/homeworkSlice';
import AdminDashboard from './AdminDashboard';
import HomeworkPanel from '../components/HomeworkPanel';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { homeworks: pinnedHomeworks } = useSelector((state) => state.homework);
  const isTeacher = user?.role === 'teacher';
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Replaced Live Classes with Mock "My Courses" for the new UI
    const myCourses = [
      { id: 'c1', level: 'A1', name: 'Intensivkurs Deutsch', progress: 80, icon: 'school' },
      { id: 'c2', level: 'B1', name: 'Grammatik & Konversation', progress: 35, icon: 'translate' },
      { id: 'c3', level: 'Alle', name: 'Aussprachetraining', progress: 15, icon: 'record_voice_over' }
    ];
    setCourses(myCourses);

    if (user && user.role !== 'admin') {
      const fetchParams = { isPinned: true };
      if (user.role === 'student') {
        fetchParams.level = user.level;
      }
      dispatch(fetchHomeworks(fetchParams));
    }
  }, [user, dispatch]);

  const totalHomeworks = pinnedHomeworks.length;
  let completedHomeworks = 0;
  
  if (user?.role === 'student') {
    pinnedHomeworks.forEach(hw => {
      if (hw.scores && hw.scores.some(s => s.studentId === user?._id)) {
        completedHomeworks++;
      }
    });
  } else {
    pinnedHomeworks.forEach(hw => {
      if (hw.scores && hw.scores.length > 0) {
        completedHomeworks++;
      }
    });
  }

  const homeworkProgress = totalHomeworks > 0 ? Math.round((completedHomeworks / totalHomeworks) * 100) : 0;

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user?.status === 'pending') {
    return (
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-6 md:py-12 flex items-center justify-center relative">
        {/* Background lock icons subtle pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-5 pointer-events-none overflow-hidden flex flex-wrap justify-around items-center gap-10 md:gap-20">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-[60px] md:text-[80px]">lock</span>
          ))}
        </div>

        <div className="z-10 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center bg-surface-container-lowest border border-surface-variant rounded-3xl md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl w-full relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold"></div>

          <div className="relative mb-6 md:mb-8 mt-2 md:mt-4 animate-in zoom-in duration-500 delay-150">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Willkommen" className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-full border-4 md:border-8 border-surface shadow-xl md:shadow-2xl ring-4 ring-germany-red/20" />
            <div className="w-8 h-8 md:w-12 md:h-12 bg-surface text-germany-red rounded-full flex items-center justify-center absolute bottom-0 right-0 border-2 md:border-4 border-surface shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-[16px] md:text-[24px] font-bold">hourglass_top</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-black text-on-surface mb-3 md:mb-4 tracking-tight">Dein Account wird geprüft</h1>
          <p className="text-sm md:text-lg text-secondary font-medium leading-relaxed mb-8 md:mb-10 max-w-lg">
            Wir haben deine Anfrage erhalten. Ein Administrator wird deine Daten in Kürze prüfen und den Account freischalten.
          </p>

          {/* Stepper */}
          <div className="w-full max-w-md mb-8 md:mb-10 relative px-1 sm:px-0">
            <div className="relative flex justify-between items-center">
              {/* Connecting Line */}
              <div className="absolute left-[10%] right-[10%] top-[35%] md:top-1/2 h-0.5 md:h-1 bg-surface-variant -z-10 -translate-y-1/2"></div>
              <div className="absolute left-[10%] w-[40%] top-[35%] md:top-1/2 h-0.5 md:h-1 bg-germany-red -z-10 -translate-y-1/2 transition-all duration-1000"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-surface-container-lowest px-1 md:px-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-germany-red text-white flex items-center justify-center shadow-lg ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[16px] md:text-[20px]">check</span>
                </div>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-on-surface text-center">Registriert</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-surface-container-lowest px-1 md:px-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface text-germany-red border-2 border-germany-red flex items-center justify-center shadow-lg ring-4 ring-surface-container-lowest relative">
                  <div className="absolute inset-0 rounded-full border-2 border-germany-red border-t-transparent animate-[spin_3s_linear_infinite]"></div>
                  <span className="material-symbols-outlined text-[16px] md:text-[20px] animate-pulse">visibility</span>
                </div>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-germany-red text-center">In Prüfung</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-surface-container-lowest px-1 md:px-2 opacity-50">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-variant text-secondary flex items-center justify-center shadow-sm ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[16px] md:text-[20px]">lock_open</span>
                </div>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-secondary text-center">Freigeschaltet</span>
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-center mt-2">
            <div className="bg-surface-container-high rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3 border border-surface-variant max-w-sm w-full text-left shadow-sm">
              <span className="material-symbols-outlined text-germany-gold text-[20px] md:text-[24px]">info</span>
              <p className="text-[11px] md:text-sm text-on-surface-variant leading-snug pt-0.5 md:pt-0.5">Du erhältst vollen Zugriff auf das Dashboard und die Bibliothek, sobald der Prozess abgeschlossen ist.</p>
            </div>
          </div>

        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
        
        {/* Welcome Header */}
        <section className="mb-2 md:mb-4 flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Hallo, {user ? user.name : 'Gast'}!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              {isTeacher ? "Bereit für deinen nächsten Unterricht?" : "Bereit für deine nächste Lektion?"}
            </p>
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
                  {isTeacher ? (
                    <>Unterrichten auf dem <span className="text-germany-gold">Campus</span></>
                  ) : (
                    <>Willkommen auf dem <span className="text-germany-gold">Campus</span></>
                  )}
                </h3>
                <p className="text-white/90 font-body-lg text-lg drop-shadow-md">
                  {isTeacher ? (
                    "Betrete die virtuelle Schule, um deine Live-Klassen zu leiten und mit Schülern zu interagieren."
                  ) : (
                    "Betrete die virtuelle Schule. Wähle dein Niveau, finde Live-Klassen und lerne gemeinsam mit anderen."
                  )}
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
            <h3 className="font-title-md text-title-md text-on-surface">
              {isTeacher ? "Meine Klassen" : "Meine Kurse"}
            </h3>
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



        {/* Homework Banner */}
        {pinnedHomeworks.length > 0 ? (
          <section className="mb-8 bg-surface-container-lowest rounded-xl p-5 md:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded-full">
                  Devoirs / Hausaufgaben
                </span>
                <span className="md:hidden font-label-md text-label-md text-on-surface font-bold">Übungsaufgaben</span>
              </div>
              
              <div className="flex gap-4 items-center">
                {/* Circular Progress Indicator */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    <path className="text-germany-red" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${homeworkProgress}, 100`} strokeLinecap="round" strokeWidth="4"></path>
                  </svg>
                  <span className="absolute font-label-md text-label-md text-on-surface">{homeworkProgress}%</span>
                </div>
                
                <div>
                  <h3 className="hidden md:block font-title-lg text-title-lg text-on-surface mb-1">Übungsaufgaben</h3>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-0.5">
                    {pinnedHomeworks.length} {pinnedHomeworks.length === 1 ? 'Aufgabe' : 'Aufgaben'} verfügbar
                  </p>
                  <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface font-medium leading-tight">
                    {pinnedHomeworks.length > 0 ? pinnedHomeworks[0].title : "Alle Übungen anzeigen"}
                  </p>
                </div>
              </div>
              
              {/* Homework Goal */}
              <div className="mt-5 pt-5 border-t border-surface-variant">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-secondary">
                    {isTeacher ? "Ziel: Alle Schüler antworten" : "Ziel: Alle Hausaufgaben erledigen"}
                  </span>
                  {homeworkProgress === 100 && totalHomeworks > 0 && (
                    <span className="material-symbols-outlined text-success-green text-[18px]">verified</span>
                  )}
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-success-green h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${homeworkProgress}%` }}></div>
                </div>
              </div>
            </div>
            
            <Link to="/homework" className="w-full md:w-auto shrink-0 bg-germany-black dark:bg-white text-white dark:text-germany-black font-label-md text-label-md py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
              {isTeacher ? "Aufgaben verwalten" : "Zu den Hausaufgaben"}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </section>
        ) : (
          <section className="mb-8 relative w-full overflow-hidden rounded-3xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-surface-container-lowest border border-surface-variant flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-500">
            {/* Abstract Background Blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-germany-gold/20 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-70 group-hover:scale-110 transition-transform duration-700 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 md:w-56 md:h-56 bg-germany-red/10 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-70 group-hover:scale-110 transition-transform duration-700 translate-y-1/3 -translate-x-1/4 dark:bg-germany-red/20"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-32 md:h-32 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl md:blur-3xl opacity-50 animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left flex-1 order-2 md:order-1 w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-green/10 text-success-green font-bold text-[10px] md:text-xs mb-2 md:mb-3 border border-success-green/20 backdrop-blur-md">
                <span className="material-symbols-outlined text-[14px] md:text-[16px]">celebration</span>
                Alles erledigt!
              </div>
              <h4 className="text-xl md:text-3xl font-black text-on-surface mb-1.5 md:mb-2 tracking-tight">Keine Aufgaben</h4>
              <p className="text-on-surface-variant text-xs md:text-base max-w-md font-medium leading-relaxed mb-4 md:mb-0">
                Du bist auf dem neuesten Stand! Nutze die Zeit, um in der <span className="text-germany-red font-bold">Bibliothek</span> zu stöbern.
              </p>
              
              <Link to="/bibliothek" className="w-full md:w-auto mt-0 md:mt-5 px-5 py-2.5 rounded-xl text-xs md:text-sm bg-germany-black dark:bg-white text-white dark:text-germany-black font-bold flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <span className="material-symbols-outlined text-[16px] md:text-[18px]">local_library</span>
                Zur Bibliothek
              </Link>
            </div>
            
            {/* Graphic / Icon Area */}
            <div className="relative z-10 shrink-0 w-24 h-24 md:w-48 md:h-48 flex items-center justify-center order-1 md:order-2 mb-2 md:mb-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-germany-red/20 to-germany-gold/20 rounded-full animate-[spin_15s_linear_infinite]"></div>
              <div className="absolute inset-2 md:inset-3 bg-surface rounded-full shadow-inner flex items-center justify-center border border-surface-variant/50 backdrop-blur-xl group-hover:scale-105 transition-transform duration-500">
                <span className="material-symbols-outlined text-[40px] md:text-[80px] text-germany-gold drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-1 -right-1 md:top-2 md:right-2 w-7 h-7 md:w-10 md:h-10 bg-surface rounded-lg md:rounded-xl shadow-lg border border-surface-variant flex items-center justify-center animate-[bounce_3s_infinite]">
                <span className="material-symbols-outlined text-success-green text-[14px] md:text-[20px]">mood</span>
              </div>
              <div className="absolute -bottom-1 -left-1 md:bottom-6 md:left-0 w-6 h-6 md:w-8 md:h-8 bg-surface rounded-full shadow-lg border border-surface-variant flex items-center justify-center animate-[bounce_4s_infinite] delay-1000">
                <span className="material-symbols-outlined text-germany-red text-[12px] md:text-[16px]">star</span>
              </div>
            </div>
          </section>
        )}

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
