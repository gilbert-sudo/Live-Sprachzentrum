import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExerciseShell from './ExerciseShell';

const Transformation = ({ index, exercise, onScoreReport }) => {
  const { title, instruction, items, tag, context } = exercise;
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <ExerciseShell
      index={index}
      typeLabel="Umformung"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={() => setIsSubmitted(true)}
      canCheck={!isSubmitted}
      checkLabel="Lösungen anzeigen"
      isSubmitted={isSubmitted}
      /* No score — open-ended, just reveal model answers */
    >
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="border-l-2 border-stone-100 pl-3">
            <p className="text-sm italic text-stone-500 mb-1.5 flex items-start gap-1.5">
              <span className="text-stone-300 tabular-nums text-xs font-medium shrink-0 mt-0.5">{idx + 1}.</span>
              {item.prompt}
            </p>
            <textarea
              disabled={isSubmitted}
              value={answers[idx] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
              rows={2}
              className="w-full bg-[#FDFCF8] border border-stone-200 rounded px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-stone-400 resize-none placeholder:text-stone-300 transition-colors"
              placeholder="Ihre Antwort …"
            />
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-1.5 px-3 py-2 bg-green-50 border border-green-200 rounded text-xs"
              >
                <span className="font-semibold text-green-700 mr-1">Musterlösung:</span>
                <span className="text-green-800">{item.modelAnswer}</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </ExerciseShell>
  );
};

export default Transformation;
