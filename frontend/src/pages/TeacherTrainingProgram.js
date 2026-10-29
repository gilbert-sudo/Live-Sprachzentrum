import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handbookMeta, trainingModules } from '../data/teacherTrainingData';

export default function TeacherTrainingProgram() {
  const { user } = useSelector((state) => state.auth);

  // Storage key personalized to user
  const storageKey = `lsz_teacher_training_${user?._id || 'guest'}`;

  // Active module state
  const [activeModuleId, setActiveModuleId] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_active`);
      if (saved && trainingModules.some(m => m.id === saved)) {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return trainingModules[0].id;
  });

  // Completed modules tracking
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_completed`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Interactive checklist in Module 9
  const [checklistState, setChecklistState] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_checklist`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile drawer toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Relativsatz interactive step in Module 5
  const [relativStep, setRelativStep] = useState(1);

  // Active intonation demo in Module 1 & 10
  const [selectedMelody, setSelectedMelody] = useState('steigend');

  // Copy notification state
  const [copiedPhrase, setCopiedPhrase] = useState(null);

  // Scroll to top of content when module changes
  const contentTopRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_active`, activeModuleId);
    } catch (e) {}
  }, [activeModuleId, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_completed`, JSON.stringify(completedModules));
    } catch (e) {}
  }, [completedModules, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_checklist`, JSON.stringify(checklistState));
    } catch (e) {}
  }, [checklistState, storageKey]);

  // Current module
  const currentModule = useMemo(() => {
    return trainingModules.find(m => m.id === activeModuleId) || trainingModules[0];
  }, [activeModuleId]);

  const currentIndex = useMemo(() => {
    return trainingModules.findIndex(m => m.id === activeModuleId);
  }, [activeModuleId]);

  const prevModule = currentIndex > 0 ? trainingModules[currentIndex - 1] : null;
  const nextModule = currentIndex < trainingModules.length - 1 ? trainingModules[currentIndex + 1] : null;

  // Filtered modules for sidebar search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return trainingModules;
    const q = searchQuery.toLowerCase();
    return trainingModules.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.shortTitle.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.number.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Progress percentage
  const totalCount = trainingModules.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isAllCompleted = completedCount === totalCount;

  // Toggle module completed
  const handleToggleCompleted = (moduleId) => {
    setCompletedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  // Switch module
  const handleSelectModule = (id) => {
    setActiveModuleId(id);
    setIsMobileMenuOpen(false);
    if (contentTopRef.current) {
      contentTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle checklist item
  const handleToggleChecklistItem = (id) => {
    setChecklistState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleResetChecklist = () => {
    setChecklistState({});
  };

  const handleCompleteAllChecklist = (items) => {
    const newState = {};
    items.forEach(it => { newState[it.id] = true; });
    setChecklistState(newState);
  };

  // Reset entire progress
  const handleResetAllProgress = () => {
    if (window.confirm('Möchten Sie Ihren gesamten Lesefortschritt im Lehrerhandbuch zurücksetzen?')) {
      setCompletedModules([]);
      setChecklistState({});
      setActiveModuleId(trainingModules[0].id);
    }
  };

  // Copy phrase to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPhrase(text);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  const isCurrentCompleted = completedModules.includes(currentModule.id);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 font-body-md text-on-surface">
      
      {/* Top Header & Breadcrumb */}
      <div ref={contentTopRef} className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs md:text-sm text-secondary">
            <Link to="/dashboard" className="hover:text-germany-red transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">home</span>
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">Lehrer-Trainingsprogramm</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-high text-xs font-bold shadow-sm border border-surface-variant"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Lektionsübersicht
            </button>
            <button
              onClick={handleResetAllProgress}
              title="Fortschritt zurücksetzen"
              className="text-xs text-secondary hover:text-germany-red px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span className="hidden sm:inline">Zurücksetzen</span>
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-surface-container-lowest via-surface to-surface-container-low border border-surface-variant shadow-sm">
          {/* Subtle flag accent ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 text-germany-red border border-germany-red/20 text-xs font-bold mb-3">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Offizielles Dozentenhandbuch · Live-Sprachzentrum
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-on-surface tracking-tight mb-2">
                Lehrerhandbuch: <span className="text-germany-red">Deutsch unterrichten auf Deutsch</span>
              </h1>
              <p className="text-secondary text-sm md:text-base leading-relaxed">
                Mit den Lehrwerken des Hueber Verlags (<span className="font-semibold text-on-surface">Schritte plus Neu</span> & <span className="font-semibold text-on-surface">Sicher!</span>) als roter Faden. 
                Methoden, Regeln und Werkzeuge zur einsprachigen Vermittlung ohne Übersetzung.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-germany-gold">person</span>
                  Direktion: {handbookMeta.director}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-germany-red">location_on</span>
                  Madagaskar (Ambohidratrimo)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  {handbookMeta.date}
                </span>
              </div>
            </div>

            {/* Overall Progress Gauge */}
            <div className="shrink-0 bg-surface-container-lowest/80 backdrop-blur p-4 sm:p-5 rounded-2xl border border-surface-variant flex flex-col items-center justify-center min-w-[220px]">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Mein Lesefortschritt</span>
                <span className="text-xs font-black text-germany-red">{progressPercent}%</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-gradient-to-r from-germany-black via-germany-red to-germany-gold h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-secondary text-center">
                <strong className="text-on-surface font-bold">{completedCount}</strong> von <strong className="text-on-surface font-bold">{totalCount}</strong> Lektionen absolviert
              </p>
              {isAllCompleted && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20 animate-pulse">
                  <span className="material-symbols-outlined text-[14px]">military_tech</span>
                  Lehrgang 100% abgeschlossen!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <aside className={`
          lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 z-30 transition-all duration-300
          ${isMobileMenuOpen 
            ? 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end p-4 lg:p-0 lg:static lg:bg-transparent lg:backdrop-blur-none' 
            : 'hidden lg:block'}
        `}>
          <div className="bg-surface-container-lowest rounded-3xl border border-surface-variant p-4 shadow-lg lg:shadow-sm max-h-[85vh] flex flex-col">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-germany-red">menu_book</span>
                <h2 className="font-bold text-sm tracking-wide text-on-surface">Inhaltsverzeichnis</h2>
              </div>
              <span className="text-[11px] font-semibold text-secondary px-2 py-0.5 rounded-full bg-surface-container-high">
                {trainingModules.length} Lektionen
              </span>
              {isMobileMenuOpen && (
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="lg:hidden p-1 rounded-lg text-secondary hover:text-on-surface"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
              <input
                type="text"
                placeholder="Thema, Regel, Suchwort..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-variant focus:outline-none focus:border-germany-red transition-colors text-on-surface placeholder:text-secondary/70"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Modules List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 hide-scrollbar">
              {filteredModules.map((mod) => {
                const isActive = mod.id === activeModuleId;
                const isCompleted = completedModules.includes(mod.id);

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod.id)}
                    className={`
                      w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-start gap-3 relative group
                      ${isActive 
                        ? 'bg-germany-red text-white shadow-md' 
                        : 'hover:bg-surface-container-low text-on-surface'}
                    `}
                  >
                    {/* Status Circle or Checkmark */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCompleted(mod.id);
                      }}
                      title={isCompleted ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
                      className={`
                        shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform active:scale-90 mt-0.5
                        ${isActive
                          ? (isCompleted ? 'bg-white text-germany-red' : 'border-2 border-white/60 text-white hover:border-white')
                          : (isCompleted ? 'bg-emerald-500 text-white' : 'border-2 border-surface-variant hover:border-germany-red text-transparent')}
                      `}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                      ) : (
                        <span className="text-[10px] font-bold text-secondary group-hover:text-germany-red">{mod.number}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-secondary'}`}>
                          {mod.badge}
                        </span>
                        <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-secondary'} flex items-center gap-0.5`}>
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {mod.readTime}
                        </span>
                      </div>
                      <h3 className={`text-xs sm:text-sm font-semibold truncate ${isActive ? 'text-white font-bold' : 'text-on-surface'}`}>
                        {mod.shortTitle}
                      </h3>
                    </div>
                  </button>
                );
              })}

              {filteredModules.length === 0 && (
                <div className="p-6 text-center text-xs text-secondary">
                  <span className="material-symbols-outlined text-3xl mb-1 text-secondary/50">search_off</span>
                  <p>Keine Lektion passend zu „{searchQuery}“ gefunden.</p>
                </div>
              )}
            </div>

            {/* Sidebar Bottom Banner */}
            <div className="pt-3 mt-3 border-t border-surface-variant flex items-center justify-between text-[11px] text-secondary">
              <span>Nicht herunterladbar</span>
              <span className="font-semibold text-germany-red">Plattform-Inhalt</span>
            </div>

          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-6">
          
          {/* Top Lesson Header Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-surface-variant shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-germany-red text-white text-xs font-bold">
                  {currentModule.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  {currentModule.readTime} Lesezeit
                </span>
              </div>

              {/* Mark as Completed Toggle Button */}
              <button
                onClick={() => handleToggleCompleted(currentModule.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95
                  ${isCurrentCompleted 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20' 
                    : 'bg-surface-container-high text-on-surface hover:bg-germany-red hover:text-white border border-surface-variant'}
                `}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCurrentCompleted ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                {isCurrentCompleted ? 'Lektion als gelesen markiert' : 'Als gelesen markieren'}
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight mb-3">
              {currentModule.title}
            </h2>
            <p className="text-sm md:text-base text-secondary leading-relaxed border-l-4 border-germany-red pl-4 py-1">
              {currentModule.summary}
            </p>
          </div>

          {/* DYNAMIC LESSON CONTENT (CONVERTED FROM PDF PAGES) */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 border border-surface-variant shadow-sm space-y-8">
            
            {/* MODULE 0: VORWORT */}
            {currentModule.id === 'vorwort' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Director's Personal Note */}
                <div className="bg-surface-container-low/70 rounded-3xl p-6 md:p-8 border border-surface-variant relative">
                  <div className="w-12 h-12 rounded-2xl bg-germany-red/10 text-germany-red flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">format_quote</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface mb-3">
                    {currentModule.content.salutation}
                  </h3>
                  <p className="text-sm md:text-base text-on-surface leading-relaxed mb-6 font-medium">
                    {currentModule.content.lead}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">
                    {currentModule.content.pillarsTitle}
                  </h4>

                  {/* 3 Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {currentModule.content.pillars.map((pillar, i) => (
                      <div 
                        key={i} 
                        className={`p-5 rounded-2xl border bg-gradient-to-b ${pillar.color} flex flex-col justify-between`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center mb-3 shadow-sm">
                          <span className="material-symbols-outlined text-[22px]">{pillar.icon}</span>
                        </div>
                        <div>
                          <h5 className="font-black text-base text-on-surface mb-1">{pillar.title}</h5>
                          <p className="text-xs text-secondary leading-relaxed">{pillar.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs md:text-sm text-secondary leading-relaxed italic border-t border-surface-variant pt-4">
                    {currentModule.content.closing}
                  </p>

                  {/* Signature */}
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-germany-red text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-surface">
                      FL
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase font-semibold">{currentModule.content.signature.role}</p>
                      <p className="text-base font-bold text-on-surface">{currentModule.content.signature.name}</p>
                      <p className="text-xs text-germany-gold font-medium">{currentModule.content.signature.school}</p>
                    </div>
                  </div>
                </div>

                {/* Impressum & School Info */}
                <div className="p-4 rounded-2xl bg-surface-container-high/50 border border-surface-variant text-xs text-secondary flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red text-[18px]">apartment</span>
                    <span><strong>Live-Sprachzentrum:</strong> {handbookMeta.location}</span>
                  </div>
                  <div>
                    <span>{handbookMeta.date}</span>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 1: PHILOSOPHIE */}
            {currentModule.id === 'philosophie' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Core Motto */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-germany-black via-germany-black/95 to-germany-black text-white shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-32 bg-germany-red/20 blur-2xl pointer-events-none"></div>
                  <span className="text-[11px] uppercase tracking-widest text-germany-gold font-black">Unser Leitgedanke</span>
                  <p className="text-lg md:text-xl font-bold mt-2 leading-relaxed">
                    „{currentModule.content.corePrinciple}“
                  </p>
                </div>

                {/* Why Monolingual? */}
                <section>
                  <h3 className="text-lg md:text-xl font-black text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">psychology</span>
                    {currentModule.content.reasonsTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentModule.content.reasons.map((r, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant hover:border-germany-red/40 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-germany-red/10 text-germany-red flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[22px]">{r.icon}</span>
                        </div>
                        <h4 className="font-bold text-base text-on-surface mb-1.5">{r.title}</h4>
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Classroom Rules */}
                <section>
                  <h3 className="text-lg md:text-xl font-black text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">rule</span>
                    {currentModule.content.classroomRulesTitle}
                  </h3>
                  <div className="space-y-3">
                    {currentModule.content.classroomRules.map((cr) => (
                      <div key={cr.step} className="p-4 rounded-2xl bg-surface-container-low border border-surface-variant flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-germany-red text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                          {cr.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-on-surface">{cr.rule}</h4>
                          <p className="text-xs sm:text-sm text-secondary mt-0.5">{cr.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Allowed Exceptions Alert */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-2 font-black text-sm mb-2 text-amber-800 dark:text-amber-300">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                    {currentModule.content.exceptions.title}
                  </div>
                  <p className="text-xs sm:text-sm font-medium mb-3">
                    {currentModule.content.exceptions.subtitle}
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-secondary dark:text-amber-100/90">
                    {currentModule.content.exceptions.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* First Hour Guide */}
                <section className="p-6 rounded-3xl bg-surface-container-low border border-surface-variant space-y-4">
                  <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">school</span>
                    {currentModule.content.firstHourIntro.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {currentModule.content.firstHourIntro.text}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                    {currentModule.content.firstHourIntro.steps.map((st) => (
                      <div key={st.num} className="p-4 rounded-xl bg-surface border border-surface-variant flex flex-col justify-between">
                        <div>
                          <div className="w-6 h-6 rounded-full bg-germany-black text-white text-xs font-bold flex items-center justify-center mb-2">
                            {st.num}
                          </div>
                          <h4 className="font-bold text-xs text-on-surface mb-1">{st.title}</h4>
                        </div>
                        <p className="text-[11px] text-secondary leading-snug">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Interactive Intonation Guide */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-lg md:text-xl font-black text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-gold">graphic_eq</span>
                      {currentModule.content.intonationGuide.title}
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-surface-container-high text-secondary font-semibold">
                      Interaktives Hörtraining
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary">
                    {currentModule.content.intonationGuide.explanation}
                  </p>

                  {/* 3 Melodies interactive display */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentModule.content.intonationGuide.melodies.map((m) => {
                      const isSel = selectedMelody === m.type;
                      return (
                        <div
                          key={m.type}
                          onClick={() => setSelectedMelody(m.type)}
                          className={`
                            p-5 rounded-2xl border cursor-pointer transition-all duration-200
                            ${m.color}
                            ${isSel ? 'ring-2 ring-germany-red shadow-md scale-[1.02]' : 'hover:opacity-90'}
                          `}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-3xl font-black">{m.arrow}</span>
                            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface">
                              {m.name}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-on-surface mb-1">{m.when}</h4>
                          <div className="space-y-1 mt-3 pt-3 border-t border-surface-variant/50">
                            {m.examples.map((ex, exIdx) => (
                              <p key={exIdx} className="text-xs font-mono font-medium text-on-surface">
                                {ex}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs sm:text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2">
                    <span className="material-symbols-outlined text-[20px] text-blue-600 dark:text-blue-300 shrink-0">info</span>
                    <span>{currentModule.content.intonationGuide.importantNote}</span>
                  </div>

                  {/* 7 Techniques */}
                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-3">
                    <h4 className="font-bold text-sm text-on-surface">
                      So üben wir die Intonation – ohne Übersetzung:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {currentModule.content.intonationGuide.techniques.map((t, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-surface border border-surface-variant">
                          <strong className="text-germany-red block mb-1 font-bold">{t.name}</strong>
                          <span className="text-secondary leading-relaxed">{t.desc}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-secondary italic pt-2 border-t border-surface-variant">
                      {currentModule.content.intonationGuide.reminder}
                    </p>
                  </div>
                </section>

              </div>
            )}

            {/* MODULE 2: DAS LEHRWERK */}
            {currentModule.id === 'lehrwerk' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  {currentModule.content.intro}
                </p>

                {/* Levels & Series Table */}
                <section>
                  <h3 className="text-lg font-black text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">view_list</span>
                    Niveaus und Bände im Überblick
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-surface-variant shadow-sm">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-germany-black text-white">
                        <tr>
                          <th className="p-3.5 font-bold">Niveau</th>
                          <th className="p-3.5 font-bold">Offizielles Lehrwerk</th>
                          <th className="p-3.5 font-bold">Bände</th>
                          <th className="p-3.5 font-bold">Stufe</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant bg-surface">
                        {currentModule.content.levelsTable.map((row, i) => (
                          <tr key={i} className="hover:bg-surface-container-low transition-colors">
                            <td className="p-3.5 font-black text-germany-red">{row.level}</td>
                            <td className="p-3.5 font-semibold text-on-surface">{row.series}</td>
                            <td className="p-3.5 font-mono text-secondary">{row.books}</td>
                            <td className="p-3.5 text-secondary">{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-secondary mt-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-germany-red text-[16px]">headphones</span>
                    {currentModule.content.mediaInfo}
                  </p>
                </section>

                {/* Lesson Structure (6 components) */}
                <section>
                  <h3 className="text-lg font-black text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">dashboard_customize</span>
                    Aufbau einer Lektion in Schritte plus Neu
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentModule.content.lessonStructure.map((comp, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-germany-red/10 text-germany-red flex items-center justify-center">
                              <span className="material-symbols-outlined text-[22px]">{comp.icon}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-surface-container-high text-secondary">
                              {comp.badge}
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-on-surface mb-1.5">{comp.part}</h4>
                          <p className="text-xs sm:text-sm text-secondary leading-relaxed">{comp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Principles */}
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">verified</span>
                    Unsere Grundsätze im Umgang mit dem Buch
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentModule.content.principles.map((pr, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant">
                        <div className="w-8 h-8 rounded-lg bg-germany-black text-white flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[18px]">{pr.icon}</span>
                        </div>
                        <h4 className="font-bold text-sm text-on-surface mb-1">{pr.title}</h4>
                        <p className="text-xs text-secondary leading-relaxed">{pr.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* MODULE 3: BEDEUTUNG ERKLÄREN OHNE ÜBERSETZUNG */}
            {currentModule.id === 'bedeutung-erklaeren' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  {currentModule.content.intro}
                </p>

                {/* Overview Matrix Table */}
                <section>
                  <h3 className="text-lg font-black text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">grid_view</span>
                    Überblick: Welche Technik für welches Wort?
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-surface-variant shadow-sm">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-surface-container-high text-on-surface">
                        <tr>
                          <th className="p-3.5 font-bold">Technik</th>
                          <th className="p-3.5 font-bold">Besonders geeignet für</th>
                          <th className="p-3.5 font-bold">Niveau</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant bg-surface">
                        {currentModule.content.overviewTable.map((row, i) => (
                          <tr key={i} className="hover:bg-surface-container-low transition-colors">
                            <td className="p-3.5 font-bold text-germany-red">{row.technique}</td>
                            <td className="p-3.5 text-on-surface">{row.suitable}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-secondary text-xs font-semibold">
                                {row.level}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 3.1: Synonyms & French cognates */}
                <section className="p-6 rounded-3xl bg-surface-container-low border border-surface-variant space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-on-surface">
                    3.1 Synonyme und gehobene Alternativen
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary">
                    Ein unbekanntes Wort wird durch ein bekanntes Wort mit gleicher oder ähnlicher Bedeutung erklärt. Ab B1 lernen die Teilnehmenden außerdem die gehobene oder formelle Variante eines bekannten Wortes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-surface border border-surface-variant text-xs">
                      <span className="font-bold text-on-surface">anfangen</span> <span className="text-germany-red font-black">=</span> <span className="text-secondary">beginnen</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface border border-surface-variant text-xs">
                      <span className="font-bold text-on-surface">bekommen</span> <span className="text-germany-gold font-bold">→ gehoben:</span> <span className="text-secondary">erhalten</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface border border-surface-variant text-xs">
                      <span className="font-bold text-on-surface">machen</span> <span className="text-germany-gold font-bold">→ gehoben:</span> <span className="text-secondary">durchführen, erledigen</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface border border-surface-variant text-xs">
                      <span className="font-bold text-on-surface">wichtig</span> <span className="text-germany-gold font-bold">→ gehoben:</span> <span className="text-secondary">bedeutend, wesentlich</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface border border-surface-variant text-xs sm:col-span-2">
                      <span className="font-bold text-on-surface">Ich habe keine Zeit.</span> <span className="text-germany-red font-black">=</span> <span className="text-secondary">Ich bin beschäftigt.</span>
                    </div>
                  </div>

                  {/* French Cognates Card */}
                  <div className="p-5 rounded-2xl bg-surface border border-surface-variant space-y-3">
                    <div className="flex items-center gap-2 text-sm font-black text-germany-red">
                      <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                      Unser Prinzip: Synonyme, die dem Französischen ähnlich sind
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Wo es möglich ist, wählen wir als Erklärung ein deutsches Synonym, das einem französischen Wort ähnelt. So erschließen die Lernenden die Bedeutung selbst – ohne Übersetzung – und lernen gleichzeitig zwei deutsche Wörter!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                      {[
                        { de: 'die Auskunft', syn: 'die Information', fr: "l'information" },
                        { de: 'die Anschrift', syn: 'die Adresse', fr: "l'adresse" },
                        { de: 'verbessern', syn: 'korrigieren', fr: 'corriger' },
                        { de: 'überprüfen', syn: 'kontrollieren', fr: 'contrôler' },
                        { de: 'besprechen', syn: 'diskutieren', fr: 'discuter' },
                        { de: 'buchen', syn: 'reservieren', fr: 'réserver' },
                        { de: 'die Lage', syn: 'die Situation', fr: 'la situation' },
                        { de: 'die Schwierigkeit', syn: 'das Problem', fr: 'le problème' },
                        { de: 'in Ordnung bringen', syn: 'reparieren', fr: 'réparer' },
                        { de: 'der Beruf', syn: 'die Profession', fr: 'la profession' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/70 flex items-center justify-between">
                          <span className="font-bold text-on-surface">{item.de}</span>
                          <span className="text-germany-red font-black">=</span>
                          <span className="text-secondary font-medium">{item.syn}</span>
                          <span className="text-[10px] text-secondary/60 italic">({item.fr})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3.2: Gegenteile & Temperature Scale */}
                <section className="p-6 rounded-3xl bg-surface-container-low border border-surface-variant space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-on-surface">
                    3.2 Gegenteile & Skalen
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
                    {[
                      { a: 'billig', b: 'teuer' },
                      { a: 'voll', b: 'leer' },
                      { a: 'ankommen', b: 'abfahren' },
                      { a: 'die Ausnahme', b: 'die Regel' },
                      { a: 'ehrlich', b: 'lügt' },
                    ].map((p, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-surface border border-surface-variant text-center">
                        <span className="font-bold text-on-surface block">{p.a}</span>
                        <span className="text-germany-red font-black my-0.5 block">↔︎</span>
                        <span className="text-secondary block">{p.b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skala visual */}
                  <div className="p-4 rounded-2xl bg-surface border border-surface-variant">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2">
                      Tipp: Die Skala an der Tafel
                    </span>
                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-semibold py-2 px-3 rounded-xl bg-gradient-to-r from-blue-500/20 via-yellow-500/20 to-red-500/20 border border-surface-variant">
                      <span className="text-blue-700 dark:text-blue-300">❄️ eiskalt</span>
                      <span>kalt</span>
                      <span className="text-secondary">kühl</span>
                      <span>warm</span>
                      <span className="text-red-700 dark:text-red-300">🔥 heiß</span>
                    </div>
                  </div>
                </section>

                {/* 3.3 to 3.6: Realia, Zeichnen, Mimik, Beispiele */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-2">
                    <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red text-[20px]">image</span>
                      3.3 Bilder & Realia
                    </h4>
                    <ul className="text-xs text-secondary space-y-1.5 list-disc list-inside">
                      <li>Die Foto-Hörgeschichte im Buch zuerst nutzen.</li>
                      <li>Bildkartei pro Niveau anlegen (funktioniert ohne Strom).</li>
                      <li>Echte Gegenstände mitbringen: Obst vom Markt, Fahrkarten.</li>
                      <li>Bezug herstellen: <em>Markt in Analakely</em> ↔ <em>Wochenmarkt in Deutschland</em>.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-2">
                    <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red text-[20px]">draw</span>
                      3.4 Skizzen an der Tafel
                    </h4>
                    <ul className="text-xs text-secondary space-y-1.5 list-disc list-inside">
                      <li>Positionen: Kasten und Ball für <em>in, auf, unter, neben, zwischen</em>.</li>
                      <li>Wege: Schneller Stadtplan mit Pfeilen.</li>
                      <li>Zeit: Zeitstrahl für Vergangenheit, Gegenwart und Zukunft.</li>
                      <li>Lernende selbst zeichnen lassen: „Zeichnen Sie das Dach!“</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-2">
                    <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red text-[20px]">accessibility_new</span>
                      3.5 Mimik & Gestik
                    </h4>
                    <ul className="text-xs text-secondary space-y-1.5 list-disc list-inside">
                      <li>Verben vorspielen: <em>trinken, schlafen, laufen, suchen</em>.</li>
                      <li>Feste Gesten: Hand hinter Ohr = <em>Hören Sie!</em></li>
                      <li>Daumen nach hinten = <em>Vergangenheit</em>.</li>
                      <li>Pantomime als Spiel: Lernender spielt vor, Klasse rät.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-2">
                    <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red text-[20px]">chat</span>
                      3.6 Beispiele & Kontext
                    </h4>
                    <ul className="text-xs text-secondary space-y-1.5 list-disc list-inside">
                      <li>Kurze Situationen: „Kurs beginnt um 8. Ich komme um 8 → pünktlich.“</li>
                      <li>Oberbegriff über Beispiele: „Tisch, Stuhl, Bett = Möbel.“</li>
                      <li>Einfache Definitionen ab A2: „Ein Bäcker macht Brot.“</li>
                    </ul>
                  </div>
                </div>

                {/* 3.7: Internationalismen & False Friends Warning */}
                <section className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-3">
                  <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-gold text-[20px]">public</span>
                    3.7 Internationalismen & Falsche Freunde
                  </h4>
                  <p className="text-xs text-secondary">
                    Wörter wie <em>das Hotel, die Universität, das Telefon, die Musik</em> und Verben auf <em>-ieren</em> geben sofort Sicherheit.
                  </p>

                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <span className="text-xs font-black text-red-700 dark:text-red-300 uppercase tracking-wider block mb-2">
                      ⚠️ Achtung: Falsche Freunde (Auf Plakat im Raum sammeln!)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-surface">
                        <strong className="text-on-surface block">das Gymnasium</strong>
                        <span className="text-secondary">Schule, kein Fitnessstudio / salle de sport!</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface">
                        <strong className="text-on-surface block">die Note</strong>
                        <span className="text-secondary">Schulnote (1–6), nicht nur Musiknote.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface">
                        <strong className="text-on-surface block">bekommen</strong>
                        <span className="text-secondary">recevoir (erhalten), NICHT devenir!</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface">
                        <strong className="text-on-surface block">der Chef</strong>
                        <span className="text-secondary">Vorgesetzter / patron, NICHT Koch!</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3.8 & 3.9: Word Building & Context Guessing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-2">
                    <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red text-[20px]">content_cut</span>
                      3.8 Wortbildung: Wörter zerlegen
                    </h4>
                    <p className="text-xs text-secondary leading-relaxed">
                      Zusammengesetzte Nomen an der Tafel zerlegen (<em>Kinder | zimmer</em>, <em>Bahn | hof</em>). Der Artikel kommt immer vom <strong>letzten Wort</strong>!
                    </p>
                    <p className="text-xs text-secondary leading-relaxed">
                      Vorsilben: <em>un- = nicht</em>. Nachsilben: <em>-in</em> (Lehrerin), <em>-ung</em> (Wohnung), <em>-bar</em> (essbar = kann gegessen werden).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-2">
                    <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red text-[20px]">psychology_alt</span>
                      3.9 Kontext erschließen (4 Schritte)
                    </h4>
                    <ol className="text-xs text-secondary space-y-1 list-decimal list-inside">
                      <li>Satz oder kurzen Text lesen / hören.</li>
                      <li>Fragen: Ding, Person oder Aktivität?</li>
                      <li>Hinweise im Satz suchen (Bilder, Bekanntes).</li>
                      <li>Vermutung prüfen – erst dann bestätigt die Lehrkraft.</li>
                    </ol>
                  </div>
                </div>

                {/* 3.10: The 6-Step In-Class Sequence */}
                <section className="p-6 rounded-3xl bg-gradient-to-br from-surface to-surface-container-low border-2 border-germany-red/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-germany-red text-white flex items-center justify-center font-bold text-sm">
                      ★
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-on-surface">
                      3.10 Die verbindliche Reihenfolge im Unterricht
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { n: 1, title: 'Zeigen', desc: 'Bild, Gegenstand, Geste oder Skizze' },
                      { n: 2, title: 'Verbinden', desc: 'Gegenteil oder Synonym aus bekanntem Wortschatz' },
                      { n: 3, title: 'Einbetten', desc: '2–3 Beispielsätze aus dem Alltag der Lernenden' },
                      { n: 4, title: 'Prüfen', desc: 'Verständnisfragen („Ist ein Elefant klein?“)' },
                      { n: 5, title: 'Festigen', desc: 'Wort mit Artikel & Farbe (blau/grün/rot) ins Vokabelheft' },
                      { n: 6, title: 'Notfall', desc: 'Erst nach 3 Fehlversuchen: Ein einziges Wort auf Französisch/Malagasy' },
                    ].map((step) => (
                      <div key={step.n} className="p-3.5 rounded-xl bg-surface border border-surface-variant flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-germany-black text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {step.n}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs text-on-surface">{step.title}</h4>
                          <p className="text-[11px] text-secondary mt-0.5 leading-snug">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* MODULE 4: ABLAUF EINER LEKTION */}
            {currentModule.id === 'ablauf-lektion' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  {currentModule.content.intro}
                </p>

                {/* 6 Phases Timeline */}
                <div className="space-y-4">
                  {currentModule.content.phases.map((ph) => (
                    <div 
                      key={ph.number}
                      className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col md:flex-row md:items-start gap-4 hover:border-germany-red/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 shrink-0 md:w-56">
                        <div className="w-10 h-10 rounded-xl bg-germany-red text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {ph.number}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block">{ph.badge}</span>
                          <span className="material-symbols-outlined text-germany-red text-[20px]">{ph.icon}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-base text-on-surface mb-2">{ph.name}</h4>
                        <ul className="text-xs sm:text-sm text-secondary space-y-1.5 list-disc list-inside">
                          {ph.items.map((it, idx) => (
                            <li key={idx} className="leading-relaxed">{it}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Speaking Time Ratio Rule */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-surface to-surface-container-low border-2 border-germany-red/40 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-germany-red/10 text-germany-red text-xs font-bold mb-2">
                      <span className="material-symbols-outlined text-[16px]">timer</span>
                      {currentModule.content.speakingTimeRule.title}
                    </div>
                    <p className="text-sm sm:text-base font-bold text-on-surface leading-snug mb-2">
                      {currentModule.content.speakingTimeRule.text}
                    </p>
                    <p className="text-xs text-secondary">
                      {currentModule.content.speakingTimeRule.highlight}
                    </p>
                  </div>

                  {/* Circular/Visual Ratio Graphic */}
                  <div className="shrink-0 flex items-center gap-4 bg-surface p-4 rounded-2xl border border-surface-variant">
                    <div className="text-center">
                      <span className="text-2xl font-black text-emerald-600 block">65%+</span>
                      <span className="text-[10px] uppercase font-bold text-secondary">Lernende</span>
                    </div>
                    <div className="h-8 w-px bg-surface-variant"></div>
                    <div className="text-center">
                      <span className="text-2xl font-black text-secondary block">&lt;35%</span>
                      <span className="text-[10px] uppercase font-bold text-secondary">Lehrkraft</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 5: GRAMMATIK EINSCHRACHIG */}
            {currentModule.id === 'grammatik' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Intro */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-variant text-sm font-semibold text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-germany-red text-2xl">auto_awesome</span>
                  <span>{currentModule.content.philosophy}</span>
                </div>

                {/* 5 Inductive Steps */}
                <section>
                  <h3 className="text-lg font-black text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">format_list_numbered</span>
                    Die 5 Schritte beim einsprachigen Entdecken
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {currentModule.content.inductiveSteps.map((s) => (
                      <div key={s.step} className="p-4 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col justify-between">
                        <div>
                          <span className="w-7 h-7 rounded-full bg-germany-black text-white text-xs font-bold flex items-center justify-center mb-2">
                            {s.step}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-on-surface mb-1">{s.title}</h4>
                        </div>
                        <p className="text-[11px] text-secondary leading-snug">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Visual Aids (Articles colors, Satzklammer, Zeitstrahl) */}
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">palette</span>
                    Visuelle Hilfen statt Fachsprache
                  </h3>

                  {/* Article Color Code */}
                  <div className="p-5 rounded-3xl bg-surface-container-low border border-surface-variant space-y-3">
                    <h4 className="font-bold text-sm text-on-surface">
                      Verbindliche Farbcodierung der Artikel (Schulweiter Standard):
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {currentModule.content.visualAids[0].items.map((art, i) => (
                        <div key={i} className={`p-4 rounded-2xl ${art.bgClass} text-center shadow-sm`}>
                          <span className="text-xl sm:text-2xl font-black block tracking-wide">{art.article}</span>
                          <span className="text-xs uppercase font-semibold opacity-90">{art.colorName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Satzklammer and Gestures */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant">
                      <h4 className="font-bold text-sm text-on-surface mb-2">Satzklammer</h4>
                      <p className="text-xs text-secondary mb-3">Verbteile in zwei Kästchen, der Rest dazwischen:</p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                        <span className="px-2 py-1 rounded bg-germany-red/10 text-germany-red border border-germany-red/30">Ich rufe</span>
                        <span className="px-2 py-1 rounded bg-surface border border-surface-variant">dich morgen</span>
                        <span className="px-2 py-1 rounded bg-germany-red/10 text-germany-red border border-germany-red/30">an.</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant">
                      <h4 className="font-bold text-sm text-on-surface mb-2">Zeitstrahl</h4>
                      <p className="text-xs text-secondary mb-3">Lineare Visualisierung von Tempora:</p>
                      <div className="flex items-center justify-between text-[11px] font-bold text-secondary bg-surface p-2 rounded-xl border border-surface-variant">
                        <span>Vergangenheit</span>
                        <span>➔</span>
                        <span className="text-germany-red">Jetzt</span>
                        <span>➔</span>
                        <span>Zukunft</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant">
                      <h4 className="font-bold text-sm text-on-surface mb-2">Gesten & Wandtabellen</h4>
                      <p className="text-xs text-secondary leading-relaxed">
                        Daumen nach hinten = Vergangenheit. Beide Hände als Klammer = trennbare Verben. Feste Deklinationstabellen an der Wand.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 7-Step Strategy: Interactive Relativsatz Builder */}
                <section className="p-6 rounded-3xl bg-surface-container-low border border-surface-variant space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-on-surface">
                        {currentModule.content.sevenStepsStrategy.title}
                      </h3>
                      <p className="text-xs text-secondary">
                        {currentModule.content.sevenStepsStrategy.intro}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-germany-red text-white font-bold">
                      Praxisbeispiel: Relativsatz
                    </span>
                  </div>

                  {/* Starting sentences */}
                  <div className="p-3.5 rounded-xl bg-surface border border-surface-variant flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-on-surface">{currentModule.content.sevenStepsStrategy.sentence1}</span>
                    <span className="font-bold text-on-surface">{currentModule.content.sevenStepsStrategy.sentence2}</span>
                  </div>

                  {/* Interactive Step Carousel */}
                  <div className="p-5 rounded-2xl bg-surface border border-surface-variant space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-germany-red uppercase tracking-wider">
                        Schritt {relativStep} von 7
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          disabled={relativStep <= 1}
                          onClick={() => setRelativStep(s => Math.max(1, s - 1))}
                          className="w-7 h-7 rounded-lg border border-surface-variant flex items-center justify-center disabled:opacity-30 hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        </button>
                        <button
                          disabled={relativStep >= 7}
                          onClick={() => setRelativStep(s => Math.min(7, s + 1))}
                          className="w-7 h-7 rounded-lg border border-surface-variant flex items-center justify-center disabled:opacity-30 hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    {/* Step details */}
                    {(() => {
                      const st = currentModule.content.sevenStepsStrategy.steps[relativStep - 1];
                      return (
                        <div className="space-y-2">
                          <h4 className="font-black text-sm sm:text-base text-on-surface">
                            {st.num}. {st.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                            {st.desc}
                          </p>
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm font-mono font-bold text-emerald-800 dark:text-emerald-300">
                            Ergebnis: {st.result}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Stepper buttons indicator */}
                    <div className="flex items-center justify-between gap-1 pt-2">
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <button
                          key={num}
                          onClick={() => setRelativStep(num)}
                          className={`
                            flex-1 py-1 text-xs font-bold rounded-lg transition-all
                            ${relativStep === num 
                              ? 'bg-germany-red text-white shadow-sm' 
                              : 'bg-surface-container-high text-secondary hover:text-on-surface'}
                          `}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200">
                    <strong className="block mb-1 font-bold">Wichtige Regel für Schritt 5:</strong>
                    {currentModule.content.sevenStepsStrategy.pronounRules}
                  </div>
                </section>

              </div>
            )}

            {/* MODULE 6: UNTERRICHTSSPRACHE & REDEMITTEL */}
            {currentModule.id === 'unterrichtssprache' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  {currentModule.content.intro}
                </p>

                {/* For Teachers */}
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">school</span>
                    Für die Lehrkraft (Klassenführung auf Deutsch)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentModule.content.teacherPhrases.map((cat, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-sm text-on-surface flex items-center gap-2">
                              <span className="material-symbols-outlined text-germany-red text-[18px]">{cat.icon}</span>
                              {cat.situation}
                            </span>
                            <span className="text-[10px] text-secondary font-semibold">Lehrer</span>
                          </div>
                          <div className="space-y-1.5">
                            {cat.phrases.map((phrase, pIdx) => (
                              <div 
                                key={pIdx} 
                                onClick={() => handleCopy(phrase)}
                                className="group p-2 rounded-xl bg-surface border border-surface-variant/70 text-xs font-medium text-on-surface flex items-center justify-between cursor-pointer hover:border-germany-red transition-all"
                              >
                                <span>{phrase}</span>
                                <span className="material-symbols-outlined text-[16px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                                  {copiedPhrase === phrase ? 'check' : 'content_copy'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* For Students */}
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-gold">groups</span>
                    Für die Lernenden (Redemittel für Rückfragen)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentModule.content.studentPhrases.map((cat, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-sm text-on-surface flex items-center gap-2">
                              <span className="material-symbols-outlined text-germany-gold text-[18px]">{cat.icon}</span>
                              {cat.situation}
                            </span>
                            <span className="text-[10px] text-secondary font-semibold">Lernende</span>
                          </div>
                          <div className="space-y-1.5">
                            {cat.phrases.map((phrase, pIdx) => (
                              <div 
                                key={pIdx} 
                                onClick={() => handleCopy(phrase)}
                                className="group p-2 rounded-xl bg-surface border border-surface-variant/70 text-xs font-medium text-on-surface flex items-center justify-between cursor-pointer hover:border-germany-gold transition-all"
                              >
                                <span>{phrase}</span>
                                <span className="material-symbols-outlined text-[16px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                                  {copiedPhrase === phrase ? 'check' : 'content_copy'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Progression from A2 & B1 */}
                <div className="p-4 rounded-2xl bg-surface-container-high text-xs sm:text-sm text-secondary font-medium">
                  {currentModule.content.progressionNote}
                </div>

              </div>
            )}

            {/* MODULE 7: FEHLERKORREKTUR UND FEEDBACK */}
            {currentModule.id === 'fehlerkorrektur' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-variant text-sm font-semibold text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-germany-red text-2xl">favorite</span>
                  <span>{currentModule.content.philosophy}</span>
                </div>

                {/* Oral Correction Grid */}
                <section>
                  <h3 className="text-lg font-black text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">record_voice_over</span>
                    {currentModule.content.oralCorrection.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentModule.content.oralCorrection.points.map((pt, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-germany-red/10 text-germany-red flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{pt.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-on-surface mb-1">{pt.situation}</h4>
                          <p className="text-xs sm:text-sm text-secondary leading-relaxed">{pt.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Written Correction Symbols */}
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">edit_note</span>
                    {currentModule.content.writtenCorrection.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary">
                    {currentModule.content.writtenCorrection.subtitle}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {currentModule.content.writtenCorrection.symbols.map((sym, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col justify-between items-center text-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg mb-2 shadow-sm ${sym.badgeClass}`}>
                          {sym.symbol}
                        </div>
                        <h4 className="font-bold text-xs text-on-surface leading-snug mb-1">{sym.meaning}</h4>
                        <p className="text-[10px] text-secondary leading-tight">{sym.example}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant text-xs sm:text-sm text-secondary leading-relaxed space-y-2">
                    <p>{currentModule.content.writtenCorrection.procedure}</p>
                  </div>
                </section>

              </div>
            )}

            {/* MODULE 8: PRAKTISCHES IM SCHULALLTAG */}
            {currentModule.id === 'schulalltag' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Power Outage in Madagascar (Plan B) */}
                <section className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                  <div className="flex items-center gap-2 font-black text-base text-amber-800 dark:text-amber-300">
                    <span className="material-symbols-outlined text-2xl">flash_off</span>
                    {currentModule.content.powerOutage.title}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200">
                    {currentModule.content.powerOutage.lead}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentModule.content.powerOutage.rules.map((rule, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-variant">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2">
                          <span className="material-symbols-outlined text-[18px]">{rule.icon}</span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-on-surface mb-1">{rule.title}</h4>
                        <p className="text-xs text-secondary leading-relaxed">{rule.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Media & Platforms */}
                <section>
                  <h3 className="text-lg font-black text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">devices</span>
                    {currentModule.content.mediaPlatforms.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentModule.content.mediaPlatforms.platforms.map((p, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-germany-red/10 text-germany-red flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-on-surface">{p.name}</h4>
                          <p className="text-xs sm:text-sm text-secondary mt-1 leading-relaxed">{p.purpose}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Copyright Notice */}
                <div className="p-5 rounded-2xl bg-surface-container-high border border-surface-variant text-xs sm:text-sm text-secondary leading-relaxed flex items-start gap-3">
                  <span className="material-symbols-outlined text-germany-red text-[22px] shrink-0">copyright</span>
                  <div>
                    <strong className="text-on-surface block mb-1 font-bold">{currentModule.content.copyright.title}</strong>
                    <span>{currentModule.content.copyright.text}</span>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 9: CHECKLISTE & MUSTERSTUNDE */}
            {currentModule.id === 'checkliste-musterstunde' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Interactive Checklist */}
                <section className="p-6 rounded-3xl bg-surface-container-low border border-surface-variant space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-germany-red">checklist</span>
                        Checkliste für jede Unterrichtsvorbereitung
                      </h3>
                      <p className="text-xs text-secondary mt-0.5">
                        Interaktiv abhaken vor jedem Kurs – Ihr Fortschritt wird automatisch gespeichert!
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCompleteAllChecklist(currentModule.content.checklistItems)}
                        className="text-xs font-bold text-germany-red hover:underline px-2 py-1"
                      >
                        Alle ankreuzen
                      </button>
                      <button
                        onClick={handleResetChecklist}
                        className="text-xs text-secondary hover:text-on-surface px-2 py-1"
                      >
                        Leeren
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {currentModule.content.checklistItems.map((item) => {
                      const isChecked = !!checklistState[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleChecklistItem(item.id)}
                          className={`
                            p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all duration-200
                            ${isChecked 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-on-surface' 
                              : 'bg-surface border-surface-variant hover:border-germany-red/40'}
                          `}
                        >
                          <div className={`
                            w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors
                            ${isChecked ? 'bg-emerald-500 text-white' : 'border-2 border-secondary/40'}
                          `}>
                            {isChecked && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                          </div>
                          <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-secondary' : 'text-on-surface'}`}>
                            {item.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* 90-Minute Sample Lesson */}
                <section className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-germany-red">schedule</span>
                      {currentModule.content.sampleLesson.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary">
                      {currentModule.content.sampleLesson.subtitle}
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-surface-variant shadow-sm">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-germany-black text-white">
                        <tr>
                          <th className="p-3.5 font-bold">Zeit</th>
                          <th className="p-3.5 font-bold">Phase</th>
                          <th className="p-3.5 font-bold">Was passiert?</th>
                          <th className="p-3.5 font-bold">Technik ohne Übersetzung</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant bg-surface">
                        {currentModule.content.sampleLesson.phases.map((ph, idx) => (
                          <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                            <td className="p-3.5 font-mono font-bold text-germany-red whitespace-nowrap">
                              {ph.time}
                            </td>
                            <td className="p-3.5 font-bold text-on-surface whitespace-nowrap">
                              {ph.phase}
                            </td>
                            <td className="p-3.5 text-on-surface leading-snug">
                              {ph.activity}
                            </td>
                            <td className="p-3.5 text-secondary font-medium">
                              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-xs">
                                {ph.technique}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 rounded-2xl bg-germany-red/10 border border-germany-red/30 text-xs sm:text-sm text-germany-red font-medium">
                    ⚠️ {currentModule.content.sampleLesson.goldenRule}
                  </div>
                </section>

              </div>
            )}

            {/* MODULE 10: ANHANG - ÜBLICHE AUSDRÜCKE */}
            {currentModule.id === 'uebliche-ausdruecke' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Header Poster Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-germany-black to-zinc-900 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-germany-gold font-black">
                      {currentModule.content.header}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black mt-1">
                      Das offizielle Redemittel-Plakat für Klassenraum & Unterricht
                    </h3>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-germany-red text-white text-xs font-bold">
                      A1 Standard
                    </span>
                  </div>
                </div>

                {/* Intonation Legend (Arrows ↗ and ↘) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentModule.content.intonationSummary.map((item, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border ${item.badgeClass} flex items-start gap-3`}>
                      <span className="text-3xl font-black">{item.arrow}</span>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base">{item.direction}</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Categories Table/Cards */}
                <div className="space-y-6">
                  {currentModule.content.categories.map((cat, cIdx) => (
                    <div key={cIdx} className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-3">
                      <div className="flex items-center gap-2 font-black text-sm text-on-surface">
                        <span className="material-symbols-outlined text-germany-red text-[20px]">{cat.icon}</span>
                        <span>{cat.category}</span>
                      </div>

                      <div className="divide-y divide-surface-variant rounded-xl border border-surface-variant bg-surface overflow-hidden">
                        {cat.items.map((it, itIdx) => (
                          <div 
                            key={itIdx} 
                            onClick={() => handleCopy(it.expression)}
                            className="p-3 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface-container-low transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-sm ${it.arrow === '↗' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-red-500/20 text-red-600'}`}>
                                {it.arrow}
                              </span>
                              <span className="font-bold text-on-surface">{it.expression}</span>
                            </div>

                            <div className="flex items-center gap-2 text-secondary font-mono text-xs">
                              {it.relation && <span>{it.relation}</span>}
                              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                                {copiedPhrase === it.expression ? 'check' : 'content_copy'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Golden Tip */}
                <div className="p-4 rounded-2xl bg-germany-gold/15 border border-germany-gold/40 text-xs sm:text-sm text-yellow-950 dark:text-yellow-200 font-medium">
                  💡 {currentModule.content.intonationProTip}
                </div>

              </div>
            )}

          </div>

          {/* Bottom Navigation & Completion Controls */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Previous Module Button */}
            {prevModule ? (
              <button
                onClick={() => handleSelectModule(prevModule.id)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-surface-variant bg-surface text-on-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low hover:border-germany-red transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <div className="text-left">
                  <span className="text-[10px] text-secondary uppercase block font-semibold">Zurück</span>
                  <span className="line-clamp-1">{prevModule.shortTitle}</span>
                </div>
              </button>
            ) : <div className="hidden sm:block"></div>}

            {/* Center: Completion Toggle Button */}
            <button
              onClick={() => handleToggleCompleted(currentModule.id)}
              className={`
                w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md
                ${isCurrentCompleted 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-germany-red text-white hover:bg-red-700'}
              `}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isCurrentCompleted ? 'check_circle' : 'task_alt'}
              </span>
              <span>{isCurrentCompleted ? 'Als gelesen markiert ✓' : 'Lektion abschließen'}</span>
            </button>

            {/* Next Module Button */}
            {nextModule ? (
              <button
                onClick={() => handleSelectModule(nextModule.id)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-surface-variant bg-surface text-on-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low hover:border-germany-red transition-all"
              >
                <div className="text-right">
                  <span className="text-[10px] text-secondary uppercase block font-semibold">Weiter</span>
                  <span className="line-clamp-1">{nextModule.shortTitle}</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={() => handleSelectModule(trainingModules[0].id)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-germany-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Zurück zum Anfang</span>
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            )}

          </div>

          {/* Certificate / Completion Modal or Card if 100% finished */}
          {isAllCompleted && (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-germany-gold/20 via-surface-container-lowest to-surface-container-low border-2 border-germany-gold shadow-lg text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-germany-gold text-germany-black flex items-center justify-center mx-auto text-3xl shadow-md">
                🎓
              </div>
              <h3 className="text-2xl font-black text-on-surface tracking-tight">
                Herzlichen Glückwunsch!
              </h3>
              <p className="text-sm md:text-base text-secondary max-w-xl mx-auto leading-relaxed">
                Sie haben alle 11 Module des <strong className="text-on-surface">Lehrerhandbuchs Live-Sprachzentrum</strong> erfolgreich durchgearbeitet.
                Sie sind bestens vorbereitet, um Deutsch auf Deutsch mit den Lehrwerken des Hueber Verlags zu unterrichten!
              </p>
              <div className="text-xs text-secondary italic">
                „Für einen lebendigen, einsprachigen und erfolgreichen Unterricht.“ – Ihre Direktorin, Frau Loïsa
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
