import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import ExerciseShell from './ExerciseShell';

const TextMarking = ({ index, exercise }) => {
  const { title, instruction, text, categories, tag, context } = exercise;

  const [markedUids, setMarkedUids] = useState(new Set());
  const [placements, setPlacements] = useState({}); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const parsedContent = useMemo(() => {
    const p = [];
    let last = 0;
    let m;
    const re = /\{([^:]+):([^}]+)\}/g;
    let uId = 0;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) {
        p.push({ type: 'text', content: text.substring(last, m.index) });
      }
      p.push({ type: 'target', id: m[1], content: m[2], uid: String(uId++) });
      last = re.lastIndex;
    }
    if (last < text.length) {
      p.push({ type: 'text', content: text.substring(last) });
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

  return (
    <ExerciseShell
      index={index}
      typeLabel="Grammatik entdecken"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted && (categories ? allPlaced : true)}
      isSubmitted={isSubmitted}
      score={score}
      total={total}
    >
      <div className="mb-6">
        <p className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-2">Text</p>
        <div className="text-sm text-stone-800 leading-9 bg-stone-50 p-4 rounded-lg border border-stone-200">
          {parsedContent.map((part, idx) => {
            if (part.type === 'text') {
              return <span key={idx}>{part.content}</span>;
            } else {
              const isMarked = markedUids.has(part.uid);
              
              let cls = "cursor-pointer px-1 py-0.5 rounded transition-colors duration-150 ";
              if (isSubmitted) {
                if (isMarked) cls += "bg-green-100 text-green-800 font-bold underline decoration-green-400";
                else cls += "bg-red-100 text-red-800 font-bold underline decoration-red-400";
              } else {
                if (isMarked) cls += "bg-indigo-100 text-indigo-700 font-bold underline decoration-indigo-400";
                else cls += "hover:bg-stone-200";
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
          <p className="mt-2 text-xs text-red-500">Du hast nicht alle relevanten Wörter markiert.</p>
        )}
      </div>

      {categories && categories.length > 0 && (
        <div className="space-y-3">
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-2">Zuordnung</p>
          {categories.map((cat, idx) => {
            const selected = placements[cat.id] || '';
            const isCorrect = isSubmitted && selected === cat.label;
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div key={cat.id} className="flex items-center flex-wrap gap-2 text-sm border-b border-stone-100 pb-2">
                <span className="font-medium text-stone-600 min-w-[200px] flex-1">{cat.function}</span>
                <span className="text-stone-400">→</span>
                <div className="flex items-center gap-2">
                  <select
                    value={selected}
                    onChange={(e) => {
                      if (isSubmitted) return;
                      setPlacements(prev => ({ ...prev, [cat.id]: e.target.value }));
                    }}
                    disabled={isSubmitted}
                    className={`border rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-[200px]
                      ${isCorrect ? 'border-green-400 bg-green-50 text-green-700' : ''}
                      ${isWrong ? 'border-red-400 bg-red-50 text-red-700' : ''}
                      ${!isSubmitted ? 'border-stone-300 text-stone-700' : ''}
                    `}
                  >
                    <option value="" disabled>...wählen...</option>
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {isWrong && (
                    <div className="flex items-center gap-1">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-[10px] text-red-500">({cat.label})</span>
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
