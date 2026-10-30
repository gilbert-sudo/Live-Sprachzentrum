import CurvedLinesMatching from './CurvedLinesMatching';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Play,
  Pause,
  X,
  Sparkles,
  Volume2,
  RotateCcw
} from 'lucide-react';
import { getLevelColor } from '../../utils/levelColors';

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

const MiniAudioCardButton = ({ src, label, lvlColor }) => {
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
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
        playing
          ? `${lvlColor.buttonBg} shadow-sm ${lvlColor.shadowGlow}`
          : 'bg-surface-container-low dark:bg-[#2B2D33] text-on-surface hover:bg-surface-container dark:hover:bg-[#32353C] shadow-sm'
      }`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          playing
            ? 'bg-white/20 text-white'
            : `${lvlColor.softBg} ${lvlColor.accentText}`
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


const LevelTestTaskRenderer = ({ question, answer, onChange, level = 'A2' }) => {
  const [activeGapKey, setActiveGapKey] = useState(null);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
    const [draggedIdx, setDraggedIdx] = useState(null);

  const lvlColor = getLevelColor(level);

  useEffect(() => {
    setActiveGapKey(null);
    setSelectedTokenId(null);
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
  // 1. SINGLE-CHOICE & MULTIPLE-CHOICE (Borderless Tonal + Level Colors)
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
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${lvlColor.softBg} ${lvlColor.text} text-[11px] font-bold`}>
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>
              Mehrfachauswahl: Bitte {question.maxChoices} Antworten wählen ({selectedList.length}/{question.maxChoices})
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {(question.options || []).map((opt, idx) => {
            const isSelected = selectedList.includes(opt.id);
            const letter = String.fromCharCode(65 + idx);
            return (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.18 }}
                whileHover={{ scale: 1.005, y: -1 }}
                whileTap={{ scale: 0.99 }}
                key={opt.id}
                type="button"
                onClick={() => handleToggleOption(opt.id)}
                className={`group w-full text-left px-4 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 ${
                  isSelected
                    ? `${lvlColor.softBg} ${lvlColor.ringGlow} text-on-surface shadow-md ${lvlColor.shadowGlow}`
                    : 'bg-surface-container-low/85 dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#2E3138] text-on-surface shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                      isSelected
                        ? `${lvlColor.badge} scale-105`
                        : `bg-surface-container-lowest dark:bg-white/10 text-on-surface-variant dark:text-slate-300 group-hover:${lvlColor.accentText}`
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
                    isMulti ? 'rounded-lg' : 'rounded-full'
                  } flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? `${lvlColor.solidBg} shadow-sm scale-110`
                      : 'bg-surface-container-lowest dark:bg-white/10 text-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3] text-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 2. INLINE-DROPDOWN, TEXT-GAP & GROUPED-CHOICE
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
              className={`max-w-full text-xs sm:text-sm font-bold rounded-xl px-3 py-1.5 pr-7 transition-all cursor-pointer focus:outline-none ${lvlColor.ringGlow} ${
                isFilled
                  ? `${lvlColor.softBg} ${lvlColor.text} shadow-sm`
                  : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface shadow-sm hover:bg-surface-container-high/60'
              }`}
            >
              <option value="" className="bg-surface dark:bg-[#1E1F22] text-on-surface">
                — Bitte wählen —
              </option>
              {(d.options || []).map((opt) => (
                <option
                  key={opt.id}
                  value={opt.id}
                  className="bg-surface dark:bg-[#1E1F22] text-on-surface font-medium"
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
              className={`max-w-full text-xs sm:text-sm font-bold rounded-xl px-3 py-1.5 transition-all focus:outline-none ${
                isFocused
                  ? `bg-surface-container-lowest dark:bg-[#18191C] ${lvlColor.ringGlow} text-on-surface shadow-md`
                  : isFilled
                  ? `${lvlColor.softBg} ${lvlColor.text} shadow-sm`
                  : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface placeholder:text-on-surface-variant/50 dark:placeholder:text-slate-400/60 shadow-inner'
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
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? `${lvlColor.buttonBg} shadow-sm ${lvlColor.shadowGlow}`
                      : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface hover:bg-surface-container-high/70 dark:hover:bg-[#2B2D33] shadow-sm'
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
          <div className={`p-3.5 rounded-2xl ${lvlColor.softBg} space-y-2`}>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider ${lvlColor.text} flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5" />
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isUsed
                        ? 'bg-surface-container/60 dark:bg-white/5 text-on-surface-variant opacity-45'
                        : `bg-surface-container-lowest dark:bg-[#26282E] text-on-surface hover:${lvlColor.accentText} shadow-sm`
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
            className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/80 dark:bg-[#26282E] space-y-2.5 text-xs sm:text-sm leading-relaxed text-on-surface shadow-inner"
          >
            {blocks.map((b, idx) =>
              b.type === 'hr' ? (
                <div
                  key={idx}
                  className="my-3 h-1 w-12 rounded-full bg-surface-container-high dark:bg-white/10 mx-auto"
                />
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
                  className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-low/80 dark:bg-[#26282E] shadow-sm space-y-2.5"
                >
                  {grp.title && (
                    <div className="flex items-start gap-2.5">
                      <span className={`w-6 h-6 rounded-lg ${lvlColor.softBg} ${lvlColor.accentText} text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5`}>
                        {gIdx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-on-surface leading-snug">
                        {grp.title}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {(grp.options || []).map((opt) => {
                      const isSelected = val === opt.id;
                      return (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          key={opt.id}
                          type="button"
                          onClick={() => handleFieldChange(grp.id, opt.id)}
                          className={`flex-1 min-w-[95px] sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? `${lvlColor.buttonBg} shadow-md ${lvlColor.shadowGlow}`
                              : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface hover:bg-surface-container dark:hover:bg-[#2E3038] shadow-sm'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
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
  // 3. ORDER-SEQUENCE & DIALOGUE-ORDER (Spring Layout Animation)
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
        <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low/80 dark:bg-[#26282E] text-[11px] sm:text-xs font-medium text-on-surface-variant">
          <span>
            <strong className="text-on-surface font-extrabold">Aufgabe:</strong>{' '}
            {isDialogue ? 'Dialogteile' : 'Sätze'} mit (▲/▼) oder per Ziehen ordnen.
          </span>
          <button
            type="button"
            onClick={handleResetOrder}
            className={`text-[11px] font-bold ${lvlColor.accentText} hover:underline inline-flex items-center gap-1 shrink-0`}
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
                  className={`px-3.5 py-3 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                    draggedIdx === idx
                      ? `${lvlColor.softBg} ${lvlColor.ringGlow} opacity-65`
                      : 'bg-surface-container-low/85 dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#2E3138] shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
                    {slotSpeaker ? (
                      <span
                        className={`inline-flex items-center justify-center sm:min-w-[130px] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider shrink-0 self-start sm:self-center ${
                          isSie
                            ? 'bg-blue-500/15 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300'
                            : 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {slotSpeaker}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`w-6 h-6 rounded-lg ${lvlColor.softBg} ${lvlColor.accentText} font-black text-xs flex items-center justify-center`}>
                          {idx + 1}
                        </span>
                        <GripVertical className="w-3.5 h-3.5 text-on-surface-variant/40 dark:text-white/30 hidden sm:block cursor-grab" />
                      </div>
                    )}

                    <p className="text-xs sm:text-sm font-medium text-on-surface leading-snug break-words flex-1">
                      {itemObj.text}
                    </p>
                  </div>

                  {/* Side-by-side Up/Down Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      type="button"
                      onClick={() => moveItem(idx, idx - 1)}
                      disabled={idx === 0}
                      aria-label="Nach oben verschieben"
                      title="Nach oben"
                      className={`w-7 h-7 rounded-xl bg-surface-container-lowest dark:bg-[#1E1F22] flex items-center justify-center text-on-surface hover:${lvlColor.accentText} disabled:opacity-30 disabled:pointer-events-none shadow-sm transition-colors`}
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
                      className={`w-7 h-7 rounded-xl bg-surface-container-lowest dark:bg-[#1E1F22] flex items-center justify-center text-on-surface hover:${lvlColor.accentText} disabled:opacity-30 disabled:pointer-events-none shadow-sm transition-colors`}
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
  // 4. GAP-MATCH (B1 Q14)
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
        <div className="p-3.5 rounded-2xl bg-surface-container-low/80 dark:bg-[#26282E] space-y-2">
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
                  className={`text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? `${lvlColor.buttonBg} shadow-md ${lvlColor.shadowGlow}`
                      : isPlaced
                      ? 'bg-surface-container/60 dark:bg-white/5 text-on-surface-variant opacity-45'
                      : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface hover:bg-surface-container-high/60 shadow-sm'
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
                className={`p-3.5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  selectedTokenId
                    ? `cursor-pointer ${lvlColor.softBg} ${lvlColor.ringGlow}`
                    : assignedTok
                    ? `${lvlColor.softBg} shadow-sm`
                    : 'bg-surface-container-low/85 dark:bg-[#26282E] shadow-sm'
                }`}
              >
                <div className="flex-1 min-w-0">
                  {slot.description ? (
                    <p className="text-xs sm:text-sm font-medium text-on-surface leading-snug">
                      {slot.description}
                    </p>
                  ) : (
                    <span className={`text-xs font-black ${lvlColor.accentText}`}>
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
                    className={`w-full text-xs font-bold rounded-xl px-3 py-2 transition-colors focus:outline-none ${
                      assignedTok
                        ? `bg-surface-container-lowest dark:bg-[#1E1F22] ${lvlColor.text} shadow-sm`
                        : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface shadow-sm'
                    }`}
                  >
                    <option value="" className="bg-surface dark:bg-[#1E1F22] text-on-surface">
                      {selectedTokenId ? '— Hier tippen / wählen —' : '— Kategorie wählen —'}
                    </option>
                    {(question.tokens || []).map((t) => (
                      <option
                        key={t.id}
                        value={t.id}
                        className="bg-surface dark:bg-[#1E1F22] text-on-surface"
                      >
                        {t.text}
                      </option>
                    ))}
                  </select>
                  {assignedTok && (
                    <button
                      type="button"
                      onClick={(e) => clearSlot(sKey, e)}
                      className="p-1.5 rounded-lg bg-surface-container-lowest dark:bg-[#1E1F22] hover:bg-error/15 dark:hover:bg-rose-500/20 text-on-surface-variant hover:text-error dark:hover:text-rose-400 shrink-0 shadow-sm"
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
  // 5. ASSOCIATE-PAIRS (B1 Q16 — Two-Column Curved-Lines Matching)
  // ───────────────────────────────────────────────────────────────
  if (question.type === 'associate-pairs') {
    return (
      <CurvedLinesMatching
        question={question}
        answer={answer}
        onChange={onChange}
        level={level}
      />
    );
  }

  // ───────────────────────────────────────────────────────────────
  // 6. AUDIO-GAP-MATCH (B2 Q3 — Audio Cards + Advice Rows)
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
        <div className="p-3.5 rounded-2xl bg-surface-container-low/80 dark:bg-[#26282E] space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
            <Volume2 className={`w-3.5 h-3.5 ${lvlColor.accentText}`} />
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
                  className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-surface-container-lowest dark:bg-[#1E1F22] shadow-sm"
                >
                  <MiniAudioCardButton
                    src={card.audio}
                    label={card.label}
                    lvlColor={lvlColor}
                  />
                  {assignedSlot && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${lvlColor.softBg} ${lvlColor.text}`}>
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
                className={`p-3.5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  assignedCardId
                    ? `${lvlColor.softBg} shadow-sm`
                    : 'bg-surface-container-low/85 dark:bg-[#26282E] shadow-sm'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <span className={`text-[11px] font-black uppercase tracking-wider ${lvlColor.accentText} mr-1.5`}>
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
                    className={`w-full text-xs font-bold rounded-xl px-3 py-2 transition-colors focus:outline-none ${
                      assignedCardId
                        ? `bg-surface-container-lowest dark:bg-[#1E1F22] ${lvlColor.text} shadow-sm`
                        : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface shadow-sm'
                    }`}
                  >
                    <option value="" className="bg-surface dark:bg-[#1E1F22] text-on-surface">
                      — Hörtext wählen —
                    </option>
                    {(question.audioCards || []).map((c) => (
                      <option
                        key={c.id}
                        value={c.id}
                        className="bg-surface dark:bg-[#1E1F22] text-on-surface"
                      >
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
