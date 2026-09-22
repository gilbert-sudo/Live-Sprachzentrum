import React, { useState } from 'react';
import ExerciseShell from './ExerciseShell';

const MultipleChoice = ({ index, exercise }) => {
  const { title, instruction, questions, tag, context } = exercise;
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId, option) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  let score = 0;
  if (isSubmitted) {
    questions.forEach(q => { if (userAnswers[q.id] === q.correctAnswer) score++; });
  }

  const allAnswered = questions.every(q => userAnswers[q.id] != null);

  return (
    <ExerciseShell
      index={index}
      typeLabel="Multiple Choice"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted && allAnswered}
      isSubmitted={isSubmitted}
      score={score}
      total={questions.length}
    >
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[q.id];

          return (
            <div key={q.id} className="border-l-2 border-stone-100 pl-3">
              {/* Question */}
              <p className="text-sm text-stone-700 mb-2 flex items-start gap-1.5">
                <span className="text-stone-400 tabular-nums text-xs font-medium shrink-0 mt-0.5">{idx + 1}.</span>
                <span className="font-medium">{q.question}</span>
              </p>

              {/* Options */}
              <div className="space-y-1 pl-4">
                {q.options.map((option, oIdx) => {
                  const isSelected = userAnswer === option;
                  const isCorrectOpt = option === q.correctAnswer;

                  let rowCls = 'flex items-center gap-2 py-1 px-2 rounded cursor-pointer text-sm transition-colors duration-100 ';
                  let dotCls = 'w-3.5 h-3.5 rounded-full border-[1.5px] shrink-0 flex items-center justify-center transition-colors ';

                  if (!isSubmitted) {
                    rowCls += isSelected ? 'text-indigo-700 font-medium' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50';
                    dotCls += isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-stone-300';
                  } else {
                    if (isCorrectOpt) {
                      rowCls += 'text-green-700 font-medium';
                      dotCls += 'border-green-500 bg-green-500';
                    } else if (isSelected && !isCorrectOpt) {
                      rowCls += 'text-red-600 line-through opacity-70';
                      dotCls += 'border-red-400 bg-red-400';
                    } else {
                      rowCls += 'text-stone-400';
                      dotCls += 'border-stone-200';
                    }
                  }

                  return (
                    <label key={oIdx} className={rowCls}>
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleSelect(q.id, option)}
                        disabled={isSubmitted}
                        className="sr-only"
                      />
                      <div className={dotCls}>
                        {(isSelected || (isSubmitted && isCorrectOpt)) && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ExerciseShell>
  );
};

export default MultipleChoice;


