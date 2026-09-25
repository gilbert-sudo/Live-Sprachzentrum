import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, GripHorizontal } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

/* ─── chip variants ──────────────────────────────────────────────── */
const chipV = {
  hidden:  { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } },
  exit:    { scale: 0.7, opacity: 0, transition: { duration: 0.12 } },
};

/* ─── DraggableChip ──────────────────────────────────────────────── */
const DraggableChip = ({ word, onDragStart, onDragEnd, isDragging, isSelected, onClick, disabled }) => (
  <motion.span
    layout
    variants={chipV}
    initial="hidden"
    animate="visible"
    exit="exit"
    draggable={!disabled}
    onClick={() => onClick && onClick(word)}
    onDragStart={() => onDragStart(word)}
    onDragEnd={onDragEnd}
    style={{ opacity: isDragging ? 0.3 : 1 }}
    className={`inline-flex items-center gap-1.5 select-none touch-none bg-surface border px-3 py-1.5 rounded-lg text-sm font-medium text-on-surface shadow-sm cursor-grab active:cursor-grabbing transition-all duration-150 ${isSelected ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30' : 'border-surface-variant/40 hover:border-primary/50 hover:shadow'}`}
  >
    {!disabled && <GripHorizontal className="w-4 h-4 text-secondary/50 shrink-0" />}
    {word}
  </motion.span>
);

/* ─── BlankSlot ──────────────────────────────────────────────────── */
const BlankSlot = ({ filled, isOver, isSelectedTarget, onDragOver, onDragLeave, onDrop, onClear, onClick, isSubmitted, isCorrect, isWrong, correctAnswer }) => {
  const base = 'inline-flex items-center justify-center gap-1.5 mx-1 align-middle min-w-[110px] min-h-[36px] px-3 py-1 rounded-lg border-2 border-dashed text-sm font-medium transition-all duration-150';

  if (filled) {
    const cls = isSubmitted
      ? isCorrect ? 'bg-success-green/20 border-success-green/50 text-success-green font-bold' : 'bg-error/20 border-error/50 text-error font-bold'
      : 'bg-primary/20 border-primary text-on-surface font-bold cursor-pointer hover:bg-primary/30';
    return (
      <motion.span layout animate={{ scale: 1 }} className={`${base} ${cls}`} onClick={onClick}>
        <span>{filled}</span>
        {isSubmitted && isCorrect && <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />}
        {isSubmitted && isWrong  && (
          <>
            <XCircle className="w-3 h-3 text-red-400 shrink-0" />
            <span className="text-[10px] text-red-400 font-normal">({correctAnswer})</span>
          </>
        )}
        {!isSubmitted && (
          <button onClick={(e) => { e.stopPropagation(); onClear(); }} className="text-secondary hover:text-error font-bold leading-none ml-auto text-sm transition-colors">×</button>
        )}
      </motion.span>
    );
  }

  return (
    <motion.span
      layout
      animate={isOver || isSelectedTarget ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      className={`${base} ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:border-indigo-500/50'} ${(isOver || isSelectedTarget) ? 'border-indigo-500 bg-indigo-500/10 shadow-inner shadow-indigo-500/20' : 'border-surface-variant/40 bg-surface-variant/20 shadow-inner'}`}
    >
      {(isOver || isSelectedTarget)
        ? <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">Ablegen</span>
        : <span className="text-secondary/40 text-[10px] uppercase font-bold tracking-wider">Lücke</span>
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
  const [selectedWord, setSelectedWord] = useState(null);
  const draggingWord = useRef(null);

  /* drag handlers */
  const handleDragStart = (word) => { draggingWord.current = word; setSelectedWord(null); };
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
    setOverBlank(null);
    draggingWord.current = null;
  };

  /* click handlers */
  const handleChipClick = (word) => {
    if (isSubmitted) return;
    setSelectedWord(prev => prev === word ? null : word);
  };

  const handleBlankClick = (blankIndex) => {
    if (isSubmitted) return;
    if (selectedWord) {
      setPlacements(prev => ({ ...prev, [blankIndex]: selectedWord }));
      setSelectedWord(null);
    }
  };

  const clearBlank = (blankIndex) => {
    if (isSubmitted) return;
    setPlacements(prev => { const n = { ...prev }; delete n[blankIndex]; return n; });
  };

  const hasDnD      = wordBank && wordBank.length > 0;
  
  const poolWords = [];
  if (hasDnD) {
    const usedCounts = {};
    Object.values(placements).forEach(w => {
      usedCounts[w] = (usedCounts[w] || 0) + 1;
    });

    wordBank.forEach(w => {
      if (usedCounts[w] > 0) {
        usedCounts[w]--;
      } else {
        poolWords.push(w);
      }
    });
  }
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Wortbank</p>
          <motion.div
            onDragOver={makeDragOver('bank')}
            onDragLeave={handleLeave}
            onDrop={handleDropOnBank}
            className={`min-h-[44px] flex flex-wrap gap-2 p-3 rounded-xl border-2 border-dashed transition-colors duration-150 ${
              overBlank === 'bank' ? 'border-indigo-500 bg-indigo-500/10' : 'border-surface-variant/40 bg-surface-variant/20'
            }`}
          >
            <AnimatePresence>
              {poolWords.map((word, idx) => (
                <DraggableChip
                  key={word + idx}
                  word={word}
                  isDragging={draggingWord.current === word}
                  isSelected={selectedWord === word}
                  onClick={handleChipClick}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  disabled={isSubmitted}
                />
              ))}
            </AnimatePresence>
            {poolWords.length === 0 && (
              <span className="m-auto text-[11px] italic text-secondary/50">
                {allFilled ? 'Alle Wörter platziert ✓' : '—'}
              </span>
            )}
          </motion.div>
        </div>
      )}

      {/* Sentence with blanks */}
      <div className="text-base text-on-surface leading-10">
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
                  isSelectedTarget={!!selectedWord && !filled}
                  onDragOver={makeDragOver(blankIndex)}
                  onDragLeave={handleLeave}
                  onDrop={handleDropOnBlank(blankIndex)}
                  onClear={() => clearBlank(blankIndex)}
                  onClick={() => handleBlankClick(blankIndex)}
                  isSubmitted={isSubmitted}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  correctAnswer={answers[blankIndex]}
                />
              );
            }

            return (
              <span key={idx} className="inline-flex items-center mx-1 align-middle">
                <input
                  type="text"
                  value={placements[blankIndex] || ''}
                  onChange={e => setPlacements(prev => ({ ...prev, [blankIndex]: e.target.value }))}
                  disabled={isSubmitted}
                  className={`bg-surface-variant/20 border-b-2 px-3 py-1.5 text-center text-sm font-bold text-on-surface focus:outline-none focus:border-primary focus:bg-surface-variant/40 min-w-[90px] transition-colors rounded-t-md
                    ${isCorrect ? 'border-success-green text-success-green bg-success-green/10' : ''}
                    ${isWrong   ? 'border-error text-error bg-error/10' : ''}
                    ${!isSubmitted ? 'border-surface-variant/60' : ''}
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
