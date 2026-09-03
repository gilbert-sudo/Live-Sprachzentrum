import React from 'react';

export default function AlbumViewModal({ album, onClose, onPlayTrack, activeAudio }) {
  if (!album) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-germany-black/60 backdrop-blur-md animate-fade-in sm:p-4 cursor-pointer"
      onClick={onClose}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-germany-red/20 rounded-full blur-[120px] opacity-50 mix-blend-screen"></div>
      </div>

      <div 
        className="bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] sm:h-[80vh] sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row overflow-hidden relative z-10 animate-slide-up sm:animate-fade-in rounded-t-3xl border border-surface-variant/50 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-germany-black/40 text-white rounded-full flex items-center justify-center hover:bg-germany-black/60 transition-colors sm:hidden backdrop-blur-md"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left Side: Cover & Info (Sticky) */}
        <div className="w-full sm:w-[40%] bg-surface-container-low p-5 sm:p-10 shrink-0 relative overflow-hidden">
          
          {/* Decorative blurred cover background */}
          <div 
            className="absolute inset-0 opacity-30 blur-3xl scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${album.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>

          <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 w-full h-full">
            <div className="w-28 sm:w-full shrink-0 aspect-square rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] sm:mb-8 group transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src={album.coverUrl} 
                alt={album.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/e8e8e8/333333?text=Album'; }}
              />
            </div>
            
            <div className="text-left w-full min-w-0 flex flex-col justify-center">
              <div>
                <span className="inline-block text-[10px] sm:text-[11px] font-bold text-germany-gold uppercase tracking-wider bg-germany-gold/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-3 shadow-sm border border-germany-gold/20">
                  {album.level} • Album
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-headline-md text-on-surface leading-tight mb-1 sm:mb-2 font-black tracking-tight truncate sm:whitespace-normal" style={{ wordBreak: 'break-word' }}>
                {album.title}
              </h2>
              <p className="text-sm sm:text-lg text-secondary font-medium mb-1 truncate sm:whitespace-normal">
                {album.author}
              </p>
              {album.description && (
                <p className="text-sm text-secondary/80 line-clamp-3 mb-6 leading-relaxed hidden sm:block">
                  {album.description}
                </p>
              )}
              
              <div className="flex items-center justify-start gap-4 text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-wider sm:border-t sm:border-surface-variant/50 sm:pt-4 w-full mt-1 sm:mt-0">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px]">queue_music</span>
                  {album.audios?.length || 0} Titel
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tracklist */}
        <div className="flex-1 bg-surface-container-lowest flex flex-col min-h-0 min-w-0 relative">
          {/* Header Desktop */}
          <div className="hidden sm:flex justify-between items-center p-6 border-b border-surface-variant/30 sticky top-0 bg-surface-container-lowest/80 backdrop-blur-xl z-20">
            <h3 className="font-bold text-lg text-on-surface">Titelliste</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 text-secondary hover:text-on-surface hover:bg-surface-variant bg-surface-container rounded-full flex items-center justify-center transition-all border border-surface-subtle shadow-sm"
              title="Schließen"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Tracklist Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar pb-24 sm:pb-6">
            {!album.audios || album.audios.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">music_off</span>
                <p>Keine Titel in diesem Album.</p>
              </div>
            ) : (
              <div className="space-y-1 sm:space-y-2">
                {album.audios.map((track, idx) => {
                  const isPlaying = activeAudio?.fileUrl === track.fileUrl;
                  const trackTitle = track.title || track.originalName || 'Unbekannter Titel';
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => onPlayTrack({...track, _id: `${album._id}-${idx}`, coverUrl: album.coverUrl, author: album.author})}
                      className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl cursor-pointer group transition-all duration-300 ${
                        isPlaying 
                          ? 'bg-germany-red/10 border border-germany-red/20 shadow-sm' 
                          : 'hover:bg-surface-variant/50 border border-transparent'
                      }`}
                    >
                      {/* Track Number / Play Icon */}
                      <div className="w-8 shrink-0 flex justify-center items-center relative">
                        {isPlaying ? (
                          <div className="flex items-end gap-0.5 h-4">
                            <div className="w-1 bg-germany-red rounded-full animate-[bounce_1s_infinite] h-4"></div>
                            <div className="w-1 bg-germany-red rounded-full animate-[bounce_1s_infinite_0.2s] h-2"></div>
                            <div className="w-1 bg-germany-red rounded-full animate-[bounce_1s_infinite_0.4s] h-3"></div>
                          </div>
                        ) : (
                          <>
                            <span className="text-sm font-bold text-secondary group-hover:opacity-0 transition-opacity">{idx + 1}</span>
                            <span className="material-symbols-outlined absolute text-on-surface opacity-0 group-hover:opacity-100 transition-opacity text-[24px]">play_arrow</span>
                          </>
                        )}
                      </div>

                      {/* Track Info (with fix for text overflow) */}
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className={`text-sm sm:text-base font-bold truncate transition-colors ${isPlaying ? 'text-germany-red' : 'text-on-surface'}`} title={trackTitle}>
                          {trackTitle}
                        </h4>
                        <p className="text-xs text-secondary truncate mt-0.5">
                          {album.author}
                        </p>
                      </div>
                      
                      {/* Duration (if available) or generic dots */}
                      <div className="shrink-0 text-xs font-medium text-secondary/70 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Bottom Fade Effect for scrolling */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
}
