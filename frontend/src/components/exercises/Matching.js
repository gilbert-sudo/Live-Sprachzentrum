import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const Matching = ({ index, exercise }) => {
  const { title, instruction, pairs } = exercise;

  const [leftItems]  = useState(pairs.map(p => ({ id: p.id, text: p.left })));
  const [rightItems, setRightItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setRightItems([...pairs.map(p => ({ id: p.id, text: p.right }))].sort(() => Math.random() - 0.5));
  }, [pairs]);

  let score = 0;
  if (isSubmitted) {
    leftItems.forEach((leftItem, idx) => {
      if (rightItems[idx]?.id === leftItem.id) score++;
    });
  }

  return (
    <ExerciseShell
      index={index}
      typeLabel="Zuordnungsübung"
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted}
      isSubmitted={isSubmitted}
      score={score}
      total={leftItems.length}
    >
      {!isSubmitted && (
        <p className="text-[10px] text-stone-400 italic mb-3 flex items-center gap-1">
          <GripVertical className="w-3 h-3" />
          Rechte Spalte durch Ziehen neu anordnen
        </p>
      )}

      <div className="flex gap-3">
        {/* Left Column — static printed items */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1">Begriff</p>
          {leftItems.map(item => (
            <div key={`l-${item.id}`}
              className="px-3 py-2 rounded border border-stone-100 bg-stone-50 text-sm text-stone-700 min-h-[40px] flex items-center">
              {item.text}
            </div>
          ))}
        </div>

        {/* Connector dots */}
        <div className="flex flex-col pt-7 gap-2">
          {leftItems.map((_, i) => (
            <div key={i} className="min-h-[40px] flex items-center">
              <div className="w-4 border-t border-dashed border-stone-300" />
            </div>
          ))}
        </div>

        {/* Right Column — draggable */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1">Zuordnung</p>
          <Reorder.Group axis="y" values={rightItems} onReorder={isSubmitted ? () => {} : setRightItems} className="flex flex-col gap-2">
            {rightItems.map((item, idx) => {
              const isCorrect = isSubmitted && item.id === leftItems[idx].id;
              const isWrong   = isSubmitted && !isCorrect;
              return (
                <Reorder.Item
                  key={`r-${item.id}`}
                  value={item}
                  className={`px-3 py-2 rounded border flex items-center gap-2 min-h-[40px] text-sm
                    ${isSubmitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:border-indigo-200 hover:bg-indigo-50/30'}
                    ${isCorrect ? 'border-green-400 bg-green-50 text-green-800' : ''}
                    ${isWrong   ? 'border-red-400 bg-red-50 text-red-700'     : ''}
                    ${!isSubmitted ? 'border-stone-200 bg-white text-stone-700' : ''}
                  `}
                >
                  {!isSubmitted && <GripVertical className="w-3.5 h-3.5 text-stone-300 shrink-0" />}
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
