import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Categorization = ({ exercise }) => {
  const { title, instruction, categories, items } = exercise;
  
  // State: item.id -> category name
  const [placements, setPlacements] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shuffledItems, setShuffledItems] = useState([]);

  useEffect(() => {
    setShuffledItems([...items].map((it, idx) => ({ ...it, id: idx })).sort(() => Math.random() - 0.5));
  }, [items]);

  const handlePlace = (itemId, cat) => {
    if (isSubmitted) return;
    setPlacements({ ...placements, [itemId]: cat });
  };

  const checkAnswers = () => setIsSubmitted(true);

  let score = 0;
  if (isSubmitted) {
    shuffledItems.forEach(item => {
      if (placements[item.id] === item.category) score++;
    });
  }

  const unplaced = shuffledItems.filter(item => !placements[item.id]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">To Sort:</h4>
        <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <AnimatePresence>
            {unplaced.map(item => (
              <motion.div layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} key={item.id} className="bg-white border border-slate-300 shadow-sm px-3 py-1.5 rounded-md font-medium text-slate-700 cursor-pointer hover:bg-slate-50 flex items-center">
                {item.word}
                <select 
                  className="ml-2 bg-transparent text-sm text-indigo-600 font-bold focus:outline-none cursor-pointer"
                  onChange={(e) => handlePlace(item.id, e.target.value)}
                  value=""
                >
                  <option value="" disabled>Move...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </motion.div>
            ))}
          </AnimatePresence>
          {unplaced.length === 0 && <span className="text-slate-400 italic">All items placed.</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {categories.map(cat => {
          const catItems = shuffledItems.filter(item => placements[item.id] === cat);
          
          return (
            <div key={cat} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col">
              <div className="bg-slate-200 px-4 py-2 font-semibold text-slate-700 text-center">{cat}</div>
              <div className="p-4 flex-1 flex flex-col gap-2 min-h-[100px]">
                <AnimatePresence>
                  {catItems.map(item => {
                    const isCorrect = isSubmitted && item.category === cat;
                    const isWrong = isSubmitted && !isCorrect;

                    return (
                      <motion.div layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={item.id} className={`flex justify-between items-center bg-white border px-3 py-2 rounded shadow-sm ${isCorrect ? 'border-green-500' : isWrong ? 'border-red-500' : 'border-slate-300'}`}>
                        <span className={`font-medium ${isCorrect ? 'text-green-700' : isWrong ? 'text-red-700' : 'text-slate-700'}`}>{item.word}</span>
                        {!isSubmitted && (
                          <button onClick={() => handlePlace(item.id, null)} className="text-slate-400 hover:text-red-500 font-bold">&times;</button>
                        )}
                        {isWrong && <span className="text-xs text-red-500 font-bold ml-2">({item.category})</span>}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
        <button onClick={checkAnswers} disabled={isSubmitted || unplaced.length > 0} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          Check Answers
        </button>
        {isSubmitted && (
          <div className="text-lg font-bold text-slate-800">
            Score: <span className={score === items.length ? 'text-green-500' : 'text-indigo-600'}>{score} / {items.length}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default Categorization;
