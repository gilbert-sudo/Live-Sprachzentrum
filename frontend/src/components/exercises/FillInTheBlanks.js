import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

/* ─── chip variants ──────────────────────────────────────────────── */
const chipV = {
  hidden:  { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } },
  exit:    { scale: 0.7, opacity: 0, transition: { duration: 0.12 } },
};

/* ─── DraggableChip ──────────────────────────────────────────────── */
const DraggableChip = ({ word, onDragStart, onDragEnd, isDragging, disabled }) => (
  <motion.span
    layout
    variants={chipV}
    initial="hidden"
    animate="visible"
    exit="exit"
    draggable={!disabled}
    onDragStart={() => onDragStart(word)}
    onDragEnd={onDragEnd}
    style={{ opacity: isDragging ? 0.3 : 1 }}
    className="select-none bg-white border border-stone-200 px-2.5 py-1 rounded text-xs font-medium text-stone-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-300 hover:shadow transition-all duration-150"
  >
    {word}
  </motion.span>
);

/* ─── BlankSlot ──────────────────────────────────────────────────── */
const BlankSlot = ({ filled, isOver, onDragOver, onDragLeave, onDrop, onClear, isSubmitted, isCorrect, isWrong, correctAnswer }) => {
  const base = 'inline-flex items-center gap-1 mx-1 align-middle min-w-[80px] px-2.5 py-0.5 rounded border-2 border-dashed text-xs font-medium transition-all duration-150';

  if (filled) {
    const cls = isSubmitted
      ? isCorrect ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-800'
      : 'bg-indigo-50 border-indigo-300 text-indigo-800';
    return (
      <motion.span layout animate={{ scale: 1 }} className={`${base} ${cls}`}>
        <span>{filled}</span>
        {isSubmitted && isCorrect && <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />}
        {isSubmitted && isWrong  && (
          <>
            <XCircle className="w-3 h-3 text-red-400 shrink-0" />
            <span className="text-[10px] text-red-400 font-normal">({correctAnswer})</span>
          </>
        )}
        {!isSubmitted && (
          <button onClick={onClear} className="text-indigo-200 hover:text-red-400 font-bold leading-none ml-auto text-xs transition-colors">×</button>
        )}
      </motion.span>
    );
  }

  return (
    <motion.span
      layout
      animate={isOver ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`${base} cursor-default ${isOver ? 'border-indigo-400 bg-indigo-50 shadow shadow-indigo-100' : 'border-stone-300 bg-stone-50'}`}
    >
      {isOver
        ? <span className="text-indigo-400 italic">Ablegen</span>
        : <span className="text-stone-300 italic">______</span>
      }
    </motion.span>
  );
};

/* ─── Main Component ─────────────────────────────────────────────── */
const FillInTheBlanks = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, text, wordBank, answers, tag, context } = exercise;

  const [placements, setPlacements] = useState(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);
  const [overBlank, setOverBlank]     = useState(null);
  const draggingWord = useRef(null);

  /* drag handlers */
  const handleDragStart = (word) => { draggingWord.current = word; };
  const handleDragEnd   = ()    => { draggingWord.current = null; setOverBlank(null); };
  const makeDragOver    = (id)  => (e) => { e.preventDefault(); setOverBlank(id); };
  const handleLeave     = ()    => setOverBlank(null);

  const handleDropOnBlank = (blankIndex) => (e) => {
    e.preventDefault();
    if (!draggingWord.current || isSubmitted) return;
    setPlacements(prev => ({ ...prev, [blankIndex]: draggingWord.current }));
    setOverBlank(null); draggingWord.current = null;
  };

  const handleDropOnBank = (e) => {
    e.preventDefault();
    if (!draggingWord.current || isSubmitted) return;
    setPlacements(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (next[k] === draggingWord.current) delete next[k]; });
      return next;
    });
    setOverBlank(null); draggingWord.current = null;
  };

  const clearBlank = (blankIndex) => {
    if (isSubmitted) return;
    setPlacements(prev => { const n = { ...prev }; delete n[blankIndex]; return n; });
  };

  const hasDnD      = wordBank && wordBank.length > 0;
  const usedWords   = new Set(Object.values(placements));
  const poolWords   = hasDnD ? wordBank.filter(w => !usedWords.has(w)) : [];
  const totalBlanks = Object.keys(answers).length;
  const allFilled   = Object.keys(placements).length === totalBlanks;

  let score = 0;
  if (isSubmitted) {
    Object.keys(answers).forEach(k => {
      if (placements[k]?.toLowerCase().trim() === answers[k].toLowerCase().trim()) score++;
    });
  }

  const handleCheck = () => {
    let s = 0;
    Object.keys(answers).forEach(k => {
      if (placements[k]?.toLowerCase().trim() === answers[k].toLowerCase().trim()) s++;
    });
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(s, totalBlanks, placements);
  };

  const parts = text.split(/(\{\d+\})/g);

  return (
    <ExerciseShell
      index={index}
      typeLabel="Lückentext"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={handleCheck}
      canCheck={!isSubmitted && (hasDnD ? allFilled : true)}
      isSubmitted={isSubmitted}
      score={score}
      total={totalBlanks}
    >
      {/* Word Bank */}
      {hasDnD && (
        <div className="mb-4">
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1.5">Wortbank</p>
          <motion.div
            onDragOver={makeDragOver('bank')}
            onDragLeave={handleLeave}
            onDrop={handleDropOnBank}
            className={`min-h-[44px] flex flex-wrap gap-1.5 p-2 rounded border-2 border-dashed transition-colors duration-150 ${
              overBlank === 'bank' ? 'border-stone-400 bg-stone-100' : 'border-stone-200 bg-stone-50/50'
            }`}
          >
            <AnimatePresence>
              {poolWords.map((word, idx) => (
                <DraggableChip
                  key={word + idx}
                  word={word}
                  isDragging={draggingWord.current === word}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  disabled={isSubmitted}
                />
              ))}
            </AnimatePresence>
            {poolWords.length === 0 && (
              <span className="m-auto text-[10px] italic text-stone-300">
                {allFilled ? 'Alle Wörter platziert ✓' : '—'}
              </span>
            )}
          </motion.div>
        </div>
      )}

      {/* Sentence with blanks */}
      <div className="text-sm text-stone-800 leading-9">
        {parts.map((part, idx) => {
          const match = part.match(/\{(\d+)\}/);
          if (match) {
            const blankIndex = match[1];
            const filled     = placements[blankIndex] || null;
            const isCorrect  = isSubmitted && filled?.toLowerCase().trim() === answers[blankIndex]?.toLowerCase().trim();
            const isWrong    = isSubmitted && !isCorrect;

            if (hasDnD) {
              return (
                <BlankSlot
                  key={idx}
                  filled={filled}
                  isOver={overBlank === blankIndex}
                  onDragOver={makeDragOver(blankIndex)}
                  onDragLeave={handleLeave}
                  onDrop={handleDropOnBlank(blankIndex)}
                  onClear={() => clearBlank(blankIndex)}
                  isSubmitted={isSubmitted}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  correctAnswer={answers[blankIndex]}
                />
              );
            }

            /* Free-text mode (no word bank) */
            return (
              <span key={idx} className="inline-flex items-center mx-1 align-middle">
                <input
                  type="text"
                  value={placements[blankIndex] || ''}
                  onChange={e => setPlacements(prev => ({ ...prev, [blankIndex]: e.target.value }))}
                  disabled={isSubmitted}
                  className={`bg-stone-50 border-b-2 px-2 py-0.5 text-center text-xs font-medium focus:outline-none focus:border-indigo-400 min-w-[90px] transition-colors rounded-t
                    ${isCorrect ? 'border-green-500 text-green-700 bg-green-50'  : ''}
                    ${isWrong   ? 'border-red-400 text-red-700 bg-red-50'        : ''}
                    ${!isSubmitted ? 'border-stone-300' : ''}
                  `}
                />
                {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 ml-1" />}
                {isWrong   && <XCircle      className="w-3.5 h-3.5 text-red-400 ml-1"  />}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    </ExerciseShell>
  );
};

export default FillInTheBlanks;
