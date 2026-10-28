import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Play,
  Pause,
  Link2,
  X,
  Sparkles,
  Volume2,
  RotateCcw
} from 'lucide-react';

/**
 * Helper to deterministic-shuffle an array of IDs based on question ID
 * so the initial order is consistent and not already solved.
 */
export function getInitialSequenceOrder(question) {
  if (Array.isArray(question.initialOrder) && question.initialOrder.length > 0) {
    return [...question.initialOrder];
  }

  const sourceIds =
    question.type === 'dialogue-order'
      ? (question.dialogueItems || []).map((it) => it.id)
      : (question.items || []).map((it) => it.id);

  if (sourceIds.length <= 1) return sourceIds;

  const copy = [...sourceIds];
  const seed = (question.id || 1) * 7;
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (seed + i * 3) % (i + 1);
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  if (
    question.correctOrder &&
    copy.every((id, idx) => id === question.correctOrder[idx]) &&
    copy.length >= 2
  ) {
    const tmp = copy[0];
    copy[0] = copy[1];
    copy[1] = tmp;
  }
  return copy;
}

/**
 * Checks whether a question has been answered by the student.
 */
export function isQuestionAnswered(question, ans) {
  if (!question || ans === undefined || ans === null) return false;

  switch (question.type) {
    case 'single-choice':
      return ans !== '' && ans !== null && ans !== undefined;
    case 'multiple-choice':
      return Array.isArray(ans) && ans.length > 0;
    case 'inline-dropdown':
      return (
        typeof ans === 'object' &&
        Object.keys(question.dropdowns || {}).some(
          (k) => ans[k] !== undefined && ans[k] !== ''
        )
      );
    case 'grouped-choice':
      return (
        typeof ans === 'object' &&
        (question.groups || []).some(
          (g) => ans[g.id] !== undefined && ans[g.id] !== ''
        )
      );
    case 'text-gap':
      return (
        typeof ans === 'object' &&
        Object.keys(question.gaps || {}).some(
          (k) => ans[k] && String(ans[k]).trim() !== ''
        )
      );
    case 'order-sequence':
    case 'dialogue-order':
      return (
        Array.isArray(ans) &&
        ans.length === (question.correctOrder ? question.correctOrder.length : ans.length) &&
        ans.length > 0
      );
    case 'gap-match':
    case 'audio-gap-match':
      return (
        typeof ans === 'object' &&
        Object.keys(question.slots || {}).some(
          (k) => ans[k] !== undefined && ans[k] !== ''
        )
      );
    case 'associate-pairs':
      return Array.isArray(ans) && ans.length > 0;
    default:
      return false;
  }
}

/**
 * Evaluates a full Level Test (A2, B1, or B2) with partial credit and generates
 * question-by-question solutions for the review table and certificate.
 */
export function evaluateLevelTest(testData, userAnswers = {}, elapsedSeconds = 0) {
  let totalScore = 0;
  const maxScore = testData.questions.length;

  const details = testData.questions.map((q) => {
    const uAns = userAnswers[q.id];
    let qScore = 0;
    let isFullyCorrect = false;
    let userText = 'Keine Antwort';
    let correctText = '';

    if (q.type === 'single-choice') {
      correctText = q.correctAnswerText || '';
      if (uAns !== undefined && uAns !== null && uAns !== '') {
        const opt = (q.options || []).find((o) => o.id === uAns);
        userText = opt ? opt.text : uAns;
        if (uAns === q.correctAnswer) {
          qScore = 1;
          isFullyCorrect = true;
        }
      }
    } else if (q.type === 'multiple-choice') {
      const correctIds = q.correctAnswers || [];
      correctText = (q.correctAnswerTexts || []).join(' • ');
      if (Array.isArray(uAns) && uAns.length > 0) {
        userText = uAns
          .map((id) => {
            const o = (q.options || []).find((opt) => opt.id === id);
            return o ? o.text : id;
          })
          .join(' • ');
        const correctHits = uAns.filter((id) => correctIds.includes(id)).length;
        const wrongHits = uAns.filter((id) => !correctIds.includes(id)).length;
        const net = Math.max(0, correctHits - wrongHits);
        qScore = correctIds.length > 0 ? net / correctIds.length : 0;
        if (correctHits === correctIds.length && wrongHits === 0) {
          isFullyCorrect = true;
        }
      }
    } else if (q.type === 'inline-dropdown') {
      const keys = Object.keys(q.dropdowns || {});
      let hits = 0;
      const uParts = [];
      const cParts = [];

      keys.forEach((k) => {
        const d = q.dropdowns[k];
        cParts.push(d.correctText);
        const val = uAns ? uAns[k] : undefined;
        if (val !== undefined && val !== '') {
          const opt = (d.options || []).find((o) => o.id === val);
          uParts.push(opt ? opt.text : val);
          if (val === d.correct) hits++;
        } else {
          uParts.push('—');
        }
      });

      qScore = keys.length > 0 ? hits / keys.length : 0;
      isFullyCorrect = hits === keys.length && keys.length > 0;
      userText = uParts.some((p) => p !== '—') ? uParts.join(' | ') : 'Keine Antwort';
      correctText = cParts.join(' | ');
    } else if (q.type === 'grouped-choice') {
      const groups = q.groups || [];
      let hits = 0;
      const uParts = [];
      const cParts = [];

      groups.forEach((g) => {
        cParts.push(g.correctText);
        const val = uAns ? uAns[g.id] : undefined;
        if (val !== undefined && val !== '') {
          const opt = (g.options || []).find((o) => o.id === val);
          uParts.push(opt ? opt.text : val);
          if (val === g.correct) hits++;
        } else {
          uParts.push('—');
        }
      });

      qScore = groups.length > 0 ? hits / groups.length : 0;
      isFullyCorrect = hits === groups.length && groups.length > 0;
      userText = uParts.some((p) => p !== '—') ? uParts.join(' | ') : 'Keine Antwort';
      correctText = cParts.join(' | ');
    } else if (q.type === 'text-gap') {
      const keys = Object.keys(q.gaps || {});
      let hits = 0;
      const uParts = [];
      const cParts = [];

      keys.forEach((k) => {
        const g = q.gaps[k];
        cParts.push(g.primaryAnswer);
        const val = uAns && uAns[k] ? String(uAns[k]).trim() : '';
        if (val) {
          uParts.push(val);
          const normVal = val.toLowerCase().replace(/[\s.:_-]/g, '');
          const isMatch = (g.correctAnswers || []).some(
            (ans) => ans.trim().toLowerCase().replace(/[\s.:_-]/g, '') === normVal
          );
          if (isMatch) hits++;
        } else {
          uParts.push('—');
        }
      });

      qScore = keys.length > 0 ? hits / keys.length : 0;
      isFullyCorrect = hits === keys.length && keys.length > 0;
      userText = uParts.some((p) => p !== '—') ? uParts.join(' | ') : 'Keine Antwort';
      correctText = cParts.join(' | ');
    } else if (q.type === 'order-sequence') {
      const cOrder = q.correctOrder || [];
      correctText = (q.correctOrderTexts || []).join(' ➔ ');
      if (Array.isArray(uAns) && uAns.length === cOrder.length) {
        let hits = 0;
        const uParts = [];
        uAns.forEach((id, idx) => {
          const item = (q.items || []).find((it) => it.id === id);
          uParts.push(item ? item.text : id);
          if (id === cOrder[idx]) hits++;
        });
        qScore = cOrder.length > 0 ? hits / cOrder.length : 0;
        isFullyCorrect = hits === cOrder.length && cOrder.length > 0;
        userText = uParts.join(' ➔ ');
      }
    } else if (q.type === 'dialogue-order') {
      const cOrder = q.correctOrder || [];
      correctText = (q.correctOrderTexts || []).join(' ➔ ');
      if (Array.isArray(uAns) && uAns.length === cOrder.length) {
        let hits = 0;
        const uParts = [];
        uAns.forEach((id, idx) => {
          const item = (q.dialogueItems || []).find((it) => it.id === id);
          const spk = q.speakers && q.speakers[idx] ? `${q.speakers[idx]} ` : '';
          uParts.push(`${idx + 1}. ${spk}${item ? item.text : id}`);
          if (id === cOrder[idx]) hits++;
        });
        qScore = cOrder.length > 0 ? hits / cOrder.length : 0;
        isFullyCorrect = hits === cOrder.length && cOrder.length > 0;
        userText = uParts.join(' | ');
      }
    } else if (q.type === 'gap-match') {
      const slotKeys = Object.keys(q.slots || {});
      let hits = 0;
      const uParts = [];
      const cParts = [];

      slotKeys.forEach((k) => {
        const s = q.slots[k];
        cParts.push(`${s.label}: ${s.correctText}`);
        const tokenId = uAns ? uAns[k] : undefined;
        if (tokenId) {
          const tok = (q.tokens || []).find((t) => t.id === tokenId);
          uParts.push(`${s.label}: ${tok ? tok.text : tokenId}`);
          if (tokenId === s.correctTokenId) hits++;
        } else {
          uParts.push(`${s.label}: —`);
        }
      });

      qScore = slotKeys.length > 0 ? hits / slotKeys.length : 0;
      isFullyCorrect = hits === slotKeys.length && slotKeys.length > 0;
      userText = uParts.some((p) => !p.endsWith('—')) ? uParts.join(' | ') : 'Keine Antwort';
      correctText = cParts.join(' | ');
    } else if (q.type === 'associate-pairs') {
      const cPairs = q.correctPairs || [];
      correctText = (q.correctPairTexts || []).join(' | ');
      if (Array.isArray(uAns) && uAns.length > 0) {
        let hits = 0;
        const uParts = [];
        uAns.forEach((pStr) => {
          const [lId, rId] = pStr.split(' ');
          const lItem = (q.leftItems || []).find((i) => i.id === lId);
          const rItem = (q.rightItems || []).find((i) => i.id === rId);
          uParts.push(`${lItem ? lItem.text : lId} ➔ ${rItem ? rItem.text : rId}`);
          if (cPairs.includes(pStr) || cPairs.includes(`${rId} ${lId}`)) {
            hits++;
          }
        });
        const wrong = Math.max(0, uAns.length - hits);
        const net = Math.max(0, hits - wrong);
        qScore = cPairs.length > 0 ? net / cPairs.length : 0;
        isFullyCorrect = hits === cPairs.length && wrong === 0;
        userText = uParts.join(' | ');
      }
    } else if (q.type === 'audio-gap-match') {
      const slotKeys = Object.keys(q.slots || {});
      let hits = 0;
      const uParts = [];
      const cParts = [];

      slotKeys.forEach((k) => {
        const s = q.slots[k];
        cParts.push(`${s.label}: ${s.correctLabel}`);
        const cardId = uAns ? uAns[k] : undefined;
        if (cardId) {
          const card = (q.audioCards || []).find((c) => c.id === cardId);
          uParts.push(`${s.label}: ${card ? card.label : cardId}`);
          if (cardId === s.correctCardId) hits++;
        } else {
          uParts.push(`${s.label}: —`);
        }
      });

      qScore = slotKeys.length > 0 ? hits / slotKeys.length : 0;
      isFullyCorrect = hits === slotKeys.length && slotKeys.length > 0;
      userText = uParts.some((p) => !p.endsWith('—')) ? uParts.join(' | ') : 'Keine Antwort';
      correctText = cParts.join(' | ');
    }

    totalScore += qScore;

    return {
      question: q,
      score: qScore,
      isFullyCorrect,
      isPartial: qScore > 0 && !isFullyCorrect,
      userText,
      correctText
    };
  });

  const roundedPoints = Math.round(totalScore * 10) / 10;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const scaleMatch =
    (testData.evaluationScale || []).find(
      (s) => percentage >= s.min && percentage <= s.max
    ) || testData.evaluationScale[testData.evaluationScale.length - 1];

  return {
    totalPoints: roundedPoints,
    maxPoints: maxScore,
    percentage,
    scaleMatch,
    elapsedSeconds,
    details,
    correctCount: details.filter((d) => d.isFullyCorrect).length,
    partialCount: details.filter((d) => d.isPartial).length,
    wrongCount: details.filter((d) => d.score === 0).length
  };
}

function parseTemplateBlocks(templateHtml) {
  if (!templateHtml) return [];
  const blocks = [];
  const regex = /<p[^>]*>([\s\S]*?)<\/p>|<hr[^>]*\/?>/gi;
  let match;
  while ((match = regex.exec(templateHtml)) !== null) {
    if (match[0].toLowerCase().startsWith('<hr')) {
      blocks.push({ type: 'hr' });
    } else {
      blocks.push({ type: 'p', content: match[1] });
    }
  }
  if (blocks.length === 0 && templateHtml.trim()) {
    blocks.push({ type: 'p', content: templateHtml });
  }
  return blocks;
}

const MiniAudioCardButton = ({ src, label }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener('ended', onEnded);
    el.addEventListener('pause', onPause);
    el.addEventListener('play', onPlay);
    return () => {
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('play', onPlay);
    };
  }, [src]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      document.querySelectorAll('audio').forEach((other) => {
        if (other !== el) other.pause();
      });
      el.play().catch(() => {});
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition-all border ${
        playing
          ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
          : 'bg-surface-container-low dark:bg-[#252528] text-on-surface border-surface-variant/50 hover:border-primary/50'
      }`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          playing ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
        }`}
      >
        {playing ? (
          <Pause className="w-3 h-3 fill-current" />
        ) : (
          <Play className="w-3 h-3 fill-current ml-0.5" />
        )}
      </span>
      <span>{label}</span>
      {playing && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
      )}
    </motion.button>
  );
};

const PAIR_BADGE_COLORS = [
  'bg-primary text-white border-primary',
  'bg-amber-500 text-white border-amber-500',
  'bg-emerald-600 text-white border-emerald-600',
  'bg-indigo-600 text-white border-indigo-600',
  'bg-rose-600 text-white border-rose-600'
];

const LevelTestTaskRenderer = ({ question, answer, onChange }) => {
  const [activeGapKey, setActiveGapKey] = useState(null);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [selectedLeftPairId, setSelectedLeftPairId] = useState(null);
  const [draggedIdx, setDraggedIdx] = useState(null);

  useEffect(() => {
    setActiveGapKey(null);
    setSelectedTokenId(null);
    setSelectedLeftPairId(null);
    setDraggedIdx(null);
  }, [question.id]);

  useEffect(() => {
    if (question.type === 'order-sequence' || question.type === 'dialogue-order') {
      const expectedLen =
        question.type === 'dialogue-order'
          ? (question.dialogueItems || []).length
          : (question.items || []).length;
      if (!Array.isArray(answer) || answer.length !== expectedLen) {
        const initial = getInitialSequenceOrder(question);
        onChange(initial);
      }
    }
  }, [question, answer, onChange]);

  // ───────────────────────────────────────────────────────────────
  // 1. SINGLE-CHOICE & MULTIPLE-CHOICE (Compact + Staggered Animation)
  // ───────────────────────────────────────────────────────────────
  if (question.type === 'single-choice' || question.type === 'multiple-choice') {
    const isMulti = question.type === 'multiple-choice';
    const selectedList = isMulti
      ? Array.isArray(answer)
        ? answer
        : []
      : answer !== undefined && answer !== null && answer !== ''
      ? [answer]
      : [];

    const handleToggleOption = (optId) => {
      if (!isMulti) {
        onChange(optId);
        return;
      }
      if (selectedList.includes(optId)) {
        onChange(selectedList.filter((id) => id !== optId));
      } else {
        const limit = question.maxChoices || 99;
        if (selectedList.length >= limit) {
          onChange([...selectedList.slice(1), optId]);
        } else {
          onChange([...selectedList, optId]);
        }
      }
    };

    return (
      <div className="space-y-2.5">
        {isMulti && question.maxChoices && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>
              Mehrfachauswahl: Bitte {question.maxChoices} Antworten wählen ({selectedList.length}/{question.maxChoices})
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {(question.options || []).map((opt, idx) => {
            const isSelected = selectedList.includes(opt.id);
            const letter = String.fromCharCode(65 + idx);
            return (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.18 }}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
                key={opt.id}
                type="button"
                onClick={() => handleToggleOption(opt.id)}
                className={`group w-full text-left px-3.5 py-2.5 sm:py-3 rounded-xl border-2 transition-colors duration-150 flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-primary bg-primary/[0.07] dark:bg-primary/15 text-on-surface shadow-sm'
                    : 'border-surface-variant/40 bg-surface-container-lowest hover:border-primary/40 hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-surface-container text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-body text-xs sm:text-sm font-medium leading-snug break-words">
                    {opt.text}
                  </span>
                </div>

                <div
                  className={`w-5 h-5 ${
                    isMulti ? 'rounded-md' : 'rounded-full'
                  } border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-white scale-105'
                      : 'border-surface-variant group-hover:border-primary/50'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 2. INLINE-DROPDOWN, TEXT-GAP & GROUPED-CHOICE (Compact)
  // ───────────────────────────────────────────────────────────────
  if (
    question.type === 'inline-dropdown' ||
    question.type === 'text-gap' ||
    question.type === 'grouped-choice'
  ) {
    const currentObj = typeof answer === 'object' && answer !== null ? answer : {};
    const blocks = parseTemplateBlocks(question.templateHtml);
    const renderedGroupIds = new Set();

    const handleFieldChange = (rId, value) => {
      onChange({
        ...currentObj,
        [rId]: value
      });
    };

    const handleWordBankInsert = (word) => {
      const gapKeys = Object.keys(question.gaps || {});
      if (gapKeys.length === 0) return;
      const targetKey =
        activeGapKey && gapKeys.includes(activeGapKey)
          ? activeGapKey
          : gapKeys.find((k) => !currentObj[k] || !String(currentObj[k]).trim()) ||
            gapKeys[0];

      handleFieldChange(targetKey, word);
      const nextEmpty = gapKeys.find(
        (k) => k !== targetKey && (!currentObj[k] || !String(currentObj[k]).trim())
      );
      if (nextEmpty) setActiveGapKey(nextEmpty);
    };

    const renderInlineToken = (token, key) => {
      const inner = token.slice(2, -2);
      const [kind, rId] = inner.split(':');

      if (kind === 'SELECT') {
        const d = question.dropdowns ? question.dropdowns[rId] : null;
        if (!d) return null;
        const val = currentObj[rId] ?? '';
        const isFilled = val !== '';

        return (
          <span key={key} className="inline-block align-middle my-0.5 mx-1 max-w-full">
            <select
              aria-label={`Auswahl ${rId}`}
              value={val}
              onChange={(e) => handleFieldChange(rId, e.target.value)}
              className={`max-w-full text-xs sm:text-sm font-bold rounded-lg px-2.5 py-1 pr-7 border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/25 ${
                isFilled
                  ? 'border-primary bg-primary/10 text-primary dark:text-red-300 shadow-sm'
                  : 'border-surface-variant bg-surface-container-low text-on-surface hover:border-primary/40'
              }`}
            >
              <option value="">— Bitte wählen —</option>
              {(d.options || []).map((opt) => (
                <option
                  key={opt.id}
                  value={opt.id}
                  className="bg-surface text-on-surface font-medium"
                >
                  {opt.text}
                </option>
              ))}
            </select>
          </span>
        );
      }

      if (kind === 'INPUT') {
        const g = question.gaps ? question.gaps[rId] : null;
        if (!g) return null;
        const val = currentObj[rId] ?? '';
        const isFilled = String(val).trim().length > 0;
        const isFocused = activeGapKey === rId;
        const expectedLen = Math.max(
          7,
          Math.min(20, (g.primaryAnswer || '').length + 3)
        );

        return (
          <span key={key} className="inline-block align-middle my-0.5 mx-1 max-w-full">
            <input
              type="text"
              value={val}
              onFocus={() => setActiveGapKey(rId)}
              onChange={(e) => handleFieldChange(rId, e.target.value)}
              placeholder="Antwort..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              style={{ width: `${Math.max(105, expectedLen * 9)}px` }}
              className={`max-w-full text-xs sm:text-sm font-bold rounded-lg px-2.5 py-1 border-2 transition-all focus:outline-none ${
                isFocused
                  ? 'border-primary bg-surface-container-lowest ring-2 ring-primary/20 text-on-surface'
                  : isFilled
                  ? 'border-primary/70 bg-primary/[0.06] text-on-surface'
                  : 'border-dashed border-surface-variant bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 hover:border-primary/40'
              }`}
            />
          </span>
        );
      }

      if (kind === 'CHOICE_GROUP') {
        const grp = (question.groups || []).find((item) => item.id === rId);
        if (!grp) return null;
        renderedGroupIds.add(rId);
        const val = currentObj[rId] ?? '';

        return (
          <span
            key={key}
            className="inline-flex flex-wrap items-center gap-1.5 my-1 mx-1 align-middle"
          >
            {(grp.options || []).map((opt) => {
              const isSelected = val === opt.id;
              return (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={opt.id}
                  type="button"
                  onClick={() => handleFieldChange(rId, opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface border-surface-variant/60 hover:border-primary/50 hover:bg-surface-container-low'
                  }`}
                >
                  {opt.text}
                </motion.button>
              );
            })}
          </span>
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

    const remainingGroups =
      question.type === 'grouped-choice'
        ? (question.groups || []).filter((g) => {
            if (!question.templateHtml) return true;
            return !question.templateHtml.includes(`[[CHOICE_GROUP:${g.id}]]`);
          })
        : [];

    return (
      <div className="space-y-3">
        {question.wordBank && question.wordBank.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Wortbank (Antippen zum Einfügen):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {question.wordBank.map((word) => {
                const isUsed = Object.values(currentObj).some(
                  (v) =>
                    v &&
                    String(v).trim().toLowerCase().startsWith(word.toLowerCase())
                );
                return (
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    key={word}
                    type="button"
                    onClick={() => handleWordBankInsert(word)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                      isUsed
                        ? 'bg-surface-container text-on-surface-variant border-surface-variant/40 opacity-55'
                        : 'bg-surface-container-lowest text-on-surface border-amber-500/40 hover:border-primary hover:text-primary shadow-sm'
                    }`}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {blocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="p-3.5 sm:p-4 rounded-xl bg-surface-container-low/60 dark:bg-surface-container-low/30 border border-surface-variant/40 space-y-2 text-xs sm:text-sm leading-relaxed text-on-surface"
          >
            {blocks.map((b, idx) =>
              b.type === 'hr' ? (
                <hr key={idx} className="my-2.5 border-surface-variant/40" />
              ) : (
                <div key={idx} className="leading-7 break-words">
                  {renderParagraphContent(b.content, idx)}
                </div>
              )
            )}
          </motion.div>
        )}

        {remainingGroups.length > 0 && (
          <div className="space-y-2.5">
            {remainingGroups.map((grp, gIdx) => {
              const val = currentObj[grp.id] ?? '';
              return (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gIdx * 0.04, duration: 0.18 }}
                  key={grp.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm space-y-2"
                >
                  {grp.title && (
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-md bg-primary/10 text-primary text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {gIdx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-on-surface leading-snug">
                        {grp.title}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {(grp.options || []).map((opt) => {
                      const isSelected = val === opt.id;
                      return (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          key={opt.id}
                          type="button"
                          onClick={() => handleFieldChange(grp.id, opt.id)}
                          className={`flex-1 min-w-[95px] sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-surface-container-low/70 text-on-surface border-surface-variant/50 hover:border-primary/40 hover:bg-surface-container'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          <span>{opt.text}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 3. ORDER-SEQUENCE & DIALOGUE-ORDER (Compact + Spring Layout Animation)
  // ───────────────────────────────────────────────────────────────
  if (question.type === 'order-sequence' || question.type === 'dialogue-order') {
    const isDialogue = question.type === 'dialogue-order';
    const sourceItems = isDialogue ? question.dialogueItems || [] : question.items || [];
    const currentOrder =
      Array.isArray(answer) && answer.length === sourceItems.length
        ? answer
        : getInitialSequenceOrder(question);

    const moveItem = (fromIdx, toIdx) => {
      if (toIdx < 0 || toIdx >= currentOrder.length) return;
      const copy = [...currentOrder];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      onChange(copy);
    };

    const handleResetOrder = () => {
      onChange(getInitialSequenceOrder(question));
    };

    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-surface-variant/40 text-[11px] sm:text-xs font-medium text-on-surface-variant">
          <span>
            <strong className="text-on-surface font-extrabold">Aufgabe:</strong>{' '}
            {isDialogue ? 'Dialogteile' : 'Sätze'} mit (▲/▼) oder per Ziehen ordnen.
          </span>
          <button
            type="button"
            onClick={handleResetOrder}
            className="text-[11px] font-bold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {currentOrder.map((itemId, idx) => {
              const itemObj = sourceItems.find((it) => it.id === itemId);
              if (!itemObj) return null;

              const slotSpeaker = isDialogue
                ? (question.speakers && question.speakers[idx]) ||
                  (question.dialogueItems[idx] && question.dialogueItems[idx].speaker) ||
                  ''
                : null;

              const isSie =
                slotSpeaker && slotSpeaker.toLowerCase().includes('sie');

              return (
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                  key={itemId}
                  draggable
                  onDragStart={() => setDraggedIdx(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedIdx !== null && draggedIdx !== idx) {
                      moveItem(draggedIdx, idx);
                    }
                    setDraggedIdx(null);
                  }}
                  onDragEnd={() => setDraggedIdx(null)}
                  className={`px-3 py-2.5 rounded-xl border-2 transition-colors flex items-center justify-between gap-2.5 bg-surface-container-lowest ${
                    draggedIdx === idx
                      ? 'border-primary bg-primary/5 opacity-60'
                      : 'border-surface-variant/40 hover:border-primary/30 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
                    {slotSpeaker ? (
                      <span
                        className={`inline-flex items-center justify-center sm:min-w-[130px] px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider border shrink-0 self-start sm:self-center ${
                          isSie
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25'
                            : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25'
                        }`}
                      >
                        {slotSpeaker}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-6 h-6 rounded-md bg-primary/10 text-primary font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <GripVertical className="w-3.5 h-3.5 text-on-surface-variant/40 hidden sm:block cursor-grab" />
                      </div>
                    )}

                    <p className="text-xs sm:text-sm font-medium text-on-surface leading-snug break-words flex-1">
                      {itemObj.text}
                    </p>
                  </div>

                  {/* Side-by-side Up/Down Buttons for Compact Height */}
                  <div className="flex items-center gap-1 shrink-0">
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      type="button"
                      onClick={() => moveItem(idx, idx - 1)}
                      disabled={idx === 0}
                      aria-label="Nach oben verschieben"
                      title="Nach oben"
                      className="w-7 h-7 rounded-lg border border-surface-variant/60 bg-surface-container-low flex items-center justify-center text-on-surface hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      type="button"
                      onClick={() => moveItem(idx, idx + 1)}
                      disabled={idx === currentOrder.length - 1}
                      aria-label="Nach unten verschieben"
                      title="Nach unten"
                      className="w-7 h-7 rounded-lg border border-surface-variant/60 bg-surface-container-low flex items-center justify-center text-on-surface hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 4. GAP-MATCH (B1 Q14 — Compact)
  // ───────────────────────────────────────────────────────────────
  if (question.type === 'gap-match') {
    const currentSlots = typeof answer === 'object' && answer !== null ? answer : {};
    const slotKeys = Object.keys(question.slots || {});
    const usedTokenIds = Object.values(currentSlots).filter(Boolean);

    const assignTokenToSlot = (slotKey, tokenId) => {
      const next = { ...currentSlots };
      Object.keys(next).forEach((k) => {
        if (next[k] === tokenId) delete next[k];
      });
      next[slotKey] = tokenId;
      onChange(next);
      setSelectedTokenId(null);
    };

    const clearSlot = (slotKey, e) => {
      e.stopPropagation();
      const next = { ...currentSlots };
      delete next[slotKey];
      onChange(next);
    };

    return (
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-variant/50 space-y-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
            1. Kategorie wählen (Antippen):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(question.tokens || []).map((tok) => {
              const isSelected = selectedTokenId === tok.id;
              const isPlaced = usedTokenIds.includes(tok.id);
              return (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={tok.id}
                  type="button"
                  onClick={() =>
                    setSelectedTokenId(isSelected ? null : tok.id)
                  }
                  className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : isPlaced
                      ? 'bg-surface-container text-on-surface-variant border-surface-variant/40 opacity-50'
                      : 'bg-surface-container-lowest text-on-surface border-surface-variant/60 hover:border-primary/50'
                  }`}
                >
                  {tok.text}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {slotKeys.map((sKey, idx) => {
            const slot = question.slots[sKey];
            const assignedId = currentSlots[sKey];
            const assignedTok = (question.tokens || []).find(
              (t) => t.id === assignedId
            );

            return (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                key={sKey}
                onClick={() => {
                  if (selectedTokenId) {
                    assignTokenToSlot(sKey, selectedTokenId);
                  }
                }}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  selectedTokenId
                    ? 'cursor-pointer border-dashed border-primary bg-primary/[0.04] hover:bg-primary/10'
                    : assignedTok
                    ? 'border-primary/60 bg-surface-container-lowest shadow-sm'
                    : 'border-surface-variant/50 bg-surface-container-lowest'
                }`}
              >
                <div className="flex-1 min-w-0">
                  {slot.description ? (
                    <p className="text-xs sm:text-sm font-medium text-on-surface leading-snug">
                      {slot.description}
                    </p>
                  ) : (
                    <span className="text-xs font-black text-primary">
                      {slot.label}
                    </span>
                  )}
                </div>

                <div className="w-full sm:w-52 shrink-0 flex items-center gap-1.5">
                  <select
                    aria-label={slot.label}
                    value={assignedId || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) {
                        clearSlot(sKey, e);
                      } else {
                        assignTokenToSlot(sKey, val);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full text-xs font-bold rounded-lg px-2.5 py-1.5 border transition-colors focus:outline-none ${
                      assignedTok
                        ? 'border-primary bg-primary/10 text-primary dark:text-red-300'
                        : 'border-surface-variant/60 bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <option value="">
                      {selectedTokenId ? '— Hier tippen / wählen —' : '— Kategorie wählen —'}
                    </option>
                    {(question.tokens || []).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.text}
                      </option>
                    ))}
                  </select>
                  {assignedTok && (
                    <button
                      type="button"
                      onClick={(e) => clearSlot(sKey, e)}
                      className="p-1 rounded-md hover:bg-error/15 text-on-surface-variant hover:text-error shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 5. ASSOCIATE-PAIRS (B1 Q16 — Compact Two-Column Tap-to-Pair)
  // ───────────────────────────────────────────────────────────────
  if (question.type === 'associate-pairs') {
    const pairs = Array.isArray(answer) ? answer : [];

    const getPairIndexForLeft = (lId) =>
      pairs.findIndex((p) => p.split(' ')[0] === lId);
    const getPairIndexForRight = (rId) =>
      pairs.findIndex((p) => p.split(' ')[1] === rId);

    const handleLeftClick = (lId) => {
      const existingIdx = getPairIndexForLeft(lId);
      if (existingIdx !== -1 && selectedLeftPairId !== lId) {
        onChange(pairs.filter((_, idx) => idx !== existingIdx));
        return;
      }
      setSelectedLeftPairId(selectedLeftPairId === lId ? null : lId);
    };

    const handleRightClick = (rId) => {
      if (!selectedLeftPairId) {
        const existingIdx = getPairIndexForRight(rId);
        if (existingIdx !== -1) {
          onChange(pairs.filter((_, idx) => idx !== existingIdx));
        }
        return;
      }
      const filtered = pairs.filter((p) => {
        const [l, r] = p.split(' ');
        return l !== selectedLeftPairId && r !== rId;
      });
      onChange([...filtered, `${selectedLeftPairId} ${rId}`]);
      setSelectedLeftPairId(null);
    };

    return (
      <div className="space-y-3">
        <div className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-variant/40 text-xs font-bold text-on-surface-variant flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Links (Spalte A) antippen, dann rechts (Spalte B) zuordnen.</span>
          </div>
          {pairs.length > 0 && (
            <button
              type="button"
              onClick={() => {
                onChange([]);
                setSelectedLeftPairId(null);
              }}
              className="text-[11px] font-extrabold text-primary hover:underline shrink-0"
            >
              Reset
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant px-1">
              Spalte A
            </h4>
            {(question.leftItems || []).map((lItem, idx) => {
              const pairIdx = getPairIndexForLeft(lItem.id);
              const isSelected = selectedLeftPairId === lItem.id;
              const badgeColor =
                pairIdx !== -1
                  ? PAIR_BADGE_COLORS[pairIdx % PAIR_BADGE_COLORS.length]
                  : '';

              return (
                <motion.button
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileTap={{ scale: 0.98 }}
                  key={lItem.id}
                  type="button"
                  onClick={() => handleLeftClick(lItem.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm'
                      : pairIdx !== -1
                      ? 'border-primary/50 bg-surface-container-lowest shadow-sm'
                      : 'border-surface-variant/50 bg-surface-container-lowest hover:border-primary/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-on-surface leading-snug">
                    {lItem.text}
                  </span>
                  {pairIdx !== -1 ? (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black border shrink-0 ${badgeColor}`}
                    >
                      #{pairIdx + 1}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-on-surface-variant shrink-0">
                      {isSelected ? 'Aktiv' : 'Wählen'}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant px-1">
              Spalte B
            </h4>
            {(question.rightItems || []).map((rItem, idx) => {
              const pairIdx = getPairIndexForRight(rItem.id);
              const badgeColor =
                pairIdx !== -1
                  ? PAIR_BADGE_COLORS[pairIdx % PAIR_BADGE_COLORS.length]
                  : '';

              return (
                <motion.button
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileTap={{ scale: 0.98 }}
                  key={rItem.id}
                  type="button"
                  onClick={() => handleRightClick(rItem.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
                    selectedLeftPairId
                      ? 'border-dashed border-primary bg-primary/[0.04] hover:bg-primary/10 cursor-pointer'
                      : pairIdx !== -1
                      ? 'border-primary/50 bg-surface-container-lowest shadow-sm'
                      : 'border-surface-variant/50 bg-surface-container-lowest hover:border-primary/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-on-surface leading-snug">
                    {rItem.text}
                  </span>
                  {pairIdx !== -1 && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black border shrink-0 ${badgeColor}`}
                    >
                      #{pairIdx + 1}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 6. AUDIO-GAP-MATCH (B2 Q3 — Compact Audio Cards + Advice Rows)
  // ───────────────────────────────────────────────────────────────
  if (question.type === 'audio-gap-match') {
    const currentSlots = typeof answer === 'object' && answer !== null ? answer : {};
    const slotKeys = Object.keys(question.slots || {});

    const assignAudioCard = (slotKey, cardId) => {
      const next = { ...currentSlots };
      Object.keys(next).forEach((k) => {
        if (next[k] === cardId) delete next[k];
      });
      if (cardId) {
        next[slotKey] = cardId;
      } else {
        delete next[slotKey];
      }
      onChange(next);
    };

    return (
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-variant/50 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
            <Volume2 className="w-3.5 h-3.5 text-primary" />
            <span>1. Aussagen anhören:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(question.audioCards || []).map((card) => {
              const assignedSlotKey = slotKeys.find(
                (k) => currentSlots[k] === card.id
              );
              const assignedSlot = assignedSlotKey
                ? question.slots[assignedSlotKey]
                : null;
              return (
                <div
                  key={card.id}
                  className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-surface-container-lowest border border-surface-variant/40"
                >
                  <MiniAudioCardButton src={card.audio} label={card.label} />
                  {assignedSlot && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                      {assignedSlot.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {slotKeys.map((sKey, idx) => {
            const slot = question.slots[sKey];
            const assignedCardId = currentSlots[sKey] || '';
            return (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                key={sKey}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  assignedCardId
                    ? 'border-primary bg-primary/[0.04] dark:bg-primary/10'
                    : 'border-surface-variant/50 bg-surface-container-lowest'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-black uppercase tracking-wider text-primary mr-1.5">
                    {slot.label}:
                  </span>
                  {slot.text && (
                    <span className="text-xs sm:text-sm font-medium text-on-surface leading-snug">
                      „{slot.text}“
                    </span>
                  )}
                </div>

                <div className="w-full sm:w-44 shrink-0">
                  <select
                    aria-label={slot.label}
                    value={assignedCardId}
                    onChange={(e) => assignAudioCard(sKey, e.target.value)}
                    className="w-full text-xs font-bold rounded-lg px-2.5 py-1.5 border border-surface-variant/60 bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="">— Hörtext wählen —</option>
                    {(question.audioCards || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default LevelTestTaskRenderer;
