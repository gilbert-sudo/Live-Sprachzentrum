import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const TrueFalse = ({ index, exercise, onScoreReport }) => {
  const { title, instruction, questions, tag, context } = exercise;
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (onScoreReport) onScoreReport(s, questions.length);
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
      <div className="divide-y divide-stone-100">
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = isSubmitted && userAnswer === q.isTrue;
          const isWrong   = isSubmitted && userAnswer !== undefined && !isCorrect;

          const btnBase = 'px-3 py-1 text-xs font-semibold rounded transition-all duration-150 ';
          const richtigCls = (() => {
            if (!isSubmitted) return btnBase + (userAnswer === true ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50');
            if (q.isTrue === true) return btnBase + 'bg-green-500 text-white';
            if (userAnswer === true) return btnBase + 'bg-red-400 text-white';
            return btnBase + 'bg-white border border-stone-100 text-stone-300';
          })();
          const falschCls = (() => {
            if (!isSubmitted) return btnBase + (userAnswer === false ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50');
            if (q.isTrue === false) return btnBase + 'bg-green-500 text-white';
            if (userAnswer === false) return btnBase + 'bg-red-400 text-white';
            return btnBase + 'bg-white border border-stone-100 text-stone-300';
          })();

          return (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
              {/* Statement with left rule */}
              <div className="border-l-2 border-stone-200 pl-3 flex-1 min-w-0">
                <span className="text-stone-400 text-xs tabular-nums mr-1">{idx + 1}.</span>
                <span className="text-sm text-stone-700">{q.statement}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button disabled={isSubmitted} onClick={() => handleSelect(idx, true)}  className={richtigCls}>R</button>
                <button disabled={isSubmitted} onClick={() => handleSelect(idx, false)} className={falschCls}>F</button>
                {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 ml-1" />}
                {isWrong   && <XCircle      className="w-4 h-4 text-red-400 ml-1"   />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {!isSubmitted && (
        <p className="text-[10px] text-stone-400 mt-3 italic">R = Richtig &nbsp;·&nbsp; F = Falsch</p>
      )}
    </ExerciseShell>
  );
};

export default TrueFalse;
