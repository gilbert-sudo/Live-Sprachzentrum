import React, { useState, useEffect, useRef } from 'react';
import ExerciseShell from './ExerciseShell';

const CELL_SIZE = 36; // px — fixed size for every cell

const Crossword = ({ index, exercise }) => {
  const { title, instruction, clues, tag, context } = exercise;
  const [grid, setGrid]             = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeKey, setActiveKey]   = useState(null);
  const inputRefs = useRef({});

  // ── Determine grid dimensions ─────────────────────────────────────
  const maxRow = Math.max(...clues.map(c =>
    c.direction === 'down' ? c.row + c.answer.length - 1 : c.row
  ));
  const maxCol = Math.max(...clues.map(c =>
    c.direction === 'across' ? c.col + c.answer.length - 1 : c.col
  ));
  const rows = maxRow + 1;
  const cols = maxCol + 1;

  // ── Build grid ────────────────────────────────────────────────────
  useEffect(() => {
    const g = Array.from({ length: rows }, () => Array(cols).fill(null));
    clues.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'down'   ? clue.row + i : clue.row;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        if (!g[r][c]) {
          g[r][c] = { row: r, col: c, correctChar: clue.answer[i].toUpperCase() };
        }
        // Assign clue number to the first cell of each clue
        if (i === 0) {
          g[r][c] = { ...g[r][c], clueNumber: clue.number };
        }
      }
    });
    setGrid(g);
  }, [clues, rows, cols]);

  // ── Input handler with auto-advance ──────────────────────────────
  const handleChange = (r, c, val) => {
    if (isSubmitted) return;
    const ch = val.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(-1);
    setUserInputs(prev => ({ ...prev, [`${r}-${c}`]: ch }));

    // Auto-advance: find which clue this cell belongs to and move to next cell
    if (ch) {
      // Try across first, then down
      const acrossClue = clues.find(cl => cl.direction === 'across' && cl.row === r && c >= cl.col && c < cl.col + cl.answer.length);
      const downClue   = clues.find(cl => cl.direction === 'down'   && cl.col === c && r >= cl.row && r < cl.row + cl.answer.length);
      const clueToAdvance = acrossClue || downClue;
      if (clueToAdvance) {
        const nr = clueToAdvance.direction === 'down'   ? r + 1 : r;
        const nc = clueToAdvance.direction === 'across' ? c + 1 : c;
        const nextRef = inputRefs.current[`${nr}-${nc}`];
        if (nextRef) { nextRef.focus(); nextRef.select(); }
      }
    }
  };

  // ── Backspace support ─────────────────────────────────────────────
  const handleKeyDown = (r, c, e) => {
    if (isSubmitted) return;
    if (e.key === 'Backspace' && !userInputs[`${r}-${c}`]) {
      // Move backwards
      const acrossClue = clues.find(cl => cl.direction === 'across' && cl.row === r && c > cl.col && c <= cl.col + cl.answer.length - 1);
      const downClue   = clues.find(cl => cl.direction === 'down'   && cl.col === c && r > cl.row && r <= cl.row + cl.answer.length - 1);
      const cl = acrossClue || downClue;
      if (cl) {
        const pr = cl.direction === 'down'   ? r - 1 : r;
        const pc = cl.direction === 'across' ? c - 1 : c;
        const prevRef = inputRefs.current[`${pr}-${pc}`];
        if (prevRef) { prevRef.focus(); prevRef.select(); }
      }
    }
    if (e.key === 'ArrowRight') { const ref = inputRefs.current[`${r}-${c+1}`]; if (ref) { ref.focus(); ref.select(); } }
    if (e.key === 'ArrowLeft')  { const ref = inputRefs.current[`${r}-${c-1}`]; if (ref) { ref.focus(); ref.select(); } }
    if (e.key === 'ArrowDown')  { const ref = inputRefs.current[`${r+1}-${c}`]; if (ref) { ref.focus(); ref.select(); } }
    if (e.key === 'ArrowUp')    { const ref = inputRefs.current[`${r-1}-${c}`]; if (ref) { ref.focus(); ref.select(); } }
  };

  // ── Scoring ───────────────────────────────────────────────────────
  let correctCells = 0, totalCells = 0;
  grid.forEach(row => row.forEach(cell => {
    if (cell) {
      totalCells++;
      if (userInputs[`${cell.row}-${cell.col}`] === cell.correctChar) correctCells++;
    }
  }));

  return (
    <ExerciseShell
      index={index}
      typeLabel="Kreuzworträtsel"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted}
      isSubmitted={isSubmitted}
      score={isSubmitted ? correctCells : undefined}
      total={isSubmitted ? totalCells : undefined}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Grid ────────────────────────────────────────────────── */}
        <div className="overflow-x-auto shrink-0">
          <div
            className="relative bg-stone-800 rounded-lg p-2 inline-block"
            style={{ lineHeight: 0 }}
          >
            {grid.map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', height: CELL_SIZE }}>
                {row.map((cell, cIdx) => {
                  const key = `${rIdx}-${cIdx}`;
                  const val = userInputs[key] || '';
                  const isCorrect = isSubmitted && val === cell?.correctChar;
                  const isWrong   = isSubmitted && !!val && val !== cell?.correctChar;
                  const isEmpty   = isSubmitted && !val && !!cell;

                  return (
                    <div
                      key={key}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        margin: 2,
                        position: 'relative',
                        flexShrink: 0,
                        borderRadius: 3,
                        background: cell
                          ? isCorrect ? '#dcfce7'
                          : isWrong   ? '#fee2e2'
                          : isEmpty   ? '#fff1f2'
                          : activeKey === key ? '#eef2ff'
                          : '#ffffff'
                          : 'transparent',
                        border: cell
                          ? `1.5px solid ${isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#d1d5db'}`
                          : 'none',
                        overflow: 'hidden',
                      }}
                    >
                      {cell && (
                        <>
                          {/* Clue number badge */}
                          {cell.clueNumber && (
                            <span style={{
                              position: 'absolute',
                              top: 1,
                              left: 2,
                              fontSize: 8,
                              fontWeight: 700,
                              color: '#6b7280',
                              lineHeight: 1,
                              pointerEvents: 'none',
                              zIndex: 2,
                            }}>
                              {cell.clueNumber}
                            </span>
                          )}

                          {/* Input */}
                          <input
                            ref={el => { inputRefs.current[key] = el; }}
                            type="text"
                            inputMode="text"
                            autoComplete="off"
                            value={val}
                            onFocus={e => { setActiveKey(key); e.target.select(); }}
                            onBlur={() => setActiveKey(null)}
                            onChange={e => handleChange(rIdx, cIdx, e.target.value)}
                            onKeyDown={e => handleKeyDown(rIdx, cIdx, e)}
                            disabled={isSubmitted}
                            maxLength={1}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              textAlign: 'center',
                              fontSize: 15,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              background: 'transparent',
                              border: 'none',
                              outline: 'none',
                              cursor: isSubmitted ? 'default' : 'text',
                              paddingTop: cell.clueNumber ? 8 : 0,
                              color: isCorrect ? '#15803d'
                                   : isWrong   ? '#b91c1c'
                                   : isEmpty   ? '#dc2626'
                                   : '#1c1917',   // ← always dark/readable
                              zIndex: 1,
                            }}
                          />

                          {/* Correct answer hint for wrong/empty cells after submit */}
                          {isSubmitted && (isWrong || isEmpty) && (
                            <span style={{
                              position: 'absolute',
                              bottom: 1,
                              right: 2,
                              fontSize: 8,
                              fontWeight: 700,
                              color: '#ef4444',
                              lineHeight: 1,
                              pointerEvents: 'none',
                              zIndex: 2,
                              opacity: 0.7,
                            }}>
                              {cell.correctChar}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── Clue List ────────────────────────────────────────────── */}
        <div className="flex-1 space-y-4 text-xs min-w-0">
          {clues.some(c => c.direction === 'across') && (
            <div>
              <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-2 border-b border-stone-100 pb-1">
                Waagerecht
              </h4>
              <ul className="space-y-1.5 text-stone-600">
                {clues.filter(c => c.direction === 'across').sort((a, b) => a.number - b.number).map(c => (
                  <li key={c.number} className="leading-snug">
                    <strong className="text-stone-800">{c.number}.</strong> {c.clue}
                    <span className="ml-1 text-stone-300 text-[10px]">({c.answer.length})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {clues.some(c => c.direction === 'down') && (
            <div>
              <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-2 border-b border-stone-100 pb-1">
                Senkrecht
              </h4>
              <ul className="space-y-1.5 text-stone-600">
                {clues.filter(c => c.direction === 'down').sort((a, b) => a.number - b.number).map(c => (
                  <li key={c.number} className="leading-snug">
                    <strong className="text-stone-800">{c.number}.</strong> {c.clue}
                    <span className="ml-1 text-stone-300 text-[10px]">({c.answer.length})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </ExerciseShell>
  );
};

export default Crossword;
