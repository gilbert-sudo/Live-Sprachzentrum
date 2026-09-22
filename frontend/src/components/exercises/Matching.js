import React, { useState, useEffect } from 'react';
import { Reorder, motion } from 'framer-motion';
import { GripVertical, CheckCircle2, XCircle } from 'lucide-react';

const Matching = ({ exercise }) => {
  const { title, instruction, pairs } = exercise;
  
  const [leftItems] = useState(pairs.map(p => ({ id: p.id, text: p.left })));
  const [rightItems, setRightItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Shuffle right items initially
    setRightItems([...pairs.map(p => ({ id: p.id, text: p.right }))].sort(() => Math.random() - 0.5));
  }, [pairs]);

  const checkAnswers = () => setIsSubmitted(true);

  let score = 0;
  if (isSubmitted) {
    leftItems.forEach((leftItem, idx) => {
      if (rightItems[idx]?.id === leftItem.id) score++;
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 overflow-hidden">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-4">{instruction}</p>}
      
      {!isSubmitted && (
        <p className="text-sm text-indigo-600 font-medium mb-6 bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex items-center gap-2">
          <GripVertical className="w-4 h-4" />
          Drag the items on the right to match them with the items on the left!
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 relative">
        {/* Left Column (Static) */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 pt-2 md:pt-8 relative">
            <h4 className="hidden md:block absolute top-0 left-0 font-medium text-slate-500 uppercase tracking-wider text-sm">Items</h4>
          {leftItems.map((item) => (
            <div key={`left-${item.id}`} className="w-full text-left p-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 min-h-[72px] flex items-center shadow-sm">
              {item.text}
            </div>
          ))}
        </div>

        {/* Right Column (Draggable) */}
        <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-8 relative">
          <h4 className="hidden md:block absolute top-0 left-0 font-medium text-slate-500 uppercase tracking-wider text-sm">Matches</h4>
          
          <Reorder.Group axis="y" values={rightItems} onReorder={isSubmitted ? () => {} : setRightItems} className="flex flex-col gap-3">
            {rightItems.map((item, idx) => {
              const isCorrect = isSubmitted && item.id === leftItems[idx].id;
              const isWrong = isSubmitted && !isCorrect;

              return (
                <Reorder.Item 
                  key={`right-${item.id}`} 
                  value={item}
                  className={`w-full text-left p-4 rounded-lg border flex items-center gap-3 min-h-[72px] shadow-sm
                    ${isSubmitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:border-indigo-300'} 
                    ${isCorrect ? 'border-green-500 bg-green-50' : ''} 
                    ${isWrong ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'}
                  `}
                >
                  {!isSubmitted && <GripVertical className="text-slate-400 w-5 h-5 flex-shrink-0" />}
                  <span className="flex-1 text-slate-800">{item.text}</span>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  {isWrong && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          onClick={checkAnswers}
          disabled={isSubmitted}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200
            ${isSubmitted 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md active:transform active:scale-95'
            }`}
        >
          Check Answers
        </button>

        {isSubmitted && (
            <div className="text-lg font-semibold">
                Score: <span className={score === leftItems.length ? 'text-green-600' : 'text-indigo-600'}>
                    {score} / {leftItems.length}
                </span>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default Matching;
