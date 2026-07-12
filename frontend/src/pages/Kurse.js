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
        <div className="flex items-center p-4 border-b border-surface-variant bg-surface-container-lowest sticky top-0 z-30 h-16">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`p-2 -ml-2 rounded-full hover:bg-surface-subtle text-germany-black dark:text-white ${isSidebarOpen ? 'md:hidden' : ''}`}
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <span className="font-title-md text-title-md ml-2 md:ml-0 font-bold">Kursübersicht</span>
        </div>

        <LessonContent lesson={currentLessonData} />
      </div>
    </div>
  );
}
