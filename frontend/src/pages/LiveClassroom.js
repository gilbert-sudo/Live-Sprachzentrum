import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function LiveClassroom() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [syncMessage, setSyncMessage] = useState('');
  const { user } = useAuth();
  
  const username = user?.name || location.state?.username || 'Guest';
  const role = user?.role || location.state?.role || 'student';

  useEffect(() => {
    // Connect to signaling/sync server
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_room', roomId, role);
    });

    // Listen for teacher actions
    newSocket.on('audio_play', (data) => {
      console.log('Teacher played audio:', data);
      setSyncMessage(`Playing synchronized audio: ${data.audioUrl}`);
      // In a real app, you would control an <audio> element here.
    });

    newSocket.on('audio_pause', () => {
      console.log('Teacher paused audio');
      setSyncMessage('Audio paused');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, role]);

  const handlePlayAudio = () => {
    if (role !== 'teacher') return;
    const dummyAudioUrl = 'https://example.com/lesson1.mp3';
    socket.emit('play_audio', { roomId, audioUrl: dummyAudioUrl });
    setSyncMessage(`You played audio: ${dummyAudioUrl}`);
  };

  const handlePauseAudio = () => {
    if (role !== 'teacher') return;
    socket.emit('pause_audio', { roomId });
    setSyncMessage('You paused audio');
  };

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
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header Panel */}
      <div className="p-4 bg-gray-800 flex justify-between items-center border-b border-gray-700">
        <div>
          <h2 className="text-xl font-bold">Room: {roomId}</h2>
          <p className="text-gray-400 text-sm">Joined as: {username} ({role})</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition font-semibold shadow-sm"
          >
            Leave Class
          </button>
          {(role === 'teacher' || role === 'admin') && (
            <button 
              onClick={handleEndClass}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition font-semibold shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
              End Class
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 bg-black relative">
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
            }}
          />
        </div>

        {/* Teacher / Sync Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 flex flex-col">
          <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Classroom Sync</h3>
          
          <div className="flex-1">
            {role === 'teacher' ? (
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Teacher Controls</h4>
                  <p className="text-sm text-gray-400 mb-4">Control media playback for all students in the room simultaneously.</p>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={handlePlayAudio}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm flex-1 flex justify-center items-center"
                    >
                      Play Audio
                    </button>
                    <button 
                      onClick={handlePauseAudio}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm flex-1 flex justify-center items-center"
                    >
                      Pause
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Student View</h4>
                <p className="text-sm text-gray-400">Waiting for teacher to start media playback...</p>
              </div>
            )}
            
            {/* Sync Notifications */}
            {syncMessage && (
              <div className="mt-4 bg-blue-900/50 border border-blue-500 p-3 rounded text-sm text-blue-200">
                <span className="font-bold">Sync Event:</span> {syncMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveClassroom;
