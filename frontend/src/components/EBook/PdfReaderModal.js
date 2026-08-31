import React, { useState } from 'react';

export default function PdfReaderModal({ book, onClose }) {
  const pdfUrl = book.fileUrl || book.url;
  const [activePanelTab, setActivePanelTab] = useState(null); // 'info', 'audio', 'vocab', or null (closed)
  const isPanelOpen = activePanelTab !== null;

  return (
    <div className="fixed inset-0 z-[100] bg-surface-container-lowest flex items-center justify-center animate-fade-in">
      <div className="relative w-full h-full bg-surface-container-high flex flex-col overflow-hidden">
        
        {/* Floating Title Badge (Always below toolbar to avoid blocking native buttons) */}
        <div className="absolute top-16 left-4 md:left-6 z-10 pointer-events-auto flex items-center gap-2 max-w-[calc(100vw-80px)] animate-slide-up" style={{ animationDelay: '50ms' }}>
          <div className="bg-surface/95 dark:bg-surface-container-highest/95 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-surface-variant shadow-md flex items-center gap-2 md:gap-3 text-on-surface">
            <span className="material-symbols-outlined text-germany-red text-[18px] md:text-[24px]">menu_book</span>
            <h3 className="font-title-sm md:font-title-md truncate max-w-[150px] md:max-w-md font-bold text-on-surface">{book.title}</h3>
            {book.level && (
              <>
                <div className="w-px h-4 bg-surface-variant"></div>
                <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary-container font-label-sm text-[10px] md:text-[11px] uppercase font-bold tracking-wider">
                  {book.level}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Floating Close Button FAB (Restored to Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-16 right-4 md:top-20 md:right-6 z-10 w-12 h-12 flex items-center justify-center bg-white dark:bg-surface-container-highest hover:bg-germany-red dark:hover:bg-germany-red backdrop-blur-xl border border-surface-variant hover:border-germany-red rounded-full shadow-lg hover:shadow-[0_8px_30px_rgba(213,31,38,0.4)] text-secondary dark:text-on-surface hover:text-white dark:hover:text-white transition-all duration-300 ease-out group hover:scale-110 active:scale-95 pointer-events-auto animate-slide-up"
          title="Schließen"
        >
          <span className="material-symbols-outlined text-[24px] font-bold group-hover:rotate-90 transition-transform duration-300">close</span>
        </button>

        {/* Vertical Red Toolbar (Audio, Vocab, Info) */}
        {!isPanelOpen && (
          <div className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 bg-germany-red/95 backdrop-blur-xl p-1.5 rounded-full shadow-lg shadow-germany-red/40 border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button 
              onClick={() => setActivePanelTab('audio')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
              title="Zugehörige Audios"
            >
              <span className="material-symbols-outlined text-[20px]">headphones</span>
            </button>
            <button 
              onClick={() => setActivePanelTab('vocab')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
              title="Schwere Vokabeln"
            >
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </button>
            <div className="w-6 h-px bg-white/30 mx-auto my-0.5"></div>
            <button 
              onClick={() => setActivePanelTab('info')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110"
              title="Info"
            >
              <span className="material-symbols-outlined text-[20px]">info</span>
            </button>
          </div>
        )}

        {/* Interactive Sidebar Panel for Extras */}
        <div className={`absolute right-0 top-0 bottom-0 w-full md:w-[24rem] bg-surface-container-low shadow-2xl border-l border-surface-variant transform transition-transform duration-300 z-40 flex flex-col ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pb-0 pt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-on-surface">Buch Extras</h2>
              <button 
                onClick={() => setActivePanelTab(null)}
                className="bg-germany-red text-white p-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                title="Panel schließen"
              >
                <span className="material-symbols-outlined font-bold text-[24px]">close</span>
              </button>
            </div>
            
            {/* Panel Tabs */}
            <div className="flex border-b border-surface-variant mb-6 overflow-x-auto gap-1 pb-1 scrollbar-hide">
              <button 
                className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activePanelTab === 'audio' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
                onClick={() => setActivePanelTab('audio')}
              >
                Audios
              </button>
              <button 
                className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activePanelTab === 'vocab' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
                onClick={() => setActivePanelTab('vocab')}
              >
                Vokabeln
              </button>
              <button 
                className={`flex-1 min-w-max pb-2 px-2 text-center font-title-sm transition-colors border-b-2 ${activePanelTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface'}`}
                onClick={() => setActivePanelTab('info')}
              >
                Info
              </button>
            </div>
          </div>
          
          <div className="p-6 pt-0 overflow-y-auto">
            {activePanelTab === 'info' && (
              <>
                <div className="text-center mb-6">
                   <span className="material-symbols-outlined text-[48px] text-surface-variant mb-4 block">info</span>
                   <h3 className="font-title-lg text-on-surface mb-2">{book.title}</h3>
                   <p className="text-secondary font-body-md">{book.author}</p>
                </div>
                {book.description && (
                   <div className="bg-surface p-4 rounded-xl shadow-sm border border-surface-variant/50 mb-4">
                     <h4 className="font-label-md text-germany-red mb-2">Beschreibung</h4>
                     <p className="text-on-surface font-body-sm">{book.description}</p>
                   </div>
                )}
              </>
            )}

            {activePanelTab === 'audio' && (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[48px] text-surface-variant mb-4 block">headphones</span>
                <h3 className="font-title-md text-on-surface mb-2">Zugehörige Audios</h3>
                <p className="text-secondary font-body-sm">Audios für "{book.title}" werden hier aufgelistet.</p>
              </div>
            )}

            {activePanelTab === 'vocab' && (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[48px] text-surface-variant mb-4 block">menu_book</span>
                <h3 className="font-title-md text-on-surface mb-2">Schwere Vokabeln</h3>
                <p className="text-secondary font-body-sm">Wichtige Vokabeln aus diesem Buch werden hier in Zukunft angezeigt.</p>
              </div>
            )}
          </div>
        </div>

        {/* PDF Viewer Area - Native Browser Viewer */}
        <div className={`flex-1 w-full h-full relative z-0 transition-all duration-300 ${isPanelOpen ? 'md:pr-[24rem]' : ''}`}>
          <object 
            data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=Fit`} 
            type="application/pdf"
            className="w-full h-full border-0"
          >
            <embed 
              src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=Fit`} 
              type="application/pdf" 
              className="w-full h-full border-0" 
            />
          </object>
        </div>
      </div>
    </div>
  );
}
