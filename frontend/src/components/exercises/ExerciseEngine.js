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

const ExerciseEngine = ({ exercises }) => {
  if (!exercises || !Array.isArray(exercises)) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Invalid exercise data provided. Expected an array of exercises.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 pb-12">
      <AnimatePresence>
        {exercises.map((exercise, index) => {
          const key = exercise.id || index;
          const idx = index + 1;
          switch (exercise.type) {
            case 'fill-in-the-blanks': return <FillInTheBlanks key={key} index={idx} exercise={exercise} />;
            case 'matching':           return <Matching         key={key} index={idx} exercise={exercise} />;
            case 'multiple-choice':    return <MultipleChoice   key={key} index={idx} exercise={exercise} />;
            case 'true-false':         return <TrueFalse        key={key} index={idx} exercise={exercise} />;
            case 'transformation':     return <Transformation   key={key} index={idx} exercise={exercise} />;
            case 'categorization':     return <Categorization   key={key} index={idx} exercise={exercise} />;
            case 'ordering':           return <Ordering         key={key} index={idx} exercise={exercise} />;
            case 'crossword':          return <Crossword        key={key} index={idx} exercise={exercise} />;
            case 'text-marking':       return <TextMarking      key={key} index={idx} exercise={exercise} />;
            default:
              return (
                <div key={key} className="p-4 text-orange-600 bg-orange-50 rounded-lg border border-orange-200">
                  Unknown exercise type: <strong>{exercise.type}</strong>
                </div>
              );
          }
        })}
      </AnimatePresence>
    </div>
  );
};

export default ExerciseEngine;

