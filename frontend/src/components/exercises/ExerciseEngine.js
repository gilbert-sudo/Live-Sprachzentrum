import React, { useState } from 'react';
import FillInTheBlanks from './FillInTheBlanks';
import Matching from './Matching';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import Transformation from './Transformation';
import Categorization from './Categorization';
import Ordering from './Ordering';
import Crossword from './Crossword';
import TextMarking from './TextMarking';
import { AnimatePresence } from 'framer-motion';
import LibraryAudioPickerModal from '../Library/LibraryAudioPickerModal';

/**
 * onExerciseScored(index, score, total) — called when a student checks
 * an individual exercise. Used by HomeworkExercise to track global score.
 */
const ExerciseEngine = ({ exercises, savedAnswers, canEdit, onDeleteBlock, onUpdateBlock, onExerciseScored }) => {
  const [audioPickerIndex, setAudioPickerIndex] = useState(null);
  if (!exercises || !Array.isArray(exercises)) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Invalid exercise data provided. Expected an array of exercises.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 pb-12">
      <AnimatePresence>
        {exercises.map((exercise, index) => {
          const key = exercise.id || index;
          const idx = index + 1;

          // Each exercise gets a report callback that bubbles its score up
          const handleScoreReport = onExerciseScored
            ? (score, total, userAnswers) => onExerciseScored(index, score, total, userAnswers)
            : undefined;

          const savedAns = savedAnswers ? savedAnswers[index] : null;

          let ExerciseComponent;
          switch (exercise.type) {
            case 'fill-in-the-blanks': ExerciseComponent = <FillInTheBlanks index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'matching':           ExerciseComponent = <Matching         index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'multiple-choice':    ExerciseComponent = <MultipleChoice   index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'true-false':         ExerciseComponent = <TrueFalse        index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'transformation':     ExerciseComponent = <Transformation   index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'categorization':     ExerciseComponent = <Categorization   index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'ordering':           ExerciseComponent = <Ordering         index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'crossword':          ExerciseComponent = <Crossword        index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            case 'text-marking':       ExerciseComponent = <TextMarking      index={idx} exercise={exercise} savedAnswers={savedAns} onScoreReport={handleScoreReport} />; break;
            default:
              ExerciseComponent = (
                <div className="p-4 text-orange-600 bg-orange-50 rounded-lg border border-orange-200">
                  Unknown exercise type: <strong>{exercise.type}</strong>
                </div>
              );
              break;
          }

          return (
            <div key={key} className="relative group">
              {canEdit && (
                <div className="absolute top-2 right-2 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {exercise.audioUrl && (
                    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-lg shadow-sm">
                      <span className="material-symbols-outlined text-[16px]">audio_file</span>
                      <span className="text-xs font-semibold max-w-[150px] truncate">{exercise.audioTitle}</span>
                      <button 
                        onClick={() => {
                          const updated = { ...exercise };
                          delete updated.audioUrl;
                          delete updated.audioTitle;
                          onUpdateBlock && onUpdateBlock(index, updated);
                        }}
                        className="ml-1 hover:text-red-500 transition-colors"
                        title="Détacher l'audio"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setAudioPickerIndex(index)}
                    className="w-8 h-8 flex items-center justify-center bg-white border border-indigo-200 text-indigo-500 rounded-lg shadow-sm hover:bg-indigo-50 hover:text-indigo-600 focus:opacity-100 transition-colors"
                    title={exercise.audioUrl ? "Changer l'audio" : "Attacher un fichier audio"}
                  >
                    <span className="material-symbols-outlined text-[18px]">library_music</span>
                  </button>
                  <button
                    onClick={() => onDeleteBlock(index)}
                    className="w-8 h-8 flex items-center justify-center bg-white border border-red-200 text-red-500 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-600 focus:opacity-100 transition-colors"
                    title="Supprimer cet exercice"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              )}
              {exercise.audioUrl && (
                <div className="mb-3 bg-white dark:bg-[#18181B] border border-stone-200 dark:border-gray-800 rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-stone-700 dark:text-gray-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-indigo-500">headphones</span>
                    {exercise.audioTitle || 'Piste audio'}
                  </p>
                  <audio controls src={exercise.audioUrl} className="w-full h-10 custom-audio-player" />
                </div>
              )}
              {ExerciseComponent}
            </div>
          );
        })}
      </AnimatePresence>
      {audioPickerIndex !== null && (
        <LibraryAudioPickerModal 
          onClose={() => setAudioPickerIndex(null)}
          onSelect={(audioUrl, audioTitle) => {
            const updated = { ...exercises[audioPickerIndex], audioUrl, audioTitle };
            onUpdateBlock && onUpdateBlock(audioPickerIndex, updated);
          }}
        />
      )}
    </div>
  );
};

export default ExerciseEngine;
