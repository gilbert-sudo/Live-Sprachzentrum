import React, { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ audioUrl, title, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Reset state when audio url changes
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    setIsMinimized(false);
    setPosition({ x: 0, y: 0 }); // reset position
  }, [audioUrl]);

  // Auto-minimize when playing
  useEffect(() => {
    let timeout;
    if (isPlaying) {
      // Minimize automatically after 3 seconds of playing
      timeout = setTimeout(() => setIsMinimized(true), 3000);
    } else {
      // Expand when paused
      setIsMinimized(false);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  const togglePlay = (e) => {
    // Prevent drag from triggering if we just click
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setProgress((current / dur) * 100);
    setCurrentTime(formatTime(current));
  };

  const handleLoadedMetadata = () => {
    setDuration(formatTime(audioRef.current.duration));
  };

  const handleProgressChange = (e) => {
    e.stopPropagation();
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Dragging logic
  const handlePointerDown = (e) => {
    // Don't drag if clicking on the range input or buttons
    if (e.target.tagName.toLowerCase() === 'input' || e.target.closest('button')) {
      return;
    }
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  if (!audioUrl) return null;

  return (
    <div 
      className={`fixed z-50 bg-germany-black text-white rounded-full p-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-surface-variant/20 backdrop-blur-md bg-opacity-95 transition-[width,height,padding,opacity] duration-300 ease-in-out cursor-grab active:cursor-grabbing ${isMinimized ? 'w-16 h-16 opacity-70 hover:opacity-100 justify-center' : 'w-[90%] max-w-md px-6'}`}
      style={{ 
        left: '50%',
        bottom: '24px',
        transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Drag handle icon only visible when minimized to indicate draggability */}
      {isMinimized && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-surface-variant rounded-full flex items-center justify-center text-germany-black shadow-sm cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}>
          <span className="material-symbols-outlined text-[14px]">open_in_full</span>
        </div>
      )}

      {isMinimized && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-error-red rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer" onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
          <span className="material-symbols-outlined text-[14px]">close</span>
        </div>
      )}

      <button 
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-germany-red flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
      >
        <span className="material-symbols-outlined icon-filled">
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>

      {!isMinimized && (
        <>
          <div className="flex-1 flex flex-col justify-center min-w-0 select-none">
            <span className="font-label-sm text-label-sm truncate mb-1">{title || 'Hören'}</span>
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-[10px] opacity-70 w-8">{currentTime}</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress || 0} 
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-germany-gold"
              />
              <span className="font-label-sm text-[10px] opacity-70 w-8">{duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors"
              title="Minimieren"
            >
              <span className="material-symbols-outlined text-[18px]">close_fullscreen</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors text-error-red"
              title="Schließen"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
