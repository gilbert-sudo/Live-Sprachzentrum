import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VirtualSchool() {
  const [activeClasses, setActiveClasses] = useState([]);
  const [openedDoor, setOpenedDoor] = useState(null);
  const navigate = useNavigate();

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
    <main className="flex-1 w-full bg-surface-container-lowest min-h-screen flex flex-col relative overflow-hidden perspective-container">

      {/* Decorative Hallway Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-surface-container-highest to-surface-container-lowest opacity-40"></div>

      {/* Compact Header */}
      <div className="relative z-10 pt-6 pb-4 px-4 md:px-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2 tracking-tight drop-shadow-sm flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[28px] md:text-[36px] text-germany-red">school</span>
          Campus <span className="text-germany-red">Live</span>
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant max-w-lg mx-auto flex items-center justify-center gap-1">
          Wähle dein Sprachniveau und betrete das virtuelle Klassenzimmer.
        </p>
      </div>

      {/* Hallway Doors Grid - Compact & Mobile Friendly */}
      <div className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 pb-12 flex items-start justify-center">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">

          {levels.map((level) => {
            const room = activeClasses.find(r => r.subject.includes(level.id) || r.name.includes(level.id));
            const isLive = !!room;

            return (
              <div
                key={level.id}
                className="door-wrapper w-[140px] md:w-[180px] h-[240px] md:h-[300px] shrink-0 cursor-pointer group door-open-hover"
                onClick={() => handleDoorClick(level.id)}
                onMouseEnter={() => {
                  if (openedDoor && openedDoor !== level.id) {
                    setOpenedDoor(null);
                  }
                }}
              >
                {/* Social Media Style Live Badge */}
                <div className="h-4 w-full flex items-center justify-center mb-2 relative z-20">
                  {isLive && (
                    <div className="absolute top-2 z-30">
                      <div className="bg-gradient-to-r from-pink-600 to-germany-red text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm border-[2px] border-surface-container-lowest uppercase tracking-wider flex items-center gap-1">
                        LIVE
                      </div>
                    </div>
                  )}
                </div>

                {/* The Door Frame & Door */}
                <div className={`w-full h-full relative rounded-t-md bg-surface-container-high transition-all duration-500 border-x-[6px] border-t-[6px] ${
                  isLive 
                    ? 'border-germany-red shadow-[0_0_20px_rgba(220,38,38,0.7)]' 
                    : 'border-surface-container-highest shadow-lg'
                }`}>

                  {/* Inside the classroom (visible when door opens) */}
                  <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center overflow-hidden rounded-t-sm p-2">
                    <span className="material-symbols-outlined text-[32px] text-germany-red opacity-80 mb-2">cast_for_education</span>
                    <p className="text-on-surface font-bold text-sm text-center">{isLive ? 'Klasse beitreten' : 'Warteraum'}</p>
                    {isLive ? (
                      <p className="text-germany-red font-bold text-[11px] mt-1 flex items-center gap-1 animate-bounce bg-germany-red/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">login</span> Los geht's!
                      </p>
                    ) : (
                      <p className="text-secondary font-medium text-[10px] mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">hourglass_empty</span> Bitte warten
                      </p>
                    )}
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
                  </div>

                  {/* The actual Door pane */}
                  <div
                    className="door-frame door-inner !absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-lowest border-r-[1px] border-b-[1px] border-surface-dim rounded-t-sm flex flex-col items-center justify-start pt-6 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)]"
                    style={{ transform: openedDoor === level.id ? 'rotateY(-105deg)' : undefined }}
                  >

                    {/* Door Sign (Compact) */}
                    <div className={`w-3/4 bg-gradient-to-r ${level.color} p-2 rounded shadow-sm mb-3 transform -translate-y-2 relative flex flex-col items-center`}>
                      <span className="material-symbols-outlined text-white/30 text-[12px] absolute top-1 right-1">star</span>
                      <h2 className="text-white text-xl font-black text-center">{level.id}</h2>
                      <p className="text-white/90 text-[9px] text-center font-medium mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">translate</span>
                        {level.title}
                      </p>
                    </div>

                    {/* Detailed Class Info Placard */}
                    {isLive ? (
                      <div className="w-[85%] bg-surface-container-lowest/95 dark:bg-surface-container-highest p-2 rounded shadow-md border border-surface-variant flex flex-col items-center mb-6 mt-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-germany-red"></div>
                        <span className="text-[9px] font-bold text-germany-red flex items-center gap-1 uppercase tracking-wider mb-1 mt-1">
                          <span className="material-symbols-outlined text-[10px]">sensors</span>
                          <span className="w-1.5 h-1.5 bg-germany-red rounded-full animate-pulse"></span>
                          Jetzt Live
                        </span>
                        <div className="flex items-center gap-1 text-on-surface mb-0.5 w-full justify-center">
                          <span className="material-symbols-outlined text-[12px] text-secondary shrink-0">person</span>
                          <p className="text-[11px] font-bold truncate">{room.teacherName || 'Lehrer'}</p>
                        </div>
                        <div className="flex items-center gap-1 w-full justify-center text-secondary">
                          <span className="material-symbols-outlined text-[10px] shrink-0">forum</span>
                          <p className="text-[9px] text-center truncate w-full">{room.name}</p>
                        </div>
                        <div className="flex items-center gap-1 w-full justify-center text-on-surface-variant mt-0.5 bg-surface-variant/30 rounded py-0.5">
                          <span className="material-symbols-outlined text-[9px] shrink-0 opacity-70">schedule</span>
                          <p className="text-[8px] font-semibold text-center truncate">{room.startTime || '10:00'} - {room.endTime || '11:30'} Uhr</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-[85%] bg-surface-container-lowest/70 dark:bg-surface-container-highest/70 p-2.5 rounded shadow-sm border border-surface-variant flex flex-col items-center mb-6 mt-auto backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1">event_busy</span>
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider text-center">Keine Klasse</span>
                        <p className="text-[8px] text-secondary mt-1 text-center font-medium">Siehe Stundenplan</p>
                      </div>
                    )}

                    {/* Door handle (Compact) */}
                    <div className="absolute top-1/2 right-2 w-2 h-8 bg-surface-variant rounded-sm shadow-sm flex items-center justify-center">
                      <div className="w-1 h-4 bg-surface-dim rounded-sm"></div>
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
