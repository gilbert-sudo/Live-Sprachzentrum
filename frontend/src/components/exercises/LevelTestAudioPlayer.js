import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { getLevelColor } from '../../utils/levelColors';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
  const m = Math.floor(timeInSeconds / 60);
  const s = Math.floor(timeInSeconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function LevelTestAudioPlayer({
  src,
  audios,
  questionId,
  title,
  level = 'A2'
}) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const lvlColor = getLevelColor(level);

  const trackList = React.useMemo(() => {
    if (Array.isArray(audios) && audios.length > 0) {
      return audios.map((url, idx) => ({
        url,
        label:
          questionId === 22
            ? `Hörbeispiel ${idx + 1}`
            : `Hörtext ${String.fromCharCode(65 + idx)}`
      }));
    }
    if (src) {
      return [
        {
          url: src,
          label:
            title ||
            (questionId ? `Hörbeispiel zu Aufgabe ${questionId}` : 'Hörprobe')
        }
      ];
    }
    return [];
  }, [src, audios, questionId, title]);

  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1.0);

  useEffect(() => {
    setActiveTrackIdx(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [src, audios, questionId]);

  const currentTrack = trackList[activeTrackIdx] || null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    audio.src = currentTrack.url;
    audio.playbackRate = speed;
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      audio.playbackRate = speed;
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    if (audio.readyState >= 1) {
      setDuration(audio.duration || 0);
    }

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentTrack?.url]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.playbackRate = speed;
      audio.play().catch((err) => console.warn('Audio playback error:', err));
    } else {
      audio.pause();
    }
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.playbackRate = speed;
    audio.play().catch((err) => console.warn('Audio playback error:', err));
  };

  const handleSeek = (e) => {
    if (!progressRef.current || !audioRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTrackSwitch = (idx) => {
    setActiveTrackIdx(idx);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.playbackRate = speed;
        audioRef.current.play().catch(() => {});
      }
    }, 60);
  };

  if (trackList.length === 0) return null;

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1D1E22] dark:bg-[#141518] rounded-2xl p-3 flex flex-col gap-2.5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.22)]"
    >
      <audio ref={audioRef} preload="metadata" />

      {/* Multi-track selector pills if multiple audios exist */}
      {trackList.length > 1 && (
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.04]">
          {trackList.map((track, idx) => {
            const isActive = idx === activeTrackIdx;
            return (
              <motion.button
                whileTap={{ scale: 0.96 }}
                key={track.url + idx}
                type="button"
                onClick={() => handleTrackSwitch(idx)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  isActive
                    ? `${lvlColor.buttonBg} shadow-sm ${lvlColor.shadowGlow}`
                    : 'bg-white/[0.06] text-white/75 hover:bg-white/12 hover:text-white'
                }`}
              >
                <Volume2 className="w-3 h-3 shrink-0" />
                <span>{track.label}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Single Compact Player Bar */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Abspielen'}
          className={`w-9 h-9 rounded-full ${lvlColor.buttonBg} flex items-center justify-center shrink-0 shadow-md ${lvlColor.shadowGlow} transition-transform`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </motion.button>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-white font-bold truncate">
              <Headphones className={`w-3.5 h-3.5 shrink-0 ${lvlColor.accentText}`} />
              <span className="truncate">{currentTrack.label}</span>
            </div>
            <span className="text-[10px] font-mono text-white/70 shrink-0 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div
            ref={progressRef}
            onClick={handleSeek}
            className="w-full h-1.5 rounded-full bg-white/15 cursor-pointer overflow-hidden flex items-center"
          >
            <div
              className={`h-full bg-gradient-to-r ${lvlColor.barGradient} transition-all duration-100 ease-linear rounded-full`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Speed Selector */}
        <div className="hidden xs:flex items-center gap-0.5 bg-white/[0.07] rounded-xl p-1 shrink-0">
          {[0.8, 1.0, 1.2].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                speed === s
                  ? `${lvlColor.solidBg} shadow-sm`
                  : 'text-white/65 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.9, rotate: -45 }}
          type="button"
          onClick={handleRestart}
          title="Von Anfang abspielen"
          aria-label="Von Anfang abspielen"
          className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
