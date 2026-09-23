import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const TrueFalse = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, questions, tag, context } = exercise;
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);

  const handleSelect = (idx, value) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [idx]: value }));
  };

  let score = 0;
  if (isSubmitted) {
    questions.forEach((q, idx) => { if (answers[idx] === q.isTrue) score++; });
  }

  const handleCheck = () => {
    let s = 0;
    questions.forEach((q, idx) => { if (answers[idx] === q.isTrue) s++; });
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(s, questions.length, answers);
  };

  const allAnswered = questions.every((_, idx) => answers[idx] !== undefined);

  return (
    <ExerciseShell
      index={index}
      typeLabel="Richtig oder Falsch"
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
      <div className="divide-y divide-surface-variant/40">
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = isSubmitted && userAnswer === q.isTrue;
          const isWrong   = isSubmitted && userAnswer !== undefined && !isCorrect;

          const btnBase = 'flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-bold rounded-xl border transition-all duration-150 flex-1 sm:flex-none min-w-[100px] ';
          
          const richtigCls = (() => {
            if (!isSubmitted) return btnBase + (userAnswer === true ? 'bg-primary text-on-primary border-primary shadow-md' : 'bg-surface border-surface-variant/40 text-secondary hover:bg-surface-variant/20 hover:text-on-surface hover:border-surface-variant/60');
            if (q.isTrue === true) return btnBase + 'bg-success-green/10 text-success-green border-success-green/40 ring-1 ring-success-green/20';
            if (userAnswer === true) return btnBase + 'bg-error/10 text-error border-error/40 ring-1 ring-error/20';
            return btnBase + 'bg-surface/50 border-surface-variant/20 text-secondary/40';
          })();
          
          const falschCls = (() => {
            if (!isSubmitted) return btnBase + (userAnswer === false ? 'bg-primary text-on-primary border-primary shadow-md' : 'bg-surface border-surface-variant/40 text-secondary hover:bg-surface-variant/20 hover:text-on-surface hover:border-surface-variant/60');
            if (q.isTrue === false) return btnBase + 'bg-success-green/10 text-success-green border-success-green/40 ring-1 ring-success-green/20';
            if (userAnswer === false) return btnBase + 'bg-error/10 text-error border-error/40 ring-1 ring-error/20';
            return btnBase + 'bg-surface/50 border-surface-variant/20 text-secondary/40';
          })();

          return (
            <div key={idx} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Statement */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-start">
                  <span className="text-secondary text-base font-bold tabular-nums mr-3 mt-0.5">{idx + 1}.</span>
                  <span className="text-body-md text-on-surface leading-relaxed">{q.statement}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0 self-start lg:self-center ml-7 lg:ml-0">
                <button disabled={isSubmitted} onClick={() => handleSelect(idx, true)} className={richtigCls}>
                  <CheckCircle2 className="w-4 h-4" />
                  Richtig
                </button>
                <button disabled={isSubmitted} onClick={() => handleSelect(idx, false)} className={falschCls}>
                  <XCircle className="w-4 h-4" />
                  Falsch
                </button>
              </div>
            </div>
          );
        })}
      </div>


    </ExerciseShell>
  );
};

export default TrueFalse;
