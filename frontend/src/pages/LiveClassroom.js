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
  const [isJoined, setIsJoined] = useState(false);
  const [isTileView, setIsTileView] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const [isMeetingLoading, setIsMeetingLoading] = useState(true);

  // 8x8 JaaS domain and App ID configuration
  const jaasAppId = process.env.REACT_APP_JITSI_APP_ID || 'vpaas-magic-cookie-9c8d3d139d304e2ab96e890e756b9a0a';
  const activeJwt = jitsiToken || process.env.REACT_APP_JITSI_JWT || null;

  // Formate le nom de la salle (ex: mock-1 -> Mock 1)
  const formattedRoomName = roomId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

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
      const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      await axios.patch(`/api/classrooms/room/${roomId}/status`, { isLive: false }, config);
    } catch (err) {
      console.error('Failed to update class status on backend', err);
    } finally {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.executeCommand('hangup');
      }
      navigate('/campus');
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
    externalApi.on('videoConferenceJoined', () => setIsJoined(true));
    externalApi.on('videoConferenceLeft', () => setIsJoined(false));
    externalApi.on('readyToClose', () => navigate('/campus'));
    updateParticipants();
  };


  const toggleWhiteboard = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleWhiteboard');
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
              defaultLanguage: 'fr',
              subject: formattedRoomName,
              startWithAudioMuted: true,
              startWithVideoMuted: false,
              disableModeratorIndicator: false,
              enableEmailInStats: false,
              prejoinPageEnabled: false,
              toolbarButtons: [
                'camera',
                'chat',
                'desktop',
                'embedmeeting',
                'fudevices',
                'hangup',
                'microphone',
                'participants-pane',
                'profile',
                'raisehand',
                'security',
                'select-background',
                'settings',
                'shareaudio',
                'sharedvideo',
                'shortcuts',
                'stats',
                'tileview',
                'toggle-camera',
                'videoquality',
                'whiteboard',
                'mute-everyone',
                'mute-video-everyone'
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
      {isJoined && (
        <div className="absolute top-4 left-4 z-10 pointer-events-auto flex items-center gap-2">
          <div className="bg-gray-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-700/70 shadow-lg flex items-center gap-2.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-semibold">Salle: {formattedRoomName}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{username} ({role === 'teacher' ? 'Professeur' : (role === 'admin' ? 'Admin' : 'Étudiant')})</span>
            <span className="text-gray-400">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">group</span>
              {participantCount}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-xs text-gray-400">{isJaaS ? '8x8 JaaS' : 'Jitsi Live'}</span>
          </div>
        </div>
      )}

      {/* Floating Toolbar Menu (Bottom Left) */}
      {/* Floating Toolbar Menu (Bottom Left) */}
      {isJoined && (
        <div className="absolute left-2 lg:left-4 bottom-[80px] lg:bottom-28 z-20 flex flex-row lg:flex-col gap-2 lg:gap-3 pointer-events-auto transition-all duration-300">
          <div className="bg-gray-900/85 backdrop-blur-xl border border-gray-700/80 p-1.5 lg:p-2 rounded-2xl shadow-2xl flex flex-row lg:flex-col items-center gap-1.5 lg:gap-2">
          {/* Whiteboard Toggle */}
          <button
            onClick={toggleWhiteboard}
            className="group relative p-2 lg:p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 flex items-center justify-center"
            aria-label="Basculer le tableau blanc"
          >
            <span className="material-symbols-outlined text-xl">
              draw
            </span>
            <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              Basculer le tableau blanc
            </span>
          </button>

          {/* Screen Share Toggle */}
          <button
            onClick={toggleShareScreen}
            className="group relative p-2 lg:p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 flex items-center justify-center"
            aria-label="Partager l'écran"
          >
            <span className="material-symbols-outlined text-xl">present_to_all</span>
            <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              Partager l'écran
            </span>
          </button>

          <div className="w-[1px] h-5 lg:w-6 lg:h-[1px] bg-gray-700/60 mx-1 lg:mx-0 lg:my-0.5" />

          {/* eBook / Kursmaterial Toggle Button */}
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`group relative p-2 lg:p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${isPanelOpen
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            aria-label="Support de cours"
          >
            <span className="material-symbols-outlined text-xl">
              {isPanelOpen ? 'close' : 'menu_book'}
            </span>
            <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {isPanelOpen ? 'Fermer le support' : 'Ouvrir le support de cours'}
            </span>
          </button>

          <div className="w-[1px] h-5 lg:w-6 lg:h-[1px] bg-gray-700/60 mx-1 lg:mx-0 lg:my-0.5" />

          {/* Leave Call Button */}
          <button
            onClick={() => {
              if (jitsiApiRef.current) {
                jitsiApiRef.current.executeCommand('hangup');
              }
              navigate('/campus');
            }}
            className="group relative p-2 lg:p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 flex items-center justify-center"
            aria-label="Quitter"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              Quitter la salle
            </span>
          </button>

          {/* End Class Button (Teacher/Admin only) */}
          {(role === 'teacher' || role === 'admin') && (
            <button
              onClick={handleEndClass}
              className="group relative p-2 lg:p-3 rounded-xl text-red-400 hover:text-white hover:bg-red-600/90 transition-all duration-200 flex items-center justify-center"
              aria-label="Terminer"
            >
              <span className="material-symbols-outlined text-xl">power_settings_new</span>
              <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-red-950/95 text-red-200 text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-red-800">
                Terminer le cours
              </span>
            </button>
          )}
        </div>
      </div>
      )}

      {/* Sliding Control Panel for eBook */}
      <div className={`absolute top-0 right-0 bottom-0 w-full lg:w-[800px] lg:max-w-[50vw] bg-surface-container-lowest border-l border-surface-variant flex flex-col z-20 transition-transform duration-300 ease-in-out shadow-2xl ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>

        {/* Top bar inside the slider just to close it easily */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-surface-variant bg-surface-container-low shrink-0 mt-14 sm:mt-0">
          <h3 className="font-title-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">menu_book</span>
            Support de cours
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
