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
  }, []);

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
          className={`absolute top-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center justify-center gap-2 bg-surface/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-surface-variant transition-transform duration-300 ${isPanelOpen ? 'md:-translate-x-[calc(50%+12rem)]' : ''}`}
        >
          <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="Verkleinern">
            <span className="material-symbols-outlined text-[20px]">zoom_out</span>
          </button>
          
          <span className="font-label-md min-w-[5ch] text-center font-bold text-on-surface">{zoom}%</span>
          
          <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="Vergrößern">
            <span className="material-symbols-outlined text-[20px]">zoom_in</span>
          </button>
          
          <div className="w-[2px] h-6 bg-surface-variant mx-1 rounded-full"></div>
          
          <button onClick={handleFitWidth} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="An Breite anpassen">
            <span className="material-symbols-outlined text-[20px]">width_full</span>
          </button>

          <button onClick={handleResetZoom} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors" title="Zurücksetzen (100%)">
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          </button>
        </div>
      )}

      {/* Document View (Main Area) */}
      <div 
        ref={containerRef}
        className={`flex-1 h-full overflow-y-auto overflow-x-auto bg-surface-container-low transition-all duration-300 relative ${isPanelOpen ? 'md:pr-96' : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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

      {/* Toggle Button for Panel */}
      {!isPanelOpen && (
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-4 right-4 z-20 bg-primary text-on-primary p-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span className="material-symbols-outlined">menu_open</span>
          <span className="font-label-md hidden md:block pr-2">Interaktive Tools</span>
        </button>
      )}

      {/* Interactive Sidebar Panel */}
      <div className={`absolute right-0 top-0 bottom-0 w-full md:w-96 bg-surface-container-low shadow-2xl border-l border-surface-variant transform transition-transform duration-300 z-40 flex flex-col ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
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
          <div className="flex border-b border-surface-variant mb-6">
            <button 
              className={`flex-1 pb-3 text-center font-title-sm transition-colors border-b-2 ${activeTab === 'audio' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
              onClick={() => setActiveTab('audio')}
            >
              <span className="material-symbols-outlined align-middle mr-2 text-[20px]">headphones</span>
              Audios
            </button>
            <button 
              className={`flex-1 pb-3 text-center font-title-sm transition-colors border-b-2 ${activeTab === 'exercises' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
              onClick={() => setActiveTab('exercises')}
            >
              <span className="material-symbols-outlined align-middle mr-2 text-[20px]">edit_note</span>
              Übungen
            </button>
          </div>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 pt-0">
          {activeTab === 'audio' && (
            <div className="space-y-4">
              {audioSections.length === 0 && (
                <p className="text-secondary font-body-md text-center py-8">Keine Audios für diese Lektion.</p>
              )}
              {audioSections.map((audio, idx) => (
                <div key={idx} className="bg-surface p-4 rounded-xl shadow-sm border border-surface-variant/50">
                  <h3 className="font-title-sm text-on-surface mb-2">{audio.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-label-sm text-secondary">{audio.duration}</span>
                    <button 
                      onClick={() => setActiveAudio({ url: audio.audioUrl, title: audio.title })}
                      className="flex items-center gap-1 bg-germany-red text-white px-4 py-1.5 rounded-full font-label-sm hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      Abspielen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exercises' && (
            <div className="space-y-8 pb-12">
              {exerciseSections.length === 0 && (
                <p className="text-secondary font-body-md text-center py-8">Keine Übungen für diese Lektion.</p>
              )}
              {exerciseSections.map((ex, idx) => (
                <div key={idx} className="bg-surface rounded-xl p-1 shadow-sm border border-surface-variant/50">
                  <ExerciseRenderer exercise={ex} />
                </div>
              ))}
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
