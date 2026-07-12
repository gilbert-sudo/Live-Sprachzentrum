import React, { useState } from 'react';
import EBookSidebar from '../components/EBook/EBookSidebar';
import LessonContent from '../components/EBook/LessonContent';
import { lektion1Chapters, lektion1 } from '../data/lektion1';
import { lektion2 } from '../data/lektion2';

export default function Kurse() {
  const [activeLessonId, setActiveLessonId] = useState('l1-1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // Open by default on desktop

  // In a real app, this would fetch the lesson data based on activeLessonId
  // For this demo, we use the single lektion1 if it's the one selected
  let currentLessonData = lektion1;
  if (activeLessonId.startsWith('l1')) currentLessonData = lektion1;
  else if (activeLessonId.startsWith('l2')) currentLessonData = lektion2;

  return (
    <div className="flex h-[calc(95vh-64px)] overflow-hidden bg-surface-container-lowest">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-germany-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Area */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 md:relative flex-shrink-0 shadow-2xl md:shadow-none bg-surface-container-lowest ${isSidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full md:translate-x-0 w-80 md:w-0 overflow-hidden'
        }`}>
        <div className="w-80 h-full">
          <EBookSidebar
            chapters={lektion1Chapters}
            activeLessonId={activeLessonId}
            onClose={() => setIsSidebarOpen(false)}
            onSelectLesson={(id) => {
              setActiveLessonId(id);
              if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header (Visible on Mobile and Desktop) */}
        <div className="flex items-center p-3 border-b border-surface-variant bg-surface-container-lowest/90 backdrop-blur-xl sticky top-0 z-30 min-h-[4rem]">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`group flex items-center justify-center gap-3 px-5 py-2 -ml-1 rounded-full border-2 transition-all duration-300 ${
              isSidebarOpen 
                ? 'md:pointer-events-none md:border-transparent md:px-2 md:-ml-3' 
                : 'border-surface-variant/50 hover:border-germany-red hover:bg-germany-red/5 active:scale-95 shadow-sm hover:shadow-[0_4px_15px_rgba(221,0,0,0.15)] cursor-pointer'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-all duration-300 ${isSidebarOpen ? 'md:hidden text-secondary' : 'text-germany-red group-hover:scale-110'}`}>menu</span>
            <span className="font-title-md font-bold tracking-wide text-on-surface">Kursübersicht</span>
          </button>
        </div>

        <LessonContent lesson={currentLessonData} />
      </div>
    </div>
  );
}
