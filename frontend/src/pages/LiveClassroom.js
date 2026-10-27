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

  // Helper to compute initial position: left-center of the screen
  const getInitialToolbarPos = () => {
    if (typeof window === 'undefined') return { x: 16, y: 220 };
    const isMobile = window.innerWidth < 768;
    const estimatedHeight = 420;
    const availableHeight = window.innerHeight - (isMobile ? 96 : 16);
    const centerY = Math.max(20, Math.round((availableHeight - estimatedHeight) / 2));
    const targetX = window.innerWidth < 480 ? 12 : 16;
    return { x: targetX, y: centerY };
  };

  // Helper to compute bottom-left position with clearance for mobile/desktop bottom toolbar
  const getBottomLeftPos = () => {
    if (typeof window === 'undefined') return { x: 16, y: 550 };
    const isMobile = window.innerWidth < 768;
    const minimizedHeight = 44;
    // Bottom clearance for mobile/desktop bottom control bar (Jitsi controls ~75-80px tall)
    const bottomMargin = isMobile ? 96 : 84;
    const targetX = window.innerWidth < 480 ? 12 : 16;
    const targetY = Math.max(16, window.innerHeight - minimizedHeight - bottomMargin);
    return { x: targetX, y: targetY };
  };

  // Draggable and Minimizable Toolbar State
  const [toolbarPos, setToolbarPos] = useState(() => {
    const isMin = (() => {
      try {
        return localStorage.getItem('lsz_classroom_toolbar_minimized') === 'true';
      } catch (e) {
        return false;
      }
    })();

    try {
      const saved = localStorage.getItem('lsz_classroom_toolbar_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          if (isMin) {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const bottomMargin = isMobile ? 96 : 84;
            const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - 44 - bottomMargin;
            return {
              x: parsed.x,
              y: Math.min(parsed.y, maxY),
            };
          }
          return parsed;
        }
      }
    } catch (e) { }
    return isMin ? getBottomLeftPos() : getInitialToolbarPos();
  });

  const [isToolbarMinimized, setIsToolbarMinimized] = useState(() => {
    try {
      return localStorage.getItem('lsz_classroom_toolbar_minimized') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isDraggingToolbar, setIsDraggingToolbar] = useState(false);
  const toolbarRef = useRef(null);
  const dragDataRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialPosX: 0,
    initialPosY: 0,
    hasMoved: false,
  });

  const lastExpandedPosRef = useRef(null);

  // Default initial position on mount (left-center or bottom-left if minimized)
  useEffect(() => {
    if (!toolbarPos && typeof window !== 'undefined') {
      setToolbarPos(isToolbarMinimized ? getBottomLeftPos() : getInitialToolbarPos());
    }
  }, [toolbarPos, isToolbarMinimized]);

  // Keep toolbar inside screen bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      setToolbarPos((prev) => {
        if (!prev) return prev;
        const isMobile = window.innerWidth < 768;
        const rect = toolbarRef.current?.getBoundingClientRect();
        const width = rect?.width || 60;
        const height = rect?.height || (isToolbarMinimized ? 44 : 360);
        // Clear the bottom toolbar on mobile (Jitsi controls take ~75-80px)
        const bottomMargin = isToolbarMinimized ? (isMobile ? 96 : 84) : (isMobile ? 88 : 8);
        const maxX = Math.max(8, window.innerWidth - width - 8);
        const maxY = Math.max(8, window.innerHeight - height - bottomMargin);
        const clampedX = Math.min(Math.max(8, prev.x), maxX);
        const clampedY = Math.min(Math.max(8, prev.y), maxY);
        if (clampedX !== prev.x || clampedY !== prev.y) {
          return { x: clampedX, y: clampedY };
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isToolbarMinimized]);

  const handlePointerDown = (e) => {
    // If clicking an interactive button inside toolbar, do not initiate drag
    if (e.target.closest('button[data-no-drag="true"]')) {
      return;
    }
    // Only primary button
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const rect = toolbarRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragDataRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: rect.left,
      initialPosY: rect.top,
      hasMoved: false,
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) { }

    setIsDraggingToolbar(true);
  };

  const handlePointerMove = (e) => {
    if (!dragDataRef.current.isDragging) return;

    const dx = e.clientX - dragDataRef.current.startX;
    const dy = e.clientY - dragDataRef.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragDataRef.current.hasMoved = true;
    }

    const isMobile = window.innerWidth < 768;
    const rect = toolbarRef.current?.getBoundingClientRect();
    const width = rect?.width || 60;
    const height = rect?.height || (isToolbarMinimized ? 44 : 360);
    const bottomMargin = isToolbarMinimized ? (isMobile ? 96 : 84) : (isMobile ? 88 : 8);

    const maxX = Math.max(8, window.innerWidth - width - 8);
    const maxY = Math.max(8, window.innerHeight - height - bottomMargin);

    const newX = Math.min(Math.max(8, dragDataRef.current.initialPosX + dx), maxX);
    const newY = Math.min(Math.max(8, dragDataRef.current.initialPosY + dy), maxY);

    setToolbarPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (!dragDataRef.current.isDragging) return;

    dragDataRef.current.isDragging = false;
    setIsDraggingToolbar(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) { }

    setToolbarPos((current) => {
      if (current) {
        try {
          localStorage.setItem('lsz_classroom_toolbar_pos', JSON.stringify(current));
        } catch (err) { }
      }
      return current;
    });
  };

  const toggleMinimize = () => {
    setIsToolbarMinimized((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('lsz_classroom_toolbar_minimized', String(next));
      } catch (err) { }

      if (next) {
        // Minimizing: save current position to restore when expanded
        if (toolbarPos) {
          lastExpandedPosRef.current = toolbarPos;
          try {
            localStorage.setItem('lsz_classroom_toolbar_last_expanded_pos', JSON.stringify(toolbarPos));
          } catch (e) { }
        }
        // Position minimized pill at the bottom-left corner with mobile bottom clearance
        const bottomLeft = getBottomLeftPos();
        setToolbarPos(bottomLeft);
        try {
          localStorage.setItem('lsz_classroom_toolbar_pos', JSON.stringify(bottomLeft));
        } catch (e) { }
      } else {
        // Expanding: restore saved position or center-left default
        let restorePos = lastExpandedPosRef.current;
        if (!restorePos) {
          try {
            const saved = localStorage.getItem('lsz_classroom_toolbar_last_expanded_pos');
            if (saved) restorePos = JSON.parse(saved);
          } catch (e) { }
        }
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const bottomThreshold = (typeof window !== 'undefined' ? window.innerHeight : 800) - 160;
        if (!restorePos || (restorePos.y >= bottomThreshold)) {
          restorePos = getInitialToolbarPos();
        }

        const expandedHeight = 460;
        const expandedWidth = 70;
        const maxX = Math.max(8, window.innerWidth - expandedWidth - 8);
        const maxY = Math.max(8, window.innerHeight - expandedHeight - (isMobile ? 96 : 16));
        const safePos = {
          x: Math.min(Math.max(8, restorePos.x), maxX),
          y: Math.min(Math.max(8, restorePos.y), maxY),
        };

        setToolbarPos(safePos);
        try {
          localStorage.setItem('lsz_classroom_toolbar_pos', JSON.stringify(safePos));
        } catch (e) { }
      }

      return next;
    });
  };

  const handleDoubleClickToolbar = (e) => {
    // If double-clicking directly on an interactive button inside toolbar, do not minimize
    if (e.target.closest('button[data-no-drag="true"]')) {
      return;
    }
    toggleMinimize();
  };

  const handleMinimizedPointerUp = (e) => {
    const moved = dragDataRef.current.hasMoved;
    handlePointerUp(e);
    if (!moved) {
      toggleMinimize();
    }
  };

  const handleResetToolbar = () => {
    try {
      localStorage.removeItem('lsz_classroom_toolbar_pos');
      localStorage.removeItem('lsz_classroom_toolbar_minimized');
      localStorage.removeItem('lsz_classroom_toolbar_last_expanded_pos');
    } catch (e) { }

    lastExpandedPosRef.current = null;
    setToolbarPos(getInitialToolbarPos());
    setIsToolbarMinimized(false);
  };

  const isRightSide = (toolbarPos?.x || 0) > ((typeof window !== 'undefined' ? window.innerWidth : 1000) / 2);
  const tooltipPositionClass = isRightSide ? 'right-full mr-3' : 'left-full ml-3';

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
              fileSharing: {
                enabled: true
              },
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
          <div className="bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg border border-gray-700/70 [&_button]:!p-0">
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Draggable & Minimizable Floating Classroom Toolbar */}
      {isJoined && (
        <>
          {/* Transparent full-screen overlay during drag to prevent iframe from capturing pointer events */}
          {isDraggingToolbar && (
            <div className="fixed inset-0 z-[190] cursor-grabbing select-none bg-transparent" />
          )}

          {isToolbarMinimized ? (
            /* ================= MINIMIZED STATE ================= */
            <div
              ref={toolbarRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handleMinimizedPointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                position: 'fixed',
                left: `${toolbarPos?.x ?? (typeof window !== 'undefined' && window.innerWidth < 480 ? 12 : 16)}px`,
                top: `${toolbarPos?.y ?? (typeof window !== 'undefined' ? window.innerHeight - 44 - (window.innerWidth < 768 ? 96 : 84) : 550)}px`,
                touchAction: 'none',
                userSelect: 'none',
              }}
              className={`fixed z-[200] group cursor-grab active:cursor-grabbing select-none transition-transform duration-200 ${isDraggingToolbar ? 'scale-105 opacity-95' : 'hover:scale-105 active:scale-95'
                }`}
              title="Barre d'outils réduite • Cliquer pour agrandir • Glisser pour déplacer"
              role="button"
              aria-label="Agrandir la barre d'outils"
            >
              {/* High-visibility glowing container */}
              <div className="relative flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-gray-950/95 backdrop-blur-2xl border-2 border-primary/90 shadow-[0_0_25px_rgba(235,0,0,0.55),0_10px_30px_rgba(0,0,0,0.85)] text-white ring-1 ring-white/20">
                {/* Themed Icon */}
                <div className="w-7 h-7 rounded-lg bg-primary/25 border border-primary/40 flex items-center justify-center text-primary-light group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">widgets</span>
                </div>

                {/* Text and Expand arrow */}
                <div className="flex flex-col text-left pr-1">
                  <span className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1 leading-tight">
                    Outils
                    <span className="material-symbols-outlined text-[14px] text-yellow-400 group-hover:translate-x-0.5 transition-transform">unfold_more</span>
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium leading-none">Déplaçable</span>
                </div>
              </div>
            </div>
          ) : (
            /* ================= EXPANDED STATE ================= */
            <div
              ref={toolbarRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onDoubleClick={handleDoubleClickToolbar}
              style={{
                position: 'fixed',
                left: `${toolbarPos?.x ?? 16}px`,
                top: `${toolbarPos?.y ?? 120}px`,
                touchAction: 'none',
                userSelect: 'none',
              }}
              className={`fixed z-[200] flex flex-col gap-1 pointer-events-auto transition-shadow duration-200 ${isDraggingToolbar ? 'shadow-[0_0_35px_rgba(0,0,0,0.85)] opacity-95 scale-[1.02]' : ''
                }`}
              title="Double-cliquer pour réduire • Glisser pour déplacer"
            >
              <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700/80 py-1.5 px-2 rounded-2xl shadow-2xl flex flex-col items-center gap-1.5 ring-1 ring-white/10">
                {/* Dock & Window System Controls (Green Mark: Toolbar Management) */}
                <div
                  className="w-full bg-gray-950/85 border border-gray-700/80 rounded-xl p-1 flex flex-col items-center gap-1 shadow-inner ring-1 ring-white/5"
                  title="Contrôles de la fenêtre • Double-cliquer pour réduire"
                >
                  {/* Modern tactile drag grip handle */}
                  <div
                    className="w-full flex flex-col items-center justify-center py-1 cursor-grab active:cursor-grabbing gap-[3px] group/grip"
                    title="Glisser pour déplacer • Double-cliquer pour réduire"
                  >
                    <span className="w-4 h-[2px] rounded-full bg-gray-400/80 group-hover/grip:bg-white transition-colors" />
                    <span className="w-2.5 h-[2px] rounded-full bg-gray-500/80 group-hover/grip:bg-white/70 transition-colors" />
                  </div>

                  {/* Compact Minimize Button (Distinct Amber Window Pill) */}
                  <button
                    data-no-drag="true"
                    onClick={toggleMinimize}
                    className="group/btn relative w-full h-6 rounded-lg text-amber-400 hover:text-amber-300 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 transition-all duration-150 flex items-center justify-center active:scale-95 shadow-xs"
                    aria-label="Réduire"
                  >
                    <span className="material-symbols-outlined text-[15px]">close_fullscreen</span>
                    <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                      Réduire la barre
                    </span>
                  </button>

                  {/* Compact Reset Button (Distinct Sky Window Pill) */}
                  <button
                    data-no-drag="true"
                    onClick={handleResetToolbar}
                    className="group/btn relative w-full h-6 rounded-lg text-sky-400 hover:text-sky-300 bg-sky-400/15 hover:bg-sky-400/25 border border-sky-400/30 transition-all duration-150 flex items-center justify-center active:scale-95 shadow-xs"
                    aria-label="Réinitialiser"
                  >
                    <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                    <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                      Réinitialiser la position
                    </span>
                  </button>
                </div>

                {/* Clear Boundary Divider between Window Controls & Classroom Tools */}
                <div className="w-full flex items-center justify-center px-1">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600/70 to-transparent" />
                </div>

                {/* Classroom & Pedagogical Action Tools (Red Mark: Tightly Spaced & Distinct) */}
                <div className="w-full flex flex-col items-center gap-1 px-0.5">
                  {/* Invite Student Toggle (Teacher/Admin only) */}
                  {(role === 'teacher' || role === 'admin') && (
                    <button
                      data-no-drag="true"
                      onClick={() => {
                        const link = `${window.location.origin}/room/${roomId}`;
                        navigator.clipboard.writeText(link);
                        setLinkCopied(true);
                        setTimeout(() => setLinkCopied(false), 3000);
                      }}
                      className="group relative w-10 h-10 px-2 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-600/80 transition-all duration-150 flex items-center justify-center active:scale-95"
                      aria-label="Inviter un étudiant"
                    >
                      <span className="material-symbols-outlined text-[24px]">{linkCopied ? 'check' : 'person_add'}</span>
                      <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                        {linkCopied ? "Lien copié!" : "Copier le lien d'invitation"}
                      </span>
                    </button>
                  )}

                  {/* Whiteboard Toggle (Teacher/Admin only) */}
                  {(role === 'teacher' || role === 'admin') && (
                    <button
                      data-no-drag="true"
                      onClick={toggleWhiteboard}
                      className={`group relative w-10 h-10 px-2 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 ${isWhiteboardActive
                        ? 'bg-primary text-white shadow-md shadow-primary/40 ring-1 ring-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/90'
                        }`}
                      aria-label="Basculer le tableau blanc"
                    >
                      <span className="material-symbols-outlined text-[24px]">draw</span>
                      <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                        Basculer le tableau blanc
                      </span>
                    </button>
                  )}

                  {/* Screen Share Toggle (Teacher/Admin only) */}
                  {(role === 'teacher' || role === 'admin') && (
                    <button
                      data-no-drag="true"
                      onClick={toggleShareScreen}
                      className="group relative w-10 h-10 px-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/90 transition-all duration-150 flex items-center justify-center active:scale-95"
                      aria-label="Partager l'écran"
                    >
                      <span className="material-symbols-outlined text-[24px]">present_to_all</span>
                      <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                        Partager l'écran
                      </span>
                    </button>
                  )}

                  {/* Homework Toggle Button */}
                  <button
                    data-no-drag="true"
                    onClick={() => setActivePanel(activePanel === 'homework' ? 'none' : 'homework')}
                    className={`group relative w-10 h-10 px-2 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 ${activePanel === 'homework'
                      ? 'bg-primary text-white shadow-md shadow-primary/40 ring-1 ring-white/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/90'
                      }`}
                    aria-label="Devoirs"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {activePanel === 'homework' ? 'close' : 'assignment'}
                    </span>
                    <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                      {activePanel === 'homework' ? 'Fermer les devoirs' : 'Ouvrir les devoirs'}
                    </span>
                  </button>

                  {/* Bibliothek Toggle Button */}
                  <button
                    data-no-drag="true"
                    onClick={() => setActivePanel(activePanel === 'bibliothek' ? 'none' : 'bibliothek')}
                    className={`group relative w-10 h-10 px-2 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 ${activePanel === 'bibliothek'
                      ? 'bg-primary text-white shadow-md shadow-primary/40 ring-1 ring-white/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/90'
                      }`}
                    aria-label="Bibliothèque"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {activePanel === 'bibliothek' ? 'close' : 'local_library'}
                    </span>
                    <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                      {activePanel === 'bibliothek' ? 'Fermer la bibliothèque' : 'Ouvrir la bibliothèque'}
                    </span>
                  </button>

                  {/* Subtle Separator between tools and exit actions */}
                  <div className="w-5 h-[1px] bg-gray-700/60 my-0.5" />

                  {/* Leave Call Button */}
                  <button
                    data-no-drag="true"
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
                    className="group relative w-10 h-10 px-2 rounded-xl text-gray-400 hover:text-amber-300 hover:bg-amber-500/15 transition-all duration-150 flex items-center justify-center active:scale-95"
                    aria-label="Quitter"
                  >
                    <span className="material-symbols-outlined text-[24px]">logout</span>
                    <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-gray-900/95 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-gray-700 z-50`}>
                      Quitter la salle (En cachette)
                    </span>
                  </button>

                  {/* End Class Button (Teacher/Admin only) */}
                  {(role === 'teacher' || role === 'admin') && (
                    <button
                      data-no-drag="true"
                      onClick={handleEndClass}
                      className="group relative w-10 h-10 px-2 rounded-xl text-red-400 hover:text-white hover:bg-red-600/90 transition-all duration-150 flex items-center justify-center active:scale-95"
                      aria-label="Terminer"
                    >
                      <span className="material-symbols-outlined text-[24px]">power_settings_new</span>
                      <span className={`hidden lg:block absolute ${tooltipPositionClass} px-2.5 py-1 bg-red-950/95 text-red-200 text-xs font-medium rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-red-800 z-50`}>
                        Terminer le cours
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
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
            <div className="flex-1 overflow-y-auto hide-scrollbar" data-lenis-prevent>
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
