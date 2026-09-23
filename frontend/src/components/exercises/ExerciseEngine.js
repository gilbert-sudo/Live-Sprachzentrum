import React from 'react';
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

/**
 * onExerciseScored(index, score, total) — called when a student checks
 * an individual exercise. Used by HomeworkExercise to track global score.
 */
const ExerciseEngine = ({ exercises, canEdit, onDeleteBlock, onExerciseScored }) => {
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
            ? (score, total) => onExerciseScored(index, score, total)
            : undefined;

          let ExerciseComponent;
          switch (exercise.type) {
            case 'fill-in-the-blanks': ExerciseComponent = <FillInTheBlanks index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'matching':           ExerciseComponent = <Matching         index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'multiple-choice':    ExerciseComponent = <MultipleChoice   index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'true-false':         ExerciseComponent = <TrueFalse        index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'transformation':     ExerciseComponent = <Transformation   index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'categorization':     ExerciseComponent = <Categorization   index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'ordering':           ExerciseComponent = <Ordering         index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'crossword':          ExerciseComponent = <Crossword        index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
            case 'text-marking':       ExerciseComponent = <TextMarking      index={idx} exercise={exercise} onScoreReport={handleScoreReport} />; break;
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
                <button
                  onClick={() => onDeleteBlock(index)}
                  className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-white border border-red-200 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 focus:opacity-100"
                  title="Supprimer cet exercice"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              )}
              {ExerciseComponent}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ExerciseEngine;
