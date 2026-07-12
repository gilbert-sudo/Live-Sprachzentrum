import React, { useState } from 'react';
import ExerciseRenderer from './ExerciseRenderer';
import AudioPlayer from './AudioPlayer';
import InteractivePdfViewer from './InteractivePdfViewer';

export default function LessonContent({ lesson }) {
  const [activeAudio, setActiveAudio] = useState(null);

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-container-lowest">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4 opacity-50">menu_book</span>
          <h2 className="font-headline-sm text-headline-sm text-secondary">Bitte wählen Sie eine Lektion aus</h2>
        </div>
      </div>
    );
  }

  if (lesson.type === 'pdf-interactive') {
    return <InteractivePdfViewer lesson={lesson} />;
  }

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        // A simple markdown-like renderer for headings and paragraphs
        return (
          <div key={index} className="mb-8 prose prose-lg max-w-none dark:prose-invert">
            {section.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="font-headline-md text-headline-md text-germany-black dark:text-white mb-4 mt-8">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('# ')) {
                return <h1 key={i} className="font-headline-lg text-headline-lg text-germany-black dark:text-white mb-6 mt-10">{paragraph.replace('# ', '')}</h1>;
              }
              return <p key={i} className="font-body-lg text-body-lg text-germany-black/80 dark:text-white/80 leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>
        );

      case 'vocabulary':
        return (
          <div key={index} className="mb-8 bg-surface-container-low rounded-2xl p-6 border-l-4 border-germany-gold">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-germany-gold">lightbulb</span>
              <h3 className="font-title-md text-title-md font-bold">Wortschatz</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.words.map((wordObj, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-germany-black rounded-lg border border-surface-variant shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <span className="font-body-md text-body-md font-bold text-germany-red mr-2">{wordObj.word}</span>
                    <span className="font-label-sm text-label-sm text-secondary italic">({wordObj.type})</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary">{wordObj.translation}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audio':
        return (
          <div key={index} className="mb-8 p-4 bg-germany-black/5 dark:bg-white/5 rounded-xl border border-surface-variant flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-germany-red flex items-center justify-center text-white flex-shrink-0">
                <span className="material-symbols-outlined">headphones</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md font-bold">{section.title}</h3>
                <p className="font-label-md text-label-md text-secondary">Dauer: {section.duration}</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveAudio({ url: section.audioUrl, title: section.title })}
              className="px-6 py-2 bg-germany-black text-white dark:bg-white dark:text-germany-black rounded-full font-label-lg text-label-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-md"
            >
              <span className="material-symbols-outlined icon-filled">play_arrow</span>
              Abspielen
            </button>
          </div>
        );

      case 'exercise':
        return <ExerciseRenderer key={index} exercise={section} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 relative overflow-y-auto bg-surface-container-lowest">
      {/* Header Image / Title area */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-germany-black to-germany-red relative overflow-hidden flex items-end p-8 md:p-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-label-sm text-label-sm mb-3">Aktuelle Lektion</span>
          <h1 className="font-display-sm md:font-display-md text-display-sm md:text-display-md text-white font-bold">{lesson.title}</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-6 py-12 pb-32">
        {lesson.sections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Persistent Audio Player Widget */}
      {activeAudio && (
        <AudioPlayer 
          audioUrl={activeAudio.url} 
          title={activeAudio.title} 
          onClose={() => setActiveAudio(null)}
        />
      )}
    </div>
  );
}
