import React, { useState } from 'react';

export default function PdfReaderModal({ book, audios = [], activeAudio, onPlayAudio, onClose }) {
  const pdfUrl = book.fileUrl || book.url;
  const [activePanelTab, setActivePanelTab] = useState(null);
  const isPanelOpen = activePanelTab !== null;
  const relatedAudios = audios.filter(a => a.linkedBook === book._id);
  const [isPdfMenuOpen, setIsPdfMenuOpen] = useState(false);

  React.useEffect(() => {
    let interval;
    const checkIframeMenus = () => {
      const iframe = document.querySelector('iframe[title="PDF Reader"]');
      if (iframe && iframe.contentDocument) {
        const doc = iframe.contentDocument;
        const menus = doc.querySelectorAll('.editorParamsToolbar, #secondaryToolbar, #findbar');
        
        let anyOpen = false;
        menus.forEach(menu => {
          if (!menu.classList.contains('hidden')) {
            anyOpen = true;
          }
        });
        setIsPdfMenuOpen(anyOpen);
      }
    };
    
    // Poll the iframe every 250ms to detect open menus
    interval = setInterval(checkIframeMenus, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-surface-container-lowest flex items-center justify-center animate-fade-in">
      <div className="relative w-full h-full bg-surface-container-high flex flex-col overflow-hidden">
        
        {/* Floating Title Badge */}
        <div className={`absolute top-12 left-4 md:left-6 z-10 flex items-center gap-2 max-w-[calc(100vw-80px)] animate-slide-up transition-all duration-300 ${isPdfMenuOpen ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 pointer-events-auto translate-y-0'}`} style={{ animationDelay: '50ms' }}>
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

        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-12 right-4 md:top-12 md:right-6 z-10 w-12 h-12 flex items-center justify-center bg-white dark:bg-surface-container-highest hover:bg-germany-red dark:hover:bg-germany-red backdrop-blur-xl border border-surface-variant hover:border-germany-red rounded-full shadow-lg hover:shadow-[0_8px_30px_rgba(213,31,38,0.4)] text-secondary dark:text-on-surface hover:text-white dark:hover:text-white transition-all duration-300 ease-out group hover:scale-110 active:scale-95 animate-slide-up ${isPdfMenuOpen ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 pointer-events-auto translate-y-0'}`}
          title="Schließen"
        >
          <span className="material-symbols-outlined text-[24px] font-bold group-hover:rotate-90 transition-transform duration-300">close</span>
        </button>

        {/* Vertical Red Toolbar */}
        {!isPanelOpen && (
          <div className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 bg-germany-red/95 backdrop-blur-xl p-1.5 rounded-full shadow-lg shadow-germany-red/40 border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button onClick={() => setActivePanelTab('audio')} className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110" title="Zugehörige Audios">
              <span className="material-symbols-outlined text-[20px]">headphones</span>
            </button>
            <button onClick={() => setActivePanelTab('vocab')} className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110" title="Schwere Vokabeln">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </button>
            <div className="w-6 h-px bg-white/30 mx-auto my-0.5"></div>
            <button onClick={() => setActivePanelTab('info')} className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 hover:text-white text-white/90 transition-all duration-300 hover:scale-110" title="Info">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </button>
          </div>
        )}

        {/* Interactive Sidebar Panel for Extras */}
        <div className={`absolute right-0 top-0 bottom-0 w-full md:w-[24rem] bg-surface-container-low shadow-2xl border-l border-surface-variant transform transition-transform duration-300 z-40 flex flex-col ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="px-4 pt-5 md:px-5 md:pt-6 pb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-sm text-on-surface">Buch Extras</h2>
              <button 
                onClick={() => setActivePanelTab(null)}
                className="bg-germany-red text-white p-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                title="Panel schließen"
              >
                <span className="material-symbols-outlined font-bold text-[20px]">close</span>
              </button>
            </div>
            
            {/* Panel Tabs */}
            <div className="flex border-b border-surface-variant mb-3 overflow-x-auto gap-1 pb-0 scrollbar-hide">
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
          
          <div className="px-3 md:px-4 pb-4 pt-1 overflow-y-auto custom-scrollbar">
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
              <div className="py-2">
                {relatedAudios.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-[48px] text-surface-variant mb-4 block">headphones</span>
                    <h3 className="font-title-md text-on-surface mb-2">Zugehörige Audios</h3>
                    <p className="text-secondary font-body-sm">Keine Audios für "{book.title}" gefunden.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {relatedAudios.map(audioItem => (
                      <div key={audioItem._id} className="bg-surface rounded-xl shadow-sm border border-surface-variant overflow-hidden">
                        <div className="p-3 border-b border-surface-variant bg-surface-container-lowest flex items-center gap-3">
                          <img src={audioItem.coverUrl} alt={audioItem.title} className="w-10 h-10 rounded object-cover shadow-sm" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-title-sm text-on-surface truncate" title={audioItem.title}>{audioItem.title}</h4>
                            <p className="text-[10px] text-secondary uppercase font-bold tracking-wider">{audioItem.type === 'album' ? 'ALBUM' : 'AUDIO'}</p>
                          </div>
                        </div>
                        <div className="p-2 space-y-1 bg-surface-container-lowest/30">
                          {audioItem.type === 'album' && audioItem.audios ? (
                            audioItem.audios.map((track, index) => {
                              const isPlaying = activeAudio?.fileUrl === track.fileUrl;
                              const playableTrack = {
                                _id: `${audioItem._id}-${index}`,
                                title: track.title,
                                fileUrl: track.fileUrl,
                                coverUrl: audioItem.coverUrl,
                                author: audioItem.author
                              };
                              return (
                                <div 
                                  key={index}
                                  onClick={() => onPlayAudio(playableTrack)}
                                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${isPlaying ? 'bg-primary-container/20 border border-primary/20' : 'hover:bg-surface-variant/50 border border-transparent'}`}
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <span className={`text-[11px] font-bold w-4 text-center ${isPlaying ? 'text-primary' : 'text-secondary/70'}`}>{index + 1}.</span>
                                    <p className={`font-label-sm truncate ${isPlaying ? 'text-primary font-bold' : 'text-on-surface'}`} title={track.title}>{track.title}</p>
                                  </div>
                                  <button className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isPlaying ? 'text-primary' : 'text-secondary hover:bg-surface-variant hover:text-germany-red'}`}>
                                    <span className="material-symbols-outlined text-[18px]">{isPlaying ? 'volume_up' : 'play_arrow'}</span>
                                  </button>
                                </div>
                              );
                            })
                          ) : (
                            <div 
                              onClick={() => onPlayAudio(audioItem)}
                              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${activeAudio?._id === audioItem._id ? 'bg-primary-container/20 border border-primary/20' : 'hover:bg-surface-variant/50 border border-transparent'}`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className={`material-symbols-outlined text-[16px] ${activeAudio?._id === audioItem._id ? 'text-primary' : 'text-secondary/70'}`}>audio_file</span>
                                <p className={`font-label-sm truncate ${activeAudio?._id === audioItem._id ? 'text-primary font-bold' : 'text-on-surface'}`} title={audioItem.title}>{audioItem.title}</p>
                              </div>
                              <button className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${activeAudio?._id === audioItem._id ? 'text-primary' : 'text-secondary hover:bg-surface-variant hover:text-germany-red'}`}>
                                <span className="material-symbols-outlined text-[18px]">{activeAudio?._id === audioItem._id ? 'volume_up' : 'play_arrow'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

        {/* PDF Viewer Area - Using native iframe */}
        <div className={`flex-1 w-full h-full relative z-0 bg-surface-container transition-all duration-300 ${isPanelOpen ? 'md:pr-[24rem]' : ''}`}>
          <iframe 
            src={`/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`}
            className="absolute inset-0 w-full h-full border-none" 
            title="PDF Reader"
          />
        </div>
      </div>
    </div>
  );
}
