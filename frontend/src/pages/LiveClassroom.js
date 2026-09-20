import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Import Bibliothek for quick access
import Bibliothek from './Bibliothek';
import HomeworkPanel from '../components/HomeworkPanel';
import ThemeToggle from '../components/ThemeToggle';
import { getLevelColor } from '../utils/levelColors';

function LiveClassroom() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const username = user?.name || location.state?.username || 'Guest';
  const role = user?.role || location.state?.role || 'student';

  // JaaS / Jitsi Real Integration State
  const jitsiApiRef = useRef(null);
  const isSneakLeaveRef = useRef(false);
  const [jitsiToken, setJitsiToken] = useState(null);
  const [useFallbackDomain, setUseFallbackDomain] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isTileView, setIsTileView] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const [isMeetingLoading, setIsMeetingLoading] = useState(true);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // 8x8 JaaS domain and App ID configuration
  const jaasAppId = process.env.REACT_APP_JITSI_APP_ID || 'vpaas-magic-cookie-9c8d3d139d304e2ab96e890e756b9a0a';
  const activeJwt = jitsiToken || process.env.REACT_APP_JITSI_JWT || null;

  // Formate le nom de la salle (ex: mock-1 -> Mock 1)
  const formattedRoomName = roomId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const levelMatch = roomId.replace('room-', '').toUpperCase();

  // Determine active domain and room name:
  // If activeJwt is present and fallback isn't forced, use 8x8.vc JaaS.
  // If no JWT or auth required by JaaS, fallback to meet.jit.si seamlessly.
  const isJaaS = Boolean(activeJwt) && !useFallbackDomain;
  const activeDomain = isJaaS ? (process.env.REACT_APP_JITSI_DOMAIN || '8x8.vc') : 'meet.jit.si';
  const activeRoomName = isJaaS ? `${jaasAppId}/LiveSprachzentrum_${roomId}` : `LiveSprachzentrum_${roomId}`;

  // Live Classroom UI state
  const [activePanel, setActivePanel] = useState('none');

  // eBook state removed, using Bibliothek directly

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
    
    externalApi.on('videoConferenceJoined', async () => {
      setIsJoined(true);
      if (role === 'teacher' || role === 'admin') {
        try {
          const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
          await axios.patch(`/api/classrooms/room/${roomId}/status`, { isLive: true }, config);
        } catch (err) {
          console.error('Failed to set class as live on join', err);
        }
      }
    });

    externalApi.on('videoConferenceLeft', async () => {
      setIsJoined(false);
      // Only close the class if this wasn't a sneak leave
      if ((role === 'teacher' || role === 'admin') && !isSneakLeaveRef.current) {
        try {
          const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
          await axios.patch(`/api/classrooms/room/${roomId}/status`, { isLive: false }, config);
        } catch (err) {
          console.error('Failed to set class as closed on leave', err);
        }
      }
    });

    externalApi.on('readyToClose', () => navigate('/campus'));
    updateParticipants();
  };


  const toggleWhiteboard = () => {
    if (isWhiteboardActive) {
      if (window.confirm("Voulez-vous vraiment fermer le tableau blanc ?")) {
        if (jitsiApiRef.current) {
          jitsiApiRef.current.executeCommand('toggleWhiteboard');
        }
        setIsWhiteboardActive(false);
      }
    } else {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.executeCommand('toggleWhiteboard');
      }
      setIsWhiteboardActive(true);
    }
  };


  const toggleShareScreen = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleShareScreen');
    }
  };

  // Prevent any body scrolling while in the Live Classroom
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans overflow-hidden">
      {/* Video Area (Full Screen Jitsi Meeting) */}
      <div className={`absolute top-0 left-0 bottom-0 z-0 transition-all duration-300 ease-in-out ${activePanel !== 'none' ? 'right-0 lg:right-[min(800px,50vw)]' : 'right-0'}`}>
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
              toolbarButtons: (role === 'teacher' || role === 'admin') ? [
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
                'mute-everyone',
                'mute-video-everyone'
              ] : [
                'camera',
                'chat',
                'hangup',
                'microphone',
                'profile',
                'raisehand',
                'tileview',
                'toggle-camera',
                'videoquality'
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
        <div className="absolute top-4 left-4 z-10 pointer-events-auto flex flex-col items-start md:flex-row md:items-center gap-2">
          <div className="bg-gray-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-700/70 shadow-lg flex items-center gap-2.5 text-xs max-w-[calc(100vw-32px)] overflow-hidden flex-wrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-semibold flex items-center gap-2">
              Salle:
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-widest ${getLevelColor(levelMatch).badge}`}>
                {formattedRoomName}
              </span>
            </span>
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
          
          {/* Theme Toggle Button */}
          <div className="bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg border border-gray-700/70 p-0.5">
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Floating Toolbar Menu (Bottom Left) */}
      {/* Floating Toolbar Menu (Bottom Left) */}
      {isJoined && (
        <div className="absolute left-2 lg:left-4 bottom-[80px] lg:bottom-28 z-20 flex flex-row lg:flex-col gap-2 lg:gap-3 pointer-events-auto transition-all duration-300">
          <div className="bg-gray-900/85 backdrop-blur-xl border border-gray-700/80 p-1.5 lg:p-2 rounded-2xl shadow-2xl flex flex-row lg:flex-col items-center gap-1.5 lg:gap-2">

          {/* Invite Student Toggle (Teacher/Admin only) */}
          {(role === 'teacher' || role === 'admin') && (
            <button
              onClick={() => {
                const link = `${window.location.origin}/room/${roomId}`;
                navigator.clipboard.writeText(link);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 3000);
              }}
              className="group relative p-2 lg:p-3 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-600/80 transition-all duration-200 flex items-center justify-center"
              aria-label="Inviter un étudiant"
            >
              <span className="material-symbols-outlined text-xl">{linkCopied ? 'check' : 'person_add'}</span>
              <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
                {linkCopied ? "Lien copié!" : "Copier le lien d'invitation"}
              </span>
            </button>
          )}

          {/* Whiteboard Toggle (Teacher/Admin only) */}
          {(role === 'teacher' || role === 'admin') && (
            <button
              onClick={toggleWhiteboard}
              className={`group relative p-2 lg:p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                isWhiteboardActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
              aria-label="Basculer le tableau blanc"
            >
              <span className="material-symbols-outlined text-xl">
                draw
              </span>
              <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
                Basculer le tableau blanc
              </span>
            </button>
          )}

          {/* Screen Share Toggle (Teacher/Admin only) */}
          {(role === 'teacher' || role === 'admin') && (
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
          )}

          {(role === 'teacher' || role === 'admin') && (
            <div className="w-[1px] h-5 lg:w-6 lg:h-[1px] bg-gray-700/60 mx-1 lg:mx-0 lg:my-0.5" />
          )}

          {/* Homework Toggle Button */}
          <button
            onClick={() => setActivePanel(activePanel === 'homework' ? 'none' : 'homework')}
            className={`group relative p-2 lg:p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${activePanel === 'homework'
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            aria-label="Devoirs"
          >
            <span className="material-symbols-outlined text-xl">
              {activePanel === 'homework' ? 'close' : 'assignment'}
            </span>
            <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {activePanel === 'homework' ? 'Fermer les devoirs' : 'Ouvrir les devoirs'}
            </span>
          </button>

          <div className="w-[1px] h-5 lg:w-6 lg:h-[1px] bg-gray-700/60 mx-1 lg:mx-0 lg:my-0.5" />

          {/* Bibliothek Toggle Button */}
          <button
            onClick={() => setActivePanel(activePanel === 'bibliothek' ? 'none' : 'bibliothek')}
            className={`group relative p-2 lg:p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${activePanel === 'bibliothek'
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            aria-label="Bibliothèque"
          >
            <span className="material-symbols-outlined text-xl">
              {activePanel === 'bibliothek' ? 'close' : 'local_library'}
            </span>
            <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700">
              {activePanel === 'bibliothek' ? 'Fermer la bibliothèque' : 'Ouvrir la bibliothèque'}
            </span>
          </button>

          <div className="w-[1px] h-5 lg:w-6 lg:h-[1px] bg-gray-700/60 mx-1 lg:mx-0 lg:my-0.5" />

          {/* Leave Call Button */}
          <button
            onClick={() => {
              isSneakLeaveRef.current = true;
              if (socket) {
                socket.emit('sneak_leave');
              }
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
              Quitter la salle (En cachette)
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

      {/* Sliding Control Panel for eBook / Homework */}
      <div className={`absolute top-0 right-0 bottom-0 w-full lg:w-[800px] lg:max-w-[50vw] bg-surface-container-lowest border-l border-surface-variant flex flex-col z-20 transition-all duration-300 ease-in-out shadow-2xl ${activePanel !== 'none' ? 'translate-x-0 opacity-100' : 'translate-x-[105%] opacity-0 pointer-events-none'
        }`}>

        {/* Premium Floating Close Button (All Screens) */}
        <button 
          onClick={() => setActivePanel('none')}
          className="flex absolute top-16 right-4 lg:top-20 lg:right-6 w-11 h-11 lg:w-12 lg:h-12 bg-white/80 dark:bg-gray-900/80 hover:bg-germany-red dark:hover:bg-germany-red backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] items-center justify-center text-gray-800 dark:text-gray-200 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-50 group hover:scale-110 active:scale-95"
          title="Fermer le panneau"
        >
          <span className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/40 transition-colors duration-500"></span>
          <span className="material-symbols-outlined text-[22px] lg:text-[24px] group-hover:rotate-90 transition-transform duration-500">close</span>
        </button>

        {/* The Panel Content embedded inside */}
        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 flex flex-col min-w-0 relative bg-surface-container-lowest">
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {activePanel === 'bibliothek' && <Bibliothek readOnly={true} />}
              {activePanel === 'homework' && <HomeworkPanel roomId={roomId} socket={socket} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveClassroom;
