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
        <p className="text-[10px] text-stone-400 italic mb-3 flex items-center gap-1">
          <GripVertical className="w-3 h-3" />
          Sätze durch Ziehen in die richtige Reihenfolge bringen
        </p>
      )}

      <Reorder.Group axis="y" values={order} onReorder={isSubmitted ? () => {} : setOrder} className="space-y-2">
        {order.map((item, idx) => {
          const isCorrect = isSubmitted && item === items[idx];
          const isWrong   = isSubmitted && !isCorrect;

          return (
            <Reorder.Item
              key={item}
              value={item}
              className={`flex items-center gap-2.5 px-3 py-2 rounded border text-sm
                ${isSubmitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:border-indigo-200 hover:bg-indigo-50/20'}
                ${isCorrect ? 'border-green-400 bg-green-50 text-green-800' : ''}
                ${isWrong   ? 'border-red-400 bg-red-50 text-red-700'      : ''}
                ${!isSubmitted ? 'border-stone-200 bg-white text-stone-700' : ''}
              `}
            >
              {/* Position number gutter */}
              <span className="text-[10px] font-bold text-stone-300 tabular-nums w-4 text-center shrink-0">
                {idx + 1}
              </span>
              {!isSubmitted && <GripVertical className="w-3.5 h-3.5 text-stone-300 shrink-0" />}
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
