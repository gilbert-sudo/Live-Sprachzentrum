import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const TextMarking = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, text, categories, tag, context } = exercise;

  const [markedUids, setMarkedUids] = useState(new Set(savedAnswers?.markedUids || []));
  const [placements, setPlacements] = useState(savedAnswers?.placements || {}); 
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);

  const parsedContent = useMemo(() => {
    const p = [];
    let last = 0;
    let m;
    const re = /\{([^:]+):([^}]+)\}/g;
    let uId = 0;

    const processText = (str) => {
      const wordRegex = /([a-zA-ZäöüÄÖÜß0-9-]+)|([^a-zA-ZäöüÄÖÜß0-9-]+)/g;
      let wm;
      while ((wm = wordRegex.exec(str)) !== null) {
        if (wm[1]) {
          p.push({ type: 'distractor', content: wm[1], uid: `d_${uId++}` });
        } else {
          p.push({ type: 'text', content: wm[2] });
        }
      }
    };

    while ((m = re.exec(text)) !== null) {
      if (m.index > last) {
        processText(text.substring(last, m.index));
      }
      p.push({ type: 'target', id: m[1], content: m[2], uid: `t_${uId++}` });
      last = re.lastIndex;
    }
    if (last < text.length) {
      processText(text.substring(last));
    }
    return p;
  }, [text]);

  const targetUids = parsedContent.filter(p => p.type === 'target').map(p => p.uid);

  const toggleMark = (uid) => {
    if (isSubmitted) return;
    setMarkedUids(prev => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  };

  const allMarked = targetUids.every(uid => markedUids.has(uid));
  const allPlaced = categories?.every(cat => placements[cat.id]);

  let score = 0;
  let total = targetUids.length + (categories ? categories.length : 0);

  if (isSubmitted) {
    targetUids.forEach(uid => {
      if (markedUids.has(uid)) score++;
    });
    if (categories) {
      categories.forEach(cat => {
        if (placements[cat.id] === cat.label) score++;
      });
    }
  }

  const options = useMemo(() => {
    if (!categories) return [];
    return [...categories].map(c => c.label).sort(() => Math.random() - 0.5);
  }, [categories]);

  const selectedOptions = useMemo(() => {
    return new Set(Object.values(placements).filter(Boolean));
  }, [placements]);

  return (
    <ExerciseShell
      index={index}
      typeLabel="Grammatik entdecken"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={() => {
        let s = 0;
        targetUids.forEach(uid => { if (markedUids.has(uid)) s++; });
        if (categories) categories.forEach(cat => { if (placements[cat.id] === cat.label) s++; });
        setIsSubmitted(true);
        if (onScoreReport) {
          onScoreReport(s, total, { markedUids: Array.from(markedUids), placements });
        }
      }}
      canCheck={!isSubmitted && (categories ? allPlaced : true)}
      isSubmitted={isSubmitted}
      score={score}
      total={total}
    >
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">Text</p>
        <div className="text-body-md text-on-surface leading-10 bg-surface-variant/10 p-5 rounded-2xl border border-surface-variant/40">
          {parsedContent.map((part, idx) => {
            if (part.type === 'text') {
              return <span key={idx}>{part.content}</span>;
            } else {
              const isMarked = markedUids.has(part.uid);
              
              let cls = "cursor-pointer px-[2px] rounded transition-colors duration-150 ";
              if (isSubmitted) {
                if (part.type === 'target') {
                  if (isMarked) cls += "bg-success-green/20 text-success-green font-bold underline decoration-success-green/50";
                  else cls += "bg-error/20 text-error font-bold underline decoration-error/50";
                } else {
                  if (isMarked) cls += "bg-error/20 text-error line-through";
                }
              } else {
                if (isMarked) cls += "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold underline decoration-indigo-500/50";
                else cls += "hover:bg-surface-variant/40";
              }

              return (
                <span
                  key={idx}
                  onClick={() => toggleMark(part.uid)}
                  className={cls}
                >
                  {part.content}
                </span>
              );
            }
          })}
        </div>
        {isSubmitted && !allMarked && (
          <p className="mt-2 text-xs text-error">Du hast nicht alle relevanten Wörter markiert.</p>
        )}
      </div>

      {categories && categories.length > 0 && (
        <div className="space-y-4 mt-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">Zuordnung</p>
          {categories.map((cat, idx) => {
            const selected = placements[cat.id] || '';
            const isCorrect = isSubmitted && selected === cat.label;
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div key={cat.id} className="flex items-center flex-wrap gap-3 text-body-md border-b border-surface-variant/40 pb-3">
                <span className="font-medium text-on-surface min-w-[200px] flex-1">{cat.function}</span>
                <span className="text-secondary/50">→</span>
                <div className="flex items-center gap-2">
                  <select
                    value={selected}
                    onChange={(e) => {
                      if (isSubmitted) return;
                      setPlacements(prev => ({ ...prev, [cat.id]: e.target.value }));
                    }}
                    disabled={isSubmitted}
                    className={`border rounded-lg px-3 py-1.5 text-body-md bg-surface-variant/20 focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[200px] transition-colors
                      ${isCorrect ? 'border-success-green/50 bg-success-green/10 text-success-green font-bold' : ''}
                      ${isWrong ? 'border-error/50 bg-error/10 text-error font-bold' : ''}
                      ${!isSubmitted ? 'border-surface-variant/60 text-on-surface focus:bg-surface-variant/40' : ''}
                    `}
                  >
                    <option value="" disabled>...wählen...</option>
                    {options.map((opt, i) => {
                      const isUsed = selectedOptions.has(opt) && selected !== opt;
                      return (
                        <option key={i} value={opt} disabled={isUsed} className={isUsed ? 'text-secondary/50' : 'text-on-surface'}>
                          {opt}
                        </option>
                      );
                    })}
                  </select>
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {isWrong && (
                    <div className="flex items-center gap-1">
                      <XCircle className="w-4 h-4 text-error" />
                      <span className="text-xs text-error font-bold">({cat.label})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ExerciseShell>
  );
};

export default TextMarking;
