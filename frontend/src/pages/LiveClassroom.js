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

  // JaaS / Jitsi Real Integration State
  const jitsiApiRef = useRef(null);
  const [jitsiToken, setJitsiToken] = useState(null);
  const [useFallbackDomain, setUseFallbackDomain] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isTileView, setIsTileView] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const [isMeetingLoading, setIsMeetingLoading] = useState(true);

  // 8x8 JaaS domain and App ID configuration
  const jaasAppId = process.env.REACT_APP_JITSI_APP_ID || 'vpaas-magic-cookie-9c8d3d139d304e2ab96e890e756b9a0a';
  const activeJwt = jitsiToken || process.env.REACT_APP_JITSI_JWT || null;

  // Determine active domain and room name:
  // If activeJwt is present and fallback isn't forced, use 8x8.vc JaaS.
  // If no JWT or auth required by JaaS, fallback to meet.jit.si seamlessly.
  const isJaaS = Boolean(activeJwt) && !useFallbackDomain;
  const activeDomain = isJaaS ? (process.env.REACT_APP_JITSI_DOMAIN || '8x8.vc') : 'meet.jit.si';
  const activeRoomName = isJaaS ? `${jaasAppId}/LiveSprachzentrum_${roomId}` : `LiveSprachzentrum_${roomId}`;

  // Live Classroom UI state
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // eBook state
  const [activeLessonId, setActiveLessonId] = useState('l1-1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  let currentLessonData = lektion1;
  if (activeLessonId.startsWith('l1')) currentLessonData = lektion1;
  else if (activeLessonId.startsWith('l2')) currentLessonData = lektion2;

  // Fetch JaaS token/session configuration on mount
  useEffect(() => {
    const fetchJitsiToken = async () => {
      try {
        const response = await axios.post('/api/jitsi/token', {
          roomId,
          username,
          role,
          email: user?.email,
          userId: user?._id
        });
        if (response.data?.token) {
          setJitsiToken(response.data.token);
        }
      } catch (err) {
        console.warn('JaaS token endpoint notice:', err?.message || err);
      } finally {
        setIsMeetingLoading(false);
      }
    };

    fetchJitsiToken();
  }, [roomId, username, role, user]);

  // Socket signaling connection
  useEffect(() => {
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
      if (jitsiApiRef.current) {
        jitsiApiRef.current.executeCommand('hangup');
      }
      navigate('/');
    } catch (err) {
      console.error('Failed to end class', err);
    }
  };

  const handleApiReady = (externalApi) => {
    jitsiApiRef.current = externalApi;

    // Handle conference failures (such as JaaS auth required or key mismatch)
    const handleConferenceError = (error) => {
      console.warn('Jitsi conference connection issue:', error);
      setUseFallbackDomain(true);
    };

    externalApi.on('videoConferenceFailed', handleConferenceError);
    externalApi.on('conferenceFailed', handleConferenceError);
    externalApi.on('passwordRequired', handleConferenceError);

    // Track audio status
    externalApi.on('audioMuteStatusChanged', ({ muted }) => {
      setIsAudioMuted(muted);
    });

    // Track video status
    externalApi.on('videoMuteStatusChanged', ({ muted }) => {
      setIsVideoMuted(muted);
    });

    // Track tile view status
    externalApi.on('tileViewChanged', ({ enabled }) => {
      setIsTileView(enabled);
    });

    // Track participants count
    const updateParticipants = () => {
      try {
        const count = externalApi.getNumberOfParticipants() || 1;
        setParticipantCount(count);
      } catch (e) {
        // ignore fallback
      }
    };

    externalApi.on('participantJoined', updateParticipants);
    externalApi.on('participantLeft', updateParticipants);
    updateParticipants();
  };

  const toggleAudio = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleAudio');
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleVideo');
    }
  };

  const toggleTileView = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleTileView');
    }
  };

  const toggleShareScreen = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleShareScreen');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans">
      {/* Video Area (Full Screen Jitsi Meeting) */}
      <div className="absolute inset-0 z-0">
        {!isMeetingLoading && (
          <JitsiMeeting
            key={`${activeDomain}_${activeRoomName}`}
            domain={activeDomain}
            roomName={activeRoomName}
            jwt={isJaaS ? activeJwt : undefined}
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: false,
              disableModeratorIndicator: false,
              enableEmailInStats: false,
              prejoinPageEnabled: false,
              toolbarButtons: [
                'camera',
                'chat',
                'closedcaptions',
                'desktop',
                'fullscreen',
                'fudevices',
                'hangup',
                'microphone',
                'participants-pane',
                'raisehand',
                'select-background',
                'settings',
                'tileview',
                'toggle-camera'
              ]
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
              SHOW_CHROME_EXTENSION_BANNER: false,
              MOBILE_APP_PROMO: false
            }}
            userInfo={{
              displayName: username,
              email: user?.email || undefined
            }}
            onApiReady={handleApiReady}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
              iframeRef.style.border = 'none';
            }}
          />
        )}
      </div>

      {/* Compact Top-Left Room Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-auto flex items-center gap-2">
        <div className="bg-gray-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-700/70 shadow-lg flex items-center gap-2.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-white font-semibold">Raum: {roomId}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{username} ({role})</span>
          <span className="text-gray-400">|</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">group</span>
            {participantCount}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-xs text-gray-400">{isJaaS ? '8x8 JaaS' : 'Jitsi Live'}</span>
        </div>
      </div>

      {/* Floating Toolbar Menu (Left Center) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 pointer-events-auto">
        <div className="bg-gray-900/85 backdrop-blur-xl border border-gray-700/80 p-2 rounded-2xl shadow-2xl flex flex-col items-center gap-2">
          {/* Audio Mic Toggle */}
          <button
            onClick={toggleAudio}
            className={`group relative p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${isAudioMuted
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40'
                : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40'
              }`}
            aria-label="Mikrofon schalten"
          >
            <span className="material-symbols-outlined text-xl">
              {isAudioMuted ? 'mic_off' : 'mic'}
            </span>
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {isAudioMuted ? 'Mikrofon einschalten' : 'Mikrofon stummschalten'}
            </span>
          </button>

          {/* Video Camera Toggle */}
          <button
            onClick={toggleVideo}
            className={`group relative p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${isVideoMuted
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            aria-label="Kamera schalten"
          >
            <span className="material-symbols-outlined text-xl">
              {isVideoMuted ? 'videocam_off' : 'videocam'}
            </span>
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {isVideoMuted ? 'Kamera einschalten' : 'Kamera ausschalten'}
            </span>
          </button>

          {/* Screen Share Toggle */}
          <button
            onClick={toggleShareScreen}
            className="group relative p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 flex items-center justify-center"
            aria-label="Bildschirm teilen"
          >
            <span className="material-symbols-outlined text-xl">present_to_all</span>
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              Bildschirm teilen
            </span>
          </button>

          {/* Grid / Tile View Toggle */}
          <button
            onClick={toggleTileView}
            className={`group relative p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${isTileView
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            aria-label="Rasteransicht"
          >
            <span className="material-symbols-outlined text-xl">grid_view</span>
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {isTileView ? 'Galerieansicht beenden' : 'Galerieansicht'}
            </span>
          </button>

          <div className="w-6 h-[1px] bg-gray-700/60 my-0.5" />

          {/* eBook / Kursmaterial Toggle Button */}
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`group relative p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${isPanelOpen
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            aria-label="Kursmaterial"
          >
            <span className="material-symbols-outlined text-xl">
              {isPanelOpen ? 'close' : 'menu_book'}
            </span>
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {isPanelOpen ? 'Material schließen' : 'Kursmaterial öffnen'}
            </span>
          </button>

          <div className="w-6 h-[1px] bg-gray-700/60 my-0.5" />

          {/* Leave Call Button */}
          <button
            onClick={() => {
              if (jitsiApiRef.current) {
                jitsiApiRef.current.executeCommand('hangup');
              }
              navigate('/');
            }}
            className="group relative p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 flex items-center justify-center"
            aria-label="Verlassen"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              Raum verlassen
            </span>
          </button>

          {/* End Class Button (Teacher/Admin only) */}
          {(role === 'teacher' || role === 'admin') && (
            <button
              onClick={handleEndClass}
              className="group relative p-3 rounded-xl text-red-400 hover:text-white hover:bg-red-600/90 transition-all duration-200 flex items-center justify-center"
              aria-label="Beenden"
            >
              <span className="material-symbols-outlined text-xl">power_settings_new</span>
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-red-950/95 text-red-200 text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-red-800">
                Klasse beenden
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Sliding Control Panel for eBook */}
      <div className={`absolute top-0 right-0 bottom-0 w-full lg:w-[800px] lg:max-w-[50vw] bg-surface-container-lowest border-l border-surface-variant flex flex-col z-20 transition-transform duration-300 ease-in-out shadow-2xl ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'
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
          <div className={`absolute inset-y-0 left-0 z-50 transform transition-all duration-300 md:relative flex-shrink-0 shadow-2xl md:shadow-none bg-surface-container-lowest ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-64 md:w-0 overflow-hidden'
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
                className={`group flex items-center justify-center gap-3 px-4 py-2 -ml-1 rounded-full border-2 transition-all duration-300 ${isSidebarOpen
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
