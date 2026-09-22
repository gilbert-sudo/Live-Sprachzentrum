import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Crossword = ({ exercise }) => {
  const { title, instruction, clues } = exercise;
  const [grid, setGrid] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute grid size
  const maxRow = Math.max(...clues.map(c => c.direction === 'down' ? c.row + c.answer.length : c.row));
  const maxCol = Math.max(...clues.map(c => c.direction === 'across' ? c.col + c.answer.length : c.col));

  useEffect(() => {
    // Build empty grid mapping
    const newGrid = Array(maxRow + 1).fill(null).map(() => Array(maxCol + 1).fill(null));
    
    clues.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'down' ? clue.row + i : clue.row;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        
        if (!newGrid[r][c]) {
          newGrid[r][c] = {
             row: r, col: c, 
             correctChar: clue.answer[i], 
             clueNumber: i === 0 ? clue.number : null 
          };
        } else if (i === 0) {
          newGrid[r][c].clueNumber = clue.number;
        }
      }
    });
    setGrid(newGrid);
  }, [clues, maxRow, maxCol]);

  const handleChange = (r, c, val) => {
    if (isSubmitted) return;
    setUserInputs({ ...userInputs, [`${r}-${c}`]: val.toUpperCase().slice(-1) });
  };

  const checkAnswers = () => setIsSubmitted(true);

  let correctCells = 0;
  let totalCells = 0;
  if (isSubmitted) {
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell) {
          totalCells++;
          if (userInputs[`${cell.row}-${cell.col}`] === cell.correctChar) {
            correctCells++;
          }
        }
      });
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 overflow-x-auto">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 overflow-x-auto p-2">
          <div 
            className="inline-grid gap-1 bg-slate-800 p-2 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${maxCol + 1}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rIdx) => 
              row.map((cell, cIdx) => (
                <div key={`${rIdx}-${cIdx}`} className={`w-10 h-10 relative flex items-center justify-center ${cell ? 'bg-white' : 'bg-transparent'}`}>
                  {cell && (
                    <>
                      {cell.clueNumber && (
                        <span className="absolute top-0.5 left-1 text-[10px] font-bold text-slate-500 z-10 pointer-events-none">{cell.clueNumber}</span>
                      )}
                      <input
                        type="text"
                        value={userInputs[`${rIdx}-${cIdx}`] || ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                        disabled={isSubmitted}
                        className={`w-full h-full text-center text-lg font-bold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500 z-0
                          ${isSubmitted && userInputs[`${rIdx}-${cIdx}`] === cell.correctChar ? 'bg-green-100 text-green-700' : ''}
                          ${isSubmitted && userInputs[`${rIdx}-${cIdx}`] && userInputs[`${rIdx}-${cIdx}`] !== cell.correctChar ? 'bg-red-100 text-red-700' : ''}
                          ${isSubmitted && !userInputs[`${rIdx}-${cIdx}`] ? 'bg-red-50 text-red-400' : ''}
                        `}
                      />
                      {isSubmitted && userInputs[`${rIdx}-${cIdx}`] !== cell.correctChar && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-50 bg-red-100 z-10 pointer-events-none">
                              <span className="text-red-900 font-bold">{cell.correctChar}</span>
                          </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full lg:w-64 space-y-6">
          <div>
            <h4 className="font-bold text-slate-700 mb-2 border-b pb-1">Waagerecht</h4>
            <ul className="space-y-1 text-sm text-slate-600">
              {clues.filter(c => c.direction === 'across').sort((a,b)=>a.number - b.number).map(c => (
                <li key={c.number}><strong>{c.number}.</strong> {c.clue}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-700 mb-2 border-b pb-1">Senkrecht</h4>
            <ul className="space-y-1 text-sm text-slate-600">
              {clues.filter(c => c.direction === 'down').sort((a,b)=>a.number - b.number).map(c => (
                <li key={c.number}><strong>{c.number}.</strong> {c.clue}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
        <button onClick={checkAnswers} disabled={isSubmitted} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          Check Answers
        </button>
        {isSubmitted && (
          <div className="text-lg font-bold text-slate-800">
            Score: <span className={correctCells === totalCells ? 'text-green-500' : 'text-indigo-600'}>{correctCells} / {totalCells}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default Crossword;
