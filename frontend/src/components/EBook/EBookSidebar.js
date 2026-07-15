import React, { useState } from 'react';

export default function EBookSidebar({ chapters, activeLessonId, onSelectLesson, onClose }) {
  const [expandedChapters, setExpandedChapters] = useState(
    chapters.reduce((acc, chapter) => {
      acc[chapter.id] = true; // all expanded by default for demo
      return acc;
    }, {})
  );

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <aside className="w-full md:w-80 bg-surface-container-lowest border-r border-surface-variant flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-surface-variant sticky top-0 bg-surface-container-lowest z-10 flex justify-between items-center">
        <h2 className="font-title-lg text-title-lg text-germany-black dark:text-white">Inhaltsverzeichnis</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="bg-germany-red text-white p-1.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
            title="Schließen"
          >
            <span className="material-symbols-outlined font-bold text-[20px]">close</span>
          </button>
        )}
      </div>
      
      <div className="p-4 space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="border border-surface-variant rounded-xl overflow-hidden bg-surface-container-lowest dark:bg-germany-black">
            {/* Chapter Header */}
            <button 
              onClick={() => toggleChapter(chapter.id)}
              className="w-full text-left p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors"
            >
              <div>
                <h3 className="font-title-md text-title-md text-germany-black dark:text-white mb-1">{chapter.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden w-24">
                    <div 
                      className={`h-full rounded-full ${chapter.progress === 100 ? 'bg-success-green' : 'bg-germany-red'}`} 
                      style={{ width: `${chapter.progress}%` }}
                    ></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary">{chapter.progress}%</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-secondary transition-transform ${expandedChapters[chapter.id] ? 'rotate-90' : ''}`}>
                chevron_right
              </span>
            </button>

            {/* Lessons List */}
            {expandedChapters[chapter.id] && (
              <div className="bg-surface-subtle border-t border-surface-variant">
                {chapter.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`w-full text-left p-3 pl-8 flex items-center gap-3 transition-colors ${
                      activeLessonId === lesson.id 
                        ? 'bg-germany-gold/10 border-l-4 border-germany-gold' 
                        : 'border-l-4 border-transparent hover:bg-surface-container-low'
                    } cursor-pointer`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${
                      lesson.status === 'completed' ? 'text-success-green icon-filled' :
                      activeLessonId === lesson.id ? 'text-germany-gold icon-filled' : 'text-germany-red'
                    }`}>
                      {lesson.status === 'completed' ? 'check_circle' : 'play_circle'}
                    </span>
                    <span className={`font-body-sm text-body-sm ${activeLessonId === lesson.id ? 'font-bold text-germany-black dark:text-white' : 'text-secondary'}`}>
                      {lesson.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
