import React, { useState, useMemo } from 'react';
import ExerciseShell from './ExerciseShell';
import CurvedLinesMatching from './CurvedLinesMatching';

const Matching = ({ index, exercise, savedAnswers, onScoreReport }) => {
  const { title, instruction, pairs = [], tag, context } = exercise;

  // Stable left items from exercise definition
  const leftItems = useMemo(
    () => pairs.map((p) => ({ id: p.id, text: p.left })),
    [pairs]
  );

  // Restore savedAnswers if previously submitted (supporting legacy array & new format)
  const { initialPairs, initialRightItems } = useMemo(() => {
    let p = [];
    let r = null;
    if (savedAnswers) {
      if (Array.isArray(savedAnswers)) {
        if (typeof savedAnswers[0] === 'string') {
          // New format: array of pair strings e.g. ["m1 m1", "m2 m2"]
          p = savedAnswers;
        } else if (savedAnswers[0]?.id) {
          // Legacy format: array of { id, text } in user order
          r = savedAnswers;
          p = pairs.map((pair, idx) => `${pair.id} ${savedAnswers[idx]?.id}`).filter(Boolean);
        }
      } else if (savedAnswers.pairs && Array.isArray(savedAnswers.pairs)) {
        p = savedAnswers.pairs;
        if (savedAnswers.rightItems) r = savedAnswers.rightItems;
      }
    }
    return { initialPairs: p, initialRightItems: r };
  }, [savedAnswers, pairs]);

  // Shuffled right items for interactive matching
  const [rightItems] = useState(() => {
    if (initialRightItems) return initialRightItems;
    const base = pairs.map((p) => ({ id: p.id, text: p.right }));
    if (base.length <= 1) return base;

    const copy = [...base];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = (i * 3 + 1) % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    // Ensure not trivially pre-aligned
    if (copy.every((it, idx) => it.id === base[idx].id)) {
      [copy[0], copy[1]] = [copy[1], copy[0]];
    }
    return copy;
  });

  const [userPairs, setUserPairs] = useState(initialPairs);
  const [isSubmitted, setIsSubmitted] = useState(Boolean(savedAnswers));

  // Target correct pairs (identical IDs on both sides)
  const correctPairs = useMemo(
    () => pairs.map((p) => `${p.id} ${p.id}`),
    [pairs]
  );

  // Calculate score when submitted
  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    let hits = 0;
    leftItems.forEach((lItem) => {
      const match = userPairs.find((p) => p.split(' ')[0] === lItem.id);
      if (match) {
        const rId = match.split(' ')[1];
        if (rId === lItem.id) hits++;
      }
    });
    return hits;
  }, [isSubmitted, leftItems, userPairs]);

  const handleCheck = () => {
    let hits = 0;
    leftItems.forEach((lItem) => {
      const match = userPairs.find((p) => p.split(' ')[0] === lItem.id);
      if (match) {
        const rId = match.split(' ')[1];
        if (rId === lItem.id) hits++;
      }
    });

    setIsSubmitted(true);
    if (onScoreReport) {
      onScoreReport(hits, leftItems.length, {
        pairs: userPairs,
        rightItems
      });
    }
  };

  const questionObj = useMemo(
    () => ({
      leftItems,
      rightItems,
      correctPairs
    }),
    [leftItems, rightItems, correctPairs]
  );

  return (
    <ExerciseShell
      index={index}
      typeLabel="Zuordnungsübung"
      tag={tag}
      context={context}
      title={title}
      instruction={instruction || 'Verbinden Sie die zusammengehörigen Aussagen mit geschwungenen Linien.'}
      onCheck={handleCheck}
      canCheck={!isSubmitted && userPairs.length > 0}
      isSubmitted={isSubmitted}
      score={score}
      total={leftItems.length}
    >
      <CurvedLinesMatching
        question={questionObj}
        answer={userPairs}
        onChange={isSubmitted ? () => {} : setUserPairs}
        isSubmitted={isSubmitted}
        correctPairs={correctPairs}
        level="A2"
      />
    </ExerciseShell>
  );
};

export default Matching;
