import React, { useState } from 'react';

export default function ExerciseRenderer({ exercise }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleInputChange = (index, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleMultipleChoice = (index) => {
    setUserAnswers({ 0: index });
  };

  const handleTrueFalse = (value) => {
    setUserAnswers({ 0: value });
  };

  const handleCheckboxToggle = (index) => {
    setUserAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkAnswers = () => {
    let currentScore = 0;
    
    if (exercise.exerciseType === 'fill-in-the-blanks') {
      exercise.answers.forEach((ans, idx) => {
        if (userAnswers[idx]?.toLowerCase().trim() === ans.toLowerCase().trim()) {
          currentScore++;
        }
      });
      setScore(currentScore);
    } else if (exercise.exerciseType === 'multiple-choice') {
      const selectedIndex = userAnswers[0];
      if (selectedIndex !== undefined && exercise.options[selectedIndex].isCorrect) {
        setScore(1);
      }
    } else if (exercise.exerciseType === 'true-false') {
      if (userAnswers[0] !== undefined && userAnswers[0] === exercise.isTrue) {
        setScore(1);
      }
    } else if (exercise.exerciseType === 'checkbox-group') {
      let correctCount = 0;
      let totalCorrectNeeded = exercise.options.filter(o => o.isCorrect).length;
      let allCorrect = true;

      exercise.options.forEach((opt, idx) => {
        const isSelected = !!userAnswers[idx];
        if (isSelected === opt.isCorrect) {
          if (opt.isCorrect) correctCount++;
        } else {
          allCorrect = false;
        }
      });
      if (allCorrect && correctCount === totalCorrectNeeded) {
         setScore(totalCorrectNeeded); // Max score
      } else {
         setScore(correctCount); // Partial score
      }
    }
    
    setIsSubmitted(true);
  };

  const resetExercise = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const renderFillInTheBlanks = () => {
    const parts = exercise.text.split(/\{(\d+)\}/g);
    
    return (
      <div className="mb-6">
        <div className="font-body-lg text-body-lg leading-loose text-germany-black dark:text-white">
          {parts.map((part, i) => {
            if (i % 2 !== 0) {
              const blankIndex = parseInt(part);
              const isCorrect = isSubmitted && userAnswers[blankIndex]?.toLowerCase().trim() === exercise.answers[blankIndex].toLowerCase().trim();
              const isWrong = isSubmitted && !isCorrect;
              
              return (
                <input
                  key={i}
                  type="text"
                  value={userAnswers[blankIndex] || ''}
                  onChange={(e) => handleInputChange(blankIndex, e.target.value)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const text = e.dataTransfer.getData("text/plain");
                    if (text) handleInputChange(blankIndex, text);
                  }}
                  disabled={isSubmitted}
                  style={{ width: `${Math.max(3, (userAnswers[blankIndex] || '').length) + 3}ch` }}
                  className={`inline-block h-8 leading-normal px-3 py-0 mx-1 border-b-2 bg-surface-subtle text-center focus:outline-none focus:border-germany-red transition-colors ${
                    isCorrect ? 'border-success-green text-success-green' :
                    isWrong ? 'border-error-red text-error-red' : 'border-surface-variant'
                  }`}
                  placeholder="?"
                />
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>
        
        {/* Word Bank */}
        <div className="mt-6 p-4 bg-surface-container-low rounded-lg border border-surface-variant flex flex-wrap gap-2">
          {exercise.options.map((opt, i) => (
            <span 
              key={i} 
              draggable={!isSubmitted}
              onDragStart={(e) => e.dataTransfer.setData("text/plain", opt)}
              className="px-3 py-1 bg-white dark:bg-germany-black border border-surface-variant rounded shadow-sm font-label-md text-label-md cursor-grab active:cursor-grabbing hover:bg-surface-subtle transition-colors select-none"
            >
              {opt}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3 mb-6">
        {exercise.options.map((opt, i) => {
          const isSelected = userAnswers[0] === i;
          const isCorrectAnswer = isSubmitted && opt.isCorrect;
          const isWrongAnswer = isSubmitted && isSelected && !opt.isCorrect;

          let borderClass = 'border-surface-variant hover:border-germany-red';
          let bgClass = 'bg-white dark:bg-germany-black';

          if (isSubmitted) {
            if (isCorrectAnswer) {
              borderClass = 'border-success-green';
              bgClass = 'bg-[#E8F3EB] dark:bg-success-green/20';
            } else if (isWrongAnswer) {
              borderClass = 'border-error-red';
              bgClass = 'bg-[#FEECEB] dark:bg-error-red/20';
            } else {
               borderClass = 'border-surface-variant opacity-50';
            }
          } else if (isSelected) {
            borderClass = 'border-germany-red';
            bgClass = 'bg-germany-red/5';
          }

          return (
            <button
              key={i}
              onClick={() => handleMultipleChoice(i)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${borderClass} ${bgClass}`}
            >
              <span className="font-body-md text-body-md">{opt.text}</span>
              {isSubmitted && (isCorrectAnswer || isWrongAnswer) && (
                <span className={`material-symbols-outlined icon-filled ${isCorrectAnswer ? 'text-success-green' : 'text-error-red'}`}>
                  {isCorrectAnswer ? 'check_circle' : 'cancel'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderTrueFalse = () => {
    return (
      <div className="flex items-center gap-4 mb-6">
        {[true, false].map((val) => {
          const isSelected = userAnswers[0] === val;
          const isCorrectAnswer = isSubmitted && val === exercise.isTrue;
          const isWrongAnswer = isSubmitted && isSelected && val !== exercise.isTrue;

          let borderClass = 'border-surface-variant hover:border-germany-red';
          let bgClass = 'bg-white dark:bg-germany-black';

          if (isSubmitted) {
            if (isCorrectAnswer) {
              borderClass = 'border-success-green';
              bgClass = 'bg-[#E8F3EB] dark:bg-success-green/20';
            } else if (isWrongAnswer) {
              borderClass = 'border-error-red';
              bgClass = 'bg-[#FEECEB] dark:bg-error-red/20';
            } else {
              borderClass = 'border-surface-variant opacity-50';
            }
          } else if (isSelected) {
            borderClass = 'border-germany-red';
            bgClass = 'bg-germany-red/5';
          }

          return (
            <button
              key={val.toString()}
              onClick={() => handleTrueFalse(val)}
              disabled={isSubmitted}
              className={`flex-1 p-4 rounded-xl border-2 transition-all text-center font-body-lg text-body-lg ${borderClass} ${bgClass}`}
            >
              {val ? 'Richtig' : 'Falsch'}
            </button>
          );
        })}
      </div>
    );
  };

  const renderCheckboxGroup = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {exercise.options.map((opt, i) => {
          const isSelected = !!userAnswers[i];
          const isCorrectAnswer = isSubmitted && opt.isCorrect;
          const isWrongAnswer = isSubmitted && isSelected && !opt.isCorrect;
          const missedCorrect = isSubmitted && !isSelected && opt.isCorrect;

          let borderClass = 'border-surface-variant hover:border-germany-red';
          let bgClass = 'bg-white dark:bg-germany-black';
          
          if (isSubmitted) {
            if (isCorrectAnswer && isSelected) {
              borderClass = 'border-success-green';
              bgClass = 'bg-[#E8F3EB] dark:bg-success-green/20';
            } else if (isWrongAnswer) {
              borderClass = 'border-error-red';
              bgClass = 'bg-[#FEECEB] dark:bg-error-red/20';
            } else if (missedCorrect) {
              borderClass = 'border-germany-gold'; // Should have selected
            } else {
              borderClass = 'border-surface-variant opacity-50';
            }
          } else if (isSelected) {
            borderClass = 'border-germany-red';
            bgClass = 'bg-germany-red/5';
          }

          return (
            <button
              key={i}
              onClick={() => handleCheckboxToggle(i)}
              disabled={isSubmitted}
              className={`text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${borderClass} ${bgClass}`}
            >
              <div className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-germany-red border-germany-red text-white' : 'border-surface-variant'}`}>
                {isSelected && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
              </div>
              <span className="font-body-md text-body-md flex-1">{opt.text}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-1 bg-surface-container-lowest border border-surface-variant rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-germany-gold">edit_document</span>
        <h3 className="font-title-md text-title-md text-germany-black dark:text-white font-bold">{exercise.question}</h3>
      </div>

      {exercise.exerciseType === 'fill-in-the-blanks' && renderFillInTheBlanks()}
      {exercise.exerciseType === 'multiple-choice' && renderMultipleChoice()}
      {exercise.exerciseType === 'true-false' && renderTrueFalse()}
      {exercise.exerciseType === 'checkbox-group' && renderCheckboxGroup()}

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-variant">
        {!isSubmitted ? (
          <button 
            onClick={checkAnswers}
            className="px-6 py-2 bg-germany-red text-white rounded-full font-label-lg text-label-lg hover:bg-germany-black transition-colors"
          >
            Überprüfen
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className={`font-title-md text-title-md flex items-center gap-2 ${score > 0 ? 'text-success-green' : 'text-error-red'}`}>
              <span className="material-symbols-outlined icon-filled">
                {score > 0 ? 'emoji_events' : 'sentiment_dissatisfied'}
              </span>
              <span>
                {exercise.exerciseType === 'fill-in-the-blanks' 
                  ? `${score} von ${exercise.answers.length} richtig!` 
                  : (exercise.exerciseType === 'checkbox-group'
                      ? `${score} richtig!`
                      : (score > 0 ? 'Richtig!' : 'Falsch!'))}
              </span>
            </div>
            <button 
              onClick={resetExercise}
              className="px-4 py-2 border-2 border-surface-variant rounded-full font-label-lg text-label-lg hover:bg-surface-subtle transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Wiederholen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
