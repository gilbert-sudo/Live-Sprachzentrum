import React, { useState, useRef, useEffect } from 'react';
import { Headphones, Play, Pause } from 'lucide-react';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return '0:00';
  const m = Math.floor(timeInSeconds / 60);
  const s = Math.floor(timeInSeconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function CustomAudioPlayer({ src, title }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // If audio is already loaded before event listener is attached
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mb-4 bg-[#1F1F22] dark:bg-[#18181B] border border-surface-variant/20 dark:border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center gap-2.5 text-white font-bold text-[17px]">
        <Headphones className="w-5 h-5" />
        <span>{title || 'Piste audio'}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={togglePlay}
          className="w-[46px] h-[46px] rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(220,38,38,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-1" />
          )}
        </button>
        
        <div className="flex-1 flex flex-col gap-2 mt-1">
          <div 
            ref={progressRef}
            onClick={handleSeek}
            className="w-full h-[6px] rounded-full bg-white/10 cursor-pointer overflow-hidden flex"
          >
            <div 
              className="h-full bg-primary transition-all duration-100 ease-linear" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
          <div className="flex justify-between text-[11px] font-medium text-white/50 px-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
