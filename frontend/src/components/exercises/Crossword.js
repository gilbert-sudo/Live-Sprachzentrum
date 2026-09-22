import React, { useState, useEffect } from 'react';
import ExerciseShell from './ExerciseShell';

const Crossword = ({ index, exercise }) => {
  const { title, instruction, clues } = exercise;
  const [grid, setGrid]       = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const maxRow = Math.max(...clues.map(c => c.direction === 'down'   ? c.row + c.answer.length : c.row));
  const maxCol = Math.max(...clues.map(c => c.direction === 'across' ? c.col + c.answer.length : c.col));

  useEffect(() => {
    const g = Array(maxRow + 1).fill(null).map(() => Array(maxCol + 1).fill(null));
    clues.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'down'   ? clue.row + i : clue.row;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        if (!g[r][c]) {
          g[r][c] = { row: r, col: c, correctChar: clue.answer[i], clueNumber: i === 0 ? clue.number : null };
        } else if (i === 0) {
          g[r][c].clueNumber = clue.number;
        }
      }
    });
    setGrid(g);
  }, [clues, maxRow, maxCol]);

  const handleChange = (r, c, val) => {
    if (isSubmitted) return;
    setUserInputs(prev => ({ ...prev, [`${r}-${c}`]: val.toUpperCase().slice(-1) }));
  };

  let correctCells = 0, totalCells = 0;
  if (isSubmitted) {
    grid.forEach(row => row.forEach(cell => {
      if (cell) {
        totalCells++;
        if (userInputs[`${cell.row}-${cell.col}`] === cell.correctChar) correctCells++;
      }
    }));
  }

  return (
    <ExerciseShell
      index={index}
      typeLabel="Kreuzworträtsel"
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted}
      isSubmitted={isSubmitted}
      score={correctCells}
      total={totalCells || undefined}
    >
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Grid */}
        <div className="overflow-x-auto">
          <div
            className="inline-grid gap-0.5 bg-stone-700 p-1.5 rounded"
            style={{ gridTemplateColumns: `repeat(${maxCol + 1}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`w-8 h-8 relative flex items-center justify-center ${cell ? 'bg-white' : 'bg-transparent'}`}
                >
                  {cell && (
                    <>
                      {cell.clueNumber && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] font-bold text-stone-500 z-10 pointer-events-none leading-none">
                          {cell.clueNumber}
                        </span>
                      )}
                      <input
                        type="text"
                        value={userInputs[`${rIdx}-${cIdx}`] || ''}
                        onFocus={e => e.target.select()}
                        onChange={e => handleChange(rIdx, cIdx, e.target.value)}
                        disabled={isSubmitted}
                        className={`w-full h-full text-center text-sm font-bold uppercase focus:outline-none focus:ring-1 focus:ring-indigo-400 z-0
                          ${isSubmitted && userInputs[`${rIdx}-${cIdx}`] === cell.correctChar ? 'bg-green-100 text-green-700' : ''}
                          ${isSubmitted && userInputs[`${rIdx}-${cIdx}`] && userInputs[`${rIdx}-${cIdx}`] !== cell.correctChar ? 'bg-red-100 text-red-700' : ''}
                          ${isSubmitted && !userInputs[`${rIdx}-${cIdx}`] ? 'bg-red-50 text-red-400' : ''}
                        `}
                      />
                      {isSubmitted && userInputs[`${rIdx}-${cIdx}`] !== cell.correctChar && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-40 bg-red-100 z-10 pointer-events-none">
                          <span className="text-red-900 font-bold text-xs">{cell.correctChar}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clue list */}
        <div className="flex-1 space-y-3 text-xs">
          <div>
            <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1.5 border-b border-stone-100 pb-1">Waagerecht</h4>
            <ul className="space-y-1 text-stone-600">
              {clues.filter(c => c.direction === 'across').sort((a, b) => a.number - b.number).map(c => (
                <li key={c.number}><strong className="text-stone-800">{c.number}.</strong> {c.clue}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1.5 border-b border-stone-100 pb-1">Senkrecht</h4>
            <ul className="space-y-1 text-stone-600">
              {clues.filter(c => c.direction === 'down').sort((a, b) => a.number - b.number).map(c => (
                <li key={c.number}><strong className="text-stone-800">{c.number}.</strong> {c.clue}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ExerciseShell>
  );
};

export default Crossword;
