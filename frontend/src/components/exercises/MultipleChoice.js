import React, { useState } from 'react';
import ExerciseShell from './ExerciseShell';

const MultipleChoice = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, questions, tag, context } = exercise;
  const [userAnswers, setUserAnswers] = useState(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);

  const handleSelect = (questionId, option) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  let score = 0;
  if (isSubmitted) {
    questions.forEach(q => { if (userAnswers[q.id] === q.correctAnswer) score++; });
  }

  const handleCheck = () => {
    let s = 0;
    questions.forEach(q => { if (userAnswers[q.id] === q.correctAnswer) s++; });
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(s, questions.length, userAnswers);
  };

  const allAnswered = questions.every(q => userAnswers[q.id] != null);

  return (
    <ExerciseShell
      index={index}
      typeLabel="Multiple Choice"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={handleCheck}
      canCheck={!isSubmitted && allAnswered}
      isSubmitted={isSubmitted}
      score={score}
      total={questions.length}
    >
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[q.id];

          return (
            <div key={q.id} className="border-l-2 border-surface-variant/40 pl-4 mb-4">
              {/* Question */}
              <p className="text-body-md text-on-surface mb-3 flex items-start gap-2">
                <span className="text-secondary tabular-nums text-sm font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                <span className="font-medium">{q.question}</span>
              </p>

              {/* Options */}
              <div className="space-y-1 pl-4">
                {q.options.map((option, oIdx) => {
                  const isSelected = userAnswer === option;
                  const isCorrectOpt = option === q.correctAnswer;

                  let rowCls = 'flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer text-body-md transition-colors duration-100 ';
                  let dotCls = 'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ';

                  if (!isSubmitted) {
                    rowCls += isSelected ? 'text-primary font-bold bg-primary/10' : 'text-secondary hover:text-on-surface hover:bg-surface-variant/30';
                    dotCls += isSelected ? 'border-primary bg-primary' : 'border-secondary/50';
                  } else {
                    if (isCorrectOpt) {
                      rowCls += 'text-success-green font-bold bg-success-green/10';
                      dotCls += 'border-success-green bg-success-green';
                    } else if (isSelected && !isCorrectOpt) {
                      rowCls += 'text-error line-through opacity-70 bg-error/10';
                      dotCls += 'border-error bg-error';
                    } else {
                      rowCls += 'text-secondary/50';
                      dotCls += 'border-surface-variant/40';
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


