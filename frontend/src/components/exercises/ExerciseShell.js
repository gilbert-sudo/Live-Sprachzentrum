import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── ExerciseShell ──────────────────────────────────────────────────
   Shared wrapper that gives every exercise type a unified book-style
   card: parchment background, amber number badge, serif title,
   italic instruction, ruled dividers, and a unified footer with the
   Check button and an animated score pill.

   Props
   ─────
   index       number   – 1-based position on the page (amber badge)
   typeLabel   string   – e.g. "Lückentext", "Multiple Choice"
   title       string
   instruction string | undefined
   onCheck     fn       – called when the Check button is clicked
   canCheck    bool     – enables / disables the button
   checkLabel  string   – button text (default "Antworten prüfen")
   isSubmitted bool
   score       number | undefined  – omit for open-ended types
   total       number | undefined
   children    ReactNode
-------------------------------------------------------------------- */
const ExerciseShell = ({
  index,
  typeLabel,
  tag,
  title,
  instruction,
  context,
  onCheck,
  canCheck,
  checkLabel = 'Antworten prüfen',
  isSubmitted,
  score,
  total,
  children,
}) => {
  const hasScore = total != null && score != null;
  const isPerfect = hasScore && score === total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="bg-[#FEFDF8] border border-stone-200 rounded-lg shadow-[0_1px_8px_rgba(120,100,60,0.07)] overflow-hidden"
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-3 border-b border-stone-100 flex items-start gap-3">
        {index != null && (
          <div className="shrink-0 mt-0.5 w-[22px] h-[22px] rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold font-mono flex items-center justify-center leading-none select-none">
            {index}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-stone-400 mb-0.5 font-sans">
            {tag || typeLabel}
          </p>
          <h3 className="font-serif text-stone-800 text-[15px] font-bold leading-snug">
            {title}
          </h3>
          {instruction && (
            <p className="text-stone-500 text-xs italic mt-1 leading-relaxed font-sans">
              {instruction}
            </p>
          )}
          {context && (
            <div className="mt-3 text-sm text-stone-700 leading-relaxed font-sans bg-stone-50 p-3 rounded border border-stone-100">
              {context}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="px-5 py-4 font-sans">
        {children}
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between bg-stone-50/40">
        <button
          onClick={onCheck}
          disabled={!canCheck}
          className="px-4 py-1.5 rounded text-sm font-semibold transition-all duration-150
            bg-stone-800 text-amber-50 hover:bg-stone-700 active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          {checkLabel}
        </button>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
                !hasScore
                  ? 'bg-stone-100 text-stone-600'
                  : isPerfect
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {!hasScore ? (
                <span className="text-xs italic font-medium">Lösungen angezeigt</span>
              ) : (
                <>
                  <span className="text-base leading-none">{isPerfect ? '★' : '◎'}</span>
                  <span>{score} / {total}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExerciseShell;
