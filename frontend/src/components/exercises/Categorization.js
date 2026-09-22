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
    correct: 'bg-green-50 border-green-400 text-green-800',
    wrong:   'bg-red-50 border-red-400 text-red-800',
    default: 'bg-white border-stone-200 text-stone-700 hover:border-indigo-300 hover:shadow-sm cursor-grab active:cursor-grabbing',
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
      className={`select-none px-2.5 py-1 rounded border text-xs font-medium shadow-sm transition-colors duration-150 ${colorMap[status] ?? colorMap.default}`}
    >
      {item.word}
      {status === 'wrong' && (
        <span className="ml-1.5 text-[10px] font-normal text-red-400">→ {item.category}</span>
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
    className={`rounded border-2 border-dashed flex flex-col overflow-hidden transition-colors duration-150 ${
      isOver ? 'border-indigo-400 bg-indigo-50/50 shadow shadow-indigo-100' : 'border-stone-200 bg-stone-50/50'
    }`}
  >
    {/* bucket header */}
    <div className={`px-3 py-1.5 text-xs font-bold tracking-wide text-center border-b transition-colors ${
      isOver ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-stone-100 text-stone-600 border-stone-200'
    }`}>
      {cat}
      <span className="ml-1 font-normal opacity-50 text-[10px]">({items.length})</span>
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
                  className="text-stone-300 hover:text-red-400 transition-colors text-sm leading-none font-bold ml-auto">
                  ×
                </button>
              )}
            </div>
          );
        })}
      </AnimatePresence>
      {items.length === 0 && (
        <p className={`m-auto text-[10px] italic ${isOver ? 'text-indigo-400' : 'text-stone-300'}`}>
          {isOver ? 'Hier ablegen' : 'Wörter hierher ziehen'}
        </p>
      )}
    </div>
  </motion.div>
);

/* ─── Main Component ─────────────────────────────────────────────── */
const Categorization = ({ index, exercise }) => {
  const { title, instruction, categories, items, tag, context } = exercise;

  const [shuffledItems, setShuffledItems] = useState([]);
  const [placements, setPlacements]       = useState({});
  const [isSubmitted, setIsSubmitted]     = useState(false);
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

  const colClass = categories.length <= 2 ? 'grid-cols-2' : categories.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4';

  return (
    <ExerciseShell
      index={index}
      typeLabel="Kategorisierung"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted && allPlaced}
      isSubmitted={isSubmitted}
      score={score}
      total={shuffledItems.length}
    >
      {/* Word Pool */}
      <div className="mb-4">
        <p className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1.5">Zu sortieren</p>
        <motion.div
          onDragOver={makeDragOver('pool')}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnPool}
          className={`min-h-[48px] p-2 rounded border-2 border-dashed flex flex-wrap gap-1.5 transition-colors duration-150 ${
            overZone === 'pool' ? 'border-stone-400 bg-stone-100' : 'border-stone-200 bg-stone-50/40'
          }`}
        >
          <AnimatePresence>
            {unplaced.map(item => (
              <WordChip key={item.id} item={item} isDragging={draggingId.current === item.id}
                onDragStart={handleDragStart} onDragEnd={handleDragEnd} disabled={isSubmitted} status="default" />
            ))}
          </AnimatePresence>
          {unplaced.length === 0 && (
            <span className="m-auto text-[10px] italic text-stone-300">
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
