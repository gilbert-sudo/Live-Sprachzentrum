import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExerciseShell from './ExerciseShell';

/* ─── chip spring variants ───────────────────────────────────────── */
const chipV = {
  hidden:  { scale: 0.75, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } },
  exit:    { scale: 0.75, opacity: 0, transition: { duration: 0.13 } },
};

/* ─── WordChip ───────────────────────────────────────────────────── */
const WordChip = ({ item, isDragging, onDragStart, onDragEnd, disabled, status }) => {
  const colorMap = {
    correct: 'bg-success-green/20 border-success-green/50 text-success-green font-bold',
    wrong:   'bg-error/20 border-error/50 text-error font-bold',
    default: 'bg-surface border-surface-variant/40 text-on-surface hover:border-primary/50 hover:shadow-sm cursor-grab active:cursor-grabbing',
  };
  return (
    <motion.div
      layout
      variants={chipV}
      initial="hidden"
      animate="visible"
      exit="exit"
      draggable={!disabled && status === 'default'}
      onDragStart={() => onDragStart(item.id)}
      onDragEnd={onDragEnd}
      style={{ opacity: isDragging ? 0.35 : 1 }}
      className={`select-none px-3 py-1.5 rounded-lg border text-sm font-medium shadow-sm transition-colors duration-150 ${colorMap[status] ?? colorMap.default}`}
    >
      {item.word}
      {status === 'wrong' && (
        <span className="ml-1.5 text-xs font-normal text-error">→ {item.category}</span>
      )}
    </motion.div>
  );
};

/* ─── DropBucket ─────────────────────────────────────────────────── */
const DropBucket = ({ cat, items, isOver, onDragOver, onDragLeave, onDrop, onReturn, isSubmitted }) => (
  <motion.div
    animate={isOver ? { scale: 1.02 } : { scale: 1 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
    className={`rounded-xl border-2 border-dashed flex flex-col overflow-hidden transition-colors duration-150 ${
      isOver ? 'border-primary bg-primary/20 shadow shadow-primary/30' : 'border-surface-variant/40 bg-surface-variant/10'
    }`}
  >
    {/* bucket header */}
    <div className={`px-3 py-2 text-sm font-bold tracking-wide text-center border-b transition-colors ${
      isOver ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-variant/20 text-secondary border-surface-variant/40'
    }`}>
      {cat}
      <span className="ml-1 font-normal opacity-70 text-xs">({items.length})</span>
    </div>
    {/* drop zone */}
    <div className="p-2 flex-1 min-h-[80px] flex flex-col gap-1.5">
      <AnimatePresence>
        {items.map(item => {
          const isCorrect = isSubmitted && item.category === cat;
          return (
            <div key={item.id} className="flex items-center gap-1">
              <WordChip item={item} isDragging={false} onDragStart={() => {}} onDragEnd={() => {}}
                disabled={isSubmitted} status={isSubmitted ? (isCorrect ? 'correct' : 'wrong') : 'default'} />
              {!isSubmitted && (
                <button onClick={() => onReturn(item.id)}
                  className="text-secondary hover:text-error transition-colors text-base leading-none font-bold ml-auto">
                  ×
                </button>
              )}
            </div>
          );
        })}
      </AnimatePresence>
      {items.length === 0 && (
        <p className={`m-auto text-xs italic ${isOver ? 'text-primary' : 'text-secondary/50'}`}>
          {isOver ? 'Hier ablegen' : 'Wörter hierher ziehen'}
        </p>
      )}
    </div>
  </motion.div>
);

/* ─── Main Component ─────────────────────────────────────────────── */
const Categorization = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, categories, items, tag, context } = exercise;

  const [shuffledItems, setShuffledItems] = useState([]);
  const [placements, setPlacements]       = useState(savedAnswers || {});
  const [isSubmitted, setIsSubmitted]     = useState(!!savedAnswers);
  const [overZone, setOverZone]           = useState(null);
  const draggingId = useRef(null);

  useEffect(() => {
    setShuffledItems([...items].map((it, idx) => ({ ...it, id: idx })).sort(() => Math.random() - 0.5));
    setPlacements({});
    setIsSubmitted(false);
  }, [items]);

  /* drag handlers */
  const handleDragStart = (id) => { draggingId.current = id; };
  const handleDragEnd   = ()   => { draggingId.current = null; setOverZone(null); };
  const makeDragOver    = (zone) => (e) => { e.preventDefault(); setOverZone(zone); };
  const handleDragLeave = () => setOverZone(null);

  const handleDropOnCategory = (cat) => (e) => {
    e.preventDefault();
    if (draggingId.current == null || isSubmitted) return;
    setPlacements(prev => ({ ...prev, [draggingId.current]: cat }));
    setOverZone(null); draggingId.current = null;
  };

  const handleDropOnPool = (e) => {
    e.preventDefault();
    if (draggingId.current == null || isSubmitted) return;
    setPlacements(prev => { const n = { ...prev }; delete n[draggingId.current]; return n; });
    setOverZone(null); draggingId.current = null;
  };

  const returnToPool = (id) => {
    if (isSubmitted) return;
    setPlacements(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const unplaced  = shuffledItems.filter(it => !placements[it.id]);
  const allPlaced = unplaced.length === 0 && shuffledItems.length > 0;

  let score = 0;
  if (isSubmitted) shuffledItems.forEach(it => { if (placements[it.id] === it.category) score++; });

  const handleCheck = () => {
    let s = 0;
    shuffledItems.forEach(it => { if (placements[it.id] === it.category) s++; });
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(s, shuffledItems.length, placements);
  };

  const colClass = categories.length <= 2 ? 'grid-cols-2' : categories.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4';

  return (
    <ExerciseShell
      index={index}
      typeLabel="Kategorisierung"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={handleCheck}
      canCheck={!isSubmitted && allPlaced}
      isSubmitted={isSubmitted}
      score={score}
      total={shuffledItems.length}
    >
      {/* Word Pool */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Zu sortieren</p>
        <motion.div
          onDragOver={makeDragOver('pool')}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnPool}
          className={`min-h-[48px] p-3 rounded-xl border-2 border-dashed flex flex-wrap gap-2 transition-colors duration-150 ${
            overZone === 'pool' ? 'border-primary bg-primary/10' : 'border-surface-variant/40 bg-surface-variant/20'
          }`}
        >
          <AnimatePresence>
            {unplaced.map(item => (
              <WordChip key={item.id} item={item} isDragging={draggingId.current === item.id}
                onDragStart={handleDragStart} onDragEnd={handleDragEnd} disabled={isSubmitted} status="default" />
            ))}
          </AnimatePresence>
          {unplaced.length === 0 && (
            <span className="m-auto text-xs italic text-secondary/50">
              {shuffledItems.length === 0 ? '—' : 'Alle Wörter platziert ✓'}
            </span>
          )}
        </motion.div>
      </div>

      {/* Buckets */}
      <div className={`grid gap-3 ${colClass}`}>
        {categories.map(cat => (
          <DropBucket
            key={cat}
            cat={cat}
            items={shuffledItems.filter(it => placements[it.id] === cat)}
            isOver={overZone === cat}
            onDragOver={makeDragOver(cat)}
            onDragLeave={handleDragLeave}
            onDrop={handleDropOnCategory(cat)}
            onReturn={returnToPool}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
    </ExerciseShell>
  );
};

export default Categorization;
