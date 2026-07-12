import React, { useState } from 'react';
import EBookSidebar from '../components/EBook/EBookSidebar';
import LessonContent from '../components/EBook/LessonContent';
import { lektion1Chapters, lektion1 } from '../data/lektion1';

export default function Kurse() {
  const [activeLessonId, setActiveLessonId] = useState('l1-a'); // Default to first in-progress lesson
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // In a real app, this would fetch the lesson data based on activeLessonId
  // For this demo, we use the single lektion1 if it's the one selected
  const currentLessonData = (activeLessonId.startsWith('l1-')) ? lektion1 : null;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface-container-lowest">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-germany-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Area */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 w-80 shadow-2xl md:shadow-none ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <EBookSidebar 
          chapters={lektion1Chapters} 
          activeLessonId={activeLessonId} 
          onSelectLesson={(id) => {
            setActiveLessonId(id);
            setIsMobileSidebarOpen(false); // Close sidebar on mobile after selection
          }} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile Header (Hamburger Menu) */}
        <div className="md:hidden flex items-center p-4 border-b border-surface-variant bg-surface-container-lowest sticky top-0 z-30">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 -ml-2 rounded-full hover:bg-surface-subtle text-germany-black dark:text-white"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <span className="font-title-md text-title-md ml-2 font-bold">Kursübersicht</span>
        </div>

        <LessonContent lesson={currentLessonData} />
      </div>
    </div>
  );
}
