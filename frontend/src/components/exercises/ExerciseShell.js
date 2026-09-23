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
   onScoreReport fn     – optional: called with (score, total) after check
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
  onScoreReport,
  canCheck,
  checkLabel = 'Antworten prüfen',
  isSubmitted,
  score,
  total,
  children,
}) => {
  const hasScore = total != null && score != null;
  const isPerfect = hasScore && score === total;

  const handleCheck = () => {
    onCheck();
    // Report score upward after state update (next tick)
    if (onScoreReport && hasScore !== undefined) {
      // score/total are computed before the call, but they reflect
      // the pre-submit state. We use a timeout so the parent receives
      // the value after the component re-renders with updated score.
      setTimeout(() => {
        if (onScoreReport) onScoreReport();
      }, 50);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="bg-surface-container-lowest border border-surface-variant/40 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden relative"
    >
      {/* ── Left Accent Removed ── */}

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-4 border-b border-surface-variant/40 flex items-start gap-4">
        {index != null && (
          <div className="shrink-0 mt-0.5 w-[32px] h-[32px] rounded-full bg-gradient-to-br from-primary to-primary/80 text-on-primary text-base font-black flex items-center justify-center leading-none select-none shadow-md border border-primary/20">
            {index}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black uppercase tracking-widest text-germany-gold mb-1.5 drop-shadow-sm">
            {tag || typeLabel}
          </p>
          <h3 className="text-xl font-black text-on-surface leading-snug">
            {title}
          </h3>
          {instruction && (
            <p className="text-secondary/90 text-sm mt-2 leading-relaxed font-medium">
              {instruction}
            </p>
          )}
          {context && (
            <div className="mt-3 text-sm text-on-surface leading-relaxed bg-surface-variant/20 p-3 rounded-xl border border-surface-variant/40">
              {context}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="px-5 py-5 font-body-md text-body-md text-on-surface">
        {children}
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="px-5 py-4 border-t border-surface-variant/40 flex items-center justify-between bg-surface-variant/10">
        <button
          onClick={handleCheck}
          disabled={!canCheck}
          className="px-8 py-3 rounded-full text-base font-bold transition-all duration-150
            bg-primary text-on-primary hover:bg-surface-tint active:scale-95 hover:-translate-y-0.5 shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
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
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${
                !hasScore
                  ? 'bg-surface-variant text-on-surface-variant'
                  : isPerfect
                  ? 'bg-success-green/20 text-success-green'
                  : 'bg-germany-gold/20 text-germany-gold'
              }`}
            >
              {!hasScore ? (
                <span className="text-xs font-medium">Lösungen angezeigt</span>
              ) : (
                <>
                  <span className="text-base leading-none">{isPerfect ? 'check_circle' : 'info'}</span>
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

