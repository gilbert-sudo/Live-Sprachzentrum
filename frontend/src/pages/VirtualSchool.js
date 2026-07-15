import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VirtualSchool() {
  const [activeClasses, setActiveClasses] = useState([]);
  const [openedDoor, setOpenedDoor] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    
    let minDiff = Infinity;
    let closestIndex = 0;
    
    Array.from(container.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + (child.clientWidth / 2);
      const diff = Math.abs(center - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    
    setFocusedIndex(closestIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Temporary Mock Data for UI Development
    const mockData = [
      { roomId: 'mock-1', subject: 'A1', name: 'Deutsch für Anfänger', teacherName: 'Herr Müller', isLive: true, startTime: '10:00', endTime: '11:30' },
      { roomId: 'mock-2', subject: 'B1', name: 'Konversation & Grammatik', teacherName: 'Frau Schmidt', isLive: true, startTime: '18:00', endTime: '19:30' }
    ];

    // Fetch live classrooms to show active indicators
    axios.get('/api/classrooms')
      .then(res => {
        let liveRooms = res.data.filter(r => r.isLive);
        // Fallback to mock data if no live rooms exist for easier UI testing
        if (liveRooms.length === 0) {
          liveRooms = mockData;
        }
        setActiveClasses(liveRooms);
      })
      .catch(err => {
        console.error('Error fetching classrooms, using mock data', err);
        setActiveClasses(mockData);
      });
  }, []);

  const levels = [
    { id: 'A1', title: 'Anfänger', color: 'from-blue-500 to-blue-700' },
    { id: 'A2', title: 'Grundlagen', color: 'from-green-500 to-green-700' },
    { id: 'B1', title: 'Mittelstufe', color: 'from-yellow-500 to-yellow-700' },
    { id: 'B2', title: 'Gute Mittelstufe', color: 'from-orange-500 to-orange-700' }
  ];

  const handleDoorClick = (levelId) => {
    if (openedDoor === levelId) {
      console.log(`Entering level ${levelId}`);
      const room = activeClasses.find(r => r.subject.includes(levelId) || r.name.includes(levelId));
      if (room) {
        navigate(`/room/${room.roomId}`);
      } else {
        alert(`Willkommen im Bereich ${levelId}! Zurzeit findet hier keine Live-Klasse statt.`);
      }
    } else {
      setOpenedDoor(levelId);
    }
  };

  return (
    <main className="flex-1 w-full bg-surface-container-lowest min-h-screen flex flex-col relative overflow-hidden hallway-scene">

      {/* 3D Hallway Environment */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-surface-container-highest to-surface-container-lowest opacity-60 z-0"></div>
      <div className="hallway-floor"></div>
      <div className="hallway-wall-left"></div>
      <div className="hallway-wall-right"></div>

      {/* Dynamic Lighting Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 z-10 mix-blend-overlay"></div>

      {/* Compact Header & Real-time Clock */}
      <div className="relative z-20 pt-6 pb-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mx-auto gap-4">
        
        {/* Notice Board / Welcome Sign (Left) */}
        <div className="hidden md:flex flex-col bg-surface-container-high/80 backdrop-blur border border-surface-variant rounded-md p-3 shadow-md transform rotate-[-2deg]">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-germany-red text-[18px]">campaign</span>
            <span className="font-bold text-sm text-on-surface uppercase tracking-widest">Pinnwand</span>
          </div>
          <p className="text-xs text-on-surface-variant italic">Willkommen im Campus Live!</p>
          <div className="w-full h-[1px] bg-surface-dim my-2"></div>
          <p className="text-[10px] text-secondary font-medium">Nächster Kurs: B1 (18:00)</p>
        </div>

        {/* Center Title */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-black text-on-surface mb-1 tracking-tight drop-shadow-md flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[32px] md:text-[40px] text-germany-red">school</span>
            Campus <span className="text-germany-red">Live</span>
          </h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Wähle dein Sprachniveau und betrete das Klassenzimmer.
          </p>
        </div>

        {/* Digital Clock (Right) */}
        <div className="flex flex-col items-end bg-surface-container-high/80 backdrop-blur border border-surface-variant rounded-md p-2 md:p-3 shadow-md min-w-[120px]">
          <div className="flex items-center gap-1.5 text-germany-red mb-0.5">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Aktuelle Zeit</span>
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-on-surface tracking-tighter">
            {currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
            <span className="text-sm md:text-base text-secondary animate-pulse">:</span>
            {currentTime.toLocaleTimeString('de-DE', { second: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Hallway Doors Grid - Placed on the "Floor" */}
      <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto pb-28 md:pb-12 mt-4 md:mt-8 flex items-center justify-center md:justify-center">
        {/* Horizontal scroll on mobile, wrap on desktop */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-14 w-full items-end overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar px-[calc(50vw-110px)] md:px-0 py-8 scroll-smooth perspective-[1200px]"
        >

          {levels.map((level, index) => {
            const room = activeClasses.find(r => r.subject.includes(level.id) || r.name.includes(level.id));
            const isLive = !!room;
            const isFocused = focusedIndex === index;
            
            // Cover flow transformations for mobile
            let mobileTransformClass = 'md:scale-100 md:opacity-100 md:[transform:none]';
            if (isFocused) {
               mobileTransformClass += ' scale-[1.05] opacity-100 z-30 [transform:rotateY(0deg)]';
            } else if (index < focusedIndex) {
               mobileTransformClass += ' scale-[0.85] opacity-50 z-10 [transform:rotateY(15deg)]';
            } else {
               mobileTransformClass += ' scale-[0.85] opacity-50 z-10 [transform:rotateY(-15deg)]';
            }

            return (
              <div
                key={level.id}
                className={`relative flex flex-col items-center snap-center shrink-0 transition-all duration-300 ease-out ${mobileTransformClass}`}
              >
                {/* 3D Grounding Shadows */}
                {isLive && <div className="live-floor-glow"></div>}
                <div className="door-shadow"></div>

                <div
                  className="door-wrapper w-[220px] md:w-[170px] h-[340px] md:h-[290px] cursor-pointer group door-open-hover relative z-10"
                  onClick={() => handleDoorClick(level.id)}
                  onMouseEnter={() => {
                    if (openedDoor && openedDoor !== level.id) {
                      setOpenedDoor(null);
                    }
                  }}
                >
                  {/* Social Media Style Live Badge */}
                  <div className="h-6 md:h-5 w-full flex items-center justify-center mb-1 relative z-20">
                    {isLive && (
                      <div className="absolute top-1 z-30 transform hover:scale-110 transition-transform">
                        <div className="bg-gradient-to-r from-pink-600 to-germany-red text-white text-[11px] md:text-[10px] font-black px-2.5 py-0.5 rounded shadow-sm border-[2px] border-surface-container-lowest uppercase tracking-widest flex items-center gap-1.5 animate-bounce">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          LIVE
                        </div>
                      </div>
                    )}
                  </div>

                  {/* The Door Frame & Door */}
                  <div className={`w-full h-full relative rounded-t-md bg-surface-container-high transition-all duration-500 border-x-[8px] border-t-[8px] ${
                    isLive 
                      ? 'border-germany-red/40 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                      : 'border-surface-container-highest shadow-xl'
                  }`}>

                    {/* Inside the classroom (visible when door opens) */}
                    <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center overflow-hidden rounded-t-sm p-3 shadow-inner">
                      <span className="material-symbols-outlined text-[48px] md:text-[36px] text-germany-red opacity-80 mb-3 drop-shadow-sm">cast_for_education</span>
                      <p className="text-on-surface font-bold text-base md:text-sm text-center">{isLive ? 'Klasse beitreten' : 'Warteraum'}</p>
                      {isLive ? (
                        <p className="text-germany-red font-bold text-[13px] md:text-[11px] mt-2 flex items-center gap-1.5 bg-germany-red/10 px-4 py-1.5 rounded-full border border-germany-red/20 shadow-sm">
                          <span className="material-symbols-outlined text-[16px]">login</span> Los geht's!
                        </p>
                      ) : (
                        <p className="text-secondary font-medium text-[12px] md:text-[10px] mt-2 flex items-center gap-1.5 bg-surface-variant/30 px-4 py-1.5 rounded-full">
                          <span className="material-symbols-outlined text-[14px]">hourglass_empty</span> Bitte warten
                        </p>
                      )}
                      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                    </div>

                    {/* The actual Door pane */}
                    <div
                      className="door-frame door-inner !absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-lowest border-r-[2px] border-b-[2px] border-surface-dim rounded-t-sm flex flex-col items-center justify-start pt-8 md:pt-6 shadow-[inset_0_0_15px_rgba(0,0,0,0.08)]"
                      style={{ transform: openedDoor === level.id ? 'rotateY(-105deg)' : undefined }}
                    >
                      {/* Door Details (Panels) */}
                      <div className="absolute top-[10%] w-[80%] h-[35%] border-[1px] border-surface-dim rounded-sm opacity-50 pointer-events-none"></div>
                      <div className="absolute bottom-[5%] w-[80%] h-[40%] border-[1px] border-surface-dim rounded-sm opacity-50 pointer-events-none"></div>

                      {/* Door Sign */}
                      <div className={`w-[80%] bg-gradient-to-br ${level.color} p-3 rounded-md shadow-md mb-4 md:mb-3 transform -translate-y-2 relative flex flex-col items-center z-10 border border-white/20`}>
                        <span className="material-symbols-outlined text-white/30 text-[16px] md:text-[14px] absolute top-2 right-2">star</span>
                        <h2 className="text-white text-3xl md:text-2xl font-black text-center drop-shadow-md">{level.id}</h2>
                        <p className="text-white/95 text-[12px] md:text-[10px] text-center font-bold mt-1 whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center gap-1.5 bg-black/10 px-2 py-1 rounded-sm w-full">
                          <span className="material-symbols-outlined text-[12px]">translate</span>
                          {level.title}
                        </p>
                      </div>

                      {/* Detailed Class Info Placard */}
                      {isLive ? (
                        <div className="w-[85%] bg-surface-container-lowest/90 dark:bg-surface-container-highest/90 p-3 rounded-xl shadow-lg border border-white/40 dark:border-white/10 flex flex-col items-center mb-6 mt-auto relative overflow-hidden z-10 backdrop-blur-md">
                          
                          {/* Modern Top Accent Glow */}
                          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-germany-red/15 to-transparent pointer-events-none"></div>

                          {/* Live Status Pill */}
                          <div className="flex items-center justify-center gap-1.5 bg-germany-red/10 border border-germany-red/20 rounded-full px-2.5 py-0.5 mb-2 relative z-10">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-germany-red opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-germany-red"></span>
                            </span>
                            <span className="text-[10px] md:text-[9px] font-bold text-germany-red uppercase tracking-wider">
                              Jetzt Live
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-on-surface mb-1.5 w-full relative z-10">
                            <div className="bg-surface-variant/50 p-1 rounded-full flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[14px] md:text-[12px] text-secondary">person</span>
                            </div>
                            <p className="text-sm md:text-xs font-bold truncate leading-tight">{room.teacherName || 'Lehrer'}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 w-full text-secondary mb-2 relative z-10">
                             <div className="bg-surface-variant/50 p-1 rounded-full flex items-center justify-center shrink-0">
                               <span className="material-symbols-outlined text-[14px] md:text-[12px]">forum</span>
                             </div>
                            <p className="text-[11px] md:text-[10px] truncate leading-tight">{room.name}</p>
                          </div>
                          
                          <div className="flex items-center gap-1.5 w-full justify-center text-on-surface-variant mt-1 bg-surface-variant/30 rounded-lg py-1.5 md:py-1 border border-surface-dim/50 relative z-10">
                            <span className="material-symbols-outlined text-[12px] md:text-[10px] shrink-0 opacity-70">schedule</span>
                            <p className="text-[10px] md:text-[9px] font-bold text-center truncate">{room.startTime || '10:00'} - {room.endTime || '11:30'} Uhr</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-[85%] bg-surface-container-lowest/60 dark:bg-surface-container-highest/60 p-4 md:p-3 rounded shadow-sm border border-surface-variant/50 flex flex-col items-center mb-6 mt-auto backdrop-blur-md z-10">
                          <div className="bg-surface-variant/30 p-2 md:p-1.5 rounded-full mb-3 md:mb-2">
                            <span className="material-symbols-outlined text-[24px] md:text-[20px] text-secondary">event_busy</span>
                          </div>
                          <span className="text-[12px] md:text-[10px] font-bold text-secondary uppercase tracking-widest text-center">Keine Klasse</span>
                        </div>
                      )}

                      {/* Door handle */}
                      <div className="absolute top-1/2 right-2 md:right-3 w-3 md:w-2.5 h-12 md:h-10 bg-surface-variant rounded-sm shadow-[1px_1px_3px_rgba(0,0,0,0.3)] flex items-center justify-center z-10 border border-surface-dim">
                        <div className="w-1 md:w-1 h-6 md:h-5 bg-surface-container-highest rounded-sm shadow-inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
