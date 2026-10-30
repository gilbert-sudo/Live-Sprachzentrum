import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  GripHorizontal,
  RotateCcw,
  X,
  CheckCircle2,
  HelpCircle,
  ArrowDown
} from 'lucide-react';
import { getLevelColor } from '../../utils/levelColors';

/**
 * Spring animation variants for draggable word chips
 */
const chipVariants = {
  hidden: { scale: 0.75, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 420, damping: 24 }
  },
  exit: { scale: 0.7, opacity: 0, transition: { duration: 0.12 } }
};

/**
 * Parses <p>...</p> and <hr/> tags into structured blocks
 */
function parseParagraphBlocks(html) {
  if (!html) return [];
  const blocks = [];
  const regex = /<p[^>]*>([\s\S]*?)<\/p>|<hr[^>]*\/?>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (match[0].toLowerCase().startsWith('<hr')) {
      blocks.push({ type: 'hr' });
    } else {
      blocks.push({ type: 'p', content: match[1] });
    }
  }
  if (blocks.length === 0 && html.trim()) {
    blocks.push({ type: 'p', content: html });
  }
  return blocks;
}

/**
 * WordBankCloze
 *
 * Interactive word-bank cloze task with authentic drag-and-drop & touch-friendly tap-to-place UX,
 * adapted from FillInTheBlanks.js for the German Level Test.
 */
export default function WordBankCloze({
  question,
  answer,
  onChange,
  level = 'B2'
}) {
  const lvlColor = getLevelColor(level);
  const currentObj = useMemo(
    () => (typeof answer === 'object' && answer !== null ? answer : {}),
    [answer]
  );

  const wordBank = useMemo(
    () => (Array.isArray(question?.wordBank) ? question.wordBank : []),
    [question]
  );

  const gaps = useMemo(() => question?.gaps || {}, [question]);
  const gapKeys = useMemo(() => Object.keys(gaps), [gaps]);
  const totalGaps = gapKeys.length;

  // Selected word chip for touch / click-to-place interaction
  const [selectedWord, setSelectedWord] = useState(null);

  // Hovered target during drag over
  const [overTarget, setOverTarget] = useState(null);

  // Dragging word ref for HTML5 DnD
  const draggingWordRef = useRef(null);
  const draggingFromSlotRef = useRef(null);

  // Compute available unplaced words in pool
  const poolWords = useMemo(() => {
    const usedCounts = {};
    Object.values(currentObj).forEach((w) => {
      if (w && String(w).trim()) {
        const val = String(w).trim();
        usedCounts[val] = (usedCounts[val] || 0) + 1;
      }
    });

    const pool = [];
    wordBank.forEach((w) => {
      if (usedCounts[w] > 0) {
        usedCounts[w]--;
      } else {
        pool.push(w);
      }
    });
    return pool;
  }, [wordBank, currentObj]);

  const placedCount = useMemo(() => {
    return gapKeys.filter((k) => currentObj[k] && String(currentObj[k]).trim()).length;
  }, [gapKeys, currentObj]);

  const allFilled = placedCount === totalGaps && totalGaps > 0;
  const leftoverCount = Math.max(0, wordBank.length - totalGaps);

  /* ─────────────────────────────────────────────────────────────
     ACTION HANDLERS
     ───────────────────────────────────────────────────────────── */

  const setSlotValue = (rId, word) => {
    const next = { ...currentObj };
    if (!word) {
      delete next[rId];
    } else {
      // If the word was placed in another slot, unassign it from that slot (move)
      gapKeys.forEach((k) => {
        if (k !== rId && next[k] === word) {
          delete next[k];
        }
      });
      next[rId] = word;
    }
    onChange(next);
  };

  const clearSlot = (rId) => {
    const next = { ...currentObj };
    delete next[rId];
    onChange(next);
    if (selectedWord) setSelectedWord(null);
  };

  const handleResetAll = () => {
    onChange({});
    setSelectedWord(null);
    setOverTarget(null);
  };

  /* ─────────────────────────────────────────────────────────────
     CLICK / TAP-TO-PLACE HANDLERS (Mobile Touch Friendly)
     ───────────────────────────────────────────────────────────── */

  const handleChipClick = (word) => {
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handleSlotClick = (rId) => {
    const currentVal = currentObj[rId];

    if (selectedWord) {
      // If a word is selected, place it in this slot
      setSlotValue(rId, selectedWord);
      setSelectedWord(null);
      return;
    }

    if (currentVal) {
      // If already filled and no new word is selected, return current word to bank
      clearSlot(rId);
    }
  };

  /* ─────────────────────────────────────────────────────────────
     DRAG & DROP HANDLERS (Desktop Tactile Interaction)
     ───────────────────────────────────────────────────────────── */

  const handleDragStartFromBank = (e, word) => {
    draggingWordRef.current = word;
    draggingFromSlotRef.current = null;
    setSelectedWord(null);
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragStartFromSlot = (e, rId, word) => {
    draggingWordRef.current = word;
    draggingFromSlotRef.current = rId;
    setSelectedWord(null);
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    draggingWordRef.current = null;
    draggingFromSlotRef.current = null;
    setOverTarget(null);
  };

  const handleDragOverSlot = (e, rId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (overTarget !== rId) setOverTarget(rId);
  };

  const handleDragLeaveSlot = (e, rId) => {
    if (overTarget === rId) setOverTarget(null);
  };

  const handleDropOnSlot = (e, rId) => {
    e.preventDefault();
    const word = draggingWordRef.current || e.dataTransfer.getData('text/plain');
    if (!word) return;

    setSlotValue(rId, word);
    draggingWordRef.current = null;
    draggingFromSlotRef.current = null;
    setOverTarget(null);
  };

  const handleDragOverBank = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (overTarget !== 'bank') setOverTarget('bank');
  };

  const handleDragLeaveBank = () => {
    if (overTarget === 'bank') setOverTarget(null);
  };

  const handleDropOnBank = (e) => {
    e.preventDefault();
    const fromSlot = draggingFromSlotRef.current;
    if (fromSlot) {
      clearSlot(fromSlot);
    }
    draggingWordRef.current = null;
    draggingFromSlotRef.current = null;
    setOverTarget(null);
  };

  /* ─────────────────────────────────────────────────────────────
     PARAGRAPH & INLINE TOKEN RENDERING
     ───────────────────────────────────────────────────────────── */

  const blocks = useMemo(
    () => parseParagraphBlocks(question?.templateHtml),
    [question?.templateHtml]
  );

  const renderInlineToken = (token, key) => {
    const inner = token.slice(2, -2);
    const [kind, rId] = inner.split(':');

    if (kind === 'INPUT') {
      const g = gaps[rId];
      if (!g) return null;

      const filledWord = currentObj[rId] || null;
      const isOver = overTarget === rId;
      const isSelectedCandidate = Boolean(selectedWord && !filledWord);
      const slotIndex = gapKeys.indexOf(rId) + 1;

      // Filled Slot Pill
      if (filledWord) {
        return (
          <motion.span
            layout
            key={key}
            draggable
            onDragStart={(e) => handleDragStartFromSlot(e, rId, filledWord)}
            onDragEnd={handleDragEnd}
            onClick={() => handleSlotClick(rId)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold align-middle mx-1 my-0.5 select-none transition-all duration-150 shadow-sm border ${isSelectedCandidate
                ? 'ring-2 ring-amber-500 scale-105'
                : 'hover:shadow hover:scale-[1.02]'
              } ${lvlColor.softBg} ${lvlColor.text} ${lvlColor.border} cursor-grab active:cursor-grabbing group`}
            title="Antippen oder nach oben ziehen, um das Wort zurückzusetzen"
          >
            <GripHorizontal className="w-3.5 h-3.5 opacity-40 shrink-0 group-hover:opacity-75" />
            <span className="leading-snug">{filledWord}</span>
            <button
              type="button"
              aria-label={`${filledWord} entfernen`}
              onClick={(e) => {
                e.stopPropagation();
                clearSlot(rId);
              }}
              className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/15 text-current/70 hover:text-current transition-colors ml-0.5 cursor-pointer"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          </motion.span>
        );
      }

      // Empty Slot Target
      return (
        <motion.span
          layout
          key={key}
          onDragOver={(e) => handleDragOverSlot(e, rId)}
          onDragLeave={(e) => handleDragLeaveSlot(e, rId)}
          onDrop={(e) => handleDropOnSlot(e, rId)}
          onClick={() => handleSlotClick(rId)}
          animate={
            isOver || isSelectedCandidate
              ? { scale: 1.05 }
              : { scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          className={`inline-flex items-center justify-center gap-1 min-w-[95px] sm:min-w-[110px] min-h-[34px] px-2.5 py-1 rounded-xl border-2 border-dashed text-xs sm:text-sm font-bold align-middle mx-1 my-0.5 transition-all duration-150 select-none cursor-pointer ${isOver || isSelectedCandidate
              ? `${lvlColor.softBg} ${lvlColor.text} ${lvlColor.ringGlow} border-current shadow-md`
              : 'border-surface-variant/50 dark:border-white/20 bg-surface-container-low/50 dark:bg-white/[0.04] text-on-surface-variant/60 hover:border-surface-variant hover:bg-surface-container-high/40'
            }`}
          title={
            selectedWord
              ? `Antippen, um "${selectedWord}" hier einzufügen`
              : 'Wort hierher ziehen oder aus der Wortbank antippen'
          }
        >
          {isOver || isSelectedCandidate ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wide animate-pulse">
              <ArrowDown className="w-3 h-3" />
              Ablegen
            </span>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-wider opacity-60">
              Lücke {slotIndex}
            </span>
          )}
        </motion.span>
      );
    }

    return null;
  };

  const renderParagraphContent = (htmlContent, blockIdx) => {
    const parts = htmlContent.split(
      /(\[\[(?:SELECT|INPUT|CHOICE_GROUP):[A-Za-z0-9_]+\]\])/g
    );
    return parts.map((part, partIdx) => {
      if (/^\[\[(?:SELECT|INPUT|CHOICE_GROUP):[A-Za-z0-9_]+\]\]$/.test(part)) {
        return renderInlineToken(part, `tok-${blockIdx}-${partIdx}`);
      }
      if (!part) return null;
      return (
        <span
          key={`txt-${blockIdx}-${partIdx}`}
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    });
  };

  return (
    <div className="space-y-4">
      {/* ═══════════════════════════════════════════════════════════════
          INTERACTIVE WORD BANK POOL
          ═══════════════════════════════════════════════════════════════ */}
      <div
        onDragOver={handleDragOverBank}
        onDragLeave={handleDragLeaveBank}
        onDrop={handleDropOnBank}
        className={`p-3.5 sm:p-4 rounded-3xl transition-all duration-200 border-2 ${overTarget === 'bank'
            ? `${lvlColor.softBg} ${lvlColor.ringGlow} border-current`
            : 'border-surface-variant/30 dark:border-white/10 bg-surface-container-low/90 dark:bg-[#22242A]'
          } shadow-sm space-y-3`}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-xl ${lvlColor.softBg} ${lvlColor.accentText} flex items-center justify-center shrink-0`}
            >
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-on-surface">
                Wortbank
              </span>
              <p className="text-[11px] text-on-surface-variant leading-none hidden sm:block">
                Antippen oder in die Lücke ziehen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Status Indicator */}
            <span
              className={`text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${allFilled
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  : 'bg-surface-container dark:bg-white/[0.08] text-on-surface-variant'
                }`}
            >
              {placedCount} / {totalGaps} eingesetzt
              {leftoverCount > 0 && ` • ${leftoverCount} übrig`}
            </span>

            {/* Reset All Button */}
            {placedCount > 0 && (
              <motion.button
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-on-surface-variant hover:text-rose-500 transition-colors px-2 py-1 rounded-lg hover:bg-rose-500/10 cursor-pointer"
                title="Alle Lücken leeren und Wörter zurücklegen"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Zurücksetzen</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Word Chips Row */}
        <div className="min-h-[46px] flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-surface-container-lowest/80 dark:bg-[#1A1C20]/80">
          <AnimatePresence mode="popLayout">
            {poolWords.map((word) => {
              const isSelected = selectedWord === word;
              return (
                <motion.span
                  layout
                  key={word}
                  variants={chipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  draggable
                  onDragStart={(e) => handleDragStartFromBank(e, word)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleChipClick(word)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold select-none cursor-grab active:cursor-grabbing transition-all duration-150 border ${isSelected
                      ? `${lvlColor.buttonBg} text-white shadow-md scale-105 ${lvlColor.shadowGlow} border-transparent ring-2 ring-offset-2 ring-amber-500`
                      : `bg-surface-container-lowest dark:bg-[#26282E] text-on-surface border-surface-variant/40 dark:border-white/10 hover:border-surface-variant hover:shadow-sm`
                    }`}
                  title="Ziehen oder antippen zum Einfügen"
                >
                  <GripHorizontal className="w-3.5 h-3.5 opacity-40 shrink-0" />
                  <span>{word}</span>
                </motion.span>
              );
            })}
          </AnimatePresence>

          {poolWords.length === 0 && (
            <div className="w-full py-1 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Alle Wörter platziert! Sie können Wörter antippen, um sie neu zu ordnen.</span>
            </div>
          )}
        </div>

        {/* Helper Hint when Chip is Selected */}
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-3 py-1.5 rounded-xl ${lvlColor.softBg} ${lvlColor.text} text-[11px] font-bold flex items-center gap-1.5`}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>
              Wort <strong>&quot;{selectedWord}&quot;</strong> ausgewählt. Tippen Sie auf eine Lücke im Text, um es einzusetzen.
            </span>
          </motion.div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ARTICLE READING TEXT WITH INLINE DROP TARGETS
          ═══════════════════════════════════════════════════════════════ */}
      {blocks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="p-4 sm:p-6 rounded-3xl bg-surface-container-low/75 dark:bg-[#22242A] text-on-surface shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] space-y-3.5 text-xs sm:text-sm md:text-base leading-loose"
        >
          {blocks.map((b, idx) =>
            b.type === 'hr' ? (
              <div
                key={idx}
                className="my-3 h-1 w-12 rounded-full bg-surface-container-high dark:bg-white/10 mx-auto"
              />
            ) : (
              <div
                key={idx}
                className="leading-loose sm:leading-loose text-on-surface font-normal break-words"
              >
                {renderParagraphContent(b.content, idx)}
              </div>
            )
          )}
        </motion.div>
      )}
    </div>
  );
}

