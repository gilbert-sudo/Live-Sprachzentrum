import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const Matching = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, pairs, tag, context } = exercise;

  const [leftItems]  = useState(pairs.map(p => ({ id: p.id, text: p.left })));
  const [rightItems, setRightItems] = useState(savedAnswers || []);
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);

  useEffect(() => {
    if (!savedAnswers) {
      setRightItems([...pairs.map(p => ({ id: p.id, text: p.right }))].sort(() => Math.random() - 0.5));
    }
  }, [pairs, savedAnswers]);

  let score = 0;
  if (isSubmitted) {
    leftItems.forEach((leftItem, idx) => {
      if (rightItems[idx]?.id === leftItem.id) score++;
    });
  }

  const handleCheck = () => {
    let s = 0;
    leftItems.forEach((leftItem, idx) => {
      if (rightItems[idx]?.id === leftItem.id) s++;
    });
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(s, leftItems.length, rightItems);
  };

  return (
    <ExerciseShell
      index={index}
      typeLabel="Zuordnungsübung"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={handleCheck}
      canCheck={!isSubmitted}
      isSubmitted={isSubmitted}
      score={score}
      total={leftItems.length}
    >
      {!isSubmitted && (
        <p className="text-xs text-secondary/70 italic mb-4 flex items-center gap-1">
          <GripVertical className="w-4 h-4" />
          Rechte Spalte durch Ziehen neu anordnen
        </p>
      )}

      <div className="flex gap-3">
        {/* Left Column — static printed items */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Begriff</p>
          {leftItems.map(item => (
            <div key={`l-${item.id}`}
              className="px-4 py-2 rounded-lg border border-surface-variant/40 bg-surface-variant/10 text-body-md text-on-surface min-h-[48px] flex items-center">
              {item.text}
            </div>
          ))}
        </div>

        {/* Connector dots */}
        <div className="flex flex-col pt-8 gap-3">
          {leftItems.map((_, i) => (
            <div key={i} className="min-h-[48px] flex items-center">
              <div className="w-4 border-t border-dashed border-surface-variant/50" />
            </div>
          ))}
        </div>

        {/* Right Column — draggable */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Zuordnung</p>
          <Reorder.Group axis="y" values={rightItems} onReorder={isSubmitted ? () => {} : setRightItems} className="flex flex-col gap-3">
            {rightItems.map((item, idx) => {
              const isCorrect = isSubmitted && item.id === leftItems[idx].id;
              const isWrong   = isSubmitted && !isCorrect;
              return (
                <Reorder.Item
                  key={`r-${item.id}`}
                  value={item}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-3 min-h-[48px] text-body-md
                    ${isSubmitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:border-primary/50 hover:bg-primary/5'}
                    ${isCorrect ? 'border-success-green/50 bg-success-green/20 text-success-green font-bold' : ''}
                    ${isWrong   ? 'border-error/50 bg-error/20 text-error font-bold'     : ''}
                    ${!isSubmitted ? 'border-surface-variant/40 bg-surface text-on-surface shadow-sm' : ''}
                  `}
                >
                  {!isSubmitted && <GripVertical className="w-4 h-4 text-secondary/50 shrink-0" />}
                  <span className="flex-1">{item.text}</span>
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                  {isWrong   && <XCircle      className="w-4 h-4 text-red-400 shrink-0"  />}
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      </div>
    </ExerciseShell>
  );
};

export default Matching;
