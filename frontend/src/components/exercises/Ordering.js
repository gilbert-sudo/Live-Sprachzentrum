import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const Ordering = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, items, tag, context } = exercise;
  const [order, setOrder] = useState(savedAnswers || []);
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);

  useEffect(() => {
    if (!savedAnswers) {
      setOrder([...items].sort(() => Math.random() - 0.5));
    }
  }, [items, savedAnswers]);

  let score = 0;
  if (isSubmitted) {
    order.forEach((item, idx) => { if (item === items[idx]) score++; });
  }

  const handleCheck = () => {
    let s = 0;
    order.forEach((item, idx) => { if (item === items[idx]) s++; });
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(s, items.length, order);
  };

  return (
    <ExerciseShell
      index={index}
      typeLabel="Reihenfolge"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={handleCheck}
      canCheck={!isSubmitted}
      checkLabel="Reihenfolge prüfen"
      isSubmitted={isSubmitted}
      score={score}
      total={items.length}
    >
      {!isSubmitted && (
        <p className="text-xs text-secondary/70 italic mb-4 flex items-center gap-1">
          <GripVertical className="w-4 h-4" />
          Sätze durch Ziehen in die richtige Reihenfolge bringen
        </p>
      )}

      <Reorder.Group axis="y" values={order} onReorder={isSubmitted ? () => {} : setOrder} className="flex flex-col gap-3">
        {order.map((item, idx) => {
          const isCorrect = isSubmitted && item === items[idx];
          const isWrong   = isSubmitted && !isCorrect;

          return (
            <Reorder.Item
              key={item}
              value={item}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-body-md
                ${isSubmitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:border-primary/50 hover:bg-primary/5'}
                ${isCorrect ? 'border-success-green/50 bg-success-green/20 text-success-green font-bold' : ''}
                ${isWrong   ? 'border-error/50 bg-error/20 text-error font-bold'      : ''}
                ${!isSubmitted ? 'border-surface-variant/40 bg-surface text-on-surface shadow-sm' : ''}
              `}
            >
              {/* Position number gutter */}
              <span className="text-xs font-bold text-secondary/50 tabular-nums w-4 text-center shrink-0">
                {idx + 1}
              </span>
              {!isSubmitted && <GripVertical className="w-4 h-4 text-secondary/50 shrink-0" />}
              <span className="flex-1 font-medium">{item}</span>
              {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
              {isWrong   && <XCircle      className="w-4 h-4 text-red-400 shrink-0"  />}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </ExerciseShell>
  );
};

export default Ordering;
