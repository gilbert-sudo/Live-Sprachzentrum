import React, { useState, useRef, useEffect } from 'react';
import ExerciseRenderer from './ExerciseRenderer';
import AudioPlayer from './AudioPlayer';

export default function InteractivePdfViewer({ lesson }) {
  const [activeTab, setActiveTab] = useState('exercises');
  const [activeAudio, setActiveAudio] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const audioSections = lesson.sections?.filter(s => s.type === 'audio') || [];
  const exerciseSections = lesson.sections?.filter(s => s.type === 'exercise') || [];

  const [minZoom, setMinZoom] = useState(100);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const updateMinZoom = () => {
      // 768px is the md breakpoint for Tailwind
      const newMinZoom = window.innerWidth < 768 ? 100 : 75;
      setMinZoom(newMinZoom);
      setZoom(prev => Math.max(prev, newMinZoom));
    };
    updateMinZoom(); // Initial check
    window.addEventListener('resize', updateMinZoom);
    return () => window.removeEventListener('resize', updateMinZoom);
  }, []);
  
  // Drag to pan state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 400));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, minZoom));
  const handleResetZoom = () => setZoom(100);
  const handleFitWidth = () => setZoom(100);

  // Wheel to zoom (Ctrl + scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setZoom(prev => Math.min(prev + 10, 400));
        } else {
          setZoom(prev => Math.max(prev - 10, minZoom));
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [minZoom]);

  // Touch pinch to zoom handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastDistance = null;

    const getDistance = (touches) => {
      return Math.hypot(
        touches[0].pageX - touches[1].pageX,
        touches[0].pageY - touches[1].pageY
      );
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        lastDistance = getDistance(e.touches);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && lastDistance !== null) {
        e.preventDefault(); // Prevent default browser zoom/scroll
        const currentDistance = getDistance(e.touches);
        const delta = currentDistance - lastDistance;
        
        const zoomDelta = delta * 0.5; // Sensitivity
        
        setZoom(prev => Math.min(Math.max(prev + zoomDelta, minZoom), 400));
        lastDistance = currentDistance;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        lastDistance = null;
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [minZoom]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; 
    const walkY = (y - startY) * 1.5; 
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden relative bg-surface-container-lowest">
      
      {/* Image Controls Toolbar */}
      {lesson.imageUrl && (
        <div 
          className={`absolute top-2 left-1/2 -translate-x-1/2 z-30 inline-flex items-center justify-center gap-1 bg-surface/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-xl border border-surface-variant transition-transform duration-300 ${isPanelOpen ? 'md:-translate-x-[calc(50%+12rem)]' : ''}`}
        >
          <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="Verkleinern">
            <span className="material-symbols-outlined text-[24px]">zoom_out</span>
          </button>
          
          <span className="font-label-md min-w-[5ch] text-center font-bold text-on-surface text-base">{Math.round(zoom)}%</span>
          
          <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="Vergrößern">
            <span className="material-symbols-outlined text-[24px]">zoom_in</span>
          </button>
          
          <div className="w-[2px] h-5 bg-surface-variant mx-1 rounded-full"></div>
          
          <button onClick={handleFitWidth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="An Breite anpassen">
            <span className="material-symbols-outlined text-[24px]">width_full</span>
          </button>

          <button onClick={handleResetZoom} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="Zurücksetzen (100%)">
            <span className="material-symbols-outlined text-[24px]">restart_alt</span>
          </button>
        </div>
      )}

      {/* Document View (Main Area) */}
      <div 
        ref={containerRef}
        className={`flex-1 h-full overflow-y-auto overflow-x-auto bg-surface-container-low transition-all duration-300 relative ${isPanelOpen ? 'md:pr-[30rem] lg:pr-[36rem]' : 'md:pr-20 lg:pr-28'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >

        {lesson.imageUrl ? (
          <div className="min-h-full min-w-full p-8 mt-12 md:mt-0 text-center">
            <img 
              ref={imageRef}
              src={lesson.imageUrl} 
              alt={lesson.title} 
              draggable="false"
              style={{ 
                width: `${zoom}%`, 
                maxWidth: 'none',
                height: 'auto',
                transition: isDragging ? 'none' : 'width 0.2s ease-out'
              }}
              className="inline-block shadow-xl rounded-md border border-surface-variant"
            />
          </div>
        ) : (
          <object 
            data={`${lesson.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`} 
            type="application/pdf"
            className="w-full h-full border-0"
          >
            <embed 
              src={`${lesson.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`} 
              type="application/pdf" 
              className="w-full h-full border-0" 
            />
          </object>
        )}
      </div>

      {/* Vertical Toggle Toolbar for Panel */}
      {!isPanelOpen && (
        <div className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 bg-germany-red/95 backdrop-blur-xl p-1.5 rounded-full shadow-lg shadow-germany-red/40 border border-white/20">
          <button 
            onClick={() => { setActiveTab('audio'); setIsPanelOpen(true); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
            title="Audios"
          >
            <span className="material-symbols-outlined text-[20px]">headphones</span>
          </button>
          <button 
            onClick={() => { setActiveTab('exercises'); setIsPanelOpen(true); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
            title="Übungen"
          >
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
          </button>
          <button 
            onClick={() => { setActiveTab('vocab'); setIsPanelOpen(true); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
            title="Schwere Vokabeln"
          >
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </button>
          <button 
            onClick={() => { setActiveTab('info'); setIsPanelOpen(true); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
            title="Info"
          >
            <span className="material-symbols-outlined text-[20px]">info</span>
          </button>
        </div>
      )}

      {/* Interactive Sidebar Panel */}
      <div className={`absolute right-0 top-0 bottom-0 w-full md:w-[30rem] lg:w-[36rem] bg-surface-container-low shadow-2xl border-l border-surface-variant transform transition-transform duration-300 z-40 flex flex-col ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Panel Header */}
        <div className="p-6 pb-0 pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-on-surface">Werkzeuge & Übungen</h2>
            <button 
              onClick={() => setIsPanelOpen(false)}
              className="bg-germany-red text-white p-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
              title="Panel schließen"
            >
              <span className="material-symbols-outlined font-bold text-[24px]">close</span>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-surface-variant mb-6 overflow-x-auto gap-1 pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <button 
              className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activeTab === 'audio' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
              onClick={() => setActiveTab('audio')}
            >
              <span className="material-symbols-outlined align-middle mr-1 text-[18px]">headphones</span>
              Audios
            </button>
            <button 
              className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activeTab === 'exercises' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
              onClick={() => setActiveTab('exercises')}
            >
              <span className="material-symbols-outlined align-middle mr-1 text-[18px]">edit_note</span>
              Übungen
            </button>
            <button 
              className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activeTab === 'vocab' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
              onClick={() => setActiveTab('vocab')}
            >
              <span className="material-symbols-outlined align-middle mr-1 text-[18px]">menu_book</span>
              Vokabeln
            </button>
            <button 
              className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
              onClick={() => setActiveTab('info')}
            >
              <span className="material-symbols-outlined align-middle mr-1 text-[18px]">info</span>
              Info
            </button>
          </div>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-0">
          {activeTab === 'audio' && (
            <div className="space-y-3 md:space-y-4">
              {audioSections.length === 0 && (
                <p className="text-secondary font-body-sm md:font-body-md text-center py-6 md:py-8">Keine Audios für diese Lektion.</p>
              )}
              {audioSections.map((audio, idx) => (
                <div key={idx} className="bg-surface p-3 md:p-4 rounded-xl shadow-sm border border-surface-variant/50">
                  <h3 className="font-title-sm text-on-surface mb-1 md:mb-2 line-clamp-2">{audio.title}</h3>
                  <div className="flex items-center justify-between mt-2 md:mt-4">
                    <span className="font-label-sm text-secondary">{audio.duration}</span>
                    <button 
                      onClick={() => setActiveAudio({ url: audio.audioUrl, title: audio.title })}
                      className="flex items-center gap-1 bg-germany-red text-white px-3 py-1.5 md:px-4 rounded-full font-label-sm hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[16px] md:text-[18px]">play_arrow</span>
                      Abspielen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exercises' && (
            <div className="space-y-2 md:space-y-4 pb-2 md:pb-4">
              {exerciseSections.length === 0 && (
                <p className="text-secondary font-body-sm md:font-body-md text-center py-2 md:py-4">Keine Übungen für diese Lektion.</p>
              )}
              {exerciseSections.map((ex, idx) => (
                <div key={idx} className="bg-surface rounded-lg shadow-sm border border-surface-variant/50 overflow-hidden">
                  <ExerciseRenderer exercise={ex} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vocab' && (
            <div className="space-y-3 md:space-y-4 pb-6 md:pb-12">
              {lesson.vocab && lesson.vocab.length > 0 ? (
                <div className="bg-surface p-4 md:p-6 rounded-xl shadow-sm border border-surface-variant/50">
                  <div className="text-center mb-6">
                    <span className="material-symbols-outlined text-[40px] md:text-[48px] text-surface-variant mb-2 md:mb-4 block">menu_book</span>
                    <h3 className="font-title-sm md:font-title-md text-on-surface mb-1 md:mb-2">Schwere Vokabeln</h3>
                    <p className="text-secondary font-body-xs md:font-body-sm">Wichtige Begriffe aus der Lektion</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lesson.vocab.map((v, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-surface-variant">
                        <span className="font-label-md text-on-surface">{v.word}</span>
                        <span className="font-body-sm text-secondary italic">{v.translation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-surface p-4 md:p-6 rounded-xl shadow-sm border border-surface-variant/50 text-center">
                  <span className="material-symbols-outlined text-[40px] md:text-[48px] text-surface-variant mb-2 md:mb-4 block">menu_book</span>
                  <h3 className="font-title-sm md:font-title-md text-on-surface mb-1 md:mb-2">Schwere Vokabeln</h3>
                  <p className="text-secondary font-body-xs md:font-body-sm">Die Vokabeln für diese Lektion stehen bald zur Verfügung.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-3 md:space-y-4 pb-6 md:pb-12">
              {lesson.info ? (
                <div className="bg-surface p-4 md:p-6 rounded-xl shadow-sm border border-surface-variant/50 text-left">
                  <div className="text-center mb-6">
                    <span className="material-symbols-outlined text-[40px] md:text-[48px] text-surface-variant mb-2 md:mb-4 block">info</span>
                    <h3 className="font-title-sm md:font-title-md text-on-surface mb-1 md:mb-2">Lektionsinfo</h3>
                    <p className="text-secondary font-body-xs md:font-body-sm">{lesson.title}</p>
                  </div>
                  <div className="space-y-4 text-on-surface font-body-sm md:font-body-md">
                    <p>{lesson.info.description}</p>
                    
                    {lesson.info.goals && lesson.info.goals.length > 0 && (
                      <>
                        <h4 className="font-label-lg mt-4 text-germany-red">Lernziele & Themen:</h4>
                        <ul className="list-disc pl-5 space-y-2 text-secondary">
                          {lesson.info.goals.map((goal, i) => (
                            <li key={i}>{goal.includes(':') ? <><strong className="text-on-surface">{goal.split(':')[0]}:</strong>{goal.split(':')[1]}</> : goal}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {lesson.info.tip && (
                      <div className="mt-6 p-4 bg-germany-gold/10 rounded-lg border border-germany-gold/30">
                        <h4 className="font-label-md text-germany-gold-dark mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                          Tipp für den Alltag
                        </h4>
                        <p className="text-sm">{lesson.info.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-surface p-4 md:p-6 rounded-xl shadow-sm border border-surface-variant/50 text-center">
                  <span className="material-symbols-outlined text-[40px] md:text-[48px] text-surface-variant mb-2 md:mb-4 block">info</span>
                  <h3 className="font-title-sm md:font-title-md text-on-surface mb-1 md:mb-2">Lektionsinfo</h3>
                  <p className="text-secondary font-body-xs md:font-body-sm">Weitere Informationen zur Lektion folgen in Kürze.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Global Audio Player */}
      {activeAudio && (
        <AudioPlayer 
          audioUrl={activeAudio.url} 
          title={activeAudio.title} 
          onClose={() => setActiveAudio(null)}
        />
      )}
    </div>
  );
}
