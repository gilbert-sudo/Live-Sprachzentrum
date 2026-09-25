import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExerciseShell from './ExerciseShell';

const Transformation = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, items, tag, context } = exercise;
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState(!!savedAnswers);

  const handleCheck = () => {
    setIsSubmitted(true);
    if (onScoreReport) onScoreReport(0, 0, answers);
  };

  return (
    <ExerciseShell
      index={index}
      typeLabel="Umformung"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction}
      onCheck={handleCheck}
      canCheck={!isSubmitted}
      checkLabel="Lösungen anzeigen"
      isSubmitted={isSubmitted}
      /* No score — open-ended, just reveal model answers */
    >
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="border-l-2 border-surface-variant/40 pl-4 mb-4">
            <p className="text-body-md italic text-on-surface mb-2 flex items-start gap-2">
              <span className="text-secondary tabular-nums text-sm font-bold shrink-0 mt-0.5">{idx + 1}.</span>
              {item.prompt}
            </p>
            <textarea
              disabled={isSubmitted}
              value={answers[idx] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
              onBlur={() => {
                if (!isSubmitted && onScoreReport) {
                  onScoreReport(0, 0, answers);
                }
              }}
              rows={2}
              className="w-full bg-surface-variant/20 border border-surface-variant/40 rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:bg-surface-variant/40 resize-none placeholder:text-secondary/50 transition-colors"
              placeholder="Ihre Antwort …"
            />
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 px-4 py-3 bg-success-green/10 border border-success-green/50 rounded-lg text-sm"
              >
                <span className="font-bold text-success-green mr-2">Musterlösung:</span>
                <span className="text-on-surface">{item.modelAnswer}</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </ExerciseShell>
  );
};

export default Transformation;
