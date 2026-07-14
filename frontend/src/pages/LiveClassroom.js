import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Import eBook components and data
import EBookSidebar from '../components/EBook/EBookSidebar';
import LessonContent from '../components/EBook/LessonContent';
import { lektion1Chapters, lektion1 } from '../data/lektion1';
import { lektion2 } from '../data/lektion2';

function LiveClassroom() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  
  const username = user?.name || location.state?.username || 'Guest';
  const role = user?.role || location.state?.role || 'student';

  // Live Classroom UI state
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // eBook state
  const [activeLessonId, setActiveLessonId] = useState('l1-1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  let currentLessonData = lektion1;
  if (activeLessonId.startsWith('l1')) currentLessonData = lektion1;
  else if (activeLessonId.startsWith('l2')) currentLessonData = lektion2;

  useEffect(() => {
    // Connect to signaling server (mostly for presence now)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const newSocket = io(API_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_room', roomId, role);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, role]);

  const handleEndClass = async () => {
    if (role !== 'teacher' && role !== 'admin') return;
    try {
      await axios.patch(`/api/classrooms/room/${roomId}/status`, { isLive: false });
      navigate('/');
    } catch (err) {
      console.error('Failed to end class', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans">
      {/* Video Area (Full Screen) */}
      <div className="absolute inset-0 z-0">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={`LiveSprachzentrum_${roomId}`}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
            prejoinPageEnabled: false
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            SHOW_CHROME_EXTENSION_BANNER: false
          }}
          userInfo={{
            displayName: username
          }}
          onApiReady={(externalApi) => {
            // we can attach event listeners to jitsi here
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100%';
            iframeRef.style.width = '100%';
            iframeRef.style.border = 'none';
          }}
        />
      </div>

      {/* Floating Header */}
      <div className="absolute top-0 left-0 right-0 p-3 md:p-4 flex justify-between items-start z-10 pointer-events-none">
        {/* Room Info */}
        <div className="bg-gray-900/80 backdrop-blur-md px-3 py-2 rounded-lg border border-gray-700 pointer-events-auto shadow-lg">
          <h2 className="text-white font-bold text-sm md:text-base">Raum: {roomId}</h2>
          <p className="text-gray-300 text-xs">{username} ({role})</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="flex gap-2 justify-end">
            <button 
              onClick={() => navigate('/')}
              className="bg-gray-800/80 hover:bg-gray-700 backdrop-blur-md text-white px-3 py-2 md:px-4 rounded-lg transition font-semibold shadow-lg border border-gray-600 text-sm md:text-base flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden md:inline">Verlassen</span>
            </button>
            {(role === 'teacher' || role === 'admin') && (
              <button 
                onClick={handleEndClass}
                className="bg-germany-red/90 hover:bg-red-700 backdrop-blur-md text-white px-3 py-2 md:px-4 rounded-lg transition font-semibold shadow-lg border border-red-500 text-sm md:text-base flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
                <span className="hidden md:inline">Beenden</span>
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="bg-primary/90 hover:bg-primary backdrop-blur-md text-white px-3 py-2 rounded-lg transition shadow-lg border border-primary flex items-center justify-center gap-2 mt-2 self-end"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPanelOpen ? 'close' : 'menu_book'}
            </span>
            <span className="text-sm font-semibold">{isPanelOpen ? 'Schließen' : 'Kursmaterial'}</span>
          </button>
        </div>
      </div>

      {/* Sliding Control Panel for eBook */}
      <div className={`absolute top-0 right-0 bottom-0 w-full lg:w-[800px] lg:max-w-[50vw] bg-surface-container-lowest border-l border-surface-variant flex flex-col z-20 transition-transform duration-300 ease-in-out shadow-2xl ${
        isPanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Top bar inside the slider just to close it easily */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-surface-variant bg-surface-container-low shrink-0 mt-14 sm:mt-0">
          <h3 className="font-title-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">menu_book</span>
            Kursmaterial
          </h3>
          <button onClick={() => setIsPanelOpen(false)} className="text-secondary hover:text-primary p-2 bg-surface-container rounded-full hover:bg-surface-container-high transition">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* The Kurse.js Layout embedded inside */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-germany-black/50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar Area */}
          <div className={`absolute inset-y-0 left-0 z-50 transform transition-all duration-300 md:relative flex-shrink-0 shadow-2xl md:shadow-none bg-surface-container-lowest ${
            isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-64 md:w-0 overflow-hidden'
          }`}>
            <div className="w-64 h-full border-r border-surface-variant">
              <EBookSidebar
                chapters={lektion1Chapters}
                activeLessonId={activeLessonId}
                onClose={() => setIsSidebarOpen(false)}
                onSelectLesson={(id) => {
                  setActiveLessonId(id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 relative bg-surface-container-lowest">
            {/* Header to toggle sidebar */}
            <div className="flex items-center p-3 border-b border-surface-variant bg-surface-container-lowest/90 backdrop-blur-xl sticky top-0 z-30 min-h-[4rem]">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`group flex items-center justify-center gap-3 px-4 py-2 -ml-1 rounded-full border-2 transition-all duration-300 ${
                  isSidebarOpen 
                    ? 'md:pointer-events-none md:border-transparent md:px-2 md:-ml-3' 
                    : 'border-surface-variant/50 hover:border-germany-red hover:bg-germany-red/5 active:scale-95 shadow-sm hover:shadow-[0_4px_15px_rgba(221,0,0,0.15)] cursor-pointer'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] transition-all duration-300 ${isSidebarOpen ? 'md:hidden text-secondary' : 'text-germany-red group-hover:scale-110'}`}>menu</span>
                <span className="font-title-sm font-bold tracking-wide text-on-surface">Lektionen</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <LessonContent lesson={currentLessonData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveClassroom;
